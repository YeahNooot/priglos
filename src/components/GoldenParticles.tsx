import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

export default function GoldenParticles() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-200px" })

  const particles = useMemo(() => {
    const items = []
    for (let i = 0; i < 50; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.4 + 0.1,
        drift: (Math.random() - 0.5) * 100,
        gold: Math.random() > 0.5,
      })
    }
    return items
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, particle.opacity, particle.opacity, 0],
            y: [0, -200, -400, -500],
            x: [0, particle.drift, particle.drift * 1.5],
            scale: [0.5, 1, 0.8, 0.3],
          } : { opacity: 0 }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.gold
              ? 'radial-gradient(circle, #C9A961 0%, rgba(201, 169, 97, 0.3) 50%, transparent 100%)'
              : 'radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(201, 169, 97, 0.2) 50%, transparent 100%)',
            boxShadow: particle.gold ? '0 0 6px rgba(201, 169, 97, 0.4)' : 'none',
            filter: `blur(${particle.size > 2 ? 0.5 : 0}px)`,
          }}
        />
      ))}

      {/* Light streaks */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 0.15, 0],
            x: ['-100%', '200%'],
          } : {}}
          transition={{
            duration: 10 + i * 3,
            delay: i * 6 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[1px] w-[200px]"
          style={{
            top: `${20 + i * 25}%`,
            background: 'linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.3), transparent)',
            transform: `rotate(${-5 + i * 3}deg)`,
          }}
        />
      ))}
    </div>
  )
}
