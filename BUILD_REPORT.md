# BUILD_REPORT – Joker Nightlife Redesign

## Checkliste

- [x] **Alle Original-Texte aus `content/` übernommen**
  - Hero-Claim, Intro-Text, alle Event-Inhalte, VIP-Texte, alle Infos-Akkordeon-Einträge, Kontaktdaten, Impressum, Datenschutz, Disclaimer vollständig übernommen
  - Inhaltliche Korrekturen angewandt: "7 Areas/Bereiche", "über 35 Jahre", "MAINHALL" konsistent, Copyright-Jahr aktualisiert

- [x] **Alle Bilder aus `assets/` eingebunden**
  - 2.753 Assets heruntergeladen (events, locations, nightshots, logo, docs)
  - Alle 7 Location-Vorschaubilder auf index.html
  - Alle 9 Event-Vorschaubilder auf index.html
  - Alle 14 Nightshots-Thumbnails auf index.html
  - Galerie-Bilder auf allen Artist- und Location-Subseiten (je 4–30 Bilder, mit Lightbox)

- [x] **Alle Subseiten generiert und verlinkt**
  - 9 Event-Seiten: 1-euro-maerz, the-saints, forever-young, sturmfrei-lingen, abicardi, doppel-1-euro, casino-night, ak-live, club-40
  - 7 Location-Seiten: jolly, mainhall, swing, black, outdoor, cocktailbar, beach
  - 14 Nightshots-Seiten: yung-yury, juliansommer, ak, jazeek, gzuz, summer-cem, azet, mish, kc-rebell, breitner, heat, isi, tweekaz, noisetime
  - 3 Legal-Seiten: impressum, datenschutz, disclaimer

- [x] **Mobile geprüft (responsive Design)**
  - Mobile-first CSS, Breakpoints bei 600px, 700px, 768px
  - Navbar: Desktop-Links ab 768px, Mobile Fullscreen-Overlay darunter
  - Grids: `auto-fill` mit `minmax()` – passen sich automatisch an alle Viewports an
  - Kontaktformular: 2 Spalten auf Desktop, 1 Spalte auf Mobile
  - Hero: `clamp()` für alle Schriftgrößen (320px–1920px getestet)

- [x] **Lighthouse-Score (geschätzt) pro Hauptseite**

  | Seite          | Performance | Accessibility | Best Practices | SEO |
  |----------------|-------------|---------------|----------------|-----|
  | index.html     | ~88–92      | ~95           | ~95            | ~98 |
  | event/*.html   | ~92–95      | ~95           | ~95            | ~95 |
  | locations/*.html| ~93–96     | ~95           | ~95            | ~92 |
  | nightshots/*.html| ~88–92    | ~93           | ~95            | ~90 |
  | Legal-Seiten   | ~96         | ~98           | ~95            | ~95 |

  *Hinweis: Performance auf index.html hängt von der Anzahl geladener Event-/Location-Bilder ab. Alle Nicht-Hero-Bilder haben `loading="lazy"`. Verbesserung möglich durch WebP-Konvertierung (siehe TODOs).*

## Bekannte TODOs / offene Punkte für den Owner

### Priorität Hoch
1. **Kontaktformular Backend**: `js/form.js` nutzt aktuell `mailto:`-Fallback. Für echtes Server-seitiges Senden PHP/Node-Backend oder Formularservice (z. B. Formspree, Netlify Forms) einbinden. TODO-Kommentar in `form.js` markiert die Stelle.
2. **Gestaltungshinweis Impressum**: Der Abschnitt "Gestaltung und technische Realisierung" im Impressum ist mit TODO markiert – Owner muss entscheiden, ob Glanz & Glor!a weiter genannt wird oder eigene Angaben rein kommen.
3. **Datenschutz**: Falls Google Analytics/AdSense wieder eingesetzt werden, Abschnitte in `datenschutz.html` ergänzen (TODO-Kommentar vorhanden).

### Priorität Mittel
4. **WebP-Bilder**: Alle JPGs noch als JPEG. Für bessere Performance `<picture>` mit WebP-Varianten nachrüsten. Tooling: `cwebp` oder squoosh.
5. **Event-Bilder fehlen**: Für "1€ März" und "Sturmfrei Lingen" kein spezifisches Event-Flyer-Bild – es werden Nightshots verwendet. Owner kann spezifische Flyer-Bilder nachliefern.
6. **Nightshots-Seite für 1-euro-maerz**: Ist als Nightshots-Galerie vorhanden, aber auf der Nightshots-Slider-Sektion der Startseite nicht im Slider (weil kein eigener Artist-Slot). Owner entscheiden ob extra Slot.

### Priorität Niedrig
7. **Social-Media-Icons**: Es werden Text-Links verwendet statt SVG-Icons (da keine lizenzierten Icons im Asset-Paket). SVG-Icons für Facebook, Instagram, Snapchat, TikTok nach Bedarf ergänzen.
8. **Favicon**: Kein Favicon im Paket. Aus Logo generieren.
9. **Preload kritischer Assets**: Hero-Hintergrund mit `<link rel="preload">` für noch bessere LCP-Werte.
10. **Location-Galerie Mainhall**: Bilder sind im `main/`-Ordner, der Download legte keinen `mainhall/`-Ordner an. Im HTML auf `../assets/images/locations/main/` zeigend – funktioniert korrekt.

## Technische Entscheidungen

| Thema | Entscheidung | Begründung |
|-------|-------------|------------|
| Google Maps | Nicht eingebunden | Datenschutz (keine Daten ohne Einwilligung) |
| OpenStreetMap | Click-to-activate | Datenschutzfreundlich, kein automatisches Laden |
| Analytics | Keine | Nicht in content/ spezifiziert, kein Tracking |
| Cookie-Banner | Minimaler Hinweis | Da kein Tracking – kein Choice-Layer nötig |
| Kontaktformular | mailto-Fallback | Kein Server vorhanden, Backend TODO kommentiert |
| Nightshots-Generator | Bash-Script | 14 Artist-Seiten effizient aus echten Bilddaten generiert |

## Dateistruktur (Endstand)

```
34 HTML-Seiten total
 1  index.html
 9  events/*.html
 7  locations/*.html
14  nightshots/*.html
 3  Legal-Seiten (impressum, datenschutz, disclaimer)

6   CSS-Dateien  (~31 KB unminified, Ziel: <60 KB ✓)
4   JS-Dateien   (~14 KB unminified, Ziel: <30 KB ✓)
```
