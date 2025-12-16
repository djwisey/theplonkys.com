# The Plonkys — Next.js site

A modern, responsive site for The Plonkys (Shetland folk/indie). Built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX content.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Content model
- `content/gigs.json`: array of gigs with `id, date, time, venue, town, ticketsUrl, notes, status`.
- `content/news/*.mdx`: MDX posts with frontmatter `title, date, excerpt, coverImage`.
- `content/band.json`: band bio, socials, members, embeds, gallery, videos, quotes, and EPK links.

## Updating content
- **Add a gig:** Edit `content/gigs.json` and add an entry. Set `status` to `upcoming` or `past`.
- **Add a news post:** Create a new `.mdx` file in `content/news/` with frontmatter and markdown body.
- **Change band members/socials:** Update `members` or `socials` arrays in `content/band.json`.
- **Update embeds/photos:** Replace URLs inside `embeds`, `gallery`, or `videos` in `content/band.json`.

## Customizing
- Colors live in `tailwind.config.ts` (`ocean`, `seaglass`, `amber`).
- Typography uses Google Fonts configured in `src/app/layout.tsx`.
- Global styling in `src/app/globals.css`; section spacing via `Section` component.
- SEO defaults in `src/app/layout.tsx`, with sitemap/robots in `src/app/sitemap.ts` and `src/app/robots.ts`.

## Accessibility & UX
- Skip link, accessible mobile menu, dark mode toggle, and focus-friendly forms are included.

## Deployment
Run `npm run build` and serve with `npm start`, or deploy to platforms like Vercel.
