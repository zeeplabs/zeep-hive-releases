export type Consent = 'granted' | 'denied'

export const CONSENT_KEY = 'hive-consent'
/** Disparado em window quando o box de cookies deve abrir de novo (link do rodapé). */
export const CONSENT_OPEN_EVENT = 'hive-consent-open'

export function parseConsent(value: string | null): Consent | null {
  return value === 'granted' || value === 'denied' ? value : null
}

export function readConsent(): Consent | null {
  try {
    return parseConsent(localStorage.getItem(CONSENT_KEY))
  } catch {
    return null
  }
}

export function writeConsent(value: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {}
}
