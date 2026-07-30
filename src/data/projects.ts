export type ProjectStatus =
  | "Active development"
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
    status: "Hosted sandbox verified",
    statusVariant: "lime",
    shortDescription:
      "A gym-operations system with verified member, subscription, attendance, invoicing and hosted Daraja sandbox payment-reconciliation workflows.",
    featuredDescription:
      "Verified gym operations and hosted M-Pesa sandbox reconciliation—from STK Push initiation to one authoritative paid invoice.",
    overview:
      "GymBolt is a React and Supabase gym-management system built to connect day-to-day administration with traceable billing. The verified scope covers authenticated administration, member and subscription management, attendance check-in, invoice creation, manual payment recording and a hosted Safaricom Daraja sandbox workflow. The payment success path has been verified end to end in the sandbox, including the private phone approval, successful callback, duplicate-safe settlement and matching Billing and Dashboard totals. It is not a production M-Pesa deployment and has no paying gym client, production users or claimed business revenue.",
    problem:
      "Gym administrators need member activity, subscriptions, invoices and payments to remain consistent across operational views. When payment initiation, callbacks and invoice updates are handled separately, duplicate settlements and mismatched revenue or outstanding balances become material risks.",
    solution:
      "Built an authenticated operations platform that joins core gym workflows to auditable billing and payment reconciliation. GymBolt records both manual payments and M-Pesa sandbox attempts, retains payment references, reconciles one successful settlement to its invoice and presents aligned financial state in Billing and Dashboard views.",
    solutionDetails: [
      "Administrators can manage members and subscriptions, record attendance check-ins and create invoices.",
      "Payments can be recorded manually or initiated through the hosted Daraja sandbox STK Push path.",
      "Successful settlement updates the authoritative payment, invoice and aggregate billing state while preserving failed-attempt history.",
    ],
    architecture:
      "The Vite, React and TypeScript interface uses Supabase Auth and a PostgreSQL data layer protected by row-level security. Supabase Edge Functions provide the server-side boundary for Daraja sandbox initiation and callback processing so private integration concerns are not placed in the browser. The project is prepared for Cloudflare Pages deployment, but that public deployment is still pending.",
    architectureDetails: [
      "Row-Level Security supports database authorization boundaries alongside authenticated admin access.",
      "Daraja initiation and callback handling run through Supabase Edge Functions rather than exposing private payment credentials in client code.",
      "Settlement logic protects an invoice from being completed more than once while retaining failed attempts for an auditable history.",
      "Verified source state: branch feature/mpesa-sandbox-foundation, Cloudflare-readiness commit 4ff642a2, clean synchronized working tree.",
    ],
    capabilities: [
      "Admin authentication",
      "Member and subscription management",
      "Attendance check-in workflow",
      "Invoice creation and manual payment recording",
      "M-Pesa STK Push sandbox initiation",
      "Daraja callback and receipt retention",
      "Invoice and dashboard reconciliation",
      "Failed-attempt history and duplicate-settlement protection",
    ],
    paymentWorkflow:
      "An administrator initiates an STK Push against an invoice through a Supabase Edge Function. Safaricom’s hosted Daraja sandbox sends a real prompt to the test phone, where approval remains private. Daraja then returns the callback to the server-side handler. A ResultCode 0 callback is validated and reconciled into one authoritative completed payment, retaining the receipt or reference, marking the invoice paid and updating Billing and Dashboard totals. Failed attempts remain in history, and duplicate-settlement protection prevents the same invoice from being completed twice.",
    paymentWorkflowDetails: [
      "Hosted sandbox only: the integration reached Safaricom’s hosted Daraja test environment and produced a real test-phone prompt.",
      "Verified success milestone: M3.2B_PHASE_3_SUCCESS_PATH=PASS.",
      "Verified reconciliation: KSh 1 paid, KSh 0 outstanding and KSh 1 recorded revenue.",
      "This evidence does not represent production M-Pesa processing or customer revenue.",
    ],
    engineeringHighlights: [
      "Server-side M-Pesa integration boundary through Supabase Edge Functions",
      "Supabase Auth with PostgreSQL Row-Level Security",
      "Authoritative settlement model rather than treating initiation as payment success",
      "Idempotent duplicate-settlement protection",
      "Receipt/reference retention and failed-attempt history",
      "Cross-view Billing and Dashboard reconciliation",
      "Cloudflare Pages deployment preparation at commit 4ff642a2",
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
      "M3.2B_PHASE_3_SUCCESS_PATH=PASS",
      "A real sandbox phone prompt was privately approved and returned Daraja ResultCode 0",
      "Exactly one authoritative completed payment was retained with its receipt/reference",
      "The linked invoice was marked paid",
      "Billing state reconciled to KSh 1 paid and KSh 0 outstanding",
      "Dashboard state reconciled to KSh 1 recorded revenue",
      "Failed attempts remained available without creating duplicate settlement",
    ],
    currentStatus:
      "The hosted Daraja sandbox success path is verified on branch feature/mpesa-sandbox-foundation at Cloudflare-readiness commit 4ff642a2. The working tree was clean, and the branch was pushed and synchronized. Public Cloudflare deployment is pending because setup paused during Cloudflare maintenance. The older Bolt-hosted site is not linked because it points to the wrong Supabase backend and is not authoritative. No official live project URL is currently available.",
    currentStatusDetails: [
      "Hosted sandbox verified; public deployment pending; production M-Pesa not implemented.",
      "No paying gym client, production users or production revenue are claimed.",
      "Secondary unfinished modules are outside the verified case-study scope.",
    ],
    roadmap:
      "The next milestone is to establish an authoritative public preview and then complete the operational and assurance work required before any production claim.",
    roadmapDetails: [
      "Complete and verify the Cloudflare Pages deployment",
      "Connect the public build only to the authoritative Supabase backend",
      "Add broader automated tests, observability and deployment verification",
      "Complete and verify secondary modules before presenting them publicly",
      "Perform production security, operational and Daraja go-live work before any production M-Pesa use",
    ],
    role:
      "I designed and implemented the verified GymBolt foundation across the React interface, Supabase data model, authentication and authorization boundaries, gym administration workflows, server-side Daraja sandbox integration and payment reconciliation path.",
    roleDetails: [
      "Implemented admin, member, subscription, attendance, invoice and manual-payment workflows.",
      "Integrated STK Push initiation and Daraja callback handling through Supabase Edge Functions.",
      "Implemented receipt retention, failed-attempt history, duplicate-safe settlement and invoice reconciliation.",
      "Prepared and synchronized the Cloudflare-ready source milestone while keeping deployment status explicit.",
    ],
    servicePositioning:
      "Suitable evidence for custom internal business systems, membership and subscription administration, billing dashboards, Supabase-backed operations tools and sandbox payment-integration prototyping. Production payment deployment would require a separately scoped security and go-live phase.",
    callToAction:
      "Need an internal operations system that connects records, billing and auditable payment workflows? Let’s discuss a focused build based on your real process and integration requirements.",
    ctaLabels: [
      "View GymBolt Case Study",
      "Discuss a Similar Project",
      "Ask About Payment Integration",
      "Cloudflare Deployment Pending",
    ],
    tags: [
      "Gym Management",
      "Internal Business System",
      "Membership Management",
      "Subscription Billing",
      "Payment Reconciliation",
      "M-Pesa Sandbox",
      "Supabase",
      "React & TypeScript",
    ],
    screenshotRecommendations: [
      "Admin dashboard showing reconciled KSh 1 revenue, with test data clearly labelled",
      "Member and subscription management views using non-identifying sample records",
      "Attendance check-in workflow",
      "Invoice before payment and the same invoice marked paid after reconciliation",
      "Payment history showing one completed settlement and retained failed attempts, with phone numbers and references redacted",
      "Private Daraja sandbox evidence showing STK prompt and ResultCode 0 callback, with all secrets and personal data removed",
    ],
    demoVideoRecommendation:
      "Record a 60–90 second narrated walkthrough using test data: sign in, open a member and subscription, check in attendance, create a KSh 1 invoice, initiate the hosted sandbox STK Push, show private approval only in a redacted insert, then show the paid invoice and reconciled Billing and Dashboard totals. Add an opening and closing caption stating: ‘Hosted Daraja sandbox verification — not production M-Pesa. Public Cloudflare deployment pending.’",
    liveDemoStatus: "Cloudflare deployment pending",
    repositoryStatus: "Private source repository",
    claimsNotToMake: [
      "Do not describe GymBolt as production-ready or the M-Pesa integration as production.",
      "Do not claim paying gyms, customers, production users, revenue, conversion gains, testimonials or partnerships.",
      "Do not present KSh 1 sandbox reconciliation as business revenue.",
      "Do not use the old Bolt-hosted site as the authoritative live project; it points to the wrong Supabase backend.",
      "Do not imply that Cloudflare deployment is live before it is completed and verified.",
      "Do not present unfinished secondary modules as complete.",
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