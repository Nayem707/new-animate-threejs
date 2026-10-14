import { useEffect, useRef } from 'react'
import { createGlyphField } from '../../animations/glyphField'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'

// Layout position (ignores transforms such as entrance animations) relative to the document.
function layoutOffset(element) {
  let x = 0
  let y = 0
  for (let node = element; node; node = node.offsetParent) {
    x += node.offsetLeft
    y += node.offsetTop
  }
  return { x, y }
}

/**
 * Decorative animated glyph background. Fills its positioned parent, animates only while on
 * screen and the tab is visible, and brightens around the pointer.
 * `excludeRef` points at an opaque element on top of the field; cells under it aren't drawn.
 * With reduced motion it renders a single static frame.
 */
export function GlyphField({ excludeRef, className = '' }) {
  const canvasRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const exclude = excludeRef?.current
    const field = createGlyphField(canvas)
    let inView = false

    const measure = () => {
      if (exclude) {
        const origin = layoutOffset(canvas)
        const offset = layoutOffset(exclude)
        field.setExclusion({
          x: offset.x - origin.x,
          y: offset.y - origin.y,
          width: exclude.offsetWidth,
          height: exclude.offsetHeight,
        })
      }
      field.resize()
    }
    const sync = () => {
      if (inView && !reducedMotion && document.visibilityState === 'visible') field.start()
      else field.stop()
    }
    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      field.setPointer(event.clientX - rect.left, event.clientY - rect.top)
    }
    const onPointerLeave = () => field.setPointer(-1e4, -1e4)

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(canvas)
    if (exclude) resizeObserver.observe(exclude)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    intersectionObserver.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    // The field sits behind the page content, so the pointer is tracked on the window.
    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }
    document.fonts?.ready.then(() => field.refresh())

    return () => {
      field.stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [excludeRef, reducedMotion])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none size-full ${className}`} />
}
