import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ParticleField() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-200px" })

  const particles = useMemo(() => {
    const items = []
    for (let i = 0; i < 40; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.2 + 0.03,
        drift: (Math.random() - 0.5) * 80,
      })
    }
    return items
  }, [])

  const dustMotes = useMemo(() => {
    const items = []
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 60,
        duration: 10 + Math.random() * 8,
        delay: i * 0.7,
        size: 1 + Math.random() * 2,
      })
    }
    return items
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rising particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, particle.opacity, particle.opacity, 0],
            y: [0, -150, -300, -400],
            x: [0, particle.drift, particle.drift * 1.5],
          } : { opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: `blur(${particle.size > 1.5 ? 1 : 0}px)`,
          }}
        />
      ))}

      {/* Floating dust motes with gentle sway */}
      {dustMotes.map((mote) => (
        <motion.div
          key={`dust-${mote.id}`}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.12, 0.08, 0],
            y: [0, -30, -60, -80],
            x: [0, Math.sin(mote.id * 2) * 20, Math.sin(mote.id * 3) * -10, 0],
            scale: [0.5, 1, 0.8, 0.3],
          } : { opacity: 0 }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            left: `${mote.x}%`,
            top: `${mote.y}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            filter: 'blur(0.5px)',
          }}
        />
      ))}

      {/* Light streaks */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.03, 0],
            x: ['-100%', '200%'],
          } : {}}
          transition={{
            duration: 8 + i * 3,
            delay: i * 5 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[1px] w-[200px]"
          style={{
            top: `${20 + i * 25}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: `rotate(${-5 + i * 3}deg)`,
          }}
        />
      ))}
    </div>
  )
}
