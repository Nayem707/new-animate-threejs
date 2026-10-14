import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

/** Closing band for secondary pages: primary action goes to the contact section on Home. */
export function CallToAction({ secondary }) {
  return (
    <section aria-labelledby="cta-title" className="relative pb-24 md:pb-36">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-900/60 px-6 py-16 text-center sm:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/2 -z-10 h-80 w-[min(720px,100%)] -translate-x-1/2 rounded-full bg-accent-600/25 blur-[100px]"
          />
          <h2
            id="cta-title"
            className="mx-auto max-w-2xl text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-balance text-zinc-50 sm:text-5xl"
          >
            Have something worth <span className="text-gradient font-serif font-normal italic">building?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-zinc-400">
            I&apos;m open to new roles and projects. Tell me what you&apos;re working on and I&apos;ll get back to you.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button to="/#contact">
              Get in touch
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="secondary">
                {secondary.label}
                <ArrowRight
                  className="size-4 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
