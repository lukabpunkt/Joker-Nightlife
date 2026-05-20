'use strict';

/* Loads gallery images from a JSON manifest per artist/location slug.
   Falls back gracefully if the JSON is absent (shows nothing extra). */

function initGallery(slug, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container || !slug) return;

  const basePath = container.getAttribute('data-path') || `../assets/images/nightshots/${slug}/`;

  /* Collect all already-rendered gallery items (static markup) and wire lightbox */
  const items = Array.from(container.querySelectorAll('.gallery-item')).map(el => ({
    src: el.getAttribute('data-full') || el.querySelector('img')?.src || '',
    alt: el.querySelector('img')?.alt || ''
  }));

  if (items.length && window.Lightbox) {
    const lb = new window.Lightbox(items);
    container.querySelectorAll('.gallery-item').forEach((el, i) => {
      el.addEventListener('click', () => lb.open(i));
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lb.open(i); }
      });
    });
  }
}

/* Nightshots slider on index.html: auto-populate from manifest */
function initNightshotsSlider() {
  const track = document.querySelector('.nightshots-track');
  if (!track) return;

  /* Thumbs are already in HTML markup; just wire them up */
  track.querySelectorAll('.nightshots-thumb').forEach(thumb => {
    const href = thumb.getAttribute('data-href');
    if (href) {
      thumb.addEventListener('click', () => { window.location.href = href; });
      thumb.setAttribute('tabindex', '0');
      thumb.setAttribute('role', 'link');
      thumb.setAttribute('aria-label', `Galerie: ${thumb.querySelector('.nightshots-thumb__label')?.textContent || ''}`);
      thumb.addEventListener('keydown', e => {
        if (e.key === 'Enter') window.location.href = href;
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initNightshotsSlider();
    const slug = document.body.getAttribute('data-gallery-slug');
    if (slug) initGallery(slug, '.gallery-grid');
  });
} else {
  initNightshotsSlider();
  const slug = document.body.getAttribute('data-gallery-slug');
  if (slug) initGallery(slug, '.gallery-grid');
}
