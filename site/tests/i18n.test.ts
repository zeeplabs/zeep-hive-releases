import { describe, expect, it } from 'vitest'
import { pt } from '../src/i18n/pt'
import { en } from '../src/i18n/en'

function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]))
  return typeof value
}

const strings = (value: unknown): string[] =>
  typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : []

describe('dicionários', () => {
  it('PT e EN têm a mesma estrutura, inclusive o tamanho das listas', () => {
    expect(shape(en)).toEqual(shape(pt))
  })

  it('nenhum texto vazio ou com crase sem par', () => {
    for (const s of [...strings(pt), ...strings(en)]) {
      expect(s.trim()).not.toBe('')
      expect((s.match(/`/g) ?? []).length % 2).toBe(0)
    }
  })

  it('não cita a Starbem', () => {
    for (const s of [...strings(pt), ...strings(en)]) expect(s.toLowerCase()).not.toContain('starbem')
  })
})
