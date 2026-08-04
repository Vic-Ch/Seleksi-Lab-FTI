export default function FormField({
  label,
  id,
  type = 'text',
  placeholder = '',
  isTextarea = false,
  rows = 4,
  required = false,
  className = '',
  ...props
}) {
  const commonClasses =
    'w-full px-4 py-3 rounded-xl border border-neutral-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-white placeholder:text-neutral-500 bg-neutral-900/80'

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-neutral-300 mb-1.5">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={`${commonClasses} resize-none`}
          {...props}
        />
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={commonClasses}
          {...props}
        />
      )}
    </div>
  )
}
