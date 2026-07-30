export type ProjectStatus =
  | "Active development"
  | "Public demo verified"
  | "Hosted sandbox verified"
  | "Early prototype"
  | "Functional platform foundation"
  | "Maintenance milestone completed"
  | "Completed foundation"
  | "Completed learning project"
  | "Incomplete learning exercise"
  | "Existing platform foundation"
  | "Paused - separate product";

export type ProjectStatusVariant = "default" | "emerald" | "lime";

export interface ProjectLink {
  url: string;
  label: string;
  kind: "preview" | "api" | "website" | "repository";
  primary?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  status: ProjectStatus;
  statusVariant: ProjectStatusVariant;
  shortDescription: string;
  featuredDescription?: string;
  overview: string;
  problem?: string;
  responsibilities?: string;
  architecture?: string;
  architectureDetails?: string[];
  solution?: string;
  solutionDetails?: string[];
  capabilities?: string[];
  technologies: string[];
  cardTechnologies?: string[];
  challenges?: string;
  currentStatusHeading?: string;
  currentStatus?: string;
  currentStatusDetails?: string[];
  roadmap?: string;
  roadmapDetails?: string[];
  lessonsLearned?: string;
  paymentWorkflow?: string;
  paymentWorkflowDetails?: string[];
  engineeringHighlights?: string[];
  verifiedOutcomes?: string[];
  role?: string;
  roleDetails?: string[];
  servicePositioning?: string;
  callToAction?: string;
  ctaLabels?: string[];
  tags?: string[];
  screenshotRecommendations?: string[];
  demoVideoRecommendation?: string;
  liveDemoStatus?: string;
  repositoryStatus?: string;
  claimsNotToMake?: string[];
  image?: string;
  featured: boolean;
  links?: ProjectLink[];
}

const projectDisplayOrder = new Map([
  ["intelligent-document-processing-platform", 0],
  ["exploreafrica-travel-platform", 1],
  ["flow-sync", 2],
  ["competitor-price-intelligence-platform", 3],
  ["pair-and-place-website-operations", 4],
  ["gymbolt-gym-management-system", 5],
]);

export const projects: Project[] = ([
  {
    slug: "intelligent-document-processing-platform",
    title: "Intelligent Document Processing Platform",
    category: "Document Intelligence & Workflow Automation",
    status: "Active development",
    statusVariant: "lime",
    shortDescription:
      "A modular document-intelligence platform for deterministic ingestion, structural parsing, workflow orchestration, tenant-scoped APIs and authenticated purchase-order result presentation.",
    overview:
      "Benjamin’s flagship project is a modular document-intelligence platform combining deterministic ingestion, structural parsing, configurable workflow execution, tenant-scoped FastAPI endpoints and a separate authenticated FlowSync interface. The completed v0.22 UAT milestone demonstrates a fictional purchase order through a read-only, tenant-isolated workflow with canonical line items, exact financial validation and lifecycle presentation. Current work is focused on establishing a private field-by-field and product-by-product accuracy baseline before broader layout support.",
    problem:
      "Business documents arrive in varied formats and structures, requiring consistent ingestion, normalization, parsing, validation and human review before downstream workflows can use them safely.",
    solution:
      "Benjamin has built a deterministic processing foundation that moves documents from ingestion and canonical normalization through structural parsing, validated workflow execution and read-only result delivery.",
    solutionDetails: [
      "Ingestion supports PDF, CSV, XLSX, email and TXT inputs, canonical document normalization and a document-classification skeleton.",
      "Structural processing includes document models, block parsing, section parsing, table parsing, structural validation and document quality scoring.",
      "Workflow foundations include contracts, definitions, a workflow DSL, workflow validation, DAG construction, execution and a reusable workflow workspace.",
      "Implemented operations include ingest, transform, filter, fuzzy-match, compare, alert and report, supported by telemetry and audit-oriented execution foundations and example business workflow definitions.",
    ],
    architecture:
      "The processing backend and the newer Document Intelligence FlowSync implementation form a separate frontend and API experience. The original Competitor Price Intelligence FlowSync implementation remains a separate product: shared design patterns are acceptable, but business logic, APIs, entities, workflows and integrations remain separate, and the two interfaces are not one unified production product.",
    architectureDetails: [
      "The read-only Document Intelligence API provides tenant-scoped document queries plus document-detail, validation, matching, processing-history and purchase-order endpoints.",
      "The canonical purchase-order model uses a deterministic extraction contract and exact monetary validation with Decimal, including arithmetic reconciliation for line totals, subtotal, tax and grand total.",
      "Supabase authentication is paired with authenticated backend session validation, active-membership resolution, role and membership-status validation, tenant UUID-based authorization and tenant-scoped API requests.",
      "The tenant UUID remains the authorization authority. The authoritative tenant slug only selects the controlled fictional UAT fixture namespace; it does not replace authorization or grant access. Mapping is restricted between the UAT tenant and that fixture namespace.",
      "Tenant isolation conceals unauthorized records with safe 404 behavior, while session projection avoids exposing sensitive authentication details.",
      "Automated backend, API, provider and tenant-isolation tests cover the platform foundations, with synthetic purchase-order fixture support for the governed UAT path.",
      "UAT API (technical preview, authenticated and read-only, synthetic data): https://flowsync-document-intelligence-api.vercel.app",
    ],
    capabilities: [
      "PDF, CSV, XLSX, email and TXT ingestion",
      "Structural block, section and table parsing",
      "Workflow DSL and DAG execution",
      "Tenant-scoped FastAPI document APIs",
      "Supabase authentication and tenant isolation",
      "Canonical purchase-order modelling",
      "Decimal-based financial validation",
      "Read-only React and TypeScript FlowSync UAT interface",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic",
      "Pandas",
      "PostgreSQL",
      "Supabase",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Pytest",
      "RapidFuzz",
      "Vercel",
    ],
    cardTechnologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Supabase",
      "Document Parsing",
    ],
    currentStatusHeading:
      "Current milestone: v0.22 — Deterministic Purchase-Order Demonstration",
    currentStatus:
      "The v0.22 milestone is complete and deployed to UAT. It demonstrates a controlled purchase-order workflow from deterministic extraction and canonical modelling through exact financial validation, tenant-scoped APIs and authenticated FlowSync presentation. The hosted demonstration uses synthetic, non-confidential data and is a technical preview rather than a production system.",
    currentStatusDetails: [
      "Current active work: v0.22.1 — Real Purchase-Order Accuracy Baseline.",
      "The private baseline compares expected and extracted values field by field and product by product to identify deterministic parsing defects and establish transparent support boundaries before broader layout support.",
    ],
    roadmap:
      "Development will proceed through governed accuracy, persistence, upload, review and bounded extraction milestones before production hardening.",
    roadmapDetails: [
      "Multi-layout PO accuracy corpus",
      "Persistent document lifecycle",
      "Private upload and object storage",
      "Human review and correction",
      "OCR fallback",
      "Controlled AI-assisted extraction",
      "Production hardening",
    ],
    links: [
      {
        url: "https://flowsync-document-intelligence-uat.vercel.app",
        label: "View Technical Preview",
        kind: "preview",
        primary: true,
      },
      {
        url: "https://flowsync-document-intelligence-api.vercel.app",
        label: "UAT API",
        kind: "api",
      },
    ],
    featured: true,
  },
  {
    slug: "flow-sync",
    title: "FlowSync",
    category: "Workflow Platform & Interface Foundation",
    status: "Existing platform foundation",
    statusVariant: "emerald",
    shortDescription:
      "A hosted workflow-facing platform for competitor monitoring, dashboard analytics and reusable interface patterns, with further data-integration work still in progress.",
    overview:
      "FlowSync is an evolving Next.js control-plane and user-interface foundation for competitor price intelligence and workflow monitoring, with Clerk authentication UI, Supabase-backed competitor records, dashboard views and an API-first boundary to a separately hosted execution and data plane.",
    problem:
      "Workflow products need reusable interface, authentication, analytics and integration patterns without coupling otherwise separate product domains.",
    solution:
      "Built Next.js, React, TypeScript and Tailwind CSS foundations covering Clerk sign-in and sign-up UI, Supabase-backed competitor records and CSV imports, dashboard and monitoring views, and typed API clients for external workflow and telemetry services.",
    architecture:
      "Shared design patterns may be reused, but business logic, APIs, entities, workflows and integrations remain separate between products. The existing FlowSync implementation remains linked to Competitor Price Intelligence and is being preserved untouched.",
    capabilities: [
      "Next.js, React, TypeScript and Tailwind CSS interface foundation",
      "Clerk authentication UI foundations",
      "Supabase-backed competitor records and realtime refresh",
      "CSV parsing and validation for competitor imports",
      "Dashboard, monitoring, alert and report views",
      "Typed API clients for external workflow controls and telemetry",
      "Polling safeguards and response normalization",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Clerk",
      "Supabase",
      "Recharts",
      "Papa Parse",
    ],
    currentStatus:
      "The original hosted FlowSync dashboard is a functional, publicly accessible technical preview associated with Competitor Price Intelligence and workflow monitoring. Some live data fetching still needs correction, so it is not production-ready or fully data-integrated and will be stabilized in a later milestone. It remains separate from the newer Document Intelligence FlowSync UAT interface.",
    links: [
      {
        url: "https://flow-sync-beta.vercel.app/dashboard",
        label: "View FlowSync Dashboard",
        kind: "preview",
        primary: true,
      },
      {
        url: "https://github.com/kamaubenjamin/FlowSync",
        label: "View Repository",
        kind: "repository",
      },
    ],
    featured: true,
  },
  {
    slug: "pair-and-place-website-operations",
    title: "Pair and Place Website Operations",
    category: "Web Operations & Support",
    status: "Maintenance milestone completed",
    statusVariant: "emerald",
    shortDescription:
      "A live WordPress maintenance engagement improving recoverability, booking reliability, email delivery, security hygiene and analytics readiness without disrupting the existing brand.",
    overview:
      "Pair and Place is a live travel and accommodation website that required careful maintenance without redesigning the public experience. Benjamin completed a structured technical review, created verified recovery backups, removed unnecessary plugins and themes, corrected local-time configuration, tested booking submissions and outbound email delivery, improved internal booking notifications and documented remaining usability, hosting and analytics work. The site remained live and operational throughout the engagement.",
    solution:
      "Established a website backup and maintenance baseline, corrected the timezone, tested the booking form and SMTP or email delivery, and reviewed booking-notification improvements, security and reliability.",
    capabilities: [
      "Two verified recovery backups",
      "Booking form and submission storage tested",
      "SMTP and inbox delivery verified",
      "Booking notification wording improved",
      "Unused plugins, themes and spam cleaned",
      "Timezone corrected for Kenyan operations",
      "Low-risk updates completed safely",
      "Remaining booking, hosting and analytics gaps documented",
    ],
    technologies: ["WordPress", "Elementor", "PHP", "MariaDB", "WP Mail SMTP", "ACF", "GTM4WP"],
    currentStatus:
      "The safe WordPress-side maintenance phase is complete. The engagement is paused pending hosting-panel access and client requests; the Elementor stack, hosting review, analytics, conversion tracking and booking-form improvements remain pending.",
    architecture:
      "The linked site is the live client website. Benjamin’s engagement covered maintenance, technical review, recoverability, booking-form testing, email delivery, reliability and operational cleanup; it does not represent a claim that he originally designed or built the complete website.",
    links: [
      {
        url: "https://pairandplace.com",
        label: "Visit Live Website",
        kind: "website",
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: "exploreafrica-travel-platform",
    title: "ExploreAfrica",
    category: "Travel Platform Architecture",
    status: "Functional platform foundation",
    statusVariant: "emerald",
    shortDescription:
      "A multi-tenant travel operations platform for managing customers, bookings, travellers, payments and private documents through a secure internal admin portal.",
    overview:
      "ExploreAfrica is a multi-tenant travel operations platform designed to centralize administrative work behind travel services. The current implementation includes working local workflows for customers, bookings, travellers, payments and private document management, supported by Supabase authentication, PostgreSQL, private storage and tenant-scoped access controls. The platform is validated locally and paused at a clean integration-readiness milestone while Document Intelligence remains the current priority.",
    problem:
      "A broader travel platform requires clear data, identity, tenant, role, authorization, audit and release foundations before transactional features can be developed safely.",
    solution:
      "Built a secure internal administration foundation with working local workflows for customers, bookings, travellers, payments, refunds and private documents, supported by tenant-scoped authentication, roles, permissions and file access.",
    architecture:
      "The Next.js application uses Supabase authentication, PostgreSQL row-level security and private Supabase Storage to isolate tenant records and documents. Signed access and file-access audit logging support controlled document operations while preserving a boundary for future Document Intelligence integration.",
    capabilities: [
      "Customer and traveller management",
      "Booking administration",
      "Payment tracking and refund workflows",
      "Private document upload and signed access",
      "Document lifecycle management",
      "Tenant-scoped roles and permissions",
      "Supabase Storage and PostgreSQL RLS",
      "File-access audit logging",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Supabase Storage",
      "RLS",
      "Tailwind CSS",
    ],
    currentStatusHeading: "Current milestone: V4-M11 — Document Intelligence integration readiness",
    currentStatus:
      "Core admin flows work locally, and private document storage and lifecycle management are implemented. The linked site is the earlier public travel showcase; it does not demonstrate the newer Admin Portal or its customer, booking, traveller, payment, private-document, tenancy, RLS and Supabase capabilities. Production deployment is not verified, while public booking, live payments, CRM, reporting and Document Intelligence execution remain incomplete.",
    roadmap:
      "The next phase will connect the locally validated operations foundation to bounded document extraction and review workflows.",
    roadmapDetails: [
      "Extraction request and result schema",
      "Document Intelligence provider boundary",
      "Extraction review UI",
      "Audit viewer",
      "CRM and reporting",
      "Production hardening",
    ],
    links: [
      {
        url: "https://travelling-vacation-0zxt.bolt.host/",
        label: "View Public Showcase",
        kind: "website",
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: "gymbolt-gym-management-system",
    title: "GymBolt Gym Management System",
    category: "Gym Operations & Payment Reconciliation",
    status: "Public demo verified",
    statusVariant: "lime",
    shortDescription:
      "Publicly accessible early MVP for gym operations, member management, attendance, billing, and verified hosted M-Pesa sandbox settlement workflows.",
    featuredDescription:
      "Publicly accessible early MVP for gym operations, member management, attendance, billing, and verified hosted M-Pesa sandbox settlement workflows.",
    overview:
      "A publicly accessible early MVP for gym operations, member management, attendance, billing, and verified hosted M-Pesa sandbox settlement workflows. The global Cloudflare Pages demo uses a hosted Supabase backend and demonstrates the verified Daraja sandbox settlement path without representing a pilot, a production-ready service or live M-Pesa use.",
    problem:
      "Gym administrators need member activity, subscriptions, invoices and payments to remain consistent across operational views. When payment initiation, callbacks and invoice updates are handled separately, duplicate settlements and mismatched revenue or outstanding balances become material risks.",
    solution:
      "Built an authenticated early MVP that joins core gym workflows to auditable billing. GymBolt records manual payments and hosted M-Pesa sandbox attempts, reconciles a successful callback-based settlement to its invoice and presents aligned financial state across Billing and Dashboard views.",
    solutionDetails: [
      "Centralized member registration, subscription state, attendance and invoice administration",
      "Manual partial and final payment recording alongside the hosted M-Pesa sandbox path",
      "Authoritative callback-based settlement updates across payments, invoices and dashboard totals",
    ],
    architecture:
      "The Vite, React and TypeScript interface uses Supabase Auth with a PostgreSQL data layer protected by Row-Level Security. Supabase Edge Functions provide the server-side boundary for Daraja initiation and callback processing so private integration concerns remain outside the browser.",
    architectureDetails: [
      "Authenticated admin access with database authorization enforced through Row-Level Security",
      "Server-side STK Push initiation and callback handling through Supabase Edge Functions",
      "Duplicate-settlement protection so an invoice cannot be completed more than once",
      "Receipt/reference retention and failed-attempt history for an auditable payment record",
    ],
    capabilities: [
      "Email/password authentication",
      "Member registration and management",
      "Initial subscription assignment and current subscription state",
      "Attendance search and eligibility checks",
      "Protected manual check-in with duplicate check-in prevention",
      "Billing and invoices",
      "Manual partial and final payment recording",
      "Financial dashboard updates",
      "Hosted Daraja sandbox STK workflow and callback-based settlement",
      "Receipt/reference retention and invoice reconciliation",
      "Failed-attempt history and duplicate-settlement protection",
      "Cloudflare Pages public deployment",
    ],
    paymentWorkflow:
      "The complete hosted Daraja sandbox payment success path was verified. A successful callback becomes one authoritative completed payment rather than treating the initial request as proof of payment.",
    paymentWorkflowDetails: [
      "Invoice created → STK Push initiated",
      "Sandbox handset approval received → Daraja callback processed",
      "Payment reconciled → invoice marked paid",
      "Billing and Dashboard totals updated",
      "Receipt/reference retained while failed attempts remain in history",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Row-Level Security",
      "Supabase Edge Functions",
      "Safaricom Daraja API",
      "GitHub",
      "Cloudflare Pages",
    ],
    cardTechnologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Daraja API", "Cloudflare Pages"],
    verifiedOutcomes: [
      "Public login works",
      "Dashboard loads and the hosted member count appears",
      "Billing loads",
      "Attendance loads",
      "Public Cloudflare Pages deployment verified",
      "Hosted Daraja sandbox settlement verified",
      "One authoritative completed payment retained with its receipt/reference",
      "Linked invoice reconciled with KES 0 outstanding in the verified sandbox case",
      "Failed attempts retained without duplicate settlement",
      "Public Sandbox STK action hidden",
      "No old Bolt backend or localhost target observed",
    ],
    currentStatusHeading: "Current Status & Next Step",
    currentStatus:
      "GymBolt is a globally accessible early MVP with a verified public Cloudflare Pages demo, an active hosted Supabase backend and verified hosted Daraja sandbox settlement. The completed payment is controlled sandbox evidence only, not customer revenue. Security, subscription and production-payment work remains before any live operational use.",
    currentStatusDetails: [
      "Public Cloudflare Pages demo verified",
      "Hosted Supabase backend active",
      "Hosted Daraja sandbox settlement verified",
      "Public login verified",
      "Dashboard, Billing and Attendance verified",
      "Public STK initiation disabled",
      "Production M-Pesa not enabled",
      "Not production-ready",
      "No paying pilot or gym client",
      "No customer revenue",
    ],
    roadmap:
      "The verified public demo remains intentionally bounded while production payment, security and incomplete product modules are addressed.",
    roadmapDetails: [
      "Production M-Pesa onboarding pending",
      "Public STK initiation disabled",
      "Daraja callback-origin authentication not production-hardened",
      "Subscription renewal incomplete",
      "Full subscription-history management incomplete",
      "Secondary modules partial or placeholder, including class scheduling, inventory, announcements, settings, portals and notifications",
      "Dependency-audit findings unresolved",
      "No paying client or verified pilot",
    ],
    role:
      "I designed and implemented the verified GymBolt foundation across the React interface, Supabase data model, access controls, gym administration workflows and server-side Daraja sandbox integration.",
    roleDetails: [
      "Implemented member, subscription, attendance, invoice and manual-payment workflows",
      "Integrated STK Push initiation and Daraja callback handling through Supabase Edge Functions",
      "Implemented receipt retention, failed-attempt history, duplicate-safe settlement and invoice reconciliation",
    ],
    callToAction:
      "Need an internal operations system that connects records, billing and auditable payment workflows? Let’s discuss a focused build based on your real process and integration requirements.",
    liveDemoStatus: "https://gymbolt.pages.dev",
    repositoryStatus: "Private Repository",
    links: [
      {
        url: "https://gymbolt.pages.dev",
        label: "Live Demo",
        kind: "preview",
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: "competitor-price-intelligence-platform",
    title: "Competitor Price Intelligence Platform",
    category: "Data Collection & Intelligence",
    status: "Paused - separate product",
    statusVariant: "default",
    shortDescription:
      "A Python-based monitoring system for collecting, normalizing, matching and tracking competitor product pricing across multiple sources.",
    overview:
      "A separate developed product for extracting data from websites and other sources, cleaning and normalizing it, matching comparable products and monitoring price changes over time.",
    problem:
      "Product information from different websites and sources varies in structure and naming, making reliable comparison and price-change tracking difficult without validation, normalization and matching.",
    solution:
      "Developed separated extraction, transformation and loading concerns with source extraction, product-data cleaning and normalization, validation, fuzzy matching, price-history tracking, change detection, alerts, execution metrics and execution logging.",
    architecture:
      "This product evolved from a reusable Python ETL foundation covering extraction, Pandas transformation, validation, CSV and SQLite loading, pipeline state, logging and orchestration. Python extraction and processing now uses SQLite-backed storage, Playwright extraction, Selenium support and reusable ETL lifecycle concepts, with Streamlit dashboard and monitoring foundations. Its existing FlowSync integration remains untouched and separate from Document Intelligence.",
    capabilities: [
      "Website and source extraction",
      "Separated extraction, transformation and loading concerns",
      "Product-data cleaning, normalization and validation",
      "Fuzzy product matching",
      "Price-history tracking, price-change detection and alerts",
      "Execution metrics and execution logging",
      "SQLite-backed processing and Streamlit monitoring foundations",
      "Playwright extraction and Selenium extraction support",
    ],
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Playwright",
      "Selenium",
      "BeautifulSoup",
      "RapidFuzz",
      "SQLite",
      "Requests",
      "Streamlit",
    ],
    currentStatus:
      "The platform remains a separate developed product and is currently paused while the Intelligent Document Processing Platform is the primary development focus. The shared repository records the earlier ETL pipeline’s evolution into this specialized competitor-price-monitoring product; no hosted Streamlit deployment is verified. Its existing FlowSync integration is being preserved for future product work.",
    roadmap:
      "Future work may improve the product without merging its business logic, APIs, entities or workflows into Document Intelligence. The existing FlowSync integration remains untouched.",
    links: [
      {
        url: "https://github.com/kamaubenjamin/ETL-COMPETITOR-PRICE-MONITOR-pipeline",
        label: "View Repository",
        kind: "repository",
        primary: true,
      },
    ],
    featured: false,
  },
] satisfies Project[]).sort(
  (a, b) =>
    (projectDisplayOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
    (projectDisplayOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
);