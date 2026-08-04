import { useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

export default function GradientText({
  children,
  className = '',
  colors = ['#2563EB', '#06B6D4', '#6366F1', '#3B82F6', '#2563EB'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(((fullCycle - cycleTime) / animationDuration) * 100);
      }
    } else {
      progress.set((elapsedRef.current % animationDuration) / animationDuration * 100);
    }
  });

  const dirAngle = direction === 'vertical' ? '180deg' : direction === 'diagonal' ? '135deg' : '90deg';

  const gradientStyle = useTransform(progress, (p) => {
    const colorStops = colors.map((c, i) => {
      const pos = (i / (colors.length - 1)) * 100;
      const offset = p;
      return `${c} ${pos + offset}%`;
    }).join(', ');
    return `linear-gradient(${dirAngle}, ${colorStops})`;
  });

  const handlers = pauseOnHover
    ? { onMouseEnter: () => setIsPaused(true), onMouseLeave: () => setIsPaused(false) }
    : {};

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      {...handlers}
    >
      {showBorder && (
        <motion.span
          className="absolute inset-0 rounded-[inherit] z-0 pointer-events-none"
          style={{
            background: gradientStyle,
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}
      <motion.span
        className="relative z-10 bg-clip-text text-transparent"
        style={{ backgroundImage: gradientStyle }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
