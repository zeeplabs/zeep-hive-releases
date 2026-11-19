import type { Dict } from '../i18n/types'
import { Icon, type IconName } from '../components/Icon'
import { Rich } from '../lib/Rich'

const ICONS: IconName[] = ['tree', 'id', 'bolt', 'bell', 'pr', 'hand', 'branch', 'scan', 'gauge']
const BETA = 5
const REVEAL = ['rv', 'rv2', 'rv3']

export function Features({ t }: { t: Dict }) {
  const rows = [0, 3, 6].map((start) => t.features.items.slice(start, start + 3).map((item, j) => ({ ...item, i: start + j })))

  return (
    <section className="sec" id="features" aria-labelledby="features-title">
      <div className="wrap">
        <div className="head center rv">
          <h2 className="h2" id="features-title">{t.features.title}</h2>
          <p className="lead">{t.features.lead}</p>
        </div>
        <div className="combgrid">
          {rows.map((row, r) => (
            <div key={r} className={r === 1 ? 'combrow off' : 'combrow'}>
              {row.map((item, j) => (
                <article key={item.i} className={`tile ${REVEAL[j]}`}>
                  <div className="in">
                    <span className="ico"><Icon name={ICONS[item.i]} /></span>
                    <h3 className="h3">
                      {item.title}
                      {item.i === BETA && <span className="beta">{t.features.beta}</span>}
                    </h3>
                    <p><Rich text={item.body} /></p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
