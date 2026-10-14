import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { showcaseGallery } from '../../data/showcase'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

// Overdamped, so the gallery eases after the scroll position without overshooting it.
const SMOOTHING = { stiffness: 260, damping: 48, restDelta: 0.0001 }

/**
 * Horizontal distance (px) between the first and last cards' centers, and the vertical scroll
 * length of the sticky phase, both measured from the rendered layout. Stored in motion values so
 * resizes update the animation without re-rendering.
 */
function useGalleryTravel(sectionRef, stickyRef, trackRef) {
  const travel = useMotionValue(0)
  const scrollLength = useMotionValue(1)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    const track = trackRef.current
    const measure = () => {
      const first = track.firstElementChild
      const last = track.lastElementChild
      travel.set(last.offsetLeft + last.offsetWidth / 2 - (first.offsetLeft + first.offsetWidth / 2))
      scrollLength.set(Math.max(1, section.offsetHeight - sticky.offsetHeight))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(section)
    observer.observe(sticky)
    observer.observe(track.firstElementChild)
    return () => observer.disconnect()
  }, [sectionRef, stickyRef, trackRef, travel, scrollLength])

  return { travel, scrollLength }
}

function GalleryCard({ item }) {
  return (
    <li
      className="group relative aspect-[4/5] w-(--gallery-item-w) shrink-0 snap-center overflow-hidden rounded-[clamp(1rem,1.6vw,1.5rem)] border border-white/[0.07]"
      style={{ backgroundColor: item.color, backgroundImage: 'linear-gradient(160deg, rgb(7 6 11 / 0.6), rgb(7 6 11 / 0.95))' }}
    >
      <img
        src={item.image}
        alt=""
        loading="lazy"
        decoding="async"
        // A missing file falls back to the card's tinted gradient instead of a broken-image icon.
        onError={(event) => {
          event.currentTarget.hidden = true
        }}
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent 55%, ${item.color})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgb(7_6_11/0.7)_100%)]"
      />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <span
          className="mb-2 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: item.color }}
        >
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
          {String(item.id).padStart(2, '0')}
        </span>
        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{item.label}</h3>
      </div>
    </li>
  )
}

/**
 * Full-screen sticky gallery that slides horizontally while the page scrolls vertically: the first
 * card starts centered, the last card ends centered, then it holds briefly before releasing.
 * With reduced motion it's a static row the visitor can scroll sideways themselves.
 */
export function ScrollGallery() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const trackRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, SMOOTHING)
  const { travel, scrollLength } = useGalleryTravel(sectionRef, stickyRef, trackRef)
  const x = useTransform([progress, travel, scrollLength], ([p, distance, length]) =>
    -Math.min(p * length, distance),
  )

  return (
    <section
      ref={sectionRef}
      aria-labelledby="gallery-title"
      className="scroll-gallery relative"
      style={{ '--gallery-count': showcaseGallery.length }}
    >
      <h2 id="gallery-title" className="sr-only">
        Gallery
      </h2>
      <div
        ref={stickyRef}
        role={reducedMotion ? 'region' : undefined}
        aria-label={reducedMotion ? 'Gallery, scroll sideways' : undefined}
        tabIndex={reducedMotion ? 0 : undefined}
        className="sticky top-0 flex h-svh items-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:py-24"
      >
        <motion.ul
          ref={trackRef}
          style={reducedMotion ? undefined : { x }}
          className="flex w-max gap-(--gallery-gap) px-[calc(50%-var(--gallery-item-w)/2)] will-change-transform motion-reduce:will-change-auto"
        >
          {showcaseGallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
