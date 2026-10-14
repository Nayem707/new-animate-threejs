import { BrainCircuit, Cloud, Database, MonitorSmartphone, Server, Workflow } from 'lucide-react'
import { skillGroups } from '../../data/skills'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const ICONS = {
  frontend: MonitorSmartphone,
  backend: Server,
  databases: Database,
  ai: BrainCircuit,
  engineering: Workflow,
  tools: Cloud,
}

function SkillGroup({ group, index }) {
  const Icon = ICONS[group.icon]

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900/60 p-7 transition-[border-color,background-color] duration-500 hover:border-accent-400/30 hover:bg-ink-850 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-accent-600/0 blur-3xl transition-colors duration-700 group-hover:bg-accent-600/20"
      />

      <div className="relative flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-accent-300 transition-colors duration-500 group-hover:border-accent-400/40">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-zinc-600" aria-hidden="true">
          0{index + 1}
        </span>
      </div>

      <h3 className="relative mt-6 text-xl font-medium tracking-tight text-zinc-50">{group.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">{group.description}</p>

      <ul className="relative mt-7 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
        {group.skills.map(({ name, core }) => (
          <li
            key={name}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 ${
              core
                ? 'border-accent-400/30 bg-accent-500/[0.08] text-zinc-100 hover:border-accent-300/60'
                : 'border-white/[0.08] text-zinc-300 hover:border-white/20 hover:text-zinc-100'
            }`}
          >
            {core && <span className="size-1.5 rounded-full bg-accent-400" aria-hidden="true" />}
            {name}
            {core && <span className="sr-only">(daily driver)</span>}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Skills({ index = '02' }) {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <Container>
        <SectionHeader
          id="skills-title"
          index={index}
          eyebrow="Skills"
          title="A toolkit for the whole stack."
          intro="Grouped by where they sit in a system. Highlighted tools are the ones I reach for every day."
        />

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={0.06 * i} className="h-full">
              <SkillGroup group={group} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center gap-2 text-xs text-zinc-500">
            <span className="size-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            Daily driver
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
