export type ProjectStatus =
  | "Active development"
  | "Functional platform foundation"
  | "Maintenance phase completed"
  | "Completed foundation"
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
  image?: string;
  featured: boolean;
  links?: ProjectLink[];
}

export const projects: Project[] = [
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
      "An evolving Next.js workflow-facing platform and user-interface foundation, currently preserving its existing Competitor Price Intelligence implementation while providing design and architecture patterns for future workflow products.",
    overview:
      "FlowSync is an evolving Next.js workflow-facing platform and user-interface foundation with authentication, competitor-management, dashboard and API-first integration foundations.",
    problem:
      "Workflow products need reusable interface, authentication, analytics and integration patterns without coupling otherwise separate product domains.",
    solution:
      "Built Next.js, React, TypeScript, Tailwind CSS and Supabase foundations covering authentication, competitor management interfaces, realtime analytics and dashboard work, API-first integrations and telemetry-monitoring integration.",
    architecture:
      "Shared design patterns may be reused, but business logic, APIs, entities, workflows and integrations remain separate between products. The existing FlowSync implementation remains linked to Competitor Price Intelligence and is being preserved untouched.",
    capabilities: [
      "Next.js, React, TypeScript and Tailwind CSS interface foundation",
      "Supabase and authentication foundations",
      "Competitor management interface foundations",
      "Realtime analytics and dashboard work",
      "API-first integration foundations",
      "Telemetry-monitoring integration",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    currentStatus:
      "The original hosted FlowSync dashboard is a functional, publicly accessible technical preview associated with Competitor Price Intelligence and workflow monitoring. Some live data fetching still needs correction, so it is not production-ready or fully data-integrated and will be stabilized in a later milestone. It remains separate from the newer Document Intelligence FlowSync UAT interface.",
    links: [
      {
        url: "https://flow-sync-beta.vercel.app/dashboard",
        label: "View FlowSync Dashboard",
        kind: "preview",
        primary: true,
      },
    ],
    featured: true,
  },
  {
    slug: "pair-and-place-website-operations",
    title: "Pair and Place Website Operations",
    category: "Web Operations & Support",
    status: "Maintenance phase completed",
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
    featured: true,
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
    slug: "competitor-price-intelligence-platform",
    title: "Competitor Price Intelligence Platform",
    category: "Data Collection & Intelligence",
    status: "Paused - separate product",
    statusVariant: "default",
    shortDescription:
      "A developed Python ETL and monitoring foundation for collecting, normalizing, matching and tracking competitor product pricing across multiple sources.",
    overview:
      "A separate developed product foundation for extracting product data from websites and other sources, cleaning and normalizing it, matching comparable products and monitoring price changes over time.",
    problem:
      "Product information from different websites and sources varies in structure and naming, making reliable comparison and price-change tracking difficult without validation, normalization and matching.",
    solution:
      "Developed separated extraction, transformation and loading concerns with source extraction, product-data cleaning and normalization, validation, fuzzy matching, price-history tracking, change detection, alerts, execution metrics and execution logging.",
    architecture:
      "Python extraction and processing uses SQLite-backed storage, Playwright extraction, Selenium support and reusable ETL lifecycle concepts, with Streamlit dashboard and monitoring foundations. Its existing FlowSync integration remains untouched and separate from Document Intelligence.",
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
      "The platform remains a separate developed product foundation and is currently paused while the Intelligent Document Processing Platform is the primary development focus. The shared repository records the earlier ETL foundation’s evolution into this specialized competitor-price-monitoring product; no hosted Streamlit deployment is verified. Its existing FlowSync integration is being preserved for future product work.",
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
  {
    slug: "etl-banking-pipeline",
    title: "ETL Pipeline Foundation",
    category: "Data Engineering",
    status: "Completed foundation",
    statusVariant: "emerald",
    shortDescription:
      "A reusable Python ETL foundation for extracting, cleaning, validating, matching, storing and reporting structured data from files and web sources.",
    overview:
      "This completed data-engineering project provides a reusable foundation for turning varied source data into validated, comparable and reportable records. Its end-to-end ETL workflow uses Python, Pandas, SQL, SQLite, RapidFuzz and Streamlit while separating extraction, transformation, validation, matching, loading, logging and reporting into reusable stages. The architecture later evolved into the Competitor Price Intelligence product, where the same patterns were applied to retailer data, fuzzy product matching, price comparisons and monitoring.",
    solution:
      "Developed a portfolio pipeline to explore extraction, transformation, normalization, data matching and reporting concepts.",
    architecture:
      "The project served as an earlier foundation whose pipeline and matching ideas contributed to the later development of the Competitor Price Intelligence project.",
    capabilities: [
      "Configurable source ingestion",
      "Pandas-based cleaning and normalization",
      "Rule-based validation",
      "Exact and fuzzy matching",
      "SQL and SQLite loading",
      "Execution logging and run metadata",
      "Structured exports and reporting",
      "Streamlit dashboard foundations",
    ],
    technologies: ["Python", "Pandas", "SQL", "SQLite", "RapidFuzz", "Streamlit"],
    currentStatus:
      "Completed as a reusable ETL foundation. The verified repository later evolved toward the separate Competitor Price Intelligence product.",
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
];