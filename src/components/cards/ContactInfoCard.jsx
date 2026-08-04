import FadeContent from '../reactbits/FadeContent'

const COLOR_CLASSES = {
  primary: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
  secondary: 'bg-secondary-500/10 text-secondary-400 border border-secondary-500/20',
  accent: 'bg-accent-500/10 text-accent-400 border border-accent-500/20',
}

export default function ContactInfoCard({ icon: Icon, label, value, color = 'primary', delay = 0 }) {
  const colorClass = COLOR_CLASSES[color] || COLOR_CLASSES.primary

  return (
    <FadeContent direction="right" distance={40} delay={delay} blur>
      <div className="group flex items-start gap-4 p-5 rounded-xl bg-neutral-950/80 border border-neutral-800 shadow-lg hover:border-neutral-700 hover:-translate-y-0.5 transition-all duration-300">
        <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center shrink-0`}>
          {Icon && <Icon size={22} />}
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-400 mb-0.5">{label}</p>
          <p className="text-white font-semibold">{value}</p>
        </div>
      </div>
    </FadeContent>
  )
}
