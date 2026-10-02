import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Countdown from './components/Countdown'
import ParticleField from './components/ParticleField'

const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0])

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 border border-white/30 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            </div>
            <p className="text-white/40 text-xs tracking-[0.5em] uppercase">
              Приглашение
            </p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/60 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Film Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ====== HERO SECTION ====== */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full bg-black flex items-center justify-center">
              <div className="w-[500px] h-[500px] border border-white/[0.05] rounded-full animate-spin" style={{ animationDuration: '40s' }} />
            </div>
          }>
            <Scene3D />
          </Suspense>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-[6vh] bg-black z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-black z-20" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-10 font-light"
          >
            Приглашение на свадьбу
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-light text-white leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="block">Полина</span>
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isLoaded ? '100px' : 0, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-5 md:my-7"
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.5 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="block text-2xl md:text-4xl text-white/50 font-light my-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            &
          </motion.span>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isLoaded ? '100px' : 0, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-5 md:my-7"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 2, delay: 2 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-light text-white leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            <span className="block">Андрей</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="mt-12 md:mt-16"
          >
            <p className="text-white/70 text-xl md:text-2xl tracking-[0.15em] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              27 июля 2027
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isLoaded ? '30px' : 0 }}
              transition={{ duration: 1, delay: 2.8 }}
              className="h-[1px] bg-white/30 mx-auto my-3"
            />
            <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-light">
              Рязань
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 3.5, duration: 1.5 }}
          className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase">
              Листайте
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ====== QUOTE SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4">
        <ParticleField />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-20 h-20 mx-auto mb-14 relative"
          >
            <div className="absolute inset-0 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-3 border border-white/15 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            <div className="absolute inset-6 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-white/40 rounded-full" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
            className="text-white/50 text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            «Любовь не смотрит глазами,
            <br />
            она смотрит сердцем»
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-14"
          />
        </div>
      </section>

      {/* ====== DETAILS SECTION ====== */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2 }}
            className="text-center mb-24"
          >
            <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-5">
              Детали
            </p>
            <h2 className="text-5xl md:text-7xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Наш день
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16 md:gap-8">
            {[
              { label: 'Дата', value: '27 июля', sub: '2027 года', icon: '◈' },
              { label: 'Время', value: '15:00', sub: 'сбор гостей', icon: '◇' },
              { label: 'Место', value: 'Рязань', sub: 'детали позже', icon: '○' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 1 }}
                  className="text-3xl text-white/20 mb-6 group-hover:text-white/50 transition-colors duration-700"
                >
                  {item.icon}
                </motion.div>
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-3">
                  {item.label}
                </p>
                <p className="text-white text-3xl md:text-4xl font-light mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                >
                  {item.value}
                </p>
                <p className="text-white/25 text-sm font-light">
                  {item.sub}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-6"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== COUNTDOWN SECTION ====== */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] border border-white/[0.02] rounded-full animate-spin" style={{ animationDuration: '60s' }} />
          <div className="absolute w-[400px] h-[400px] border border-white/[0.03] rounded-full animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute w-[200px] h-[200px] border border-white/[0.05] rounded-full animate-spin" style={{ animationDuration: '25s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-5">
            Обратный отсчёт
          </p>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-16"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            До нашего дня
          </h2>

          <Countdown targetDate="2027-07-27T15:00:00" />
        </motion.div>
      </section>

      {/* ====== TIMELINE SECTION ====== */}
      <section className="relative py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center mb-24"
          >
            <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-5">
              Программа
            </p>
            <h2 className="text-5xl md:text-7xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Расписание
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

            {[
              { time: '15:00', title: 'Сбор гостей', desc: 'Приветственный коктейль' },
              { time: '16:00', title: 'Церемония', desc: 'Самый важный момент' },
              { time: '17:00', title: 'Банкет', desc: 'Праздничный ужин' },
              { time: '22:00', title: 'Финал вечера', desc: 'Завершение торжества' },
            ].map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.15 }}
                className={`flex items-center mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <p className="text-white/25 text-[10px] tracking-[0.4em] mb-2">
                    {item.time}
                  </p>
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/30 text-sm font-light">
                    {item.desc}
                  </p>
                </div>
                <div className="relative z-10 w-3 h-3 border border-white/30 rounded-full bg-black flex-shrink-0">
                  <div className="absolute inset-1 bg-white/20 rounded-full" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FINAL SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full bg-white/[0.015] blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3 }}
          className="text-center max-w-2xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-14"
          >
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border border-white/15 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '10s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/50 text-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  ∞
                </span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-white/40 text-xl md:text-2xl leading-relaxed font-light mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Мы будем счастливы разделить
            <br />
            этот день с вами
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
          >
            <p className="text-white/70 text-4xl md:text-5xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              П & А
            </p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-14"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 2 }}
            className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-8"
          >
            27 . 07 . 2027 • Рязань
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 text-center border-t border-white/[0.03]">
        <p className="text-white/15 text-[9px] tracking-[0.4em] uppercase">
          С любовью, Полина & Андрей
        </p>
      </footer>
    </div>
  )
}

export default App
