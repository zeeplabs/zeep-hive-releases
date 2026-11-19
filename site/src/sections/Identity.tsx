import { useRef, useState, type KeyboardEvent } from 'react'
import type { Dict } from '../i18n/types'
import { Icon } from '../components/Icon'
import { Rich } from '../lib/Rich'

interface Org {
  color: string
  email: string
  gh: string
  key: string
  dirVar: string
  dir: string | null
  scrubbed: string
}

const ORGS: Org[] = [
  { color: '#F5A524', email: 'voce@pessoal.dev', gh: 'voce-pessoal', key: 'id_pessoal', dirVar: 'CLAUDE_CONFIG_DIR', dir: '~/.config/hive/pessoal/claude', scrubbed: 'GH_TOKEN=ghp_••••••••' },
  { color: '#7CB7FF', email: 'voce@cliente-a.com', gh: 'voce-cliente-a', key: 'id_cliente_a', dirVar: 'CODEX_HOME', dir: '~/.config/hive/cliente-a/codex', scrubbed: 'ANTHROPIC_API_KEY=sk-••••••••' },
  { color: '#6FDCA0', email: 'voce@users.noreply.github.com', gh: 'voce-oss', key: 'id_oss', dirVar: 'CLAUDE_CONFIG_DIR', dir: null, scrubbed: 'GIT_AUTHOR_EMAIL=voce@pessoal.dev' },
]

export function Identity({ t }: { t: Dict }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const org = ORGS[active]

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next: number | null = null
    if (e.key in keys) next = (active + keys[e.key] + ORGS.length) % ORGS.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = ORGS.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  const delay = (i: number) => ({ animationDelay: `${(i * 0.12).toFixed(2)}s` })

  return (
    <section className="sec comb" id="identity" aria-labelledby="identity-title">
      <div className="wrap">
        <div className="idgrid">
          <div className="rv">
            <h2 className="h2" id="identity-title">{t.identity.title}</h2>
            <p className="lead spaced">{t.identity.lead}</p>
            <div className="seg" role="tablist" aria-label={t.identity.tabsLabel}>
              {t.orgs.map((name, i) => (
                <button
                  key={name}
                  ref={(el) => { tabs.current[i] = el }}
                  type="button"
                  role="tab"
                  id={`org-tab-${i}`}
                  aria-selected={active === i}
                  aria-controls="org-panel"
                  tabIndex={active === i ? 0 : -1}
                  className={active === i ? 'on' : undefined}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                >
                  <span className="sw" style={{ background: ORGS[i].color }} aria-hidden="true" />
                  {name}
                </button>
              ))}
            </div>
            <ul className="checks">
              {t.identity.points.map((p) => (
                <li key={p.b}>
                  <Icon name="check" />
                  <span><b>{p.b}</b> <Rich text={p.t} /></span>
                </li>
              ))}
            </ul>
          </div>
          <div className="idterm rv2" role="tabpanel" id="org-panel" aria-labelledby={`org-tab-${active}`} tabIndex={0}>
            <div className="bar"><span className="dots" aria-hidden="true"><i /><i /><i /></span>{t.identity.termBar}</div>
            <div className="body" key={active}>
              <span className="ln c" style={delay(0)}>
                {t.identity.sessionOf} <span className="badge-org" style={{ background: org.color }}>{t.orgs[active]}</span>
              </span>
              <span className="ln" style={delay(1)}><span className="c">$</span> git config user.email</span>
              <span className="ln v" style={delay(2)}>{org.email}</span>
              <span className="ln" style={delay(3)}><span className="c">$</span> gh auth status</span>
              <span className="ln v" style={delay(4)}>✓ {org.gh}</span>
              <span className="ln" style={delay(5)}><span className="c">$</span> echo $GIT_SSH_COMMAND</span>
              <span className="ln v" style={delay(6)}>ssh -i ~/.ssh/{org.key} -o IdentitiesOnly=yes</span>
              <span className="ln" style={delay(7)}><span className="c">$</span> echo ${org.dirVar}</span>
              <span className={org.dir ? 'ln v' : 'ln c'} style={delay(8)}>{org.dir ?? t.identity.emptyDefault}</span>
              <span className="ln" style={delay(9)}>
                <s className="strike">{org.scrubbed}</s> <span className="c">{t.identity.scrubbed}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
