# Syntac Studio — Next.js Site

A clean, editorial-style portfolio site built with Next.js 14 (App Router) and TypeScript.

## Stack
- **Next.js 14** — App Router
- **TypeScript**
- **CSS Modules** — scoped styles per component, no Tailwind needed
- **Google Fonts** — DM Serif Display + DM Sans

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
syntac/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Home page (composes all sections)
│   └── globals.css       # Global resets + CSS variables
│
└── components/
    ├── Nav.tsx / .css     # Fixed nav with mobile hamburger drawer
    ├── Hero.tsx / .css    # Full-height hero, text only (add your image here)
    ├── Marquee.tsx / .css # Infinite scrolling marquee strip
    ├── Work.tsx / .css    # Filterable project list (editorial row style)
    ├── Services.tsx / .css # Dark 3-column services section
    ├── About.tsx / .css   # Stats + team grid
    ├── CTA.tsx / .css     # Orange contact CTA
    └── Footer.tsx / .css  # Dark footer with socials
```

## Adding Your Hero Image

In `components/Hero.tsx`, add your image inside `.inner`:

```tsx
import Image from 'next/image';

// Inside the .inner div, after the CTA buttons:
<div className={styles.heroImage}>
  <Image src="/your-image.jpg" alt="Syntac" fill style={{ objectFit: 'cover' }} />
</div>
```

Then add the CSS in `Hero.module.css`:
```css
.heroImage {
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  width: 45%;
  height: 70vh;
}
```

## Updating Content

- **Projects** → `components/Work.tsx` — edit the `projects` array
- **Services** → `components/Services.tsx` — edit the `services` array
- **Team & Stats** → `components/About.tsx` — edit `stats` and `team` arrays
- **Contact email** → `components/CTA.tsx`
- **Social links** → `components/Footer.tsx`

## Deployment

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) for zero-config hosting — just push to GitHub and connect your repo.

## Colors (CSS Variables in globals.css)

| Variable    | Value     | Use             |
|-------------|-----------|-----------------|
| `--cream`   | `#F5F2ED` | Background      |
| `--ink`     | `#1A1916` | Text / dark bg  |
| `--accent`  | `#C94B2C` | Orange accent   |
| `--muted`   | `#8A8680` | Secondary text  |
| `--border`  | `#E0DDD8` | Dividers        |
