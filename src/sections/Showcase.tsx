import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Utensils, X } from 'lucide-react';
import BottleCanvas from '../components/BottleCanvas';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProps {
  lang: 'en' | 'fr';
}

export default function Showcase({ lang }: ShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [activeWine, setActiveWine] = useState(0);
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  const wines = [
    {
      num: '01',
      type: lang === 'en' ? 'Dry White' : 'Blanc Sec',
      years: '2023-2025',
      name: 'Grüner Veltliner',
      flavor: lang === 'en' ? 'Citrus, yellow apple, ripe pear, paired with its typical hints of pepper' : 'Agrumes, pomme jaune, poire mûre, accompagnés de ses notes poivrées typiques',
      title: '2023 KLIMT Grüner Veltliner',
      desc: lang === 'en' 
        ? 'A fresh and lively Austrian white with bright citrus, crisp apple and subtle pepper notes. A clean, refreshing wine that pairs effortlessly with light dishes and chilled moments.'
        : 'Un blanc autrichien frais et vif avec des notes d\'agrumes éclatantes, de pomme croustillante et de poivre subtil. Un vin propre et rafraîchissant qui s\'accorde sans effort avec des plats légers.',
      color: 'rgba(164, 164, 115, 0.40)', // green-ish spotlight
      bottleImg: '/uploads/gruner_veltliner_632b1976ea.webp',
      techSheet: lang === 'en' 
        ? 'Alcohol: 12.5% | Acid: 6.2 g/l | Residual Sugar: 1.1 g/l. Hand-harvested in mid-September from slate and limestone soils. Fermented in stainless steel tanks.'
        : 'Alcool : 12,5% | Acidité : 6,2 g/l | Sucre résiduel : 1,1 g/l. Vendangé à la main mi-septembre sur des sols d\'ardoise et de calcaire.',
      pairings: lang === 'en'
        ? 'Pairs perfectly with Wiener Schnitzel, fresh seafood, spicy Asian salads, and goat cheese.'
        : 'S\'accorde parfaitement avec une escalope viennoise, des fruits de mer frais et du fromage de chèvre.'
    },
    {
      num: '02',
      type: lang === 'en' ? 'Dry White' : 'Blanc Sec',
      years: '2023-2025',
      name: 'White Blend',
      flavor: lang === 'en' ? 'Fruity - refreshing - floral flavours - green apple - hint of elderflower and exotic' : 'Fruité - rafraîchissant - arômes floraux - pomme verte - note de sureau et fruits exotiques',
      title: '2022 KLIMT White Blend',
      desc: lang === 'en'
        ? 'A smooth, elegant white blend with ripe stone-fruit aromas, gentle florals and a soft, rounded palate. Balanced and approachable, it is a versatile wine for everyday enjoyment and relaxed gatherings.'
        : 'Un assemblage de blancs doux et élégant avec des arômes de fruits à noyau mûrs, des notes florales douces et une bouche ronde. Équilibré et accessible, idéal pour les moments de détente.',
      color: 'rgba(160, 137, 33, 0.40)', // golden spotlight
      bottleImg: '/uploads/white_blend_3978284690.webp',
      techSheet: lang === 'en'
        ? 'Alcohol: 12.0% | Acid: 5.8 g/l | Residual Sugar: 2.5 g/l. A blend of Chardonnay, Pinot Blanc, and Grüner Veltliner. Aged on lees for 3 months.'
        : 'Alcool : 12,0% | Acidité : 5,8 g/l | Sucre résiduel : 2,5 g/l. Un assemblage de Chardonnay, Pinot Blanc et Grüner Veltliner.',
      pairings: lang === 'en'
        ? 'Pairs beautifully with grilled chicken, creamy pasta dishes, roasted vegetables, and mild cheeses.'
        : 'S\'accorde à merveille avec du poulet grillé, des pâtes en sauce crémeuse et des fromages doux.'
    },
    {
      num: '03',
      type: lang === 'en' ? 'Dry Red' : 'Rouge Sec',
      years: '2023-2025',
      name: 'Red Blend',
      flavor: lang === 'en' ? 'Dark ruby red - black cherries - ripe plums - dark chocolate - fruity and juicy style - smooth tannins' : 'Rouge rubis foncé - cerises noires - prunes mûres - chocolat noir - style fruité et juteux - tanins souples',
      title: '2021 KLIMT Red Blend',
      desc: lang === 'en'
        ? 'A juicy, expressive red blend offering dark berries, soft spices and a velvety finish. Harmonious and modern in style, it is an easy-drinking wine that shines both on its own and with food.'
        : 'Un assemblage de rouges juteux et expressif offrant des baies noires, des épices douces et une finale veloutée. Harmoneux et moderne, agréable seul ou en accompagnement.',
      color: 'rgba(103, 0, 0, 0.30)', // dark red spotlight
      bottleImg: '/uploads/red_blend_e2fec91509.webp',
      techSheet: lang === 'en'
        ? 'Alcohol: 13.0% | Acid: 5.1 g/l | Residual Sugar: 1.0 g/l. A premium blend of Zweigelt and Blaufränkisch. Aged in oak barrels for 8 months.'
        : 'Alcool : 13,0% | Acidité : 5,1 g/l | Sucre résiduel : 1,0 g/l. Assemblage haut de gamme de Zweigelt et Blaufränkisch.',
      pairings: lang === 'en'
        ? 'Pairs excellently with grilled steaks, roasted duck, tomato-based pasta dishes, and dark chocolate desserts.'
        : 'S\'accorde parfaitement avec des steaks grillés, du canard rôti et des desserts au chocolat noir.'
    }
  ];

  useEffect(() => {
    const bottles = gsap.utils.toArray('.bottle-visual');
    const textBlocks = gsap.utils.toArray('.wine-details-block');

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll distance equal to 3 sections
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // Determine the active wine section based on scroll progress
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveWine(0);
          } else if (progress < 0.66) {
            setActiveWine(1);
          } else {
            setActiveWine(2);
          }
        }
      }
    });

    // Animate Spotlight Color
    wines.forEach((wine, idx) => {
      if (idx > 0) {
        mainTimeline.to(spotlightRef.current, {
          style: { '--spotlight-color': wine.color },
          duration: 1,
          ease: 'power1.inOut'
        }, idx * 1);
      }
    });

    // Animate Bottles sliding, crossfading, and rotating on scroll smoothly
    bottles.forEach((bottle: any, idx) => {
      if (idx === 0) {
        gsap.set(bottle, { xPercent: 0, opacity: 1, scale: 1, rotate: -2 });
        mainTimeline.to(bottle, {
          xPercent: -120,
          opacity: 0,
          scale: 0.9,
          rotate: -15,
          duration: 1,
          ease: 'power1.inOut'
        }, 0.3);
      } else if (idx === 1) {
        gsap.set(bottle, { xPercent: 120, opacity: 0, scale: 0.9, rotate: 15 });
        mainTimeline.to(bottle, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: -2,
          duration: 1,
          ease: 'power1.inOut'
        }, 0.3);
        mainTimeline.to(bottle, {
          xPercent: -120,
          opacity: 0,
          scale: 0.9,
          rotate: -15,
          duration: 1,
          ease: 'power1.inOut'
        }, 1.3);
      } else if (idx === 2) {
        gsap.set(bottle, { xPercent: 120, opacity: 0, scale: 0.9, rotate: 15 });
        mainTimeline.to(bottle, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: -2,
          duration: 1,
          ease: 'power1.inOut'
        }, 1.3);
      }
    });

    // Animate text info slides (fade in / out on scroll timelines)
    textBlocks.forEach((block: any, idx) => {
      if (idx === 0) {
        gsap.set(block, { opacity: 1, y: 0 });
        mainTimeline.to(block, {
          opacity: 0,
          y: -40,
          duration: 0.8,
          ease: 'power1.inOut'
        }, 0.3);
      } else if (idx === 1) {
        gsap.set(block, { opacity: 0, y: 40 });
        mainTimeline.to(block, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power1.inOut'
        }, 0.3);
        mainTimeline.to(block, {
          opacity: 0,
          y: -40,
          duration: 0.8,
          ease: 'power1.inOut'
        }, 1.3);
      } else if (idx === 2) {
        gsap.set(block, { opacity: 0, y: 40 });
        mainTimeline.to(block, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power1.inOut'
        }, 1.3);
      }
    });

    return () => {
      mainTimeline.kill();
    };
  }, [lang]);

  return (
    <div
      ref={containerRef}
      id="showcase"
      style={{
        position: 'relative',
        height: '100vh',
        backgroundColor: 'transparent', // Sand base cream handled by App transitions
        color: '#191714',
        overflow: 'hidden'
      }}
    >
      {/* Background Diamond Pattern overlay & Spotlight Overlay */}
      <div className="diamond-bg" />
      <div
        ref={spotlightRef}
        className="spotlight-radial-overlay"
        style={{
          '--spotlight-color': wines[0].color
        } as React.CSSProperties}
      />

      {/* Floating Bottles Container */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '76vh',
          zIndex: 5,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {wines.map((_, idx) => (
          <div
            key={idx}
            className="bottle-visual"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <BottleCanvas
              variant={idx === 0 ? 'veltliner' : idx === 1 ? 'white' : 'red'}
              scale={1.72}
              float={activeWine === idx}
              rotationY={0}
              rotationZ={-0.03}
            />
          </div>
        ))}
      </div>

      {/* Pinned HTML Content Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none'
        }}
      >
        {wines.map((wine, idx) => (
          <div
            key={idx}
            className="wine-details-block"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '120px 40px 60px',
              opacity: idx === 0 ? 1 : 0,
              pointerEvents: activeWine === idx ? 'auto' : 'none'
            }}
          >
            {/* Top Row: Title */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span
                  className="textStyle_heading1"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    opacity: 0.25,
                    marginBottom: '10px'
                  }}
                >
                  {wine.num}
                </span>
                <h2
                  className="textStyle_heading1"
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 6.5rem)',
                    lineHeight: 0.8
                  }}
                >
                  {wine.name}
                </h2>
              </div>
              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <span className="textStyle_metadata" style={{ display: 'block', marginBottom: '8px' }}>
                  {wine.type}
                </span>
                <span className="textStyle_bodyText" style={{ opacity: 0.6 }}>
                  {wine.years}
                </span>
              </div>
            </div>

            {/* Middle Row: Left Flavor notes, Right main paragraph */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '20px',
                alignItems: 'flex-end',
                marginTop: 'auto'
              }}
            >
              {/* Flavor description (Left) */}
              <div style={{ gridColumn: 'span 4' }}>
                <h3
                  className="textStyle_heading4"
                  style={{
                    fontSize: '1.2rem',
                    lineHeight: 1.4,
                    opacity: 0.75,
                    borderLeft: '2px solid rgba(25,23,20,0.18)',
                    paddingLeft: '16px'
                  }}
                >
                  {wine.flavor}
                </h3>
              </div>

              {/* Spacing / Empty columns */}
              <div style={{ gridColumn: 'span 4' }}></div>

              {/* Main review copy + Actions (Right) */}
              <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h4 className="textStyle_heading4" style={{ fontSize: '1.4rem' }}>
                  {wine.title}
                </h4>
                <p className="textStyle_bodyText" style={{ opacity: 0.85 }}>
                  {wine.desc}
                </p>

                {/* Detail Buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                  <button
                    onClick={() => setModalContent({ title: lang === 'en' ? 'Technical Sheet' : 'Fiche Technique', body: wine.techSheet })}
                    className="glass-pill"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(25,23,20,0.15)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    <FileText size={14} />
                    {lang === 'en' ? 'Technical sheet' : 'Fiche technique'}
                  </button>
                  <button
                    onClick={() => setModalContent({ title: lang === 'en' ? 'Food Pairing' : 'Accords Mets', body: wine.pairings })}
                    className="glass-pill"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(25,23,20,0.15)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    <Utensils size={14} />
                    {lang === 'en' ? 'Food pairing' : 'Accords mets'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Overlay */}
      {modalContent && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(25, 23, 20, 0.4)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            className="glass-pill"
            style={{
              width: '100%',
              maxWidth: '500px',
              borderRadius: '20px',
              padding: '30px',
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              color: '#191714'
            }}
          >
            <button
              onClick={() => setModalContent(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <h3
              className="textStyle_heading3"
              style={{
                fontFamily: "'Canela', serif",
                marginBottom: '20px',
                fontSize: '1.8rem',
                borderBottom: '1px solid rgba(25,23,20,0.1)',
                paddingBottom: '10px'
              }}
            >
              {modalContent.title}
            </h3>
            <p className="textStyle_bodyText" style={{ lineHeight: 1.6, opacity: 0.9 }}>
              {modalContent.body}
            </p>
          </div>
        </div>
      )}

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 992px) {
          .wine-details-block {
            padding: 100px 20px 40px !important;
          }
          .bottle-visual img {
            height: 65% !important;
            margin-top: -30px;
          }
          .wine-details-block > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .wine-details-block > div:last-child > div:first-child {
            grid-column: 1 / -1 !important;
          }
          .wine-details-block > div:last-child > div:last-child {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </div>
  );
}
