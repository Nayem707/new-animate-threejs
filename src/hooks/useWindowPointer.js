import { useEffect, useRef } from 'react'

/**
 * Normalized pointer position (-1..1) stored in a ref so animation loops can read it
 * without triggering React re-renders. Listening on window keeps the canvas itself
 * non-interactive, so it never intercepts clicks, taps or scroll gestures.
 */
export function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pointer
}
