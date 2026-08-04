import { Cloud, Shield, BrainCircuit, Zap, Globe } from 'lucide-react'
import {
  SiGoogle,
  SiApple,
  SiIntel,
  SiNvidia,
  SiMeta,
  SiVercel,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiCloudflare,
  SiGithub,
  SiStripe,
} from 'react-icons/si'
import GradientText from '../components/reactbits/GradientText'
import FadeContent from '../components/reactbits/FadeContent'
import LogoLoop from '../components/reactbits/LogoLoop'
import AuroraBackground from '../components/reactbits/AuroraBackground'
import InteractiveHero from '../components/reactbits/InteractiveHero'
import ParallaxSection from '../components/reactbits/ParallaxSection'
import GridBackground from '../components/common/GridBackground'
import Button from '../components/ui/Button'
import FeatureCard from '../components/cards/FeatureCard'
import WhereToFindUs from '../components/WhereToFindUs'

// Authentic enterprise technology partner companies
const REAL_COMPANY_LOGOS = [
  { node: <SiGoogle className="text-[#4285F4]" />, title: 'Google', href: 'https://google.com' },
  { node: <SiApple className="text-white" />, title: 'Apple', href: 'https://apple.com' },
  { node: <SiIntel className="text-[#0068B5]" />, title: 'Intel', href: 'https://intel.com' },
  { node: <SiNvidia className="text-[#76B900]" />, title: 'NVIDIA', href: 'https://nvidia.com' },
  { node: <SiMeta className="text-[#0467DF]" />, title: 'Meta', href: 'https://meta.com' },
  { node: <SiCloudflare className="text-[#F38020]" />, title: 'Cloudflare', href: 'https://cloudflare.com' },
  { node: <SiStripe className="text-[#635BFF]" />, title: 'Stripe', href: 'https://stripe.com' },
  { node: <SiVercel className="text-white" />, title: 'Vercel', href: 'https://vercel.com' },
  { node: <SiGithub className="text-white" />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiReact className="text-[#61DAFB]" />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs className="text-white" />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript className="text-[#3178C6]" />, title: 'TypeScript', href: 'https://typescriptlang.org' },
  { node: <SiTailwindcss className="text-[#06B6D4]" />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiDocker className="text-[#2496ED]" />, title: 'Docker', href: 'https://docker.com' },
  { node: <SiPostgresql className="text-[#4169E1]" />, title: 'PostgreSQL', href: 'https://postgresql.org' },
]

const FEATURES = [
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure that grows with your business. From migration to optimization, we handle it all.',
    color: 'primary',
  },
  {
    icon: BrainCircuit,
    title: 'AI & Analytics',
    description: 'Transform raw data into actionable insights with our cutting-edge artificial intelligence and analytics platform.',
    color: 'secondary',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Enterprise-grade security solutions that protect your digital assets and ensure compliance across all touchpoints.',
    color: 'accent',
  },
]

const STATS = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '24/7', label: 'Support Available' },
]

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0B0F19]">
      {/* Hero section */}
      <InteractiveHero stats={STATS} />

      {/* Logo loop section */}
      <section className="bg-[#0B0F19] border-y border-neutral-800/80 py-10 relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-400">
            Trusted Industry & Technology Partners
          </p>
        </div>
        <LogoLoop
          logos={REAL_COMPANY_LOGOS}
          speed={35}
          direction="left"
          gap={32}
          scaleOnHover
          fadeOut
        />
      </section>

      {/* About section */}
      <section id="about" className="relative py-32 px-6 bg-[#0B0F19] text-white border-b border-neutral-800/80 z-10 overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text column */}
            <ParallaxSection offset={80} direction="up">
              <FadeContent direction="left" distance={40} blur>
                <div>
                  <span className="inline-block text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">About Us</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Building the{' '}
                    <GradientText
                      colors={['#2563EB', '#06B6D4', '#6366F1']}
                      animationSpeed={5}
                      className="text-4xl md:text-5xl font-bold"
                    >
                      Future
                    </GradientText>{' '}
                    of Enterprise Tech
                  </h2>
                  <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                    VTech is a forward-thinking technology company dedicated to delivering innovative solutions 
                    for modern enterprises. With a team of passionate engineers and designers, we build products 
                    that make a difference.
                  </p>
                  <p className="text-neutral-400 leading-relaxed">
                    Founded with the vision to bridge the gap between complex technology and business success, 
                    we've been helping organizations transform their operations through cutting-edge digital solutions.
                  </p>
                </div>
              </FadeContent>
            </ParallaxSection>

            {/* 3D visual card */}
            <ParallaxSection offset={90} direction="tilt">
              <FadeContent direction="right" distance={40} delay={0.2} blur>
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-[#111827]/90 border border-neutral-800 p-8 relative overflow-hidden shadow-2xl group">
                    <GridBackground gridOpacity={0.12} gridSize="40px" glowOrbs={false} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 via-secondary-500/15 to-transparent pointer-events-none" />
                    
                    {/* Floating 3D elements */}
                    <div className="relative h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-2xl bg-primary-600 shadow-2xl shadow-primary-600/50 flex items-center justify-center animate-[float_6s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-500">
                        <Zap size={48} className="text-white" />
                      </div>
                      <div className="absolute top-8 right-8 w-16 h-16 rounded-xl bg-secondary-500 shadow-xl shadow-secondary-500/40 flex items-center justify-center animate-[float_4s_ease-in-out_infinite_1s] group-hover:translate-x-2 transition-transform duration-500">
                        <Globe size={28} className="text-white" />
                      </div>
                      <div className="absolute bottom-8 left-8 w-20 h-20 rounded-xl bg-accent-500 shadow-xl shadow-accent-500/40 flex items-center justify-center animate-[float_5s_ease-in-out_infinite_0.5s] group-hover:-translate-x-2 transition-transform duration-500">
                        <Shield size={32} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeContent>
            </ParallaxSection>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="relative py-32 px-6 bg-[#0B0F19] text-white z-10 overflow-hidden border-b border-neutral-800/80">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <FadeContent direction="up" distance={30} blur>
            <div className="text-center mb-20">
              <span className="inline-block text-sm font-semibold text-primary-400 uppercase tracking-widest mb-3">Our Services</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Comprehensive Technology Solutions
              </h2>
              <p className="text-lg text-neutral-300 max-w-xl mx-auto">
                End-to-end solutions designed to accelerate your digital transformation journey.
              </p>
            </div>
          </FadeContent>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {FEATURES.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                color={feature.color}
                delay={i * 0.15}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Where to find us section */}
      <WhereToFindUs />

      {/* CTA banner section */}
      <AuroraBackground className="py-32 px-6 border-b border-neutral-800/80" opacity={0.45}>
        <FadeContent direction="up" distance={30}>
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your{' '}
              <GradientText
                colors={['#60A5FA', '#06B6D4', '#818CF8', '#60A5FA']}
                animationSpeed={6}
                className="text-4xl md:text-6xl font-bold"
              >
                Business?
              </GradientText>
            </h2>
            <p className="text-lg md:text-xl text-neutral-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's build something extraordinary together. Get in touch with our team of technology experts today.
            </p>
            <Button to="/contact" variant="primary" size="lg" showArrow className="shadow-2xl shadow-primary-600/50">
              Contact Us
            </Button>
          </div>
        </FadeContent>
      </AuroraBackground>
    </div>
  )
}
