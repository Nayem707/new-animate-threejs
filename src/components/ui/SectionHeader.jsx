import { Reveal } from './Reveal'

export function SectionHeader({ index, eyebrow, title, intro, id }) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
      <Reveal className="md:col-span-7">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-accent-300 uppercase">
          <span aria-hidden="true">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-accent-400/50" />
          {eyebrow}
        </p>
        <h2 id={id} className="text-4xl font-medium tracking-[-0.03em] text-balance text-zinc-50 sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className="md:col-span-5">
          <p className="text-base leading-relaxed text-pretty text-zinc-400 md:text-right">{intro}</p>
        </Reveal>
      )}
    </header>
  )
}
