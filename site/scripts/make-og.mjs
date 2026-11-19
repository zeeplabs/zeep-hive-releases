// Gera public/og-pt.png e public/og-en.png (1200×630). Rode quando o texto ou a marca mudarem:
//   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node scripts/make-og.mjs
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const font = (pkg, file) => readFile(join(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).then((b) => b.toString('base64'))
const disp = await font('bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')
const body = await font('instrument-sans', 'instrument-sans-latin-wght-normal.woff2')
const icon = (await readFile(join(root, 'src/assets/icon-384.webp'))).toString('base64')

const copy = {
  pt: { a: 'Muitos agentes.', b: 'Nenhuma conta trocada.', sub: 'Claude Code, Codex e opencode no terminal, cada um com a identidade da sua organização. App nativo para macOS.' },
  en: { a: 'Many agents.', b: 'No mixed-up accounts.', sub: 'Claude Code, Codex and opencode in the terminal, each with the identity of its organization. Native macOS app.' },
}

const cells = []
for (let r = 0; r < 12; r++) for (let c = 0; c < 22; c++) {
  const a = Math.abs(Math.sin((r * 22 + c) * 12.9898 + 78.233) * 43758.5453) % 1
  const cls = a < 0.06 ? 'run' : a < 0.1 ? 'sky' : a < 0.14 ? 'done' : ''
  cells.push(`<i class="${cls}" style="left:${c * 64 + (r % 2 ? 32 : 0) - 40}px;top:${r * 55 - 40}px"></i>`)
}

const page = (t) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:D;src:url(data:font/woff2;base64,${disp}) format("woff2");font-weight:100 900}
@font-face{font-family:B;src:url(data:font/woff2;base64,${body}) format("woff2");font-weight:100 900}
body{margin:0;width:1200px;height:630px;background:#120E09;color:#F5E6C8;font-family:B;overflow:hidden;position:relative}
.f{position:absolute;inset:0;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 85% 50%,#000 20%,transparent 75%)}
.f i{position:absolute;width:60px;height:69px;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:#3A2E1E}
.f i::before{content:"";position:absolute;inset:1.5px;clip-path:inherit;background:#120E09}
.f i.run{background:#F5A524}.f i.run::before{background:rgba(245,165,36,.35)}
.f i.sky{background:#7CB7FF}.f i.sky::before{background:rgba(124,183,255,.25)}
.f i.done{background:#6FDCA0}.f i.done::before{background:rgba(111,220,160,.2)}
.c{position:absolute;left:72px;top:72px;right:72px;bottom:72px;display:flex;flex-direction:column;justify-content:space-between}
.b{display:flex;align-items:center;gap:16px;font:700 36px/1 D;letter-spacing:-.02em}
.b img{width:64px;height:64px}
h1{margin:0;font:800 92px/.92 D;letter-spacing:-.045em}
h1 span{display:block;color:#F5A524}
p{margin:0;font-size:26px;line-height:1.4;color:#BBAA8C;max-width:820px}
</style></head><body><div class="f">${cells.join('')}</div><div class="c">
<div class="b"><img src="data:image/webp;base64,${icon}" alt="">Hive</div>
<h1>${t.a}<span>${t.b}</span></h1><p>${t.sub}</p></div></body></html>`

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH, headless: true })
try {
  const tab = await browser.newPage()
  await tab.setViewport({ width: 1200, height: 630 })
  for (const lang of ['pt', 'en']) {
    await tab.setContent(page(copy[lang]), { waitUntil: 'load' })
    await tab.evaluate(() => document.fonts.ready)
    await tab.screenshot({ path: join(root, `public/og-${lang}.png`) })
    console.log(`og-${lang}.png`)
  }
} finally {
  await browser.close()
}
