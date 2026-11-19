import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const KEY = 'hive-motion'
const MotionContext = createContext<{ paused: boolean; toggle: () => void }>({ paused: false, toggle: () => {} })

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {}
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setPaused(stored ? stored === 'off' : reduce)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'off' : 'on'
  }, [paused])

  const toggle = useCallback(() => {
    setPaused((p) => {
      try {
        localStorage.setItem(KEY, p ? 'on' : 'off')
      } catch {}
      return !p
    })
  }, [])

  return <MotionContext.Provider value={{ paused, toggle }}>{children}</MotionContext.Provider>
}

export const useMotion = () => useContext(MotionContext)
