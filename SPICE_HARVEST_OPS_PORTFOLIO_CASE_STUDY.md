# Spice Harvest Ops — Portfolio Case Study

## Project Positioning

**A deployed mobile-first operations system for a real small business, built around an existing WhatsApp Business workflow to manage orders, payments, fulfilment and daily sales without duplicating the customer-facing sales channel.**

**Business:** The Spice Harvest Market

**Status:** Deployed V1 / Client Handover Completed

**Live Demo:** <https://spice-harvest-ops.pages.dev>

## Overview

Spice Harvest Ops is the owner’s private back-office application. Customers continue using WhatsApp Business to browse products and place orders, while the owner records incoming orders, tracks payment and fulfilment, and reviews current and historical business activity.

The deployed system is currently at client handover and early-use stage. Long-term adoption and measured business impact have not yet been established.

## Business Problem

WhatsApp chats and notes did not provide one clear operational view of new and pending orders, payment state, delivered orders, customer order records, daily sales and historical orders.

The gap was not customer-facing ordering. It was the workflow after an order arrived.

## Product Decision: Complement WhatsApp, Do Not Replace It

An early concept was a separate customer catalogue and ordering website. Requirements discovery showed that WhatsApp Business already handled the product catalogue, customer browsing, quantities and customer-facing order placement adequately.

> I reviewed an existing WhatsApp Business sales workflow, identified that the customer-facing catalogue and ordering flow were already adequately handled, and built the missing operational layer for the business owner instead of duplicating existing functionality.

This change demonstrated workflow analysis, product scoping and restraint: the useful solution was an owner operations layer built around an established tool, not unnecessary replacement software.

## Implemented V1 Scope

The owner can securely sign in, view a dashboard, record customer orders, select real catalogue products, adjust quantities, calculate totals, track order and payment status, mark orders Delivered, review recent and historical orders, combine status and date filters, and log out securely.

Date filters include Today, Yesterday, This Week, This Month and All. Today is the default. Previous orders remain stored, and their status does not reset when the date changes.

Dashboard views derive from live Supabase records and cover today’s sales, current order activity, recent orders and a seven-day sales overview. Cancelled orders are not treated as normal completed sales.

## Catalogue and Historical Order Design

The application uses The Spice Harvest Market’s real 25-product catalogue across Daily Cooking & Aromatics and Wellness & Herbal Solutions. Catalogue records include stable IDs, names, categories, 100g pack size, supplied retail prices and active status.

> Order creation uses catalogue-controlled prices rather than manually typed prices.

Historical order items preserve the product name, pack size and unit price charged at the time of sale. This keeps past orders understandable even when the current catalogue changes.

## Mobile-First UX

The primary operating target is a 375 × 812 phone viewport, with validation across larger phones, tablet and desktop. The interface uses mobile bottom navigation, a desktop sidebar, responsive order cards and forms, 44px+ touch targets, long-text protection and a responsive sales chart without page-level horizontal overflow.

Real-device testing showed native number-input arrows were awkward on mobile. The quantity interaction was refined to minus button → editable quantity → plus button, with touch-sized controls, direct editing, minimum-value protection, numeric keyboard support and automatic total recalculation.

## Architecture

The frontend uses React, TypeScript, Vite, Tailwind CSS and Lucide icons and is deployed on Cloudflare Pages. Supabase provides PostgreSQL, Auth and Row Level Security.

The database uses `products`, `orders` and `order_items`. A PostgreSQL RPC validates order input, reads authoritative catalogue data, applies current prices, calculates line and complete totals, stores historical product/price snapshots and creates the order transactionally. Additional authenticated RPCs update order and payment status.

## Security

Verified controls include email/password owner authentication, session persistence, protected Dashboard, Orders and Settings routes, secure logout, disabled public signup, RLS on all business tables, anonymous data-access denial and authenticated-only order operations.

Anonymous order-management RPC execution is blocked. No service-role credential is exposed to the frontend, and local environment configuration is excluded from source and deployment tracking.

## Deployment and Verification

The production frontend is deployed at <https://spice-harvest-ops.pages.dev>, with Supabase/PostgreSQL persistence. SPA routing supports `/`, `/orders` and `/settings`.

Verification covered ESLint, TypeScript, Vite production builds, migrations, live and cross-refresh persistence, separate browser contexts, all 25 catalogue products, order calculations, authenticated order creation and updates, anonymous-access denial, responsive viewport audits and Cloudflare deployment.

The final audit found no launch-blocking runtime or security defects. A stale authentication statement in project documentation was corrected. A separate legacy `delivery_status` database field is not used by the V1 interface; current fulfilment uses the main order status **Delivered**.

## Client Handover

The owner received the production URL, login guidance and operating guidance. The intended workflow is:

1. Customers continue ordering through WhatsApp Business.
2. The owner records each incoming order in Spice Harvest Ops.
3. Payment and fulfilment are tracked in the owner workspace.
4. The dashboard provides an organized view of orders and sales.

The owner is beginning to review and use the deployed system. This is not presented as proven long-term adoption.

## My Role & Contribution

Benjamin handled requirements discovery, workflow analysis, product scoping and the change in direction after reviewing the existing WhatsApp workflow. He designed and implemented the mobile-first React/TypeScript frontend, Supabase/PostgreSQL model, RPC-backed order workflows, authentication, RLS, deployment, validation, real-device UX refinement and client handover guidance.

## Claim Boundaries

The case study does not claim measured revenue, efficiency, productivity, conversion or long-term business impact. It does not present Spice Harvest Ops as ecommerce, a WhatsApp replacement, a SaaS or multi-tenant platform, or claim payment-provider integration, WhatsApp API automation, stock management, advanced analytics, a customer portal or testimonials.

## Technologies

React, TypeScript, Vite, Tailwind CSS, Lucide, Supabase, PostgreSQL, Supabase Auth, Row Level Security, PostgreSQL RPC functions and Cloudflare Pages.

## Project Access

- **Live Demo:** <https://spice-harvest-ops.pages.dev>
- **Source Code:** Private Repository
- **Contact CTA:** Discuss a Similar Project