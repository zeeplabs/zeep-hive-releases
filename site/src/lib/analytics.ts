/**
 * Ferramentas do Google do site. Nada daqui carrega antes do aceite no box de cookies, e cada uma só liga se o
 * ID dela estiver definido no build (VITE_*). Sem nenhum ID, o site não tem box de cookies nem carrega nada.
 */
const env = import.meta.env

export const GTM_ID: string = env.VITE_GTM_ID ?? ''
export const GA_ID: string = env.VITE_GA_ID ?? ''
export const ANALYTICS_ENABLED = Boolean(GTM_ID || GA_ID)

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let loaded = false

function addScript(src: string) {
  const el = document.createElement('script')
  el.async = true
  el.src = src
  document.head.appendChild(el)
}

export function loadAnalytics(): void {
  if (loaded || !ANALYTICS_ENABLED) return
  loaded = true

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  // Só medição de visitas: nada de publicidade.
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  if (GTM_ID) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    addScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`)
  }
  if (GA_ID) {
    addScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`)
    window.gtag('js', new Date())
    window.gtag('config', GA_ID)
  }
}

/** Quem tinha aceitado e recusou depois: apaga os cookies do Google deste site e recarrega sem as ferramentas. */
export function revokeAnalytics(): void {
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (/^(_ga|_gid|_gat|_gcl|FPID|FPLC)/.test(name)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname}`
    }
  }
  location.reload()
}
