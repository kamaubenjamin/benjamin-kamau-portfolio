# Benjamin Kamau — Portfolio

Professional portfolio and services website for **Benjamin Kamau**, focused on Data Engineering, Workflow Automation and Document Intelligence, based in Nairobi, Kenya.

Built with Next.js 16, TypeScript, Tailwind CSS v4, Lucide React icons, and Framer Motion.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Animation:** Framer Motion (minimal, restrained)
- **Deployment:** Cloudflare Workers via `@opennextjs/cloudflare`

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server (local preview) |
| `npm run lint` | Run ESLint |
| `npm run cf:build` | Build the OpenNext Worker bundle |
| `npm run cf:preview` | Rebuild and preview with the local Workers runtime |
| `npm run cf:deploy` | Rebuild and deploy to Cloudflare Workers |
| `npm run cf:upload` | Rebuild and upload a new Worker version without deploying it |
| `npm run cf:typegen` | Regenerate Cloudflare binding/runtime types |

The Cloudflare commands use the checked-in `open-next.config.ts` and `wrangler.jsonc` configuration.

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout, metadata and canonical base
│   ├── page.tsx            # Homepage (9 sections)
│   ├── manifest.ts         # Web app manifest
│   ├── sitemap.ts          # Generated sitemap
│   ├── robots.ts           # Generated robots rules
│   ├── icon.tsx            # Generated favicon
│   ├── apple-icon.tsx      # Generated Apple touch icon
│   ├── opengraph-image.tsx # Generated social preview image
│   ├── not-found.tsx       # Custom 404
│   ├── loading.tsx         # Loading indicator
│   ├── projects/           # Project listing + [slug] case studies
│   ├── services/           # All 6 services
│   ├── about/              # Bio, experience, education, certifications, skills
│   └── contact/            # Accessible Web3Forms inquiry form
├── components/
│   ├── layout/             # Header, Footer
│   ├── navigation/         # DesktopNav, MobileMenu, SkipLink
│   ├── hero/               # HeroSection, DataFlowVisual
│   ├── projects/           # ProjectCard
│   ├── services/           # ServiceCard
│   ├── process/            # ProcessSteps
│   ├── contact/            # ContactForm
│   └── ui/                 # Container, Button, Card, Badge, etc.
├── data/                   # Typed static content (personal, projects, services, etc.)
├── lib/                    # Utilities, site URL and JSON-LD generators
└── styles/                 # Theme tokens (theme.ts)
public/
└── images/                 # Reference image, project screenshots
docs/                       # Architecture, content checklist, deployment checklist
```

---

## Content Editing

All portfolio content is stored as typed TypeScript data files in `src/data/`:

| File | Content |
|---|---|
| `personal.ts` | Name, title, tagline, bio, location and availability |
| `social.ts` | GitHub, LinkedIn, email, WhatsApp (all optional) |
| `nav.ts` | Navigation link items |
| `projects.ts` | Audited project case studies with full fields |
| `services.ts` | All 6 services |
| `experience.ts` | Work history |
| `education.ts` | Education entries |
| `certifications.ts` | Training and certifications |
| `skills.ts` | Categorised skills with proficiency level |

To update content, edit the relevant file. The site rebuilds automatically in development mode.

### Updating Social Links

Edit `src/data/social.ts`. When a URL is set, the corresponding icon appears in the hero section and footer. When a field is omitted or `undefined`, no button renders.

### Adding Screenshots

1. Add images to `public/images/projects/`
2. Reference the path in the `image` field of the relevant project in `src/data/projects.ts`

### Adding a Project

1. Add a new entry to the `projects` array in `src/data/projects.ts`
2. Create a corresponding slug
3. The project automatically appears on `/projects` and can be set as `featured` for the homepage

---

## Contact Form

The contact page validates enquiries in the browser and submits them directly to the official Web3Forms HTTPS endpoint. The Web3Forms access key is a public form identifier associated with the verified recipient `benjaminkamauu@gmail.com`; the browser does not provide or override that recipient. The form includes bounded fields, a honeypot, duplicate-submit protection, accessible sending/success/error states, and a visible fallback email link.

Web3Forms processes and forwards submitted data. The portfolio does not store form submissions in its own database.

For local development, copy `.env.example` to `.env.local` and provide the public form identifier:

```dotenv
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
```

Do not commit `.env.local`. Production builds must receive this variable before `npm run cf:build` or `npm run cf:deploy` because Next.js embeds `NEXT_PUBLIC_*` values into the client bundle at build time. No Cloudflare Worker secret, API route, or additional binding is required.

## Current Project Priorities

- Intelligent Document Processing is the main current project; the read-only v0.22 Deterministic Purchase-Order Demonstration is complete and deployed to a synthetic-data UAT frontend and API.
- Current work is a private real purchase-order accuracy baseline, with v0.22.1 as the immediate next milestone.
- OCR, hosted uploads, human review and controlled AI-assisted extraction remain planned rather than implemented.
- The newer Document Intelligence FlowSync frontend and API remain separate from FlowSync's original Competitor Price Intelligence implementation.
- ExploreAfrica is locally validated at V4-M11, with production deployment and later public, payment, CRM, reporting and Document Intelligence workflows still unverified or incomplete.
- Competitor Price Intelligence is paused as a separate preserved product. Its architecture history records the reusable Python ETL foundation from which it evolved; that foundation is not presented as a separate production platform.
- Pair and Place has completed its safe WordPress-side maintenance phase.
- GymBolt is a deployed pre-production / pilot-oriented release candidate at <https://gymbolt.pages.dev>, using isolated single-gym deployments and verified Daraja sandbox architecture. Production M-Pesa remains disabled, final real receipt-email delivery acceptance is pending, and there is no completed pilot, paying gym client or customer revenue.
- Spice Harvest Ops is Production Deployed at <https://spice-harvest-ops.pages.dev> for The Spice Harvest Market. It complements the owner’s existing WhatsApp Business ordering channel with private order, payment, fulfilment and sales tracking through Neon Auth, an authenticated Cloudflare Pages Functions API and Neon PostgreSQL. The completed Supabase → Neon migration retains Supabase only as a rollback snapshot/backup; no scale, traction or measured-impact claim is made.
- Essiedo Catalogue Pilot is a live validation-stage catalogue at <https://essiedo-catalogue-pilot.pages.dev>, testing a structured handoff from Instagram/WhatsApp discovery to product-specific WhatsApp enquiries without replacing the seller’s social-selling workflow.
- Exactly eight selected public case studies are generated. Featured order: GymBolt, Spice Harvest Ops, Intelligent Document Processing Platform. Additional Work order: ExploreAfrica, FlowSync, Competitor Price Intelligence Platform, Pair and Place Website Operations, Essiedo Catalogue Pilot.
- Public CV links, calls to action and the public PDF asset have been removed; current CVs are shared directly on request.
- Verified project links are stored centrally in `src/data/projects.ts`; the original FlowSync dashboard remains separate from the Document Intelligence UAT interface.

## SEO and Accessibility

- Route-correct canonical URLs use `NEXT_PUBLIC_SITE_URL`, with `http://localhost:3000` as the local fallback.
- The App Router generates `manifest.webmanifest`, `sitemap.xml`, `robots.txt`, favicon, Apple touch icon, and Open Graph image routes.
- The homepage includes verified Person JSON-LD; `/services` includes grounded ProfessionalService JSON-LD.
- Pages contain one `h1`, visible keyboard focus states, a skip link, reduced-motion handling, accessible mobile-menu controls, and labelled form errors.

---

## Deployment

This site is deployed on **Cloudflare Workers** using the `@opennextjs/cloudflare` adapter.

**Live site:** [benjamin-kamau-portfolio.benjamin-kamau.workers.dev](https://benjamin-kamau-portfolio.benjamin-kamau.workers.dev)

See `docs/DEPLOYMENT_CHECKLIST.md` for the full deployment procedure.

### Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and Open Graph | Yes (for production) |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Public Web3Forms form identifier associated with `benjaminkamauu@gmail.com` | Yes (for direct contact delivery) |

The site URL falls back to `http://localhost:3000` when unset. Contact submission requires `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` for local development and in the environment used for each production build.

### Quick Start (Local)

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Cloudflare Preview and Deploy

```bash
npm run cf:preview
npm run cf:deploy
```

`NEXT_PUBLIC_SITE_URL` is committed as a non-secret Worker variable in `wrangler.jsonc` so canonicals, sitemap entries, robots output, Open Graph URLs, and structured data use the live `workers.dev` origin during the build.

---

## Documentation

- `docs/ARCHITECTURE.md` — Route architecture, server/client boundaries, data architecture, deployment architecture
- `docs/CONTENT_CHECKLIST.md` — All unresolved content gaps (social links, URLs, screenshots, etc.)
- `docs/DEPLOYMENT_CHECKLIST.md` — Full deployment procedure and validation steps
- `PROJECT_STATUS.md` — Verified portfolio project status and next-phase boundaries
- `CHANGELOG.md` — Portfolio documentation milestones
- `GYMBOLT_PORTFOLIO_CASE_STUDY.md` — Detailed verified GymBolt positioning and claim boundaries
- `SPICE_HARVEST_OPS_PORTFOLIO_CASE_STUDY.md` — Detailed verified Spice Harvest Ops positioning and claim boundaries
- `ESSIEDO_CATALOGUE_PILOT_PORTFOLIO_CASE_STUDY.md` — Detailed Essiedo live-pilot evidence and claim boundaries