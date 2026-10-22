import { useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Closing() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const stars = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 50}%`,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 5,
    }));
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 1,
        delay: reduced ? 0 : delay,
        ease: EASE_BEZIER,
      },
    },
  });

  return (
    <section className="closing-section" id="closing" aria-label="Closing message">
      {/* ── Darker ocean scene ────────────────────────────── */}
      <div className="closing__scene" aria-hidden="true">
        <div className="closing__sky" />
        <motion.div
          className="closing__glow"
          animate={reduced ? {} : { scale: [1, 1.06, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="closing__horizon" />
      </div>

      {/* ── Stars ─────────────────────────────────────────── */}
      {!reduced && (
        <div className="closing__stars" aria-hidden="true">
          {stars.map((s) => (
            <span
              key={s.id}
              className="star"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="closing__content" ref={ref}>
        {inView && (
          <>
            <motion.p className="closing__line1" {...fadeUp(0)}>
              {siteConfig.closing.line1}
            </motion.p>
            <motion.p className="closing__line2" {...fadeUp(0.4)}>
              {siteConfig.closing.line2}
            </motion.p>
            <motion.h2 className="closing__line3" {...fadeUp(0.8)}>
              {siteConfig.closing.line3}
            </motion.h2>
            <motion.p className="closing__signature" {...fadeUp(1.2)}>
              {siteConfig.closing.signature}
            </motion.p>
            <motion.p className="closing__footer" {...fadeUp(1.6)}>
              {siteConfig.closing.footer}
            </motion.p>
            <motion.button
              className="closing__again"
              onClick={scrollToTop}
              aria-label="Begin again from the top"
              {...fadeUp(1.8)}
            >
              Begin again ↑
            </motion.button>
          </>
        )}
      </div>
    </section>
  );
}
