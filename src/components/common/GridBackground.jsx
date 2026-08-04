export default function GridBackground({
  gridOpacity = 0.07,
  gridSize = '60px',
  glowOrbs = true,
  className = '',
}) {
  return (
    <>
      {/* Animated grid overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${gridSize} ${gridSize}`,
        }}
      />

      {/* Glow orbs */}
      {glowOrbs && (
        <>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/20 rounded-full blur-[128px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[200px] pointer-events-none" />
        </>
      )}
    </>
  )
}
