import { describe, expect, it } from 'vitest'
// @ts-expect-error módulo JS sem tipos
import { parseRelease } from '../scripts/release-parse.mjs'

const SHA = 'b38e876b0436145afa35a5acd7a44edf01de3dd1b8c89d1ddc7958f662b65a4c'
const base = () => ({
  tag_name: 'v0.3.0',
  html_url: 'https://github.com/zeeplabs/zeep-hive-releases/releases/tag/v0.3.0',
  published_at: '2026-11-19T18:12:00Z',
  body: `notes\n\n**SHA-256** of \`Hive-0.3.0.dmg\`:\n\n\`\`\`\n${SHA}\n\`\`\`\n`,
  assets: [
    { name: 'notes.txt', size: 10, browser_download_url: 'https://github.com/x' },
    {
      name: 'Hive-0.3.0.dmg',
      size: 12380159,
      digest: `sha256:${SHA}`,
      browser_download_url: 'https://github.com/zeeplabs/zeep-hive-releases/releases/download/v0.3.0/Hive-0.3.0.dmg',
    },
  ],
})

describe('parseRelease', () => {
  it('extrai versão, tamanho, hash e links do DMG', () => {
    expect(parseRelease(base())).toEqual({
      version: '0.3.0',
      publishedAt: '2026-11-19T18:12:00Z',
      size: 12380159,
      sha256: SHA,
      dmgUrl: 'https://github.com/zeeplabs/zeep-hive-releases/releases/download/v0.3.0/Hive-0.3.0.dmg',
      notesUrl: 'https://github.com/zeeplabs/zeep-hive-releases/releases/tag/v0.3.0',
    })
  })

  it('usa o SHA-256 das notas quando o asset não traz digest', () => {
    const json = base()
    delete (json.assets[1] as { digest?: string }).digest
    expect(parseRelease(json).sha256).toBe(SHA)
  })

  it('recusa release sem DMG', () => {
    const json = base()
    json.assets = json.assets.slice(0, 1)
    expect(() => parseRelease(json)).toThrow(/dmg/i)
  })

  it('recusa tag que não bate com o nome do DMG', () => {
    expect(() => parseRelease({ ...base(), tag_name: 'v0.2.0' })).toThrow(/não bate/)
  })

  it('recusa release sem hash em lugar nenhum', () => {
    const json = base()
    delete (json.assets[1] as { digest?: string }).digest
    json.body = 'sem hash'
    expect(() => parseRelease(json)).toThrow(/SHA-256/)
  })

  it('recusa URL de download fora do GitHub', () => {
    const json = base()
    json.assets[1].browser_download_url = 'https://exemplo.com/Hive-0.3.0.dmg'
    expect(() => parseRelease(json)).toThrow(/URL/)
  })
})
