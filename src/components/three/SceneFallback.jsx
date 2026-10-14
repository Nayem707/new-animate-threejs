import { createRandom } from './random'

const C = 200
const R = 78
const point = (angleDeg, radius) => {
  const a = (angleDeg * Math.PI) / 180
  return [C + Math.cos(a) * radius, C + Math.sin(a) * radius]
}

const hexagon = Array.from({ length: 6 }, (_, i) => point(-90 + i * 60, R))
const triangle = [90, 210, 330].map((deg) => point(deg, R * 0.52))
const facets = triangle.flatMap((t, i) => {
  const base = [3, 5, 1][i]
  return [-1, 0, 1].map((o) => [t, hexagon[(base + o + 6) % 6]])
})

const random = createRandom(11)
const nodes = Array.from({ length: 34 }, () => {
  const angle = random() * 360
  const radius = 120 + random() * 60
  return { p: point(angle, radius), r: random() > 0.85 ? 2.4 : 1.4 }
})

/** Lightweight static stand-in for the WebGL scene: shown while loading, without WebGL, or on error. */
export function SceneFallback({ className = '' }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="fb-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6d28d9" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#2a1650" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0c0a12" />
        </linearGradient>
      </defs>

      <g fill="none" stroke="#a78bfa">
        <ellipse cx={C} cy={C} rx="150" ry="52" transform="rotate(-18 200 200)" strokeOpacity="0.35" />
        <ellipse cx={C} cy={C} rx="168" ry="88" transform="rotate(28 200 200)" strokeOpacity="0.18" />
        <circle cx={C} cy={C} r="116" strokeOpacity="0.1" strokeDasharray="2 6" />
      </g>

      {nodes.map(({ p, r }, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={r} fill="#c4b5fd" fillOpacity={r > 2 ? 0.9 : 0.55} />
      ))}

      <polygon points={hexagon.map((p) => p.join(',')).join(' ')} fill="url(#fb-face)" stroke="#c4b5fd" strokeOpacity="0.5" />
      <g stroke="#c4b5fd" strokeOpacity="0.35">
        {facets.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
        ))}
        <polygon points={triangle.map((p) => p.join(',')).join(' ')} fill="#8b5cf6" fillOpacity="0.12" />
      </g>
    </svg>
  )
}
