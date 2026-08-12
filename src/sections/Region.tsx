import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RegionProps {
  lang: 'en' | 'fr';
}

export default function Region({ lang }: RegionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mapSvgRef = useRef<SVGSVGElement>(null);

  const t = {
    en: {
      eyebrow: 'Geography',
      title: 'Burgenland: The Wine Region',
      coords: '47.153716, 16.2688797',
      coordsLabel: 'Coordinates',
      area: '3 965 km²',
      areaLabel: 'Total Area',
      country: 'AUSTRIA',
      countryLabel: 'Country',
      desc: 'Burgenland lies along Austria’s warm eastern edge – a landscape shaped by sun, wind, and long-standing winemaking traditions. Here, wines with clear, expressive character take form: balanced, structured, and unmistakably Austrian.'
    },
    fr: {
      eyebrow: 'Géographie',
      title: 'Le Burgenland : La Région Viticole',
      coords: '47.153716, 16.2688797',
      coordsLabel: 'Coordonnées',
      area: '3 965 km²',
      areaLabel: 'Superficie',
      country: 'AUTRICHE',
      countryLabel: 'Pays',
      desc: 'Le Burgenland s’étend le long de la bordure orientale chaude de l’Autriche – un paysage façonné par le soleil, le vent et des traditions viticoles ancestrales. Ici prennent forme des vins au caractère net et expressif.'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Map stroke outline draw-in animation
      const path = mapSvgRef.current?.querySelector('.map-contour');
      if (path) {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 90%',
            scrub: 1
          }
        });
      }

      // 2. Scrubbed text reveals for layout unity
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1
          }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        }
      );

      // Stagger stats block row reveals on scroll scrub
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 90%',
              end: 'top 65%',
              scrub: 1
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="region"
      style={{
        position: 'relative',
        backgroundColor: 'transparent', // Transparent background to show global color transitions
        padding: '160px 40px',
        overflow: 'hidden'
      }}
    >
      <div className="diamond-bg" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '20px',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          alignItems: 'center'
        }}
      >
        {/* Left column: Text descriptions & details */}
        <div
          style={{
            gridColumn: 'span 5',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
          }}
        >
          <div>
            <p className="textStyle_metadata" style={{ opacity: 0.6, marginBottom: '24px' }}>
              {t[lang].eyebrow}
            </p>
            <h2
              ref={titleRef}
              className="textStyle_heading2"
              style={{
                fontFamily: "'Canela', serif",
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                lineHeight: 1.0,
                marginBottom: '20px'
              }}
            >
              {t[lang].title}
            </h2>
            <p
              ref={descRef}
              className="textStyle_bodyText"
              style={{ opacity: 0.85, lineHeight: 1.6 }}
            >
              {t[lang].desc}
            </p>
          </div>

          {/* Geographical Statistics */}
          <div
            ref={statsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              borderTop: '1px solid rgba(25, 23, 20, 0.15)',
              paddingTop: '30px'
            }}
          >
            {/* Stat Item 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="textStyle_metadata" style={{ opacity: 0.5 }}>
                {t[lang].coordsLabel}
              </span>
              <span className="textStyle_bodyText" style={{ fontWeight: 'bold' }}>
                {t[lang].coords}
              </span>
            </div>
            
            {/* Stat Item 2 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="textStyle_metadata" style={{ opacity: 0.5 }}>
                {t[lang].areaLabel}
              </span>
              <span className="textStyle_bodyText" style={{ fontWeight: 'bold' }}>
                {t[lang].area}
              </span>
            </div>

            {/* Stat Item 3 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="textStyle_metadata" style={{ opacity: 0.5 }}>
                {t[lang].countryLabel}
              </span>
              <span className="textStyle_bodyText" style={{ fontWeight: 'bold' }}>
                {t[lang].country}
              </span>
            </div>
          </div>
        </div>

        {/* Right column: Beautiful abstract SVG map representation of Burgenland */}
        <div
          style={{
            gridColumn: 'span 7',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Coordinates floating badge */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              backgroundColor: 'rgba(25, 23, 20, 0.05)',
              padding: '12px 18px',
              borderRadius: '30px',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              fontWeight: 500
            }}
          >
            LAT: 47.1537° N
          </div>

          <svg
            ref={mapSvgRef}
            viewBox="0 0 400 500"
            style={{
              width: '100%',
              maxWidth: '450px',
              height: 'auto'
            }}
          >
            <path
              className="map-contour"
              d="M 180 50 
                 Q 220 70, 240 100 
                 T 270 180 
                 Q 290 220, 250 260 
                 T 220 320 
                 Q 210 350, 220 400 
                 Q 225 430, 200 450 
                 T 160 420 
                 Q 170 380, 180 340 
                 T 150 280 
                 Q 140 220, 160 170 
                 T 180 50 Z"
              fill="rgba(25, 23, 20, 0.03)"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 230 140 
                 C 240 145, 250 160, 245 175 
                 C 240 190, 225 200, 220 185 
                 C 215 170, 220 150, 230 140 Z"
              fill="rgba(25, 23, 20, 0.15)"
              stroke="none"
            />
            <circle cx="210" cy="220" r="6" fill="#cfa644" />
            <circle cx="210" cy="220" r="14" fill="none" stroke="#cfa644" strokeWidth="1" strokeDasharray="3 3" />
            
            <text x="235" y="225" fontFamily="'MonumentGrotesk', sans-serif" fontSize="12" fontWeight="bold" fill="currentColor">
              EISENSTADT
            </text>
          </svg>
        </div>
      </div>

      {/* Responsive layout overrides */}
      <style>{`
        @media (max-width: 992px) {
          #region {
            padding: 100px 20px !important;
          }
          #region > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          #region > div > div:first-child {
            grid-column: 1 / -1 !important;
          }
          #region > div > div:last-child {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
