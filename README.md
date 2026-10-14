# Pickleball Südbaden e.V. · Website-Konzepte

[Deutsch](#deutsch) · [English](#english)

## Deutsch

Vier Entwürfe für die Startseite von pickleball-suedbaden.de, der Website des Pickleball Südbaden e.V. Der
Vorstand kann sie vergleichen, bevor die eigentliche Website gebaut wird. Sie sind nicht die echte Website.

### Inhalt

- `concepts/index.html`: die Übersicht. Sie vergleicht die vier Konzepte und verlinkt auf jedes.
- `concepts/a-paddle-passport/`, `b-saved-you-a-spot/`, `c-rally-mode/`, `d-same-court/`: die Konzepte A bis D,
  jedes eine vollständige Startseite mit denselben Inhalten und Demo-Funktionen.
- `concepts/shared/`: Logodateien, Icons, Grafiken (Ball, Paddle, Spielfeld) und die Beispielfotos
  (`photos/`, aufgelistet in `photos.json`).
- `docs/brand.md`: Markenleitfaden mit Logo-Regeln, Farben und Schriften.
- `docs/terminology.md`: Leitfaden für Begriffe und Tonfall auf Deutsch und Englisch.
- `assets/logo.jpg`: das Original-Logo des Vereins.

### Ansehen

Online: <https://pickleball-suedbaden.github.io/www-concepts/>. GitHub Pages veröffentlicht jede Änderung
auf `main` automatisch. Suchmaschinen sollen die Seiten nicht aufnehmen; wer den Link hat, kann sie trotzdem
öffnen.

Lokal: Die Seiten sind reines HTML, CSS und JavaScript, ohne Build-Schritt. Öffne `concepts/index.html` im
Browser oder starte im Projektordner einen einfachen Webserver:

```bash
python3 -m http.server 8000
```

Dann öffne <http://localhost:8000/concepts/>.

### Sprachen

Deutsch ist die Standardsprache: `index.html` ist jeweils die deutsche Seite, `index.en.html` die englische. Jede
Seite hat einen Umschalter DE · FR · EN; die französische Fassung folgt.

### Stand und Grenzen

- Texte, Namen, Termine, Preise und Spielorte sind Platzhalter. Die Formulare sind Demos und senden nichts.
- Alle Fotos sind KI-generierte Beispielbilder, jeweils mit „KI-Beispielbild“ und einer Bildnummer
  gekennzeichnet. Die Menschen darauf sind keine Vereinsmitglieder. Die fertige Website zeigt nur echte Fotos
  von Vereinsterminen, aufgenommen mit Einwilligung. Für die Motive 05 (Gründungsmitglieder) und 23 (Vorstand)
  gibt es absichtlich kein Beispielbild: Hier kommen nur echte Fotos infrage.
- Bevor etwas öffentlich wird, sollte eine Person mit Deutsch als Muttersprache die deutschen Texte gegenlesen.
- Vor dem Livegang: Schriften selbst hosten (die Konzepte laden Google Fonts, was die fertige Website aus
  Datenschutzgründen nicht darf, siehe `docs/brand.md` § 3.4) und das Logo als Vektordatei besorgen.

Hinweise für die Arbeit an den Konzepten stehen in [AGENTS.md](AGENTS.md) (auf Englisch).

## English

Four landing-page designs for pickleball-suedbaden.de, the website of Pickleball Südbaden e.V. They are for
the board to compare before the real website is built. They are not the live site.

### What is here

- `concepts/index.html`: the overview. It compares the four concepts and links to each one.
- `concepts/a-paddle-passport/`, `b-saved-you-a-spot/`, `c-rally-mode/`, `d-same-court/`: concepts A to D,
  each a complete landing page with the same content and demo features.
- `concepts/shared/`: logo files, icons, graphics (ball, paddle, court) and the sample photos (`photos/`, with
  an index in `photos.json`).
- `docs/brand.md`: brand guide with logo rules, colours and fonts.
- `docs/terminology.md`: terminology and voice guide for German and English.
- `assets/logo.jpg`: the club's original logo.

### Viewing

Online: <https://pickleball-suedbaden.github.io/www-concepts/>. GitHub Pages publishes every change on `main`
automatically. Search engines are asked not to list the pages, but anyone with the link can open them.

Locally: the pages are plain HTML, CSS and JavaScript, with no build step. Open `concepts/index.html` in a
browser, or start a simple web server in the project folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/concepts/>.

### Languages

German is the default: each `index.html` is the German page and `index.en.html` the English one. Every page
has a DE · FR · EN switch; the French version will follow.

### Status and limits

- Text, names, dates, prices and venues are placeholders. The forms are demos and send nothing.
- All photos are AI-generated samples, each tagged "AI sample" with a photo number. The people in them
  are not club members. The live site will show only real photos from club sessions, taken with consent.
  Shots 05 (the founders) and 23 (the board) have no sample photo on purpose: only real photos will do.
- A native German speaker should read the German text before anything goes public.
- Before launch: self-host the fonts (the concepts load Google Fonts, which the live site must not do for
  data-protection reasons, see `docs/brand.md` §3.4) and get the logo as a vector file.

Notes for working on the concepts are in [AGENTS.md](AGENTS.md).
