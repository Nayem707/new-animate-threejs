import { useRef } from 'react'
import { heroContent, heroVideo } from '../../data/showcase'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { useVideoHeroAnimation } from '../../hooks/useVideoHeroAnimation'
import { useVideoPlayback } from '../../hooks/useVideoPlayback'
import { HeroMedia } from './HeroMedia'
import { PlaybackToggle } from './PlaybackToggle'
import { ScrollCue } from './ScrollCue'

/**
 * Pinned, scroll-scrubbed video hero. Elements tagged with `data-hero` are animated by
 * useVideoHeroAnimation; nothing here sets transition on those animated properties.
 */
export function VideoHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const portrait = useMediaQuery(heroVideo.portraitQuery)
  const source = portrait ? heroVideo.portrait : heroVideo.landscape
  const { status, paused, toggle } = useVideoPlayback(videoRef, { autoplay: !reducedMotion, src: source.src })

  useVideoHeroAnimation(sectionRef)

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative h-svh overflow-hidden">
      <div
        data-hero="frame"
        className="video-hero-frame absolute isolate transform-gpu overflow-hidden bg-[linear-gradient(180deg,#3b3446_0%,#9a7452_58%,#15130f_100%)]"
      >
        <HeroMedia source={source} videoRef={videoRef} status={status} autoplay={!reducedMotion} />

        <div
          data-hero="overlay"
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_6_11/0.6)_0%,rgb(7_6_11/0.28)_38%,rgb(7_6_11/0.32)_64%,rgb(7_6_11/0.75)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgb(7_6_11/0.38),transparent_72%)]"
        />

        <div className="absolute inset-0 grid place-items-center px-5 text-center">
          <div className="flex flex-col items-center">
            <p
              data-hero="eyebrow"
              className="mb-5 font-mono text-[10px] leading-relaxed tracking-[0.3em] text-white/85 uppercase sm:mb-6 sm:text-[11px]"
            >
              {/* Narrow screens stack the parts instead of wrapping mid-phrase. */}
              {heroContent.eyebrow.split('·').map((part, i) => (
                <span key={part}>
                  {i > 0 && <span className="hidden sm:inline"> · </span>}
                  <span className="block sm:inline">{part.trim()}</span>
                </span>
              ))}
            </p>
            <h1
              id="hero-title"
              data-hero="headline"
              className="text-[clamp(1.75rem,5.2vw,4.75rem)] leading-[0.92] text-white uppercase [text-shadow:0_2px_40px_rgb(0_0_0/0.25)] motion-reduce:text-[clamp(2.5rem,8.5vw,7.5rem)]"
            >
              {heroContent.headline.map(({ text, font }, i) => (
                <span
                  key={text}
                  className={`block px-[0.06em] whitespace-nowrap ${
                    font === 'serif'
                      ? 'font-serif text-[1.12em] font-normal tracking-[-0.01em] italic'
                      : 'font-semibold tracking-[-0.04em]'
                  }`}
                >
                  {i > 0 && ' '}
                  {text}
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Short landscape screens have no room under the headline for the cue. */}
        <ScrollCue data-hero="cue" className="absolute inset-x-0 bottom-5 md:bottom-7 [@media(max-height:30rem)]:hidden" />

        {status !== 'error' && (
          <PlaybackToggle paused={paused} onToggle={toggle} className="absolute right-4 bottom-4 md:right-6 md:bottom-6" />
        )}
      </div>
    </section>
  )
}
