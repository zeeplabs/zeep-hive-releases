import type { Dict, Lang, PageId } from '../i18n/types'
import { pt } from '../i18n/pt'
import { en } from '../i18n/en'

export const SITE = 'https://hive.zeeplabs.com.br'
export const REPO_URL = 'https://github.com/zeeplabs/zeep-hive-releases'

export const dicts: Record<Lang, Dict> = { pt, en }

export interface Route {
  page: PageId
  lang: Lang
  path: string
  file: string
}

export const routes: Route[] = [
  { page: 'home', lang: 'en', path: '/', file: 'index.html' },
  { page: 'download', lang: 'en', path: '/download/', file: 'download/index.html' },
  { page: 'home', lang: 'pt', path: '/pt/', file: 'pt/index.html' },
  { page: 'download', lang: 'pt', path: '/pt/download/', file: 'pt/download/index.html' },
  { page: 'notFound', lang: 'en', path: '/404.html', file: '404.html' },
]

export const DEFAULT_LANG: Lang = 'en'
export const LANG_KEY = 'hive-lang'

/**
 * Roda no <head> das páginas em inglês, antes da pintura: leva para /pt/ quem tem português como idioma principal
 * do navegador, salvo se a pessoa já escolheu um idioma no menu.
 */
export const LANG_REDIRECT = `<script>(function(){try{var p=localStorage.getItem('${LANG_KEY}');if(p==='en')return;var l=(navigator.languages&&navigator.languages[0])||navigator.language||'';if(p==='pt'||/^pt(-|$)/i.test(l))location.replace('/pt'+location.pathname+location.search+location.hash)}catch(e){}})()</script>`

export function pathFor(page: Exclude<PageId, 'notFound'>, lang: Lang): string {
  const route = routes.find((r) => r.page === page && r.lang === lang)
  if (!route) throw new Error(`rota inexistente: ${page}/${lang}`)
  return route.path
}

export const otherLang = (lang: Lang): Lang => (lang === 'pt' ? 'en' : 'pt')
