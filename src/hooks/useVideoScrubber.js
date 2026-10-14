import { useCallback, useEffect, useState } from 'react'
import { createVideoScrubber } from '../animations/videoScrubber'

/**
 * Connects a video element to a frame-accurate scrubber. `setProgress` is stable and can be handed
 * to a GSAP timeline; the last progress survives a source swap and is re-applied to the new video.
 * Returns status 'idle' | 'loading' | 'ready' | 'error' ('ready' once the target frame is shown).
 */
export function useVideoScrubber(videoRef, { enabled, src, fps }) {
  const [status, setStatus] = useState('idle')
  const [scrubber] = useState(() => createVideoScrubber({ fps, onStatus: setStatus }))

  useEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) return
    scrubber.attach(video)
    return () => scrubber.detach()
  }, [scrubber, videoRef, enabled, src])

  const setProgress = useCallback((value) => scrubber.setProgress(value), [scrubber])

  return { status: enabled ? status : 'idle', setProgress }
}
