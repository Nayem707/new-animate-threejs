import { gsap } from 'gsap'

/**
 * Scrubbed timeline for the video hero: the inset frame grows to (almost) full-bleed while the
 * headline scales up around its center.
 *
 * The frame's top/right/bottom/left/border-radius are interpolated in CSS from --hero-progress
 * (see .video-hero-frame), so its geometry is always correct for the current viewport. The text
 * scale depends on measured sizes and is re-computed on refresh via invalidateOnRefresh.
 */
export function createVideoHeroTimeline(
  { section, frame, media, overlay, headline, eyebrow, cue },
  { distance, scrub, endInset, endRadius, maxTextScale, zoomMedia },
) {
  // offsetWidth/offsetHeight ignore transforms, so these stay stable while the headline is scaled.
  const headlineScale = () => {
    const width = section.clientWidth - endInset * 2
    const height = section.clientHeight - endInset * 2
    const byWidth = (width * 0.8) / headline.offsetWidth
    const byHeight = (height * 0.56) / headline.offsetHeight
    return Math.max(1, Math.min(maxTextScale, byWidth, byHeight))
  }

  // Keeps the eyebrow's gap to the headline constant as the headline grows.
  const eyebrowShift = () => -(headline.offsetHeight * (headlineScale() - 1)) / 2

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(section.clientHeight * distance)}`,
      pin: true,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })

  gsap.set(frame, { '--hero-end-inset': `${endInset}px`, '--hero-end-radius': `${endRadius}px` })

  tl.to(cue, { autoAlpha: 0, y: 16, duration: 0.2, ease: 'power1.out' }, 0)
    .fromTo(frame, { '--hero-progress': 0 }, { '--hero-progress': 1 }, 0)
    // 2D transforms keep the text re-rasterized at its rendered size instead of a blurry upscaled layer.
    .to(headline, { scale: headlineScale, force3D: false }, 0)
    .to(eyebrow, { y: eyebrowShift, force3D: false }, 0)
    .to(overlay, { opacity: 0.72 }, 0)

  if (zoomMedia) tl.fromTo(media, { scale: 1.16 }, { scale: 1 }, 0)

  // Short hold at full size before the pin releases.
  tl.to({}, { duration: 0.15 })

  return tl
}
