import type { Dict, Lang } from '../i18n/types'
import { pathFor, REPO_URL } from '../lib/routes'

export function Footer({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <span>{t.footer.product}</span>
        <nav aria-label={t.footer.nav}>
          <a href={pathFor('home', lang)}>{t.footer.home}</a>
          <a href={pathFor('download', lang)}>{t.footer.download}</a>
          <a href={`${REPO_URL}/releases`}>{t.footer.notes}</a>
          <a href={`${REPO_URL}/issues`}>{t.footer.issue}</a>
          <a href={`${pathFor('home', lang)}#privacy`}>{t.footer.privacy}</a>
        </nav>
      </div>
    </footer>
  )
}
