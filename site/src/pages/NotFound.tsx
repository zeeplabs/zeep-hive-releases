import type { Dict } from '../i18n/types'
import { pathFor } from '../lib/routes'
import { Icon } from '../components/Icon'

export function NotFound({ t }: { t: Dict }) {
  return (
    <section className="nf" aria-labelledby="nf-title">
      <div className="wrap">
        <div className="nfhex" aria-hidden="true" />
        <h1 className="h2" id="nf-title">{t.notFound.title}</h1>
        <p className="lead">{t.notFound.body}</p>
        <div className="ctas">
          <a className="btn honey" href={pathFor('home', 'en')}>{t.notFound.home}</a>
          <a className="btn" href={pathFor('download', 'en')}><Icon name="down" />{t.notFound.download}</a>
        </div>
      </div>
    </section>
  )
}
