import { useEffect, useState, useCallback } from 'react';

const sections = [
  { id: 'hero', label: 'Opening' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'letter', label: 'Letter' },
  { id: 'today', label: 'Today' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'surprise', label: 'Surprise' },
  { id: 'closing', label: 'Closing' },
];

export default function SideNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className="side-nav" aria-label="Section navigation">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`side-nav__dot ${active === s.id ? 'side-nav__dot--active' : ''}`}
          onClick={() => scrollTo(s.id)}
          aria-label={`Navigate to ${s.label}`}
          aria-current={active === s.id ? 'true' : undefined}
        >
          <span className="side-nav__label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
