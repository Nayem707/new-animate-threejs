export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1]

/** Entrance animation for above-the-fold content that plays on mount rather than on scroll. */
export const enterUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
})
