import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Heart, Shield } from 'lucide-react';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

const icons = [Sparkles, Compass, Heart, Shield];

export default function TodayIsYours() {
  const reduced = useReducedMotion();
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef);

  return (
    <section className="today" id="today" aria-label="Your next chapter">
      <div className="today__inner">
        <div ref={headRef}>
          {headInView && (
            <>
              <motion.h2
                className="today__headline"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.8, ease: EASE_BEZIER }}
              >
                {siteConfig.todayIsYours.headline}
              </motion.h2>
              <motion.p
                className="today__intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15, ease: EASE_BEZIER }}
              >
                {siteConfig.todayIsYours.intro}
              </motion.p>
            </>
          )}
        </div>

        <div className="today__cards">
          {siteConfig.todayIsYours.cards.map((card, i) => (
            <WishCard key={card.id} card={card} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WishCard({
  card,
  index,
  reduced,
}: {
  card: (typeof siteConfig.todayIsYours.cards)[number];
  index: number;
  reduced: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const Icon = icons[index % icons.length];

  return (
    <div ref={ref}>
      {inView && (
        <motion.div
          className={`wish-card ${open ? 'wish-card--open' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : 0.1 * index,
            ease: EASE_BEZIER,
          }}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setOpen(!open);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-label={`${card.label}. ${open ? 'Click to close' : 'Click to reveal message'}`}
        >
          <div className="wish-card__icon">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <div className="wish-card__label">
            <span>{card.label}</span>
            <span className="wish-card__toggle" aria-hidden="true">+</span>
          </div>
          {!open && (
            <p className="wish-card__hint">Tap to reveal</p>
          )}
          <AnimatePresence>
            {open && (
              <motion.p
                className="wish-card__message"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE_BEZIER }}
              >
                {card.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
