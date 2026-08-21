# Deployment Checklist — Benjamin Kamau Portfolio

## Pre-Deployment Checks

### Code Quality
- [x] `npm run lint` — no errors or warnings
- [x] `npx tsc --noEmit` — no TypeScript errors
- [x] `npm run build` — production build succeeds

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
- [ ] Contact form — labels, `aria-invalid`, error associations, sending state, success/error announcements, fallback link

### Content Integrity
- [ ] No fake links — all `href` values point to real routes or are omitted
- [ ] No unsupported claims — no fabricated stats, testimonials, or outcomes
- [ ] No secrets or private information exposed
- [ ] No raw "TODO" or placeholder text visible in the browser
- [ ] No `#` placeholder URLs — optional fields are omitted, not set to `#`

### Route Verification
- [x] `/` — Homepage renders
- [x] `/projects` — All 9 projects listed
- [x] `/projects/gymbolt-gym-management-system` — Case study loads
- [x] `/projects/spice-harvest-ops` — Case study loads
- [x] `/projects/intelligent-document-processing-platform` — Case study loads
- [x] `/projects/home-health-operations-demo` — Case study loads
- [x] `/projects/exploreafrica-travel-platform` — Case study loads
- [x] `/projects/flow-sync` — Case study loads
- [x] `/projects/competitor-price-intelligence-platform` — Case study loads
- [x] `/projects/pair-and-place-website-operations` — Case study loads
- [x] `/projects/essiedo-catalogue-pilot` — Case study loads
- [x] Removed project slugs return the custom 404 with status 404
- [x] `/services` — All 6 services displayed
- [x] `/about` — Route loads with one `h1`
- [x] `/contact` — Route loads with one `h1`
- [x] `/nonexistent` — Custom 404 page returns status 404

### Asset Verification
- [x] Public CV links and public PDF asset are absent
- [x] `public/images/portfolio-reference.png` exists (reference only, not displayed)
- [x] `/manifest.webmanifest`, `/sitemap.xml`, and `/robots.txt` return successfully
- [x] `/icon`, `/apple-icon`, and `/opengraph-image` generated routes return images

### SEO and Structured Data
- [x] `NEXT_PUBLIC_SITE_URL` resolves route-correct canonicals without duplicate slashes
- [x] Homepage includes verified Person JSON-LD
- [x] `/services` includes grounded ProfessionalService JSON-LD
- [x] Open Graph and Twitter metadata reference the generated preview image

---

## Cloudflare Workers Deployment

### Prerequisites
- [x] Cloudflare account created
- [x] `npx wrangler login` — authenticated with Cloudflare
- [x] `workers.dev` account subdomain registered as `benjamin-kamau`
- [ ] Custom domain purchased (optional — current production URL uses Workers.dev)

### Install Adapter
- [x] `@opennextjs/cloudflare` installed as an application dependency
- [x] Wrangler 4 installed as a development dependency
- [x] `open-next.config.ts` created with the adapter's supported configuration helper

### Configuration
- [x] `wrangler.jsonc` targets Cloudflare Workers (not Pages)
- [x] `main` points to `.open-next/worker.js`
- [x] Compatibility date set to `2026-07-22`
- [x] `nodejs_compat` included in `compatibility_flags`
- [x] Static-assets binding targets `.open-next/assets`
- [x] `NEXT_PUBLIC_SITE_URL` set to the exact production Workers.dev origin
- [ ] `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` present in the build environment (public form identifier; not a Worker secret)
- [x] `.dev.vars`, `.open-next/`, `.wrangler/`, and TypeScript build info excluded from version control
- [x] `package.json` includes `cf:build`, `cf:preview`, `cf:deploy`, `cf:upload`, and `cf:typegen`
- [x] `cf:build` injects the public production origin cross-platform before Next.js prerenders metadata routes
- [x] `cloudflare-env.d.ts` generated from `wrangler.jsonc`

### Build and Deploy
- [x] `npm run build` — standard Next.js build succeeds
- [x] `npm run cf:build` — OpenNext Worker bundle succeeds
- [x] Local Workers-runtime preview returns expected routes and assets
- [x] `npm run cf:deploy` — deployment to Cloudflare Workers succeeds

### Post-Deployment Verification
- [x] All public routes and all nine project slugs return 200 on the live URL
- [x] Unknown routes return the custom 404 with status 404
- [x] No CV link is exposed through navigation, homepage, About page, footer, metadata or structured data
- [x] Metadata renders with route-correct production canonicals and Open Graph URLs
- [x] Manifest, robots, sitemap, favicon, Apple icon, and Open Graph image return expected content types
- [x] Person JSON-LD on `/` and ProfessionalService JSON-LD on `/services` verified
- [ ] Responsive layout verified at 375px, 768px, 1280px on live URL
- [ ] No console errors
- [ ] Controlled Web3Forms submission is accepted and received at `benjaminkamauu@gmail.com`
- [ ] Web3Forms domain restriction reviewed for the production Workers.dev origin (allow localhost only when deliberately testing)
- [ ] Custom domain connected (not applicable to the current Workers.dev launch)
- [x] `NEXT_PUBLIC_SITE_URL` updated to `https://benjamin-kamau-portfolio.benjamin-kamau.workers.dev`

### Current Production Deployment

- **Worker name:** `benjamin-kamau-portfolio`
- **Live URL:** <https://benjamin-kamau-portfolio.benjamin-kamau.workers.dev>
- **Adapter:** `@opennextjs/cloudflare` 1.20.2
- **Wrangler:** 4.113.0
- **Observability:** enabled in `wrangler.jsonc`
- **Custom domain:** not configured

---

## Post-Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph preview on social media debuggers
- [ ] Monitor for any 404s or broken links
- [ ] Update `docs/CONTENT_CHECKLIST.md` with any newly resolved items