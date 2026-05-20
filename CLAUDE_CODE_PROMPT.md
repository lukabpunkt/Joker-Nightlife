# Prompt für Claude Code – Redesign joker-nightlife.de

> **So nutzt du diesen Prompt:**
> 1. `bash assets/download-assets.sh` ausführen (lädt alle Original-Bilder).
> 2. Claude Code im Wurzelordner dieses Projekts starten.
> 3. Den kompletten Text unten (zwischen den `─── PROMPT START ───` / `─── PROMPT ENDE ───` Markern) kopieren und an Claude Code übergeben.

---

─── PROMPT START ───

Du baust eine komplette Neugestaltung der Website **joker-nightlife.de** (Diskothek "Joker" in Lingen). Im aktuellen Arbeitsverzeichnis findest du:

- `content/` – alle Texte und Inhalte der bestehenden Seite, sauber pro Bereich in Markdown
- `assets/images/` – alle Originalbilder (Locations, Events, Nightshots-Galerien, UI)
- `assets/logo/` – die Schrift-Grafiken / "Logos" der alten Seite
- `assets/docs/erziehungsbeauftragung_disco_joker.pdf` – Muttizettel zum Download
- `SITEMAP.md` – komplette Übersicht aller Seiten der alten Website
- `README.md` – Projektüberblick

**Lies zuerst** `README.md`, `SITEMAP.md` und alle Dateien in `content/`. Schau dann mit `ls` in `assets/`, was an Bildmaterial vorhanden ist.

## Was du bauen sollst

Eine **neue, moderne, mobile-first Website** für den Joker Nightclub – komplettes Redesign vom Look & Feel der bestehenden Seite, aber **alle Texte und Bilder bleiben erhalten**. Nichts an Inhalt neu erfinden, nichts erfinden, nur das Visual & UX modernisieren.

## Tech-Stack (zwingend)

- **Plain HTML, CSS und vanilla JavaScript.** Kein Build-Tool, kein npm, kein Framework, keine Tailwind-CDN.
- Modernes CSS: Custom Properties, `clamp()`, Grid + Flex, Container Queries wenn sinnvoll, `prefers-reduced-motion`, `prefers-color-scheme`.
- Vanilla JS für Lightbox, Mobile-Menü, Smooth Scroll, Formular-Validation.
- Schriften per `@font-face` lokal einbinden oder Google Fonts mit `font-display: swap` (z. B. eine display-Schrift wie *Anton*, *Bebas Neue* oder *Unbounded* + eine moderne Sans wie *Inter*).
- Bilder responsive mit `<picture>` oder `srcset`, alle nicht-kritischen mit `loading="lazy"`.
- Erreicht in Lighthouse mind. 90 in Performance / Accessibility / Best Practices / SEO.

## Design-Direction: Modern & Neon

- **Dark Mode by default** (keine Light-Variante nötig). Basis-Hintergrund tief-dunkel (`#0a0612` o. ä., nicht reines Schwarz, leicht violett-stichig).
- **Neon-Akzentpalette** (mind. 2, max 3 Akzente):
  - Hot-Magenta `#ff2dd4` (Primary)
  - Electric-Cyan `#22e1ff` (Secondary)
  - Off-White `#f5f3ff` (Text)
  - Muted Lavender/Grey für sekundären Text
- **Glow-Effekte**: Hover-States mit `box-shadow` / `text-shadow` als Neon-Glühen. Sparsam einsetzen, nicht alles glüht.
- **Typografie**:
  - H1/Hero: massive Display-Schrift, gerne 2-zeilig, uppercase, condensed
  - H2: groß, fett, klar abgegrenzt
  - Body: Inter o. ä., großzügige Zeilenhöhe
- **Mikro-Interaktionen**:
  - Magnetischer Hover auf Event-Cards
  - Kursor-Glow auf Desktop (subtil)
  - Sanfter Parallax im Hero
  - Skroll-getriggertes Reveal (IntersectionObserver) – kein aggressives AOS
- **Bewegung**:
  - Im Hero ein dezent animierter Verlauf oder Particles (Canvas oder reine CSS-Gradients, **niemals** schwer)
  - Cards floaten beim Hover leicht hoch
- **Respektiere `prefers-reduced-motion`** – Animationen dann komplett ruhig.

## Seitenarchitektur

**Eine starke One-Pager-Startseite** plus **eigenständige Subseiten** für Detail-Content:

### `index.html` (One-Pager)
Reihenfolge der Sektionen:
1. **Hero** – fullscreen, Claim *"SEIT ÜBER 35 JAHREN – DEINE PARTYADRESSE IN LINGEN"*, prominentes nächstes Event (aus `content/03-events-aktuell.md`), Scroll-Indikator
2. **Events** – Grid aus Cards, jede Card verlinkt zu `events/<slug>.html`. Quelle: `content/03-events-aktuell.md`. Card zeigt Vorschaubild + Headline + kurzer Teaser + Datum.
3. **Locations** – 7 Areas als interaktives Grid (Jolly, Mainhall, Swing, Black, Outdoor, Cocktailbar, Beach). Quelle: `content/02-locations.md`. Hover zeigt Musikrichtung, Klick führt zu `locations/<slug>.html`.
4. **Nightshots** – horizontaler Slider mit den 15 Vorschau-Thumbnails (`assets/images/nightshots/_thumbs/`). Klick öffnet Lightbox bzw. führt zur jeweiligen Artist-/Event-Galerie.
5. **VIP Lounges & Dein Bereich** – Quelle: `content/05-vip-lounges.md`. Zwei Cards: "VIP Lounge buchen" + "Dein Bereich (Jolly mieten)".
6. **Infos** – Akkordeon mit Muttizettel, Einlasskriterien, Öffnungstagen, Fundsachen, Videoüberwachung, Fotoaufnahmen, Dresscode. Quelle: `content/06-infos.md`.
7. **Anfahrt & Kontakt** – Quelle: `content/07-kontakt-anfahrt.md`. Karte (OpenStreetMap-Iframe, datenschutzfreundlich, kein Google Maps), Adresse, Telefon, E-Mail-Mailto, Kontaktformular (Felder: Name, E-Mail, Nachricht).
8. **Footer** – Social-Icons (FB, Instagram, Snapchat, TikTok), Links zu Impressum/Datenschutz/Disclaimer, Copyright.

### Subseiten
- `events/<slug>.html` – eine Seite pro aktuelles Event. **Generiere für jedes Event aus `content/03-events-aktuell.md` automatisch eine Seite.**
- `locations/<slug>.html` – eine Seite pro Area, mit Gallery aus `assets/images/locations/<slug>/`. Headline + kurzer Text + Gallery + zurück-Link.
- `nightshots/<slug>.html` – eine Seite pro Artist/vergangenem Event aus `content/04-artist-archive.md`. Gallery aus `assets/images/nightshots/<slug>/`.
- `impressum.html`, `datenschutz.html`, `disclaimer.html` – aus `content/08-impressum.md`, `content/09-datenschutz.md`, `content/10-disclaimer.md`.

## Konkrete Komponenten

- **Sticky Navbar** mobile-first: Logo links, Burger rechts, klappt zu Fullscreen-Overlay-Menü auf. Desktop: Logo + Inline-Links + CTA "Tickets" (wenn aktuelles Event ein Online-Ticket hat).
- **Event-Card**: 16:9-Vorschaubild, darüber gradient overlay, darin Datum-Pill, darunter Headline (kurz). Hover: lift + Neon-Glow + leicht Zoom auf das Bild.
- **Location-Card**: quadratisches Foto, beim Hover schiebt sich von unten ein Panel rein mit Musikrichtung + CTA "Galerie ansehen".
- **Lightbox**: vanilla JS, ESC zum Schließen, Pfeiltasten zum Navigieren, Swipe auf Mobile, Bildunterschrift optional.
- **Kontaktformular**: Honeypot-Feld, Client-Validation, Submit via `mailto:` als Fallback (oder TODO-Kommentar für Backend-Anbindung).
- **Cookie-Banner**: minimaler Banner ("Wir verwenden essentielle Cookies. [Mehr erfahren]"). Wenn keine Analytics aktiv sind, einfacher Hinweis ohne Choice-Layer.

## Inhaltliche Bereinigungen (bitte beim Übernehmen anwenden)

Beim Original gibt es ein paar Widersprüche – im Redesign konsistent fixen:
- **Anzahl Areas** überall einheitlich **"7 Areas / Bereiche"** (alte Meta-Tags sagen mal "vier", mal "6").
- **Jahre** überall einheitlich **"über 35 Jahre"**.
- **Copyright-Jahr** auf das aktuelle Jahr setzen.
- **"Mainhall"** statt "Main" wenn der Bereich gemeint ist.
- Erwähnung der alten Agentur (Glanz & Glor!a) im Footer und Impressum so wie in `content/08-impressum.md` markiert behandeln.

## Datei-/Ordnerstruktur, die du anlegst

```
/
├── index.html
├── events/<slug>.html              (eine Seite pro Event)
├── locations/<slug>.html           (eine Seite pro Area)
├── nightshots/<slug>.html          (eine Seite pro Artist-Galerie)
├── impressum.html
├── datenschutz.html
├── disclaimer.html
├── css/
│   ├── reset.css
│   ├── tokens.css                  (CSS Custom Properties: colors, spacing, type)
│   ├── base.css                    (typo, body, layout primitives)
│   ├── components.css              (Cards, Buttons, Nav, Footer, Forms)
│   ├── sections.css                (Hero, Events, Locations, etc.)
│   └── utilities.css
├── js/
│   ├── main.js                     (Boot, Nav, Smooth Scroll, Reveal)
│   ├── lightbox.js
│   ├── form.js
│   └── gallery.js                  (auto-loads images aus einem Verzeichnis)
├── assets/                         (bleibt wie geliefert)
└── content/                        (bleibt als Quelle, im Build nicht ausgeliefert)
```

## Zusätzliche Anforderungen

- **Accessibility**: semantisches HTML (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`), Focus States sichtbar mit Neon-Outline, ARIA wo nötig, alle interaktiven Elemente tastaturbedienbar, Lightbox mit Focus-Trap, Kontraste WCAG AA.
- **SEO**: korrekte `<title>` und `<meta name="description">` pro Seite, Open-Graph- + Twitter-Card-Tags, JSON-LD `NightClub` schema mit Adresse, Öffnungszeiten, Telefon, Geo, sameAs (Social).
- **Performance**: Hero-Bild als `<picture>` mit WebP/AVIF Fallback **wenn vorhanden** (sonst JPG). Sonstige Bilder lazy. CSS unter 60 KB, JS unter 30 KB unminified.
- **Datenschutz**: Karte als statisches Vorschaubild mit Klick-to-Activate für die echte Karte (Two-Click-Lösung), keine Drittanbieter ohne Consent.

## Workflow, den du einhältst

1. Erstelle zunächst eine `BUILD_PLAN.md`, in der du die geplante Seitenstruktur und die Komponenten festhältst, **bevor** du Code schreibst.
2. Starte mit `css/tokens.css` + `index.html` Skeleton.
3. Baue Section für Section – nach jeder Section: kurz selbstprüfen (HTML valide? a11y ok? mobile ok?).
4. Detail-/Subseiten als Template-basiert generieren (z. B. ein kleines Build-Skript in `tools/build.js`, das aus `content/*.md` die Subseiten generiert) – oder, einfacher: pro Detail-Typ eine `_template.html`, die du händisch befüllst.
5. Am Ende eine **Checkliste in `BUILD_REPORT.md`** abarbeiten: alle Original-Texte übernommen? Alle Original-Bilder eingebunden? Alle Subseiten verlinkt? Mobile + Desktop in 320 / 768 / 1280 / 1920 px getestet?

## Was du NICHT tust

- Keinen Inhalt erfinden, der nicht aus `content/` kommt. Wenn etwas fehlt, **fragst du nach** – nicht halluzinieren.
- Keine echten Personen-Quotes oder Künstler-Texte erfinden, die nicht im Originalmaterial stehen.
- Keine fremden CSS-Frameworks, kein Tailwind, kein Bootstrap, kein jQuery, kein React.
- Keine Tracking-Tools / Analytics / Ads von Drittanbietern ohne ausdrücklichen Wunsch.

Wenn du an irgendeiner Stelle unsicher bist, was der Owner wünscht – z. B. wie laut/leise die Neon-Effekte sein sollen, ob ein bestimmtes Event noch aktuell ist, ob Ticket-Anbindung gebaut werden soll – **stelle eine konkrete Rückfrage**, bevor du diesen Teil baust.

Bestätige am Anfang kurz, dass du `README.md`, `SITEMAP.md` und mindestens `content/01-startseite.md`, `content/02-locations.md`, `content/03-events-aktuell.md` gelesen hast. Liste dann in einer Antwort dein geplantes Vorgehen, bevor du Code schreibst.

─── PROMPT ENDE ───

---

## Tipps zur Verwendung

- Du kannst den Prompt natürlich kürzen/anpassen, je nachdem wie viel Detail Claude Code haben soll.
- Wenn du **andere Farben** willst (z. B. eher Purple/Gold statt Magenta/Cyan), ersetze die Hex-Codes im Abschnitt "Design-Direction".
- Wenn du **bestimmte Subseiten weglassen** willst (z. B. die ganzen Artist-Galerien, weil aufwendig), entferne den entsprechenden Eintrag unter "Subseiten".
- Wenn du nach einem Durchlauf merkst, dass etwas fehlt: einfach Folge-Prompt geben wie „Erstelle jetzt zusätzlich `events/abicardi.html` mit folgender Anpassung: …".
