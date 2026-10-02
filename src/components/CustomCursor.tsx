import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CustomCursorProps {
  variant: 'default' | 'hover' | 'text'
}

export default function CustomCursor({ variant }: CustomCursorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const hideCursor = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseleave', hideCursor)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseleave', hideCursor)
    }
  }, [cursorX, cursorY])

  const cursorSize = variant === 'hover' ? 60 : variant === 'text' ? 40 : 20
  const cursorOpacity = variant === 'hover' ? 0.3 : variant === 'text' ? 0.2 : 0.5

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: cursorSize,
            height: cursorSize,
            opacity: isVisible ? cursorOpacity : 0,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full"
          style={{
            background: variant === 'hover' ? 'rgba(201, 169, 97, 0.3)' : 'rgba(10, 10, 10, 0.8)',
            border: variant === 'hover' ? '1px solid rgba(201, 169, 97, 0.5)' : 'none',
          }}
        />
      </motion.div>

      {/* Outer ring for hover */}
      {variant === 'hover' && (
        <motion.div
          className="fixed pointer-events-none z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full"
            style={{
              border: '1px solid rgba(201, 169, 97, 0.3)',
            }}
          />
        </motion.div>
      )}
    </>
  )
}
