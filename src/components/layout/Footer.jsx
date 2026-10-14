import { NavLink } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { pageLinks, profile } from '../../data/profile'
import { Container } from '../ui/Container'
import { SocialLinks } from '../ui/SocialLinks'

export function Footer() {
  const backToTop = () => {
    window.scrollTo({ top: 0 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer className="relative border-t border-white/[0.06] py-10">
      <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.22em] text-zinc-200">{profile.shortName}</p>
          <p className="mt-1 text-sm text-zinc-500">
            © {new Date().getFullYear()} {profile.name}. Designed and built with React &amp; Three.js.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {pageLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `rounded transition-colors duration-300 ${isActive ? 'text-zinc-100' : 'text-zinc-500 hover:text-zinc-200'}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <SocialLinks />
          <button
            type="button"
            onClick={backToTop}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-accent-400/50 hover:text-white"
          >
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
