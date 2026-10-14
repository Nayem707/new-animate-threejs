const HAVE_METADATA = 1

/**
 * Maps a 0–1 progress value onto a paused <video>'s timeline.
 *
 * - Progress is quantized to a frame index, so a given progress always shows the same frame and
 *   scrolling back to a position reproduces it exactly (no accumulated drift).
 * - At most one seek is in flight. Progress updates during a seek only replace the target; the
 *   newest target is applied on `seeked`, and seeks to the frame already requested are skipped.
 * - Nothing is seeked until metadata (duration) is known; the latest target is applied then.
 * - The video is kept paused: any `play` (media keys, browser autoplay heuristics) is undone.
 */
export function createVideoScrubber({ fps, onStatus }) {
  let video = null
  let progress = 0
  let requestedFrame = -1
  let status = 'idle'

  const setStatus = (next) => {
    if (next === status) return
    status = next
    onStatus?.(next)
  }

  const seek = () => {
    if (!video || video.error || video.readyState < HAVE_METADATA || !Number.isFinite(video.duration)) return
    if (video.seeking) return
    const frames = Math.max(1, Math.round(video.duration * fps))
    const frame = Math.round(progress * (frames - 1))
    if (frame === requestedFrame) return
    requestedFrame = frame
    // Aim at the middle of the frame so rounding in the decoder can't land on its neighbour.
    video.currentTime = Math.min((frame + 0.5) / fps, video.duration)
  }

  const onSeeked = () => {
    setStatus('ready')
    seek()
  }
  const onError = () => setStatus('error')
  const onPlay = () => {
    video.pause()
    requestedFrame = -1
    seek()
  }

  const listeners = { loadedmetadata: seek, seeked: onSeeked, error: onError, play: onPlay }

  const detach = () => {
    if (!video) return
    for (const [type, fn] of Object.entries(listeners)) video.removeEventListener(type, fn)
    video = null
    setStatus('idle')
  }

  const attach = (element) => {
    detach()
    video = element
    requestedFrame = -1
    video.muted = true
    video.pause()
    for (const [type, fn] of Object.entries(listeners)) video.addEventListener(type, fn)
    setStatus(video.error ? 'error' : 'loading')
    seek()
  }

  const setProgress = (value) => {
    progress = Math.min(1, Math.max(0, value))
    seek()
  }

  return { attach, detach, setProgress }
}
