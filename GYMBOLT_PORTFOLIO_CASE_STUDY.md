# GymBolt Management System — Portfolio Case Study

## 1. Header / Positioning

**A configurable gym operations platform built for controlled deployment and customization for individual gyms.**

> A deployed pre-production gym operations platform covering membership lifecycle, attendance, billing, receipts, classes, inventory and configurable client deployment, with verified Daraja sandbox payment architecture.

**Current stage:** Deployed pre-production / pilot-oriented release candidate

**Next commercial milestone:** Controlled pilot adoption

## 2. Overview

GymBolt is designed for independent gym deployments. It combines member administration, membership lifecycle, subscriptions, billing, payment reconciliation, receipts, attendance, classes, trainers, inventory, announcements, profiles and gym settings across responsive admin and member experiences.

## 3. Business Problem

Gym operators need membership, attendance, billing, payments, receipts, classes and operational records to remain consistent. Disconnected tools and manual workflows can cause unclear membership state, billing inconsistencies, duplicate payment handling, weak attendance controls, missing transaction history, operational fragmentation and difficult client-specific deployment.

## 4. Solution

GymBolt centralizes authenticated administration and member-facing workflows while keeping payment and membership state authoritative. Isolated deployments, role-aware security, payment reconciliation and reusable configuration support operational consistency for each gym.

## 5. Key Capabilities

- Member onboarding and approval, plans, activation and renewals
- Billing, invoices, payments and persistent receipts
- Staff/admin attendance, member attendance history and privacy boundaries
- Classes, trainers and capacity-safe booking
- Inventory, announcements, profiles and gym settings
- Responsive admin and member experiences

## 6. Membership & Billing Lifecycle

GymBolt implements onboarding and approval, membership plans, activation, renewal billing, invoice lifecycle, authoritative reconciliation, current-period preservation, automatic future membership transition after settlement, duplicate-transition protection, manual payment fallback and member billing visibility.

> An invoice represents payment intent. Membership state changes only after authoritative settlement.

This rule prevents a payment request from prematurely changing a member’s access or billing state.

## 7. Payments & Receipt Architecture

GymBolt includes an implemented and tested Safaricom Daraja sandbox payment architecture: STK Push, callback handling, payment reconciliation, duplicate callback protection, amount/member/invoice validation, failure and retry handling, exactly-once application and persistent receipt creation.

Production M-Pesa remains deliberately disabled. Sandbox transactions are engineering evidence, never customer revenue.

Receipts use customer-safe references and support view, print, reprint, admin access and member access. They persist across navigation and logout/login. Internal UUIDs and provider metadata are not exposed to members.

### Receipt Email

**Hosted receipt-email infrastructure configured; final real delivery acceptance pending.**

Resend is configured server-side with automatic delivery intent, durable pending/sent/failed audit states, exactly-once intent per payment, duplicate callback protection and authorized manual resend. Payment success remains independent from email failure. The sender and provider are configured, secrets remain server-side, and final hosted delivery acceptance is pending.

## 8. Member Experience

Members can use a responsive dashboard to view membership status, billing, receipts, attendance history, classes and announcements, and maintain their profile and avatar.

> Staff/admin performs the authoritative member check-in. Members can view their own attendance history but do not currently self-check-in.

Private avatars accept validated JPEG, PNG and WebP files up to 5 MiB.

## 9. Admin / Staff Operations

Implemented operations include member management and approval, billing, payment recording, attendance check-in, trainer/class/attendance management, inventory, announcements, installation settings and receipt operations.

Trainer roles, entities, assignments and class operations are implemented. **A dedicated trainer-specific portal/workspace is not yet implemented.** This does not block the current admin/member-focused market version.

## 10. Classes, Attendance, Inventory & Announcements

- **Classes:** create, update, reschedule, cancel, archive and book, with capacity, duplicate-booking and overbooking protection
- **Attendance:** staff/admin check-in, eligibility validation, duplicate protection, member history and privacy boundaries
- **Inventory:** records, authoritative stock adjustments, immutable history and low-stock visibility
- **Announcements:** draft, publish, archive and audience targeting; members see relevant published announcements

QR check-in, kiosk mode and access-control hardware integrations remain future work.

## 11. Architecture & Security

The frontend uses React, TypeScript, Vite and Tailwind CSS. Supabase provides PostgreSQL, Auth, Storage and Edge Functions. The hosted frontend runs on Cloudflare Pages.

Implemented and tested boundaries include Supabase authentication, Row-Level Security across public tables, private storage, role-aware access, cross-member exposure denial and server-only secrets. The browser does not receive the Supabase service-role key, Resend API key or Daraja secrets. Private storage includes profile avatars and installation assets.

**Current hosted migration ledger: 19 / 19 migrations applied.**

## 12. Deployment & Portability

GymBolt currently uses an isolated single-gym deployment model rather than a shared multi-tenant SaaS database. Each gym receives its own frontend deployment, Supabase project, PostgreSQL database, authentication, gym settings, M-Pesa configuration and email configuration.

> A new gym installation should normally require configuration rather than source-code edits.

Implemented portability includes an installation bootstrap flow, environment templates, deployment validation command, configurable gym identity and providers, client installation documentation, unpredictable bootstrap credentials, no copied client secrets, isolated deployments and a second-gym configuration simulation.

The hosted frontend is a real functional frontend deployed by validated direct upload to Cloudflare Pages at <https://gymbolt.pages.dev>. HTTPS and HTTP 200 passed, deployed artifact hashes matched the local build, zero application fatal errors were observed and no browser loopback requests were detected. Automatic Git-based Cloudflare deployment integration is not enabled or claimed.

Gym settings cover identity, logo, contact information, address, timezone, currency, receipt/business display name and support contacts. Installation logos are validated up to 2 MiB.

## 13. Engineering Quality

Verified work covers authentication, onboarding, membership races, payment concurrency, duplicate/delayed callbacks, wrong-payment validation, exactly-once settlement, receipt persistence, email-intent protections, class and inventory concurrency, attendance constraints, storage/settings security, responsive UI validation and repository/browser-bundle secret scanning.

> Recent maintained test gates passed with no known application or security defects in the verified release scope.

This evidence does not imply complete production readiness.

## 14. My Role & Contribution

Benjamin designed and implemented the application architecture, data model, authentication and authorization, membership lifecycle, billing, payment reconciliation, receipts, receipt-email architecture, attendance, classes, trainers, inventory, announcements, profiles, settings, responsive design, portability, Cloudflare deployment, Supabase security, testing and documentation.

## 15. Current Status & Limitations

**Deployed pre-production / pilot-oriented release candidate**

Suitable for portfolio review, demonstrations and controlled pilot discussions; not production-proven.

- Production M-Pesa disabled
- Final real receipt-email delivery acceptance pending
- Dedicated trainer portal not implemented
- Member QR self-check-in and access-control hardware integration not implemented
- No controlled gym pilot, paying gym client, customer revenue or production customer telemetry
- Isolated single-gym deployments, not shared multi-tenant SaaS

## 16. Next Stage

**Controlled pilot adoption**

Development → local hardening complete → hosted release candidate → provider configuration → controlled pilot → real gym feedback → production hardening

Future opportunities include production M-Pesa, a trainer workspace, QR attendance, kiosk/access-control integrations, AI analytics, an AI member assistant, churn prediction, shared multi-tenant SaaS architecture and production customer telemetry. None are presented as implemented.

## 17. Technologies

React, TypeScript, Vite, Tailwind CSS, Supabase Auth, PostgreSQL, Row-Level Security, Supabase Storage, Supabase Edge Functions, Safaricom Daraja Sandbox, Resend, Cloudflare Pages, Git and GitHub.

## 18. CTA / Project Access

- **Live Demo:** <https://gymbolt.pages.dev>
- **Source Code:** Private Repository
- **Primary CTA:** Discuss a Similar Project
- **Secondary CTA:** Request a Guided Demo