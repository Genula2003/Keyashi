import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Letter() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToTop = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section ref={sectionRef} className="letter-section" id="letter" aria-label="A letter for you">
      <div className="letter-section__glow" aria-hidden="true" />

      <div className="letter__inner">
        <span className="letter__side-note" aria-hidden="true">for her eyes only</span>

        <LetterHeading reduced={reduced} />

        <div className="letter__body">
          {siteConfig.letter.paragraphs.map((para, i) => (
            <LetterParagraph key={i} text={para} index={i} reduced={reduced} />
          ))}
        </div>

        <div className="letter__ornament" aria-hidden="true">
          <span style={{ color: 'var(--champagne-light)', fontSize: '0.8rem' }}>♡</span>
        </div>

        <LetterSignature reduced={reduced} />

        <button
          className="letter__again-btn"
          onClick={scrollToTop}
          aria-label="Read this letter again"
        >
          Read this letter again
        </button>
      </div>
    </section>
  );
}

function LetterHeading({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref}>
      {inView && (
        <>
          <motion.h2
            className="letter__heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.8, ease: EASE_BEZIER }}
          >
            A letter I want you to keep.
          </motion.h2>
          <motion.p
            className="letter__subheading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2 }}
          >
            Take your time with this one.
          </motion.p>
        </>
      )}
    </div>
  );
}

function LetterParagraph({
  text,
  index,
  reduced,
}: {
  text: string;
  index: number;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.3 });

  const isSalutation = index === 0;
  const isEmphasis = index === 9; // "But today isn't about the past..."

  let className = 'letter__paragraph';
  if (isSalutation) className += ' letter__paragraph--salutation';
  if (isEmphasis) className += ' letter__paragraph--emphasis';

  return (
    <div ref={ref}>
      {inView && (
        <motion.p
          className={className}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: isSalutation || isEmphasis ? 1 : 0.85,
            y: 0,
          }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.05,
            ease: EASE_BEZIER,
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

function LetterSignature({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref}>
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : 0.2 }}
        >
          <p className="letter__closing">{siteConfig.letter.closing}</p>
          <motion.p
            className="letter__signature"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduced ? 0 : 0.8,
              delay: reduced ? 0 : 0.5,
              ease: EASE_BEZIER,
            }}
          >
            {siteConfig.letter.signature}
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}
