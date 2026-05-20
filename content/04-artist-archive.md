# Artist-Archiv (vergangene Live-Acts)

Diese Seiten sind reine Foto-Galerien vergangener Live-Auftritte. Jede Seite hat:
- Künstlername als Headline
- Datum (oft `WOCHENTAG, TT/MM/JJ`)
- Foto-Galerie (50–170+ Bilder, Lightbox)

| Slug             | Künstler / Event-Titel              | Datum (laut Original)   | Quelle (alt)              |
|------------------|--------------------------------------|--------------------------|----------------------------|
| `yung-yury`      | YUNG YURY – LIVE                     | Samstag, 14/07/23        | `yung-yury.html`           |
| `juliansommer`   | JULIAN SOMMER – „Blau wie der Ozean" | Freitag, 09/06/23        | `juliansommer.html`        |
| `ak`             | AK AUSSER KONTROLLE                  | (vergangenes Event)      | `ak.html`                  |
| `jazeek`         | JAZEEK                               | (vergangenes Event)      | `jazeek.html`              |
| `gzuz`           | GZUZ                                 | (vergangenes Event)      | `gzuz.html`                |
| `summer-cem`     | SUMMER CEM                           | (vergangenes Event)      | `summer-cem.html`          |
| `azet`           | AZET                                 | (vergangenes Event)      | `azet.html`                |
| `mish`           | MISH                                 | (vergangenes Event)      | `mish.html`                |
| `kc-rebell`      | KC REBELL                            | (vergangenes Event)      | `kc-rebell.html`           |
| `breitner`       | BREITNER                             | (vergangenes Event)      | `breitner.html`            |
| `heat`           | HEAT                                 | (vergangenes Event)      | `heat.html`                |
| `isi`            | ISI GLÜCK – LIVE                     | Freitag, 27/09/24        | `isi.html`                 |
| `tweekaz`        | DA TWEEKAZ                           | Samstag, 08/03/25        | `tweekaz.html`             |
| `noisetime`      | NOISETIME                            | Freitag, 24/10/25        | `noisetime.html`           |

## Gemeinsame Seitenstruktur (für Redesign)

Jede Artist-Seite sollte enthalten:
1. Hero: großer Künstlername + Datum
2. (Optional) Kurzer Teaser-Text – 1–2 Sätze zum Auftritt (kann beim Redesign neu getextet werden, im Original fehlt er meist)
3. Galerie als Lightbox-Grid (Masonry oder gleichmäßiges Grid)
4. „Mehr Nightshots" CTA zurück zur Übersicht
5. Footer

## Bilder

Die Galerie-Bilder pro Artist-Seite findest du in `assets/images/nightshots/<slug>/` – das Download-Script lädt sie automatisch aus den Original-URLs, die im `assets-manifest.json` aufgeführt sind.

## Hinweis

Für das Redesign brauchst du nicht alle Galerie-Bilder neu zu sortieren. Es reicht eine einheitliche Galerie-Komponente, die das Bilder-Verzeichnis automatisch ausliest (z. B. via JS Fetch auf eine `images.json` pro Slug, oder im Build-Step generiert).
