import { Pause, Play } from 'lucide-react'

export function PlaybackToggle({ paused, onToggle, className = '' }) {
  const Icon = paused ? Play : Pause

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? 'Play background video' : 'Pause background video'}
      className={`grid size-10 place-items-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition-colors duration-300 hover:border-white/35 hover:bg-black/40 ${className}`}
    >
      <Icon className="size-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
    </button>
  )
}
