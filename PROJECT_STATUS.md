# Benkai Systems Portfolio Project Status

Primary public identity: **Benkai Systems — Founded and engineered by Benjamin Kamau.** Benkai Systems designs and builds practical business systems, workflow automation and data infrastructure around real operational needs.

## Authoritative Project Order

### Featured Projects

1. GymBolt Management System
2. Spice Harvest Ops
3. Intelligent Document Processing Platform

### Additional Work

1. Home Health Operations Demo
2. ExploreAfrica
3. FlowSync — Competitor & Workflow Intelligence
4. Competitor Price Intelligence Platform
5. Pair and Place Website Operations
6. Essiedo Catalogue Pilot

Exactly nine public project case studies are published. This portfolio is the public presentation layer; serious product source repositories are intentionally private and are not exposed as public project CTAs. Archived learning and practice repositories are excluded.

## Home Health Operations Demo

### Current Status

**Client Validation Prototype**

Home Health Operations Demo, formally Richard Home Health — Operations Demo, translates requirements gathered from a prospective home-health client into a working responsive workflow prototype. The discovery baseline covered two patients and three caregivers, with patient notes, vital signs, caregiver tasks, task status, operational alerts, invoicing and accessible UX.

### Verified Scope and Boundaries

- Live Demo: <https://richard-home-health-demo.pages.dev>
- Source Code: Private Repository; no public repository CTA
- Interactive patient, caregiver, vital-sign, note, task, alert and KES invoice workflows
- Local React application state only; no server persistence
- Fictional sample patient data only; no real patient information
- Responsive validation across mobile, tablet, laptop and large-desktop widths
- TypeScript, production build, hosted HTTP/assets, navigation, patient-detail and responsive checks passed

The prototype is frontend-only and is not production healthcare software. It has no production backend, database, authentication, Neon, Supabase, operational healthcare deployment, diagnosis, treatment recommendation, autonomous clinical AI or compliance certification. Future production infrastructure, security and regulatory review remain unimplemented work. Detailed evidence and claim boundaries are maintained in `HOME_HEALTH_OPERATIONS_DEMO_PORTFOLIO_CASE_STUDY.md`.

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

**Live Pilot**

Live controlled pilot — currently being tested in real reception workflows at Lock & Load Gym. GymBolt is a configurable operations platform shaped through receptionist feedback across membership, billing, attendance, services, lockers, cashbook, member self-service and mobile continuity.

### Verified Deployment and Access

- Live Pilot: <https://gymbolt-lock-load-gym.pages.dev>
- Source Code: Private Repository
- Public CTA uses the active pilot URL; the retired public demo URL is not used
- No public repository/source CTA is exposed

### Verified Scope

Implemented scope includes Admin / Staff / Member role separation, strict RLS/privacy boundaries, optional No Package / Not Started registration, intentional Start Membership, Member Applications, five membership packages, governed exact-settlement activation with partial payments, duplicate-request prevention and Continue Payment, Time In/Time Out attendance, session consumption, locker workflows, standalone Day Session at configured KSh 250 with negotiated amount recording, Steam services, finance operations and a secure Member Portal.

Safe UI context persists for approximately two hours across reception app switching; sensitive payment forms and mutations are never restored or replayed. Production M-Pesa and receipt-email delivery are intentionally disabled.

A permanently isolated QA path, backups and integrity procedures support pilot-safe iteration. Hosted migrations are 31/31 through `20260902160000_reception_membership_duplicate_and_day_session_amount.sql`; recent runtime, mobile continuity, responsive smoke, typecheck and build validation passed.

### Current Limitations

- Production M-Pesa is not active
- Receipt-email delivery is intentionally disabled
- Member self-service QR attendance and access-control hardware integration are not claimed
- No multiple paying gyms, broad public rollout, customer revenue, adoption metrics or measured business impact is claimed
- Not presented as a completed commercial product or production-scale SaaS

Detailed, claim-bounded GymBolt documentation is maintained in `GYMBOLT_PORTFOLIO_CASE_STUDY.md`.

## Public CV Status

Public CV navigation, calls to action, source references and the public PDF asset have been removed. Benjamin provides a current CV directly when requested by a recruiter or client.

## Last Updated

2026-09-08