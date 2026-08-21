# Content Checklist — Benjamin Kamau Portfolio

This document tracks all unresolved content gaps that need to be filled before or after launch.

---

## Social Links

| Item | Status | Notes |
|---|---|---|
| GitHub URL | Resolved | Verified public profile `https://github.com/kamaubenjamin` is configured centrally in `src/data/social.ts` |
| LinkedIn URL | Not provided | Field is `undefined` in `src/data/social.ts` — no button renders |
| Email address | Resolved | Verified `benjaminkamauu@gmail.com` is configured centrally in `src/data/social.ts`; Web3Forms associates the public access key with this recipient, and the direct fallback link remains visible |
| WhatsApp number | Not provided | Field is `undefined` in `src/data/social.ts` — no button renders |

---

## Projects — External URLs

| Project | Repository URL | Live Demo URL |
|---|---|---|
| Intelligent Document Processing Platform | Not provided | Verified UAT frontend and API; authenticated, tenant-scoped, read-only synthetic-data technical previews, not production |
| ExploreAfrica | Not provided | Verified earlier public showcase; newer Admin Portal capabilities remain locally validated and are not demonstrated by this link |
| Competitor Price Intelligence Platform | Private proprietary source; no public repository CTA | No hosted Streamlit deployment verified |
| FlowSync | Private proprietary source; no public repository CTA | Verified original public dashboard technical preview; not production-ready or fully data-integrated |
| Pair and Place Website Operations | Not provided | Verified live client website; no claim of original complete-site design or build |
| GymBolt Management System | Private source repository | Functional hosted frontend at `https://gymbolt.pages.dev`; pilot-oriented release candidate with verified Daraja sandbox architecture, not production M-Pesa |
| Spice Harvest Ops | Private source repository | Production Deployed at `https://spice-harvest-ops.pages.dev`; Neon Auth → authenticated Cloudflare Pages Functions → Neon PostgreSQL, with no traction or measured-impact claim |
| Home Health Operations Demo | Private source repository; no public repository CTA | Client-validation prototype at `https://richard-home-health-demo.pages.dev`; fictional sample data and local React state only, not production healthcare software |
| Essiedo Catalogue Pilot | Not publicly linked | Live pilot at `https://essiedo-catalogue-pilot.pages.dev`; seller review and initial link sharing observed, with no measured commercial-outcome claim |

---

## Project Screenshots

| Project | Status | Notes |
|---|---|---|
| All projects | Not provided | No project screenshots are publicly rendered. Verified screenshots can later be added to `public/images/projects/` and referenced through the optional `image` field. |

---

## Case-Study Details (Optional Fields)

| Project | Problem | Architecture | Responsibilities | Solution | Capabilities | Challenges | Current Status | Roadmap | Lessons Learned |
|---|---|---|---|---|---|---|---|---|---|
| Intelligent Document Processing Platform | Included | Included | Not specified | Included | Included | Not specified | Included | Included | Not specified |
| ExploreAfrica | Included | Included | Not specified | Included | Included | Not specified | Included | Included | Not specified |
| Competitor Price Intelligence Platform | Included | Included | Not specified | Included | Included | Not specified | Included | Included | Not specified |
| FlowSync | Included | Included | Not specified | Included | Included | Not specified | Included | Not specified | Not specified |
| Pair and Place Website Operations | Not specified | Not specified | Not specified | Included | Included | Not specified | Included | Not specified | Not specified |
| GymBolt Gym Management System | Included | Included | Included | Included | Included | Not specified | Included | Included | Not specified |
| Spice Harvest Ops | Included | Included | Included | Included | Included | Not specified | Included | Not specified | Not specified |
| Home Health Operations Demo | Included | Included | Included | Included | Included | Not specified | Included | Included | Not specified |
| Essiedo Catalogue Pilot | Included | Not specified | Not specified | Included | Included | Not specified | Included | Not specified | Not specified |

### Verified Project Priorities and Boundaries

- Intelligent Document Processing is the main current project; v0.22 — Deterministic Purchase-Order Demonstration is complete.
- The authenticated, read-only UAT frontend and API are deployed with synthetic, non-confidential demonstration data.
- Current verified IDP milestone is v0.23 — Purchase-Order Accuracy Corpus Foundation, covering six fictional deterministic layouts with exact governed corpus metrics; this is not a production-accuracy claim.
- OCR, hosted uploads, human review and AI-assisted extraction remain planned capabilities.
- The newer Document Intelligence FlowSync frontend and API remain separate from the original Competitor Price Intelligence FlowSync product; their business logic, APIs, entities, workflows and integrations are not unified.
- ExploreAfrica is at V4-M11 — Document Intelligence integration readiness. Core admin and private-document workflows are validated locally; production deployment remains unverified.
- ExploreAfrica’s public link is the earlier travel showcase; it does not demonstrate the newer customer, booking, traveller, payment, private-document, tenancy, RLS or Supabase Admin Portal capabilities.
- Competitor Price Intelligence is paused as a separate preserved product.
- Competitor Price Intelligence evolved from a reusable Python ETL foundation covering extraction, Pandas transformation, validation, CSV and SQLite loading, pipeline state, logging and orchestration. The ETL foundation is architecture history, not a separate production platform or public case study.
- The original hosted FlowSync dashboard belongs to Competitor Price Intelligence and workflow monitoring. It is a functional public technical preview with incomplete live-data integration, not the newer Document Intelligence interface.
- Pair and Place has completed its safe WordPress-side maintenance phase; hosting-panel review, analytics, conversion tracking, Elementor work and booking improvements remain unresolved.
- Pair and Place’s link is the live client website; Benjamin’s scope was maintenance and operations, not an original complete-site design or build claim.
- FlowSync uses Clerk authentication UI and Supabase-backed competitor records; execution and scraping remain external, and live Engine integration is not fully verified.
- Featured order is GymBolt, Spice Harvest Ops and Intelligent Document Processing. Additional Work order is Home Health Operations Demo, ExploreAfrica, FlowSync, Competitor Price Intelligence, Pair and Place and Essiedo Catalogue Pilot.
- GymBolt is a deployed pre-production / pilot-oriented release candidate using isolated single-gym deployments. Its functional Cloudflare Pages frontend and Daraja sandbox architecture are verified; production M-Pesa is disabled, final real receipt-email delivery acceptance is pending, and no pilot, paying client, production user or customer revenue is claimed.
- Spice Harvest Ops is Production Deployed for The Spice Harvest Market. WhatsApp Business remains the customer-facing ordering channel; the app is the private owner layer for authentication, orders, payment, fulfilment and sales history. The Supabase → Neon migration is complete, with Neon Auth, an authenticated Cloudflare Pages Functions API and Neon PostgreSQL active in production. Supabase remains only as a rollback snapshot/backup. Acceptance counts are engineering evidence, not traction or revenue; long-term adoption and measured impact are not claimed.
- Home Health Operations Demo is a working responsive client-validation prototype based on real prospective-client discovery. It uses fictional sample data and local React state only; it has no real patient information, backend, database, authentication, server persistence, production healthcare deployment, clinical capability or compliance claim.
- Essiedo Catalogue Pilot is live and validating whether structured browsing improves the handoff from Instagram/WhatsApp discovery to product-specific WhatsApp enquiries. Seller review and link sharing are observed activity, not evidence of sales, conversion, revenue or adoption outcomes. Proposed V2 seller-management and size-guidance features are not implemented.
- Exactly nine selected public case studies are generated. The banks, used-car fuel, movie-scraping and standalone ETL-foundation entries are intentionally excluded from public project selection.
- Serious product source repositories are private/proprietary; public CTAs use verified live sites and technical previews rather than inaccessible source links.
- Public CV UI references and the public PDF asset have been removed. A current CV is shared directly on request.
- Historical Android repositories are audited learning prototypes and are intentionally not elevated into the selected portfolio case studies.
- Project screenshots remain unresolved, and no unsupported production, deployment, analytics or measured-outcome claims should be published.

---

## Credential URLs (Certifications)

| Certification | Credential URL |
|---|---|
| Technical Support & Workflow Specialist (micro1) | Not provided |
| ETL and Data Pipelines with Shell, Airflow and Kafka (IBM) | Not provided |
| Python for Data Engineering (IBM) | Not provided |
| Relational Database Administration (IBM) | Not provided |
| Linux Shell (IBM) | Not provided |
| IBM ETL Labs (IBM) | Not provided |

---

## Deployment

| Item | Status |
|---|---|
| Production URL | Configured as the existing `workers.dev` URL |
| `NEXT_PUBLIC_SITE_URL` | Configured for the existing `workers.dev` URL in `wrangler.jsonc` and the Cloudflare build script |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Required at local and production build time; public identifier is stored only in ignored `.env.local`, never in documentation |
| Contact delivery | Web3Forms browser-side HTTPS submission; portfolio stores no submissions in its own database |
| Cloudflare Worker name | Configured; preserve the existing name |
| `@opennextjs/cloudflare` | Installed |
| `wrangler` | Installed |
| Custom domain | Not yet connected |

---

## Implemented Metadata

| Item | Status |
|---|---|
| Web app manifest | Implemented |
| Sitemap and robots routes | Implemented |
| Generated favicon and Apple touch icon | Implemented |
| Generated Open Graph image | Implemented |
| Person and ProfessionalService JSON-LD | Implemented with verified-only values |
| Canonical URLs | Implemented with the configured production `NEXT_PUBLIC_SITE_URL` |