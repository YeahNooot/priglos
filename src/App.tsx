import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Scene3D from './components/Scene3D'
import Countdown from './components/Countdown'
import ParticleField from './components/ParticleField'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [curtainOpen, setCurtainOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
      setTimeout(() => setCurtainOpen(true), 300)
    }, 2000)
    return () => clearTimeout(loadTimer)
  }, [])

  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.95])
  const parallaxY = useTransform(smoothProgress, [0, 1], [0, -200])

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Cinema Curtains */}
      <AnimatePresence>
        {!curtainOpen && (
          <>
            <motion.div
              className="fixed top-0 left-0 w-1/2 h-full z-[90] bg-black"
              initial={{ x: 0 }}
              animate={{ x: curtainOpen ? '-100%' : 0 }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            <motion.div
              className="fixed top-0 right-0 w-1/2 h-full z-[90] bg-black"
              initial={{ x: 0 }}
              animate={{ x: curtainOpen ? '100%' : 0 }}
              transition={{ duration: 2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-white/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border border-white/30 rounded-full"
                  style={{ borderTopColor: 'rgba(255,255,255,0.8)' }}
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-white/10 rounded-full"
                  style={{ borderRightColor: 'rgba(255,255,255,0.6)' }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white/40 text-xs tracking-[0.5em] uppercase"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Приглашение
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/60 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Film Grain Overlay - always visible */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 0.5s steps(1) infinite',
        }}
      />

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0">
          <Scene3D />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
          }}
        />

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-[8vh] bg-black z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-black z-20" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 2.5, delay: 0.3 }}
          className="relative z-20 text-center px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 30, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.5em' }}
            transition={{ duration: 2, delay: 1.5 }}
            className="text-white/40 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-10 font-light"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Приглашение на свадьбу
          </motion.p>

          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-7xl md:text-9xl lg:text-[10rem] font-light text-white leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
                className="block"
              >
                Полина
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120px', opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.5 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-6 md:my-8"
            />

            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 2.8 }}
              className="block text-3xl md:text-5xl text-white/60 font-light my-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              &
            </motion.span>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '120px', opacity: 1 }}
              transition={{ duration: 1.5, delay: 3 }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto my-6 md:my-8"
            />

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 3.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-7xl md:text-9xl lg:text-[10rem] font-light text-white leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              <motion.span
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, delay: 3.4 }}
                className="block"
              >
                Андрей
              </motion.span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 3.8 }}
            className="mt-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 4 }}
              className="inline-block"
            >
              <p className="text-white/70 text-xl md:text-2xl tracking-[0.15em] font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                27 июля 2027
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '40px' }}
                transition={{ duration: 1, delay: 4.5 }}
                className="h-[1px] bg-white/30 mx-auto my-4"
              />
              <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-light"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Рязань
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 5, duration: 1.5 }}
          className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <span className="text-white/20 text-[9px] tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Листайте
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Transition - cinematic wipe */}
      <section className="relative h-[30vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)',
          }}
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </section>

      {/* Quote Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4">
        <ParticleField />
        <motion.div
          style={{ y: parallaxY }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-24 h-24 mx-auto mb-16 relative"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 border border-white/15 rounded-full"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-6 border border-white/10 rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-white/40 rounded-full" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
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
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.8 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-16"
          />
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2 }}
            className="text-center mb-28"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Детали
            </motion.p>
            <h2 className="text-6xl md:text-8xl font-light text-white"
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
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.25 }}
                className="text-center group relative"
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-4xl text-white/20 mb-8 group-hover:text-white/50 transition-colors duration-1000"
                >
                  {item.icon}
                </motion.div>
                <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </p>
                <p className="text-white text-4xl md:text-5xl font-light mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                >
                  {item.value}
                </p>
                <p className="text-white/25 text-sm font-light"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.sub}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '50px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.25 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative py-40 px-4 overflow-hidden">
        {/* Background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] border border-white/[0.02] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute w-[600px] h-[600px] border border-white/[0.03] rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border border-white/[0.04] rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] border border-white/[0.06] rounded-full"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-6"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Обратный отсчёт
          </motion.p>
          <h2 className="text-6xl md:text-8xl font-light text-white mb-20"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
          >
            До нашего дня
          </h2>

          <Countdown targetDate="2027-07-27T15:00:00" />
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center mb-28"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Программа
            </motion.p>
            <h2 className="text-6xl md:text-8xl font-light text-white"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Расписание
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute left-1/2 top-0 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
            />

            {[
              { time: '15:00', title: 'Сбор гостей', desc: 'Приветственный коктейль' },
              { time: '16:00', title: 'Церемония', desc: 'Самый важный момент' },
              { time: '17:00', title: 'Банкет', desc: 'Праздничный ужин' },
              { time: '22:00', title: 'Финал вечера', desc: 'Завершение торжества' },
            ].map((item, i) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                className={`flex items-center mb-20 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                  <p className="text-white/25 text-[10px] tracking-[0.4em] mb-3"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.time}
                  </p>
                  <h3 className="text-white text-3xl md:text-4xl font-light mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-white/30 text-sm font-light"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    className="w-3 h-3 border border-white/30 rounded-full bg-black relative"
                  >
                    <div className="absolute inset-1 bg-white/20 rounded-full" />
                  </motion.div>
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-3xl" />
          </motion.div>
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
            className="mb-16"
          >
            <div className="w-36 h-36 mx-auto relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-white/15 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-white/10 rounded-full"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 border border-white/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white/50 text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ∞
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-white/40 text-xl md:text-2xl leading-relaxed font-light mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Мы будем счастливы разделить
            <br />
            этот день с вами
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-16"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 2 }}
            className="text-white/15 text-[10px] tracking-[0.4em] uppercase mt-10"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            27 . 07 . 2027 • Рязань
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 text-center border-t border-white/[0.03]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-white/15 text-[9px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          С любовью, Полина & Андрей
        </motion.p>
      </footer>

      {/* CSS for grain animation */}
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
      `}</style>
    </div>
  )
}

export default App
