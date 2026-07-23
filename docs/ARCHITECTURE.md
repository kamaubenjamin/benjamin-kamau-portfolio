# Architecture — Benjamin Kamau Portfolio

## Route Architecture

All routes are server-rendered static pages (SSG):

| Route | Type | Purpose |
|---|---|---|
| `/` | Static | Homepage with 9 sections |
| `/projects` | Static | Project listing (6 projects) |
| `/projects/[slug]` | SSG (`generateStaticParams`) | Dynamic case studies |
| `/services` | Static | All 6 services |
| `/about` | Static | Bio, experience, education, certifications, skills |
| `/contact` | Static | Accessible client-side inquiry form delivered through Web3Forms |
| `/*` | Static | Custom 404 |

Static pages export route metadata, while dynamic project pages use `generateMetadata`. Canonicals resolve through the shared `NEXT_PUBLIC_SITE_URL` base.

---

## Server/Client Boundaries

**Server components** (default — no `"use client"`):
- All page components
- Layout components: `Header`, `Footer`, `SkipLink`
- Navigation: `DesktopNav`
- Hero: `HeroSection` (all content server-rendered)
- Domain components: `ProjectCard`, `ServiceCard`, `ProcessSteps`
- UI components: `Container`, `Button`, `Card`, `Badge`, `SectionHeading`, `GradientText`, `IconWrapper`, `SectionWrapper`

**Client components** (exhaustive list):
- `MobileMenu` — `useState` for toggle, Framer Motion for slide animation
- `DataFlowVisual` — Framer Motion animated SVG pipeline
- `AnimatedWrapper` — Framer Motion entrance animation wrapper
- `ContactForm` — bounded validation, honeypot, submission states and Web3Forms HTTPS delivery

No other component requires `"use client"`. Server components remain the default.

---

## Metadata and Structured Data

- `src/lib/json-ld.ts` owns the normalized site URL, absolute URL generation, safe JSON serialization, and verified Person/ProfessionalService generators.
- `manifest.ts`, `sitemap.ts`, and `robots.ts` use Next.js metadata routes.
- `icon.tsx`, `apple-icon.tsx`, and `opengraph-image.tsx` generate source-controlled metadata images with `ImageResponse`.
- The homepage injects Person JSON-LD and `/services` injects ProfessionalService JSON-LD.
- Route metadata supplies a single route-correct canonical from `NEXT_PUBLIC_SITE_URL`; the production value is defined in deployment configuration and the Cloudflare build script.

---

## Static Content Architecture

All portfolio content lives in typed TypeScript data files under `src/data/`:

- `personal.ts` — name, title, tagline, bio, location, availability, CV path
- `nav.ts` — navigation link items
- `social.ts` — GitHub, LinkedIn, email, WhatsApp (all optional)
- `projects.ts` — 6 projects with full field support (slug, title, category, status, descriptions, technologies, optional case-study fields)
- `services.ts` — 6 services with icon mapping, descriptions, features
- `experience.ts` — work history with company, role, period, highlights
- `education.ts` — degree entries
- `certifications.ts` — training and certification entries (optional credential URLs)
- `skills.ts` — categorised skills with proficiency level (expert, proficient, expanding)

No database, no API routes, no CMS. Content changes are made by editing these TypeScript files.

---

## Theme Architecture

Design tokens are centralised in `src/styles/theme.ts` as a typed constant object:

- Colors (dark bg, emerald accents, lime highlights)
- Gradients (text gradient, section divider, card glow)
- Spacing, border radii, shadows, borders
- Transition and animation durations

Corresponding CSS variables are defined in `src/app/globals.css` for use in pure CSS contexts. Tailwind v4 is configured via `@theme inline` in `globals.css`.

No theme toggle. One dark green FlowSync-inspired theme.

---

## Case-Study Architecture

Each project in `projects.ts` supports optional fields for detailed case-study sections:

- `problem`, `responsibilities`, `architecture`, `solution`, `capabilities`, `challenges`, `currentStatus`, `roadmap`, `lessonsLearned`
- `repositoryUrl`, `liveDemoUrl` (both optional)

The `/projects/[slug]` route conditionally renders each section only when the corresponding field is defined. When a field is `undefined`, no empty container or placeholder is shown.

Repository and live-demo buttons are only rendered when their respective URL fields are present.

---

## Deployment Architecture

- **Platform:** Cloudflare Workers through `@opennextjs/cloudflare`
- **Production URL:** `https://benjamin-kamau-portfolio.benjamin-kamau.workers.dev`
- **Build process:** Standard Next.js build (`npm run build`), then transformed by OpenNext into a Worker-compatible bundle
- **Runtime:** The OpenNext adapter runs within a Cloudflare Worker, handling request routing, headers, and any future dynamic behaviour
- **Tooling:** OpenNext CLI handles preview and deployment; Wrangler provides the underlying Cloudflare configuration and tooling
- **Configuration:** `open-next.config.ts` defines the adapter build and `wrangler.jsonc` defines the Worker entry, compatibility settings, static asset binding, observability, and canonical site URL
- **Current state:** Fully static (all pages prerendered at build time). Any future dynamic features would run within the Worker runtime
- **No database, no backend** — all content is static TypeScript data compiled at build time

**Why version one has no database or backend:**
- All content is static and changes infrequently
- TypeScript data files are version-controlled, type-checked, and immediately reviewable in pull requests
- Eliminates hosting costs, security surface area, and maintenance overhead
- The contact form validates locally and posts directly to Web3Forms using the build-time public `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; Web3Forms forwards enquiries to the key's verified recipient
- The portfolio retains no form-submission database or email backend; a visible `mailto:` link remains as a fallback