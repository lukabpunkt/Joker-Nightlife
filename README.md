# Joker Nightlife – Redesign-Paket

Dieses Paket enthält alle Inhalte und Assets der bestehenden Website **joker-nightlife.de**, sauber strukturiert und vorbereitet für die Neugestaltung mit Claude Code.

## Über das Projekt

Joker Nightlife ist eine seit über 35 Jahren bestehende Diskothek in Lingen (Niedersachsen), die auf 7 verschiedenen Areas Partys für unterschiedlichste Musikgeschmäcker bietet.

- **Standort**: Schwarzer Weg 20, 49809 Lingen
- **Inhaber**: Martin Timmer (Joker Music Hall)
- **Telefon**: 0172 / 432 73 51
- **E-Mail**: info@joker-nightlife.de
- **Öffnungstage**: Freitag & Samstag ab 22:00 Uhr, vor Feiertagen
- **Social Media**: Facebook (discothekjoker), Instagram (joker_lingen), Snapchat (joker_lingen), TikTok (@jokerlingen)

## Ordnerstruktur

```
joker-nightlife-redesign/
├── README.md                       ← Du bist hier
├── CLAUDE_CODE_PROMPT.md           ← Fertiger Prompt für Claude Code (kopieren & einfügen)
├── SITEMAP.md                      ← Alle Seiten der alten Website mit Funktion
│
├── content/                        ← Alle Texte, nach Seitenbereich
│   ├── 01-startseite.md            ← Hero, Intro, allgemeine Texte
│   ├── 02-locations.md             ← Die 7 Areas (Jolly, Main, Swing, Black, Outdoor, Cocktailbar, Beach)
│   ├── 03-events-aktuell.md        ← Aktuelle Events (1€ Party, Abicardi, etc.)
│   ├── 04-artist-archive.md        ← Liste vergangener Künstler-Gigs (Galerien)
│   ├── 05-vip-lounges.md           ← VIP Lounges + "Dein Bereich" (Jolly Vermietung)
│   ├── 06-infos.md                 ← Muttizettel, Einlasskriterien, Dresscode, Öffnungstage, etc.
│   ├── 07-kontakt-anfahrt.md       ← Kontaktdaten, Adresse, Social Media
│   ├── 08-impressum.md             ← Rechtliches Impressum
│   ├── 09-datenschutz.md           ← Datenschutzerklärung
│   └── 10-disclaimer.md            ← Haftungsausschluss
│
└── assets/
    ├── assets-manifest.json        ← Alle Bild-URLs mit Kategorie & Verwendung
    ├── download-assets.sh          ← Bash-Script: lädt alle Originalbilder vom Server
    ├── logo/                       ← (wird vom Download-Script gefüllt)
    ├── images/                     ← (wird vom Download-Script gefüllt)
    │   ├── locations/              ← Bilder der 7 Areas
    │   ├── events/                 ← Event-Vorschaubilder
    │   ├── nightshots/             ← Foto-Galerien vergangener Nächte
    │   └── ui/                     ← Icons, Navigations-Buttons, Headlines
    └── docs/
        └── erziehungsbeauftragung_disco_joker.pdf   ← Muttizettel (PDF)
```

## So gehst du vor

1. **Bilder downloaden**: Führe `bash assets/download-assets.sh` aus.
   Das Script lädt alle Original-Assets direkt vom joker-nightlife.de-Server herunter und sortiert sie in `assets/images/`, `assets/logo/`, `assets/docs/`.

2. **Claude Code starten** im Hauptordner `joker-nightlife-redesign/`.

3. **Den Prompt verwenden**: Inhalt von `CLAUDE_CODE_PROMPT.md` kopieren und an Claude Code geben.
   Claude Code hat dann alle Texte und Bilder direkt im Projekt und kann sofort mit dem Redesign starten.

## Design-Richtung (festgelegt)

- **Stil**: Modern & Neon (dunkles Design, Neon-Akzente in Pink/Purple/Cyan, Glow-Effekte)
- **Tech-Stack**: Plain HTML / CSS / JS (kein Build-Tool nötig)
- **Mobile-First**: Hauptzielgruppe nutzt Smartphones
- **Alle Texte und Assets der alten Seite bleiben erhalten** – nur das Design ändert sich

## Quellseite

Original: https://www.joker-nightlife.de/
