import { Fragment } from 'react'

/** Texto do dicionário com trechos entre crases renderizados como <code>. */
export function Rich({ text }: { text: string }) {
  const parts = text.split('`')
  return (
    <>
      {parts.map((part, i) => (i % 2 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>))}
    </>
  )
}
