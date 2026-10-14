import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { showcaseNav } from '../../data/showcase'

/** True once the element is in the viewport — i.e. the pinned hero has released and is scrolling away. */
function useInViewport(id) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const target = document.getElementById(id)
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(target)
    return () => observer.disconnect()
  }, [id])

  return visible
}

export function ShowcaseNav() {
  const solid = useInViewport('intro')

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? 'glass border-white/[0.06]' : 'border-transparent bg-linear-to-b from-ink-950/70 to-transparent'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-(--hero-gutter)">
        <Link to="/" className="group flex items-center gap-3 rounded-md" aria-label={`${profile.name} — home`}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg border border-white/15 bg-white/5 font-mono text-xs font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:border-white/40"
          >
            NI
          </span>
          <span className="hidden text-sm font-semibold tracking-[0.22em] text-white sm:inline">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {showcaseNav.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="block rounded-full px-3 py-1.5 text-[13px] text-white/75 transition-colors duration-300 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
