import { ArrowRight } from 'lucide-react'
import FadeContent from '../reactbits/FadeContent'
import BorderGlow from '../reactbits/BorderGlow'

const COLOR_THEMES = {
  primary: {
    glowColor: '217 91 60', // Tech blue color
    colors: ['#2563EB', '#60A5FA', '#3B82F6'],
    hoverBg: '#1A243B', // Lighter background on hover
    iconBg: 'bg-primary-500/15 text-primary-400 border border-primary-500/30 group-hover:bg-primary-600 group-hover:text-white',
    badgeText: 'text-primary-400',
  },
  secondary: {
    glowColor: '187 95 50', // Cyan color
    colors: ['#06B6D4', '#22D3EE', '#0891B2'],
    hoverBg: '#132635', // Lighter background on hover
    iconBg: 'bg-secondary-500/15 text-secondary-400 border border-secondary-500/30 group-hover:bg-secondary-500 group-hover:text-white',
    badgeText: 'text-secondary-400',
  },
  accent: {
    glowColor: '239 84 65', // Indigo color
    colors: ['#6366F1', '#818CF8', '#4F46E5'],
    hoverBg: '#1E203D', // Lighter background on hover
    iconBg: 'bg-accent-500/15 text-accent-400 border border-accent-500/30 group-hover:bg-accent-600 group-hover:text-white',
    badgeText: 'text-accent-400',
  },
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  color = 'primary',
  delay = 0,
}) {
  const theme = COLOR_THEMES[color] || COLOR_THEMES.primary

  return (
    <FadeContent direction="up" distance={40} delay={delay} blur>
      <BorderGlow
        glowColor={theme.glowColor}
        colors={theme.colors}
        backgroundColor="#111827"
        hoverBackgroundColor={theme.hoverBg}
        borderRadius={24}
        glowRadius={50}
        glowIntensity={1.2}
        coneSpread={30}
        className="h-full group"
      >
        <div className="p-8 h-full flex flex-col justify-between select-none">
          <div>
            <div className={`w-14 h-14 rounded-xl ${theme.iconBg} flex items-center justify-center mb-6 transition-all duration-300 shadow-inner`}>
              {Icon && <Icon size={26} />}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">{title}</h3>
            <p className="text-neutral-300 leading-relaxed mb-6 text-sm md:text-base">{description}</p>
          </div>
          <div className="cursor-pointer pt-4 border-t border-neutral-800/80 flex items-center justify-between">
            <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${theme.badgeText} group-hover:gap-2.5 transition-all`}>
              Learn more <ArrowRight size={15} />
            </span>
          </div>
        </div>
      </BorderGlow>
    </FadeContent>
  )
}
