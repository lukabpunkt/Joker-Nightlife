'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =============================================
   1. CUSTOM GLOW CURSOR (desktop only)
   ============================================= */
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !('ontouchstart' in window)) {
  const glowLarge = document.createElement('div');
  const glowDot   = document.createElement('div');
  glowLarge.className = 'cursor-glow cursor-glow--large';
  glowDot.className   = 'cursor-glow cursor-glow--dot';
  document.body.append(glowLarge, glowDot);

  let mx = -999, my = -999;
  let lx = -999, ly = -999;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    glowDot.style.left = mx + 'px';
    glowDot.style.top  = my + 'px';
  });

  // Large glow follows with smooth lerp
  (function raf() {
    lx += (mx - lx) * 0.08;
    ly += (my - ly) * 0.08;
    glowLarge.style.left = lx + 'px';
    glowLarge.style.top  = ly + 'px';
    requestAnimationFrame(raf);
  })();

  // Grow on hoverable elements
  const hoverTargets = 'a, button, .event-card, .location-card, .nightshots-thumb';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverTargets)) glowLarge.classList.add('cursor-glow--hover');
    else glowLarge.classList.remove('cursor-glow--hover');
  });
}


/* =============================================
   2. TEXT SCRAMBLE on section titles
   ============================================= */
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!';

function scrambleText(el) {
  if (el.dataset.scrambled) return;
  el.dataset.scrambled = '1';

  const original = el.textContent.trim();
  const len = original.length;
  let frame = 0;
  const totalFrames = len * 2.2;

  const tick = setInterval(() => {
    el.textContent = original.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (i < frame / 2.2) return original[i];
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');
    frame++;
    if (frame > totalFrames) {
      clearInterval(tick);
      el.textContent = original;
    }
  }, 30);
}

// Observe section titles — trigger scramble when visible
if (!reducedMotion) {
  const scrambleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title').forEach(el => scrambleObserver.observe(el));
}


/* =============================================
   3. 3D CARD TILT
   ============================================= */
if (!reducedMotion && !('ontouchstart' in window)) {
  document.querySelectorAll('.event-card, .location-card').forEach(card => {
    // Inject shine layer
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    card.appendChild(shine);
    card.style.transformStyle = 'preserve-3d';

    const MAX_TILT = 10;

    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const x     = e.clientX - rect.left;
      const y     = e.clientY - rect.top;
      const cx    = rect.width  / 2;
      const cy    = rect.height / 2;
      const rotX  = ((y - cy) / cy) * -MAX_TILT;
      const rotY  = ((x - cx) / cx) *  MAX_TILT;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
      shine.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.13) 0%, transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      shine.style.background = '';
    });
  });
}


/* =============================================
   4. STAT COUNTER ANIMATION
   ============================================= */
function animateCounter(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';

  const target  = parseFloat(el.dataset.target);
  const isFloat = el.dataset.target.includes('.');
  const suffix  = el.dataset.suffix || '';
  const duration = 1800;
  const start    = performance.now();

  const tick = now => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (!reducedMotion) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
}


/* =============================================
   PAGE LOADER
   ============================================= */
const loader = document.getElementById('page-loader');
if (loader) {
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1600);
  });
  // Fallback: hide after 3s even if load doesn't fire
  setTimeout(() => loader.classList.add('hidden'), 3000);
}


/* =============================================
   AGE GATE
   ============================================= */
const ageGate = document.getElementById('age-gate');
if (ageGate) {
  const verified = localStorage.getItem('age-verified');
  if (!verified) {
    // Show after loader hides
    setTimeout(() => ageGate.classList.add('visible'), 1800);
  }
  document.getElementById('age-yes')?.addEventListener('click', () => {
    localStorage.setItem('age-verified', '1');
    ageGate.style.opacity = '0';
    setTimeout(() => ageGate.remove(), 400);
  });
  document.getElementById('age-no')?.addEventListener('click', () => {
    ageGate.innerHTML = `
      <div class="age-gate__box">
        <span style="font-size:3rem">🚫</span>
        <h2 class="age-gate__title" style="font-size:1.4rem">Zutritt verweigert</h2>
        <p class="age-gate__sub">Diese Seite ist nur für Personen ab 18 Jahren.</p>
      </div>`;
  });
}


/* =============================================
   FLOATING TICKET BUTTON
   ============================================= */
const floatTicket = document.getElementById('float-ticket');
if (floatTicket) {
  const heroSection = document.querySelector('.hero');
  const footer      = document.querySelector('.footer');

  const checkFloat = () => {
    if (!heroSection) return;
    const heroBottom  = heroSection.getBoundingClientRect().bottom;
    const footerTop   = footer ? footer.getBoundingClientRect().top : Infinity;
    const inHero      = heroBottom > 0;
    const nearFooter  = footerTop < window.innerHeight + 100;
    if (!inHero && !nearFooter) {
      floatTicket.classList.add('visible');
    } else {
      floatTicket.classList.remove('visible');
    }
  };
  window.addEventListener('scroll', checkFloat, { passive: true });
  checkFloat();
}


/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const doc      = document.documentElement;
    const scrolled = doc.scrollTop;
    const total    = doc.scrollHeight - doc.clientHeight;
    progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
}


/* =============================================
   EVENT COUNTDOWN TIMERS
   ============================================= */
function buildCountdown(card) {
  const dateStr = card.dataset.date;
  if (!dateStr) return;

  const target = new Date(dateStr + 'T22:00:00');
  if (isNaN(target)) return;

  const countdown = document.createElement('div');
  countdown.className = 'event-countdown';
  countdown.innerHTML = `
    <div class="event-countdown__unit"><span class="event-countdown__num cd-days">--</span><span class="event-countdown__label">Tage</span></div>
    <span class="event-countdown__sep">:</span>
    <div class="event-countdown__unit"><span class="event-countdown__num cd-hours">--</span><span class="event-countdown__label">Std</span></div>
    <span class="event-countdown__sep">:</span>
    <div class="event-countdown__unit"><span class="event-countdown__num cd-mins">--</span><span class="event-countdown__label">Min</span></div>
    <span class="event-countdown__sep">:</span>
    <div class="event-countdown__unit"><span class="event-countdown__num cd-secs">--</span><span class="event-countdown__label">Sek</span></div>`;
  card.appendChild(countdown);

  const pad = n => String(n).padStart(2, '0');

  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) {
      countdown.innerHTML = `<span style="font-family:var(--ff-display);color:var(--clr-primary);letter-spacing:0.1em;font-size:0.9rem">HEUTE NACHT 🎉</span>`;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    countdown.querySelector('.cd-days').textContent  = pad(d);
    countdown.querySelector('.cd-hours').textContent = pad(h);
    countdown.querySelector('.cd-mins').textContent  = pad(m);
    countdown.querySelector('.cd-secs').textContent  = pad(s);
  };

  tick();
  setInterval(tick, 1000);
}

document.querySelectorAll('.event-card[data-date]').forEach(buildCountdown);
