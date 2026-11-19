import { useEffect, useState } from 'react'
import type { Dict } from '../i18n/types'
import { useMotion } from '../lib/motion'
import { MotionToggle } from '../components/MotionToggle'
import icon from '../assets/icon-192.webp'

const STEPS = 12
const A_AT = [0, 1, 2, 3, 4, 5, 7, 8]
const A_CLS = ['p', 'ok', 'ok', '', 'ok', 'q', 'p', 'ok']
const B_AT = [0, 1, 3, 5, 7, 9]
const B_CLS = ['sky', 'ok', '', '', 'ok', 'ok']
const FINAL = 9

type State = 's-run' | 's-wait' | 's-done'

export function LiveDemo({ t }: { t: Dict }) {
  const { paused } = useMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (paused) {
      setStep(FINAL)
      return
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % STEPS), 1200)
    return () => window.clearInterval(id)
  }, [paused])

  const atlas: State = step < 5 ? 's-run' : step < 7 ? 's-wait' : step < 8 ? 's-run' : 's-done'
  const painel: State = step < 9 ? 's-run' : 's-done'
  const lines = (texts: string[], at: number[], cls: string[]) =>
    texts.map((tx, i) => ({ tx, cls: cls[i] })).filter((_, i) => at[i] <= step)

  return (
    <section className="sec" id="live" aria-labelledby="live-title">
      <div className="wrap">
        <div className="head rv">
          <h2 className="h2" id="live-title">{t.live.title}</h2>
          <p className="lead">{t.live.lead}</p>
        </div>
        <figure className="demo zoom">
          <div className="win" aria-hidden="true">
            <div className="wtb">
              <span className="dots"><i /><i /><i /></span>
              <span>Hive</span>
            </div>
            <div className="wb">
              {(step === 5 || step === 6) && (
                <div className="toast">
                  <img src={icon} alt="" width="34" height="34" />
                  <div>
                    <b>{t.live.toastTitle}</b>
                    <span>{t.live.toastBody}</span>
                  </div>
                </div>
              )}
              <div className="wsb">
                <div className="tr org"><span className="sw" />{t.orgs[0]}</div>
                <div className={`tr l2 ${atlas}`}>atlas-api<span className="hx" /></div>
                <div className="tr l2">docs-site<span className="stx">{t.live.idle}</span></div>
                <div className="tr org"><span className="sw sky" />{t.orgs[1]}</div>
                <div className={`tr l2 ${painel}`}>painel-admin<span className="hx" /></div>
                <div className="tr l2">api-pagamentos<span className="stx">{t.live.idle}</span></div>
                <div className="tr org"><span className="sw mint" />{t.orgs[2]}</div>
                <div className="tr l2 s-done">cli-toolkit<span className="hx" /></div>
              </div>
              <div className="wtm">
                <div className="wtabs">
                  <span className="on">atlas-api · Claude Code</span>
                  <span>painel-admin · Codex</span>
                </div>
                <div className="panes">
                  <div className="term">
                    <div className="path">~/dev/atlas-api  feat/cursor-pagination</div>
                    {lines(t.live.linesA, A_AT, A_CLS).map((l, i) => (
                      <span key={i} className={`ln ${l.cls}`}>{l.tx}</span>
                    ))}
                    <span className="caret" />
                  </div>
                  <div className="term">
                    <div className="path">~/clientes/painel-admin  fix/export-timeout</div>
                    {lines(t.live.linesB, B_AT, B_CLS).map((l, i) => (
                      <span key={i} className={`ln ${l.cls}`}>{l.tx}</span>
                    ))}
                    <span className="caret sky" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="sr-only">{t.live.demoLabel}. {t.live.demoSummary}</figcaption>
        </figure>
        <div className="legend">
          <span><span className="tr s-run bare"><span className="hx" /></span>{t.live.legendRun}</span>
          <span><span className="tr s-wait bare"><span className="hx" /></span>{t.live.legendWait}</span>
          <span><span className="tr s-done bare"><span className="hx" /></span>{t.live.legendDone}</span>
          <MotionToggle t={t} className="push" />
        </div>
      </div>
    </section>
  )
}
