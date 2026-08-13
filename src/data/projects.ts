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
  | "Pilot-oriented release candidate"
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
  cardDescription?: string;
  featuredDescription?: string;
  positioning?: string;
  valueProposition?: string;
  overview: string;
  problem?: string;
  responsibilities?: string;
  architecture?: string;
  architectureDetails?: string[];
  solution?: string;
  solutionDetails?: string[];
  caseStudySections?: Array<{
    title: string;
    description?: string;
    details?: string[];
  }>;
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
  ["gymbolt-gym-management-system", 0],
  ["intelligent-document-processing-platform", 1],
  ["exploreafrica-travel-platform", 2],
  ["flow-sync", 3],
  ["competitor-price-intelligence-platform", 4],
  ["pair-and-place-website-operations", 5],
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
    featured: false,
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
    title: "GymBolt Management System",
    category: "Configurable Gym Operations Platform",
    status: "Pilot-oriented release candidate",
    statusVariant: "lime",
    shortDescription:
      "A deployed pre-production gym operations platform covering membership lifecycle, attendance, billing, receipts, classes, inventory and configurable client deployment, with verified Daraja sandbox payment architecture.",
    cardDescription:
      "A configurable gym operations platform covering membership lifecycle, attendance, billing, receipts and operational workflows, deployed as a pre-production release candidate with verified Daraja sandbox payment architecture.",
    featuredDescription:
      "Configurable gym operations platform for membership, attendance, billing, receipts and day-to-day gym workflows, deployed as a pilot-oriented release candidate with verified Daraja sandbox payment architecture.",
    positioning:
      "A configurable gym operations platform built for controlled deployment and customization for individual gyms.",
    valueProposition:
      "A deployed pre-production gym operations platform covering membership lifecycle, attendance, billing, receipts, classes, inventory and configurable client deployment, with verified Daraja sandbox payment architecture.",
    overview:
      "GymBolt is a configurable gym operations platform designed for independent gym deployments. It combines member administration, membership lifecycle, subscriptions, billing, payment reconciliation, receipts, attendance, classes, trainers, inventory, announcements, profiles and gym settings across responsive admin and member experiences.",
    problem:
      "Gym operators need membership, attendance, billing, payments, receipts, classes and operational records to remain consistent. Disconnected tools and manual workflows can create unclear membership state, billing inconsistencies, duplicate payment handling, weak attendance controls, missing transaction history, operational fragmentation and difficult client-specific deployment.",
    solution:
      "GymBolt is an authenticated operational platform that centralizes gym administration and member-facing workflows while keeping payment and membership state authoritative. Its isolated deployments, security boundaries and reusable configuration architecture support operational consistency without using a shared multi-tenant SaaS database.",
    solutionDetails: [
      "Configurable isolated deployments for individual gyms",
      "Consistent membership lifecycle, billing and payment reconciliation",
      "Reusable deployment architecture with role-aware security boundaries",
    ],
    caseStudySections: [
      {
        title: "Key Capabilities",
        details: [
          "Member administration, membership lifecycle, subscriptions and billing",
          "Payment reconciliation, receipts, attendance and classes",
          "Trainers, inventory, announcements, profiles and configurable gym settings",
          "Responsive admin and member layouts validated at 320×568, 390×844, 768×1024 and desktop sizes",
        ],
      },
      {
        title: "Membership & Billing Lifecycle",
        description:
          "An invoice represents payment intent. Membership state changes only after authoritative settlement. This preserves the current membership period during renewal, applies the future transition after settlement and protects against duplicate transitions.",
        details: [
          "Member onboarding and approval, membership plans and activation",
          "Renewal billing, invoice lifecycle and member billing visibility",
          "Authoritative payment reconciliation with manual payment fallback",
        ],
      },
      {
        title: "Payments & Receipt Architecture",
        description:
          "GymBolt includes an implemented and tested Safaricom Daraja sandbox payment architecture. Production M-Pesa remains deliberately disabled, and sandbox transactions are not represented as business revenue.",
        details: [
          "STK Push, callback handling, reconciliation, failure/retry handling and exactly-once payment application",
          "Duplicate callback protection plus wrong amount, member and invoice validation",
          "Persistent customer-safe receipt references with view, print and reprint for authorized admin/staff and members",
          "Internal UUIDs and provider metadata are not exposed to members; receipt history persists across navigation and login sessions",
          "Hosted receipt-email infrastructure configured; final real delivery acceptance pending.",
          "Resend is configured server-side with pending/sent/failed audit states, exactly-once delivery intent and authorized manual resend; payment success remains independent from email failure",
        ],
      },
      {
        title: "Member Experience",
        description:
          "Members can use a responsive dashboard to view membership status, billing, receipts, attendance history, classes and announcements, and manage their profile and avatar.",
        details: [
          "Staff/admin performs the authoritative member check-in. Members can view their own attendance history but do not currently self-check-in.",
          "Private avatar storage validates JPEG, PNG and WebP files up to 5 MiB",
        ],
      },
      {
        title: "Admin / Staff Operations",
        details: [
          "Member management, membership approval, billing, payment recording and receipt operations",
          "Attendance check-in, trainer management, class and attendance management",
          "Inventory, announcements and installation settings",
          "Trainer roles, entities, assignments and class operations are implemented. A dedicated trainer-specific portal/workspace is not yet implemented.",
        ],
      },
      {
        title: "Classes, Attendance, Inventory & Announcements",
        details: [
          "Classes support create, update, reschedule, cancel, archive and booking with capacity, duplicate-booking and overbooking protection",
          "Attendance enforces eligibility, duplicate protection and member privacy boundaries",
          "Inventory uses authoritative stock adjustments, immutable adjustment history and low-stock visibility",
          "Announcements support draft, publish, archive and audience targeting; members see relevant published announcements",
        ],
      },
      {
        title: "Architecture & Security",
        description:
          "The React, TypeScript, Vite and Tailwind CSS frontend uses Supabase PostgreSQL, Auth, Storage and Edge Functions. Supabase authentication, Row-Level Security across public tables, private storage, role-aware access and cross-member exposure denial enforce the main security boundaries.",
        details: [
          "Server-only Supabase service-role, Resend and Daraja secrets are not exposed to the browser",
          "The current hosted migration ledger has 19 / 19 migrations applied",
          "Private storage includes profile avatars and installation assets",
        ],
      },
      {
        title: "Deployment & Portability",
        description:
          "GymBolt currently uses an isolated single-gym deployment model rather than a shared multi-tenant SaaS database. Each gym receives its own frontend deployment, Supabase project, PostgreSQL database, authentication, gym settings, M-Pesa configuration and email configuration. A new gym installation should normally require configuration rather than source-code edits.",
        details: [
          "Installation bootstrap flow, environment templates and a deployment validation command",
          "Configurable gym identity and providers with client installation documentation",
          "No predictable bootstrap password, copied client secrets or shared gym data",
          "Second-gym configuration simulation completed",
          "Cloudflare Pages direct-upload deployment validated with HTTPS, HTTP 200, matching immutable build hashes, zero application fatal errors and zero browser loopback requests in verified hosted checks",
        ],
      },
      {
        title: "Engineering Quality",
        description:
          "Recent maintained test gates passed with no known application or security defects in the verified release scope.",
        details: [
          "Authentication, onboarding and membership race-condition testing",
          "Payment concurrency, duplicate/delayed callbacks, wrong-payment validation and exactly-once settlement",
          "Receipt persistence and email-delivery intent protections",
          "Class, attendance and inventory concurrency and constraints",
          "Storage/settings security, responsive UI validation, repository secret scanning and browser-bundle secret scanning",
        ],
      },
    ],
    architecture:
      "GymBolt is designed for repeatable isolated gym deployments, with Cloudflare Pages hosting the frontend and a separate Supabase-backed data and security boundary for each gym.",
    architectureDetails: [
      "No automatic Git-based Cloudflare deployment integration is claimed; the verified deployment used direct upload",
      "Gym identity, logo, contact details, address, timezone, currency, receipt display name and support contacts are configurable",
      "Installation logos accept validated files up to 2 MiB",
    ],
    capabilities: [
      "Member onboarding and approval, plans, activation and renewal billing",
      "Invoices, authoritative payment reconciliation, persistent receipts and manual payment fallback",
      "Staff/admin attendance check-in with eligibility and duplicate-attendance protection",
      "Class creation, updates, rescheduling, cancellation, archiving and capacity-safe booking",
      "Trainer entities, roles, assignments and class operations",
      "Inventory records, authoritative stock adjustments, immutable history and low-stock visibility",
      "Draft, publish and archive announcements with audience targeting",
      "Member and admin profiles, private avatars, gym identity and installation settings",
    ],
    paymentWorkflow:
      "A payment request is not treated as proof of payment. Daraja sandbox callback validation and authoritative reconciliation apply a successful payment exactly once before dependent membership state changes.",
    paymentWorkflowDetails: [
      "Invoice created → STK Push initiated → callback validated",
      "Authoritative settlement applied exactly once → receipt persisted → membership transition evaluated",
      "Failure, retry, duplicate callback and mismatched payment paths remain protected",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase Auth",
      "PostgreSQL",
      "Row-Level Security",
      "Supabase Storage",
      "Supabase Edge Functions",
      "Safaricom Daraja Sandbox",
      "Resend",
      "Cloudflare Pages",
      "Git",
      "GitHub",
    ],
    cardTechnologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Daraja Sandbox", "Cloudflare Pages"],
    verifiedOutcomes: [
      "Functional hosted frontend deployed at gymbolt.pages.dev",
      "Cloudflare Pages direct-upload artifact matched local build hashes",
      "HTTPS and HTTP 200 checks passed with zero application fatal errors and zero browser loopback requests",
      "Daraja sandbox architecture verified without enabling production M-Pesa",
    ],
    currentStatusHeading: "Current Status & Limitations",
    currentStatus:
      "Deployed pre-production / pilot-oriented release candidate. GymBolt is suitable for portfolio review, demonstrations and controlled pilot discussions, but it is not yet production-proven.",
    currentStatusDetails: [
      "Production M-Pesa disabled",
      "Final real receipt-email delivery acceptance pending",
      "Dedicated trainer portal not implemented",
      "Member self-service QR attendance and access-control hardware integration not implemented",
      "No controlled gym pilot completed yet and no paying gym client",
      "No customer revenue",
      "No production customer telemetry",
      "Isolated single-gym deployments, not a shared multi-tenant SaaS deployment",
    ],
    roadmap:
      "The next major business milestone is controlled pilot adoption.",
    roadmapDetails: [
      "Development → local hardening complete → hosted release candidate → provider configuration → controlled pilot → real gym feedback → production hardening",
      "Future opportunities: production M-Pesa, dedicated trainer workspace, QR attendance and kiosk/access-control integrations",
      "Deferred opportunities: AI analytics, AI member assistant, churn prediction, shared multi-tenant SaaS architecture and production customer telemetry",
    ],
    role:
      "I designed and implemented GymBolt across the product architecture, operational workflows, responsive experiences, deployment model and security boundaries.",
    roleDetails: [
      "Application architecture, data model, authentication and authorization",
      "Membership lifecycle, billing, payment reconciliation, receipts and receipt-email architecture",
      "Attendance, classes, trainers, inventory, announcements, profiles and settings",
      "Responsive product design, portability, Cloudflare deployment, Supabase security, testing and documentation",
    ],
    callToAction:
      "Need a configurable operations platform with authoritative billing, secure workflows and repeatable client deployment? Let’s discuss a similar project.",
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
    featured: true,
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