import { profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import { About } from '../components/sections/About'
import { CallToAction } from '../components/sections/CallToAction'
import { Experience } from '../components/sections/Experience'
import { Skills } from '../components/sections/Skills'
import { PageHeader } from '../components/ui/PageHeader'

export default function AboutPage() {
  usePageMeta({
    title: 'About',
    description: `About ${profile.name}: approach, skills and experience as a ${profile.role}.`,
  })

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Full stack developer,"
        accent="systems thinker."
        intro={`I'm ${profile.name}, a ${profile.role} who enjoys the whole journey of a product — from data models and APIs to the interface people actually touch.`}
      />
      <About index="01" eyebrow="Approach" />
      <Skills index="02" />
      <Experience index="03" />
      <CallToAction secondary={{ to: '/projects', label: 'See my projects' }} />
    </>
  )
}
