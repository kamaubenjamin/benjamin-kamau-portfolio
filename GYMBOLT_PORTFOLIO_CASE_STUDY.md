# GymBolt Management System - Portfolio Case Study

## 1. Header / Positioning

**Live controlled pilot — currently being tested in real reception workflows at Lock & Load Gym.**

> GymBolt is a configurable gym operations platform shaped through live receptionist feedback, with governed membership, billing, attendance, session, locker, service, cashbook, member-portal and mobile-continuity workflows.

**Current stage:** Live Pilot

## 2. Overview

Benjamin designed and iterated a real operations system around receptionist pain points, then hardened registration, billing, attendance, service access, mobile continuity and historical data so operational mistakes do not corrupt the workflow.

## 3. Business Problem

Gym operators need membership, attendance, billing, sessions, lockers and operational finance records to stay consistent while member data remains private. Manual or disconnected workflows can create unclear entitlement state, billing inconsistencies, weak attendance controls and fragmented member service.

## 4. Solution

GymBolt centralizes gym operations while keeping membership, payment, attendance and session entitlement state authoritative. PostgreSQL RLS, role-aware access, controlled migrations, backups and isolated QA data support safe iteration while real operational workflows are validated in the hosted pilot.

## 5. Implemented Capabilities

- Admin / Staff / Member role separation, role-aware navigation and strict RLS/privacy boundaries
- Member registration, Member Applications and optional No Package / Not Started state before intentional Start Membership
- Weekly, Monthly, 12 Sessions/month, Half Year and Yearly packages
- Billing/payment as source of truth, exact-payment activation, partial payments, duplicate-request prevention and Continue Payment reuse of an open request
- Time In/Time Out, duplicate check-in protection, session consumption, remaining sessions and Nairobi/local-date behavior
- Locker assignment/release, occupied/available state and historical locker snapshots
- Day Session / 1 Day at configured KSh 250, with negotiated lower amounts recordable without altering catalogue price; Steam Bath and Steam Towel
- Billing, invoices, payments, receipts, cashbook, daily/monthly income, expenses, trainer-payment expenses and net visibility
- Classes, trainers, inventory and announcements
- Light, dark and system themes across responsive desktop/mobile Admin, Staff and Member experiences

## 6. Member Portal

Members securely access only their own records through a responsive self-service portal. The portal shows membership status, current plan, session balances, visit/attendance history, invoices, payments, receipts, profile, supported classes/bookings and announcements.

## 7. Auth, Recovery and Privacy

Supabase Auth handles authentication and role separation. PostgreSQL Row Level Security protects member-specific records, including member-only access to personal data. Password recovery is integrated through Supabase Auth with Brevo-backed authentication email delivery.

## 8. Engineering Quality

A permanently isolated QA member and test-data path support regression testing without mixing test activity with pilot records. Hosted migrations are verified at 31/31 through `20260902160000_reception_membership_duplicate_and_day_session_amount.sql`. Runtime suites cover membership start, Day Session/Steam, Billing, Attendance, session packages and continuity/access; mobile continuity browser tests, responsive 390×844 smoke, typecheck and production build passed. Lint has 0 errors and one existing non-blocking Fast Refresh warning.

## 9. Reception Workflow & Feedback

Live receptionist feedback at Lock & Load Gym drove No Package registration, normalization of accidental legacy Weekly assignments, correct handling of cancelled history, duplicate-request blocking, Continue Payment, standalone Day Session pricing and mobile continuity.

- **Membership:** Find/Open Member → No Package / Not Started → select package → Create Payment Request → Continue Payment if open → settle through one or more payments → access starts → Check In → optional locker → Check Out
- **Day Session:** Find/Open Member → Sell Day Session → KSh 250 shown → optionally adjust negotiated amount → record payment → one-use service available → Check In

## 10. Mobile Continuity

Safe UI context persists for approximately two hours, including current page, member search/opened member, Attendance date/search, Billing filter/search, Cashbook month and practical scroll position. After app switching, context remains and authoritative data refreshes after inactivity without a forced Dashboard redirect. Sensitive payment forms and mutations are never auto-restored or replayed; offline operation is not claimed.

## 11. Founder Contribution

Benjamin designed the system architecture, modelled the operational workflows, implemented membership/billing/attendance/session/locker rules, designed privacy and authorization boundaries, built responsive Admin/Staff/Member experiences and managed migrations, hosted validation, backups and pilot-safe iteration.

## 12. Current Status & Claim Boundaries

**Live Pilot**

Live controlled pilot — currently being tested in real reception workflows at Lock & Load Gym.

- Production M-Pesa and receipt-email delivery are intentionally disabled
- Source code remains private; no public repository CTA is exposed
- No member self-service check-in, QR attendance or access-control hardware integration is claimed
- No multiple paying gyms, broad rollout, proven revenue, adoption metrics or measured business impact is claimed
- Not presented as a completed commercial product or production-scale SaaS

## 13. Technologies

React 18, TypeScript, Vite, Tailwind CSS and Cloudflare Pages; Supabase, PostgreSQL, Supabase Auth, Row Level Security, SQL/RPC lifecycle contracts and hosted migrations; Playwright, runtime SQL regression suites, typecheck, lint, production build validation, provenance checks and responsive mobile smoke.

## 14. CTA / Project Access

- **Live Pilot:** <https://gymbolt-lock-load-gym.pages.dev>
- **Source Code:** Private Repository
- **Primary CTA:** View Live Pilot
- **Secondary CTA:** Discuss a Similar Project
