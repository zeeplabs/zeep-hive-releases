import type { Dict, Lang } from '../i18n/types'
import { pathFor, REPO_URL } from '../lib/routes'
import { MotionToggle } from './MotionToggle'
import logo1x from '../assets/logo-full-72.webp'
import logo2x from '../assets/logo-full-144.webp'

export function Footer({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <a className="footlogo" href={pathFor('home', lang)}>
          <img src={logo1x} srcSet={`${logo1x} 1x, ${logo2x} 2x`} alt={t.footer.product} width="180" height="72" />
        </a>
        <MotionToggle t={t} />
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
