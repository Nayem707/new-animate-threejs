import { about, profile } from '../../data/profile'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const facts = [
  { label: 'Role', value: profile.role },
  { label: 'Focus', value: 'Scalable web applications' },
  { label: 'Location', value: profile.location },
]

export function About({ index = '01', eyebrow = 'About', title = 'Engineering for the long run.' }) {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeader id="about-title" index={index} eyebrow={eyebrow} title={title} />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-3xl leading-[1.2] text-balance text-zinc-100 sm:text-[2.6rem]">
                {about.statement}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {about.paragraphs.map((text, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className="leading-relaxed text-pretty text-zinc-400">{text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid gap-6 border-t border-white/[0.06] pt-8 sm:grid-cols-3">
                {facts.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">{label}</dt>
                    <dd className="mt-2 text-sm text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <Reveal>
              <h3 className="mb-2 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase">What I care about</h3>
            </Reveal>
            <ol>
              {about.principles.map(({ title, body }, i) => (
                <Reveal as="li" key={title} delay={0.06 * i} className="group border-b border-white/[0.06] py-6">
                  <div className="flex gap-5">
                    <span className="pt-0.5 font-mono text-xs text-accent-400/80" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-medium text-zinc-100 transition-colors duration-300 group-hover:text-accent-200">
                        {title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
