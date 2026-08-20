# Portfolio Project Status

## Authoritative Project Order

### Featured Projects

1. GymBolt Management System
2. Spice Harvest Ops
3. Intelligent Document Processing Platform

### Additional Work

1. ExploreAfrica
2. FlowSync
3. Competitor Price Intelligence Platform
4. Pair and Place Website Operations
5. Essiedo Catalogue Pilot

Exactly eight public project case studies are published. This portfolio is the public presentation layer; serious product source repositories are intentionally private and are not exposed as public project CTAs. Archived learning and practice repositories are excluded.

## Intelligent Document Processing Platform

### Current Status

**Active development — v0.23 Purchase-Order Accuracy Corpus Foundation**

- Six fictional deterministic purchase-order layouts
- Exact classification, header, party, date, line-item, financial-reconciliation and warning/finding metrics
- Bounded supplier/ship-to recovery for supported serialized and visual-header patterns
- Repeatable, state-isolated corpus evaluation
- 22 focused purchase-order and corpus tests passing
- v0.22 read-only synthetic UAT remains the hosted technical-preview foundation

IDP is not production-ready. OCR, human review/correction and controlled AI-assisted extraction remain future governed work.

## FlowSync — Competitor & Workflow Intelligence

### Current Status

**Public technical preview / private proprietary source**

FlowSync is the operator/control-plane frontend for Competitor Price Intelligence. Scraping and execution remain external to FlowSync, and full live Engine integration is not verified. It remains separate from IDP’s internal `apps/flowsync-document-intelligence` frontend.

Technical Preview: <https://flow-sync-beta.vercel.app/dashboard>

## Competitor Price Intelligence Platform

### Current Status

**Focused Engine foundation / private proprietary source**

The Engine has a Playwright-first Jumia Electronics MVP, canonical `previous_price`/`current_price` handling with compatibility support, stabilized matching/comparison, stage-count telemetry, optional product-specification handling, scheduler defaults and local-only runtime state. Its deterministic MVP suite reports 29 passed and 1 skipped. Production readiness, production multi-source support, Kafka/Airflow and fully verified FlowSync integration are not claimed.

## Essiedo Catalogue Pilot

### Current Status

**Live Pilot / Validation Stage**

Essiedo already sells through WhatsApp and Instagram. The live catalogue adds structured browsing and a product-specific WhatsApp enquiry handoff without replacing those existing discovery, marketing and conversation channels.

### Observed Evidence

- Essiedo has opened and reviewed the live catalogue
- The seller has started sharing the catalogue link through existing social channels
- Seller feedback surfaced possible V2 requirements
- A separate user suggestion surfaced possible size guidance

Seller-managed uploads, sold-item marking, new-arrival publishing, offer pricing and size guidance remain possible V2 work and are not implemented. No sales, conversion, revenue, workload, productivity or customer-adoption outcome is claimed.

Live Pilot: <https://essiedo-catalogue-pilot.pages.dev>

## Spice Harvest Ops

### Current Status

**Production Deployed**

Spice Harvest Ops is a production-deployed mobile-first business operations system for The Spice Harvest Market and owner Mama Wangai. WhatsApp Business remains the customer-facing ordering channel; Spice Harvest Ops is the private management layer for owner authentication, orders, payments, fulfilment and sales history.

### Verified Deployment and Scope

- Live Demo: <https://spice-harvest-ops.pages.dev>
- Source Code: Private Repository
- Production architecture: React 19/Vite → Neon Auth → authenticated Cloudflare Pages Functions API → Neon PostgreSQL
- Real 25-product catalogue with catalogue-controlled pricing, integrity validation and historical order-item snapshots
- Transactional order creation, generated order numbers and authenticated payment/fulfilment updates
- Owner-only JWT/JWKS authorization; unauthorized requests return 401 and authenticated non-owner requests return 403
- Supabase → Neon schema, data, authentication and frontend API migration complete; Supabase is retained only as a rollback snapshot/backup
- Mobile-first operation accepted at 375 × 812 and validated across larger mobile, tablet and desktop layouts

Production acceptance preserved 25 products, 5 migrated orders and 9 migrated order items, then verified one additional test order (`SH-1058`) and sequence continuity (`SH-1059`). These counts are engineering evidence, not traction or revenue. The system is available for owner use; long-term adoption, measured efficiency and business impact are not claimed. Detailed evidence and boundaries are maintained in `SPICE_HARVEST_OPS_PORTFOLIO_CASE_STUDY.md`.

## GymBolt

### Current Status

**Deployed pre-production / pilot-oriented release candidate**

GymBolt is a configurable gym operations platform built for controlled deployment and customization for individual gyms. It is suitable for portfolio review, demonstrations and controlled pilot discussions, but is not yet production-proven. The next major business milestone is **controlled pilot adoption**.

### Verified Deployment and Access

- Live Demo: <https://gymbolt.pages.dev>
- Source Code: Private Repository
- Cloudflare Pages direct-upload deployment validated; no automatic Git-based deployment integration is claimed
- HTTPS and HTTP 200 passed
- Immutable deployed artifact matched local build hashes
- Zero application fatal errors and zero browser loopback requests observed in verified hosted checks

### Deployment Model

GymBolt currently uses an isolated single-gym deployment model rather than a shared multi-tenant SaaS database. Each gym receives separate frontend, Supabase, PostgreSQL, authentication, settings, M-Pesa and email configuration. A new installation should normally require configuration rather than source-code edits.

### Verified Scope

Implemented scope includes member onboarding and approval, membership lifecycle and renewals, invoices, authoritative payment reconciliation, persistent receipts, staff/admin attendance, classes, trainers and assignments, inventory, announcements, profiles, settings, responsive admin/member experiences, Daraja sandbox architecture and Resend receipt-email infrastructure.

**Hosted receipt-email infrastructure configured; final real delivery acceptance pending.** Production M-Pesa is deliberately disabled.

Recent maintained test gates passed with no known application or security defects in the verified release scope. The hosted migration ledger has 19 / 19 migrations applied; this is engineering evidence, not a production-readiness claim.

### Current Limitations

- Production M-Pesa disabled
- Final real receipt-email delivery acceptance pending
- Dedicated trainer portal not implemented
- Member self-service QR attendance and access-control hardware integration not implemented
- No controlled gym pilot completed, paying gym client, customer revenue or production customer telemetry
- Not a shared multi-tenant SaaS deployment

### Progression

Development → local hardening complete → hosted release candidate → provider configuration → controlled pilot → real gym feedback → production hardening

Detailed, claim-bounded GymBolt documentation is maintained in `GYMBOLT_PORTFOLIO_CASE_STUDY.md`.

## Public CV Status

Public CV navigation, calls to action, source references and the public PDF asset have been removed. Benjamin provides a current CV directly when requested by a recruiter or client.

## Last Updated

2026-08-20