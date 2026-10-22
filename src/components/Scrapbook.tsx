import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Scrapbook() {
  const reduced = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef);
  const photoInView = useInView(photoRef);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE_BEZIER },
    },
  });

  return (
    <section className="scrapbook" id="our-story" aria-label="Our story">
      <div className="scrapbook__inner">
        {/* ── Header ─────────────────────────────────────── */}
        <div ref={headerRef}>
          {headerInView && (
            <>
              <motion.h2 className="scrapbook__headline" {...fadeUp(0)}>
                {siteConfig.timeline.headline}
              </motion.h2>
              <motion.p className="scrapbook__caption" {...fadeUp(0.15)}>
                {siteConfig.timeline.caption}
              </motion.p>
            </>
          )}
        </div>

        {/* ── Childhood photo frame ──────────────────────── */}
        <div ref={photoRef}>
          {photoInView && (
            <motion.div
              className="scrapbook__photo-frame"
              initial={{ opacity: 0, y: 25, rotate: -3 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: -1.5,
                transition: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.2, ease: EASE_BEZIER },
              }}
            >
              <div className="scrapbook__tape scrapbook__tape--top" aria-hidden="true" />
              <div className="scrapbook__photo-border">
                <PhotoOrPlaceholder
                  src="/images/childhood.jpg"
                  alt="Childhood photo of Genula and Keyashi"
                />
              </div>
              <p className="scrapbook__photo-caption">
                {siteConfig.timeline.photoCaption}
              </p>
              <span
                className="scrapbook__annotation"
                style={{ top: '-1.2rem', right: '-1rem', transform: 'rotate(4deg)' }}
                aria-hidden="true"
              >
                ↑ us ♡
              </span>
            </motion.div>
          )}
        </div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="timeline" role="list" aria-label="Timeline of our story">
          {siteConfig.timeline.chapters.map((chapter, i) => (
            <TimelineChapter key={chapter.number} chapter={chapter} index={i} reduced={reduced} />
          ))}
        </div>

        {/* ── Closing line ───────────────────────────────── */}
        <ClosingLine text={siteConfig.timeline.closing} reduced={reduced} />
      </div>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────────── */

function PhotoOrPlaceholder({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="scrapbook__photo" style={{ position: 'relative' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          const placeholder = target.nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = 'flex';
        }}
      />
      <div className="scrapbook__photo-placeholder" style={{ display: 'none', position: 'absolute', inset: 0 }}>
        <ImageIcon size={32} />
        <span>Add your childhood photo</span>
        <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>/public/images/childhood.jpg</span>
      </div>
    </div>
  );
}

function TimelineChapter({
  chapter,
  index,
  reduced,
}: {
  chapter: (typeof siteConfig.timeline.chapters)[number];
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} className="timeline__chapter" role="listitem">
      {inView && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.05 * index,
              ease: EASE_BEZIER,
            },
          }}
        >
          <span className="timeline__dot" aria-hidden="true" />
          <p className="timeline__number">{chapter.number}</p>
          <h3 className="timeline__title">{chapter.title}</h3>
          <p className="timeline__text">{chapter.text}</p>
        </motion.div>
      )}
    </div>
  );
}

function ClosingLine({ text, reduced }: { text: string; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref}>
      {inView && (
        <motion.p
          className="timeline__closing"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.3, ease: 'easeOut' },
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
