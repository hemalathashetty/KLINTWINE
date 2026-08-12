import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeritageProps {
  lang: 'en' | 'fr';
}

export default function Heritage({ lang }: HeritageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      eyebrow: 'HERITAGE',
      titleLine1: 'Austria: Land',
      titleLine2: 'of Art and Wine',
      desc: 'Klimt Wine follows the quiet rhythm of the vineyard, from generous tables to open fields and golden evening light.'
    },
    fr: {
      eyebrow: 'HÉRITAGE',
      titleLine1: 'Autriche : Terre',
      titleLine2: "d'Art et de Vin",
      desc: 'Le vin Klimt suit le rythme tranquille du vignoble, des tables généreuses aux champs ouverts et à la lumière dorée du soir.'
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveals
      gsap.fromTo(
        [titleRef.current, descRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1
          }
        }
      );

      // 2. Sequential zoom highlight animation on scroll for each of the 3 cards
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      cards.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.85, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' },
          {
            scale: 1.12,
            opacity: 1,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 0.8
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="heritage"
      style={{
        position: 'relative',
        backgroundColor: '#ECE9E5',
        padding: '120px 60px',
        overflow: 'hidden'
      }}
    >
      <div className="diamond-bg" style={{ opacity: 0.02 }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '30px',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          alignItems: 'center'
        }}
      >
        {/* Main Text Content (Left Column) */}
        <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p className="textStyle_metadata" style={{ opacity: 0.65, letterSpacing: '0.15em' }}>
            {t[lang].eyebrow}
          </p>
          <div ref={titleRef}>
            <h2
              className="textStyle_heading1"
              style={{
                fontFamily: "'Canela', serif",
                fontSize: 'clamp(3rem, 5.5vw, 6rem)',
                fontWeight: 100,
                lineHeight: 1.0
              }}
            >
              <span style={{ display: 'block' }}>{t[lang].titleLine1}</span>
              <span style={{ display: 'block', fontStyle: 'italic', paddingLeft: '20px' }}>{t[lang].titleLine2}</span>
            </h2>
          </div>
          <p
            ref={descRef}
            className="textStyle_bodyText"
            style={{ opacity: 0.8, maxWidth: '420px', lineHeight: 1.6 }}
          >
            {t[lang].desc}
          </p>
        </div>

        {/* Asymmetric Floating Cards Layout with Video Intro */}
        <div
          style={{
            gridColumn: 'span 7',
            position: 'relative',
            minHeight: '620px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {/* Intro Video Element */}
          <div
            style={{
              position: 'absolute',
              top: '-5%',
              right: '5%',
              width: '280px',
              height: '180px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              zIndex: 5
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/uploads/video_intro_frame_9449627751.webp"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="/uploads/video_intro_c5a431e24b.webm" type="video/webm" />
            </video>
          </div>

          {/* Card 1: Rectangle 17880 */}
          <div
            ref={card1Ref}
            style={{
              position: 'absolute',
              top: '10%',
              left: '5%',
              width: '340px',
              height: '220px',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-out',
              zIndex: 3
            }}
          >
            <img
              src="/uploads/Rectangle_17880_copy_538dd50133.webp"
              alt="Klimt heritage vineyard"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Card 2: Rectangle 17881 */}
          <div
            ref={card2Ref}
            style={{
              position: 'absolute',
              top: '40%',
              right: '10%',
              width: '360px',
              height: '230px',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-out',
              zIndex: 4
            }}
          >
            <img
              src="/uploads/Rectangle_17881_copy_27fdadcad6.webp"
              alt="Esterhazy estate history"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Card 3: Rectangle 44 */}
          <div
            ref={card3Ref}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '12%',
              width: '350px',
              height: '210px',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.2s ease-out',
              zIndex: 2
            }}
          >
            <img
              src="/uploads/Rectangle_44_copy_1ec4e5172a.webp"
              alt="Austrian vineyard fields"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
