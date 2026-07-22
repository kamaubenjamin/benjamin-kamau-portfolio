# Deployment Checklist — Benjamin Kamau Portfolio

## Pre-Deployment Checks

### Code Quality
- [ ] `npm run lint` — no errors or warnings
- [ ] `npx tsc --noEmit` — no TypeScript errors
- [ ] `npm run build` — production build succeeds

### Responsive Layout
- [ ] 375px width — no horizontal overflow, MobileMenu appears, single-column layout
- [ ] 768px width — two-column grids activate, hero text scales correctly
- [ ] 1280px width — three-column grids, matches reference image composition

### Accessibility
- [ ] Keyboard navigation — Tab through all pages, focus-visible rings visible
- [ ] Skip link — appears on first Tab press
- [ ] Reduced motion — enable `prefers-reduced-motion: reduce` in DevTools, animations disabled
- [ ] Alt text — every image has non-empty descriptive alt text
- [ ] Heading hierarchy — exactly one `h1` on each main and project page
- [ ] Mobile menu — trigger state, Escape close, focus return, and 44px targets
- [ ] Contact form — labels, `aria-invalid`, error associations, disabled unconfigured state

### Content Integrity
- [ ] No fake links — all `href` values point to real routes or are omitted
- [ ] No unsupported claims — no fabricated stats, testimonials, or outcomes
- [ ] No secrets or private information exposed
- [ ] No raw "TODO" or placeholder text visible in the browser
- [ ] No `#` placeholder URLs — optional fields are omitted, not set to `#`

### Route Verification
- [ ] `/` — Homepage renders all 9 sections
- [ ] `/projects` — All 6 projects listed
- [ ] `/projects/intelligent-document-processing-platform` — Case study loads
- [ ] `/projects/exploreafrica-travel-platform` — Case study loads
- [ ] `/projects/competitor-price-intelligence-platform` — Case study loads
- [ ] `/projects/flow-sync` — Case study loads
- [ ] `/projects/pair-and-place-website-operations` — Case study loads
- [ ] `/projects/etl-banking-pipeline` — Case study loads
- [ ] `/services` — All 6 services displayed
- [ ] `/about` — Bio, experience timeline, education, certifications, skills, CV download
- [ ] `/contact` — Inquiry form; disabled safely when email is not configured
- [ ] `/nonexistent` — Custom 404 page
- [ ] `public/documents/Benjamin-Kamau-CV.pdf` — CV download prompt

### Asset Verification
- [ ] `public/documents/Benjamin-Kamau-CV.pdf` exists and is served correctly
- [ ] `public/images/portfolio-reference.png` exists (reference only, not displayed)
- [ ] `/manifest.webmanifest`, `/sitemap.xml`, and `/robots.txt` return successfully
- [ ] `/icon`, `/apple-icon`, and `/opengraph-image` generated routes return images

### SEO and Structured Data
- [ ] `NEXT_PUBLIC_SITE_URL` resolves route-correct canonicals without duplicate slashes
- [ ] Homepage includes verified Person JSON-LD
- [ ] `/services` includes grounded ProfessionalService JSON-LD
- [ ] Open Graph and Twitter metadata reference the generated preview image

---

## Cloudflare Workers Deployment

### Prerequisites
- [ ] Cloudflare account created
- [ ] `npx wrangler login` — authenticated with Cloudflare
- [ ] Custom domain purchased (optional — Workers preview URL can be used initially)

### Install Adapter
- [ ] `npm install --save-dev @opennextjs/cloudflare wrangler`
- [ ] Run any scaffolding or init commands provided by the installed `@opennextjs/cloudflare` version

### Configuration
- [ ] `wrangler.jsonc` generated or normalised — targets Cloudflare Workers (not Pages)
- [ ] `main` points to the generated OpenNext Worker entry
- [ ] Compatibility date set to a current date meeting the adapter's documented minimum
- [ ] `nodejs_compat` included in `compatibility_flags`
- [ ] Static-assets binding configured as required by the adapter version
- [ ] `NEXT_PUBLIC_SITE_URL` configured (Cloudflare dashboard or `wrangler.jsonc`)
- [ ] `.dev.vars` created for local development (added to `.gitignore`)
- [ ] Adapter output directory (e.g., `.open-next/`) added to `.gitignore`
- [ ] `package.json` scripts added: `preview`, `deploy`, `cf-typegen` (commands from installed adapter version)

### Build and Deploy
- [ ] `npm run build` — standard Next.js build succeeds
- [ ] Run adapter preview command — local preview works on all routes
- [ ] Run adapter deploy command — deployment to Cloudflare Workers succeeds

### Post-Deployment Verification
- [ ] All routes return 200 on the Workers preview URL
- [ ] CV downloads correctly
- [ ] Metadata renders correctly (title, description, Open Graph)
- [ ] Responsive layout verified at 375px, 768px, 1280px on live URL
- [ ] No console errors
- [ ] Custom domain connected (if applicable) — DNS records updated, HTTPS active
- [ ] `NEXT_PUBLIC_SITE_URL` updated to final production domain

---

## Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph preview on social media debuggers
- [ ] Monitor for any 404s or broken links
- [ ] Update `docs/CONTENT_CHECKLIST.md` with any newly resolved items