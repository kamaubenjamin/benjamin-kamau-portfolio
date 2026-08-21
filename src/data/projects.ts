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
  | "Client Validation Prototype"
  | "Pilot-oriented release candidate"
  | "Production Deployed"
  | "Live Pilot"
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
  ["spice-harvest-ops", 1],
  ["intelligent-document-processing-platform", 2],
  ["home-health-operations-demo", 3],
  ["exploreafrica-travel-platform", 4],
  ["flow-sync", 5],
  ["competitor-price-intelligence-platform", 6],
  ["pair-and-place-website-operations", 7],
  ["essiedo-catalogue-pilot", 8],
]);

export const projects: Project[] = ([
  {
    slug: "intelligent-document-processing-platform",
    title: "Intelligent Document Processing Platform",
    category: "Document Intelligence & Workflow Automation",
    status: "Active development",
    statusVariant: "lime",
    shortDescription:
      "A governed document-processing platform with deterministic ingestion, structural parsing, workflow orchestration, tenant-scoped APIs and a six-layout purchase-order accuracy corpus.",
    overview:
      "Benjamin’s flagship project is a governed document-processing platform combining deterministic ingestion, structural parsing, configurable workflow execution, tenant-scoped FastAPI endpoints and a separate authenticated Document Intelligence frontend. The current v0.23 milestone adds a governed six-layout fictional purchase-order corpus with strict field and line-item accuracy evaluation, exact metrics and repeatable state-isolated execution. The v0.22 read-only, tenant-isolated UAT technical preview remains the hosted demonstration foundation.",
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
      "Corpus v1 measures exact classification, header, party, date, line-item, financial-reconciliation and warning/finding outcomes across six fictional deterministic layouts.",
      "Bounded supplier and ship-to recovery supports serialized standalone labels and machine-readable PDF visual headers without introducing OCR or probabilistic extraction.",
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
      "Six-layout fictional purchase-order accuracy corpus",
      "Exact field, line-item, financial and finding metrics",
      "Deterministic repeatability and state isolation",
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
      "Current milestone: v0.23 — Purchase-Order Accuracy Corpus Foundation",
    currentStatus:
      "The v0.23 foundation is implemented and locally verified. Six fictional layouts exercise deterministic classification, canonical extraction, strict comparison and expected-valid or expected-invalid outcomes. The hosted v0.22 demonstration remains a synthetic, authenticated, read-only UAT technical preview; IDP is in active development and is not production-ready.",
    currentStatusDetails: [
      "Six unique fictional layouts cover conventional, vertical, wrapped-description, reordered-column, missing-optional-field and malformed-validation cases.",
      "Exact classification, header, party, date, line-item count/field, financial-reconciliation, warning/finding and overall metrics are reported.",
      "Deterministic repeatability and cross-fixture state isolation are verified.",
      "22 focused purchase-order and corpus tests pass.",
    ],
    roadmap:
      "Future expansion remains governed and claim-bounded. OCR, human review/correction and controlled AI-assisted extraction require separate architecture, privacy, security and evaluation gates.",
    roadmapDetails: [
      "Additional governed fictional layouts and supported-pattern coverage",
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
        url: "https://flowsync-document-intelligence-api.vercel.app/docs",
        label: "UAT API",
        kind: "api",
      },
    ],
    featured: true,
  },
  {
    slug: "home-health-operations-demo",
    title: "Home Health Operations Demo",
    category: "Responsive Home-Health Operations Prototype",
    status: "Client Validation Prototype",
    statusVariant: "lime",
    shortDescription:
      "A responsive home-health operations prototype built from real client discovery, bringing patient records, caregiver updates, vital signs, care tasks, operational alerts and invoicing into one simple workflow.",
    cardDescription:
      "Responsive home-health operations prototype built from real client discovery, combining patient records, caregiver updates, vital signs, care tasks, operational alerts and invoicing in one workflow.",
    positioning:
      "Turning real operational requirements into a working client-validation system.",
    valueProposition:
      "I gathered real operational requirements and translated them into a working interactive prototype so the workflow could be validated before investing in backend, authentication and production security infrastructure.",
    overview:
      "After gathering requirements from a prospective home-health client, Benjamin translated the operator’s current needs into a working responsive client-validation prototype. The application demonstrates patient and caregiver management, vital-sign recording, timestamped care notes, task tracking, operational alerts and KES invoicing across mobile and desktop interfaces. The current version intentionally uses fictional sample data and local React application state while the workflow is validated before any backend or production security implementation.",
    problem:
      "The prospective operator needed a simple operational system rather than a complex hospital ERP. At the discovery stage, the workflow covered two patients and three caregivers, with patient notes, vital-sign recording, caregiver tasks, completed and pending care work, operational alerts, invoicing and an accessible interface requiring clearer coordination in one place.",
    solution:
      "Built an interactive frontend application that models the requested day-to-day workflow and allows the prospective client to review how patient information, caregiver updates, tasks, alerts and invoices fit together before production infrastructure is selected or implemented.",
    solutionDetails: [
      "Dashboard views for active patients, caregiver count, today’s tasks, active alerts, outstanding invoices and recent activity",
      "Patient records with assigned caregivers, care status, latest activity and detailed vital-sign, note, task and activity views",
      "Caregiver workflows for assigned patients, today’s tasks, vital-sign entry, patient notes, task completion and task reopening",
      "Operational task alerts, review flags, follow-up reminders and invoice-related alerts",
      "KES invoice list, service periods, amounts, Draft/Sent/Paid/Overdue states and draft invoice creation",
      "Interactive changes update local React application state without claiming server persistence",
    ],
    caseStudySections: [
      {
        title: "Business Discovery",
        description:
          "The prototype originated from requirements discovery with a prospective client operating primarily in home health. The goal was to make a small current workflow visible and testable without prematurely committing to hospital-scale software or production healthcare infrastructure.",
        details: [
          "Discovery baseline: two patients and three caregivers",
          "Requirements covered notes, vital signs, caregiver tasks, task status, alerts, invoicing and accessible UX",
          "The prospective client is not presented as a paying production client or as an organization currently running the prototype in production",
        ],
      },
      {
        title: "Key Workflows",
        details: [
          "Dashboard: active patients, caregivers, today’s tasks, alerts, outstanding invoices and recent activity",
          "Patients: fictional records, assigned caregivers, care status and latest activity",
          "Patient detail: blood pressure, pulse, temperature, SpO2, timestamped notes, care tasks and activity history",
          "Caregiver workflow: assigned patients, task review, vital-sign recording, note entry, completion and reopening",
          "Alerts and invoicing: operational follow-ups plus KES invoice creation and status tracking",
        ],
      },
      {
        title: "Patient & Caregiver Experience",
        description:
          "The interface connects patient context with caregiver action. Users can inspect a fictional patient’s summary and assigned caregiver, review vital-sign history and timestamped notes, and work through completed or pending care tasks in the same prototype flow.",
      },
      {
        title: "Alerts & Invoicing",
        description:
          "Operational alerts cover task issues, review flags, follow-up reminders and invoice-related attention. The invoice workflow presents service period, KES amount and Draft, Sent, Paid or Overdue state, and supports creating a draft invoice in local state.",
      },
      {
        title: "Responsive Engineering",
        description:
          "Responsive behavior was deliberately validated across mobile, tablet, laptop and large-desktop widths rather than treated as a desktop-only dashboard adaptation.",
        details: [
          "Mobile validation at 360px, 390px and 430px",
          "Tablet validation at 768px and 1024px",
          "Laptop validation at 1280px and 1440px",
          "Large-desktop validation at 1600px and 1920px",
          "Mobile bottom navigation and desktop sidebar navigation",
          "Touch-friendly controls, responsive records/forms/dialogs, safe mobile viewport behavior, no page-level horizontal overflow and bounded large-screen content width",
        ],
      },
      {
        title: "Validation",
        description:
          "The current prototype passed implementation and hosted-preview checks. These are prototype engineering checks, not evidence of production healthcare readiness.",
        details: [
          "TypeScript typecheck and production build passed",
          "Cloudflare-hosted root, JavaScript/CSS assets and favicon returned HTTP 200",
          "Root refresh, major navigation and patient-detail workflow passed",
          "Hosted checks passed at 390px mobile and 1440px desktop",
          "No browser runtime errors or page-level horizontal overflow were observed during the recorded validation",
        ],
      },
      {
        title: "Current Prototype Boundaries",
        description:
          "This is a frontend-only client-validation prototype using fictional sample patient data and local React application state. It is designed to validate workflow before backend, authentication, persistence and production security work.",
        details: [
          "No real patient information is processed",
          "No production backend, database, authentication, server persistence, Neon or Supabase implementation",
          "Not production healthcare software and not operationally deployed at a healthcare business",
          "No diagnosis, treatment recommendation or autonomous clinical AI capability",
          "No HIPAA, GDPR healthcare, medical certification, regulatory approval or other compliance claim",
        ],
      },
    ],
    architecture:
      "The implemented architecture is a React and TypeScript single-page frontend built with Vite and responsive CSS, hosted on Cloudflare Pages. Interactive workflow changes are held only in local React application state; there is no production backend, database, authentication layer or server persistence.",
    architectureDetails: [
      "Fictional sample data supports safe workflow demonstration without real healthcare records",
      "Local state powers patient, caregiver, task, alert and invoice interactions for validation",
      "The private source repository is not exposed as a public portfolio CTA",
    ],
    capabilities: [
      "Patient and caregiver workflow modelling",
      "Vital-sign history and entry",
      "Timestamped caregiver notes",
      "Care-task completion and reopening",
      "Operational alerts and follow-up flags",
      "KES invoice creation and status tracking",
      "Responsive mobile and desktop navigation",
      "Interactive local-state workflow validation",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Responsive CSS",
      "Local React State",
      "Git",
      "GitHub",
      "Cloudflare Pages",
    ],
    cardTechnologies: ["React", "TypeScript", "Vite", "Responsive UI", "Workflow Design"],
    role:
      "Benjamin led the work from business discovery and workflow modelling through product scoping, frontend implementation, deployment, responsive validation and claim-bounded project governance.",
    roleDetails: [
      "Business discovery, requirements analysis, workflow modelling and scope control",
      "Application architecture and React/TypeScript implementation",
      "Patient, caregiver task, operational alert and invoice workflow design",
      "Interactive local-state implementation and responsive UX engineering",
      "Cloudflare Pages deployment, responsive validation and project documentation",
    ],
    currentStatusHeading: "Current Status & Prototype Boundaries",
    currentStatus:
      "Client Validation Prototype. The responsive interactive frontend is deployed for workflow review using fictional sample data and local application state. It is not a production healthcare system and is not operating at the prospective client’s business.",
    currentStatusDetails: [
      "Working hosted prototype for iterative client validation",
      "Frontend-only implementation with no server persistence",
      "No real patient information, production backend, database or authentication",
      "No paying-client, production-use, healthcare-compliance or clinical capability claim",
    ],
    roadmap:
      "Any progression beyond client validation requires separately designed and verified production infrastructure, security, operational and compliance work.",
    roadmapDetails: [
      "Production backend and database",
      "Authentication and role-based access",
      "Secure persistence and production patient-data security",
      "Audit logging, backup/recovery and production monitoring",
      "Regulatory/compliance review and production deployment controls",
    ],
    callToAction:
      "Need to turn an operational process into a testable workflow before committing to production infrastructure? Let’s map and validate the work first.",
    liveDemoStatus: "https://richard-home-health-demo.pages.dev",
    repositoryStatus: "Private Repository",
    claimsNotToMake: [
      "No claim of a paying production client or operational healthcare deployment",
      "No claim that real patient information is processed or persisted",
      "No production backend, database, authentication, Neon or Supabase claim",
      "No production healthcare readiness, diagnosis, treatment recommendation or autonomous clinical AI claim",
      "No HIPAA, GDPR healthcare, medical certification, regulatory approval or compliance-certification claim",
    ],
    links: [
      {
        url: "https://richard-home-health-demo.pages.dev",
        label: "View Live Demo",
        kind: "preview",
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: "flow-sync",
    title: "FlowSync — Competitor & Workflow Intelligence",
    category: "Competitor Intelligence Control Plane",
    status: "Existing platform foundation",
    statusVariant: "emerald",
    shortDescription:
      "A hosted operator and control-plane frontend for competitor monitoring, workflow visibility and analytics, with execution and scraping owned by an external Engine.",
    overview:
      "FlowSync is a Next.js operator and control-plane frontend for Competitor Price Intelligence, with Clerk authentication UI, Supabase-backed competitor records, dashboard views and an API-first boundary to a separately hosted execution and data plane. Its source repository is private and proprietary.",
    problem:
      "Workflow products need reusable interface, authentication, analytics and integration patterns without coupling otherwise separate product domains.",
    solution:
      "Built Next.js, React, TypeScript and Tailwind CSS foundations covering Clerk sign-in and sign-up UI, Supabase-backed competitor records and CSV imports, dashboard and monitoring views, and typed API clients for external workflow and telemetry services.",
    architecture:
      "FlowSync does not own scraping or execution; those responsibilities remain in the external Competitor Price Intelligence Engine. Live Engine integration is not fully verified. FlowSync is also separate from IDP’s internal apps/flowsync-document-intelligence frontend: the products do not share domain state, routes, backend contracts or security assumptions.",
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
      "The hosted FlowSync dashboard remains a public technical preview for Competitor Price Intelligence and workflow monitoring. Some live data fetching still needs correction, and end-to-end Engine integration is not fully verified, so it is not production-ready or fully data-integrated. Source is private and proprietary.",
    repositoryStatus: "Private Repository",
    links: [
      {
        url: "https://flow-sync-beta.vercel.app/dashboard",
        label: "View FlowSync Dashboard",
        kind: "preview",
        primary: true,
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
    featured: false,
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
    slug: "spice-harvest-ops",
    title: "Spice Harvest Ops",
    category: "Mobile-First Business Operations",
    status: "Production Deployed",
    statusVariant: "lime",
    shortDescription:
      "A production-deployed mobile-first business operations system built for a real small-business workflow, covering owner authentication, order management, payment and fulfilment tracking, secure API architecture, PostgreSQL data modelling and cloud deployment.",
    cardDescription:
      "Production-deployed mobile-first operations system for a real small business, built around an existing WhatsApp Business workflow to manage orders, payments, fulfilment and daily sales through a secure Neon/PostgreSQL backend.",
    featuredDescription:
      "Production-deployed mobile-first operations system for a real small business, combining order, payment and fulfilment tracking with a secure Neon/PostgreSQL backend.",
    positioning:
      "Production-deployed for a real small-business workflow and available for owner use.",
    valueProposition:
      "WhatsApp Business remains the customer-facing ordering channel; Spice Harvest Ops is the private business-management layer for owner authentication, orders, payments, fulfilment and sales history.",
    overview:
      "Spice Harvest Ops is the production back-office operations system for The Spice Harvest Market and its owner, Mama Wangai. Customers continue to browse and place orders through WhatsApp Business, while the authenticated owner workspace manages the operational workflow after an order arrives.",
    problem:
      "Mama Wangai was mainly using WhatsApp chats and manual notes to track incoming orders, payment status, fulfilment, delivery progress, sales history and order notes. The missing capability was not another catalogue; it was a reliable private operations layer after an order arrived.",
    solution:
      "I built a secure mobile-first owner workspace that complements the established customer channel. It provides authenticated order management, catalogue-controlled totals, payment and fulfilment tracking, historical records, dashboard views and combined date/status filters.",
    solutionDetails: [
      "WhatsApp Business = customer-facing ordering channel",
      "Spice Harvest Ops = private business-management layer",
      "The system does not replace WhatsApp Business or duplicate its catalogue, cart, estimated-total and place-order workflow",
    ],
    caseStudySections: [
      {
        title: "Why I Did Not Replace WhatsApp Business",
        description:
          "The original concept was a separate customer-facing catalogue. Reviewing the existing workflow showed that WhatsApp Business already handled the catalogue, customer browsing, quantities/cart, estimated totals and place-order flow, so that idea was rejected as duplicate functionality.",
        details: [
          "Preserved the channel customers and the business already used",
          "Focused scope on incoming orders, payment, fulfilment, delivery progress and history",
          "Applied requirements discovery, product pivoting and scope control",
        ],
      },
      {
        title: "Production Workflow",
        description:
          "Customers order through WhatsApp Business. Mama Wangai records each incoming order in Spice Harvest Ops, tracks payment and fulfilment through Paid and Delivered states, and reviews current or historical activity.",
        details: [
          "Secure owner login, password recovery, session persistence/restoration, protected routes and logout",
          "Dashboard with live order/sales information, recent orders, activity metrics and a seven-day sales view",
          "Order creation with customer details, delivery location, product selection, quantity controls and automatic totals",
          "Payment and order status updates, including Paid and Delivered workflows",
          "Today, Yesterday, This Week, This Month and All filters combined with status filters",
        ],
      },
      {
        title: "Product & Order Data Integrity",
        description:
          "The active catalogue contains 25 real Spice Harvest products with current prices, 100g pack sizes, categories and active status. Orders use catalogue-controlled data and preserve historical sale facts when the catalogue changes.",
        details: [
          "Historical product-name, pack-size and price snapshots",
          "Quantity and line-total validation",
          "Transactional order creation with generated order numbers",
          "PostgreSQL functions, triggers, constraints, indexes and order-number sequence",
        ],
      },
      {
        title: "Production Architecture",
        description:
          "React 19/Vite browser → Neon Auth → authenticated Cloudflare Pages Functions API → Neon PostgreSQL. A provider-neutral frontend API adapter calls authenticated endpoints, while a centralized server-side repository owns database access.",
        details: [
          "React 19, TypeScript, Vite, Tailwind CSS and Lucide frontend",
          "Cloudflare Pages Functions API boundary with no direct browser database access",
          "Neon PostgreSQL schema with transactional functions and integrity controls",
          "Cloudflare Pages production hosting",
        ],
      },
      {
        title: "Authentication & Security",
        description:
          "Neon Auth provides email/password owner access, session persistence/restoration, logout and password recovery. Cloudflare Pages Functions verify JWTs against JWKS and enforce the immutable owner identity before business data is accessed.",
        details: [
          "DATABASE_URL and immutable owner identity remain server-side only",
          "No database credentials or owner identifier in the browser bundle",
          "Unauthenticated requests return 401; authenticated non-owner requests return 403",
          "No public signup UI, direct browser database access or runtime Supabase dependency",
        ],
      },
      {
        title: "Supabase → Neon Migration",
        description:
          "The original Supabase PostgreSQL, Supabase Auth and browser Data API/RPC runtime was fully migrated to Neon PostgreSQL, Neon Auth and a trusted Cloudflare Pages Functions API boundary.",
        details: [
          "Recreated the schema and migrated products, orders and order items",
          "Preserved the order-number sequence and replaced authentication while retaining the existing owner password",
          "Cut the frontend over to the provider-neutral API after staging validation",
          "Removed Supabase from production runtime while preserving it as a rollback snapshot/backup",
        ],
      },
      {
        title: "Production Cutover & Data Preservation",
        description:
          "Pre-cutover migration preserved 25 products, 5 orders and 9 order items. Production acceptance then created one additional test order successfully, bringing verification totals to 25 products, 6 orders and 10 order items.",
        details: [
          "Verified production order number SH-1058 and next sequence value SH-1059",
          "Historical snapshots, totals and sequence continuity were preserved",
          "Counts are engineering acceptance evidence, not adoption or traction metrics",
          "The production test order is not presented as customer revenue",
        ],
      },
      {
        title: "Mobile UX",
        description:
          "The primary validated target is 375 × 812, approximately an iPhone 13 mini-sized viewport, with larger mobile, tablet and desktop layouts also checked.",
        details: [
          "Touch-friendly quantity controls refined through real-device testing",
          "Desktop sidebar, mobile navigation and responsive forms/cards",
          "Safe long-text handling and responsive sales chart",
          "No page-level horizontal overflow",
        ],
      },
      {
        title: "Production Validation",
        description:
          "Final acceptance verified owner login with the existing password, session restoration, dashboard and catalogue data, migrated records, order creation, Paid and Delivered updates, refresh persistence, combined filters, logout and subsequent login.",
        details: [
          "375 × 812 responsive acceptance passed",
          "API authorization returned 401 unauthenticated, 403 for authenticated non-owner access and success for owner access",
          "Application lint, build, Cloudflare Functions checks/compilation and frontend secret scan passed",
          "The application repository working tree was clean at final acceptance",
        ],
      },
      {
        title: "Current Scope / Claim Boundaries",
        description:
          "This is a production-deployed, client-ready implementation for one real small-business workflow. Deployment and acceptance evidence do not establish scale, long-term impact or broad commercial traction.",
        details: [
          "No revenue-growth, efficiency-percentage, adoption-scale or customer-revenue claim",
          "No M-Pesa, WhatsApp API, inventory, multi-tenancy or customer-portal claim",
          "No advanced analytics, production-scale SaaS or multiple-client claim",
          "Supabase is a preserved rollback snapshot/backup, not the active runtime",
        ],
      },
    ],
    capabilities: [
      "Owner authentication and protected operations workspace",
      "Transactional catalogue-controlled order creation",
      "Payment, fulfilment and historical order tracking",
      "Combined date and status filtering",
      "Live dashboard and seven-day sales view",
      "Secure Cloudflare Functions API and Neon PostgreSQL backend",
    ],
    technologies: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Lucide",
      "Neon PostgreSQL",
      "Neon Auth",
      "PostgreSQL",
      "Cloudflare Pages Functions",
      "JWT/JWKS authorization",
      "Cloudflare Pages",
      "Git",
      "GitHub",
    ],
    cardTechnologies: ["React 19", "TypeScript", "Neon", "PostgreSQL", "Pages Functions", "Cloudflare Pages"],
    role:
      "I led the project from workflow discovery and product pivot through secure architecture, migration, production cutover, deployment and client implementation.",
    roleDetails: [
      "Requirements discovery, workflow analysis, product pivoting, scope control and mobile-first UX",
      "React/TypeScript frontend engineering, API design and Cloudflare Pages Functions",
      "PostgreSQL modelling, functions, triggers, constraints, indexes and transactional workflows",
      "Neon Auth architecture, JWT authorization and secure server-side secret handling",
      "Supabase → Neon data migration, sequence preservation, rollback planning and production cutover",
      "Real-device testing, deployment and client implementation",
    ],
    currentStatusHeading: "Current Status",
    currentStatus:
      "Production Deployed. Production-deployed for a real small-business workflow and available for owner use.",
    currentStatusDetails: [
      "Neon Auth and Neon PostgreSQL are the active production services",
      "Authenticated Cloudflare Pages Functions form the API boundary",
      "Supabase → Neon migration and production cutover complete",
      "Client-ready implementation without unsupported scale or impact claims",
    ],
    callToAction:
      "Need a focused operations system that complements the tools your business already uses? Let’s discuss the workflow before deciding what software to build.",
    liveDemoStatus: "https://spice-harvest-ops.pages.dev",
    repositoryStatus: "Private Repository",
    links: [
      {
        url: "https://spice-harvest-ops.pages.dev",
        label: "Live Demo",
        kind: "preview",
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: "essiedo-catalogue-pilot",
    title: "Essiedo Catalogue Pilot",
    category: "SME Social-Commerce Pilot",
    status: "Live Pilot",
    statusVariant: "lime",
    shortDescription:
      "Live SME commerce pilot connecting social-media product discovery with structured catalogue browsing and product-specific WhatsApp enquiries.",
    positioning:
      "A client pilot exploring whether a structured web catalogue can improve the handoff between Instagram/WhatsApp product discovery and product-specific WhatsApp enquiries without replacing the seller's existing social-selling workflow.",
    overview:
      "Essiedo already sells through WhatsApp and Instagram. Social posting remains useful for product discovery and marketing, while the live catalogue adds a structured browsing layer where customers can filter available pieces, identify an exact product and carry that selection into a product-specific WhatsApp enquiry.",
    problem:
      "Social feeds and chat remain central to Essiedo’s selling workflow, but they do not provide the same structured way to browse available pieces and refer to one exact product during an enquiry. The pilot tests whether a lightweight catalogue improves that handoff without replacing the channels the seller already uses.",
    solution:
      "The pilot provides a focused catalogue experience that complements Instagram and WhatsApp. Customers browse and filter available pieces, choose a specific product and continue the enquiry through WhatsApp with the selected item identified.",
    solutionDetails: [
      "Instagram and WhatsApp remain the seller’s discovery, marketing and conversation channels",
      "The catalogue supplies structured product browsing rather than a replacement sales channel",
      "The selected product is retained in the handoff to a WhatsApp enquiry",
    ],
    caseStudySections: [
      {
        title: "Product Decision / Working With Social Selling",
        description:
          "The goal was not to build a conventional clothing ecommerce website. The pilot explores whether a structured catalogue can add useful product context between social discovery and a WhatsApp conversation while preserving Essiedo’s established selling workflow.",
        details: [
          "Social posting continues to support discovery and marketing",
          "Customers can filter available pieces and identify an exact product",
          "The selected product is carried into the product-specific WhatsApp enquiry",
          "Pilot evidence will inform whether a deeper seller-management V2 is justified",
        ],
      },
      {
        title: "Observed Pilot Activity",
        description:
          "Observed activity is reported separately from business outcomes. The pilot has generated workflow feedback, but it has not established sales, conversion, revenue or adoption results.",
        details: [
          "Essiedo has opened and reviewed the live catalogue",
          "The seller has started sharing the catalogue link through existing social channels",
          "Seller questions and feedback surfaced possible V2 requirements",
          "A separate user suggestion surfaced possible size-guidance functionality",
        ],
      },
      {
        title: "Potential V2 / Not Yet Implemented",
        description:
          "Possible next-stage features are discovery inputs only and are not part of the current pilot.",
        details: [
          "Seller-managed product uploads",
          "Marking one-off items sold",
          "New-arrival publishing",
          "Offer pricing",
          "Size guidance or a size chart",
        ],
      },
      {
        title: "Pilot Boundaries",
        description:
          "The catalogue is in live validation. Current evidence does not establish commercial success or justify claims about customer adoption volume or business impact.",
        details: [
          "No sales increase, conversion improvement or revenue claim",
          "No workload or productivity improvement claim",
          "No claim that the catalogue replaces WhatsApp or Instagram",
          "No V2 seller-management or size-guidance capability is described as implemented",
        ],
      },
    ],
    capabilities: [
      "Structured product catalogue browsing",
      "Available-piece filtering",
      "Exact product identification",
      "Product-specific WhatsApp enquiry handoff",
      "Responsive live pilot experience",
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Cloudflare Pages"],
    cardTechnologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Cloudflare Pages"],
    currentStatusHeading: "Current Status",
    currentStatus:
      "Live Pilot / Validation Stage. Essiedo has reviewed the catalogue and begun sharing its link through existing social channels. Feedback is informing possible V2 scope, but no measured commercial outcome is claimed.",
    currentStatusDetails: [
      "Live catalogue deployed",
      "Seller review observed",
      "Initial social-channel sharing observed",
      "V2 ideas remain unimplemented",
    ],
    callToAction:
      "Exploring a lightweight digital layer around an existing sales workflow? Let’s discuss what should be validated before building a deeper platform.",
    liveDemoStatus: "https://essiedo-catalogue-pilot.pages.dev",
    links: [
      {
        url: "https://essiedo-catalogue-pilot.pages.dev",
        label: "Live Pilot",
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
      "A Playwright-first Python execution and data plane for deterministic Jumia Electronics extraction, normalization, product matching, price comparison and local runtime history.",
    overview:
      "A private, proprietary execution and data plane for competitor-price monitoring. Its verified current foundation is a focused Jumia Electronics MVP that extracts public listings, normalizes product and price observations, stabilizes product matching and comparisons, and records local runtime state for later operational use.",
    problem:
      "Product information from different websites and sources varies in structure and naming, making reliable comparison and price-change tracking difficult without validation, normalization and matching.",
    solution:
      "Built separated extraction, transformation and comparison concerns with Playwright-first collection, canonical previous_price/current_price handling, compatibility support for older price fields, deterministic matching, stage-count telemetry and local runtime-state boundaries.",
    architecture:
      "The Engine owns extraction and processing. Playwright is the primary browser path for the focused Jumia MVP; matching and comparison operate on normalized observations, while price history, scheduler state and the canonical registry remain ignored local runtime files initialized from tracked defaults where applicable. FlowSync is a separate control-plane frontend, and live end-to-end integration is not fully verified.",
    capabilities: [
      "Playwright-first Jumia Electronics extraction",
      "Separated extraction, transformation and loading concerns",
      "Product-data cleaning, normalization and validation",
      "Stabilized comparison and product matching",
      "Canonical previous_price/current_price contract with compatibility support",
      "Stage-count telemetry and execution logging",
      "Optional canonical product-specification handling",
      "Scheduler bootstrap from tracked defaults",
      "Local-only price history, scheduler state and canonical registry",
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
      "The focused Engine foundation is validated by a deterministic MVP suite with 29 passed and 1 skipped. Comparison matching, stage telemetry, optional product specifications and runtime-state hygiene are implemented. Source is private and proprietary. The Engine is not production-ready; multi-source production operation, Kafka/Airflow and fully verified FlowSync integration remain unimplemented or unverified.",
    roadmap:
      "Future work may improve the Engine and its governed FlowSync integration without merging competitor-price business logic, APIs, entities or workflows into Document Intelligence.",
    repositoryStatus: "Private Repository",
    featured: false,
  },
] satisfies Project[]).sort(
  (a, b) =>
    (projectDisplayOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
    (projectDisplayOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
);