import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferAttribute, BufferGeometry, Color, Object3D, Vector3 } from 'three'
import { createRandom } from './random'

const NODE_COLOR = new Color('#8b6fd6')
const HUB_COLOR = new Color('#f5f3ff')
const dummy = new Object3D()

/** Distributes nodes on a jittered Fibonacci sphere and links each one to its nearest neighbours. */
function buildGraph(count, radius, seed) {
  const random = createRandom(seed)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes = []

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const scale = radius * (0.9 + random() * 0.22)
    nodes.push(new Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(scale))
  }

  const edgeKeys = new Set()
  const edges = []
  const adjacency = nodes.map(() => [])

  nodes.forEach((node, i) => {
    const nearest = nodes
      .map((other, j) => ({ j, d: i === j ? Infinity : node.distanceToSquared(other) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)

    nearest.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (edgeKeys.has(key)) return
      edgeKeys.add(key)
      edges.push([i, j])
      adjacency[i].push(j)
      adjacency[j].push(i)
    })
  })

  const positions = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], k) => {
    nodes[a].toArray(positions, k * 6)
    nodes[b].toArray(positions, k * 6 + 3)
  })
  const lineGeometry = new BufferGeometry()
  lineGeometry.setAttribute('position', new BufferAttribute(positions, 3))

  const hubs = new Set(Array.from({ length: Math.round(count * 0.12) }, () => Math.floor(random() * count)))

  return { nodes, edges, adjacency, lineGeometry, hubs, random }
}

export function Network({ count = 72, radius = 2.55, packets = 10, animate, seed = 7 }) {
  const graph = useMemo(() => buildGraph(count, radius, seed), [count, radius, seed])
  const nodeMesh = useRef()
  const packetMesh = useRef()
  const group = useRef()

  const travellers = useMemo(
    () =>
      Array.from({ length: packets }, (_, i) => {
        const [from, to] = graph.edges[Math.floor(graph.random() * graph.edges.length)]
        return { from, to, t: (i / packets) % 1, speed: 0.25 + graph.random() * 0.35 }
      }),
    [graph, packets],
  )

  useLayoutEffect(() => {
    graph.nodes.forEach((position, i) => {
      const hub = graph.hubs.has(i)
      dummy.position.copy(position)
      dummy.scale.setScalar(hub ? 1.6 : 1)
      dummy.updateMatrix()
      nodeMesh.current.setMatrixAt(i, dummy.matrix)
      nodeMesh.current.setColorAt(i, hub ? HUB_COLOR : NODE_COLOR)
    })
    nodeMesh.current.instanceMatrix.needsUpdate = true
    if (nodeMesh.current.instanceColor) nodeMesh.current.instanceColor.needsUpdate = true
    return () => graph.lineGeometry.dispose()
  }, [graph])

  const placePackets = () => {
    travellers.forEach((p, i) => {
      dummy.position.lerpVectors(graph.nodes[p.from], graph.nodes[p.to], p.t)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      packetMesh.current.setMatrixAt(i, dummy.matrix)
    })
    packetMesh.current.instanceMatrix.needsUpdate = true
  }

  useLayoutEffect(placePackets)

  useFrame((_, delta) => {
    if (!animate) return
    group.current.rotation.y += delta * 0.035

    travellers.forEach((p) => {
      p.t += delta * p.speed
      if (p.t >= 1) {
        // Route onward to a neighbour of the node we just reached.
        const options = graph.adjacency[p.to].filter((n) => n !== p.from)
        const next = options.length ? options[Math.floor(graph.random() * options.length)] : p.from
        p.from = p.to
        p.to = next
        p.t = 0
      }
    })
    placePackets()
  })

  return (
    <group ref={group}>
      <lineSegments geometry={graph.lineGeometry}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.2} depthWrite={false} />
      </lineSegments>

      <instancedMesh ref={nodeMesh} args={[undefined, undefined, graph.nodes.length]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <instancedMesh ref={packetMesh} args={[undefined, undefined, travellers.length]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#e9d5ff" toneMapped={false} />
      </instancedMesh>
    </group>
  )
}
