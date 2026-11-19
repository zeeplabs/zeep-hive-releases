const DMG = /^Hive-(\d+\.\d+\.\d+)\.dmg$/
const SHA = /^[0-9a-f]{64}$/

/**
 * Reduz a resposta de GET /repos/{repo}/releases/latest aos dados que o site mostra.
 * Lança erro se faltar algo, para o build não publicar um link ou hash quebrado.
 */
export function parseRelease(json) {
  if (!json || typeof json !== 'object') throw new Error('resposta vazia')
  const asset = (json.assets ?? []).find((a) => DMG.test(a?.name ?? ''))
  if (!asset) throw new Error('nenhum Hive-<versão>.dmg no release')
  const version = asset.name.match(DMG)[1]
  if (json.tag_name !== `v${version}`) throw new Error(`tag ${json.tag_name} não bate com ${asset.name}`)

  let sha256 = typeof asset.digest === 'string' && asset.digest.startsWith('sha256:') ? asset.digest.slice(7) : ''
  if (!SHA.test(sha256)) sha256 = (json.body ?? '').match(/```\s*\n([0-9a-f]{64})\s*\n```/)?.[1] ?? ''
  if (!SHA.test(sha256)) throw new Error('SHA-256 do DMG não encontrado')

  const publishedAt = json.published_at
  if (!publishedAt || Number.isNaN(Date.parse(publishedAt))) throw new Error('published_at inválido')
  if (!Number.isInteger(asset.size) || asset.size <= 0) throw new Error('tamanho do DMG inválido')
  if (!String(asset.browser_download_url).startsWith('https://github.com/')) throw new Error('URL do DMG inesperada')
  if (!String(json.html_url).startsWith('https://github.com/')) throw new Error('URL do release inesperada')

  return {
    version,
    publishedAt,
    size: asset.size,
    sha256,
    dmgUrl: asset.browser_download_url,
    notesUrl: json.html_url,
  }
}
