# Pickleball Südbaden e.V. – brand kit

Status: working kit (October 2026). Everything here comes from the only logo source we have,
`assets/logo.jpg`, a 1254 × 1254 JPEG with a white background. **Ask the logo designer for the vector
original (SVG, AI or PDF) before production.** The PNGs below are clean enough for screens up to about 600 px
wide at 2x. They are not good enough for print or large banners.

## 1. What the logo says

- **Two crossed paddles, each yellow with one red diagonal stripe.** This is the arms of Baden: a red diagonal
  band on a gold field. The logo is regional heraldry turned into sports gear, which is a story worth telling on
  the site ("our paddles carry the Baden arms"). The logo is a stylised nod to the arms, not the official state
  emblem, so do not present it as one.
- **A perforated yellow ball with motion lines.** It reads as energy, play and movement, and it is the natural
  favicon and decorative motif.
- **"PICKLEBALL" in a heavy, condensed, italic sans** (slant about 9°, very heavy stems: stem width is about 27%
  of cap height). The tone is athletic and loud.
- **"SÜDBADEN e.V." in a medium geometric sans with wide tracking**, set over a red brush underline. The tone is
  calm and official.
- The mix is the club's aim in one picture: fun (paddles, ball, swoosh) and professional (a calm second line, the
  e.V.).

## 2. Colour

### 2.1 Sampled from the logo (Pillow, median of each colour region)

| Token | Hex | Where in the logo | Notes |
|---|---|---|---|
| `--yellow-500` Baden yellow | `#FEDD02` | paddle faces, ball | Ball and paddles are the same yellow (mode `#FEDC02`). |
| `--red-600` Baden red | `#EA162C` | paddle stripes, brush underline | The underline samples at `#E6182C`, which is the same ink after JPEG loss. |
| `--navy-900` Paddle navy | `#052443` | paddle outlines, grips, ball outline and holes, motion lines | A blue navy. |
| `--ink` Wordmark ink | `#14303C` | "PICKLEBALL" and "SÜDBADEN e.V." | Darker and more teal-slate than the outline navy. The difference is real, not a JPEG artefact. |
| `--grip-300` Grip blue-grey | `#7A96B6` | grip wraps | Core of the wrap lines. The median including anti-aliasing is `#6F8BAB`. |
| background | `#FEFEFE` | white field | Treat it as `#FFFFFF`. |

### 2.2 Extended palette (proposed)

| Group | Tokens | Role |
|---|---|---|
| Navy | `--navy-950 #021427` · `--navy-900 #052443` · `--navy-800 #0C3561` · `--navy-700 #174A80` · `--grip-300 #7A96B6` · `--navy-200 #B5C5D8` · `--navy-100 #DCE4EE` · `--navy-50 #EEF2F7` | Dark surfaces (header, footer, hero), headings, tinted section backgrounds |
| Red | `--red-800 #9E0E1E` · `--red-700 #C41224` · `--red-600 #EA162C` · `--red-400 #FF6470` (dark mode) · `--red-100 #FDDDE0` · `--red-50 #FFF0F1` | Primary call to action (`red-600`), red text and links (`red-700`), hover and pressed (`red-700`/`red-800`), errors |
| Yellow | `--yellow-800 #6B5300` · `--yellow-700 #806300` · `--yellow-500 #FEDD02` · `--yellow-300 #FFE95C` · `--yellow-100 #FFF5B3` · `--yellow-50 #FFFBE0` | Highlights, badges, a "sunny" band behind navy text, notices. Never use yellow as a text colour on light backgrounds; use `yellow-700`/`800` when you need yellow-family text. |
| Neutrals | `--white #FFFFFF` · `--chalk #F8F6F0` (warm off-white) · `--mist #EEF1F4` (cool grey) · `--line #D5DCE3` · `--slate-500 #5A6B78` · `--slate-600 #4A5D6B` · `--ink #14303C` | Page background (`white` or `chalk`), cards, dividers (`line` is decorative only), secondary text (`slate-500/600`), body text (`ink`) |
| Court accent (optional) | `--court-blue #1F5EA8` | Court illustrations only: playing surface behind white lines, with `navy-800/700` for the kitchen. It is a cousin of the navy, so it fits. Do not use it as a fifth UI colour. |
| Status | `--green-700 #1E7A46` success · `red-700` error · `yellow-50` with `yellow-800` text for warnings · `navy-50` with `navy-900` text for info | Forms, sign-ups and the member area |

**Court green is not recommended.** Red, yellow and green together read as a traffic light or as Christmas,
and they fight the Baden identity. Courts on the site should be blue.

**Roles in one line:** navy carries the brand and red drives actions; yellow is the spark, used sparingly as
blocks and highlights, never as text on white. Use `ink` for body text and `navy-900` for surfaces. Pick one
of `white` or `chalk` as the page background for each concept.

```css
:root {
  --navy-950:#021427; --navy-900:#052443; --navy-800:#0C3561; --navy-700:#174A80;
  --grip-300:#7A96B6; --navy-200:#B5C5D8; --navy-100:#DCE4EE; --navy-50:#EEF2F7;
  --red-800:#9E0E1E; --red-700:#C41224; --red-600:#EA162C; --red-400:#FF6470; --red-100:#FDDDE0; --red-50:#FFF0F1;
  --yellow-800:#6B5300; --yellow-700:#806300; --yellow-500:#FEDD02; --yellow-300:#FFE95C; --yellow-100:#FFF5B3; --yellow-50:#FFFBE0;
  --white:#FFFFFF; --chalk:#F8F6F0; --mist:#EEF1F4; --line:#D5DCE3; --slate-500:#5A6B78; --slate-600:#4A5D6B; --ink:#14303C;
  --court-blue:#1F5EA8; --green-700:#1E7A46;
}
```

### 2.3 WCAG contrast (computed with the WCAG 2.x relative-luminance formula)

AA needs 4.5:1 for normal text. Large text (24 px, or 18.66 px bold) and UI parts such as borders and icons need
3:1. AAA needs 7:1.

| Foreground on background | Ratio | Result |
|---|---|---|
| `navy-900` on `white` | 15.67 | AAA |
| `ink` on `white` / `chalk` / `mist` | 13.84 / 12.80 / 12.20 | AAA |
| `slate-600` on `white` / `chalk` | 6.84 / 6.33 | AA |
| `slate-500` on `white` / `chalk` / `mist` | 5.51 / 5.10 / 4.86 | AA |
| `white` on `navy-900` / `navy-950` | 15.67 / 18.55 | AAA |
| `yellow-500` on `navy-900` / `navy-950` | 11.61 / 13.74 | AAA (a hero signature) |
| `navy-900` on `yellow-500` | 11.61 | AAA (yellow buttons and bands with navy text) |
| `ink` on `yellow-500` / `yellow-100` | 10.25 / 12.49 | AAA |
| `navy-200` on `navy-900` | 8.91 | AAA (secondary text on dark) |
| `grip-300` on `navy-900` | 5.12 | AA (muted text on dark) |
| `white` on `red-600` | 4.52 | AA, only just. Fine for buttons at 16 px semibold or larger |
| `white` on `red-700` | 6.07 | AA (hover state; safer for small button text) |
| `red-600` on `white` | 4.52 | AA, only just |
| `red-600` on `chalk` / `mist` | 4.18 / 3.98 | **Fails for body text.** Large or UI only; use `red-700` instead |
| `red-700` on `white` / `chalk` / `mist` | 6.07 / 5.62 / 5.36 | AA (red links and small red labels) |
| `red-400` on `navy-900` | 5.45 | AA (red text in dark sections) |
| `red-600` on `navy-900` | 3.47 | Large or UI only |
| `navy-900` on `red-600` | 3.47 | Large or UI only |
| `red-600` on `yellow-500` | 3.35 | Large or UI only, and it vibrates; avoid for text |
| `red-700` on `yellow-500` | 4.50 | Borderline; avoid |
| `yellow-500` on `red-600` | 3.35 | Large or UI only |
| `white` on `court-blue` | 6.51 | AA |
| `yellow-500` on `court-blue` | 4.82 | AA |
| `navy-900` on `court-blue` | 2.41 | **Fails** |
| `grip-300` on `white` | 3.06 | UI only (OK for input borders and icons, not for text) |
| `line` on `white` | 1.38 | Decorative dividers only; **fails** as a form-field border, so use `grip-300` or `slate-500` |
| `green-700` on `white`, `white` on `green-700` | 5.35 | AA |
| `yellow-800` on `yellow-50` | 7.03 | AAA (notice boxes) |
| **`white` on `yellow-500`** | **1.35** | **Fails. Never** |
| **`yellow-500` on `white`** | **1.35** | **Fails. Never use it for text or thin lines on white** |

## 3. Typography

### 3.1 Matching the wordmark

The fonts were rendered against the logo at the same cap height in headless Chrome. The logo's "PICKLEBALL" is
6.33 times as wide as its cap height.

| Wordmark part | Closest Google Fonts | Notes |
|---|---|---|
| "PICKLEBALL" (heavy, condensed, italic) | **Barlow Condensed 900 italic** (ratio 6.13) and **Barlow Semi Condensed 900 italic** (6.93) bracket it; **Saira 900 italic at `font-stretch: 87.5%`** (6.56) | Barlow has the same rounded-square, DIN-like bowls. Roboto Condensed 900i (6.76) and Fira Sans Condensed 900i (6.81) are close in width but more neutral. Archivo, Kanit and Exo 2 are wider (8–9). |
| "SÜDBADEN e.V." (medium geometric, tracked) | **Figtree 500–600** with `letter-spacing: .1–.12em`; also Outfit 500 and Albert Sans 600 | Montserrat 500 has the right feel but is wider than the logo. |

### 3.2 Pairing options (one per concept, or mix as needed)

| Option | Display (headlines, set in italic caps) | Text (body, UI, forms) | Personality | Google Fonts URL (prototype only) |
|---|---|---|---|---|
| **A: Club heritage** (closest to the logo) | Barlow Condensed 800–900 italic; 600–700 upright for labels and numbers | Figtree 300–900 (variable, with italics) | Sporty and trustworthy; looks like the logo | `https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;1,700;1,800;1,900&family=Figtree:ital,wght@0,300..900;1,300..900&display=swap` |
| **B: Modern sport** (variable and flexible) | Saira, variable width and weight; use about `font-stretch: 87.5%` at weight 800–900 italic | Inter (variable, optical sizes; the best choice for dense forms and the member area) | Clean, techy, "league app" | `https://fonts.googleapis.com/css2?family=Saira:ital,wdth,wght@0,50..125,100..900;1,50..125,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap` |
| **C: Playful community** | Kanit 800–900 italic (wider, rounder, more cheeky) | Nunito Sans (variable, friendly, with italics) | Warm, family-friendly, "come try it" | `https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,600;1,700;1,800;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap` |

To echo the logo's second line in any option, use a small eyebrow or label style: the text font at weight
500–600, uppercase, `letter-spacing: .12em`.

### 3.3 Language coverage (checked, not assumed)

All recommended styles were loaded in Chrome. Each character was then measured against three local fallback
fonts that contain it; if the measured width changes with the fallback, the glyph is missing. A Cyrillic
control character showed the test works: it was correctly reported missing from the Latin-only fonts.

- **All recommended fonts have every German and French glyph we need:** ä ö ü Ä Ö Ü ß é è ê ë à â î ï ô û ù ÿ
  ç Ç œ Œ æ Æ « » „ “ ” ‚ ‘ ’ – — … € ·, plus the no-break space (U+00A0) and the narrow no-break space
  (U+202F).
- **Exception: Barlow and Barlow Condensed have no capital sharp S (ẞ, U+1E9E).** This rarely matters, because
  `text-transform: uppercase` turns ß into "SS". Figtree, Saira, Inter, Kanit and Nunito Sans do have it.

Typesetting rules for all three languages:

- **Never apply `text-transform: uppercase` to the club name.** It turns "e.V." into "E.V.". Type the caps in the
  source instead: "SÜDBADEN e.V."
- French needs a narrow no-break space before `; : ! ?` and inside « ». Without it, « can wrap onto its own
  line. Put U+202F in the French strings, or fix it in the i18n layer.
- Set `lang="de"`, `lang="fr"` or `lang="en"` on `<html>` so that `hyphens: auto` works. German compounds such as
  "Mitgliedschaftsantrag" need hyphenation in narrow columns, and condensed display caps also help with long
  words.
- Plan for German copy running 20–35% longer than English in buttons and navigation.

### 3.4 Data protection (DSGVO): self-host the fonts in production

Concepts may use the Google Fonts CDN links above for speed. **The production site must self-host the font
files.** Loading fonts from `fonts.googleapis.com` sends each visitor's IP address to Google. LG München I
(20 Jan 2022, 3 O 17493/20) awarded damages for this, and a wave of Abmahnungen (cease-and-desist letters) aimed
at German sites followed. Use Fontsource (`@fontsource-variable/figtree` and similar) or download the WOFF2
files. Subset them to the latin and latin-ext ranges, and do not call any Google domain at runtime.

## 4. Assets in `concepts/shared/`

| File | Size | Use |
|---|---|---|
| `logo-transparent.png` | 1176 × 1054, RGBA | Full stacked logo on light backgrounds (white, chalk, mist, light photos). The navy is unmixed at the edges, so there is no white halo on coloured backgrounds. |
| `logo-on-dark.png` | 1176 × 1054, RGBA | Full logo for navy or dark backgrounds. Navy text, outlines, grips and motion lines become white; yellow, red and the grip wraps stay; the ball holes stay navy because they read as see-through. |
| `logo-mark.png` | 966 × 658, RGBA | Paddles, ball and motion lines only. For the nav bar next to HTML text, for social avatars and for stickers. |
| `logo-mark-on-dark.png` | 966 × 658, RGBA | The mark for dark backgrounds (same recolour rule). |
| `logo-wordmark.png` | 1160 × 390, RGBA | "PICKLEBALL / SÜDBADEN e.V." and the underline. Place it beside `logo-mark.png` in CSS for a horizontal header lockup. |
| `logo-wordmark-on-dark.png` | 1160 × 390, RGBA | The wordmark for dark headers and footers. |
| `ball.svg` | viewBox 100 × 100 | Clean vector ball: 10 holes placed on a sphere and foreshortened. The outline uses `currentColor` (navy by default). Inline it and set `color:#fff` on dark backgrounds. Use it for bullets, loaders, bouncing-ball animation and section dividers. |
| `paddle.svg` | viewBox 200 × 420 | Upright paddle: yellow face, red Baden stripe, navy outline and grip with blue-grey wraps. Outline and grip use `currentColor`. Rotate it with CSS (about ±35°) to echo the crossed paddles. If you inline it more than once on a page, prefix its ids (`face`, `faceClip`, `gripClip`). |
| `favicon.svg` | viewBox 32 × 32 | Simplified ball (1 + 6 holes, thicker outline) that stays readable at 16 and 32 px. |
| `favicon-32.png` | 32 × 32, RGBA | Fallback favicon (`<link rel="icon" sizes="32x32">`). |
| `apple-touch-icon.png` | 180 × 180, opaque | iOS home screen: a navy square with the ball, white motion lines and the red underline. iOS rounds the corners itself. |
| `court-lines.svg` | viewBox −18 −18 564 276 (units: inches) | Regulation court seen from above: 20 × 44 ft, 2-inch lines, a 7 ft kitchen on each side of the net, centrelines only from the kitchen line to the baseline, and net posts 1 ft outside the sidelines. The lines use `currentColor` (white by default). `.court-surface` and `.kitchen` are transparent rectangles you can fill with CSS when the SVG is inlined (for example `court-blue` with `navy-800`). Use it for hero backgrounds, "how to play" diagrams and section motifs. |

How the PNGs were made: the alpha comes from projecting each edge pixel onto the white-to-ink line of the
nearest solid ink colour (a colour unmix). Opaque pixels were snapped to the sampled palette to remove JPEG
noise, and isolated ringing specks were removed. Edges were checked at 3–4x zoom on magenta, navy and dark
grey. The thin light lines where the two grips cross, and at the grip collar, are kept: they are part of the
drawing and read as separation lines.

## 5. Logo rules

**Clear space.** Use the ball's diameter as the unit **B**; it is about 20% of the stacked logo's height.
Leave at least **½ B** of empty space on every side (about 10% of the logo height). One full **B** is better
in heroes.

**Minimum sizes** (screen):

- Stacked logo: **96 px tall** (25 mm in print). Below that, "SÜDBADEN e.V." becomes smaller than a 6 px cap
  height.
- Wordmark: **40 px tall**.
- Mark: **32 px tall**. Below 32 px, use `favicon.svg` instead of the mark.

**Do:**

- Use `logo-transparent.png` on white, chalk, mist or the light tints.
- Use the `-on-dark` versions on navy-900, navy-950 or ink.
- On a photo, place the logo on a calm area, or on a solid navy or white panel or card.
- Use the mark plus HTML text for the site header ("Pickleball Südbaden e.V." set in the display font), so the
  name stays translatable, selectable and sharp.

**Don't:**

- Don't place the normal logo on yellow or red: the paddle faces and ball merge into yellow, and the stripes and
  underline vanish into red. Use a white or navy panel instead.
- Don't use the dark version on mid-tones such as court-blue or `grip-300`; the white parts lose contrast.
  Use navy or a darker background.
- Don't put the logo on busy photos (players, nets or fences behind it).
- Don't recolour, stretch, rotate, outline or add drop shadows to the logo.
- Don't rebuild the wordmark from live text in a lookalike font.
- Don't separate the red underline from "SÜDBADEN e.V." in the full logo.
- Don't use the logo smaller than the minimum sizes above.
- Don't upscale the PNGs beyond their native size; ask for the vector instead.
