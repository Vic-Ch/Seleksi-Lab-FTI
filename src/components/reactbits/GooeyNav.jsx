import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { gsap } from 'gsap'

export default function GooeyNav({
  items = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ],
  particleCount = 12,
  particleDistances = [70, 15],
  particleR = 90,
  initialActiveIndex = 0,
  animationTime = 500,
  timeVariance = 200,
  onItemClick,
  className = '',
}) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const itemRefs = useRef([])
  const particlesContainerRef = useRef(null)

  useEffect(() => {
    setActiveIndex(initialActiveIndex)
  }, [initialActiveIndex])

  const updatePillPosition = (index, animate = true) => {
    const activeEl = itemRefs.current[index]
    const pill = pillRef.current
    if (!activeEl || !pill || !navRef.current) return

    const elRect = activeEl.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()

    if (elRect.width === 0) {
      requestAnimationFrame(() => updatePillPosition(index, animate))
      return
    }

    const targetX = elRect.left - navRect.left
    const targetWidth = elRect.width
    const targetHeight = elRect.height

    if (animate) {
      gsap.to(pill, {
        x: targetX,
        width: targetWidth,
        height: targetHeight,
        duration: animationTime / 1000,
        ease: 'elastic.out(1, 0.6)',
      })
    } else {
      gsap.set(pill, {
        x: targetX,
        width: targetWidth,
        height: targetHeight,
      })
    }
  }

  // Update pill position when activeIndex changes or fonts load
  useEffect(() => {
    // Immediate positioning
    updatePillPosition(activeIndex, true)

    // Fallback timer positioning
    const timer = setTimeout(() => {
      updatePillPosition(activeIndex, false)
    }, 100)

    return () => clearTimeout(timer)
  }, [activeIndex])

  // Recalculate position on window resize
  useEffect(() => {
    const handleResize = () => updatePillPosition(activeIndex, false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeIndex])

  const handleItemClick = (index, item, e) => {
    e.preventDefault()
    setActiveIndex(index)

    // Particle burst effect
    const activeEl = itemRefs.current[index]
    const particlesContainer = particlesContainerRef.current
    if (activeEl && particlesContainer && navRef.current) {
      const elRect = activeEl.getBoundingClientRect()
      const navRect = navRef.current.getBoundingClientRect()
      const originX = elRect.left - navRect.left + elRect.width / 2
      const originY = elRect.top - navRect.top + elRect.height / 2

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span')
        const size = 8 + Math.random() * 14

        particle.className = 'absolute rounded-full bg-white pointer-events-none'
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${originX - size / 2}px`
        particle.style.top = `${originY - size / 2}px`

        particlesContainer.appendChild(particle)

        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4
        const distance =
          particleDistances[0] + Math.random() * (particleDistances[1] - particleDistances[0])
        const targetX = Math.cos(angle) * distance * (particleR / 100)
        const targetY = Math.sin(angle) * distance * (particleR / 100)
        const duration = (animationTime + (Math.random() - 0.5) * timeVariance) / 1000

        gsap.to(particle, {
          x: targetX,
          y: targetY,
          scale: 0,
          opacity: 0,
          duration: duration,
          ease: 'power2.out',
          onComplete: () => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle)
            }
          },
        })
      }
    }

    // Router navigation
    if (item.href) {
      navigate(item.href)
    }

    if (onItemClick) {
      onItemClick(index, item, e)
    }
  }

  return (
    <div ref={containerRef} className={`relative inline-flex items-center select-none ${className}`}>
      {/* SVG filter definition */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="gooey-nav-liquid-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Main nav wrapper */}
      <nav ref={navRef} className="relative flex items-center p-1 rounded-full overflow-visible">
        {/* Liquid background layer */}
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-visible"
          style={{ filter: 'url(#gooey-nav-liquid-filter)' }}
        >
          {/* Active liquid pill */}
          <div
            ref={pillRef}
            className="absolute top-1 rounded-full bg-white shadow-lg pointer-events-none"
          />

          {/* Particle container */}
          <div ref={particlesContainerRef} className="absolute inset-0 pointer-events-none overflow-visible" />
        </div>

        {/* Crisp text links layer */}
        <div className="relative z-10 flex items-center gap-1">
          {items.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <a
                key={item.label}
                ref={(el) => (itemRefs.current[index] = el)}
                href={item.href}
                onClick={(e) => handleItemClick(index, item, e)}
                className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 cursor-pointer ${isActive ? 'text-black font-bold' : 'text-neutral-300 hover:text-white'
                  }`}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
