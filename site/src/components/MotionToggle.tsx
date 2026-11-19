import { useMotion } from '../lib/motion'
import { Icon } from './Icon'
import type { Dict } from '../i18n/types'

export function MotionToggle({ t, className }: { t: Dict; className?: string }) {
  const { paused, toggle } = useMotion()
  return (
    <button type="button" className={`motion ${className ?? ''}`} aria-pressed={paused} onClick={toggle}>
      <Icon name={paused ? 'play' : 'pause'} />
      <span>{paused ? t.motion.play : t.motion.pause}</span>
    </button>
  )
}
