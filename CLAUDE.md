# Auftrag: Redesign der Website joker-nightlife.de

Hallo Claude Code – du bekommst dieses Projekt mit allen Inhalten und Bildern der bestehenden Website. **Bitte führe diesen Auftrag eigenständig von Anfang bis Ende aus.** Starte sofort, ohne zu fragen, ob du loslegen sollst. Frage nur dann zurück, wenn du an einer inhaltlichen Stelle wirklich unsicher bist.

## Phase 0 – Setup (mach das als allererstes)

1. Prüfe, ob `assets/images/` schon Inhalte hat. Wenn der Ordner leer ist:
   ```bash
   cd assets && bash download-assets.sh && cd ..
   ```
   Das Script lädt alle Original-Bilder und das Muttizettel-PDF vom joker-nightlife.de Server in die korrekte Struktur. Lass das durchlaufen, bevor du mit dem Bauen beginnst.

2. Lies in dieser Reihenfolge:
   - `README.md`
   - `SITEMAP.md`
   - `content/01-startseite.md`
   - `content/02-locations.md`
   - `content/03-events-aktuell.md`
   - `content/04-artist-archive.md`
   - `content/05-vip-lounges.md`
   - `content/06-infos.md`
   - `content/07-kontakt-anfahrt.md`
   - `content/08-impressum.md`, `09-datenschutz.md`, `10-disclaimer.md`

3. Schreibe einen kurzen `BUILD_PLAN.md` (max. 1 Seite) mit deiner geplanten Datei-/Komponentenstruktur.

## Phase 1 – Was du baust

Eine komplette Neugestaltung der Website **joker-nightlife.de** (Diskothek "Joker" in Lingen, seit über 35 Jahren, 7 Areas). **Alle Texte und Bilder bleiben erhalten** – nur Look & Feel modernisieren.

### Tech-Stack (zwingend)
- **Plain HTML, CSS, vanilla JavaScript.** Kein Build-Tool, kein npm, kein Framework, kein Tailwind-CDN, kein jQuery.
- Modernes CSS: Custom Properties, `clamp()`, Grid + Flex, `prefers-reduced-motion`.
- Vanilla JS für Lightbox, Mobile-Menü, Smooth Scroll, Form-Validation, IntersectionObserver-Reveals.
- Schriften per Google Fonts (`font-display: swap`): Display-Schrift (z. B. *Anton*, *Bebas Neue* oder *Unbounded*) + *Inter* für Body.
- Bilder responsive mit `<picture>` / `srcset`, alles Nicht-Kritische mit `loading="lazy"`.
- Lighthouse mind. 90 in allen vier Kategorien.

### Design-Direction: Modern & Neon
- **Dark Mode by default**, Hintergrund tief-dunkel (`#0a0612` – leicht violett-stichig, kein reines Schwarz).
- **Neon-Akzente** (max. 3 verwenden):
  - Primary: Hot-Magenta `#ff2dd4`
  - Secondary: Electric-Cyan `#22e1ff`
  - Text: Off-White `#f5f3ff`
  - Sekundärtext: muted Lavender/Grey
- **Glow-Effekte** auf Hover-States, sparsam.
- **Typografie**: massive Display-H1, uppercase/condensed; großzügige Body-Zeilenhöhe.
- **Mikro-Interaktionen**: Magnetic-Hover auf Cards, Skroll-Reveal via IntersectionObserver, leichter Parallax im Hero.
- **`prefers-reduced-motion` respektieren** – dann alle Animationen ruhig.

## Phase 2 – Seitenarchitektur

### `index.html` (One-Pager) – Sektionen in dieser Reihenfolge:
1. **Hero** – fullscreen, Claim *"SEIT ÜBER 35 JAHREN – DEINE PARTYADRESSE IN LINGEN"*, nächstes Event prominent, Scroll-Indikator.
2. **Events** – Card-Grid, jede Card → `events/<slug>.html`. Quelle: `content/03-events-aktuell.md`.
3. **Locations** – 7 Area-Cards (Jolly, Mainhall, Swing, Black, Outdoor, Cocktailbar, Beach). Hover zeigt Musikrichtung, Klick → `locations/<slug>.html`. Quelle: `content/02-locations.md`.
4. **Nightshots** – Slider mit Thumbnails, Klick öffnet jeweilige Artist-Seite. Quelle: `assets/images/nightshots/_thumbs/`.
5. **VIP Lounges & Dein Bereich** – zwei Cards. Quelle: `content/05-vip-lounges.md`.
6. **Infos** – Akkordeon (Muttizettel, Einlass, Öffnungstage, Fundsachen, Videoüberwachung, Foto, Dresscode). Quelle: `content/06-infos.md`.
7. **Anfahrt & Kontakt** – statisches Karten-Preview mit Klick-to-Activate für OpenStreetMap-Iframe (datenschutzfreundlich, **kein** Google Maps), Adresse, Telefon, E-Mail, Kontaktformular.
8. **Footer** – Social (FB, Instagram, Snapchat, TikTok), Links Impressum/Datenschutz/Disclaimer, Copyright (aktuelles Jahr).

### Subseiten – generiere sie alle:
- `events/<slug>.html` – eine pro Event aus `content/03-events-aktuell.md` (9 Events: 1-euro-maerz, the-saints, forever-young, sturmfrei-lingen, abicardi, doppel-1-euro, casino-night, ak-live, club-40).
- `locations/<slug>.html` – eine pro Area, Galerie aus `assets/images/locations/<slug>/`.
- `nightshots/<slug>.html` – eine pro Artist aus `content/04-artist-archive.md`, Galerie aus `assets/images/nightshots/<slug>/`.
- `impressum.html`, `datenschutz.html`, `disclaimer.html` – aus `content/08-`, `09-`, `10-`.

## Phase 3 – Datei-/Ordnerstruktur, die du anlegst

```
/
├── index.html
├── events/<slug>.html
├── locations/<slug>.html
├── nightshots/<slug>.html
├── impressum.html
├── datenschutz.html
├── disclaimer.html
├── css/
│   ├── reset.css
│   ├── tokens.css        (Custom Properties)
│   ├── base.css
│   ├── components.css
│   ├── sections.css
│   └── utilities.css
├── js/
│   ├── main.js
│   ├── lightbox.js
│   ├── gallery.js
│   └── form.js
├── assets/               (bleibt wie geliefert)
└── content/              (Quelle – im Live-Build nicht ausgeliefert)
```

## Phase 4 – Konkrete Komponenten

- **Sticky Navbar mobile-first**: Logo links, Burger rechts → Fullscreen-Overlay-Menü. Desktop: Inline-Links + CTA "Tickets" (wenn aktuelles Event ein Online-Ticket hat).
- **Event-Card**: 16:9 Bild, Datum-Pill, Headline, Hover: lift + Neon-Glow + sanfter Zoom.
- **Location-Card**: quadratisch, beim Hover schiebt sich Panel rein mit Musikrichtung + "Galerie ansehen".
- **Lightbox** (vanilla JS): ESC, Pfeiltasten, Swipe auf Mobile, Focus-Trap.
- **Kontaktformular**: Honeypot, Client-Validation, Submit als `mailto:`-Fallback (TODO-Kommentar für späteres Backend).
- **Cookie-Banner**: minimaler Hinweis – wenn keine Analytics aktiv sind, einfacher Hinweis ohne Choice-Layer.

## Phase 5 – Inhaltliche Korrekturen (beim Übernehmen)

Beim Original gibt es Widersprüche – im Redesign konsistent fixen:
- **Areas**: überall einheitlich **"7 Areas / Bereiche"**.
- **Jahre**: überall **"über 35 Jahre"**.
- **Copyright-Jahr**: aktuelles Jahr.
- **"Mainhall"** statt "Main".
- Agentur-Hinweis im Impressum/Footer wie in `content/08-impressum.md` markiert behandeln (Hinweis-Kommentare).

## Phase 6 – Was du NICHT tust

- Kein Inhalt erfinden, der nicht in `content/` steht. Wenn etwas fehlt → nachfragen, nicht halluzinieren.
- Keine Künstler-Quotes/-Texte erfinden, die nicht im Original stehen.
- Kein CSS-Framework, kein Tailwind, kein Bootstrap, kein jQuery, kein React.
- Kein Tracking/Analytics/Ads ohne expliziten Wunsch.

## Phase 7 – Anforderungen

- **Accessibility**: semantisches HTML, sichtbare Focus-States mit Neon-Outline, ARIA, Tastatur-Navigation überall, Lightbox mit Focus-Trap, WCAG AA Kontraste.
- **SEO**: per Seite eigene `<title>` + `<meta description>`, Open-Graph + Twitter-Card, JSON-LD `NightClub`-Schema (Adresse, Öffnungszeiten, Telefon, Geo, sameAs zu Social).
- **Performance**: Hero als `<picture>`, andere Bilder lazy, CSS < 60 KB, JS < 30 KB (unminified).

## Phase 8 – Abschluss

Wenn alle Seiten gebaut sind, schreibe eine **`BUILD_REPORT.md`** mit Checkliste:
- [ ] Alle Original-Texte aus `content/` übernommen
- [ ] Alle Bilder aus `assets/` eingebunden
- [ ] Alle Subseiten verlinkt
- [ ] Mobile geprüft (320 / 768 / 1280 / 1920 px)
- [ ] Lighthouse-Score (geschätzt) pro Hauptseite
- [ ] Bekannte TODOs / offene Punkte für den Owner

Danach gibst du eine kurze Zusammenfassung in der Chat-Antwort: was gebaut, was offen, was empfohlen als Next Steps.

---

## Bestätigung

Bestätige zu Beginn kurz, dass du diese `CLAUDE.md` gelesen hast und dass die wichtigsten Content-Dateien existieren. Liste dann deinen `BUILD_PLAN.md` und beginne mit dem Bauen. Auf Rückfragen zu trivialen Stil-Entscheidungen (Schriftgrößen, Spacing-Wahl, Card-Layouts) **verzichten** – einfach umsetzen.
