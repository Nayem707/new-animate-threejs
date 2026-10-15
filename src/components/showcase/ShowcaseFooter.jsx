import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '../../data/profile'
import { showcaseDocuments, showcaseNav } from '../../data/showcase'
import { Container } from '../ui/Container'
import { SocialLinks } from '../ui/SocialLinks'

const LABEL = 'font-mono text-[10px] font-medium tracking-[0.25em] text-zinc-500 uppercase'

/** Quiet, near-black closing footer for the standalone showcase page. Static by design. */
export function ShowcaseFooter() {
  const { email } = profile.contact

  const backToTop = () => {
    window.scrollTo({ top: 0 })
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#050408]">
      <Container className="max-w-6xl pt-20 pb-8 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            {profile.availability && (
              <p className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] py-1.5 pr-3.5 pl-3 text-xs text-emerald-100">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </p>
            )}
            <p className="mt-6 max-w-lg text-3xl leading-[1.1] font-medium tracking-[-0.03em] text-balance text-zinc-100 sm:text-4xl md:text-5xl">
              Have something worth{' '}
              <span className="text-gradient font-serif font-normal tracking-[-0.01em] italic">building?</span>
            </p>
            {email && (
              <a
                href={`mailto:${email}`}
                className="group mt-8 inline-flex items-center gap-2 border-b border-white/15 pb-1 text-lg text-zinc-200 transition-colors duration-300 hover:border-accent-400/60 hover:text-white sm:text-xl"
              >
                {email}
                <ArrowUpRight
                  className="size-5 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>

          <div className="grid grid-cols-[1.4fr_1fr] gap-8 md:col-span-5 md:pl-8">
            <nav aria-label="Footer">
              <p className={LABEL}>Navigate</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {showcaseNav.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-zinc-400 transition-colors duration-300 hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
                {showcaseDocuments.map(({ href, label, kind }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (${kind}, opens in a new tab)`}
                      className="group inline-flex items-center gap-1.5 whitespace-nowrap text-zinc-400 transition-colors duration-300 hover:text-white"
                    >
                      {label}
                      <span className="rounded border border-white/10 px-1 py-px font-mono text-[9px] tracking-wider text-zinc-500 transition-colors duration-300 uppercase group-hover:border-accent-400/40 group-hover:text-accent-300">
                        {kind}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className={LABEL}>Connect</p>
              <SocialLinks className="mt-3 -ml-2.5" />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p>
            © {new Date().getFullYear()} {profile.name}. {profile.location}
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition-colors duration-300 hover:border-accent-400/50 hover:text-white sm:self-auto"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[2.5vw] bg-linear-to-b from-white/[0.08] to-transparent bg-clip-text text-center text-[13vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none"
      >
        {profile.shortName}
      </p>
    </footer>
  )
}
