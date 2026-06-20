/**
 * animate.js — Custom scroll animation engine (DESIGN2)
 * - Hero  : langsung animasi tanpa scroll
 * - Quote : fade in masuk, fade out keluar
 * - Couple: bride dari kiri, groom dari kanan, reverse saat keluar
 * - Lainnya: fade-up/zoom-in masuk, fade out keluar
 */

export function initAnimate() {
  heroEntrance();
  observeQuote();
  observeCouple();
  observeGeneral();
}

function heroEntrance() {
  const items = [
    { sel: '#hero .hero-dayak-tag',   delay: 0   },
    { sel: '#hero .hero-tag',         delay: 120 },
    { sel: '#hero .hero-names',       delay: 260 },
    { sel: '#hero .hero-caption',     delay: 400 },
    { sel: '#hero .hero-date-pill',   delay: 520 },
    { sel: '#hero .hero-photo-frame', delay: 300 },
  ];

  items.forEach(({ sel, delay }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity    = '0';
    el.style.transform  = sel.includes('photo') ? 'scale(0.88)' : 'translateY(32px)';
    el.style.transition = 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)';
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    }, delay);
  });
}

function observeQuote() {
  const card = document.querySelector('#quote .quote-card');
  if (!card) return;

  card.style.transition = 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)';
  card.style.opacity    = '0';
  card.style.transform  = 'translateY(36px)';

  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      card.style.opacity   = entry.isIntersecting ? '1' : '0';
      card.style.transform = entry.isIntersecting ? 'none' : 'translateY(36px)';
    });
  }, { threshold: 0.15 }).observe(card);
}

function observeCouple() {
  const bride = document.querySelector('#couple .couple-card:first-of-type');
  const amp   = document.querySelector('#couple .ampersand-div');
  const groom = document.querySelector('#couple .couple-card:last-of-type');
  const tr    = 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)';

  if (bride) { bride.style.cssText += `transition:${tr};opacity:0;transform:translateX(-60px);`; }
  if (groom) { groom.style.cssText += `transition:${tr};opacity:0;transform:translateX(60px);`; }
  if (amp)   { amp.style.cssText   += `transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);opacity:0;transform:scale(0.7);`; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.style.opacity = '1'; el.style.transform = 'none';
      } else {
        el.style.opacity = '0';
        if (el === bride) el.style.transform = 'translateX(-60px)';
        if (el === groom) el.style.transform = 'translateX(60px)';
        if (el === amp)   el.style.transform = 'scale(0.7)';
      }
    });
  }, { threshold: 0.18 });

  if (bride) io.observe(bride);
  if (groom) io.observe(groom);
  if (amp)   io.observe(amp);
}

function observeGeneral() {
  const skip = new Set([
    ...document.querySelectorAll('#quote .quote-card'),
    ...document.querySelectorAll('#couple .couple-card'),
    ...document.querySelectorAll('#couple .ampersand-div'),
  ]);

  const initTransform = {
    'fade-up':    'translateY(40px)',
    'fade-right': 'translateX(-44px)',
    'fade-left':  'translateX(44px)',
    'zoom-in':    'scale(0.88)',
    'fade':       'none',
  };

  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (skip.has(el)) return;
    const type     = el.getAttribute('data-reveal');
    const delay    = el.getAttribute('data-reveal-delay');
    const tr       = initTransform[type] || 'translateY(40px)';
    const delayVal = delay ? `${parseInt(delay) / 1000}s` : '0s';

    el.style.opacity    = '0';
    el.style.transform  = tr;
    el.style.transition = `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delayVal}, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delayVal}`;
    el.style.willChange = 'opacity, transform';

    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        el.style.opacity   = entry.isIntersecting ? '1' : '0';
        el.style.transform = entry.isIntersecting ? 'none' : tr;
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }).observe(el);
  });
}
