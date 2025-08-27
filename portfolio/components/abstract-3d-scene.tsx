"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import type { Mesh } from "three"
import { Environment, Float } from "@react-three/drei"

function AbstractShape({
  position,
  scale,
  color,
}: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} wireframe />
      </mesh>
    </Float>
  )
}

function MovingParticles() {
  const particlesRef = useRef<Mesh>(null)

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3)
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={100} array={particlePositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.05} />
    </points>
  )
}

export default function Abstract3DScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />

        <AbstractShape position={[-3, 2, -2]} scale={0.8} color="#ffffff" />
        <AbstractShape position={[4, -1, -3]} scale={1.2} color="#cccccc" />
        <AbstractShape position={[-2, -3, -1]} scale={0.6} color="#ffffff" />
        <AbstractShape position={[3, 3, -4]} scale={1.0} color="#cccccc" />

        <MovingParticles />
      </Canvas>
    </div>
  )
}
