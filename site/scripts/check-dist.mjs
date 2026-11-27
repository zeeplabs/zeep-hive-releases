import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist/site')
const files = ['index.html', 'download/index.html', 'privacy/index.html', 'terms/index.html', 'pt/index.html', 'pt/download/index.html', 'pt/privacy/index.html', 'pt/terms/index.html', '404.html']
const errors = []
const fail = (msg) => errors.push(msg)

for (const file of files) {
  const path = join(out, file)
  if (!existsSync(path)) {
    fail(`${file}: não gerado`)
    continue
  }
  const html = await readFile(path, 'utf8')
  const is404 = file === '404.html'
  if (!/<html lang="(pt-BR|en)">/.test(html)) fail(`${file}: lang ausente`)
  if (!/<title>[^<]{10,70}<\/title>/.test(html)) fail(`${file}: title ausente ou fora de 10–70 caracteres`)
  const desc = html.match(/<meta name="description" content="([^"]*)">/)?.[1] ?? ''
  if (!is404 && (desc.length < 50 || desc.length > 170)) fail(`${file}: description com ${desc.length} caracteres`)
  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(`${file}: precisa de exatamente um <h1>`)
  if (!html.includes('data-page=')) fail(`${file}: conteúdo não pré-renderizado`)
  if (/\{v\}|\{date\}|undefined|NaN|\[object/.test(html.replace(/<script type="module"[\s\S]*?<\/script>/g, ''))) fail(`${file}: placeholder ou valor quebrado no HTML`)
  if (is404) {
    if (!html.includes('content="noindex"')) fail('404.html: falta noindex')
  } else {
    if (!/<link rel="canonical" href="https:\/\/hive\.zeeplabs\.com\.br\/[^"]*">/.test(html)) fail(`${file}: canonical ausente`)
    if ((html.match(/hreflang=/g) ?? []).length !== 3) fail(`${file}: esperava 3 hreflang (pt-BR, en, x-default)`)
    if (!html.includes('og:image')) fail(`${file}: og:image ausente`)
    const isEn = html.includes('<html lang="en">')
    if (isEn !== html.includes("location.replace('/pt'")) fail(`${file}: redirecionamento por idioma deve existir só nas páginas em inglês`)
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1])
    } catch {
      fail(`${file}: JSON-LD inválido`)
    }
  }
  for (const m of html.matchAll(/(?:src|href|srcset)="(\/[^"#?]*)"/g)) {
    for (const ref of m[1].split(/,\s*/).map((s) => s.split(' ')[0])) {
      if (ref.startsWith('/') && !ref.endsWith('/') && !existsSync(join(out, ref))) fail(`${file}: referência quebrada ${ref}`)
    }
  }
}

for (const f of ['sitemap.xml', 'robots.txt', 'og-pt.png', 'og-en.png', 'favicon-32.png', 'apple-touch-icon.png']) {
  if (!existsSync(join(out, f))) fail(`${f}: ausente`)
}
const sitemap = existsSync(join(out, 'sitemap.xml')) ? await readFile(join(out, 'sitemap.xml'), 'utf8') : ''
if ((sitemap.match(/<loc>/g) ?? []).length !== 8) fail('sitemap.xml: esperava 8 URLs')

const release = JSON.parse(await readFile(join(root, 'src/data/release.json'), 'utf8'))
const ptSrc = await readFile(join(root, 'src/i18n/pt.ts'), 'utf8')
const whatsNew = ptSrc.match(/whatsNew: \{\s*version: '([^']+)'/)?.[1]
if (whatsNew !== release.version) {
  console.warn(`check-dist: AVISO "O que há de novo" descreve a ${whatsNew}, mas a última versão é ${release.version}. Atualize download.whatsNew em src/i18n.`)
}

if (errors.length) {
  console.error(`check-dist: ${errors.length} problema(s)\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log(`check-dist: ok (${files.length} páginas)`)
