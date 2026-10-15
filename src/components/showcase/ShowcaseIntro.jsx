import { ArrowRight } from 'lucide-react'
import { showcaseIntro } from '../../data/showcase'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

export function ShowcaseIntro() {
  const { eyebrow, title, body, focus, links } = showcaseIntro

  return (
    <section id="intro" aria-labelledby="intro-title" className="relative py-28 md:py-40">
      <Container className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-3">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-zinc-500 uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-accent-400/60" />
            {eyebrow}
          </p>
        </Reveal>

        <div className="md:col-span-9">
          <Reveal>
            <h2
              id="intro-title"
              className="font-serif text-4xl leading-[1.08] tracking-[-0.01em] text-balance text-zinc-100 sm:text-5xl md:text-6xl"
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid gap-10 md:grid-cols-2">
            <p className="leading-relaxed text-pretty text-zinc-400">{body}</p>
            <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {focus.map((item, i) => (
                <li key={item} className="flex items-baseline justify-between py-3.5 text-sm text-zinc-200">
                  {item}
                  <span aria-hidden="true" className="font-mono text-[11px] text-zinc-600">
                    0{i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {links.length > 0 && (
            <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-3">
              {links.map(({ to, label, variant }) => (
                <Button key={to} to={to} variant={variant}>
                  {label}
                  {variant === 'primary' && (
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  )}
                </Button>
              ))}
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}
