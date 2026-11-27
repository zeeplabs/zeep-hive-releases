import type { Dict, Lang } from '../i18n/types'
import { pathFor } from '../lib/routes'
import { Hero } from '../sections/Hero'
import { LiveDemo } from '../sections/LiveDemo'
import { Identity } from '../sections/Identity'
import { Features } from '../sections/Features'
import { Delegation } from '../sections/Delegation'
import { Native } from '../sections/Native'
import { Faq } from '../sections/Faq'
import { HoneyJar } from '../components/HoneyJar'
import { Icon } from '../components/Icon'
import icon192 from '../assets/icon-192.webp'
import icon384 from '../assets/icon-384.webp'

export function Home({ t, lang }: { t: Dict; lang: Lang }) {
  return (
    <>
      <Hero t={t} lang={lang} />
      <LiveDemo t={t} />
      <Identity t={t} />
      <Features t={t} />
      <Delegation t={t} />
      <Native t={t} />
      <Faq t={t} />
      <HoneyJar>
        <img src={icon192} srcSet={`${icon192} 1x, ${icon384} 2x`} alt="" width="92" height="92" />
        <h2 className="h2">{t.final.title}</h2>
        <a className="btn dark xl" href={pathFor('download', lang)}>
          <Icon name="down" />
          {t.final.cta}
        </a>
        <p className="sub">{t.final.req}</p>
      </HoneyJar>
    </>
  )
}
