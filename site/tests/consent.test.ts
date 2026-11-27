import { describe, expect, it } from 'vitest'
import { parseConsent } from '../src/lib/consent'

describe('parseConsent', () => {
  it('só aceita os dois valores gravados pelo box de cookies', () => {
    expect(parseConsent('granted')).toBe('granted')
    expect(parseConsent('denied')).toBe('denied')
    expect(parseConsent(null)).toBeNull()
    expect(parseConsent('')).toBeNull()
    expect(parseConsent('true')).toBeNull()
  })
})
