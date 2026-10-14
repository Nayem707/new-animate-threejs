import { Reveal } from '../ui/Reveal'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid({ projects, headingLevel }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal as="li" key={project.id} delay={0.06 * (i % 2)} className="h-full">
          <ProjectCard project={project} index={i} headingLevel={headingLevel} />
        </Reveal>
      ))}
    </ul>
  )
}
