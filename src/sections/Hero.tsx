import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottleCanvas from '../components/BottleCanvas';

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
  const bottleRef = useRef<HTMLDivElement>(null);

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
      // 1. Initial page load entry animation
      gsap.fromTo(
        [titleRef.current, copyRef.current, scrollRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
      );

      // Float the bottle slightly at load
      gsap.fromTo(
        bottleRef.current,
        { y: 15 },
        { y: -15, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' }
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
      {/* Background Video */}
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
            opacity: 0.55,
            transition: 'opacity 0.5s ease'
          }}
        />
        {/* Soft radial spotlight behind bottle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 50%, rgba(140, 115, 78, 0.45) 0%, rgba(25, 23, 20, 0.85) 60%, #191714 92%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        {/* Soft linear gradient overlay to fade into brown bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(25, 23, 20, 0.8) 80%, #191714 100%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </div>

      {/* Pinned Tree Vine Branch (Log) behind the bottle */}
      <div
        ref={branchRef}
        style={{
          position: 'absolute',
          left: '52%',
          top: '48%',
          width: '840px',
          height: '760px',
          transform: 'translate(-42%, -50%)',
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
            filter: 'brightness(1.1) contrast(1.15) drop-shadow(0 15px 35px rgba(0,0,0,0.6))'
          }}
        />
      </div>

      {/* 3D WebGL Pinned Bottle */}
      <div
        ref={bottleRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '100vh',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      >
        <BottleCanvas
          variant="veltliner"
          scale={1.22}
          yPercent={0}
          scrollTriggerType="hero"
        />
      </div>

      {/* Hero Content Panel (Fixed height container in scroll trigger) */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '120px 40px 40px',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        {/* Large Title Area */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <h1
            ref={titleRef}
            className="textStyle_heading1"
            style={{
              maxWidth: '920px',
              fontFamily: "'Canela', serif",
              fontWeight: 100,
              color: '#CFC6BD',
              lineHeight: 0.95
            }}
          >
            <span style={{ display: 'block' }}>{t[lang].title1}</span>
            <span style={{ display: 'block' }}>{t[lang].title2}</span>
          </h1>
        </div>

        {/* Footer Area */}
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
              maxWidth: '380px',
              color: '#CFC6BD'
            }}
          >
            {t[lang].copy}
          </p>
          <p
            ref={scrollRef}
            className="textStyle_metadata"
            style={{
              color: '#CFC6BD'
            }}
          >
            {t[lang].scroll}
          </p>
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
