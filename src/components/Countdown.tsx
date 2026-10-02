import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CountdownProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBlock({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay }}
      className="flex flex-col items-center group"
    >
      <div className="relative">
        {/* Glow effect on hover */}
        <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-lg"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="w-20 h-28 md:w-28 md:h-36 border border-white/[0.08] flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)',
          }}
        >
          {/* Top shine */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent" />

          {/* Center divider line */}
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.05]" />

          {/* Number */}
          <motion.span
            key={value}
            initial={{ opacity: 0.5, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light text-white/90 relative z-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/10" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10" />
        </div>
      </div>

      <p className="text-white/25 text-[9px] tracking-[0.4em] uppercase mt-5"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <TimeBlock value={timeLeft.days} label="Дней" delay={0.2} />

      <motion.div
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col gap-3 mt-[-20px]"
      >
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
      </motion.div>

      <TimeBlock value={timeLeft.hours} label="Часов" delay={0.4} />

      <motion.div
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="flex flex-col gap-3 mt-[-20px]"
      >
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
      </motion.div>

      <TimeBlock value={timeLeft.minutes} label="Минут" delay={0.6} />

      <motion.div
        animate={{ opacity: [0.15, 0.5, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="flex flex-col gap-3 mt-[-20px]"
      >
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
      </motion.div>

      <TimeBlock value={timeLeft.seconds} label="Секунд" delay={0.8} />
    </div>
  )
}
