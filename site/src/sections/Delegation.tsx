import type { Dict } from '../i18n/types'
import { Rich } from '../lib/Rich'

const DISP = 'Bricolage Grotesque Variable, sans-serif'
const BODY = 'Instrument Sans Variable, sans-serif'
const ASK = 'M300 175 C 350 175, 370 175, 420 175'
const GIVE = 'M680 175 C 730 175, 750 175, 800 175'
const AUTO = 'M300 140 C 420 20, 680 20, 800 140'

export function Delegation({ t }: { t: Dict }) {
  const d = t.delegation
  return (
    <section className="sec comb" id="delegation" aria-labelledby="delegation-title">
      <div className="wrap">
        <div className="head rv">
          <p className="dlg-kicker">
            {d.kicker} <span className="beta">{t.features.beta}</span>
          </p>
          <h2 className="h2" id="delegation-title">{d.title}</h2>
          <p className="lead">{d.lead}</p>
          <p className="dlg-note" role="note">
            <span className="beta">{t.features.beta}</span> {d.betaNote}
          </p>
        </div>
        <div className="dlgbox rv2">
          <svg className="dlg" viewBox="0 0 1100 320" role="img" aria-label={d.diagramLabel}>
            <rect x="20" y="30" width="1060" height="262" rx="28" fill="none" stroke="#3A2E1E" strokeWidth="1.5" strokeDasharray="6 8" />
            <text x="48" y="276" fill="#BBAA8C" fontFamily={BODY} fontSize="14">{d.orgLabel}</text>
            <path d={AUTO} fill="none" stroke="#5A4729" strokeWidth="2" className="flow" />
            <path d={AUTO} fill="none" stroke="#6FDCA0" strokeWidth="4" strokeLinecap="round" className="pkt2" />
            <text x="550" y="90" textAnchor="middle" fill="#6FDCA0" fontFamily={BODY} fontSize="15">{d.autoLabel}</text>
            <path d={ASK} fill="none" stroke="#5A4729" strokeWidth="2" className="flow" />
            <path d={ASK} fill="none" stroke="#FFC65C" strokeWidth="4" strokeLinecap="round" className="pkt" />
            <path d={GIVE} fill="none" stroke="#5A4729" strokeWidth="2" className="flow2" />
            <path d={GIVE} fill="none" stroke="#FFC65C" strokeWidth="4" strokeLinecap="round" className="pkt" />
            <rect x="40" y="120" width="260" height="110" rx="20" fill="#241C12" stroke="#7CB7FF" strokeWidth="1.5" />
            <text x="64" y="166" fill="#F5E6C8" fontFamily={DISP} fontSize="22" fontWeight="700">{d.agentA}</text>
            <text x="64" y="194" fill="#BBAA8C" fontFamily={BODY} fontSize="15">{d.agentASub}</text>
            <rect x="420" y="105" width="260" height="140" rx="20" fill="#1C160E" stroke="#F5A524" strokeWidth="2" />
            <polygon points="450,140 466,149 466,167 450,176 434,167 434,149" fill="#F5A524" />
            <text x="482" y="164" fill="#F5E6C8" fontFamily={DISP} fontSize="20" fontWeight="700">{d.gateTitle}</text>
            <text x="440" y="206" fill="#BBAA8C" fontFamily={BODY} fontSize="15">{d.gateSub}</text>
            <rect x="800" y="120" width="260" height="110" rx="20" fill="#241C12" stroke="#7CB7FF" strokeWidth="1.5" />
            <text x="824" y="166" fill="#F5E6C8" fontFamily={DISP} fontSize="22" fontWeight="700">{d.agentB}</text>
            <text x="824" y="194" fill="#BBAA8C" fontFamily={BODY} fontSize="15">{d.agentBSub}</text>
          </svg>
        </div>
        <div className="dlglist">
          {d.items.map((item, i) => (
            <div key={item.title} className={['rv', 'rv2', 'rv3', 'rv'][i]}>
              <h3 className="h3">{item.title}</h3>
              <p><Rich text={item.body} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
