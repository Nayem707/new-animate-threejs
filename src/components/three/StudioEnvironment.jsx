import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import {
  CircleGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PMREMGenerator,
  RingGeometry,
  Scene,
} from 'three'

const PANELS = [
  { shape: 'ring', color: '#a78bfa', intensity: 2.5, position: [0, 3, -4], scale: 2.5 },
  { shape: 'rect', color: '#ede9fe', intensity: 1.3, position: [-4, 1, 2], scale: [2.5, 6, 1] },
  { shape: 'rect', color: '#7c3aed', intensity: 2.5, position: [4, -1, 1], scale: [3, 5, 1] },
  { shape: 'rect', color: '#c026d3', intensity: 1.2, position: [0, 0, 5], scale: [4, 1.5, 1] },
  { shape: 'circle', color: '#93c5fd', intensity: 0.8, position: [0, -4, 3], scale: 1.5 },
]

const createGeometry = (shape) => {
  if (shape === 'ring') return new RingGeometry(0.6, 1, 48)
  if (shape === 'circle') return new CircleGeometry(1, 32)
  return new PlaneGeometry(1, 1)
}

/**
 * Bakes a few emissive "light panels" into a prefiltered environment map once, giving the
 * physical materials studio-style reflections without loading HDR files or their decoders.
 */
export function StudioEnvironment() {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const envScene = new Scene()
    envScene.background = new Color('#040308')

    const meshes = PANELS.map(({ shape, color, intensity, position, scale }) => {
      const material = new MeshBasicMaterial({
        color: new Color(color).multiplyScalar(intensity),
        side: DoubleSide,
        toneMapped: false,
      })
      const mesh = new Mesh(createGeometry(shape), material)
      mesh.position.set(...position)
      if (Array.isArray(scale)) mesh.scale.set(...scale)
      else mesh.scale.setScalar(scale)
      mesh.lookAt(0, 0, 0)
      envScene.add(mesh)
      return mesh
    })

    const pmrem = new PMREMGenerator(gl)
    const target = pmrem.fromScene(envScene, 0.04)
    scene.environment = target.texture

    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
      meshes.forEach((mesh) => {
        mesh.geometry.dispose()
        mesh.material.dispose()
      })
    }
  }, [gl, scene])

  return null
}
