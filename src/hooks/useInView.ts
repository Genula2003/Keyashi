import { useEffect, useState } from 'react';

/**
 * Returns true once the element with the given ref is intersecting the viewport.
 * Once triggered it stays true (one-shot reveal).
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  options?: IntersectionObserverInit
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options]);

  return inView;
}

/**
 * Returns true if the user prefers reduced motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export const EASE_BEZIER: [number, number, number, number] = [0.16, 1, 0.3, 1];
