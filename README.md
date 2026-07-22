# Benjamin Kamau — Portfolio

Professional portfolio and services website for **Benjamin Kamau**, a Data Engineer & AI Workflow Automation Specialist based in Nairobi, Kenya.

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

Additional commands will be added after the Cloudflare Workers deployment adapter is installed (see `docs/DEPLOYMENT_CHECKLIST.md`).

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router routes
│   ├── layout.tsx          # Root layout (header, footer, metadata)
│   ├── page.tsx            # Homepage (9 sections)
│   ├── not-found.tsx       # Custom 404
│   ├── loading.tsx         # Loading indicator
│   ├── projects/           # Project listing + [slug] case studies
│   ├── services/           # All 6 services
│   ├── about/              # Bio, experience, education, certifications, skills
│   └── contact/            # Contact info with mailto link
├── components/
│   ├── layout/             # Header, Footer
│   ├── navigation/         # DesktopNav, MobileMenu, SkipLink
│   ├── hero/               # HeroSection, DataFlowVisual
│   ├── projects/           # ProjectCard
│   ├── services/           # ServiceCard
│   ├── process/            # ProcessSteps
│   ├── contact/            # ContactInfo, DownloadCVButton
│   └── ui/                 # Container, Button, Card, Badge, etc.
├── data/                   # Typed static content (personal, projects, services, etc.)
├── lib/                    # Utility functions
└── styles/                 # Theme tokens (theme.ts)
public/
├── documents/              # CV PDF
└── images/                 # Reference image, project screenshots
docs/                       # Architecture, content checklist, deployment checklist
```

---

## Content Editing

All portfolio content is stored as typed TypeScript data files in `src/data/`:

| File | Content |
|---|---|
| `personal.ts` | Name, title, tagline, bio, location, availability, CV path |
| `social.ts` | GitHub, LinkedIn, email, WhatsApp (all optional) |
| `nav.ts` | Navigation link items |
| `projects.ts` | All 6 projects with full fields |
| `services.ts` | All 6 services |
| `experience.ts` | Work history |
| `education.ts` | Education entries |
| `certifications.ts` | Training and certifications |
| `skills.ts` | Categorised skills with proficiency level |

To update content, edit the relevant file. The site rebuilds automatically in development mode.

### Updating Social Links

Edit `src/data/social.ts`. When a URL is set, the corresponding icon appears in the hero section and footer. When a field is omitted or `undefined`, no button renders.

### Replacing the CV

Replace `public/documents/Benjamin-Kamau-CV.pdf` with the updated file. The path is referenced in `src/data/personal.ts` — no code changes needed if the filename stays the same.

### Adding Screenshots

1. Add images to `public/images/projects/`
2. Reference the path in the `image` field of the relevant project in `src/data/projects.ts`

### Adding a Project

1. Add a new entry to the `projects` array in `src/data/projects.ts`
2. Create a corresponding slug
3. The project automatically appears on `/projects` and can be set as `featured` for the homepage

---

## Contact Form

The contact page uses a `mailto:` link. No data is stored on any server. To add server-side form processing, integrate a service like:

- [Formspree](https://formspree.io/)
- [Web3Forms](https://web3forms.com/)
- [Resend](https://resend.com/)

Update the contact page component to POST to the chosen service endpoint and handle the response.

---

## Deployment

This site is designed for deployment on **Cloudflare Workers** using the `@opennextjs/cloudflare` adapter.

See `docs/DEPLOYMENT_CHECKLIST.md` for the full deployment procedure.

### Environment Variables

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and Open Graph | Yes (for production) |

Local development falls back to `http://localhost:3000` when unset.

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

---

## Documentation

- `docs/ARCHITECTURE.md` — Route architecture, server/client boundaries, data architecture, deployment architecture
- `docs/CONTENT_CHECKLIST.md` — All unresolved content gaps (social links, URLs, screenshots, etc.)
- `docs/DEPLOYMENT_CHECKLIST.md` — Full deployment procedure and validation steps