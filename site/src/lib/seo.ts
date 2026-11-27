import type { Route } from './routes'
import { DEFAULT_LANG, dicts, LANG_REDIRECT, routes, SITE } from './routes'
import { formatSize, release } from './release'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const json = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c')
const plain = (s: string) => s.replace(/`/g, '')

const HREFLANG = { pt: 'pt-BR', en: 'en' } as const

function software(route: Route) {
  const t = dicts[route.lang]
  return {
    '@type': 'SoftwareApplication',
    name: 'Hive',
    description: t.meta.home.description,
    url: `${SITE}${route.path}`,
    image: `${SITE}/apple-touch-icon.png`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS 14 Sonoma or later',
    softwareVersion: release.version,
    datePublished: release.publishedAt.slice(0, 10),
    downloadUrl: release.dmgUrl,
    fileSize: formatSize(release.size, 'en-US'),
    releaseNotes: release.notesUrl,
    publisher: { '@type': 'Organization', name: 'ZeepLabs' },
  }
}

function structuredData(route: Route): unknown[] {
  const t = dicts[route.lang]
  const home = routes.find((r) => r.page === 'home' && r.lang === route.lang)!
  if (route.page === 'home') {
    return [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Hive', url: `${SITE}${route.path}`, inLanguage: t.htmlLang },
      { '@context': 'https://schema.org', ...software(route) },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
        })),
      },
    ]
  }
  if (route.page === 'download') {
    return [
      { '@context': 'https://schema.org', ...software(route) },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Hive', item: `${SITE}${home.path}` },
          { '@type': 'ListItem', position: 2, name: t.nav.download, item: `${SITE}${route.path}` },
        ],
      },
    ]
  }
  return []
}

export function buildHead(route: Route): string {
  const t = dicts[route.lang]
  const meta = t.meta[route.page]
  const url = `${SITE}${route.path}`
  const image = `${SITE}/og-${route.lang}.png`
  const tags: string[] = []
  if (route.lang === DEFAULT_LANG && route.page !== 'notFound') tags.push(LANG_REDIRECT)
  const gsc = import.meta.env.VITE_GSC_VERIFICATION
  if (gsc) tags.push(`<meta name="google-site-verification" content="${esc(gsc)}">`)
  tags.push(
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}">`,
  )

  if (route.page === 'notFound') {
    tags.push('<meta name="robots" content="noindex">')
  } else {
    tags.push(`<link rel="canonical" href="${url}">`)
    for (const alt of routes.filter((r) => r.page === route.page)) {
      tags.push(`<link rel="alternate" hreflang="${HREFLANG[alt.lang]}" href="${SITE}${alt.path}">`)
    }
    const fallback = routes.find((r) => r.page === route.page && r.lang === DEFAULT_LANG)!
    tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE}${fallback.path}">`)
    tags.push(
      `<meta property="og:type" content="website">`,
      `<meta property="og:site_name" content="Hive">`,
      `<meta property="og:title" content="${esc(meta.title)}">`,
      `<meta property="og:description" content="${esc(meta.description)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:locale" content="${t.ogLocale}">`,
      `<meta property="og:locale:alternate" content="${route.lang === 'pt' ? dicts.en.ogLocale : dicts.pt.ogLocale}">`,
      `<meta property="og:image" content="${image}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="${esc(meta.title)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${esc(meta.title)}">`,
      `<meta name="twitter:description" content="${esc(meta.description)}">`,
      `<meta name="twitter:image" content="${image}">`,
    )
  }

  for (const data of structuredData(route)) {
    tags.push(`<script type="application/ld+json">${json(data)}</script>`)
  }
  return tags.join('\n')
}
