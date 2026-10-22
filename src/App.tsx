import { useCallback } from 'react';
import Hero from './components/Hero';
import Scrapbook from './components/Scrapbook';
import Letter from './components/Letter';
import TodayIsYours from './components/TodayIsYours';
import Gallery from './components/Gallery';
import Adventure from './components/Adventure';
import Surprise from './components/Surprise';
import Closing from './components/Closing';
import ScrollProgress from './components/ScrollProgress';
import SideNav from './components/SideNav';

export default function App() {
  const handleEnter = useCallback(() => {
    const el = document.getElementById('our-story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <SideNav />

      <main>
        <Hero onEnter={handleEnter} />

        {/* Dark → Ivory transition */}
        <div className="section-transition section-transition--dark-to-light" aria-hidden="true" />

        <Scrapbook />

        {/* Ivory → Dark transition */}
        <div className="section-transition section-transition--light-to-dark" aria-hidden="true" />

        <Letter />

        {/* Dark → Ivory transition */}
        <div className="section-transition section-transition--dark-to-light" aria-hidden="true" />

        <TodayIsYours />

        {/* Ivory → Dark soft transition */}
        <div className="section-transition section-transition--light-to-dark" aria-hidden="true" style={{ background: `linear-gradient(180deg, #F5EEE4 0%, #161c29 100%)` }} />

        <Gallery />

        {/* Dark soft → Ivory transition */}
        <div className="section-transition section-transition--darksoft-to-light" aria-hidden="true" />

        <Adventure />

        {/* Ivory → Midnight transition */}
        <div className="section-transition section-transition--light-to-midnight" aria-hidden="true" />

        <Surprise />

        {/* Midnight → Closing */}
        <Closing />
      </main>
    </>
  );
}
