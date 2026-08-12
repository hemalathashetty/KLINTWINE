import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Header from './components/Header';
import WineDropdown from './components/WineDropdown';
import CheckoutModal from './components/CheckoutModal';
import Hero from './sections/Hero';
import Showcase from './sections/Showcase';
import Culture from './sections/Culture';
import Heritage from './sections/Heritage';
import Region from './sections/Region';
import Buy from './sections/Buy';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [headerThemeDark, setHeaderThemeDark] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (loading) return;

    // 1. Intersection Observer for dynamic header theme changes
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -90% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          if (id === 'hero' || id === 'culture-section' || id === 'heritage' || id === 'buy') {
            setHeaderThemeDark(true);
          } else {
            setHeaderThemeDark(false);
          }

          if (id === 'hero' || id === 'showcase') {
            setShowDropdown(true);
          } else {
            setShowDropdown(false);
          }
        }
      });
    }, observerOptions);

    const sectionIds = ['hero', 'showcase', 'culture-section', 'heritage', 'region', 'buy', 'contacts'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // 2. Global background-color transition ScrollTriggers
    const targets = [
      { id: '#showcase', bg: '#ECE9E5', text: '#191714' },
      { id: '#culture-section', bg: '#191714', text: '#CFC6BD' },
      { id: '#region', bg: '#ECE9E5', text: '#191714' },
      { id: '#buy', bg: '#191714', text: '#CFC6BD' },
      { id: '#contacts', bg: '#ECE9E5', text: '#191714' }
    ];

    const ctx = gsap.context(() => {
      targets.forEach((target) => {
        ScrollTrigger.create({
          trigger: target.id,
          start: 'top 65%',
          end: 'top 25%',
          scrub: true,
          onEnter: () => {
            gsap.to('main', { backgroundColor: target.bg, color: target.text, duration: 0.75 });
          },
          onLeaveBack: () => {
            const idx = targets.findIndex((t) => t.id === target.id);
            const prev = targets[idx - 1] || { bg: '#191714', text: '#CFC6BD' };
            gsap.to('main', { backgroundColor: prev.bg, color: prev.text, duration: 0.75 });
          }
        });
      });
    });

    return () => {
      ctx.revert();
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.unobserve(el);
      });
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <div style={{ position: 'relative', width: '100%' }}>
          <Header
            lang={lang}
            setLang={setLang}
            onNavigate={handleNavigate}
            isDarkTheme={headerThemeDark}
            onBuyClick={() => setIsCheckoutOpen(true)}
          />
          
          <main
            style={{
              backgroundColor: '#191714',
              color: '#CFC6BD',
              transition: 'background-color 0.8s ease, color 0.8s ease',
              width: '100%',
              minHeight: '100vh'
            }}
          >
            <Hero lang={lang} />
            <Showcase lang={lang} />
            <Culture lang={lang} />
            <Heritage lang={lang} />
            <Region lang={lang} />
            <Buy lang={lang} onBuyClick={() => setIsCheckoutOpen(true)} />
            <Contact lang={lang} onNavigate={handleNavigate} />
          </main>

          <WineDropdown lang={lang} visible={showDropdown} />
          
          <CheckoutModal
            lang={lang}
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </div>
      )}
    </>
  );
}
