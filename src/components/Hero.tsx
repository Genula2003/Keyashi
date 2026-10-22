import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../config';
import { useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

interface HeroProps {
  onEnter: () => void;
}

export default function Hero({ onEnter }: HeroProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 45}%`,
      size: 1 + Math.random() * 1.5,
      delay: Math.random() * 4,
    }));
  }, []);


  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${60 + Math.random() * 40}%`,
      size: 1.5 + Math.random() * 1.5,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 15,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.9,
        delay: reduced ? 0 : 0.3 + i * 0.15,
        ease: EASE_BEZIER,
      },
    }),
  };

  return (
    <section ref={sectionRef} className="hero" id="hero" aria-label="Birthday greeting">
      {/* ── Cinematic ocean scene ──────────────────────────── */}
      <div className="hero__scene" aria-hidden="true">
        <div className="hero__sky" />
        <motion.div
          className="hero__sun-glow"
          animate={reduced ? {} : { scale: [1, 1.08, 1], opacity: [0.75, 0.95, 0.75] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="hero__horizon" />
        <div className="hero__water">
          <motion.div
            className="hero__reflection"
            animate={reduced ? {} : { opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* ── Stars ─────────────────────────────────────────── */}
      {!reduced && (
        <div className="hero__stars" aria-hidden="true">
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

      {/* ── Particles ─────────────────────────────────────── */}
      {!reduced && (
        <div className="hero__particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Content ───────────────────────────────────────── */}
      <motion.div
        className="hero__content"
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__eyebrow" variants={fadeUp} custom={0}>
          {siteConfig.opening.eyebrow}
        </motion.p>

        <motion.h1 className="hero__headline" variants={fadeUp} custom={1}>
          {siteConfig.opening.headline}
          <motion.span className="hero__name" variants={fadeUp} custom={2}>
            {siteConfig.opening.name}
            <span className="hero__heart" aria-hidden="true">♡</span>
          </motion.span>
        </motion.h1>

        <motion.p className="hero__subtitle" variants={fadeUp} custom={3}>
          {siteConfig.opening.subtitle}
        </motion.p>

        <motion.p className="hero__signed" variants={fadeUp} custom={4}>
          {siteConfig.opening.signed}
        </motion.p>

        <motion.button
          className="hero__cta"
          variants={fadeUp}
          custom={5}
          onClick={onEnter}
          aria-label="Enter the birthday experience"
        >
          {siteConfig.opening.cta}
          <ChevronDown size={14} />
        </motion.button>
      </motion.div>
    </section>
  );
}
