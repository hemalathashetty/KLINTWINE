import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface WineDropdownProps {
  lang: 'en' | 'fr';
  visible: boolean;
}

export default function WineDropdown({ lang, visible }: WineDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = {
    en: {
      label: 'Our Wines',
      veltliner: 'Grüner Veltliner',
      white: 'White Blend',
      red: 'Red Blend'
    },
    fr: {
      label: 'Nos Vins',
      veltliner: 'Grüner Veltliner',
      white: 'White Blend',
      red: 'Red Blend'
    }
  };

  const handleSelect = (idx: number) => {
    setIsOpen(false);
    const showcaseEl = document.getElementById('showcase');
    if (showcaseEl) {
      // Offset values matching each wine panel progress in ScrollTrigger scrub
      const scrollOffset = showcaseEl.offsetTop + window.innerHeight * idx;
      window.scrollTo({
        top: scrollOffset + 10, // Slight buffer to trigger ScrollTrigger state update
        behavior: 'smooth'
      });
    }
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'MonumentGrotesk', sans-serif"
      }}
    >
      {/* Expanded Dropdown Menu Overlay */}
      {isOpen && (
        <div
          className="glass-pill"
          style={{
            bottom: '60px',
            position: 'absolute',
            width: '210px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '8px 0',
            boxShadow: '0 10px 30px rgba(25,23,20,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            zIndex: 501,
            border: '1px solid rgba(25,23,20,0.08)'
          }}
        >
          <button
            onClick={() => handleSelect(0)}
            style={{
              padding: '12px 20px',
              textAlign: 'left',
              fontSize: '0.85rem',
              color: '#191714',
              width: '100%',
              transition: 'background-color 0.2s',
              borderBottom: '1px solid rgba(25,23,20,0.04)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(25,23,20,0.04)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {t[lang].veltliner}
          </button>
          <button
            onClick={() => handleSelect(1)}
            style={{
              padding: '12px 20px',
              textAlign: 'left',
              fontSize: '0.85rem',
              color: '#191714',
              width: '100%',
              transition: 'background-color 0.2s',
              borderBottom: '1px solid rgba(25,23,20,0.04)'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(25,23,20,0.04)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {t[lang].white}
          </button>
          <button
            onClick={() => handleSelect(2)}
            style={{
              padding: '12px 20px',
              textAlign: 'left',
              fontSize: '0.85rem',
              color: '#191714',
              width: '100%',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgba(25,23,20,0.04)')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {t[lang].red}
          </button>
        </div>
      )}

      {/* Dropdown Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          height: '48px',
          borderRadius: '35px',
          backgroundColor: '#ffffff',
          color: '#191714',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '4px 16px 4px 4px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          cursor: 'pointer',
          border: '1px solid rgba(25, 23, 20, 0.06)',
          zIndex: 502
        }}
      >
        {/* Left Miniature Preview Icons of all 3 bottles */}
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ECE9E5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <img
            src="/uploads/gruner_veltliner_632b1976ea.webp"
            alt=""
            style={{
              height: '78%',
              objectFit: 'contain',
              position: 'absolute',
              left: '6px',
              bottom: '4px',
              zIndex: 1,
              transform: 'rotate(-4deg)'
            }}
          />
          <img
            src="/uploads/white_blend_3978284690.webp"
            alt=""
            style={{
              height: '78%',
              objectFit: 'contain',
              position: 'absolute',
              left: '14px',
              bottom: '4px',
              zIndex: 3,
              transform: 'rotate(0deg)'
            }}
          />
          <img
            src="/uploads/red_blend_e2fec91509.webp"
            alt=""
            style={{
              height: '78%',
              objectFit: 'contain',
              position: 'absolute',
              left: '22px',
              bottom: '4px',
              zIndex: 2,
              transform: 'rotate(4deg)'
            }}
          />
        </div>

        {/* Text */}
        <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.02em' }}>
          {t[lang].label}
        </span>

        {/* Chevron Icon */}
        <span
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#F4F2EF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '4px'
          }}
        >
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
    </div>
  );
}
