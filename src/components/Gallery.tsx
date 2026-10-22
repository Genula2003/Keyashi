import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { siteConfig } from '../config';
import { useInView, useReducedMotion, EASE_BEZIER } from '../hooks/useInView';

export default function Gallery() {
  const reduced = useReducedMotion();
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + siteConfig.gallery.photos.length) % siteConfig.gallery.photos.length : null
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % siteConfig.gallery.photos.length : null
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section className="gallery-section" id="gallery" aria-label="Photo gallery">
      <div className="gallery__inner">
        <div ref={headRef}>
          {headInView && (
            <>
              <motion.h2
                className="gallery__headline"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.8, ease: EASE_BEZIER }}
              >
                {siteConfig.gallery.headline}
              </motion.h2>
              <motion.p
                className="gallery__subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15 }}
              >
                {siteConfig.gallery.subtitle}
              </motion.p>
            </>
          )}
        </div>

        <div className="gallery__grid">
          {siteConfig.gallery.photos.map((photo, i) => (
            <GalleryItem
              key={i}
              photo={photo}
              index={i}
              reduced={reduced}
              onOpen={() => openLightbox(i)}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            onClick={closeLightbox}
            role="dialog"
            aria-label="Photo lightbox"
            aria-modal="true"
          >
            <motion.div
              className="lightbox__content"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: EASE_BEZIER }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox__close" onClick={closeLightbox} aria-label="Close lightbox">
                <X size={24} />
              </button>

              <LightboxImage photo={siteConfig.gallery.photos[lightboxIndex]} />

              <p className="lightbox__caption">
                {siteConfig.gallery.photos[lightboxIndex].caption}
              </p>

              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={goPrev}
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={goNext}
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryItem({
  photo,
  index,
  reduced,
  onOpen,
}: {
  photo: (typeof siteConfig.gallery.photos)[number];
  index: number;
  reduced: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [imgError, setImgError] = useState(false);

  return (
    <div ref={ref}>
      {inView && (
        <motion.div
          className="gallery__item"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : 0.1 * index,
            ease: EASE_BEZIER,
          }}
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`View photo: ${photo.caption}`}
        >
          <div className="gallery__photo-wrap">
            {!imgError ? (
              <img
                className="gallery__photo"
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                style={'position' in photo && photo.position ? { objectPosition: photo.position } : undefined}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="gallery__placeholder">
                <ImageIcon size={28} />
                <span>Add your photo</span>
                <span style={{ fontSize: '0.6rem', opacity: 0.4 }}>{photo.src}</span>
              </div>
            )}
            <p className="gallery__photo-caption">{photo.caption}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function LightboxImage({ photo }: { photo: (typeof siteConfig.gallery.photos)[number] }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="lightbox__placeholder">
        <span>Photo not yet added — {photo.src}</span>
      </div>
    );
  }

  return (
    <img
      className="lightbox__img"
      src={photo.src}
      alt={photo.alt}
      onError={() => setError(true)}
    />
  );
}
