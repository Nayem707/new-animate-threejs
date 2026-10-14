import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Tracks loading / error / paused state of a muted background video and starts it when `autoplay`
 * is true. Pass the current `src` so the state resets when the source changes.
 * While autoplaying, the video only plays when on screen; a pause chosen by the visitor always wins.
 */
export function useVideoPlayback(videoRef, { autoplay, src }) {
  const [status, setStatus] = useState('loading')
  const [paused, setPaused] = useState(true)
  const userPaused = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const sync = () => {
      if (video.error) setStatus('error')
      else if (video.readyState >= 2) setStatus('ready')
      else setStatus('loading')
      setPaused(video.paused)
    }
    const onReady = () => setStatus('ready')
    const onError = () => setStatus('error')
    const onPlay = () => setPaused(false)
    const onPause = () => setPaused(true)

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('error', onError)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    sync()

    // React sets `muted` as a property only; mobile Safari also wants it set before play().
    video.muted = true
    video.defaultMuted = true

    let observer
    if (autoplay) {
      // Browsers keep decoding muted video that has scrolled out of view, so pause it off screen.
      observer = new IntersectionObserver(([entry]) => {
        if (userPaused.current) return
        if (entry.isIntersecting) video.play().catch(() => setPaused(true))
        else video.pause()
      })
      observer.observe(video)
    } else {
      video.pause()
    }

    return () => {
      observer?.disconnect()
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('error', onError)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [videoRef, autoplay, src])

  const toggle = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    userPaused.current = !video.paused
    if (video.paused) video.play().catch(() => {})
    else video.pause()
  }, [videoRef])

  return { status, paused, toggle }
}
