import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const variantStyles = {
  primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-sm hover:shadow-md',
  white: 'bg-white text-primary-900 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5',
  outline: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 backdrop-blur-sm',
  secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm font-medium rounded-lg',
  md: 'px-5 py-2.5 text-sm font-semibold rounded-xl',
  lg: 'px-8 py-4 text-base font-semibold rounded-xl',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  showArrow = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses = `group inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`

  const content = (
    <>
      {children}
      {showArrow && (
        <ArrowRight size={size === 'lg' ? 18 : 16} className="group-hover:translate-x-1 transition-transform" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick} {...props}>
      {content}
    </button>
  )
}
