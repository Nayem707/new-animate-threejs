import { ArrowUpRight, Check } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { Tag } from '../ui/Tag'

const linkBase = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-300'

function ProjectLink({ href, label, srLabel, children }) {
  if (!href) {
    return (
      <span
        className={`${linkBase} cursor-not-allowed border border-white/[0.05] text-zinc-600`}
        title={`${label} link coming soon`}
      >
        {children}
        <span className="sr-only">(not yet available)</span>
      </span>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${srLabel} (opens in a new tab)`}
      className={`${linkBase} border border-white/10 text-zinc-200 hover:border-accent-400/50 hover:bg-white/[0.04] hover:text-white`}
    >
      {children}
    </a>
  )
}

export function ProjectCard({ project, index, headingLevel = 3 }) {
  const { title, category, year, description, stack, features, challenge, links } = project
  const Heading = `h${headingLevel}`

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-ink-850/80 to-ink-900/60 p-7 transition-[border-color,transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:border-accent-400/30 hover:shadow-[0_30px_80px_-40px_rgb(139_92_246/0.55)] sm:p-9">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-accent-400 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
      />

      <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
        <span>
          <span className="text-accent-300" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span aria-hidden="true"> / </span>
          {category}
        </span>
        <span>{year}</span>
      </div>

      <Heading className="mt-6 text-2xl font-medium tracking-tight text-zinc-50 sm:text-[1.7rem]">{title}</Heading>
      <p className="mt-3 leading-relaxed text-pretty text-zinc-400">{description}</p>

      <ul className="mt-6 space-y-2.5" aria-label="Key features">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-zinc-300">
            <Check className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="font-mono text-[10px] tracking-[0.2em] text-accent-300 uppercase">Engineering challenge</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{challenge}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
        {stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        <ProjectLink href={links.github} label="GitHub" srLabel={`${title} source code on GitHub`}>
          <GithubIcon className="size-4" />
          Source
        </ProjectLink>
        <ProjectLink href={links.live} label="Live demo" srLabel={`${title} live demo`}>
          Live demo
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </ProjectLink>
      </div>
    </article>
  )
}
