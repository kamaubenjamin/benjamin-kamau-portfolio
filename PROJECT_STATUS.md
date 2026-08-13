# Portfolio Project Status

## Authoritative Project Order

### Featured Projects

1. GymBolt Management System
2. Intelligent Document Processing Platform
3. ExploreAfrica

### Additional Work

1. FlowSync
2. Competitor Price Intelligence Platform
3. Pair and Place Website Operations

Exactly six public project case studies remain. The factual content of the five non-GymBolt case studies is unchanged; only grouping and order changed.

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

2026-08-13