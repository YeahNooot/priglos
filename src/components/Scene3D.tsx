import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function GoldenRings() {
  const groupRef = useRef<THREE.Group>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.1
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.15
      ring1Ref.current.rotation.x = Math.sin(t * 0.08) * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.12
      ring2Ref.current.rotation.x = Math.cos(t * 0.06) * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.08
      ring3Ref.current.rotation.z = Math.sin(t * 0.07) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main ring */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={ring1Ref} position={[-0.7, 0, 0]}>
          <torusGeometry args={[1.2, 0.04, 64, 128]} />
          <meshStandardMaterial
            color="#C9A961"
            metalness={0.95}
            roughness={0.1}
            emissive="#C9A961"
            emissiveIntensity={0.1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Second ring */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={ring2Ref} position={[0.5, 0.2, -0.3]} rotation={[0.4, 0.3, 0]}>
          <torusGeometry args={[1.0, 0.035, 64, 128]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.15}
            emissive="#D4AF37"
            emissiveIntensity={0.08}
            envMapIntensity={1.8}
          />
        </mesh>
      </Float>

      {/* Third subtle ring */}
      <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <mesh ref={ring3Ref} position={[0, -0.3, 0.5]} rotation={[0.6, 0, 0.3]}>
          <torusGeometry args={[0.8, 0.025, 48, 96]} />
          <meshStandardMaterial
            color="#B8860B"
            metalness={0.85}
            roughness={0.2}
            transparent
            opacity={0.7}
            emissive="#B8860B"
            emissiveIntensity={0.05}
          />
        </mesh>
      </Float>
    </group>
  )
}

function GoldenParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 250

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
      particlesRef.current.rotation.y = t * 0.02
      particlesRef.current.rotation.x = Math.sin(t * 0.01) * 0.05
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
        size={0.03}
        color="#C9A961"
        transparent
        opacity={0.4}
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
      beamsRef.current.rotation.z = t * 0.03
    }
  })

  return (
    <group ref={beamsRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 5) * i]}>
          <planeGeometry args={[0.4, 20]} />
          <meshBasicMaterial
            color="#C9A961"
            transparent
            opacity={0.02}
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
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: '#F8F6F1' }}
      >
        <color attach="background" args={['#F8F6F1']} />
        <fog attach="fog" args={['#F8F6F1', 5, 15]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#FFF8DC" />
        <pointLight position={[0, 0, 4]} intensity={0.6} color="#C9A961" distance={12} />
        <pointLight position={[-3, 2, 2]} intensity={0.3} color="#D4AF37" distance={8} />
        <pointLight position={[3, -2, 1]} intensity={0.2} color="#B8860B" distance={8} />

        <GoldenRings />
        <GoldenParticles />
        <LightBeams />
      </Canvas>
    </div>
  )
}
