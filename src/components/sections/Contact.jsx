import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { ContactForm } from './ContactForm'

const { email, github, linkedin } = profile.contact

const channels = [
  github && { label: 'GitHub', href: github, Icon: GithubIcon },
  linkedin && { label: 'LinkedIn', href: linkedin, Icon: LinkedinIcon },
].filter(Boolean)

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef()

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="group inline-flex items-center gap-2 text-xl font-medium tracking-tight text-zinc-50 underline decoration-accent-400/40 decoration-1 underline-offset-8 transition-colors hover:decoration-accent-300 sm:text-2xl"
      >
        {email}
        <ArrowUpRight
          className="size-5 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </a>
      <button
        type="button"
        onClick={copy}
        className="grid size-10 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
      >
        {copied ? <Check className="size-4 text-emerald-400" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}

export function Contact({ index = '03' }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full bg-accent-700/15 blur-[130px]" />
      </div>

      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-300 uppercase">
              <span aria-hidden="true">{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-accent-400/50" />
              Contact
            </p>
            <h2
              id="contact-title"
              className="text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              Let&apos;s build something{' '}
              <span className="text-gradient font-serif font-normal italic">that lasts.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-zinc-400">
              Have a product to build, a system to scale or a role to fill? I&apos;d like to hear about it. The quickest
              way to reach me is by email.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-8">
            {email && <CopyEmail />}

            {channels.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {channels.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition-colors duration-300 hover:border-accent-400/50 hover:text-white"
                    >
                      <Icon className="size-4" />
                      {label}
                      <ArrowUpRight className="size-3.5 text-zinc-500 transition-colors group-hover:text-accent-300" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  )
}
