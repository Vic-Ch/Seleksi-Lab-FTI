import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function AuroraBackground({
  children,
  className = '',
  showRadialGradient = true,
  colorStops = ['#2563EB', '#06B6D4', '#6366F1'],
  opacity = 0.35,
  enableParallax = false,
}) {
  const containerRef = useRef(null)

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth Y translation for aurora layer
  const bgY = useTransform(scrollYProgress, [0, 1], ['0px', '100px'])
  const opacityY = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center bg-[#0B0F19] text-white transition-colors overflow-hidden ${className}`}
    >
      {/* Aurora Ambient Mesh Layer */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={enableParallax ? { y: bgY, opacity: opacityY } : {}}
      >
        <div
          className="aurora-mesh absolute -inset-[120px] opacity-50 blur-[90px] md:blur-[130px] will-change-transform pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${colorStops[0]} 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, ${colorStops[1]} 0%, transparent 60%),
              radial-gradient(circle at 50% 75%, ${colorStops[2]} 0%, transparent 60%)
            `,
            opacity: opacity,
          }}
        />

        {/* Tech Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial vignette overlay */}
        {showRadialGradient && (
          <div className="absolute inset-0 bg-[#0B0F19]/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_90%)] pointer-events-none" />
        )}
      </motion.div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
