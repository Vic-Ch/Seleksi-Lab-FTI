import { Link } from 'react-router'

export default function Logo({ variant = 'dark', className = '' }) {
  const isLight = variant === 'light' // for dark backgrounds (like footer)

  return (
    <Link to="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center shadow-sm group-hover:bg-primary-500 transition-colors">
        <span className="text-white font-bold text-sm">V</span>
      </div>
      <span className={`text-xl font-bold tracking-tight ${isLight ? 'text-white' : 'text-neutral-900'}`}>
        VTech
      </span>
    </Link>
  )
}
