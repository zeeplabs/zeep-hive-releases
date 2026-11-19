import data from '../data/release.json'

export interface Release {
  version: string
  publishedAt: string
  size: number
  sha256: string
  dmgUrl: string
  notesUrl: string
}

export const release: Release = data

export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'America/Sao_Paulo' }).format(new Date(iso))
}

export function formatSize(bytes: number, locale: string): string {
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`
}

export const fill = (text: string, values: Record<string, string>): string =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? `{${key}}`)
