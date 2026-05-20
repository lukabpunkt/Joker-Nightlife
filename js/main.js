'use strict';

/* ===== NAVBAR ===== */
const navbar   = document.querySelector('.navbar');
const burger   = document.querySelector('.navbar__burger');
const overlay  = document.querySelector('.nav-overlay');
const backdrop = document.querySelector('.nav-overlay__backdrop');
const closeBtn = document.querySelector('.nav-overlay__close');
const navLinks = document.querySelectorAll('.nav-overlay__link');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 5);
  }, { passive: true });
}

if (burger && overlay) {
  const openMenu = () => {
    burger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('open');
    backdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };
  const closeMenu = () => {
    burger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('open');
    backdrop?.classList.remove('open');
    document.body.style.overflow = '';
    burger.focus();
  };

  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
  });
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
const revealEls = document.querySelectorAll('.reveal, .stagger');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
}

/* ===== HERO PARALLAX ===== */
const heroBg = document.querySelector('.hero__bg');
if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.35}px)`;
  }, { passive: true });
}

/* ===== HERO PARTICLES ===== */
const particleContainer = document.querySelector('.hero__particles');
if (particleContainer) {
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 6}s`;
    p.style.animationDuration = `${4 + Math.random() * 5}s`;
    p.style.width = p.style.height = `${1 + Math.random() * 2}px`;
    p.style.background = Math.random() > 0.5 ? 'var(--clr-primary)' : 'var(--clr-secondary)';
    particleContainer.appendChild(p);
  }
}

/* ===== NIGHTSHOTS SLIDER ===== */
const track = document.querySelector('.nightshots-track');
const btnPrev = document.querySelector('.slider-btn--prev');
const btnNext = document.querySelector('.slider-btn--next');

if (track && btnPrev && btnNext) {
  const step = () => {
    const thumb = track.querySelector('.nightshots-thumb');
    return thumb ? thumb.offsetWidth + 12 : 212;
  };
  btnPrev.addEventListener('click', () => { track.scrollBy({ left: -step() * 3, behavior: 'smooth' }); });
  btnNext.addEventListener('click', () => { track.scrollBy({ left:  step() * 3, behavior: 'smooth' }); });
}

/* ===== ACCORDION ===== */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (panel) panel.classList.toggle('open', !expanded);
  });
});

/* ===== MAP ===== */
/* iframe loads directly via src attribute */

/* ===== COOKIE BANNER ===== */
const cookieBanner = document.querySelector('.cookie-banner');
const cookieBtn = document.querySelector('.cookie-accept');

if (cookieBanner) {
  if (!localStorage.getItem('cookieOk')) {
    setTimeout(() => cookieBanner.classList.remove('hidden'), 1500);
  } else {
    cookieBanner.remove();
  }
  cookieBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieOk', '1');
    cookieBanner.classList.add('hidden');
    setTimeout(() => cookieBanner.remove(), 400);
  });
}

/* ===== COPYRIGHT YEAR ===== */
document.querySelectorAll('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });
