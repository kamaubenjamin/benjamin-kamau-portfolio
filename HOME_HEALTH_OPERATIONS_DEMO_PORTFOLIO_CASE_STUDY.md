# Home Health Operations Demo — Portfolio Case Study

## Positioning

**Turning real operational requirements into a working client-validation system.**

- **Formal/internal name:** Richard Home Health — Operations Demo
- **Status:** Client Validation Prototype
- **Live Demo:** <https://richard-home-health-demo.pages.dev>
- **Source Code:** Private repository; no public source URL

## Business Discovery

The project originated from requirements discovery with a prospective client operating primarily in home health. The need was for a simple operational system rather than a complex hospital ERP.

The discovery baseline covered:

- 2 patients
- 3 caregivers
- patient notes
- vital-sign recording
- caregiver task tracking
- completed and pending care tasks
- operational alerts
- invoicing
- simple, accessible UX

Benjamin translated those requirements into a working interactive application so the workflow could be reviewed before investing in backend, authentication and production security infrastructure.

The prospective client is not presented as a paying production client, a deployed customer or an organization currently operating the prototype in production.

## Implemented Scope

### Dashboard

- Active patients
- Caregiver count
- Today’s tasks
- Active alerts
- Outstanding invoices
- Recent activity

### Patients and Patient Detail

- Fictional patient records, assigned caregivers, care status and latest activity
- Patient summary and assigned caregiver
- Vital-sign history covering blood pressure, pulse, temperature and SpO2
- Timestamped caregiver notes
- Care tasks with completed and pending status
- Activity history

### Caregiver Workflow

- Assigned patients and today’s tasks
- Record vital signs
- Add patient notes
- Complete tasks
- Reopen tasks

### Alerts and Invoices

- Operational task alerts
- Review flags
- Follow-up reminders
- Invoice-related alerts
- KES invoice list with service period and amount
- Draft, Sent, Paid and Overdue states
- Draft invoice creation

Interactions update local React application state. This is an interactive workflow prototype, not a static mockup, but no server persistence is claimed.

## Technical Architecture

The implemented application is a React and TypeScript single-page frontend built with Vite and responsive CSS, hosted on Cloudflare Pages.

Current technologies:

- React
- TypeScript
- Vite
- Responsive CSS
- Local React State
- Git
- GitHub
- Cloudflare Pages

The current implementation does not use Neon, Supabase, PostgreSQL, authentication, backend APIs or a production database.

## Data and Healthcare Boundaries

The prototype uses fictional/sample patient data and local React application state only. It does not process real patient information and has no production backend, production database, authentication or server persistence.

It is not:

- production healthcare software
- operationally deployed at a healthcare business
- a diagnostic or treatment-recommendation system
- an autonomous clinical AI system
- certified as HIPAA compliant, GDPR healthcare compliant or medically/regulatorily approved

No compliance certification or production healthcare-readiness claim is made.

## Responsive Engineering

Validation covered:

- **Mobile:** 360px, 390px, 430px
- **Tablet:** 768px, 1024px
- **Laptop:** 1280px, 1440px
- **Large desktop:** 1600px, 1920px

Implemented responsive behavior includes mobile bottom navigation, desktop sidebar navigation, touch-friendly mobile controls, responsive patient/task/alert/invoice layouts, responsive forms and dialogs, safe mobile viewport behavior, no page-level horizontal overflow and sensible large-screen content width.

## Validation Evidence

- TypeScript typecheck — PASS
- Production build — PASS
- Cloudflare-hosted root — HTTP 200
- Hosted JavaScript and CSS assets — HTTP 200
- Favicon — HTTP 200
- Root refresh — PASS
- Major navigation — PASS
- Patient-detail workflow — PASS
- Hosted mobile check at 390px — PASS
- Hosted desktop check at 1440px — PASS
- No observed browser runtime errors
- No page-level horizontal overflow

These checks validate the current prototype implementation; they do not establish production healthcare readiness.

## My Role and Contribution

- Business discovery and requirements analysis
- Workflow modelling and product scoping
- Application architecture
- React/TypeScript implementation
- Responsive UX engineering
- Patient and caregiver task workflow design
- Operational alert and invoice workflow design
- Interactive local-state implementation
- Cloudflare Pages deployment
- Responsive validation
- Project governance and documentation

## Future Production Requirements

The following remain future work and are not part of the current implementation:

- Production backend and database
- Authentication and role-based access
- Secure persistence and production patient-data security
- Audit logging
- Backup and recovery
- Production monitoring
- Regulatory/compliance review
- Production deployment controls

No backend provider or production architecture is selected or claimed here.

## Project Access

- **Live Demo:** <https://richard-home-health-demo.pages.dev>
- **Source Code:** Private repository; no public repository CTA
- **Contact CTA:** Discuss a Similar Project