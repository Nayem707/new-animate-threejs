import { ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { ProjectGrid } from '../projects/ProjectGrid'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'

const featured = projects.filter((project) => project.featured)

export function FeaturedProjects({ index = '02' }) {
  return (
    <section id="featured" aria-labelledby="featured-title" className="relative py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[min(1000px,100%)] -translate-x-1/2 rounded-full bg-accent-700/[0.07] blur-[140px]"
      />
      <Container>
        <SectionHeader
          id="featured-title"
          index={index}
          eyebrow="Featured work"
          title="Selected projects."
          intro="A couple of builds that show how I approach architecture, data and user experience together."
        />

        <ProjectGrid projects={featured.length ? featured : projects.slice(0, 2)} />

        <Reveal className="mt-12 flex justify-center">
          <Button to="/projects" variant="secondary">
            View all projects
            <ArrowRight
              className="size-4 text-accent-300 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
