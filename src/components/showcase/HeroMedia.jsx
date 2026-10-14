import { heroVideo } from '../../data/showcase'

/**
 * Poster image underneath, video fading in on top once it has a frame to show. If the video fails,
 * the poster stays; if both fail, the frame's gradient background shows through.
 * The poster is the loop's first frame, so without autoplay nothing is fetched until play.
 */
export function HeroMedia({ source, videoRef, status, autoplay }) {
  const position = { objectPosition: heroVideo.focalPoint }

  return (
    <div data-hero="media" aria-hidden="true" className="absolute inset-0">
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
        autoPlay={autoplay}
        muted
        loop
        playsInline
        preload={autoplay ? 'auto' : 'none'}
        disablePictureInPicture
        disableRemotePlayback
        className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${
          status === 'ready' ? 'opacity-100' : 'opacity-0'
        }`}
        style={position}
      />
    </div>
  )
}
