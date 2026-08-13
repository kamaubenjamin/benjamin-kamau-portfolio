# Spice Harvest Ops — Portfolio Case Study

## Production Status

**A production-deployed mobile-first business operations system built for a real small-business workflow, covering owner authentication, order management, payment and fulfilment tracking, secure API architecture, PostgreSQL data modelling and cloud deployment.**

- **Business:** The Spice Harvest Market
- **Owner:** Mama Wangai
- **Status:** Production Deployed
- **Migration:** Supabase → Neon complete
- **Commercial stage:** Client-ready / real small-business implementation
- **Production app:** <https://spice-harvest-ops.pages.dev>

Production-deployed for a real small-business workflow and available for owner use.

## Overview

Spice Harvest Ops is Mama Wangai’s private back-office operations system. Customers continue to browse products and place orders through WhatsApp Business; the authenticated owner workspace manages what happens after an order arrives.

It is not simply a spice website. It is a focused operations implementation covering secure owner access, order entry, payment and fulfilment state, historical records, data integrity, a trusted API boundary and cloud deployment.

## Business Problem

The Spice Harvest Market already used WhatsApp Business for its product catalogue, customer browsing, quantities/cart, estimated totals and place-order workflow. The operational gap appeared after an order arrived.

Mama Wangai was mainly using WhatsApp chats and manual notes to track:

- incoming orders
- payment status
- fulfilment and delivery progress
- sales history
- order history and notes

Those tools did not provide one reliable operational view of current and historical activity.

## Why I Did Not Replace WhatsApp Business

The original idea was a separate customer-facing catalogue. Requirements discovery showed that this would duplicate a workflow the business already had, so I rejected that direction and focused scope on the missing post-order layer.

**WhatsApp Business = customer-facing ordering channel**

**Spice Harvest Ops = private business-management layer**

Spice Harvest Ops complements WhatsApp Business; it does not replace it.

## Solution

The product became a secure, mobile-first owner workspace. Mama Wangai can sign in, record an order against the real product catalogue, update payment and fulfilment, review historical records, filter activity and use the dashboard without exposing database access to the browser.

## Production Workflow

1. Customers browse and place orders through WhatsApp Business.
2. Mama Wangai records each incoming order in Spice Harvest Ops.
3. The system calculates catalogue-controlled totals and creates the order transactionally.
4. Payment is tracked through the Paid workflow.
5. Fulfilment is tracked through the Delivered workflow.
6. Dashboard, order history and combined date/status filters support ongoing review.

## Key Capabilities

- Secure owner login, forgot-password/password recovery, protected routes and logout
- Session persistence after refresh and session restoration
- Dashboard with live order/sales information, recent orders, activity metrics and seven-day sales view
- Order creation with customer name, phone, delivery location, product selection, quantity controls and automatic totals
- Payment-status and order-status updates, including Paid and Delivered workflows
- Historical order records
- Today, Yesterday, This Week, This Month and All date filters
- Status filters that work together with date filters
- Catalogue of 25 real products with current prices, 100g pack sizes, categories and active status

## Product & Order Data Integrity

Orders use catalogue-controlled data rather than manually entered prices. Historical items preserve product-name, pack-size and price snapshots so earlier orders remain understandable after catalogue changes.

The PostgreSQL design includes quantity and line-total validation, transactional order creation, generated order numbers, functions, triggers, constraints, indexes and an order-number sequence.

## Production Architecture

**React 19/Vite browser → Neon Auth → authenticated Cloudflare Pages Functions API → Neon PostgreSQL**

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS and Lucide
- **Backend/API:** provider-neutral frontend adapter, authenticated Cloudflare Pages Functions endpoints and centralized server-side database repository
- **Database:** Neon PostgreSQL with transactional functions and integrity controls
- **Hosting:** Cloudflare Pages at <https://spice-harvest-ops.pages.dev>

## Authentication & Security

Neon Auth provides email/password owner login, password recovery, session persistence/restoration and logout. The existing owner password was preserved during migration.

Cloudflare Pages Functions perform server-side JWT/JWKS verification and immutable owner identity validation before allowing business-data access.

Validated controls include:

- `DATABASE_URL` remains server-side only
- no database credentials or immutable owner ID are exposed in the browser bundle
- unauthenticated API requests return 401
- authenticated non-owner requests return 403
- owner-authorized access succeeds
- no public signup UI
- no direct browser database access
- no runtime Supabase dependency

No secrets, tokens or configuration identifiers are included in this case study.

## Supabase → Neon Migration

The original architecture used Supabase PostgreSQL, Supabase Auth and Supabase browser Data API/RPC access. The final production architecture fully migrated those responsibilities to Neon PostgreSQL, Neon Auth and a trusted Cloudflare Pages Functions API boundary.

The migration included schema recreation, product catalogue migration, order and order-item migration, order-number sequence preservation, authentication replacement while retaining the owner’s existing password, frontend API cutover, staging validation, production cutover and removal of Supabase from the live runtime.

Supabase was not deleted. It remains preserved as a rollback snapshot/backup and is not part of the active production runtime.

## Production Cutover & Data Preservation

Pre-cutover migration moved 25 products, 5 orders and 9 order items. After the Neon cutover, one additional production acceptance test order was created successfully.

Final acceptance evidence:

- Products: 25
- Orders: 6
- Order items: 10
- Verified production order: `SH-1058`
- Next sequence value: `SH-1059`
- Historical snapshots and totals preserved

These counts verify migration and order creation. They are not adoption or traction metrics, and the acceptance test order is not presented as customer revenue.

## Mobile UX

The primary validated target is **375 × 812**, approximately an iPhone 13 mini-sized viewport. Larger mobile, tablet and desktop layouts were also validated.

Implemented responsive behaviour includes touch-friendly quantity controls, desktop sidebar, mobile navigation, responsive forms/cards, safe long-text handling, a responsive sales chart and no page-level horizontal overflow.

Real-device testing showed native number-input arrows were awkward on mobile. The interaction was refined to touch-sized minus, editable quantity and plus controls while retaining direct editing, minimum-value protection, numeric keyboard support and automatic recalculation.

## Production Validation

Final production acceptance verified owner login with the existing password, session restoration, dashboard, all 25 products, migrated orders, order creation, Paid and Delivered updates, refresh persistence, combined filters, logout, subsequent login and 375 × 812 responsive behaviour.

API acceptance verified 401 for unauthenticated access, 403 for authenticated non-owner access and successful owner-authorized access.

Technical acceptance in the application repository recorded passing ESLint, TypeScript/Vite build, `check:functions`, Cloudflare Functions compilation and frontend secret scanning, with a clean final Git working tree.

## My Role & Contribution

- Requirements discovery, workflow analysis, product pivoting and scope control
- Mobile-first UX and real-device refinement
- React/TypeScript frontend engineering and provider-neutral API design
- PostgreSQL data modelling, functions, triggers, constraints and indexes
- Neon Auth architecture, JWT authorization and secure server-side secret handling
- Cloudflare Pages Functions API and centralized repository design
- Supabase → Neon schema/data/auth migration and sequence preservation
- Staging validation, rollback planning, production cutover and deployment
- Client implementation

## Current Scope / Claim Boundaries

This is a production-deployed, client-ready implementation for one real small-business workflow. Production acceptance does not establish long-term impact, scale or broad commercial traction.

The case study does not claim proven revenue growth, percentage efficiency improvement, large-scale adoption, a large user base, multiple paying clients, production-scale SaaS, multi-tenancy, M-Pesa integration, WhatsApp API integration, inventory management, advanced analytics, a customer portal, testimonials or long-term business impact.

Production order counts are engineering evidence only, and test activity is not customer revenue.

## Technologies

React 19, TypeScript, Vite, Tailwind CSS, Lucide, Neon PostgreSQL, Neon Auth, PostgreSQL, Cloudflare Pages Functions, JWT/JWKS authorization, Cloudflare Pages, Git and GitHub.

Supabase appears only in the migration history and rollback plan; it is not a current production technology.

## Production App / Contact

- **Production app:** <https://spice-harvest-ops.pages.dev>
- **Source code:** Private repository (no public source URL)
- **Contact CTA:** Discuss a Similar Project