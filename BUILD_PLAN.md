# BUILD_PLAN – Joker Nightlife Redesign

## Datei-/Komponentenstruktur

```
/
├── index.html                 (One-Pager: Hero → Events → Locations → Nightshots → VIP → Infos → Anfahrt → Kontakt → Footer)
├── impressum.html
├── datenschutz.html
├── disclaimer.html
│
├── events/
│   ├── 1-euro-maerz.html
│   ├── the-saints.html
│   ├── forever-young.html
│   ├── sturmfrei-lingen.html
│   ├── abicardi.html
│   ├── doppel-1-euro.html
│   ├── casino-night.html
│   ├── ak-live.html
│   └── club-40.html
│
├── locations/
│   ├── jolly.html
│   ├── mainhall.html
│   ├── swing.html
│   ├── black.html
│   ├── outdoor.html
│   ├── cocktailbar.html
│   └── beach.html
│
├── nightshots/
│   ├── yung-yury.html, juliansommer.html, ak.html, jazeek.html
│   ├── gzuz.html, summer-cem.html, azet.html, mish.html
│   ├── kc-rebell.html, breitner.html, heat.html, isi.html
│   ├── tweekaz.html, noisetime.html
│
├── css/
│   ├── reset.css
│   ├── tokens.css        (Custom Properties: Farben, Spacing, Typo, Transitions)
│   ├── base.css          (Body, Typography, Links, Focus)
│   ├── components.css    (Navbar, Cards, Lightbox, Cookie-Banner, Formular)
│   ├── sections.css      (Hero, Events, Locations, Nightshots, VIP, Infos, Anfahrt, Footer)
│   └── utilities.css     (Container, Grid-Helper, Reveal-Animationen)
│
└── js/
    ├── main.js           (Navbar, Mobile-Menü, Scroll-Reveal, Parallax, Cookie-Banner)
    ├── lightbox.js       (Lightbox: ESC, Pfeiltasten, Swipe, Focus-Trap)
    ├── gallery.js        (Nightshots-Slider, Gallery-Grid auf Subseiten)
    └── form.js           (Kontaktformular: Honeypot, Validation, mailto-Fallback)
```

## Design-Tokens

- Bg: `#0a0612` | Primary: `#ff2dd4` | Secondary: `#22e1ff`
- Text: `#f5f3ff` | Muted: `#9d8fcc`
- Display-Font: Bebas Neue | Body-Font: Inter
- Übergänge: 250ms ease | Glow: `0 0 20px currentColor`

## Komponentenplan

| Komponente       | Implementierung                                    |
|------------------|----------------------------------------------------|
| Sticky Navbar    | Position sticky, Mobile fullscreen Overlay          |
| Event-Card       | 16:9 Bild, Datum-Pill, Hover: lift+glow+zoom       |
| Location-Card    | Quadratisch, Hover-Panel mit Musikrichtung          |
| Nightshots-Slider| Thumbnails + Prev/Next, Klick → Artist-Seite       |
| Lightbox         | Vanilla JS, ESC/Pfeiltasten/Swipe/Focus-Trap       |
| Infos-Akkordeon  | Pure CSS + minimal JS, ARIA                        |
| Kontaktformular  | Honeypot + Client-Validation + mailto-Fallback     |
| Cookie-Banner    | Minimal, kein Choice-Layer da kein Analytics       |
| JSON-LD          | NightClub-Schema auf index.html                    |
