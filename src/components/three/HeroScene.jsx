import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerformanceMonitor, Sparkles } from '@react-three/drei'
import { MathUtils } from 'three'
import { Core } from './Core'
import { OrbitRings } from './OrbitRings'
import { Network } from './Network'
import { StudioEnvironment } from './StudioEnvironment'

const QUALITY = {
  high: { dpr: 1.75, nodes: 64, packets: 12, sparkles: 40, antialias: true },
  low: { dpr: 1.25, nodes: 40, packets: 7, sparkles: 16, antialias: false },
}

/** Tilts the whole scene toward the pointer and scales it to fit the viewport. */
function Rig({ pointer, animate, children }) {
  const group = useRef()
  const viewportWidth = useThree((state) => state.viewport.width)
  const scale = Math.min(1, viewportWidth / 6)

  useFrame((_, delta) => {
    if (!animate) return
    const { x, y } = pointer.current
    const g = group.current
    g.rotation.y = MathUtils.damp(g.rotation.y, x * 0.35, 2.5, delta)
    g.rotation.x = MathUtils.damp(g.rotation.x, -y * 0.22, 2.5, delta)
    g.position.x = MathUtils.damp(g.position.x, x * 0.12, 2, delta)
    g.position.y = MathUtils.damp(g.position.y, y * 0.08, 2, delta)
  })

  return (
    <group ref={group} scale={scale}>
      {children}
    </group>
  )
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3.5, -2, -2.5]} intensity={28} color="#8b5cf6" />
      <pointLight position={[3, -2.5, 2.5]} intensity={10} color="#c4b5fd" />
      <StudioEnvironment />
    </>
  )
}

export default function HeroScene({ pointer, animate, active, quality = 'high', onReady }) {
  const settings = QUALITY[quality]
  const [dpr, setDpr] = useState(settings.dpr)

  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 8.5], fov: 38, near: 0.1, far: 50 }}
      gl={{ antialias: settings.antialias, alpha: true, powerPreference: 'high-performance' }}
      frameloop={!animate ? 'demand' : active ? 'always' : 'never'}
      onCreated={() => onReady?.()}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} flipflops={2} />
      <Lighting />
      <Rig pointer={pointer} animate={animate}>
        <Core animate={animate} />
        <OrbitRings animate={animate} />
        <Network count={settings.nodes} packets={settings.packets} animate={animate} />
      </Rig>
      {animate && (
        <Sparkles count={settings.sparkles} scale={[9, 6, 4]} size={1.6} speed={0.2} opacity={0.45} color="#c4b5fd" />
      )}
    </Canvas>
  )
}
