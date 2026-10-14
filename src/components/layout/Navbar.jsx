import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../../data/profile'
import { useScrolled } from '../../hooks/useScrolled'
import { Container } from '../ui/Container'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 rounded-md" aria-label={`${profile.name} — home`}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg border border-white/10 bg-ink-800 font-mono text-xs font-medium text-accent-300 transition-colors duration-300 group-hover:border-accent-400/60"
      >
        NI
      </span>
      <span className="text-sm font-semibold tracking-[0.22em] text-zinc-100">{profile.shortName}</span>
    </Link>
  )
}

export function Navbar() {
  const location = useLocation()
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [location.key])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? 'glass border-white/[0.06]' : 'border-transparent'
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Logo />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-white/[0.07] bg-white/[0.02] p-1">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end
                    className={({ isActive }) =>
                      `relative block rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-300 lg:px-4 ${
                        isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_0_0_1px_rgb(167_139_250/0.25)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid size-10 place-items-center rounded-full text-zinc-200 transition-colors hover:bg-white/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </Container>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="glass absolute inset-x-0 top-16 h-[calc(100dvh-4rem)] border-x-0 border-b-0 bg-ink-950/90 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Container as="ul" className="flex flex-col pt-6">
              {navLinks.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-white/[0.06]"
                >
                  <NavLink
                    to={to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-baseline justify-between py-4 text-2xl font-medium tracking-tight transition-colors ${
                        isActive ? 'text-accent-200' : 'text-zinc-100'
                      }`
                    }
                  >
                    {label}
                    <span className="font-mono text-xs text-zinc-500" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </NavLink>
                </motion.li>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
