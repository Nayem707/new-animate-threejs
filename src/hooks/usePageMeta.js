import { useEffect } from 'react'
import { profile, site } from '../data/profile'

export function usePageMeta({ title, description = site.description } = {}) {
  useEffect(() => {
    document.title = title ? `${title} — ${profile.name}` : site.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
