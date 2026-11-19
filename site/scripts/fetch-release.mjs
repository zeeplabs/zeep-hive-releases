import { readFile, writeFile } from 'node:fs/promises'
import { parseRelease } from './release-parse.mjs'

const REPO = 'zeeplabs/zeep-hive-releases'
const OUT = new URL('../src/data/release.json', import.meta.url)

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'hive-site-build' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

try {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers, signal: AbortSignal.timeout(15000) })
  if (!res.ok) throw new Error(`GitHub respondeu ${res.status}`)
  const data = parseRelease(await res.json())
  await writeFile(OUT, JSON.stringify(data, null, 2) + '\n')
  console.log(`release-data: Hive ${data.version} (${data.publishedAt})`)
} catch (err) {
  // Sem rede ou sem release válido: o build segue com o snapshot versionado, nunca com dado inventado.
  const snapshot = JSON.parse(await readFile(OUT, 'utf8'))
  console.warn(`release-data: usando o snapshot ${snapshot.version} (${err.message})`)
  if (process.env.REQUIRE_FRESH_RELEASE === '1') process.exit(1)
}
