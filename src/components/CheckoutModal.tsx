import { useState } from 'react';
import { X, Plus, Minus, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  lang: 'en' | 'fr';
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

export default function CheckoutModal({ lang, isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2>(1); // 1: Cart/Form, 2: Success
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'veltliner',
      name: '2023 KLIMT Grüner Veltliner',
      price: 32.0,
      qty: 1,
      img: '/uploads/gruner_veltliner_632b1976ea.webp'
    },
    {
      id: 'white',
      name: '2022 KLIMT White Blend',
      price: 38.0,
      qty: 0,
      img: '/uploads/white_blend_3978284690.webp'
    },
    {
      id: 'red',
      name: '2021 KLIMT Red Blend',
      price: 44.0,
      qty: 0,
      img: '/uploads/red_blend_e2fec91509.webp'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    card: ''
  });

  const t = {
    en: {
      title: 'Klimt Wines Collection',
      subtitle: 'Premium art-wine directly to your door.',
      item: 'Select Wines',
      price: 'Price',
      qty: 'Quantity',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total',
      nameLabel: 'Full Name',
      emailLabel: 'Email Address',
      addressLabel: 'Shipping Address',
      cardLabel: 'Card Details',
      checkoutBtn: 'Place Order',
      successTitle: 'Order Placed successfully!',
      successDesc: 'Thank you for choosing KLIMT Wines. A verification email will be sent to you shortly.',
      free: 'Free Shipping',
      closeBtn: 'Close'
    },
    fr: {
      title: 'Collection Vins Klimt',
      subtitle: 'L\'art et le vin haut de gamme directement chez vous.',
      item: 'Sélectionner les Vins',
      price: 'Prix',
      qty: 'Quantité',
      subtotal: 'Sous-total',
      shipping: 'Livraison',
      total: 'Total',
      nameLabel: 'Nom Complet',
      emailLabel: 'Adresse E-mail',
      addressLabel: 'Adresse de Livraison',
      cardLabel: 'Informations de Carte',
      checkoutBtn: 'Passer la Commande',
      successTitle: 'Commande validée avec succès !',
      successDesc: 'Merci de votre confiance en KLIMT Wines. Un e-mail de confirmation vous sera envoyé très bientôt.',
      free: 'Livraison Gratuite',
      closeBtn: 'Fermer'
    }
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const total = subtotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subtotal === 0) return;
    setStep(2);
  };

  const handleClose = () => {
    setStep(1);
    setFormData({ name: '', email: '', address: '', card: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25, 23, 20, 0.65)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#191714',
        fontFamily: "'MonumentGrotesk', sans-serif"
      }}
    >
      <div
        className="glass-pill"
        style={{
          width: '100%',
          maxWidth: '960px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: step === 1 ? '1.1fr 0.9fr' : '1fr',
          position: 'relative',
          transition: 'all 0.5s ease'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close checkout modal"
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            cursor: 'pointer',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#ECE9E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#191714',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <X size={18} />
        </button>

        {step === 1 ? (
          <>
            {/* Left Column: Cart & Items selection */}
            <div style={{ padding: '40px', borderRight: '1px solid rgba(25, 23, 20, 0.08)', backgroundColor: '#F9F8F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <ShoppingBag size={22} style={{ color: '#191714' }} />
                <h2 id="checkout-title" className="textStyle_heading3" style={{ fontSize: '1.8rem', margin: 0 }}>
                  {t[lang].title}
                </h2>
              </div>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '32px' }}>
                {t[lang].subtitle}
              </p>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(25, 23, 20, 0.05)',
                      paddingBottom: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          width: '48px',
                          height: '64px',
                          backgroundColor: '#ECE9E5',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <img src={item.img} alt="" style={{ height: '90%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.82rem', opacity: 0.65 }}>
                          ${item.price.toFixed(2)} USD
                        </span>
                      </div>
                    </div>

                    {/* Quantity selectors */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid rgba(25,23,20,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: '1px solid rgba(25,23,20,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order pricing details */}
              <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.7 }}>
                  <span>{t[lang].subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.7 }}>
                  <span>{t[lang].shipping}</span>
                  <span style={{ color: '#8f7734', fontWeight: 500 }}>{t[lang].free}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderTop: '1px solid rgba(25,23,20,0.1)',
                    paddingTop: '16px',
                    marginTop: '8px'
                  }}
                >
                  <span>{t[lang].total}</span>
                  <span>${total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout form details */}
            <form onSubmit={handleSubmit} style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CreditCard size={18} />
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Checkout Details
                </h3>
              </div>

              {/* Form Input fields */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px', fontWeight: 500 }}>
                  {t[lang].nameLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Gustav Klimt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(25,23,20,0.15)',
                    backgroundColor: '#F9F8F6'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px', fontWeight: 500 }}>
                  {t[lang].emailLabel}
                </label>
                <input
                  type="email"
                  required
                  placeholder="gustav@klimtwine.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(25,23,20,0.15)',
                    backgroundColor: '#F9F8F6'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px', fontWeight: 500 }}>
                  {t[lang].addressLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="Schloss Esterházy, Burgenland, Austria"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(25,23,20,0.15)',
                    backgroundColor: '#F9F8F6'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '6px', fontWeight: 500 }}>
                  {t[lang].cardLabel}
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4000 1234 5678 9010"
                  value={formData.card}
                  onChange={(e) => setFormData({ ...formData, card: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(25,23,20,0.15)',
                    backgroundColor: '#F9F8F6'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={subtotal === 0}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '14px',
                  backgroundColor: '#191714',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  cursor: subtotal > 0 ? 'pointer' : 'not-allowed',
                  opacity: subtotal > 0 ? 1 : 0.45,
                  transition: 'opacity 0.2s'
                }}
              >
                {t[lang].checkoutBtn}
              </button>
            </form>
          </>
        ) : (
          /* Step 2: Success Screen */
          <div
            style={{
              padding: '60px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '24px'
            }}
          >
            <CheckCircle size={64} style={{ color: '#8f7734' }} />
            <h2 className="textStyle_heading2" style={{ fontFamily: "'Canela', serif", margin: 0 }}>
              {t[lang].successTitle}
            </h2>
            <p style={{ fontSize: '0.95rem', opacity: 0.75, maxWidth: '480px', lineHeight: 1.6 }}>
              {t[lang].successDesc}
            </p>
            <button
              onClick={handleClose}
              style={{
                marginTop: '16px',
                padding: '12px 30px',
                backgroundColor: '#191714',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              {t[lang].closeBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
