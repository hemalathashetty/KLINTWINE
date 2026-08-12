import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CultureProps {
  lang: 'en' | 'fr';
}

export default function Culture({ lang }: CultureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const bottleGroupRef = useRef<HTMLDivElement>(null);
  const glassGroupRef = useRef<HTMLDivElement>(null);
  const liquidPathRef = useRef<SVGPathElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);

  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  const austriaSectionRef = useRef<HTMLDivElement>(null);
  const austriaTitleRef = useRef<HTMLHeadingElement>(null);
  const austriaPhotoRef = useRef<HTMLDivElement>(null);
  const austriaDescRef = useRef<HTMLParagraphElement>(null);

  const t = {
    en: {
      title1: 'The culture shaped the spirit',
      title2Line1: 'Together, they',
      title2Line2: 'shaped KLIMT',
      austriaLine1: 'Austria:',
      austriaLine2: 'Land of Art and Wine',
      austriaDesc: 'Austrian winemaking is born from centuries of culture, sun-drenched vineyards, and artistic passion. KLIMT Wines embody this rich legacy in every bottle.'
    },
    fr: {
      title1: "La culture a façonné l'esprit",
      title2Line1: 'Ensemble, ils ont',
      title2Line2: 'façonné KLIMT',
      austriaLine1: 'Autriche :',
      austriaLine2: "Terre d'Art et de Vin",
      austriaDesc: 'La viticulture autrichienne est née de siècles de culture, de vignobles baignés de soleil et de passion artistique. Les vins KLIMT incarnent ce riche héritage dans chaque bouteille.'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=3200',
          pin: true,
          pinSpacing: true,
          scrub: 0.8
        }
      });

      // --- INITIAL STATES (BEFORE SCROLL) ---
      // Phase 0: Bottle initial diagonal orientation around center-right
      gsap.set(bottleGroupRef.current, {
        xPercent: 40,
        yPercent: -10,
        rotation: -18,
        scale: 1.1,
        opacity: 1
      });

      // Glass hidden below center
      gsap.set(glassGroupRef.current, {
        opacity: 0,
        y: 120,
        scale: 0.85
      });

      // Wine stream hidden
      gsap.set(streamRef.current, {
        scaleY: 0,
        opacity: 0
      });

      // Liquid empty in glass
      gsap.set(liquidPathRef.current, {
        y: 80 // Fully hidden at bottom of glass bowl
      });

      // Text initial states
      gsap.set(title1Ref.current, { opacity: 1, y: 0 });
      gsap.set(title2Ref.current, { opacity: 0, y: 40 });

      // Austria section hidden
      gsap.set(austriaSectionRef.current, { opacity: 0 });
      gsap.set(austriaTitleRef.current, { opacity: 0, y: 40 });
      gsap.set(austriaPhotoRef.current, { opacity: 0, scale: 0.9, y: 50 });
      gsap.set(austriaDescRef.current, { opacity: 0, y: 30 });

      // --- TIMELINE SEQUENCING (PHASES 1 TO 10) ---

      // PHASE 1 & 2: Bottle rotates toward horizontal, moves up & right
      masterTl.to(bottleGroupRef.current, {
        xPercent: 65,
        yPercent: -20,
        rotation: -75, // Almost horizontal, neck pointing left
        scale: 1.22,
        duration: 1.2,
        ease: 'power1.inOut'
      }, 0);

      // PHASE 3: Wine glass appears from bottom-center
      masterTl.to(glassGroupRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.3);

      // PHASE 4: Bottle neck aligns precisely above the wine glass bowl
      masterTl.to(bottleGroupRef.current, {
        xPercent: 36,
        yPercent: 12,
        rotation: -115, // Bottle mouth pointing straight down over glass bowl
        scale: 1.25,
        duration: 0.8,
        ease: 'power1.inOut'
      }, 0.8);

      // PHASE 5: Dark red wine stream pours from top bottle mouth into glass
      masterTl.to(streamRef.current, {
        opacity: 1,
        scaleY: 1,
        duration: 0.5,
        ease: 'power2.in'
      }, 1.4);

      // PHASE 6: Wine liquid fills inside glass bowl
      masterTl.to(liquidPathRef.current, {
        y: 0, // Fills up to glass rim
        duration: 1.0,
        ease: 'power1.inOut'
      }, 1.7);

      // PHASE 7: Text transformation from "The culture shaped the spirit" → "Together, they shaped KLIMT"
      masterTl.to(title1Ref.current, {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: 'power2.in'
      }, 1.2);

      masterTl.to(title2Ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 1.8);

      // PHASE 9: Wine stream stops, bottle exits to upper right, glass & text 2 fade
      masterTl.to(streamRef.current, {
        opacity: 0,
        duration: 0.4
      }, 2.5);

      masterTl.to(bottleGroupRef.current, {
        xPercent: 140,
        yPercent: -120,
        opacity: 0,
        duration: 1.0,
        ease: 'power2.in'
      }, 2.6);

      masterTl.to([glassGroupRef.current, title2Ref.current], {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power2.in'
      }, 2.7);

      // PHASE 10: "Austria: Land of Art and Wine" Editorial Section Enters
      masterTl.to(austriaSectionRef.current, {
        opacity: 1,
        duration: 0.6
      }, 3.2);

      masterTl.to(austriaTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 3.4);

      masterTl.to(austriaPhotoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out'
      }, 3.6);

      masterTl.to(austriaDescRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 3.8);

    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="culture-section" style={{ backgroundColor: '#ECE9E5' }}>
      <div
        ref={pinRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: '#ECE9E5',
          background: 'radial-gradient(circle at 50% 40%, #F4F0EB 0%, #ECE9E5 60%, #E2DDD6 100%)'
        }}
      >
        <div className="diamond-bg" style={{ opacity: 0.02 }} />

        {/* 1. Independent Animated Bottle Layer */}
        <div
          ref={bottleGroupRef}
          style={{
            position: 'absolute',
            top: '25%',
            left: '38%',
            width: '340px',
            height: '720px',
            zIndex: 10,
            pointerEvents: 'none',
            transformOrigin: '50% 25px', // Transform centered around top bottle mouth opening
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(20px 30px 45px rgba(0,0,0,0.35))'
          }}
        >
          <img
            src="/uploads/gruner_veltliner_632b1976ea.webp"
            alt="Klimt Wine Bottle"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />

          {/* Wine Stream — Realistic fluid SVG liquid stream with specular highlight */}
          <div
            ref={streamRef}
            style={{
              position: 'absolute',
              top: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '350px',
              transformOrigin: 'top center',
              zIndex: 11,
              pointerEvents: 'none'
            }}
          >
            <svg width="20" height="350" viewBox="0 0 20 350" fill="none">
              <defs>
                <linearGradient id="fluid-wine-stream-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4A050B" />
                  <stop offset="25%" stopColor="#8C111E" />
                  <stop offset="50%" stopColor="#F5B8BF" /> {/* Specular liquid light highlight */}
                  <stop offset="75%" stopColor="#8C111E" />
                  <stop offset="100%" stopColor="#4A050B" />
                </linearGradient>
              </defs>
              {/* Natural fluid stream curve tapering down under gravity */}
              <path
                d="M 6 0 C 6 80 8 200 5 350 H 15 C 12 200 14 80 14 0 Z"
                fill="url(#fluid-wine-stream-grad)"
              />
              {/* Falling liquid droplets along fluid stream */}
              <ellipse cx="10" cy="70" rx="1.8" ry="4.5" fill="#F5B8BF" opacity="0.9" />
              <ellipse cx="10" cy="190" rx="2" ry="5" fill="#F5B8BF" opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* 3. Realistic Wine Glass Layer (Bottom Center) */}
        <div
          ref={glassGroupRef}
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '320px',
            zIndex: 12,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <svg
            width="220"
            height="280"
            viewBox="0 0 100 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="wine-glass-bowl-clip">
                <path d="M15 15 C15 65 30 90 50 90 C70 90 85 65 85 15 Z" />
              </clipPath>
              <radialGradient id="glass-wine-fill-grad" cx="50%" cy="20%" r="70%">
                <stop offset="0%" stopColor="#B82232" />
                <stop offset="45%" stopColor="#721019" />
                <stop offset="100%" stopColor="#30040A" />
              </radialGradient>
            </defs>

            {/* Rising Dark Red Wine Liquid Fill with Meniscus Surface & Impact Ripples */}
            <g clipPath="url(#wine-glass-bowl-clip)">
              <g ref={liquidPathRef}>
                <path
                  fill="url(#glass-wine-fill-grad)"
                  d="M 0 30 Q 50 22 100 30 V 95 H 0 Z"
                />
                {/* Surface Meniscus highlight */}
                <ellipse cx="50" cy="28" rx="36" ry="3.5" fill="rgba(245, 184, 191, 0.5)" />
                {/* Pour Impact Concentric Ripples */}
                <ellipse cx="50" cy="28" rx="14" ry="2" stroke="rgba(255, 220, 220, 0.65)" strokeWidth="1" fill="none" />
                <ellipse cx="50" cy="28" rx="6" ry="1" fill="rgba(255, 230, 230, 0.85)" />
              </g>
            </g>

            {/* Glass Bowl Contour & Reflections */}
            <path
              d="M15 15 C15 65 30 90 50 90 C70 90 85 65 85 15"
              stroke="#191714"
              strokeWidth="2"
              fill="none"
              opacity="0.85"
            />
            {/* Glass Stem */}
            <line x1="50" y1="90" x2="50" y2="120" stroke="#191714" strokeWidth="2.5" opacity="0.85" />
            {/* Glass Base */}
            <ellipse cx="50" cy="122" rx="26" ry="4" fill="none" stroke="#191714" strokeWidth="1.5" opacity="0.85" />
            {/* Specular Glass Highlight Line */}
            <path d="M 22 25 C 20 45 26 65 34 75" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.65" fill="none" />
          </svg>
        </div>

        {/* 4. Primary Typography Overlays */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 15,
            pointerEvents: 'none',
            padding: '0 50px'
          }}
        >
          {/* Title 1: "The culture shaped the spirit" */}
          <h2
            ref={title1Ref}
            className="textStyle_heading3"
            style={{
              position: 'absolute',
              color: '#191714',
              width: '100%',
              maxWidth: '850px',
              textAlign: 'center',
              fontFamily: "'Canela', serif",
              fontSize: 'clamp(3rem, 6.5vw, 5.8rem)',
              fontWeight: 100,
              lineHeight: 1.1
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
              color: '#191714',
              width: '100%',
              maxWidth: '900px',
              textAlign: 'center',
              fontFamily: "'Canela', serif",
              fontSize: 'clamp(3.2rem, 7vw, 6.4rem)',
              fontWeight: 100,
              lineHeight: 1.05
            }}
          >
            <span style={{ display: 'block' }}>{t[lang].title2Line1}</span>
            <span style={{ display: 'block' }}>{t[lang].title2Line2}</span>
          </h2>
        </div>

        {/* 5. Phase 10: "Austria: Land of Art and Wine" Editorial Composition */}
        <div
          ref={austriaSectionRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '80px 50px',
            backgroundColor: '#ECE9E5',
            pointerEvents: 'none'
          }}
        >
          {/* Editorial Title */}
          <h2
            ref={austriaTitleRef}
            className="textStyle_heading1"
            style={{
              fontFamily: "'Canela', serif",
              fontSize: 'clamp(3.5rem, 7.5vw, 7rem)',
              fontWeight: 100,
              color: '#191714',
              textAlign: 'center',
              lineHeight: 0.95,
              marginBottom: '32px'
            }}
          >
            <span style={{ display: 'block' }}>{t[lang].austriaLine1}</span>
            <span style={{ display: 'block', fontStyle: 'italic' }}>{t[lang].austriaLine2}</span>
          </h2>

          {/* Center Rectangular Photograph */}
          <div
            ref={austriaPhotoRef}
            style={{
              width: '100%',
              maxWidth: '680px',
              height: '380px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              marginBottom: '28px'
            }}
          >
            <img
              src="/uploads/bcee2a5c0c38f3c990c7948b948a60e4da667406_1_019ce6268c.webp"
              alt="Outdoor dining enjoying Klimt Wine"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Supporting Paragraph */}
          <p
            ref={austriaDescRef}
            className="textStyle_bodyText"
            style={{
              maxWidth: '540px',
              textAlign: 'center',
              color: '#191714',
              opacity: 0.8,
              fontSize: '0.95rem',
              lineHeight: 1.6
            }}
          >
            {t[lang].austriaDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
