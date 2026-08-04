import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';


export default function FadeContent({
  children,
  className = '',
  direction = 'up',
  distance = 40,
  duration = 0.7,
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  blur = false,
  initialOpacity = 0,
  easing = [0.25, 0.1, 0.25, 1],
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const dirMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  const initial = {
    opacity: initialOpacity,
    ...dirMap[direction],
    ...(blur ? { filter: 'blur(10px)' } : {}),
  };

  const animate = inView
    ? {
      opacity: 1,
      x: 0,
      y: 0,
      ...(blur ? { filter: 'blur(0px)' } : {}),
    }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration, delay, ease: easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
