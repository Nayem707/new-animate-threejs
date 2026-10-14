import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createVideoHeroTimeline } from '../animations/videoHeroTimeline'
import { heroMotion } from '../data/showcase'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const QUERIES = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
}

/**
 * Binds the hero timeline to scroll. Targets are found via `data-hero="…"` inside `scopeRef`.
 * gsap.matchMedia rebuilds the timeline when crossing the breakpoint and skips it entirely
 * (no pin, static layout) when the visitor prefers reduced motion.
 * `onProgress` (must be stable) receives the scrubbed 0–1 progress, e.g. to pick a footage frame.
 */
export function useVideoHeroAnimation(scopeRef, { onProgress } = {}) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(QUERIES, ({ conditions }) => {
        const pick = (name) => scopeRef.current.querySelector(`[data-hero="${name}"]`)
        const tl = createVideoHeroTimeline(
          {
            section: scopeRef.current,
            frame: pick('frame'),
            content: pick('content'),
            overlay: pick('overlay'),
            headline: pick('headline'),
            eyebrow: pick('eyebrow'),
            cue: pick('cue'),
          },
          conditions.desktop ? heroMotion.desktop : heroMotion.mobile,
          { onProgress },
        )
        // Timeline-driven triggers defer their first measurement by a tick. Measure now so the pin
        // spacer exists before ScrollManager restores a back/forward scroll position.
        tl.scrollTrigger.refresh()
      })
      // The headline scale is measured from rendered text, so re-measure once web fonts swap in.
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => mm.revert()
    },
    { scope: scopeRef },
  )
}
