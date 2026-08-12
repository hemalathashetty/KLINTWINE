import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CultureProps {
  lang: 'en' | 'fr';
}

export default function Culture({ lang }: CultureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<SVGElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  const t = {
    en: {
      title1: 'The culture shaped the spirit',
      title2Line1: 'Together, they',
      title2Line2: 'shaped KLIMT'
    },
    fr: {
      title1: "La culture a façonné l'esprit",
      title2Line1: 'Ensemble, ils ont',
      title2Line2: 'façonné KLIMT'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          pinSpacing: true
        }
      });

      // 1. Initial setup
      gsap.set(bottleRef.current, { opacity: 0.2, rotation: -10, x: 80, y: -20 });
      gsap.set(streamRef.current, { scaleX: 0, opacity: 0 });
      gsap.set(liquidRef.current, { y: '100%' }); // empty glass
      gsap.set(title1Ref.current, { opacity: 0, y: 30 });
      gsap.set(title2Ref.current, { opacity: 0, y: 30 });

      // 2. Step 1: Title 1 fades in & bottle tilts down on the right
      tl.to(title1Ref.current, { opacity: 1, y: 0, duration: 0.5 }, 0);
      tl.to(bottleRef.current, { opacity: 1, rotation: -30, x: 0, y: 0, duration: 0.6 }, 0.1);

      // 3. Step 2: Red wine stream extends down-left from bottle mouth into center glass
      tl.to(streamRef.current, { opacity: 0.95, scaleX: 1, duration: 0.7, ease: 'power1.inOut' }, 0.2);

      // 4. Step 3: Red wine level inside glass fills up to 100%
      tl.to(liquidRef.current, {
        y: '0%',
        duration: 1.2,
        ease: 'power1.inOut'
      }, 0.5);

      // 5. Step 4: Title 1 fades out, Title 2 ("Together, they shaped KLIMT") fades in over glass
      tl.to(title1Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 0.9);
      tl.to(title2Ref.current, { opacity: 1, y: 0, duration: 0.6 }, 1.2);

      // 6. Step 5: Hold Title 2 visible
      tl.to(title2Ref.current, { opacity: 1, duration: 0.5 }, 1.8);
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id="culture-section" style={{ backgroundColor: '#ECE9E5' }}>
      <div
        ref={triggerRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="diamond-bg" style={{ opacity: 0.02 }} />

        {/* Full-bleed Table Dining Background Photo (Matching User Screenshot 2) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            overflow: 'hidden'
          }}
        >
          <img
            src="/uploads/bcee2a5c0c38f3c990c7948b948a60e4da667406_1_019ce6268c.webp"
            alt="Klimt Wine outdoor dining"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        </div>

        {/* Right Side Tilted Wine Bottle (Matching User Screenshot 2) */}
        <div
          ref={bottleRef}
          style={{
            position: 'absolute',
            top: '8vh',
            right: '-40px',
            width: '320px',
            height: '650px',
            zIndex: 5,
            pointerEvents: 'none',
            transformOrigin: 'top right',
            filter: 'drop-shadow(15px 20px 35px rgba(0,0,0,0.5))'
          }}
        >
          <img
            src="/uploads/gruner_veltliner_632b1976ea.webp"
            alt="Klimt Grüner Veltliner Pouring"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Slanted Red Wine Pouring Stream Line (Matching User Screenshot 2) */}
        <div
          ref={streamRef}
          style={{
            position: 'absolute',
            top: '26vh',
            right: '220px',
            width: '420px',
            height: '10px',
            backgroundColor: '#721019', // Crimson Red Wine color
            transformOrigin: 'right center',
            transform: 'rotate(28deg)',
            zIndex: 4,
            borderRadius: '5px',
            boxShadow: '0 0 12px rgba(114, 16, 25, 0.7)'
          }}
        />

        {/* Center Wine Glass Bowl Outline & Red Wine Fill (Matching User Screenshot 2) */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            width: '240px',
            height: '280px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <svg
            width="220"
            height="260"
            viewBox="0 0 100 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="culture-wine-glass-bowl">
                <path d="M15 15 C15 65 30 90 50 90 C70 90 85 65 85 15 Z" />
              </clipPath>
            </defs>

            {/* Rising Crimson Red Wine Fill */}
            <g clipPath="url(#culture-wine-glass-bowl)">
              <g
                ref={liquidRef as any}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: 'center bottom',
                  transition: 'transform 0.05s linear'
                }}
              >
                <path
                  fill="#721019"
                  d="M0 0 H100 V100 H0 Z"
                />
              </g>
            </g>

            {/* Glass Bowl Outline */}
            <path
              d="M15 15 C15 65 30 90 50 90 C70 90 85 65 85 15"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2.5"
              fill="none"
            />
            {/* Glass Stem */}
            <line x1="50" y1="90" x2="50" y2="120" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="3.5" />
            {/* Glass Base */}
            <ellipse cx="50" cy="122" rx="25" ry="4" fill="rgba(255, 255, 255, 0.4)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Immersive Scroll Typography Overlays (Matching User Screenshot 2) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 6,
            pointerEvents: 'none',
            padding: '0 40px'
          }}
        >
          {/* Title 1: "The culture shaped the spirit" */}
          <h2
            ref={title1Ref}
            className="textStyle_heading3"
            style={{
              position: 'absolute',
              color: '#ffffff',
              width: '100%',
              maxWidth: '800px',
              textAlign: 'center',
              fontFamily: "'MonumentGrotesk', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 5.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              textShadow: '0 4px 20px rgba(0,0,0,0.4)'
            }}
          >
            {t[lang].title1}
          </h2>

          {/* Title 2: "Together, they shaped KLIMT" */}
          <h2
            ref={title2Ref}
            className="textStyle_heading3"
            style={{
              position: 'absolute',
              color: '#ffffff',
              width: '100%',
              maxWidth: '850px',
              textAlign: 'center',
              fontFamily: "'MonumentGrotesk', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 6.2rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
          >
            <span style={{ display: 'block' }}>{t[lang].title2Line1}</span>
            <span style={{ display: 'block' }}>{t[lang].title2Line2}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
