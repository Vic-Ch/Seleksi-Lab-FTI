import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const BlurText = ({
  text = '',
  delay = 75,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const completedCount = useRef(0);

  const defaultFrom = direction === 'top'
    ? { filter: 'blur(10px)', opacity: 0, y: -30 }
    : { filter: 'blur(10px)', opacity: 0, y: 30 };

  const defaultTo = [
    { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? -5 : 5 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];

  const from = animationFrom || defaultFrom;
  const to = animationTo || defaultTo;

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

  // Build keyframes for motion
  const buildKeyframes = (fromObj, steps) => {
    const keys = new Set([...Object.keys(fromObj), ...steps.flatMap((s) => Object.keys(s))]);
    const keyframes = {};
    keys.forEach((k) => {
      keyframes[k] = [fromObj[k], ...steps.map((s) => s[k])];
    });
    return keyframes;
  };

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          initial={from}
          animate={inView ? buildKeyframes(from, to) : from}
          transition={{
            delay: (i * delay) / 1000,
            duration: stepDuration * to.length,
          }}
          onAnimationComplete={() => {
            completedCount.current += 1;
            if (completedCount.current === elements.length && onAnimationComplete) {
              onAnimationComplete();
            }
          }}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {el === ' ' ? '\u00A0' : el}
          {animateBy === 'words' && i < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
