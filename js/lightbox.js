'use strict';

class Lightbox {
  constructor(items) {
    this.items = items; // array of { src, alt }
    this.idx = 0;
    this.overlay = null;
    this.img = null;
    this.counter = null;
    this._touchStartX = 0;
    this._build();
    this._bind();
  }

  _build() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'lightbox-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-label', 'Bildansicht');

    const wrap = document.createElement('div');
    wrap.className = 'lightbox-img-wrap';

    const close = document.createElement('button');
    close.className = 'lightbox-close';
    close.innerHTML = '&times;';
    close.setAttribute('aria-label', 'Schließen');

    this.img = document.createElement('img');
    this.img.alt = '';

    wrap.append(close, this.img);

    const prev = document.createElement('button');
    prev.className = 'lightbox-prev';
    prev.innerHTML = '&#8592;';
    prev.setAttribute('aria-label', 'Vorheriges Bild');

    const next = document.createElement('button');
    next.className = 'lightbox-next';
    next.innerHTML = '&#8594;';
    next.setAttribute('aria-label', 'Nächstes Bild');

    this.counter = document.createElement('div');
    this.counter.className = 'lightbox-counter';
    this.counter.setAttribute('aria-live', 'polite');

    this.overlay.append(wrap, prev, next, this.counter);
    document.body.appendChild(this.overlay);

    close.addEventListener('click', () => this.close());
    prev.addEventListener('click', () => this._step(-1));
    next.addEventListener('click', () => this._step(1));
    this._prevBtn = prev;
    this._nextBtn = next;
  }

  _bind() {
    this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });

    document.addEventListener('keydown', e => {
      if (!this.overlay.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft')  this._step(-1);
      if (e.key === 'ArrowRight') this._step(1);
    });

    this.overlay.addEventListener('touchstart', e => { this._touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    this.overlay.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - this._touchStartX;
      if (Math.abs(dx) > 50) this._step(dx < 0 ? 1 : -1);
    });
  }

  open(idx) {
    this.idx = idx;
    this._update();
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    this._prevBtn.focus();
  }

  close() {
    this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  _step(dir) {
    this.idx = (this.idx + dir + this.items.length) % this.items.length;
    this._update();
  }

  _update() {
    const item = this.items[this.idx];
    this.img.src = item.src;
    this.img.alt = item.alt || '';
    this.counter.textContent = `${this.idx + 1} / ${this.items.length}`;
  }
}

/* Init on gallery pages */
function initGalleryLightbox() {
  const items = Array.from(document.querySelectorAll('.gallery-item')).map(el => ({
    src: el.getAttribute('data-full') || el.querySelector('img')?.src,
    alt: el.querySelector('img')?.alt || ''
  }));
  if (!items.length) return;

  const lb = new Lightbox(items);
  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.addEventListener('click', () => lb.open(i));
    el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', `Bild ${i + 1} vergrößern`);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lb.open(i); } });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleryLightbox);
} else {
  initGalleryLightbox();
}

window.Lightbox = Lightbox;
