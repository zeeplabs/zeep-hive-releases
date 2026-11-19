import type { ReactNode } from 'react'

export function HoneyJar({ children }: { children: ReactNode }) {
  return (
    <section className="final">
      <div className="jar">
        <div className="glass" aria-hidden="true">
          <div className="wave b" />
          <div className="wave" />
          <span className="bubble" style={{ left: '30%', animationDelay: '0s' }} />
          <span className="bubble" style={{ left: '52%', animationDelay: '1.8s', width: 8, height: 8 }} />
          <span className="bubble" style={{ left: '68%', animationDelay: '3.4s' }} />
          <span className="bubble" style={{ left: '42%', animationDelay: '4.6s', width: 6, height: 6 }} />
        </div>
        <div className="content">{children}</div>
      </div>
    </section>
  )
}
