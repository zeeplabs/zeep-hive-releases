import type { Lang, PageId } from './i18n/types'
import { dicts } from './lib/routes'
import { MotionProvider } from './lib/motion'
import { Nav } from './components/Nav'
import { CookieBanner } from './components/CookieBanner'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Download } from './pages/Download'
import { Legal } from './pages/Legal'
import { NotFound } from './pages/NotFound'

export function App({ page, lang }: { page: PageId; lang: Lang }) {
  const t = dicts[lang]
  return (
    <MotionProvider>
      <div className="lp">
        <a className="skip" href="#main">{t.nav.skip}</a>
        <Nav t={t} lang={lang} page={page} />
        <main id="main" tabIndex={-1}>
          {page === 'home' && <Home t={t} lang={lang} />}
          {page === 'download' && <Download t={t} />}
          {(page === 'privacy' || page === 'terms') && <Legal t={t} lang={lang} doc={page} />}
          {page === 'notFound' && <NotFound t={t} />}
        </main>
        <Footer t={t} lang={lang} />
        <CookieBanner t={t} lang={lang} />
      </div>
    </MotionProvider>
  )
}
