import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
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
import BottleCanvas from './components/BottleCanvasLoader';
import type { BottleCanvasHandle } from './components/BottleCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [headerThemeDark, setHeaderThemeDark] = useState(true);
  const [showDropdown, setShowDropdown] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const bottleRef = useRef<BottleCanvasHandle>(null);
  const [bottleReady, setBottleReady] = useState(false);

  // Smooth Kinetic Inertial Scrolling via Lenis
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [loading]);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBottleReady = () => {
    setBottleReady(true);
  };

  // Intersection Observer for header theme and bottom selector dropdown visibility
  useEffect(() => {
    if (loading) return;

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

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.unobserve(el);
      });
    };
  }, [loading]);

  // Global background color ScrollTriggers
  useEffect(() => {
    if (loading) return;

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

    return () => ctx.revert();
  }, [loading]);

  // Global Bottle ScrollTrigger animations (Bypasses React renders for 60fps performance)
  useEffect(() => {
    if (!bottleReady || !bottleRef.current || !bottleRef.current.group) return;

    const group = bottleRef.current.group;

    // Initial 3D bottle entrance animation when loading completes
    if (!loading) {
      gsap.fromTo(
        group.scale,
        { x: 0.65, y: 0.65, z: 0.65 },
        { x: 1.22, y: 1.22, z: 1.22, duration: 1.6, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        group.position,
        { x: 0, y: -0.5, z: -2.5 },
        { x: 0, y: -0.1, z: 0, duration: 1.6, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(
        group.rotation,
        { y: -0.4, z: 0.1 },
        { y: 0, z: 0, duration: 1.6, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.set(group.position, { x: 0, y: -0.1, z: 0 });
      gsap.set(group.rotation, { x: 0, y: 0, z: 0 });
      gsap.set(group.scale, { x: 1.22, y: 1.22, z: 1.22 });
    }
    bottleRef.current.setVariant('veltliner', 0);
    bottleRef.current.setOpacity(1, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Scroll Timeline (Pushes bottle to right cream panel on Behind the brand)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      heroTl.to(group.rotation, {
        y: Math.PI, // Reveal back label golden patterns
        z: 0.38,    // 22 degrees tilt
        ease: 'none'
      }, 0);

      heroTl.to(group.position, {
        x: 0.15,
        y: -0.22,
        ease: 'none'
      }, 0);

      // 2. Showcase Transition Timeline (Brings bottle back to center and scales up)
      const showcaseTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      });

      showcaseTl.to(group.position, { x: 0, y: -0.15, ease: 'power1.inOut' }, 0);
      showcaseTl.to(group.rotation, { y: 0, z: -0.03, ease: 'power1.inOut' }, 0);
      showcaseTl.to(group.scale, { x: 1.65, y: 1.65, z: 1.65, ease: 'power1.inOut' }, 0);

      // 3. Showcase active index variant selector
      ScrollTrigger.create({
        trigger: '#showcase',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          let newVariant: 'veltliner' | 'white' | 'red' = 'veltliner';
          
          if (progress < 0.33) {
            newVariant = 'veltliner';
          } else if (progress < 0.66) {
            newVariant = 'white';
          } else {
            newVariant = 'red';
          }

          if (bottleRef.current) {
            bottleRef.current.setVariant(newVariant);
          }
        }
      });

      // 4. Culture section (Fade out the bottle)
      ScrollTrigger.create({
        trigger: '#culture-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
        onUpdate: (self) => {
          if (bottleRef.current) {
            bottleRef.current.setOpacity(1 - self.progress);
          }
        },
        onLeave: () => {
          if (bottleRef.current) bottleRef.current.setOpacity(0, 0);
        },
        onEnterBack: () => {
          if (bottleRef.current) bottleRef.current.setOpacity(1, 0.4);
        }
      });

      // 5. Buy Section Transition (Fade back in, place tilted on branches)
      ScrollTrigger.create({
        trigger: '#buy',
        start: 'top 90%',
        end: 'top 40%',
        scrub: true,
        onUpdate: (self) => {
          if (bottleRef.current) {
            bottleRef.current.setOpacity(self.progress);
          }
        },
        onEnter: () => {
          if (bottleRef.current) {
            bottleRef.current.setVariant('red'); // Red blend looks rich on buy section branch
          }
        },
        onLeaveBack: () => {
          if (bottleRef.current) {
            bottleRef.current.setOpacity(0);
          }
        }
      });

      const buyTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#buy',
          start: 'top bottom',
          end: 'top 20%',
          scrub: true
        }
      });

      buyTl.fromTo(group.position, { x: 0, y: -2 }, { x: 0.36, y: -0.32, ease: 'power1.out' }, 0);
      buyTl.fromTo(group.rotation, { y: 0, z: 0 }, { y: 0.15, z: -0.42, ease: 'power1.out' }, 0);
      buyTl.fromTo(group.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1.35, y: 1.35, z: 1.35, ease: 'power1.out' }, 0);

      // 6. Contact Section (Fade bottle out completely)
      ScrollTrigger.create({
        trigger: '#contacts',
        start: 'top 95%',
        end: 'top 60%',
        scrub: true,
        onUpdate: (self) => {
          if (bottleRef.current) {
            bottleRef.current.setOpacity(1 - self.progress);
          }
        }
      });
    });

    return () => ctx.revert();
  }, [bottleReady]);

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
            <Buy lang={lang} />
            <Contact lang={lang} onNavigate={handleNavigate} />
          </main>

          {/* Fixed Global 3D WebGL Bottle Wrapper */}
          <div
            className="global-bottle-canvas-container"
            style={{
              position: 'fixed',
              inset: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
              zIndex: 9,
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.5s ease'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100vw',
                height: '100%',
                pointerEvents: 'none'
              }}
            >
              <BottleCanvas ref={bottleRef} onReady={handleBottleReady} float={true} />
            </div>
          </div>

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

