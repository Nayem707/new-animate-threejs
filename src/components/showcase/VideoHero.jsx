import { useRef } from 'react'
import { heroContent, heroVideo } from '../../data/showcase'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { useVideoHeroAnimation } from '../../hooks/useVideoHeroAnimation'
import { useVideoScrubber } from '../../hooks/useVideoScrubber'
import { HeroMedia } from './HeroMedia'
import { ScrollCue } from './ScrollCue'

/**
 * Pinned, scroll-driven hero. Elements tagged with `data-hero` are animated by
 * useVideoHeroAnimation; nothing here sets transition on those animated properties.
 * The same timeline drives the video playhead, so footage and headline scale move together.
 * With reduced motion there is no timeline: the poster (first frame) is shown and no video loads.
 */
export function VideoHero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const portrait = useMediaQuery(heroVideo.portraitQuery)
  const source = portrait ? heroVideo.portrait : heroVideo.landscape
  const { status, setProgress } = useVideoScrubber(videoRef, {
    enabled: !reducedMotion,
    src: source.src,
    fps: heroVideo.fps,
  })

  useVideoHeroAnimation(sectionRef, { onProgress: setProgress })

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative h-svh overflow-hidden">
      <div
        data-hero="frame"
        className="video-hero-frame absolute inset-0 isolate transform-gpu overflow-hidden bg-[linear-gradient(180deg,#3b3446_0%,#9a7452_58%,#15130f_100%)]"
      >
        <HeroMedia source={source} videoRef={videoRef} status={status} load={!reducedMotion} />

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
          <div data-hero="content" className="video-hero-content flex flex-col items-center">
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
        <ScrollCue
          data-hero="cue"
          className="absolute inset-x-0 bottom-[calc(var(--hero-start-bottom)+1.25rem)] md:bottom-[calc(var(--hero-start-bottom)+1.75rem)] [@media(max-height:30rem)]:hidden"
        />
      </div>
    </section>
  )
}
