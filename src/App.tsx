import { useEffect, useRef, useState, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent } from 'framer-motion'
import Countdown from './components/Countdown'
import GoldenParticles from './components/GoldenParticles'
import CustomCursor from './components/CustomCursor'

const Scene3D = lazy(() => import('./components/Scene3D'))

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text'>('default')
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 })

  // Hero transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.92])
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -80])

  // Section reveals
  const section1Opacity = useTransform(smoothProgress, [0.08, 0.15], [0, 1])
  const section2Opacity = useTransform(smoothProgress, [0.2, 0.28], [0, 1])
  const section3Opacity = useTransform(smoothProgress, [0.35, 0.42], [0, 1])
  const section4Opacity = useTransform(smoothProgress, [0.5, 0.58], [0, 1])
  const section5Opacity = useTransform(smoothProgress, [0.65, 0.72], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden" style={{ background: '#F8F6F1' }}>
      {/* Custom Cursor */}
      <CustomCursor variant={cursorVariant} />

      {/* Loading Screen */}
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ background: '#F8F6F1' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {}}
      >
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid rgba(201, 169, 97, 0.3)' }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full"
              style={{ border: '1px solid rgba(201, 169, 97, 0.5)', borderTopColor: '#C9A961' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#C9A961' }}
              />
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: '#0A0A0A', fontFamily: "'Montserrat', sans-serif", opacity: 0.4 }}
          >
            P & A
          </motion.p>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #C9A961, #D4AF37, #C9A961)',
        }}
      />

      {/* ====== HERO SECTION ====== */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#F8F6F1' }}>
              <div className="w-[300px] h-[300px] rounded-full" style={{ border: '1px solid rgba(201, 169, 97, 0.2)' }} />
            </div>
          }>
            <Scene3D />
          </Suspense>
        </div>

        {/* Soft vignette */}
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(248,246,241,0.6) 100%)'
          }}
        />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <p className="text-[10px] md:text-xs tracking-[0.6em] uppercase mb-12 font-light"
              style={{ color: '#0A0A0A', opacity: 0.4, fontFamily: "'Montserrat', sans-serif" }}
            >
              Приглашение на свадьбу
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl md:text-8xl lg:text-[10rem] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
          >
            <span className="block">Полина</span>
          </motion.h1>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isLoaded ? '80px' : 0, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="h-[1px] mx-auto my-6 md:my-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
          />

          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.5 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="block text-2xl md:text-4xl font-light my-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A961' }}
          >
            &
          </motion.span>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: isLoaded ? '80px' : 0, opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="h-[1px] mx-auto my-6 md:my-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 2, delay: 2 }}
            className="text-6xl md:text-8xl lg:text-[10rem] leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
          >
            <span className="block">Андрей</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 2, delay: 2.5 }}
            className="mt-14 md:mt-20"
          >
            <p className="text-xl md:text-2xl tracking-[0.15em] font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0A0A0A' }}
            >
              27 июля 2027
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isLoaded ? '20px' : 0 }}
              transition={{ duration: 1, delay: 2.8 }}
              className="h-[1px] mx-auto my-3"
              style={{ background: '#C9A961' }}
            />
            <p className="text-xs tracking-[0.5em] uppercase font-light"
              style={{ color: '#0A0A0A', opacity: 0.5, fontFamily: "'Montserrat', sans-serif" }}
            >
              Рязань
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ delay: 3.5, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: '#0A0A0A', opacity: 0.3, fontFamily: "'Montserrat', sans-serif" }}
            >
              Листайте
            </span>
            <div className="w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, #C9A961, transparent)' }} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ====== TRANSITION DIVIDER ====== */}
      <div className="relative h-32 flex items-center justify-center overflow-hidden" style={{ background: '#F8F6F1' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '200px' }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          className="h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
        />
      </div>

      {/* ====== QUOTE SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4" style={{ background: '#F8F6F1' }}>
        <GoldenParticles />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-24 h-24 mx-auto mb-16 relative"
          >
            <div className="absolute inset-0 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.2)', animationDuration: '20s' }} />
            <div className="absolute inset-3 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.3)', animationDuration: '15s', animationDirection: 'reverse' }} />
            <div className="absolute inset-6 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.2)', animationDuration: '10s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A961' }} />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0A0A0A' }}
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
            className="h-[1px] mx-auto mt-16"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
          />
        </div>
      </section>

      {/* ====== DETAILS SECTION ====== */}
      <section className="relative py-32 px-4" style={{ background: '#F8F6F1' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2 }}
            className="text-center mb-28"
          >
            <p className="text-[10px] tracking-[0.6em] uppercase mb-6"
              style={{ color: '#C9A961', fontFamily: "'Montserrat', sans-serif" }}
            >
              Детали
            </p>
            <h2 className="text-5xl md:text-7xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
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
                className="text-center group cursor-pointer"
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 180 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-3xl mb-8 transition-colors duration-700"
                  style={{ color: '#C9A961' }}
                >
                  {item.icon}
                </motion.div>
                <p className="text-[10px] tracking-[0.5em] uppercase mb-4"
                  style={{ color: '#0A0A0A', opacity: 0.4, fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </p>
                <p className="text-3xl md:text-4xl font-light mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
                >
                  {item.value}
                </p>
                <p className="text-sm font-light"
                  style={{ color: '#0A0A0A', opacity: 0.4, fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.sub}
                </p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                  className="h-[1px] mx-auto mt-8"
                  style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== COUNTDOWN SECTION ====== */}
      <section className="relative py-32 px-4 overflow-hidden" style={{ background: '#F8F6F1' }}>
        {/* Background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.08)', animationDuration: '60s' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.1)', animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute w-[200px] h-[200px] rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.15)', animationDuration: '25s' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <p className="text-[10px] tracking-[0.6em] uppercase mb-6"
            style={{ color: '#C9A961', fontFamily: "'Montserrat', sans-serif" }}
          >
            Обратный отсчёт
          </p>
          <h2 className="text-5xl md:text-7xl font-light mb-20"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
          >
            До нашего дня
          </h2>

          <Countdown targetDate="2027-07-27T15:00:00" />
        </motion.div>
      </section>

      {/* ====== TIMELINE SECTION ====== */}
      <section className="relative py-32 px-4" style={{ background: '#F8F6F1' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="text-center mb-28"
          >
            <p className="text-[10px] tracking-[0.6em] uppercase mb-6"
              style={{ color: '#C9A961', fontFamily: "'Montserrat', sans-serif" }}
            >
              Программа
            </p>
            <h2 className="text-5xl md:text-7xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
            >
              Расписание
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 w-[1px] h-full" style={{ background: 'linear-gradient(to bottom, transparent, #C9A961, transparent)', opacity: 0.3 }} />

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
                className={`flex items-center mb-20 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right pr-10' : 'text-left pl-10'}`}>
                  <p className="text-[10px] tracking-[0.4em] mb-3"
                    style={{ color: '#C9A961', fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.time}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm font-light"
                    style={{ color: '#0A0A0A', opacity: 0.4, fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
                <div className="relative z-10 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ border: '1px solid #C9A961', background: '#F8F6F1' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#C9A961' }} />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FINAL SECTION ====== */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden" style={{ background: '#F8F6F1' }}>
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-[400px] h-[400px] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(201, 169, 97, 0.15) 0%, transparent 70%)' }}
          />
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
              <div className="absolute inset-0 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.3)', animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.2)', animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full animate-spin" style={{ border: '1px solid rgba(201, 169, 97, 0.4)', animationDuration: '10s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-4xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A961' }}
                >
                  ∞
                </motion.span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="text-xl md:text-2xl leading-relaxed font-light mb-12"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0A0A0A' }}
          >
            Мы будем счастливы разделить
            <br />
            этот день с вами
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
          >
            <p className="text-4xl md:text-5xl font-light tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#0A0A0A' }}
            >
              П <span style={{ color: '#C9A961' }}>&</span> А
            </p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1.5 }}
            className="h-[1px] mx-auto mt-16"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A961, transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 2 }}
            className="text-[10px] tracking-[0.5em] uppercase mt-10"
            style={{ color: '#0A0A0A', opacity: 0.3, fontFamily: "'Montserrat', sans-serif" }}
          >
            27 . 07 . 2027 • Рязань
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 text-center" style={{ background: '#F8F6F1', borderTop: '1px solid rgba(201, 169, 97, 0.1)' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase"
          style={{ color: '#0A0A0A', opacity: 0.3, fontFamily: "'Montserrat', sans-serif" }}
        >
          С любовью, Полина & Андрей
        </p>
      </footer>
    </div>
  )
}

export default App
