# GymBolt Management System - Portfolio Case Study

## 1. Header / Positioning

**Functional full-stack gym operations and member-management platform currently being piloted with Lock & Load Gym.**

> GymBolt covers memberships, attendance, billing, session packages, lockers, cashbook workflows and secure member self-service through role-based Admin, Staff and Member experiences backed by Supabase Auth, PostgreSQL/RLS and a responsive SaaS interface.

**Current stage:** Live Pilot

## 2. Overview

GymBolt progressed from a configurable gym-management platform into a live operational pilot at Lock & Load Gym. The current system combines role-based Admin, Staff and Member experiences with governed membership and payment lifecycles, attendance and session entitlements, locker operations, billing, cashbook workflows and secure member self-service.

## 3. Business Problem

Gym operators need membership, attendance, billing, sessions, lockers and operational finance records to stay consistent while member data remains private. Manual or disconnected workflows can create unclear entitlement state, billing inconsistencies, weak attendance controls and fragmented member service.

## 4. Solution

GymBolt centralizes gym operations while keeping membership, payment, attendance and session entitlement state authoritative. PostgreSQL RLS, role-aware access, controlled migrations, backups and isolated QA data support safe iteration while real operational workflows are validated in the hosted pilot.

## 5. Implemented Capabilities

- Admin / Staff / Member role separation, role-aware navigation and strict RLS/privacy boundaries
- Member registration, optional plan selection, No Plan registration, Start Membership, Member Applications, membership plans and session packages
- Governed invoice to exact payment to subscription/membership transition lifecycle; invoice creation alone does not change entitlement state
- Staff/admin controlled Time In and Time Out, attendance history, session consumption and remaining-session tracking
- Locker assignment, release and occupied/available operational states tied to attendance/check-in workflows
- Billing, invoices, payments, receipts, cashbook, expenses, income and net tracking
- Classes, trainers, inventory and announcements
- Light, dark and system themes across responsive desktop/mobile Admin, Staff and Member experiences

## 6. Premium Member Portal

Members securely access only their own records through a responsive self-service portal. The portal shows membership status, current plan, session balances, visit/attendance history, invoices, payments, receipts, profile, supported classes/bookings and announcements.

## 7. Auth, Recovery and Privacy

Supabase Auth handles authentication and role separation. PostgreSQL Row Level Security protects member-specific records, including member-only access to personal data. Password recovery is integrated through Supabase Auth with Brevo-backed authentication email delivery.

## 8. Engineering Quality

A permanently isolated QA member and test-data path support regression testing in the hosted environment without mixing test activity with pilot member records. Live-data backup procedures, migration replay/validation, schema migration discipline, data-integrity checks and controlled hosted changes support production-safe iteration during the active pilot.

## 9. My Role & Contribution

Benjamin designed the system architecture, modelled the operational workflows, implemented membership/billing/attendance/session/locker rules, designed privacy and authorization boundaries, built responsive Admin/Staff/Member experiences and managed migrations, hosted validation, backups and pilot-safe iteration.

## 10. Current Status & Claim Boundaries

**Live Pilot**

Currently being piloted with Lock & Load Gym as a functional live-pilot SaaS platform undergoing real gym operational validation.

- Production M-Pesa is not active; older Daraja sandbox work is historical technical context only
- Source code remains private; no public repository CTA is exposed
- No member self-service check-in, QR attendance or access-control hardware integration is claimed
- No multiple paying gyms, broad rollout, proven revenue, adoption metrics or measured business impact is claimed
- Not presented as a completed commercial product or production-scale SaaS

## 11. Technologies

React, TypeScript, Vite, Tailwind CSS, Supabase PostgreSQL, Supabase Auth, Row Level Security, PostgreSQL RPCs, Cloudflare Pages, Brevo SMTP and GitHub.

## 12. CTA / Project Access

- **Live Pilot:** <https://gymbolt-lock-load-gym.pages.dev>
- **Source Code:** Private Repository
- **Primary CTA:** View Live Pilot
- **Secondary CTA:** Discuss a Similar Project
