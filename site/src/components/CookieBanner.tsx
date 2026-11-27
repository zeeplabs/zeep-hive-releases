import { useEffect, useState } from 'react'
import type { Dict, Lang } from '../i18n/types'
import { pathFor } from '../lib/routes'
import { ANALYTICS_ENABLED, loadAnalytics, revokeAnalytics } from '../lib/analytics'
import { CONSENT_OPEN_EVENT, readConsent, writeConsent, type Consent } from '../lib/consent'

export function CookieBanner({ t, lang }: { t: Dict; lang: Lang }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return
    const saved = readConsent()
    if (saved === 'granted') loadAnalytics()
    else if (saved === null) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  if (!ANALYTICS_ENABLED || !open) return null

  const choose = (value: Consent) => {
    const before = readConsent()
    writeConsent(value)
    setOpen(false)
    if (value === 'granted') loadAnalytics()
    else if (before === 'granted') revokeAnalytics()
  }

  return (
    <div className="cookies" role="dialog" aria-labelledby="cookies-title" aria-describedby="cookies-body">
      <h2 className="h3" id="cookies-title">{t.cookies.title}</h2>
      <p id="cookies-body">
        {t.cookies.body} <a href={pathFor('privacy', lang)}>{t.cookies.policy}</a>
      </p>
      <div className="cookies-actions">
        <button type="button" className="btn sm" onClick={() => choose('denied')}>{t.cookies.reject}</button>
        <button type="button" className="btn sm" onClick={() => choose('granted')}>{t.cookies.accept}</button>
      </div>
    </div>
  )
}
