import { useEffect, useRef, useState } from 'react'
import type { Dict } from '../i18n/types'
import { REPO_URL } from '../lib/routes'
import { fill, formatDate, formatSize, release } from '../lib/release'
import { Rich } from '../lib/Rich'
import { Icon } from '../components/Icon'
import { HoneyJar } from '../components/HoneyJar'
import { MotionToggle } from '../components/MotionToggle'
import icon192 from '../assets/icon-192.webp'
import icon384 from '../assets/icon-384.webp'

function CopyButton({ text, t }: { text: string; t: Dict }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className="btn sm" type="button" onClick={copy} aria-label={t.download.copyLabel}>
      <Icon name={copied ? 'check' : 'copy'} />
      <span aria-live="polite">{copied ? t.download.copied : t.download.copy}</span>
    </button>
  )
}

export function Download({ t }: { t: Dict }) {
  const d = t.download
  const v = release.version
  const file = `Hive-${v}.dmg`
  const command = `shasum -a 256 ~/Downloads/${file}`
  const tags = { must: 'tag must', optional: 'tag', recommended: 'tag' }

  return (
    <>
      <section className="dlhero" aria-labelledby="dl-title">
        <div className="glow" aria-hidden="true" />
        <div className="wrap">
          <div className="dlgrid">
            <div className="vcard">
              <p className="kicker">
                <span className="live" aria-hidden="true" />
                <b>Hive {v}</b> {fill(d.kicker, { date: formatDate(release.publishedAt, t.locale) })}
              </p>
              <h1 className="mega dl" id="dl-title">
                {d.words.map((w, i) => (
                  <span key={i}>
                    <span className={i === 2 ? 'w honeytext' : 'w'} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>{w}</span>{' '}
                  </span>
                ))}
              </h1>
              <p className="lead"><Rich text={d.lead} /></p>
              <div className="ctas left">
                <a className="btn honey xl" href={release.dmgUrl}>
                  <Icon name="down" />
                  {fill(d.cta, { v })}
                </a>
              </div>
              <ul className="facts">
                <li><Icon name="mac" />{d.req}</li>
                <li><Icon name="shield" />{d.signed}</li>
                <li><Icon name="down" />{formatSize(release.size, t.locale)}</li>
              </ul>
              <p className="minilinks">
                <a href="#whats-new">{d.whatsNewLink}</a>
                <a href={`${REPO_URL}/releases`}>{d.previous}</a>
                <a href="#verify">{d.verifyLink}</a>
              </p>
            </div>
            <div className="dmgcol">
            <figure className="dmg zoom">
              <div aria-hidden="true">
                <div className="bar"><span className="dots"><i /><i /><i /></span><span className="title">Hive {v}</span></div>
                <div className="stage">
                  <div className="app"><img src={icon192} srcSet={`${icon192} 1x, ${icon384} 2x`} alt="" width="110" height="110" /><span>Hive</span></div>
                  <svg className="arrow" viewBox="0 0 90 40"><path d="M4 20h74M66 8l14 12-14 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div className="folder"><span className="fic" /><span>{d.apps}</span></div>
                </div>
              </div>
              <figcaption className="sr-only">{d.dmgLabel}</figcaption>
            </figure>
            <MotionToggle t={t} />
            </div>
          </div>
        </div>
      </section>

      <section className="sec comb" aria-labelledby="steps-title">
        <div className="wrap">
          <div className="head rv"><h2 className="h2" id="steps-title">{d.stepsTitle}</h2></div>
          <ol className="steps">
            {d.steps.map((s, i) => (
              <li key={s.title} className={`step ${['rv', 'rv2', 'rv3'][i]}`}>
                <span className="stepn" aria-hidden="true">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p><Rich text={s.body} /></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec" id="whats-new" aria-labelledby="new-title">
        <div className="wrap">
          <div className="idgrid top">
            <div className="rv">
              <h2 className="h2" id="new-title">{fill(d.whatsNew.title, { v: d.whatsNew.version })}</h2>
              <p className="lead spaced">{d.whatsNew.lead}</p>
              <a className="btn spaced" href={`${REPO_URL}/releases/tag/v${d.whatsNew.version}`}>
                {d.whatsNew.more}
                <Icon name="ext" />
              </a>
            </div>
            <ul className="news rv2">
              {d.whatsNew.points.map((p, i) => (
                <li key={p.b}><Icon name={i === 3 ? 'shield' : 'sparkle'} /><span><b>{p.b}</b> <Rich text={p.t} /></span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec comb" aria-labelledby="req-title">
        <div className="wrap">
          <div className="head rv"><h2 className="h2" id="req-title">{d.reqTitle}</h2><p className="lead">{d.reqLead}</p></div>
          <ul className="req">
            {d.reqItems.map((r, i) => (
              <li key={r.title} className={`rq ${['rv', 'rv2', 'rv3', 'rv'][i]}`}>
                <span className={tags[r.tag]}>{d.reqTags[r.tag]}</span>
                <h3 className="h3">{r.title}</h3>
                <p><Rich text={r.body} /></p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec" id="verify" aria-labelledby="verify-title">
        <div className="wrap">
          <div className="idgrid top">
            <div className="rv">
              <h2 className="h2" id="verify-title">{d.verifyTitle}</h2>
              <p className="lead spaced">{d.verifyLead}</p>
            </div>
            <div className="verify rv2">
              <div className="cmd">
                <span className="p" aria-hidden="true">$</span>
                <code className="plain">{command}</code>
                <CopyButton text={command} t={t} />
              </div>
              <div className="cmd">
                <span className="p">SHA-256</span>
                <code className="plain hash">{release.sha256}</code>
              </div>
              <p className="note"><Icon name="info" /><span>{d.secretsNote}</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec comb" aria-labelledby="updates-title">
        <div className="wrap">
          <div className="idgrid">
            <div className="rv"><h2 className="h2" id="updates-title">{d.updatesTitle}</h2></div>
            <ul className="news rv2">
              {d.updates.map((u, i) => (
                <li key={u.b}><Icon name={(['refresh', 'shield', 'info'] as const)[i]} /><span><b>{u.b}</b> {u.t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <HoneyJar>
        <h2 className="h2">{d.issueTitle}</h2>
        <a className="btn dark xl" href={`${REPO_URL}/issues`}>
          {d.issueCta}
          <Icon name="ext" />
        </a>
        <p className="sub">{d.issueSub}</p>
      </HoneyJar>
    </>
  )
}
