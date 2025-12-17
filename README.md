# The Plonkys — official site

Modern, mobile-first single-page site for The Plonkys. Built with semantic HTML, vanilla CSS/JS, and JSON-driven content for tour dates, merch, and site-wide config.

## Quick start

Open `index.html` in any modern browser or deploy to static hosting (Netlify, Vercel, GitHub Pages). No build step required.

## Editing content

- **Core config**: `data/config.json` holds band name, tagline, description, social links, press quotes, member list, booking email, and the latest release (cover art path, CTA, tracklist). Update values and reload the page.
- **Tour dates**: `data/tour.json` is an array of shows with `date` (YYYY-MM-DD), `city`, `venue`, `time`, `region`, `ticketUrl`, and `status`. Regions become filter buttons automatically.
- **Merch**: `data/merch.json` drives the merch grid. Each item needs `title`, `price`, `image`, and `url` for the buy button.
- **Hero image/video**: replace `assets/images/hero-visual.svg` with your preferred hero photo or video poster. Update the `<img>` in `index.html` and/or link to a hosted video background if desired.
- **Gallery**: swap images in `assets/images/gallery-*.svg` or point the `<figure>` tags in `#media` to real photos.

## Deployment

- **Netlify/Vercel**: create a new project, select this repository, and deploy as a static site. No build command required; publish directory is the repo root.
- **GitHub Pages**: enable Pages for the repository and deploy from the `main` branch (root folder).

## Accessibility & performance

- Sticky nav with skip link, smooth scrolling, and section highlighting.
- Prefers-reduced-motion respected; IntersectionObserver handles reveal animations.
- Semantic sections, aria labels, and responsive images.

## Contact

Update `bookingEmail` in `data/config.json`. The contact and newsletter forms are client-side only; connect them to your provider (e.g., Formspree, Mailchimp) by adjusting form actions if needed.
