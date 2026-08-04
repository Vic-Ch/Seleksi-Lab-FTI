import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LogoLoop({
  logos = [],
  speed = 30,
  direction = 'left',
  gap = 48,
  scaleOnHover = true,
  pauseOnHover = true,
  fadeOut = true,
  ariaLabel = 'Technology partners',
  className = '',
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || logos.length === 0) return;

    const width = track.scrollWidth / 2;
    const dirMult = direction === 'left' ? -1 : 1;

    gsap.set(track, { x: 0 });

    const duration = width / speed;

    const tween = gsap.to(track, {
      x: dirMult * width,
      duration: duration,
      ease: 'none',
      repeat: -1,
    });

    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, [logos, speed, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.pause();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && tweenRef.current) {
      tweenRef.current.play();
    }
  };

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      ref={containerRef}
      aria-label={ariaLabel}
      className={`relative overflow-hidden w-full py-4 select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />
        </>
      )}

      <div
        ref={trackRef}
        className="flex items-center w-max"
        style={{ gap: `${gap}px` }}
      >
        {duplicatedLogos.map((item, idx) => (
          <a
            key={idx}
            href={item.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm text-neutral-300 hover:text-white hover:bg-white/10 hover:border-primary-500/50 transition-all duration-300 ${scaleOnHover ? 'hover:scale-105' : ''
              }`}
          >
            {item.node && <span className="text-2xl text-primary-400">{item.node}</span>}
            {item.src && <img src={item.src} alt={item.alt || ''} className="h-7 w-auto object-contain" />}
            {item.title && <span className="text-sm font-semibold tracking-wide">{item.title}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}
