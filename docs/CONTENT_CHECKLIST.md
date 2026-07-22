# Content Checklist — Benjamin Kamau Portfolio

This document tracks all unresolved content gaps that need to be filled before or after launch.

---

## Social Links

| Item | Status | Notes |
|---|---|---|
| GitHub URL | Not provided | Field is `undefined` in `src/data/social.ts` — no button renders |
| LinkedIn URL | Not provided | Field is `undefined` in `src/data/social.ts` — no button renders |
| Email address | Resolved | Verified `benjaminkamauu@gmail.com` is configured centrally in `src/data/social.ts`; the direct link and contact form render |
| WhatsApp number | Not provided | Field is `undefined` in `src/data/social.ts` — no button renders |

---

## Projects — External URLs

| Project | Repository URL | Live Demo URL |
|---|---|---|
| Intelligent Document Processing Platform | Not provided | Verified UAT frontend and API; authenticated, tenant-scoped, read-only synthetic-data technical previews, not production |
| ExploreAfrica | Not provided | Verified earlier public showcase; newer Admin Portal capabilities remain locally validated and are not demonstrated by this link |
| Competitor Price Intelligence Platform | Verified shared repository | No hosted Streamlit deployment verified |
| FlowSync | Not provided | Verified original public dashboard technical preview; not production-ready or fully data-integrated |
| Pair and Place Website Operations | Not provided | Verified live client website; no claim of original complete-site design or build |
| ETL Pipeline Foundation | Verified shared repository | No live application; repository includes its later evolution toward Competitor Price Intelligence |

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
| ETL Pipeline Foundation | Not specified | Included | Not specified | Included | Included | Not specified | Included | Not specified | Not specified |

### Verified Project Priorities and Boundaries

- Intelligent Document Processing is the main current project; v0.22 — Deterministic Purchase-Order Demonstration is complete.
- The authenticated, read-only UAT frontend and API are deployed with synthetic, non-confidential demonstration data.
- Current active work is v0.22.1 — Real Purchase-Order Accuracy Baseline; no measured accuracy claim has been established.
- OCR, hosted uploads, human review and AI-assisted extraction remain planned capabilities.
- The newer Document Intelligence FlowSync frontend and API remain separate from the original Competitor Price Intelligence FlowSync product; their business logic, APIs, entities, workflows and integrations are not unified.
- ExploreAfrica is at V4-M11 — Document Intelligence integration readiness. Core admin and private-document workflows are validated locally; production deployment remains unverified.
- ExploreAfrica’s public link is the earlier travel showcase; it does not demonstrate the newer customer, booking, traveller, payment, private-document, tenancy, RLS or Supabase Admin Portal capabilities.
- Competitor Price Intelligence is paused as a separate preserved product.
- ETL Pipeline Foundation and Competitor Price Intelligence intentionally share one repository because it records the ETL foundation’s evolution into the specialized monitoring product; no hosted Streamlit demo is verified.
- The original hosted FlowSync dashboard belongs to Competitor Price Intelligence and workflow monitoring. It is a functional public technical preview with incomplete live-data integration, not the newer Document Intelligence interface.
- Pair and Place has completed its safe WordPress-side maintenance phase; hosting-panel review, analytics, conversion tracking, Elementor work and booking improvements remain unresolved.
- Pair and Place’s link is the live client website; Benjamin’s scope was maintenance and operations, not an original complete-site design or build claim.
- ETL Banking has been renamed ETL Pipeline Foundation and is a completed foundation whose verified repository later evolved toward Competitor Price Intelligence.
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