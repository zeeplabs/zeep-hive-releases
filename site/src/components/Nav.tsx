import { useEffect, useState } from 'react'
import type { Dict, Lang, PageId } from '../i18n/types'
import { LANG_KEY, otherLang, pathFor } from '../lib/routes'
import { Icon } from './Icon'
import logo from '../assets/logo-96.webp'

export function Nav({ t, lang, page }: { t: Dict; lang: Lang; page: PageId }) {
  const [open, setOpen] = useState(false)
  const home = pathFor('home', lang)
  const alt = otherLang(lang)
  const altHref = page === 'download' ? pathFor('download', alt) : pathFor('home', alt)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links: [string, string][] = [
    ['live', t.nav.live],
    ['identity', t.nav.identity],
    ['features', t.nav.features],
    ['privacy', t.nav.privacy],
  ]

  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href={home}>
          <img src={logo} alt="" width="30" height="30" />
          Hive
        </a>
        <button
          type="button"
          className="menubtn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} />
          <span className="sr-only">{t.nav.menu}</span>
        </button>
        <nav id="site-menu" className={open ? 'links open' : 'links'} aria-label={t.nav.main}>
          {links.map(([id, label]) => (
            <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a
            className="lang"
            href={altHref}
            onClick={() => {
              try {
                localStorage.setItem(LANG_KEY, alt)
              } catch {}
            }} hrefLang={alt === 'pt' ? 'pt-BR' : 'en'} lang={alt === 'pt' ? 'pt-BR' : 'en'}>
            <Icon name="globe" />
            <span aria-hidden="true">{t.nav.langShort}</span>
            <span className="sr-only">{t.nav.langLabel}</span>
          </a>
          <a className="btn honey sm" href={pathFor('download', lang)}>
            <Icon name="down" />
            {t.nav.download}
          </a>
        </nav>
      </div>
    </header>
  )
}
