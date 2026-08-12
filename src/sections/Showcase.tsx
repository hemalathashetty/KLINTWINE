import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Utensils, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseProps {
  lang: 'en' | 'fr';
}

export default function Showcase({ lang }: ShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [activeWine, setActiveWine] = useState(0);
  const [modalContent, setModalContent] = useState<{
    type: 'tech' | 'food';
    title: string;
    items?: { label: string; val: string }[];
    bullets?: string[];
  } | null>(null);

  const wines = [
    {
      num: '01',
      type: lang === 'en' ? 'Dry White' : 'Blanc Sec',
      years: '2023 Vintage',
      name: 'Grüner Veltliner',
      flavor: lang === 'en' ? 'Citrus, yellow apple, ripe pear, paired with its typical hints of white pepper' : 'Agrumes, pomme jaune, poire mûre, accompagnés de ses notes poivrées typiques',
      title: '2023 KLIMT Grüner Veltliner',
      desc: lang === 'en' 
        ? 'A fresh and lively Austrian white with bright citrus, crisp apple and subtle pepper notes. A clean, refreshing wine that pairs effortlessly with light dishes and chilled moments.'
        : 'Un blanc autrichien frais et vif avec des notes d\'agrumes éclatantes, de pomme croustillante et de poivre subtil. Un vin propre et rafraîchissant qui s\'accorde sans effort avec des plats légers.',
      color: 'rgba(164, 164, 115, 0.45)', // crisp green-gold spotlight
      bottleImg: '/uploads/gruner_veltliner_632b1976ea.webp',
      tags: ['Citrus Blossom', 'Yellow Apple', 'White Pepper', 'Limestone'],
      techSheet: [
        { label: 'Vintage', val: '2023' },
        { label: 'Alcohol', val: '12.5% Vol' },
        { label: 'Grape Variety', val: '100% Grüner Veltliner' },
        { label: 'Soil Type', val: 'Loess & Primary Slate' },
        { label: 'Acidity', val: '6.2 g/l' },
        { label: 'Residual Sugar', val: '1.1 g/l' },
        { label: 'Serving Temp', val: '8 - 10°C' }
      ],
      pairings: [
        'Classic Austrian Wiener Schnitzel with lemon',
        'Fresh Atlantic oysters and chilled seafood platters',
        'Spicy Asian green papaya salads',
        'Artisanal goat cheese with herbs'
      ]
    },
    {
      num: '02',
      type: lang === 'en' ? 'Dry White' : 'Blanc Sec',
      years: '2022 Vintage',
      name: 'White Blend',
      flavor: lang === 'en' ? 'Fruity & refreshing with floral elderflower notes, green apple, and exotic peach' : 'Fruité et rafraîchissant aux notes florales de sureau, pomme verte et pêche exotique',
      title: '2022 KLIMT White Blend',
      desc: lang === 'en'
        ? 'A smooth, elegant white blend with ripe stone-fruit aromas, gentle florals and a soft, rounded palate. Balanced and approachable, it is a versatile wine for everyday enjoyment and relaxed gatherings.'
        : 'Un assemblage de blancs doux et élégant avec des arômes de fruits à noyau mûrs, des notes florales douces et une bouche ronde. Équilibré et accessible, idéal pour les moments de détente.',
      color: 'rgba(212, 175, 55, 0.45)', // shimmering golden spotlight
      bottleImg: '/uploads/white_blend_3978284690.webp',
      tags: ['Honeyed Apricot', 'White Peach', 'Elderflower', 'Golden Slate'],
      techSheet: [
        { label: 'Vintage', val: '2022' },
        { label: 'Alcohol', val: '12.5% Vol' },
        { label: 'Grape Variety', val: 'Chardonnay, Pinot Blanc, Grüner Veltliner' },
        { label: 'Soil Type', val: 'Calcareous Clay & Loam' },
        { label: 'Acidity', val: '5.8 g/l' },
        { label: 'Residual Sugar', val: '2.5 g/l' },
        { label: 'Serving Temp', val: '10 - 12°C' }
      ],
      pairings: [
        'Pan-seared sea bass with lemon herb butter',
        'Creamy wild mushroom tagliatelle',
        'Roasted poultry with apricot glaze',
        'Mild Gruyère and aged Comté cheeses'
      ]
    },
    {
      num: '03',
      type: lang === 'en' ? 'Dry Red' : 'Rouge Sec',
      years: '2021 Vintage',
      name: 'Red Blend',
      flavor: lang === 'en' ? 'Dark ruby red with black cherries, ripe plums, dark cocoa, and velvety oak tannins' : 'Rouge rubis foncé avec cerises noires, prunes mûres, cacao amer et tanins veloutés',
      title: '2021 KLIMT Red Blend',
      desc: lang === 'en'
        ? 'A juicy, expressive red blend offering dark berries, soft spices and a velvety finish. Harmonious and modern in style, it is an easy-drinking wine that shines both on its own and with food.'
        : 'Un assemblage de rouges juteux et expressif offrant des baies noires, des épices douces et une finale veloutée. Harmoneux et moderne, agréable seul ou en accompagnement.',
      color: 'rgba(138, 28, 28, 0.45)', // deep crimson burgundy spotlight
      bottleImg: '/uploads/red_blend_e2fec91509.webp',
      tags: ['Dark Cherry', 'Roasted Plum', 'Black Cocoa', 'Velvet Oak'],
      techSheet: [
        { label: 'Vintage', val: '2021' },
        { label: 'Alcohol', val: '13.5% Vol' },
        { label: 'Grape Variety', val: 'Zweigelt & Blaufränkisch' },
        { label: 'Aging', val: '8 Months in Austrian Oak Barriques' },
        { label: 'Acidity', val: '5.1 g/l' },
        { label: 'Residual Sugar', val: '1.0 g/l' },
        { label: 'Serving Temp', val: '16 - 18°C' }
      ],
      pairings: [
        'Prime grilled ribeye steak with rosemary',
        'Roasted duck breast with blackberry reduction',
        'Truffled wild mushroom risotto',
        '70% Dark chocolate fondant & aged Gouda'
      ]
    }
  ];

  useEffect(() => {
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

    // 3D Bottle rotation/cross-fade is handled globally at App.tsx level

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

      {/* Floating Bottles are rendered globally at App.tsx level */}

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
                {/* Aroma Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {wine.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.04em',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        backgroundColor: 'rgba(25, 23, 20, 0.06)',
                        color: '#191714',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
                    onClick={() =>
                      setModalContent({
                        type: 'tech',
                        title: `${wine.title} — ${lang === 'en' ? 'Technical Sheet' : 'Fiche Technique'}`,
                        items: wine.techSheet
                      })
                    }
                    className="glass-pill"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(25,23,20,0.18)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer'
                    }}
                  >
                    <FileText size={14} />
                    {lang === 'en' ? 'Technical sheet' : 'Fiche technique'}
                  </button>
                  <button
                    onClick={() =>
                      setModalContent({
                        type: 'food',
                        title: `${wine.title} — ${lang === 'en' ? 'Food Pairing' : 'Accords Mets'}`,
                        bullets: wine.pairings
                      })
                    }
                    className="glass-pill"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(25,23,20,0.18)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer'
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
            backgroundColor: 'rgba(25, 23, 20, 0.5)',
            backdropFilter: 'blur(10px)',
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
              maxWidth: '520px',
              borderRadius: '24px',
              padding: '36px',
              position: 'relative',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
              color: '#191714'
            }}
          >
            <button
              onClick={() => setModalContent(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#ECE9E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>

            <h3
              className="textStyle_heading3"
              style={{
                fontFamily: "'Canela', serif",
                marginBottom: '24px',
                fontSize: '1.6rem',
                borderBottom: '1px solid rgba(25,23,20,0.1)',
                paddingBottom: '12px'
              }}
            >
              {modalContent.title}
            </h3>

            {modalContent.type === 'tech' && modalContent.items && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {modalContent.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.88rem',
                      paddingBottom: '8px',
                      borderBottom: idx < modalContent.items!.length - 1 ? '1px solid rgba(25,23,20,0.06)' : 'none'
                    }}
                  >
                    <span style={{ opacity: 0.6, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontWeight: 600 }}>{item.val}</span>
                  </div>
                ))}
              </div>
            )}

            {modalContent.type === 'food' && modalContent.bullets && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {modalContent.bullets.map((bullet, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ color: '#8f7734', fontWeight: 'bold' }}>•</span>
                    <span style={{ opacity: 0.9 }}>{bullet}</span>
                  </div>
                ))}
              </div>
            )}
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
