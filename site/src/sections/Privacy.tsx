import type { Dict } from '../i18n/types'
import { Rich } from '../lib/Rich'

const DISP = 'Bricolage Grotesque Variable, sans-serif'
const BODY = 'Instrument Sans Variable, sans-serif'
const FEED = 'M300 190 C 480 190, 560 80, 760 80'
const GH = 'M300 240 C 480 240, 560 220, 760 220'

export function Privacy({ t }: { t: Dict }) {
  const p = t.privacy
  return (
    <section className="sec comb" id="privacy" aria-labelledby="privacy-title">
      <div className="wrap">
        <div className="head rv">
          <h2 className="h2" id="privacy-title">{p.title}</h2>
          <p className="lead">{p.lead}</p>
        </div>
        <div className="netbox rv2">
          <svg className="net" viewBox="0 0 1100 440" role="img" aria-label={p.diagramLabel}>
            <path d={FEED} fill="none" stroke="#5A4729" strokeWidth="2" className="flow" />
            <path d={FEED} fill="none" stroke="#FFC65C" strokeWidth="4" strokeLinecap="round" className="pkt" />
            <path d={GH} fill="none" stroke="#5A4729" strokeWidth="2" className="flow2" />
            <path d={GH} fill="none" stroke="#7CB7FF" strokeWidth="4" strokeLinecap="round" className="pkt2" />
            <path d="M300 270 C 420 290, 500 360, 610 360" fill="none" stroke="#5A4729" strokeWidth="2" className="blocked" />
            <g className="x">
              <circle cx="632" cy="360" r="18" fill="#2A1A14" stroke="#E0644F" strokeWidth="2" />
              <path d="M625 353l14 14M639 353l-14 14" stroke="#E0644F" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <rect x="40" y="140" width="260" height="160" rx="22" fill="#241C12" stroke="#5A4729" strokeWidth="1.5" />
            <polygon points="86,186 104,196 104,216 86,226 68,216 68,196" fill="#F5A524" />
            <text x="124" y="200" fill="#F5E6C8" fontFamily={DISP} fontSize="24" fontWeight="700">{p.mac}</text>
            <text x="124" y="226" fill="#BBAA8C" fontFamily={BODY} fontSize="15">{p.macSub}</text>
            <text x="68" y="270" fill="#BBAA8C" fontFamily={BODY} fontSize="13">{p.keychain}</text>
            <rect x="760" y="40" width="300" height="80" rx="16" fill="#1C160E" stroke="#F5A524" strokeWidth="1.5" />
            <text x="782" y="74" fill="#F5E6C8" fontFamily={DISP} fontSize="19" fontWeight="700">{p.feedTitle}</text>
            <text x="782" y="98" fill="#BBAA8C" fontFamily={BODY} fontSize="14">{p.feedSub}</text>
            <rect x="760" y="180" width="300" height="80" rx="16" fill="#1C160E" stroke="#7CB7FF" strokeWidth="1.5" />
            <text x="782" y="214" fill="#F5E6C8" fontFamily={DISP} fontSize="19" fontWeight="700">{p.ghTitle}</text>
            <text x="782" y="238" fill="#BBAA8C" fontFamily={BODY} fontSize="14">{p.ghSub}</text>
            <text x="670" y="352" fill="#F5E6C8" fontFamily={DISP} fontSize="19" fontWeight="700">{p.blockedTitle}</text>
            <text x="670" y="378" fill="#BBAA8C" fontFamily={BODY} fontSize="14">{p.blockedSub}</text>
          </svg>
        </div>
        <div className="privlist">
          {p.items.map((item, i) => (
            <div key={item.title} className={['rv', 'rv2', 'rv3'][i]}>
              <h3 className="h3">{item.title}</h3>
              <p><Rich text={item.body} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
