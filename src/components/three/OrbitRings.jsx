import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const RINGS = [
  { radius: 1.95, tilt: [1.2, 0.2, 0.3], speed: 0.35, opacity: 0.4 },
  { radius: 2.25, tilt: [1.75, -0.5, -0.2], speed: -0.22, opacity: 0.22 },
]

function Ring({ radius, tilt, speed, opacity, animate }) {
  const orbit = useRef()

  useFrame((_, delta) => {
    if (animate) orbit.current.rotation.z += delta * speed
  })

  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.004, 6, 160]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={opacity} depthWrite={false} />
      </mesh>
      <group ref={orbit}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color="#ede9fe" toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

export function OrbitRings({ animate }) {
  return RINGS.map((ring) => <Ring key={ring.radius} {...ring} animate={animate} />)
}
