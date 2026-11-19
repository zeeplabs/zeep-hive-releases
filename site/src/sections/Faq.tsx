import type { Dict } from '../i18n/types'
import { Icon } from '../components/Icon'
import { Rich } from '../lib/Rich'

export function Faq({ t }: { t: Dict }) {
  return (
    <section className="sec comb" id="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="head rv">
          <h2 className="h2" id="faq-title">{t.faq.title}</h2>
        </div>
        <div className="faq">
          {t.faq.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                <h3>{item.q}</h3>
                <span className="pm" aria-hidden="true"><Icon name="plus" /></span>
              </summary>
              <p><Rich text={item.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
