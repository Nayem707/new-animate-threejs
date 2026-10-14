import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const savedPositions = new Map()

function scrollToHash(hash, behavior) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return false
  target.scrollIntoView({ behavior, block: 'start' })
  return true
}

const INTENT_EVENTS = ['wheel', 'touchstart', 'keydown', 'pointerdown']

/**
 * First load with a #hash: lazy routes render after the first commit, and late layout work (web
 * fonts, ScrollTrigger measuring the page by scrolling it) can move the target. Keep the target
 * aligned until fonts are ready and things settle, and stop as soon as the visitor takes over.
 */
function scrollToInitialHash(hash) {
  const id = decodeURIComponent(hash.slice(1))
  const startedAt = performance.now()
  let fontsReady = !document.fonts
  let userTookOver = false
  document.fonts?.ready.then(() => {
    fontsReady = true
  })
  const takeOver = () => {
    userTookOver = true
  }
  INTENT_EVENTS.forEach((type) => window.addEventListener(type, takeOver, { passive: true }))

  const tick = () => {
    const elapsed = performance.now() - startedAt
    const target = document.getElementById(id)
    if (target && !userTookOver) {
      const offset = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      if (Math.abs(target.getBoundingClientRect().top - offset) > 2) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }
    const settled = fontsReady && elapsed > 1000
    if (!userTookOver && !settled && elapsed < 4000) requestAnimationFrame(tick)
    else INTENT_EVENTS.forEach((type) => window.removeEventListener(type, takeOver))
  }
  tick()
}

/**
 * Scroll handling for declarative <BrowserRouter> (which has no built-in ScrollRestoration):
 * - new page: jump to top, or to the #section in the URL
 * - same page: scroll to the #section (smoothly, unless reduced motion is preferred)
 * - back/forward: restore the position the visitor left that entry at
 * Focus moves to <main> on page changes so screen readers start at the new content.
 */
export function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const previous = useRef(null)

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Layout effect so the listener is swapped synchronously during the navigation commit,
  // before the browser can report a clamped scroll position against the previous entry.
  useLayoutEffect(() => {
    let frame = 0
    const save = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => savedPositions.set(location.key, window.scrollY))
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', save)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const prev = previous.current
    if (prev?.key === location.key) return
    previous.current = location

    if (!prev) {
      if (location.hash) scrollToInitialHash(location.hash)
      return
    }

    if (navigationType === 'POP' && savedPositions.has(location.key)) {
      window.scrollTo({ top: savedPositions.get(location.key), behavior: 'instant' })
      return
    }

    const samePage = prev.pathname === location.pathname
    const behavior = samePage ? 'auto' : 'instant'
    if (!location.hash || !scrollToHash(location.hash, behavior)) {
      window.scrollTo({ top: 0, behavior })
    }
    if (!samePage) document.getElementById('main')?.focus({ preventScroll: true })
  }, [location, navigationType])

  return null
}
