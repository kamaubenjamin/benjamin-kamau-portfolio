# Architecture — Benkai Systems Portfolio

## Route Architecture

All routes are pre-rendered at build time (`next build` with `output: "export"`) and served as static assets:

| Route | Type | Purpose |
|---|---|---|
| `/` | Static export | Homepage with 9 sections |
| `/projects` | Static export | Project listing (9 published case studies, canonical order) |
| `/projects/[slug]` | Static export (`generateStaticParams`) | One pre-rendered case-study page per slug |
| `/services` | Static export | All 6 services |
| `/about` | Static export | Bio, experience, education, certifications, skills |
| `/contact` | Static export | Accessible client-side inquiry form delivered through Web3Forms |
| `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image` | Static export | Build-time generated metadata files |
| `/*` | Static export | Custom 404 served from `out/404.html` |
| `/api/chat` | Worker (`workers/index.ts`) | Benkai Assistant (local-grounded first, then Gemini) |
| `/api/chat/analytics` | Worker (`workers/index.ts`) | Anonymous Assistant UI events |

Static pages export route metadata, while project pages use `generateStaticParams` plus `generateMetadata`. Canonicals resolve through the shared `NEXT_PUBLIC_SITE_URL` base.

Only `/api/*` reaches executing Worker code: `wrangler.jsonc` declares `run_worker_first: ["/api/*"]` alongside `not_found_handling: "404-page"`, so page, asset and metadata requests are answered by the static asset layer, and unknown paths are served from the pre-built 404 page. No middleware runs, and no request-time slug validation is required because every published slug is pre-rendered.

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

- `personal.ts` — name, title, tagline, bio, location and availability
- `nav.ts` — navigation link items
- `social.ts` — GitHub, LinkedIn, email, WhatsApp (all optional)
- `projects.ts` — 9 published project case studies with full field support (slug, title, category, status, descriptions, technologies, optional case-study fields)
- `services.ts` — 6 services with icon mapping, descriptions, features
- `experience.ts` — work history with company, role, period, highlights
- `education.ts` — degree entries
- `certifications.ts` — training and certification entries (optional credential URLs)
- `skills.ts` — categorised skills with proficiency level (expert, proficient, expanding)

No database and no CMS. The only request-time code is the narrow Assistant API Worker in `workers/`; every published page is pre-rendered. Content changes are made by editing these TypeScript files.

`src/data/projects.ts` controls the canonical project data and public display order: nine published case studies ordered GymBolt, House of Original, ExploreAfrica, Intelligent Document Processing Platform, Spice Harvest Ops, Essiedo Catalogue Pilot, Home Health Operations Demo, Pair and Place Website Operations, FlowSync. The Competitor Price Intelligence Platform is archived out of the public dataset and order.

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

- **Platform:** Cloudflare Workers with static assets
- **Production URL:** `https://benkai-systems.benjamin-kamau.workers.dev`
- **Build process:** `next build` with `output: "export"` pre-renders every public route into `out/`
- **Runtime:** Normal page, asset and metadata requests are served by the Cloudflare static asset layer and never invoke Worker code. Only `/api/*` executes the narrow Worker in `workers/index.ts`
- **Tooling:** Wrangler bundles `workers/index.ts`, uploads `out/` as the asset set, and handles preview and deployment
- **Configuration:** `wrangler.jsonc` defines the Worker entry, the `out/` asset directory with `run_worker_first: ["/api/*"]`, `not_found_handling: "404-page"`, compatibility settings, observability, bindings and the canonical site URL
- **No request-time route validation:** middleware is not used. Every published project slug is pre-rendered, and unknown paths are served from the pre-built custom 404 page
- **No database, no backend rendering** — all content is static TypeScript data compiled at build time

**Why version one has no database or backend:**
- All content is static and changes infrequently
- TypeScript data files are version-controlled, type-checked, and immediately reviewable in pull requests
- Eliminates hosting costs, security surface area, and maintenance overhead
- The contact form validates locally and posts directly to Web3Forms using the build-time public `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; Web3Forms forwards enquiries to the key's verified recipient
- The portfolio retains no form-submission database or email backend; a visible `mailto:` link remains as a fallback