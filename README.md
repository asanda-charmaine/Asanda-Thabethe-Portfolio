# Asanda Charmaine Thabethe — Portfolio

A personal portfolio built with **React + Vite + Tailwind CSS**, animated with **GSAP (ScrollTrigger + Draggable)** and smooth-scrolled with **Lenis**.

## Run it

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install      # first time only
npm run dev      # start the dev server, then open the URL it prints (usually http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build locally
```

## Edit your text

**All the words on the site live in one file: [`src/data/content.js`](src/data/content.js).**

It's split into clearly labelled blocks: hero, About This Portfolio, About Me, Experience, Tech Stack, Notable Projects, Education, Events, Contact, the Play notebook, stickers, intro and footer. Anything marked `[PLACEHOLDER]` still needs your real content.

- **Add a job, project or notebook step:** copy an existing `{ ... }` block, paste it below and edit it. Keep the commas between blocks.
- **Contact links:** update `email`, `linkedin`, `github`, `phone` and `phoneHref` in the `contact` block. The footer dock uses these too.
- **Page title, description and social preview text:** edit the `<title>` and `<meta>` tags in [`index.html`](index.html). After you deploy, change `og:url` to your live domain.

## Replace the images

Images live in `public/assets/`. To swap one, **drop your file in with exactly the same name**. No code changes are needed. If you'd rather use a different name or format, change the matching path in `content.js`.

| File | Where it shows | Suggested size |
| --- | --- | --- |
| `public/assets/profile.png` | Hero portrait and header avatar *(still a placeholder)* | 800 × 800 (square) |
| `public/assets/about.png` | About Me photo *(still a placeholder)* | 800 × 600 (4:3) |
| `public/assets/projects/arms.jpg` | ARMS project card | ~1400 px wide |
| `public/assets/projects/unify-tech.jpg` | Unify Tech handbook card | any; shown whole (`imageFit: 'contain'`) |
| `public/assets/illustrations/step-1.png` … `step-5.png` | Notebook steps 1–5 *(placeholders)* | 600 × 600 (square) |
| `public/assets/og-thumbnail.png` | Link preview on social media *(placeholder)* | 1200 × 630 |
| `public/assets/tools/vscode.png`, `react.png`, `java.png`, `github.png`, `claude.png` | Footer tools row *(placeholders)* | 128 × 128 |
| `public/assets/logo.png` | Bow logo in the header (black on transparent; recoloured in CSS) | ~300 px tall |
| `public/assets/favicon.svg` | Browser tab icon: black bow in light mode, white in dark mode | SVG |
| `public/assets/favicon-32.png`, `apple-touch-icon.png` | Fallback tab icon and phone home-screen icon | 32 and 180 px |

**Adding a project:** put its screenshot in `public/assets/projects/`, then copy a project block in `content.js`. Use `imageFit: 'cover'` for wide website screenshots, or `'contain'` for covers and portrait images.

### Intro stickers (cartoon characters)

When the page first loads, cartoon stickers are placed one at a time from left to right in a loose, random wave. This takes 5–10 seconds depending on how many there are. Then the screen lifts to reveal the site.

1. Drop the original images (PNG/JPG, white backgrounds are fine) into **`sticker-originals/`** in the project root.
2. Run **`npm run stickers`**. It also runs automatically before `npm run dev` and `npm run build`.
   - It removes the white background, trims the image and adds an even white die-cut outline.
   - It saves a small `.webp` to `public/assets/stickers/` and updates `src/data/stickers.json`.
   - Deleting an original also removes its sticker.
3. Reload the page.

Settings live in the `intro` block of `content.js`:
- `shuffle`: a random order on every visit (`false` keeps A→Z file order).
- `minSeconds` / `maxSeconds`: the timing.
- `enabled: false`: turns the intro off.

Visitors can press **Skip intro** or **Esc**. The intro is skipped automatically for people with "reduce motion" turned on, and for links that go straight to a section (such as `/#contact`).

## Project structure

```
index.html              page title, meta and Open Graph tags, Google Fonts
src/data/content.js     ← all of your text
src/index.css           colours, fonts and component styles (design tokens at the top)
src/lib/motion.js       Lenis smooth scroll + GSAP setup
src/App.jsx             section order + scroll-reveal animations
src/data/stickers.json  generated list of intro stickers (don't edit by hand)
src/components/         one file per section (Header, Hero, Resume, Projects, Notebook, IntroLoader, Footer…)
scripts/                prepare-stickers.mjs (background removal for intro stickers)
sticker-originals/      original cartoon images for the intro
public/assets/          images
```

## Design notes

- **Colours** are defined once at the top of `src/index.css` (`--color-cream`, `--color-ink`, `--color-terracotta` and others). Change them there and they update across the site.
- **Fonts** (Google Fonts): *Bricolage Grotesque* for headings, *DM Sans* for body text and *Caveat* for handwritten notes.
- **Motion:** scroll reveals, a hero intro, a drag-to-scroll Work gallery with inertia, and draggable stickers in Play. All of it is switched off for visitors who have "reduce motion" turned on.
- **Accessibility:** skip link, semantic landmarks and headings, visible focus states, alt text, keyboard-scrollable gallery with arrow buttons.

## Deploying

Any static host works (Vercel, Netlify or GitHub Pages). Build with `npm run build` and publish the `dist/` folder. For GitHub Pages under `/<repo-name>/`, set `base: '/<repo-name>/'` in [`vite.config.js`](vite.config.js).
