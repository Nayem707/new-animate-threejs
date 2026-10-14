import { heroVideo } from '../../data/showcase'

/**
 * Poster (the video's first frame) underneath; the scroll-scrubbed video fades in on top once it
 * shows the frame for the current scroll position. If the video fails the poster stays, and if
 * both fail the frame's gradient background shows through. The video never plays on its own.
 */
export function HeroMedia({ source, videoRef, status, load }) {
  const position = { objectPosition: heroVideo.focalPoint }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <img
        src={source.poster}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
        style={position}
      />
      <video
        key={source.src}
        ref={videoRef}
        src={source.src}
        muted
        playsInline
        preload={load ? 'auto' : 'none'}
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
        style={position}
      />
    </div>
  )
}
