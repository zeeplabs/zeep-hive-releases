import type { Dict, Lang } from '../i18n/types'
import { pathFor } from '../lib/routes'
import { Rich } from '../lib/Rich'

export function Legal({ t, lang, doc }: { t: Dict; lang: Lang; doc: 'privacy' | 'terms' }) {
  const d = t.legal[doc]
  const other = doc === 'privacy' ? 'terms' : 'privacy'
  return (
    <section className="sec legal" aria-labelledby="legal-title">
      <div className="wrap">
        <div className="head">
          <p className="legal-kicker">{d.kicker}</p>
          <h1 className="h2" id="legal-title">{d.title}</h1>
          <p className="lead">{d.intro}</p>
          <p className="legal-meta">
            {t.legal.updatedLabel}: {d.updated} · <a href={pathFor(other, lang)}>{t.legal[other].title}</a>
          </p>
        </div>
        <div className="legal-body">
          {d.sections.map((s) => (
            <section key={s.title}>
              <h2 className="h3">{s.title}</h2>
              {s.body.map((para) => (
                <p key={para}><Rich text={para} /></p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((item) => (
                    <li key={item}><Rich text={item} /></li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
