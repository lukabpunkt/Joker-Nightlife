# START HIER – So nutzt du dieses Paket

Dieses ZIP enthält alles, was Claude Code braucht, um die Website **joker-nightlife.de** automatisch neu zu gestalten.

## In 3 Schritten

### 1. ZIP entpacken
Entpacke das ZIP an einen Ort deiner Wahl, z. B. nach `~/Projekte/joker-nightlife-redesign/`.

### 2. Claude Code im Ordner starten
Öffne ein Terminal im entpackten Ordner und starte Claude Code dort:
```bash
cd ~/Projekte/joker-nightlife-redesign
claude
```

### 3. Diesen einen Satz an Claude Code schicken
```
Lies CLAUDE.md und führe den Auftrag komplett aus.
```

Das war's. Claude Code findet automatisch die `CLAUDE.md` im Root, liest sie, lädt die Original-Bilder vom Joker-Server, und baut die komplette neue Website (One-Pager + Subseiten für Events, Locations, Artist-Galerien, Impressum/Datenschutz/Disclaimer).

## Was passiert automatisch?

1. Claude Code liest `CLAUDE.md` mit dem kompletten Auftrag.
2. Claude Code führt `bash assets/download-assets.sh` aus → lädt alle Originalbilder + das Muttizettel-PDF direkt vom Joker-Server.
3. Claude Code schreibt zuerst eine `BUILD_PLAN.md`.
4. Claude Code baut HTML / CSS / JS Section für Section, mit dem festgelegten Modern-Neon-Stil (Dark Mode, Magenta/Cyan-Akzente, mobile-first).
5. Am Ende schreibt Claude Code eine `BUILD_REPORT.md` mit Checkliste.

## Wenn du etwas anderes willst

Im `CLAUDE.md` stehen alle Vorgaben. Wenn du z. B. andere Farben, anderen Stil oder andere Sektionen willst, **bearbeite die `CLAUDE.md` vor Schritt 3**. Z. B. Hex-Codes austauschen, Section-Reihenfolge ändern, Tech-Stack anpassen (falls du doch React willst, etc.).

## Was im Ordner steckt

```
joker-nightlife-redesign/
├── START_HERE.md              ← Diese Datei
├── CLAUDE.md                  ← Auftrag für Claude Code (wird automatisch gelesen)
├── README.md                  ← Projektüberblick
├── SITEMAP.md                 ← Alle Seiten der alten Website
├── CLAUDE_CODE_PROMPT.md      ← Alternativ-Prompt als Backup
│
├── content/                   ← Alle Originaltexte, sauber sortiert
│   └── 01..10-*.md            (Startseite, Locations, Events, Lounges, Infos, ...)
│
└── assets/
    ├── download-assets.sh     ← Lädt Original-Bilder vom Server
    ├── assets-manifest.json   ← Maschinenlesbare Bild-Liste
    ├── logo/                  ← (wird gefüllt)
    ├── images/                ← (wird gefüllt)
    │   ├── locations/
    │   ├── events/
    │   ├── nightshots/
    │   └── ui/
    └── docs/                  ← (wird gefüllt: Muttizettel-PDF)
```

## FAQ

**Warum sind die Bilder noch nicht im Ordner?**
Damit du die unkomprimierten Originale direkt vom Joker-Server bekommst – Claude Code lädt sie als ersten Schritt automatisch.

**Was ist, wenn der Download fehlschlägt?**
`bash assets/download-assets.sh` manuell im Terminal ausführen und Output prüfen. Das Script ist idempotent – schon vorhandene Dateien werden übersprungen, fehlende erneut geladen.

**Brauche ich besondere Tools?**
Nein – nur `bash` und `curl` (auf macOS/Linux vorinstalliert). Auf Windows: über WSL oder Git Bash ausführen.
