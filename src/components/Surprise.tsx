import { useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Surprise() {
  const reduced = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 5 + Math.random() * 8,
        color: ['#D8A2A0', '#D6B88D', '#F5EEE4', '#e4bcba', '#e4cfac'][
          Math.floor(Math.random() * 5)
        ],
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
      })),
    []
  );

  const openSurprise = useCallback(() => {
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  const replay = useCallback(() => {
    setOpened(false);
  }, []);

  return (
    <section className="surprise-section" id="surprise" aria-label="Birthday surprise">
      <div className="surprise__inner" ref={ref}>
        {inView && (
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="sealed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE_BEZIER }}
              >
                <p className="surprise__teaser">{siteConfig.surprise.teaser}</p>

                {/* Envelope */}
                <div
                  className="surprise__envelope"
                  aria-hidden="true"
                >
                  <div className="surprise__envelope-body" />
                  <div className="surprise__envelope-flap" />
                  <span className="surprise__envelope-heart">
                    <Heart size={18} fill="currentColor" />
                  </span>
                </div>

                <button
                  className="surprise__btn"
                  onClick={openSurprise}
                  aria-label="Open your birthday surprise"
                >
                  {siteConfig.surprise.button}
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.8, ease: EASE_BEZIER }}
              >
                <motion.div
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2 }}
                >
                  <Heart
                    size={32}
                    fill="#D8A2A0"
                    color="#D8A2A0"
                    style={{ marginBottom: '2rem' }}
                  />
                </motion.div>

                <p className="surprise__message">{siteConfig.surprise.message}</p>

                <button className="surprise__replay" onClick={replay}>
                  ↻ Replay
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ── Confetti ─────────────────────────────────────── */}
      <AnimatePresence>
        {showConfetti && (
          <div className="confetti-container" aria-hidden="true">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: piece.left,
                  top: '-5%',
                  width: piece.size,
                  height: piece.shape === 'circle' ? piece.size : piece.size * 1.5,
                  borderRadius: piece.shape === 'circle' ? '50%' : '2px',
                  background: piece.color,
                }}
                initial={{ opacity: 0, y: -50, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: ['-5vh', '110vh'],
                  rotate: [0, piece.rotation + 360],
                  x: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  ease: 'easeIn',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
