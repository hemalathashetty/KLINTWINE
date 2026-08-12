import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  lang: 'en' | 'fr';
  onNavigate: (sectionId: string) => void;
}

export default function Contact({ lang, onNavigate }: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerBottomRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      navHeader: 'Navigation',
      exploreHeader: 'Explore',
      contactHeader: 'Get in touch',
      newsletterHeader: 'Newsletter',
      newsletterDesc: 'Subscribe for exclusive vintage alerts & artist release details.',
      newsletterBtn: 'Subscribe',
      newsletterPlaceholder: 'Enter your email',
      copyright: '© 2026 KLIMT Wines. Developed as a premium art-wine web experience.',
      legal: 'Privacy Policy  ·  Terms of Service'
    },
    fr: {
      navHeader: 'Navigation',
      exploreHeader: 'Explorer',
      contactHeader: 'Nous contacter',
      newsletterHeader: 'Bulletin',
      newsletterDesc: 'Inscrivez-vous pour recevoir les alertes sur les millésimes exclusifs.',
      newsletterBtn: "S'abonner",
      newsletterPlaceholder: 'Votre adresse e-mail',
      copyright: '© 2026 Vins KLIMT. Développé comme une expérience web art-vin premium.',
      legal: 'Politique de confidentialité · Conditions d’utilisation'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scrubbed reveals for columns inside the footer
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 1
            }
          }
        );
      }

      // 2. Scrubbed reveal for bottom copy
      gsap.fromTo(footerBottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: footerBottomRef.current,
            start: 'top 95%',
            end: 'top 85%',
            scrub: 1
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      id="contacts"
      style={{
        position: 'relative',
        backgroundColor: 'transparent', // Transparent background to show global color transitions
        padding: '120px 40px 40px',
        borderTop: '1px solid rgba(25, 23, 20, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background diamond mesh */}
      <div className="diamond-bg" style={{ opacity: 0.015 }} />

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '40px',
          maxWidth: '1440px',
          margin: '0 auto 80px',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Brand/Signature Column */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img
            src="/uploads/logo_white.png"
            alt="Klimt Wines"
            style={{
              height: '32px',
              width: 'fit-content',
              objectFit: 'contain',
              filter: 'invert(1)' // Inverted to show dark logo on cream background
            }}
          />
          <p className="textStyle_bodyText" style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6 }}>
            Gustav Klimt & Esterházy Family.
            <br />
            Where Viennese art meets the heritage of Burgenland winemaking.
          </p>
        </div>

        {/* Navigation Links Column */}
        <div style={{ gridColumn: 'span 2' }}>
          <h4 className="textStyle_metadata" style={{ opacity: 0.5, marginBottom: '24px' }}>
            {t[lang].navHeader}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['hero', 'showcase', 'heritage', 'region'].map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => onNavigate(sec)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.9rem',
                    color: 'inherit',
                    cursor: 'pointer',
                    opacity: 0.8,
                    textTransform: 'capitalize'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseOut={(e) => (e.currentTarget.style.opacity = '0.8')}
                >
                  {sec === 'hero' ? 'Welcome' : sec}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact details Column */}
        <div style={{ gridColumn: 'span 3' }}>
          <h4 className="textStyle_metadata" style={{ opacity: 0.5, marginBottom: '24px' }}>
            {t[lang].contactHeader}
          </h4>
          <p className="textStyle_bodyText" style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.8 }}>
            Esterházy Wein GmbH
            <br />
            Hugo-von-Hofmannsthal-Straße 4
            <br />
            7000 Eisenstadt, Austria
            <br />
            <br />
            <a href="mailto:office@klimtwine.com" style={{ color: 'inherit', textDecoration: 'underline' }}>
              office@klimtwine.com
            </a>
          </p>
        </div>

        {/* Newsletter Signup Column */}
        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h4 className="textStyle_metadata" style={{ opacity: 0.5 }}>
            {t[lang].newsletterHeader}
          </h4>
          <p className="textStyle_bodyText" style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: 1.5 }}>
            {t[lang].newsletterDesc}
          </p>
          <div style={{ display: 'flex', width: '100%', gap: '8px' }}>
            <input
              type="email"
              placeholder={t[lang].newsletterPlaceholder}
              style={{
                flex: 1,
                padding: '10px 16px',
                fontSize: '0.85rem',
                backgroundColor: 'rgba(25, 23, 20, 0.05)',
                border: '1px solid rgba(25, 23, 20, 0.1)',
                borderRadius: '4px',
                color: 'inherit'
              }}
            />
            <button
              style={{
                padding: '10px 18px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: '#191714',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {t[lang].newsletterBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div
        ref={footerBottomRef}
        style={{
          borderTop: '1px solid rgba(25, 23, 20, 0.08)',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <span style={{ fontSize: '0.78rem', opacity: 0.55 }}>
          {t[lang].copyright}
        </span>
        <span style={{ fontSize: '0.78rem', opacity: 0.55 }}>
          {t[lang].legal}
        </span>
      </div>

      {/* Responsive layout overrides */}
      <style>{`
        @media (max-width: 992px) {
          #contacts {
            padding: 80px 20px 30px !important;
          }
          #contacts > div:first-child {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          #contacts > div:first-child > div {
            grid-column: 1 / -1 !important;
          }
          #contacts > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </footer>
  );
}
