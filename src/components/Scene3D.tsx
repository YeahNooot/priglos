import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WeddingRings() {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.12
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.1
      ring2Ref.current.rotation.x = Math.cos(t * 0.06) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={ring1Ref} position={[-0.7, 0, 0]}>
          <torusGeometry args={[1.2, 0.035, 48, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={ring2Ref} position={[0.5, 0.2, -0.3]} rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[1.0, 0.03, 48, 100]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.08}
            emissive="#ffffff"
            emissiveIntensity={0.03}
          />
        </mesh>
      </Float>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.015
      particlesRef.current.rotation.x = Math.sin(t * 0.008) * 0.03
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function LightBeams() {
  const beamsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (beamsRef.current) {
      beamsRef.current.rotation.z = t * 0.02
    }
  })

  return (
    <group ref={beamsRef}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 4) * i]}>
          <planeGeometry args={[0.3, 20]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.015}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#000000' }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 5, 15]} />

        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.15} color="#cccccc" />
        <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" distance={12} />

        <WeddingRings />
        <FloatingParticles />
        <LightBeams />
      </Canvas>
    </div>
  )
}
