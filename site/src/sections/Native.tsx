import type { Dict } from '../i18n/types'

export function Native({ t }: { t: Dict }) {
  return (
    <section className="sec" aria-labelledby="native-title">
      <div className="wrap">
        <div className="native">
          <div className="rv">
            <h2 className="h2" id="native-title">{t.native.title}</h2>
            <p className="lead spaced">{t.native.lead}</p>
            <ul className="stack">
              {t.native.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
          <div className="minis rv2" aria-hidden="true">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="mini"><i /><i /><i /><i /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
