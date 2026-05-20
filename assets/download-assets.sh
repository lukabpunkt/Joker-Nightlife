#!/usr/bin/env bash
# ============================================================================
# Joker Nightlife – Asset-Downloader
# ----------------------------------------------------------------------------
# Lädt alle Original-Bilder, das PDF (Muttizettel) und die HTML-Galerien
# der bestehenden Website joker-nightlife.de herunter und sortiert sie in
# die lokale Ordnerstruktur.
#
# Nutzung:
#   cd assets/
#   bash download-assets.sh
#
# Voraussetzungen:
#   - bash, curl (auf macOS & Linux vorinstalliert)
# ============================================================================

set -euo pipefail

BASE="https://www.joker-nightlife.de"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

mkdir -p logo images/locations images/events images/nightshots images/ui docs

UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"

# ----------------------------------------------------------------------------
# Helper: Lädt eine URL in einen Zielpfad (überschreibt nicht, wenn schon da)
# ----------------------------------------------------------------------------
fetch() {
  local url="$1"
  local dest="$2"
  if [[ -f "$dest" && -s "$dest" ]]; then
    echo "  [skip] $dest"
    return 0
  fi
  echo "  [get ] $dest"
  curl -fsSL -A "$UA" --retry 3 --retry-delay 1 "$url" -o "$dest" || {
    echo "  [FAIL] $url"
    rm -f "$dest"
  }
}

# ----------------------------------------------------------------------------
# Helper: Extrahiert alle /images/... URLs aus einer Page und lädt sie in
#         einen Zielordner. Behält die originalen Dateinamen.
# ----------------------------------------------------------------------------
fetch_gallery() {
  local page_url="$1"
  local dest_dir="$2"
  mkdir -p "$dest_dir"
  echo ">> Galerie: $page_url -> $dest_dir"
  local html
  html=$(curl -fsSL -A "$UA" "$page_url") || { echo "  [FAIL fetch HTML]"; return 0; }

  # Alle /images/*.{jpg,jpeg,png,gif,svg,webp} (egal ob mit oder ohne ?crc=)
  # extrahieren, einzigartig machen und nicht-blank/transparent rausfiltern.
  echo "$html" \
    | grep -oE 'images/[A-Za-z0-9._/+%-]+\.(jpg|jpeg|png|gif|svg|webp)(\?crc=[0-9]+)?' \
    | sort -u \
    | grep -vE '(blank\.gif|pasted-svg-36x36)' \
    | while read -r relpath; do
        local clean="${relpath%%\?*}"           # ohne ?crc=
        local fname="${clean##*/}"
        fetch "${BASE}/${relpath}" "${dest_dir}/${fname}"
      done
}

echo "============================================"
echo "1) Dokumente (PDF)"
echo "============================================"
fetch "$BASE/assets/erziehungsbeauftragung_disco_joker.pdf" \
      "docs/erziehungsbeauftragung_disco_joker.pdf"

echo
echo "============================================"
echo "2) Headlines / Logo-Grafiken"
echo "============================================"
for f in headline_02.png headline_04.png headline_05.png headline_6.png headline_08.png; do
  fetch "$BASE/images/$f" "logo/$f"
done

echo
echo "============================================"
echo "3) Location-Vorschaubilder"
echo "============================================"
fetch "$BASE/images/jolly391x250.jpg"  "images/locations/jolly-preview.jpg"
fetch "$BASE/images/main.jpg"          "images/locations/main-preview.jpg"
fetch "$BASE/images/swing.jpg"         "images/locations/swing-preview.jpg"
fetch "$BASE/images/black.jpg"         "images/locations/black-preview.jpg"
fetch "$BASE/images/outdoor.jpg"       "images/locations/outdoor-preview.jpg"
fetch "$BASE/images/cocktailbar.jpg"   "images/locations/cocktailbar-preview.jpg"
fetch "$BASE/images/beach2.jpg"        "images/locations/beach-preview.jpg"

echo
echo "============================================"
echo "4) Event-Vorschaubilder"
echo "============================================"
fetch "$BASE/images/event5-crop-u292460.jpg"  "images/events/abicardi.jpg"
fetch "$BASE/images/event3-crop-u300668.jpg"  "images/events/forever-young.jpg"
fetch "$BASE/images/event6-crop-u300688.jpg"  "images/events/doppel-1-euro.jpg"
fetch "$BASE/images/event7-crop-u304126.jpg"  "images/events/casino-night.jpg"
fetch "$BASE/images/event10-crop-u304146.jpg" "images/events/ak-live.jpg"
fetch "$BASE/images/event1-crop-u304171.jpg"  "images/events/the-saints.jpg"
fetch "$BASE/images/beach-crop-u283285.jpg"   "images/events/club-40.jpg"

echo
echo "============================================"
echo "5) UI Icons & Social"
echo "============================================"
for f in icon_home.png icon_about.png icon_location.png icon_media.png \
         icon_vip.png icon_infos.png icon_map.png icon_contacts.png \
         icon_merch.png facebook2.png insta2.png snap2.png \
         facebook_02.jpg instagram_02.jpg snapchat_02.jpg \
         down_arrow_gray.png menu_btn_rollover.png menu_btn_active.png \
         slide_left_2.jpg slide_right_2.jpg; do
  fetch "$BASE/images/$f" "images/ui/$f"
done

echo
echo "============================================"
echo "6) Nightshots – Vorschau-Thumbnails"
echo "============================================"
for f in vorschau_yury2.jpg vorschau2.jpg vorschau22.jpg vorschau23.jpg \
         vorschau24.jpg vorschau25.jpg vorschau_ak2.jpg vorschau_jazeek2.jpg \
         vorschau26.jpg vorschau27.jpg vorschau9.jpg vorschau29.jpg \
         vorschau210.jpg vorschau211.jpg vorschau212.jpg; do
  fetch "$BASE/images/$f" "images/nightshots/_thumbs/$f"
done

echo
echo "============================================"
echo "7) Foto-Galerien (Artists & vergangene Events)"
echo "============================================"
fetch_gallery "$BASE/yung-yury.html"     "images/nightshots/yung-yury"
fetch_gallery "$BASE/juliansommer.html"  "images/nightshots/juliansommer"
fetch_gallery "$BASE/ak.html"            "images/nightshots/ak"
fetch_gallery "$BASE/jazeek.html"        "images/nightshots/jazeek"
fetch_gallery "$BASE/gzuz.html"          "images/nightshots/gzuz"
fetch_gallery "$BASE/summer-cem.html"    "images/nightshots/summer-cem"
fetch_gallery "$BASE/azet.html"          "images/nightshots/azet"
fetch_gallery "$BASE/mish.html"          "images/nightshots/mish"
fetch_gallery "$BASE/kc-rebell.html"     "images/nightshots/kc-rebell"
fetch_gallery "$BASE/breitner.html"      "images/nightshots/breitner"
fetch_gallery "$BASE/heat.html"          "images/nightshots/heat"
fetch_gallery "$BASE/isi.html"           "images/nightshots/isi"
fetch_gallery "$BASE/tweekaz.html"       "images/nightshots/tweekaz"
fetch_gallery "$BASE/noisetime.html"     "images/nightshots/noisetime"
fetch_gallery "$BASE/1-euro-m%c3%a4rz.html" "images/nightshots/1-euro-maerz"

echo
echo "============================================"
echo "8) Location-Galerien (Innenraum-Fotos)"
echo "============================================"
fetch_gallery "$BASE/location_jolly.html"       "images/locations/jolly"
fetch_gallery "$BASE/location_main.html"        "images/locations/main"
fetch_gallery "$BASE/location_swing.html"       "images/locations/swing"
fetch_gallery "$BASE/location_black.html"       "images/locations/black"
fetch_gallery "$BASE/location_outdoor.html"     "images/locations/outdoor"
fetch_gallery "$BASE/location_cocktailbar.html" "images/locations/cocktailbar"
fetch_gallery "$BASE/location_beach.html"       "images/locations/beach"

echo
echo "============================================"
echo "FERTIG. Übersicht:"
echo "============================================"
find logo images docs -type f | wc -l | xargs echo "  Dateien insgesamt:"
du -sh logo images docs 2>/dev/null | sed 's/^/  /'
echo
echo "Du kannst jetzt mit Claude Code im Hauptordner starten."
