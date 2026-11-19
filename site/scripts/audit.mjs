// Auditoria local do build: axe (WCAG 2.2 AA), overflow horizontal, erros de console e screenshots.
//   npm run build && CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run audit
import { mkdir, readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { preview } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const axeSource = await readFile(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8')
const shots = join(root, 'audit-output')
await mkdir(shots, { recursive: true })

const pages = ['/', '/download/', '/pt/', '/pt/download/', '/404.html']
const widths = [360, 768, 1440]
const server = await preview({ root, preview: { port: 4174, strictPort: true }, build: { outDir: 'dist/site' }, logLevel: 'silent' })
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true })
const problems = []

try {
  for (const path of pages) {
    for (const width of widths) {
      const tab = await browser.newPage()
      const consoleErrors = []
      tab.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
      tab.on('pageerror', (e) => consoleErrors.push(e.message))
      await tab.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
      await tab.setViewport({ width, height: 900 })
      await tab.goto(`http://localhost:4174${path}`, { waitUntil: 'networkidle0' })
      await tab.evaluate(() => document.fonts.ready)
      const name = `${path.replace(/\//g, '_') || '_'}-${width}`

      const overflow = await tab.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      if (overflow > 0) problems.push(`${path} @${width}: overflow horizontal de ${overflow}px`)
      const clipped = await tab.evaluate(() => {
        const vw = document.documentElement.clientWidth
        return [...document.querySelectorAll('main *, header *, footer *')]
          .filter((el) => !el.closest('[aria-hidden="true"], .sr-only, .links:not(.open), .field, .demo, .netbox'))
          .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 1 || r.left < -1) })
          .slice(0, 5)
          .map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')}`)
      })
      for (const c of clipped) problems.push(`${path} @${width}: elemento passa da tela: ${c}`)
      for (const e of consoleErrors) problems.push(`${path} @${width}: console: ${e}`)

      if (width !== 768) {
        await tab.evaluate(axeSource)
        const result = await tab.evaluate(() =>
          window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } }),
        )
        for (const v of result.violations) {
          problems.push(`${path} @${width}: axe ${v.id} (${v.impact}) em ${v.nodes.length} nó(s): ${v.nodes[0].target.join(' ')}`)
        }
      }
      await tab.screenshot({ path: join(shots, `${name}-top.png`) })
      await tab.screenshot({ path: join(shots, `${name}.png`), fullPage: true })
      await tab.close()
    }
  }

  for (const [langs, from, expected] of [
    [['pt-BR', 'en'], '/download/#verify', '/pt/download/#verify'],
    [['pt-PT'], '/', '/pt/'],
    [['en-US', 'pt-BR'], '/', '/'],
    [['es-ES'], '/', '/'],
  ]) {
    const t = await browser.newPage()
    await t.evaluateOnNewDocument((l) => Object.defineProperty(navigator, 'languages', { get: () => l }), langs)
    await t.goto(`http://localhost:4174${from}`, { waitUntil: 'networkidle0' })
    const at = new URL(t.url())
    if (at.pathname + at.hash !== expected) problems.push(`idioma ${langs[0]} em ${from}: foi para ${at.pathname + at.hash}, esperado ${expected}`)
    await t.close()
  }
  const chosen = await browser.newPage()
  await chosen.setViewport({ width: 1440, height: 900 })
  await chosen.evaluateOnNewDocument(() => Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR'] }))
  await chosen.goto('http://localhost:4174/pt/', { waitUntil: 'networkidle0' })
  await Promise.all([chosen.waitForNavigation({ waitUntil: 'networkidle0' }), chosen.click('a.lang')])
  if (new URL(chosen.url()).pathname !== '/') problems.push('quem escolhe EN no menu é mandado de volta para /pt/')
  await chosen.close()

  const tab = await browser.newPage()
  await tab.setViewport({ width: 360, height: 800 })
  await tab.goto('http://localhost:4174/', { waitUntil: 'networkidle0' })
  await tab.click('.menubtn')
  const menuOpen = await tab.$eval('#site-menu', (el) => getComputedStyle(el).display !== 'none')
  if (!menuOpen) problems.push('menu mobile não abre')
  await tab.keyboard.press('Escape')
  const menuClosed = await tab.$eval('#site-menu', (el) => getComputedStyle(el).display === 'none')
  if (!menuClosed) problems.push('menu mobile não fecha com Esc')
  await tab.focus('#org-tab-0')
  await tab.keyboard.press('ArrowRight')
  const selected = await tab.$eval('#org-tab-1', (el) => el.getAttribute('aria-selected') === 'true' && document.activeElement === el)
  if (!selected) problems.push('abas de organização não respondem às setas')
  const email = await tab.$eval('#org-panel', (el) => el.textContent)
  if (!email.includes('cliente-a')) problems.push('painel não troca de organização')
  await tab.close()
} finally {
  await browser.close()
  server.httpServer.close()
}

if (problems.length) {
  console.error(`audit: ${problems.length} problema(s)\n- ${problems.join('\n- ')}`)
  process.exit(1)
}
console.log(`audit: ok (${pages.length} páginas × ${widths.length} larguras); screenshots em audit-output/`)
