import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

export default function ParallaxSection({
  children,
  offset = 120,
  direction = 'up',
  rotate = 0,
  className = '',
}) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const yUp = useTransform(smoothProgress, [0, 1], [offset, -offset])
  const yDown = useTransform(smoothProgress, [0, 1], [-offset, offset])

  const scaleIn = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1, 0.95])
  const opacityIn = useTransform(smoothProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.4])

  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [15, 0, -15])
  const rotateY = useTransform(smoothProgress, [0, 0.5, 1], [-10, 0, 10])

  let transformStyle = {}

  switch (direction) {
    case 'up':
      transformStyle = { y: yUp }
      break
    case 'down':
      transformStyle = { y: yDown }
      break
    case 'scale':
      transformStyle = { scale: scaleIn, opacity: opacityIn }
      break
    case 'tilt':
      transformStyle = {
        y: yUp,
        rotateX: rotateX,
        rotateY: rotateY,
        opacity: opacityIn,
      }
      break
    default:
      transformStyle = { y: yUp }
  }

  if (rotate !== 0) {
    transformStyle.rotate = rotate
  }

  return (
    <div ref={ref} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      <motion.div style={transformStyle} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
