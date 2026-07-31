# GymBolt Portfolio Case Study

## Project Summary

GymBolt is a globally accessible public early MVP for gym administration, member records, attendance, subscriptions, billing and auditable payment reconciliation. Its protected Cloudflare Pages deployment supports portfolio review and guided demonstrations while development continues toward a functional V1.

## Business Problem

Gym administrators need member activity, subscription state, invoices and payments to remain consistent across operational views. When payment requests, callbacks and invoice updates are handled separately, duplicate settlements, incomplete histories and mismatched revenue or outstanding balances become material risks.

## Solution

GymBolt connects protected admin workflows for member administration, subscriptions, attendance, invoices and payments. Manual payment recording and a hosted Daraja sandbox workflow reconcile settlement state to Billing and the financial Dashboard while retaining references, failed attempts and duplicate-settlement safeguards.

## Current Product Status

GymBolt is a verified public early MVP preparing for controlled pilot validation. It is not production-ready, not an unrestricted self-service demo and not in use by a pilot or paying gym client. There is no customer revenue, testimonial, partnership or traction claim.

## Verified Capabilities

- Email/password admin authentication
- Member administration
- Initial subscription assignment and current subscription display
- Attendance workflows
- Billing and invoices
- Manual partial and final payment recording
- Financial Dashboard reconciliation
- Hosted Daraja sandbox STK workflow
- Callback-based settlement
- Receipt/reference retention
- Failed-attempt history
- Duplicate-settlement protection
- Cloudflare Pages public deployment

## Technical Architecture

- Vite, React and TypeScript frontend
- Tailwind CSS interface styling
- Supabase Auth for protected email/password admin access
- Supabase PostgreSQL data layer with Row-Level Security
- Supabase Edge Functions as the server-side Daraja initiation and callback boundary
- Cloudflare Pages public hosting

## Authentication and Access Model

The public deployment presents a protected admin login. Access is intended for guided demonstrations and portfolio review, not unrestricted audience testing. Member authentication, member self-registration and a member portal are not yet implemented, and role/status-based portal routing remains incomplete.

## Attendance and Billing Workflows

Verified workflows include member administration, initial subscription assignment, current subscription display, attendance operations, invoices, and manual partial or final payment recording. Billing and Dashboard financial state reconcile to the verified payment outcome.

## Daraja Sandbox Integration

The hosted Daraja integration is sandbox-only. The verified success path covers STK initiation, handset approval, callback processing, one authoritative completed settlement, invoice reconciliation, KES 0 outstanding, receipt/reference retention, failed-attempt history and duplicate-settlement protection. The recorded KES 1 revenue is controlled sandbox evidence only, not customer revenue. Public payment initiation and the public Sandbox STK action are disabled. Production M-Pesa is not enabled.

## Cloudflare Deployment

The public Cloudflare Pages deployment is verified at <https://gymbolt.pages.dev>. Public login, Dashboard, hosted member count, Billing and Attendance were verified. Deployment evidence records `GYMBOLT_CLOUDFLARE_DEPLOYMENT=PASS`.

## Verified Outcomes

- `M3.2B_PHASE_3_SUCCESS_PATH=PASS`
- `GYMBOLT_CLOUDFLARE_DEPLOYMENT=PASS`
- Public login verified
- Dashboard verified
- Hosted member count visible
- Billing verified
- Attendance verified
- KES 1 recorded revenue retained as controlled sandbox evidence only
- KES 0 outstanding in the verified sandbox case
- Public Sandbox STK action hidden

## Security and Reliability Boundaries

- Admin access is protected by email/password authentication and database authorization boundaries.
- Private Daraja integration concerns remain behind server-side Edge Functions.
- Callback-based settlement, reference retention, failed-attempt history and duplicate-settlement protection are verified.
- Callback-origin authentication still requires production hardening.
- Public payment initiation is disabled.
- The deployment does not represent production-ready security or production payment processing.

## Current Limitations

- Member self-registration is not implemented.
- Member login and member portal are not implemented.
- Role/status-based portal routing and admin approval are incomplete.
- Subscription renewal and full subscription-history management are incomplete.
- Settings and Announcements are incomplete.
- Classes, Trainers, Inventory, notifications and portals remain partial or placeholder.
- Public payment initiation is disabled.
- Production M-Pesa is not enabled.
- Callback-origin authentication requires production hardening.
- No pilot or paying client exists.

## Next Product Phase

**GymBolt V1 Functional Completion** will continue development toward a functional V1 with member self-registration, member authentication, member portal capabilities, role/status-based routing, admin approval, subscription lifecycle completion, Settings, Announcements, Classes, Trainers, Inventory, notifications, operational reporting and production hardening. Production M-Pesa remains the final major integration phase. These items are planned and are not described as implemented.

## My Role

I designed and implemented the verified GymBolt foundation across the React interface, Supabase data model, access controls, gym administration workflows and server-side Daraja sandbox integration. This included member, subscription, attendance, invoice and manual-payment workflows, plus callback settlement, reference retention, failed-attempt history, duplicate protection and reconciliation.

## Technologies Used

React, TypeScript, Vite, Tailwind CSS, Supabase, PostgreSQL, Supabase Auth, Row-Level Security, Supabase Edge Functions, Safaricom Daraja API sandbox, GitHub and Cloudflare Pages.

## Service Positioning

GymBolt demonstrates how a focused internal operations system can connect records, attendance, billing and auditable payment workflows. Engagement discussions should begin with the client’s real process, access model, reporting requirements and integration boundaries rather than treating this early MVP as an off-the-shelf production product.

## Live Demo

- Live Demo: <https://gymbolt.pages.dev>
- Access: Protected login for portfolio review and guided demonstrations
- Source Code: Private Repository

## Call to Action

- Primary CTA: **Discuss a Similar Project**
- Secondary CTA: **Request a Guided Demo**

## Public Claims Allowed

- Globally accessible public early MVP
- Verified protected Cloudflare Pages demo at <https://gymbolt.pages.dev>
- Protected email/password admin login
- Guided-demo and portfolio-review access model
- Verified member administration, subscription display, attendance, billing, invoices, manual payments and Dashboard reconciliation
- Verified hosted Daraja sandbox callback settlement, reference retention, failed-attempt history and duplicate protection
- Controlled KES 1 sandbox evidence and KES 0 outstanding in the verified sandbox case
- Preparing for controlled pilot validation and continued V1 implementation
- Private source repository

## Public Claims Prohibited

- Production-ready product or production-ready payment processing
- Production M-Pesa implementation
- Unrestricted self-service or audience testing
- Implemented member self-registration, member login or member portal
- Completed role/status routing, full subscription lifecycle or incomplete operational modules
- Pilot, paying gym client, customer revenue or production users
- Testimonials, partnerships, traction or unsupported measured outcomes
- Open-source or public source repository