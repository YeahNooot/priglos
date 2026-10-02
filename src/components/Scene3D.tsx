import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function WeddingRings() {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.15
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.1
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12
      ring1Ref.current.rotation.x = Math.sin(t * 0.08) * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.1
      ring2Ref.current.rotation.x = Math.cos(t * 0.06) * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.05
      ring3Ref.current.rotation.z = Math.sin(t * 0.07) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main ring */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={ring1Ref} position={[-0.8, 0, 0]}>
          <torusGeometry args={[1.3, 0.035, 64, 128]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.95}
            roughness={0.05}
            emissive="#ffffff"
            emissiveIntensity={0.04}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Second ring */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={ring2Ref} position={[0.6, 0.2, -0.3]} rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[1.1, 0.03, 64, 128]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.08}
            emissive="#ffffff"
            emissiveIntensity={0.03}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Third subtle ring */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh ref={ring3Ref} position={[0, -0.3, 0.5]} rotation={[0.6, 0, 0.3]}>
          <torusGeometry args={[0.8, 0.02, 48, 96]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.85}
            roughness={0.1}
            transparent
            opacity={0.6}
            emissive="#ffffff"
            emissiveIntensity={0.02}
          />
        </mesh>
      </Float>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 300

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = Math.random() * 0.003 + 0.001
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return [pos, vel]
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.015
      particlesRef.current.rotation.x = Math.sin(t * 0.008) * 0.03

      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        posArray[i * 3] += velocities[i * 3]
        posArray[i * 3 + 1] += velocities[i * 3 + 1]
        posArray[i * 3 + 2] += velocities[i * 3 + 2]

        // Reset particles that go too far
        if (posArray[i * 3 + 1] > 10) {
          posArray[i * 3 + 1] = -10
          posArray[i * 3] = (Math.random() - 0.5) * 20
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
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
        opacity={0.35}
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
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 5) * i]}>
          <planeGeometry args={[0.3, 25]} />
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

function OrbitingDots() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2
      groupRef.current.rotation.x = t * 0.05
    }
  })

  const dots = useMemo(() => {
    const items = []
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const radius = 2.5 + Math.sin(i * 1.5) * 0.5
      items.push({
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.3,
          Math.sin(angle) * radius * 0.5,
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.02,
      })
    }
    return items
  }, [])

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={dot.position}>
          <sphereGeometry args={[dot.size, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
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
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: '#000000' }}
      >
        <fog attach="fog" args={['#000000', 6, 18]} />

        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.15} color="#cccccc" />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#ffffff" distance={10} />
        <pointLight position={[-3, 2, 2]} intensity={0.2} color="#ffffff" distance={8} />
        <pointLight position={[3, -2, 1]} intensity={0.15} color="#ffffff" distance={8} />

        <WeddingRings />
        <FloatingParticles />
        <LightBeams />
        <OrbitingDots />
      </Canvas>
    </div>
  )
}
