import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const client = join(root, 'dist/client')
const out = join(root, 'dist/site')
const { render, routes } = await import(join(root, 'dist/server/entry-server.js'))
const SITE = 'https://hive.zeeplabs.com.br'

await rm(out, { recursive: true, force: true })
await cp(client, out, { recursive: true })
const template = await readFile(join(client, 'index.html'), 'utf8')

const assets = await readdir(join(client, 'assets'))
const preloads = assets
  .filter((f) => /^(bricolage-grotesque|instrument-sans)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
if (preloads.length !== 2) throw new Error(`esperava 2 fontes para preload, achei ${preloads.length}`)

for (const route of routes) {
  const { html, head } = render(route)
  const lang = route.lang === 'pt' ? 'pt-BR' : 'en'
  const page = template
    .replace('<html lang="pt-BR">', `<html lang="${lang}">`)
    .replace('<!--head-->', [...preloads, head].join('\n'))
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-page="${route.page}" data-lang="${route.lang}">${html}</div>`)
  const file = join(out, route.file)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
}

const today = new Date().toISOString().slice(0, 10)
const indexable = routes.filter((r) => r.page !== 'notFound')
const hreflang = { pt: 'pt-BR', en: 'en' }
const urls = indexable.map((r) => {
  const alts = indexable
    .filter((a) => a.page === r.page)
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${hreflang[a.lang]}" href="${SITE}${a.path}"/>`)
  const def = indexable.find((a) => a.page === r.page && a.lang === 'en')
  alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${def.path}"/>`)
  return `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n${alts.join('\n')}\n  </url>`
})
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
)
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /appcast.xml\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`prerender: ${routes.length} páginas, sitemap com ${indexable.length} URLs`)
