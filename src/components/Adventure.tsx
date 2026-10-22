import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Adventure() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<number | null>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef);

  const reset = () => setSelected(null);

  return (
    <section className="adventure" id="adventure" aria-label="Adventure question">
      <div className="adventure__inner">
        <div ref={headRef}>
          {headInView && (
            <>
              <motion.h2
                className="adventure__headline"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.8, ease: EASE_BEZIER }}
              >
                {siteConfig.adventure.headline}
              </motion.h2>
              <motion.p
                className="adventure__question"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15 }}
              >
                {siteConfig.adventure.question}
              </motion.p>
            </>
          )}
        </div>

        <div className="adventure__options" role="radiogroup" aria-label="Adventure choices">
          {siteConfig.adventure.options.map((opt, i) => (
            <motion.button
              key={i}
              className={`adventure__option ${selected === i ? 'adventure__option--selected' : ''}`}
              onClick={() => setSelected(i)}
              role="radio"
              aria-checked={selected === i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 0.05 * i,
                ease: EASE_BEZIER,
              }}
            >
              <span className="adventure__option-dot" aria-hidden="true" />
              {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE_BEZIER }}
            >
              <p className="adventure__response">
                {siteConfig.adventure.options[selected].response}
              </p>
              <button className="adventure__again" onClick={reset}>
                Choose again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
