import { projects } from '../data/projects'
import { profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import { ProjectGrid } from '../components/projects/ProjectGrid'
import { CallToAction } from '../components/sections/CallToAction'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'

export default function ProjectsPage() {
  usePageMeta({
    title: 'Projects',
    description: `Selected projects by ${profile.name}: architecture, features and engineering challenges.`,
  })

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected work,"
        accent="end to end."
        intro="Each project below covers what it does, the stack behind it and the engineering problem that made it interesting."
      >
        <p className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
          {projects.length} projects
        </p>
      </PageHeader>

      <section aria-label="Project list" className="relative py-16 md:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[600px] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-accent-700/[0.07] blur-[140px]"
        />
        <Container>
          <ProjectGrid projects={projects} headingLevel={2} />
        </Container>
      </section>

      <CallToAction secondary={{ to: '/about', label: 'More about me' }} />
    </>
  )
}
