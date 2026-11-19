import type { PointerEvent } from 'react'
import type { Dict, Lang } from '../i18n/types'
import { pathFor } from '../lib/routes'
import { fill, release } from '../lib/release'
import { Icon } from '../components/Icon'

interface Cell {
  cls: string
  x: number
  y: number
  d: string
}

function buildCells(): Cell[] {
  const cells: Cell[] = []
  let i = 0
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 26; c++) {
      const a = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1
      const kind = a < 0.05 ? 'run' : a < 0.075 ? 'wait' : a < 0.11 ? 'done' : a < 0.145 ? 'sky' : ''
      const x = c * 64 + (r % 2 ? 32 : 0) - 20
      const y = r * 55 - 20
      const dist = Math.hypot(x - 810, y - 380)
      cells.push({ cls: kind ? `cell ${kind}` : 'cell', x, y, d: `${(0.15 + (dist / 900) * 1.5).toFixed(2)}s` })
      i++
    }
  }
  return cells
}

const cells = buildCells()

function onPointerMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function Hero({ t, lang }: { t: Dict; lang: Lang }) {
  const words = (list: string[], base: number) =>
    list.map((w, i) => (
      <span key={i}>
        <span className="w" style={{ animationDelay: `${(base + i * 0.09).toFixed(2)}s` }}>
          {w}
        </span>{' '}
      </span>
    ))

  return (
    <section className="hero" onPointerMove={onPointerMove} aria-labelledby="hero-title">
      <div className="field" aria-hidden="true">
        {cells.map((c, i) => (
          <div key={i} className={c.cls} style={{ left: c.x, top: c.y, animationDelay: c.d }} />
        ))}
      </div>
      <div className="spot" aria-hidden="true" />
      <div className="wrap">
        <div className="top">
          <p className="kicker">
            <span className="live" aria-hidden="true" />
            <b>{fill(t.hero.kickerNew, { v: release.version })}</b> {t.hero.kickerText}
          </p>
          <h1 className="mega" id="hero-title">
            <span className="row">{words(t.hero.line1, 0.25)}</span>
            <span className="row honeytext">{words(t.hero.line2, 0.5)}</span>
          </h1>
          <p className="lead">{t.hero.lead}</p>
          <div className="ctas">
            <a className="btn honey xl" href={pathFor('download', lang)}>
              <Icon name="down" />
              {t.hero.ctaDownload}
            </a>
            <a className="btn xl" href="#live">
              {t.hero.ctaLive}
            </a>
          </div>
          <ul className="agents" aria-label={t.hero.agentsLabel}>
            <li>Claude Code</li>
            <li>Codex</li>
            <li>opencode</li>
            <li>shell</li>
          </ul>
        </div>
      </div>
      <span className="scrollcue" aria-hidden="true" />
    </section>
  )
}
