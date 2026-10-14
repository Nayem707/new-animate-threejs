import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useWebGLSupport } from '../../hooks/useWebGLSupport'
import { useIsCoarsePointer, useIsDesktop, usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { useWindowPointer } from '../../hooks/useWindowPointer'
import { CanvasErrorBoundary } from './CanvasErrorBoundary'
import { SceneFallback } from './SceneFallback'

const HeroScene = lazy(() => import('./HeroScene'))

const scheduleIdle = (callback) => {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1200 })
    return () => window.cancelIdleCallback(id)
  }
  const id = window.setTimeout(callback, 300)
  return () => window.clearTimeout(id)
}

/**
 * Owns all decisions about the hero 3D scene: whether WebGL is available, when to load it,
 * which quality tier to use, and when to pause rendering. The container has a fixed size
 * set by the parent, so swapping fallback and canvas never shifts the layout.
 */
export function HeroVisual({ className = '' }) {
  const container = useRef(null)
  const pointer = useWindowPointer()
  const webgl = useWebGLSupport()
  const reducedMotion = usePrefersReducedMotion()
  const coarse = useIsCoarsePointer()
  const desktop = useIsDesktop()
  const inView = useInView(container, { margin: '80px 0px' })

  const [shouldLoad, setShouldLoad] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (webgl) return scheduleIdle(() => setShouldLoad(true))
  }, [webgl])

  const lowPower = coarse || !desktop || (navigator.hardwareConcurrency ?? 8) <= 4
  const fallback = <SceneFallback className="size-full" />

  return (
    <div ref={container} className={`relative ${className}`} aria-hidden="true">
      <div
        className="pointer-events-none absolute inset-[12%] rounded-full bg-accent-600/25 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center p-[8%] transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {fallback}
      </div>

      {webgl && shouldLoad && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}>
          <CanvasErrorBoundary fallback={null} onError={() => setReady(false)}>
            <Suspense fallback={null}>
              <HeroScene
                pointer={pointer}
                animate={!reducedMotion}
                active={inView}
                quality={lowPower ? 'low' : 'high'}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      )}
    </div>
  )
}
