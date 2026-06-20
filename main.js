/**
 * main.js — DESIGN2 Dayak Wedding Entry Point
 * Santi & Agung · 28 Maret 2026
 */

import { initCover }    from './assets/js/cover.js';
import { initCountdown } from './assets/js/countdown.js';
import { initGallery }   from './assets/js/gallery.js';
import { initRSVP }      from './assets/js/rsvp.js';
import { initWishes }    from './assets/js/wishes.js';
import { initAnimate }   from './assets/js/animate.js';
import {
  copyToClipboard,
  addToCalendar,
  initScrollTop,
  initMusic,
  initShare,
  spawnPetals,
  spawnParticles,
  initVideoEmbed,
} from './assets/js/utils.js';

document.addEventListener('DOMContentLoaded', () => {

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  initCover();
  window.addEventListener('hero:enter', onMainEnter, { once: true });

  initScrollTop('btn-scroll-top');
  initMusic('btn-music', 'bg-music');
  initShare('btn-share-toggle', 'share-options');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (btn) copyToClipboard(btn.dataset.copy, btn);
  });
});

function onMainEnter() {
  initRSVP();

  document.getElementById('btn-cal-akad')?.addEventListener('click', () => {
    addToCalendar({
      title:    'Akad Nikah Santi & Agung',
      startUTC: '20260328T000000Z',
      endUTC:   '20260328T020000Z',
      location: 'Masjid Al-Muhajirin, Jl. Dahlia No. 12, Samarinda',
    });
  });
  document.getElementById('btn-cal-resepsi')?.addEventListener('click', () => {
    addToCalendar({
      title:    'Resepsi Pernikahan Santi & Agung',
      startUTC: '20260328T030000Z',
      endUTC:   '20260328T060000Z',
      location: 'Gedung Serbaguna Harapan, Jl. Mahakam No. 5, Samarinda',
    });
  });

  initVideoEmbed('video-frame', 'video-thumb', 'video-caption', 'dQw4w9WgXcQ');
  initCountdown();
  initGallery();
  initWishes();
  spawnPetals('hero-petals', 18);
  spawnParticles('hero-particles', 24);

  // Animate: semua setelah render selesai
  initAnimate();

  // Parallax ringan hero
  initParallax();
}

function initParallax() {
  if (!window.gsap || !window.ScrollTrigger) return;
  ScrollTrigger.refresh();
  gsap.to('#hero .hero-photo-wrap', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    y: 80,
  });
  gsap.to('#hero .hero-text', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.0 },
    y: 44,
  });
}
