import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BuyProps {
  lang: 'en' | 'fr';
}

export default function Buy({ lang }: BuyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  const branchBgRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      eyebrow: 'Exclusive Collection',
      title: 'Experience KLIMT Wines',
      desc: 'Bring the fusion of Viennese master art and premium Austrian winemaking to your table. Our collection is available for shipping worldwide.',
      button: 'Shop Klimt Collection'
    },
    fr: {
      eyebrow: 'Collection Exclusive',
      title: 'Découvrez les Vins KLIMT',
      desc: 'Apportez la fusion de l’art viennois et de la viticulture autrichienne haut de gamme à votre table. Notre collection est disponible à la livraison dans le monde entier.',
      button: 'Découvrir la Collection'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed slide-up for content elements
      if (textGroupRef.current) {
        gsap.fromTo(textGroupRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: textGroupRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1
            }
          }
        );
      }

      // 2. Parallax scale on the background branch
      gsap.fromTo(branchBgRef.current,
        { scale: 0.9, yPercent: 5 },
        {
          scale: 1.05,
          yPercent: -5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="buy"
      style={{
        position: 'relative',
        backgroundColor: 'transparent', // Transparent background to show global color transitions
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        overflow: 'hidden'
      }}
    >
      <div
        ref={branchBgRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-50%, -50%)',
          width: '130%',
          height: '130%',
          opacity: 0.8,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      >
        <img
          src="/buy-section/cta_branch_v2.webp"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'brightness(0.6) contrast(1.2)'
          }}
        />
      </div>

      <div
        ref={textGroupRef}
        style={{
          position: 'relative',
          zIndex: 12,
          maxWidth: '700px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}
      >
        <p className="textStyle_metadata" style={{ opacity: 0.6 }}>
          {t[lang].eyebrow}
        </p>
        
        <h2
          className="textStyle_heading2"
          style={{
            fontFamily: "'Canela', serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 5.2rem)',
            lineHeight: 1.0,
            margin: 0
          }}
        >
          {t[lang].title}
        </h2>

        <p
          className="textStyle_bodyText"
          style={{
            opacity: 0.8,
            maxWidth: '520px',
            lineHeight: 1.6,
            margin: '0 auto'
          }}
        >
          {t[lang].desc}
        </p>

        {/* Premium shop button (external store) */}
        <a
          href="https://www.saq.com/fr/catalogsearch/result/?q=esterhazy&catalog_type=1&availability_front=En+ligne&availability_front=En+succursale"
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary"
          style={{
            marginTop: '16px',
            padding: '16px 36px',
            fontSize: '0.9rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            backgroundColor: '#ffffff',
            color: '#191714',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(25,23,20,0.15)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 15px 30px rgba(25,23,20,0.25)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 25px rgba(25,23,20,0.15)';
          }}
        >
          {t[lang].button}
        </a>
      </div>
    </section>
  );
}
