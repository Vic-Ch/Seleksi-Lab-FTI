export default function Badge({ icon: Icon, children, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-primary-200 ${className}`}>
      {Icon && <Icon size={14} className="text-secondary-400" />}
      <span>{children}</span>
    </div>
  )
}
