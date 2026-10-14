import { MapPin } from 'lucide-react'
import { experience } from '../../data/experience'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

function TimelineEntry({ item }) {
  return (
    <div className="relative grid gap-4 pl-8 md:grid-cols-[1fr_2fr] md:gap-0 md:pl-0">
      <div className="md:pr-10 md:text-right">
        <p className="font-mono text-xs tracking-wide text-accent-300">{item.period}</p>
        <p className="mt-2 text-zinc-200">{item.company}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-zinc-500">
          <MapPin className="size-3.5" aria-hidden="true" />
          {item.location}
        </p>
      </div>

      <span
        aria-hidden="true"
        className={`absolute top-1 left-0 size-[11px] -translate-x-[5px] rounded-full border-2 md:left-1/3 ${
          item.current
            ? 'border-accent-400 bg-accent-500 shadow-[0_0_0_5px_rgb(139_92_246/0.18)]'
            : 'border-ink-600 bg-ink-950'
        }`}
      />

      <div className="md:pl-10">
        <h3 className="flex flex-wrap items-center gap-3 text-xl font-medium tracking-tight text-zinc-50">
          {item.role}
          {item.current && (
            <span className="rounded-full border border-accent-400/30 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[10px] tracking-[0.15em] text-accent-200 uppercase">
              Current
            </span>
          )}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{item.summary}</p>
        {item.highlights?.length > 0 && (
          <ul className="mt-4 max-w-2xl space-y-2">
            {item.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent-400" />
                {point}
              </li>
            ))}
          </ul>
        )}
        {item.stack?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
            {item.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export function Experience({ index = '03' }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeader
          id="experience-title"
          index={index}
          eyebrow="Experience"
          title="Where I've been building."
          intro="Roles, teams and the problems I've worked on."
        />

        <div className="relative">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-0 w-px bg-white/[0.08] md:left-1/3" />
          <ol>
            {experience.map((item, i) => (
              <Reveal as="li" key={item.id} delay={0.05 * i} className="pb-14 last:pb-0">
                <TimelineEntry item={item} />
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
