import type { CSSProperties } from 'react'
import type { Dict } from '../i18n/types'
import { Icon } from '../components/Icon'
import { Rich } from '../lib/Rich'

const REVEAL = ['rv', 'rv2', 'rv3', 'rv']

export function ComputerUse({ t }: { t: Dict }) {
  const c = t.computerUse
  return (
    <section className="sec" id="computer-use" aria-labelledby="computer-use-title">
      <div className="wrap">
        <div className="head rv">
          <p className="dlg-kicker">
            {c.kicker} <span className="beta">{t.features.beta}</span>
          </p>
          <h2 className="h2" id="computer-use-title">{c.title}</h2>
          <p className="lead">{c.lead}</p>
          <p className="dlg-note" role="note">
            <span className="beta">{t.features.beta}</span> {c.betaNote}
          </p>
        </div>

        <figure className="cu-stage rv2" role="img" aria-label={c.mockLabel}>
          <div className="cu-card cu-dialog" aria-hidden="true">
            <p className="cu-tag">{c.exampleTag}</p>
            <h3 className="cu-dtitle">{c.dialog.title}</h3>
            <p className="cu-dbody">{c.dialog.body}</p>
            <ul className="cu-scope">
              <li className="on"><span className="radio" />{c.dialog.scopeApp}</li>
              <li><span className="radio" />{c.dialog.scopeAny}</li>
            </ul>
            <p className="cu-check"><span className="box" />{c.dialog.foreground}</p>
            <p className="cu-notice">{c.dialog.notice}</p>
            <div className="cu-btns">
              <span className="cu-btn">{c.dialog.deny}</span>
              <span className="cu-btn primary">{c.dialog.allow}</span>
            </div>
          </div>

          <div className="cu-link" aria-hidden="true">
            <svg viewBox="0 0 80 24" width="80" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12h68M62 4l10 8-10 8" />
            </svg>
          </div>

          <div className="cu-card cu-run" aria-hidden="true">
            <div className="cu-runhead">
              <h3 className="cu-dtitle">{c.run.title}</h3>
              <span className="cu-meta">{c.run.meta}</span>
            </div>
            <ol className="cu-steps">
              {c.run.steps.map((step, i) => (
                <li key={step} style={{ '--i': i } as CSSProperties}>
                  <span className="n">{i + 1}</span>
                  <span className="txt">{step}</span>
                  <span className="ok"><Icon name="check" />{c.run.verified}</span>
                </li>
              ))}
            </ol>
            <p className="cu-cap">{c.run.caption}</p>
          </div>
        </figure>

        <div className="dlglist cu-items">
          {c.items.map((item, i) => (
            <div key={item.title} className={REVEAL[i]}>
              <h3 className="h3">{item.title}</h3>
              <p><Rich text={item.body} /></p>
            </div>
          ))}
        </div>

        <div className="cu-safety">
          <div className="cu-panel rv">
            <h3 className="h3">{c.blockedTitle}</h3>
            <ul className="cu-chips">
              {c.blocked.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>{c.blockedNote}</p>
          </div>
          <div className="cu-panel rv2">
            <h3 className="h3">{c.limitsTitle}</h3>
            <ul className="cu-limits">
              {c.limits.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
