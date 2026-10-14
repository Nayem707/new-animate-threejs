import { SkipLink } from '../components/layout/SkipLink'
import { ScrollGallery } from '../components/showcase/ScrollGallery'
import { ShowcaseIntro } from '../components/showcase/ShowcaseIntro'
import { ShowcaseNav } from '../components/showcase/ShowcaseNav'
import { VideoHero } from '../components/showcase/VideoHero'
import { usePageMeta } from '../hooks/usePageMeta'

/** Standalone landing page with its own minimal nav; lives outside the portfolio <Layout>. */
export default function ShowcasePage() {
  usePageMeta({ title: 'Showcase' })

  return (
    <>
      <SkipLink />
      <ShowcaseNav />
      <main id="main" tabIndex={-1} className="relative outline-none">
        <VideoHero />
        <ScrollGallery />
        <ShowcaseIntro />
      </main>
    </>
  )
}
