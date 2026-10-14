import { ArrowLeft } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/ui/PageHeader'

export default function NotFoundPage() {
  usePageMeta({ title: 'Page not found' })

  return (
    <div className="min-h-[70svh]">
      <PageHeader
        eyebrow="404"
        title="This page"
        accent="doesn't exist."
        intro="The link may be broken or the page may have moved. Here are a few places to start instead."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button to="/projects" variant="secondary">
            View projects
          </Button>
        </div>
      </PageHeader>
    </div>
  )
}
