import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Core({ animate }) {
  const crystal = useRef()
  const shell = useRef()

  useFrame((state, delta) => {
    if (!animate) return
    crystal.current.rotation.y += delta * 0.16
    crystal.current.rotation.x += delta * 0.05
    shell.current.rotation.y -= delta * 0.07
    shell.current.rotation.z += delta * 0.03
    crystal.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
  })

  return (
    <group>
      <mesh ref={crystal} rotation={[0.35, 0.4, 0]}>
        <icosahedronGeometry args={[1.05, 0]} />
        <meshPhysicalMaterial
          color="#6d3bd8"
          emissive="#2e1065"
          emissiveIntensity={0.4}
          metalness={0.45}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.15}
          iridescence={1}
          iridescenceIOR={1.4}
          envMapIntensity={1.1}
          flatShading
        />
      </mesh>

      <mesh ref={shell} scale={1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.14} depthWrite={false} />
      </mesh>
    </group>
  )
}
