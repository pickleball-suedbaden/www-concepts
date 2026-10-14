# Working on the website concepts

Four landing-page concepts for Pickleball Südbaden e.V. (pickleball-suedbaden.de) and an overview page that
compares them. They are design prototypes for the club board, not the production site. See `README.md` for the
status and limits.

## Structure

- `concepts/index.html` (DE) and `concepts/index.en.html` (EN): the overview.
- `concepts/<slug>/`: one concept each (`a-paddle-passport`, `b-saved-you-a-spot`, `c-rally-mode`,
  `d-same-court`), with `index.html` (DE), `index.en.html` (EN), `style.css` and `app.js`.
- `concepts/<slug>/preview/{de,en}/`: WebP screenshots the overview uses: `desktop-fold` (1440 × 900),
  `mobile-fold` (390 × 844) and a `page-overview-desktop` montage. Update them when a page changes visibly.
- `concepts/shared/`: logo variants, icons, `ball.svg`, `paddle.svg`, `court-lines.svg`, and `photos/`.
- `docs/brand.md`: logo rules, colour tokens, fonts. `docs/terminology.md`: wording and voice for DE and EN.

Plain HTML, CSS and JavaScript: no framework, no build step, no dependencies. Keep it that way.

## Running and checking

Serve the project folder with any static server (`python3 -m http.server 8000`) and open `/concepts/`.

GitHub Pages publishes `main` to https://pickleball-suedbaden.github.io/www-concepts/. The root `index.html`
forwards to `concepts/`, and `.nojekyll` serves files as they are. Every page carries
`<meta name="robots" content="noindex">` so search engines do not list these mock-ups under the club's name:
keep it on every page, including new ones.

Before you call a change done, check every page you touched in both languages:

- no console errors, failed requests or broken images;
- at 1440 px and at 390 px wide: nothing overlaps, and the page does not scroll sideways;
- the demo flows still work (trial booking, membership, login, newsletter, contact, town vote);
- photos still crop well: images use `object-fit: cover`, so check that faces, paddles and the ball stay in
  frame at both widths, and adjust `object-position` if not.

## Languages

- German is the default. `index.html` is German and `index.en.html` is English. Change both together and keep
  them in step.
- Each `app.js` keeps its user-facing text in a `STRINGS` table with one entry per language, chosen by
  `<html lang>`; unknown languages fall back to German. The overview has a small inline `STRINGS` table in
  both of its index files.
- French is planned. The language switch shows FR, and the pages explain that it is coming.
- Follow `docs/terminology.md` for every German and English string. The main rules:
  - Address visitors with lower-case „du“.
  - Use neutral wording for genders first; use the colon form („Trainer:in“) only where no natural neutral form
    exists.
  - Programme names stay in English („das First Serve“).
- German text needs a native speaker's review before it goes public.

## Photos

- Every photo is an AI-generated placeholder. Each one shows a visible tag with its code: „KI-Beispielbild ·
  <code>“ in German and "AI sample · <code>" in English. Codes 01–26 come from the club's shot list; D1–D12 are
  Concept D's own. Keep the tag on every photo.
- Shots 05 (the founders) and 23 (the board) must never be AI-generated. Where a concept shows them, they are
  empty "real photo needed" frames until the club supplies real photos.
- `concepts/shared/photos/<id>-800.webp` and `<id>-1600.webp` hold each image; the large file is up to 1600 px
  wide. `photos.json` lists every photo with a description and the exact size of each file.
- Pages use `srcset` with w-descriptors and set `width`/`height`. A replacement photo must keep the same pixel
  size, or you must update the w-descriptors, `width`/`height` and `photos.json` together.
- Write alt text in both languages that describes what the photo actually shows.
- Pickleball must be correct in every image:
  - Court 6.10 × 13.41 m. On each half, the kitchen (non-volley zone) reaches 2.13 m from the net, and the
    centre line runs only from the kitchen line to the baseline.
  - Net 91 cm high at the sidelines and 86 cm in the middle.
  - Perforated plastic ball, solid paddles, underhand serve, one ball per court, no volleys inside the kitchen.
- No brand names, logos or legible text on clothing, shoes, paddles or the surroundings.
- Real photos for the live site need consent from the adults in them, and from parents for children.
