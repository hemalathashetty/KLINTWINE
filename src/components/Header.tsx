import { useState } from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  lang: 'en' | 'fr';
  setLang: (lang: 'en' | 'fr') => void;
  onNavigate: (sectionId: string) => void;
  isDarkTheme?: boolean;
  onBuyClick: () => void;
}

export default function Header({ lang, setLang, onNavigate, isDarkTheme = false, onBuyClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const t = {
    en: {
      heritage: 'Heritage',
      region: 'Region',
      contacts: 'Contacts',
      buyWines: 'Buy Klimt Wines',
      buyShort: 'Buy',
      openMenu: 'Open menu',
      closeMenu: 'Close menu'
    },
    fr: {
      heritage: 'Héritage',
      region: 'Région',
      contacts: 'Contacts',
      buyWines: 'Acheter Klimt',
      buyShort: 'Acheter',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu'
    }
  };

  const handleLinkClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onNavigate(sectionId);
  };

  const textColor = isDarkTheme ? '#CFC6BD' : '#191714';
  const logoSrc = isDarkTheme ? '/logo_white.png' : '/logo.png';

  return (
    <>
      {/* Desktop Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '32px 50px',
          color: textColor,
          fontFamily: "'MonumentGrotesk', sans-serif",
          pointerEvents: 'none'
        }}
      >
        {/* Navigation Link (Left Vertical Stack) */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            pointerEvents: 'auto'
          }}
        >
          <button
            onClick={() => handleLinkClick('heritage')}
            style={{
              textAlign: 'left',
              fontSize: '0.85rem',
              color: textColor,
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
              opacity: 0.9,
              cursor: 'pointer'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            {t[lang].heritage}
          </button>
          <button
            onClick={() => handleLinkClick('region')}
            style={{
              textAlign: 'left',
              fontSize: '0.85rem',
              color: textColor,
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
              opacity: 0.9,
              cursor: 'pointer'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            {t[lang].region}
          </button>
          <button
            onClick={() => handleLinkClick('contacts')}
            style={{
              textAlign: 'left',
              fontSize: '0.85rem',
              color: textColor,
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
              opacity: 0.9,
              cursor: 'pointer'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
          >
            {t[lang].contacts}
          </button>
        </nav>

        {/* Center Logo (Positioned directly above bottle neck) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '28px',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            display: 'block',
            width: '140px',
            height: '46px'
          }}
        >
          <img
            src={logoSrc}
            alt="Esterhazy Austria"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </a>

        {/* Right Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            pointerEvents: 'auto'
          }}
        >
          {/* Language Switcher */}
          <div style={{ display: 'flex', gap: '4px', fontSize: '0.85rem' }}>
            <button
              onClick={() => setLang('en')}
              style={{
                fontWeight: lang === 'en' ? '600' : '400',
                opacity: lang === 'en' ? 1 : 0.5,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              En
            </button>
            <span style={{ opacity: 0.4, color: textColor }}>/</span>
            <button
              onClick={() => setLang('fr')}
              style={{
                fontWeight: lang === 'fr' ? '600' : '400',
                opacity: lang === 'fr' ? 1 : 0.5,
                color: textColor,
                cursor: 'pointer'
              }}
            >
              Fr
            </button>
          </div>

          {/* Buy Button */}
          <a
            href="https://www.saq.com/fr/catalogsearch/result/?q=esterhazy&catalog_type=1&availability_front=En+ligne&availability_front=En+succursale"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              fontSize: '0.85rem',
              color: textColor,
              fontWeight: 400,
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
              cursor: 'pointer',
              pointerEvents: 'auto'
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {t[lang].buyWines}
          </a>
        </div>
      </header>

      {/* Mobile Header (Shows on mobile dimensions via CSS overlays) */}
      <div
        className="mobile-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          display: 'none', // Managed by responsive CSS below
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          color: textColor,
          pointerEvents: 'none'
        }}
      >
        {/* 4-dots Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label={t[lang].openMenu}
          style={{
            pointerEvents: 'auto',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: isDarkTheme ? '#CFC6BD' : '#191714',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 4px)',
            gridTemplateRows: 'repeat(2, 4px)',
            alignContent: 'center',
            justifyContent: 'center',
            gap: '4px',
            cursor: 'pointer'
          }}
        >
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isDarkTheme ? '#191714' : '#CFC6BD' }}></span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isDarkTheme ? '#191714' : '#CFC6BD' }}></span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isDarkTheme ? '#191714' : '#CFC6BD' }}></span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: isDarkTheme ? '#191714' : '#CFC6BD' }}></span>
        </button>

        {/* Center Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero');
          }}
          style={{
            pointerEvents: 'auto',
            display: 'block',
            width: '100px',
            height: '41px'
          }}
        >
          <img
            src={logoSrc}
            alt="Esterhazy Austria"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </a>

        {/* Buy short link */}
        <a
          href="https://www.saq.com/fr/catalogsearch/result/?q=esterhazy&catalog_type=1&availability_front=En+ligne&availability_front=En+succursale"
          target="_blank"
          rel="noreferrer noopener"
          style={{
            pointerEvents: 'auto',
            fontSize: '0.85rem',
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: `1px solid ${textColor}`,
            cursor: 'pointer'
          }}
        >
          {t[lang].buyShort}
        </a>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}
        style={{
          display: 'none', // Managed by responsive CSS below
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '20px',
          backgroundColor: '#CFC6BD', // Sand
          color: '#191714', // Brown
          borderRadius: '16px',
          zIndex: 2000,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          transform: isMenuOpen ? 'translateY(0)' : 'translateY(-120%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        {/* Close Button */}
        <div>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label={t[lang].closeMenu}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ECE9E5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} color="#191714" />
          </button>
        </div>

        {/* Nav Links */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
            marginTop: '-40px'
          }}
        >
          <button
            onClick={() => handleLinkClick('heritage')}
            style={{
              fontFamily: "'Canela', serif",
              fontSize: '2.5rem',
              fontWeight: 100,
              color: '#191714'
            }}
          >
            {t[lang].heritage}
          </button>
          <button
            onClick={() => handleLinkClick('region')}
            style={{
              fontFamily: "'Canela', serif",
              fontSize: '2.5rem',
              fontWeight: 100,
              color: '#191714'
            }}
          >
            {t[lang].region}
          </button>
          <button
            onClick={() => handleLinkClick('contacts')}
            style={{
              fontFamily: "'Canela', serif",
              fontSize: '2.5rem',
              fontWeight: 100,
              color: '#191714'
            }}
          >
            {t[lang].contacts}
          </button>
        </nav>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            width: '100%'
          }}
        >
          {/* Lang */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setLang('en')}
              style={{ fontWeight: lang === 'en' ? 'bold' : 'normal' }}
            >
              En
            </button>
            <span style={{ opacity: 0.4 }}>/</span>
            <button
              onClick={() => setLang('fr')}
              style={{ fontWeight: lang === 'fr' ? 'bold' : 'normal' }}
            >
              Fr
            </button>
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              onBuyClick();
            }}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            {t[lang].buyWines}
          </button>
        </div>
      </div>

      {/* Media query overrides in style tag */}
      <style>{`
        @media (max-width: 768px) {
          header {
            display: none !important;
          }
          .mobile-header {
            display: flex !important;
          }
          .mobile-menu-overlay {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
