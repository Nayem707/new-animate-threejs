import { gsap } from 'gsap'

/**
 * Scrubbed timeline for the video hero: the inset frame grows to (almost) full-bleed while the
 * hero text scales up from nothing around its center (headline to its fitted size, eyebrow to 1).
 *
 * The frame's clip and the text's centering offset are interpolated in CSS from --hero-progress
 * (see .video-hero-frame and .video-hero-content), so they are always correct for the current
 * viewport and never change the layout. The text scale depends on measured sizes and is
 * re-computed on refresh via invalidateOnRefresh.
 *
 * `onProgress` receives the timeline's own progress (0–1) on every render. Timeline progress is
 * linear in scroll (smoothed by the same `scrub` as everything else), so it drives the footage
 * frame in lockstep with the headline — the eases above shape individual tweens, not this value.
 */
export function createVideoHeroTimeline(
  { section, frame, content, overlay, headline, eyebrow, cue },
  { distance, scrub, endInset, endRadius, maxTextScale },
  { onProgress } = {},
) {
  // offsetWidth/offsetHeight ignore transforms, so these stay stable while the headline is scaled.
  const headlineScale = () => {
    const width = section.clientWidth - endInset * 2
    const height = section.clientHeight - endInset * 2
    const byWidth = (width * 0.8) / headline.offsetWidth
    const byHeight = (height * 0.56) / headline.offsetHeight
    return Math.max(1, Math.min(maxTextScale, byWidth, byHeight))
  }

  // Keeps the eyebrow's bottom edge a constant gap above the headline's top edge while both scale
  // around their centers. Both tweens share duration and ease, so interpolating y stays exact.
  const eyebrowShift = (headlineScaleValue, eyebrowScale) =>
    -(headline.offsetHeight * (headlineScaleValue - 1)) / 2 + (eyebrow.offsetHeight * (1 - eyebrowScale)) / 2

  const report = onProgress && (() => onProgress(tl.progress()))
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.inOut' },
    onUpdate: report,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(section.clientHeight * distance)}`,
      pin: true,
      scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      // A refresh (first measure, resize, restored scroll position) can move the timeline without
      // firing onUpdate.
      onRefresh: report,
    },
  })

  gsap.set(frame, { '--hero-end-inset': `${endInset}px`, '--hero-end-radius': `${endRadius}px` })

  tl.to(cue, { autoAlpha: 0, y: 16, duration: 0.2, ease: 'power1.out' }, 0)
    .fromTo([frame, content], { '--hero-progress': 0 }, { '--hero-progress': 1 }, 0)
    // 2D transforms keep the text re-rasterized at its rendered size instead of a blurry upscaled layer.
    .fromTo(headline, { scale: 0 }, { scale: headlineScale, force3D: false }, 0)
    .fromTo(
      eyebrow,
      { scale: 0, y: () => eyebrowShift(0, 0) },
      { scale: 1, y: () => eyebrowShift(headlineScale(), 1), force3D: false },
      0,
    )
    .to(overlay, { opacity: 0.72 }, 0)

  // Short hold at full size before the pin releases.
  tl.to({}, { duration: 0.15 })

  return tl
}
