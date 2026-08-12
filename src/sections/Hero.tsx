import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// BottleCanvas is now managed globally at App.tsx level

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  lang: 'en' | 'fr';
}

export default function Hero({ lang }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLParagraphElement>(null);
  
  const behindBrandRef = useRef<HTMLDivElement>(null);
  const behindEyebrowRef = useRef<HTMLParagraphElement>(null);
  const behindTextRef = useRef<HTMLHeadingElement>(null);

  const branchRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title1: 'Where Art',
      title2: 'Meets Wine',
      copy: 'Explore the taste of KLIMT Wines - a collection crafted with passion and inspired by art.',
      scroll: 'Scroll to explore',
      behindEyebrow: 'Behind the brand',
      behindText: "The Esterházy family has shaped Austrian culture for centuries. KLIMT wines continue this legacy, inspired by Gustav Klimt's The Kiss."
    },
    fr: {
      title1: "Quand l'Art",
      title2: 'Rencontre le Vin',
      copy: "Explorez le goût des vins KLIMT - une collection élaborée avec passion et inspirée par l'art.",
      scroll: 'Faire défiler pour explorer',
      behindEyebrow: 'Derrière la marque',
      behindText: 'La famille Esterházy a façonné la culture autrichienne pendant des siècles. Les vins KLIMT perpétuent cet héritage, inspirés par Le Baiser de Gustav Klimt.'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial page load entry animation (Tied to bottle growth)
      gsap.fromTo(
        branchRef.current,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1.0, duration: 1.8, ease: 'power2.out', delay: 0.2 }
      );

      gsap.fromTo(
        [titleRef.current, copyRef.current, scrollRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, stagger: 0.25, ease: 'power3.out', delay: 0.4 }
      );

      // 2. Scroll triggered transitions
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: true
        }
      });

      // Fade out the hero text and dim the video as we scroll down
      timeline.to([titleRef.current, copyRef.current, scrollRef.current], {
        opacity: 0,
        y: -50,
        duration: 1
      }, 0);

      timeline.to(videoRef.current, {
        opacity: 0.05,
        scale: 1.05,
        duration: 1.5
      }, 0);

      // Fade out the mossy branch as we scroll
      timeline.to(branchRef.current, {
        opacity: 0,
        yPercent: -15,
        scale: 0.9,
        duration: 1.2
      }, 0);



      // Transition the background and text colors of the "Behind the brand" card
      timeline.fromTo(
        behindBrandRef.current,
        { backgroundColor: 'transparent' },
        { backgroundColor: '#ECE9E5', duration: 1.5 }, // Soft cream background matches original
        0.3
      );

      // Shift text colors to deep brown
      timeline.to([behindEyebrowRef.current, behindTextRef.current], {
        color: '#191714',
        duration: 1.2
      }, 0.5);

      // Fade in the Behind the Brand section content
      timeline.fromTo(
        [behindEyebrowRef.current, behindTextRef.current],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.2, ease: 'power2.out' },
        0.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        height: '200vh', // Accounts for the scroll-scrub timeline
        backgroundColor: 'transparent',
        color: '#CFC6BD',
        overflow: 'hidden'
      }}
    >
      {/* Background Video & Warm Ambient Spotlight */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        <video
          ref={videoRef}
          src="/uploads/video_intro_c5a431e24b.webm"
          poster="/uploads/video_intro_frame_9449627751.webp"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.45,
            transition: 'opacity 0.5s ease'
          }}
        />
        {/* Soft golden radial spotlight behind bottle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 45%, rgba(185, 148, 88, 0.42) 0%, rgba(35, 30, 25, 0.88) 55%, #141210 90%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        {/* Linear gradient fade into dark base */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(20, 18, 16, 0.85) 80%, #141210 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </div>

      {/* Pinned Tree Vine Branch (Log) looping behind the 3D bottle */}
      <div
        ref={branchRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          width: '960px',
          height: '840px',
          transform: 'translate(-38%, -48%)',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 1
        }}
      >
        <img
          src="/buy-section/cta_branch_v2.webp"
          alt="Tree Vine Log Branch"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'brightness(1.15) contrast(1.2) drop-shadow(0 25px 50px rgba(0,0,0,0.75))'
          }}
        />
      </div>

      {/* 3D WebGL Pinned Bottle is rendered globally at App.tsx level */}

      {/* Hero Content Panel */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '135px 55px 45px',
          zIndex: 12,
          pointerEvents: 'none'
        }}
      >
        {/* Large Editorial Serif Title */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <h1
            ref={titleRef}
            className="textStyle_heading1"
            style={{
              maxWidth: '980px',
              fontFamily: "'Canela', serif",
              fontWeight: 100,
              color: '#F5F1EB',
              fontSize: 'clamp(5rem, 9vw, 9.8rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.025em',
              textShadow: '0 4px 35px rgba(0,0,0,0.6)'
            }}
          >
            <span style={{ display: 'block' }}>{t[lang].title1}</span>
            <span style={{ display: 'block' }}>{t[lang].title2}</span>
          </h1>
        </div>

        {/* Footer Info Area */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%'
          }}
        >
          <p
            ref={copyRef}
            className="textStyle_bodyText"
            style={{
              maxWidth: '340px',
              color: 'rgba(245, 241, 235, 0.85)',
              fontSize: '0.85rem',
              lineHeight: 1.55,
              fontWeight: 400
            }}
          >
            {t[lang].copy}
          </p>
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(245, 241, 235, 0.85)',
              fontSize: '0.82rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            <span>{t[lang].scroll}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Bottom Center Floating Wine Selector Pill */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            pointerEvents: 'auto'
          }}
        >
          <a
            href="#showcase"
            className="glass-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              color: '#191714',
              padding: '9px 24px',
              borderRadius: '40px',
              boxShadow: '0 10px 32px rgba(0,0,0,0.35)',
              fontSize: '0.85rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), boxShadow 0.25s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 14px 38px rgba(0,0,0,0.45)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.35)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
              <img src="/uploads/gruner_veltliner_632b1976ea.webp" alt="" style={{ height: '24px', width: 'auto' }} />
              <img src="/uploads/white_blend_3978284690.webp" alt="" style={{ height: '24px', width: 'auto' }} />
              <img src="/uploads/red_blend_e2fec91509.webp" alt="" style={{ height: '24px', width: 'auto' }} />
            </div>
            <span>Our Wines</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Behind the Brand Layer (Revealed and styled on scroll) */}
      <div
        ref={behindBrandRef}
        style={{
          position: 'absolute',
          top: '100vh',
          left: 0,
          right: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 40px',
          zIndex: 1 // Sits behind the bottle (z_3) but above the background video
        }}
      >
        <p
          ref={behindEyebrowRef}
          className="textStyle_metadata"
          style={{
            color: '#CFC6BD',
            marginBottom: '32px',
            opacity: 0.6
          }}
        >
          {t[lang].behindEyebrow}
        </p>
        <h2
          ref={behindTextRef}
          className="textStyle_heading3"
          style={{
            color: '#CFC6BD',
            maxWidth: '960px',
            fontFamily: "'Canela', serif",
            fontWeight: 100,
            lineHeight: 1.3
          }}
        >
          {t[lang].behindText}
        </h2>
      </div>
    </div>
  );
}
