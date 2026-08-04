import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { Sparkles, Zap, Shield, Cloud } from 'lucide-react'
import BlurText from './BlurText'
import GradientText from './GradientText'
import FadeContent from './FadeContent'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function InteractiveHero({ stats = [] }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse parallax handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = (e.clientX - centerX) / (rect.width / 2)
    const mouseY = (e.clientY - centerY) / (rect.height / 2)
    setMousePos({ x: mouseX, y: mouseY })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 })
  }

  // Smooth springs for mouse parallax
  const springX = useSpring(mousePos.x, { stiffness: 100, damping: 20 })
  const springY = useSpring(mousePos.y, { stiffness: 100, damping: 20 })

  useEffect(() => {
    springX.set(mousePos.x)
    springY.set(mousePos.y)
  }, [mousePos, springX, springY])

  // Scroll parallax tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Scroll transforms
  const scrollYOffset = useTransform(scrollYProgress, [0, 1], ['0px', '200px'])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const bgScrollY = useTransform(scrollYProgress, [0, 1], ['0px', '100px'])

  // Floating card offsets
  const card1X = useTransform(springX, (x) => `${x * -25}px`)
  const card1Y = useTransform(springY, (y) => `${y * -25}px`)

  const card2X = useTransform(springX, (x) => `${x * 30}px`)
  const card2Y = useTransform(springY, (y) => `${y * 30}px`)

  const card3X = useTransform(springX, (x) => `${x * -35}px`)
  const card3Y = useTransform(springY, (y) => `${y * 35}px`)

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex items-center justify-center bg-[#0B0F19] text-white overflow-hidden select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Aurora background mesh */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgScrollY }}
      >
        <div
          className="aurora-mesh absolute -inset-[120px] opacity-50 blur-[90px] md:blur-[140px] will-change-transform"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #2563EB 0%, transparent 55%),
              radial-gradient(circle at 75% 30%, #06B6D4 0%, transparent 55%),
              radial-gradient(circle at 50% 75%, #6366F1 0%, transparent 55%)
            `,
          }}
        />

        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute inset-0 bg-[#0B0F19]/40 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_90%)]" />
      </motion.div>

      {/* Floating tech badges */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto hidden lg:block z-20">
        <motion.div
          style={{ x: card1X, y: card1Y }}
          className="absolute top-28 left-12 px-4 py-3 rounded-2xl bg-[#0F172A]/90 border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Engineered with</p>
            <p className="text-sm text-white font-semibold">AI Intelligence</p>
          </div>
        </motion.div>

        <motion.div
          style={{ x: card2X, y: card2Y }}
          className="absolute top-36 right-12 px-4 py-3 rounded-2xl bg-[#0F172A]/90 border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-secondary-500/20 text-secondary-400 flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Enterprise Grade</p>
            <p className="text-sm text-white font-semibold">Zero Trust Security</p>
          </div>
        </motion.div>

        <motion.div
          style={{ x: card3X, y: card3Y }}
          className="absolute bottom-32 left-16 px-4 py-3 rounded-2xl bg-[#0F172A]/90 border border-neutral-700/80 shadow-2xl backdrop-blur-md flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl bg-accent-500/20 text-accent-400 flex items-center justify-center">
            <Cloud size={20} />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Global Network</p>
            <p className="text-sm text-white font-semibold">Multi-Cloud Ready</p>
          </div>
        </motion.div>
      </div>

      {/* Main hero content */}
      <motion.div
        style={{
          y: scrollYOffset,
          scale: scrollScale,
          opacity: scrollOpacity,
        }}
        className="relative max-w-5xl mx-auto px-6 py-28 text-center z-10"
      >
        <FadeContent direction="down" distance={20} duration={0.5}>
          <Badge icon={Sparkles} className="mb-8 shadow-lg">
            Next-Generation Technology Solutions
          </Badge>
        </FadeContent>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          <BlurText
            text="Empowering Innovation"
            className="justify-center text-5xl md:text-7xl font-bold tracking-tight text-white"
            delay={100}
            animateBy="words"
            direction="bottom"
          />
          <span className="block mt-2">
            <GradientText
              className="text-5xl md:text-7xl font-bold tracking-tight"
              colors={['#60A5FA', '#06B6D4', '#818CF8', '#60A5FA']}
              animationSpeed={6}
            >
              Through Technology
            </GradientText>
          </span>
        </h1>

        <FadeContent direction="up" distance={30} delay={0.4} duration={0.6}>
          <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            We deliver cutting-edge solutions that transform businesses and drive growth
            in the digital era. Partner with us to build the future.
          </p>
        </FadeContent>

        <FadeContent direction="up" distance={30} delay={0.6} duration={0.6}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/contact" variant="primary" size="lg" showArrow>
              Get Started
            </Button>
            <Button href="#about" variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </FadeContent>

        {/* Stats row */}
        {stats.length > 0 && (
          <FadeContent direction="up" distance={30} delay={0.9} duration={0.6}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-neutral-800/80 backdrop-blur-sm">
              {stats.map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeContent>
        )}
      </motion.div>
    </section>
  )
}
