export type ProjectStatus =
  | "Active development"
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

const projectDisplayOrder = new Map([
  ["intelligent-document-processing-platform", 0],
  ["exploreafrica-travel-platform", 1],
  ["flow-sync", 2],
  ["etl-banking-pipeline", 3],
  ["pair-and-place-website-operations", 4],
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
    slug: "gym-pro-management-system",
    title: "Gym Pro Management System",
    category: "Operations Dashboard & Business Platform",
    status: "Early prototype",
    statusVariant: "default",
    shortDescription:
      "A React and Supabase gym-operations prototype with authenticated admin and staff workflows, live dashboard metrics and a broad PostgreSQL schema for future management modules.",
    overview:
      "Gym Pro is an early gym-management prototype built as a React single-page application backed by Supabase. The implemented interface focuses on admin and staff workflows: authentication, role-filtered navigation, live dashboard aggregates, member records and read-only operational views for classes, trainers, attendance and payments. The repository also includes a 22-table PostgreSQL schema with row-level security, but several schema-backed modules remain partial or placeholder-only.",
    problem:
      "Gym and fitness-studio operations span member records, schedules, attendance, payments and other administrative data that are difficult to manage consistently across disconnected tools.",
    solution:
      "Built an authenticated operations-dashboard foundation with direct Supabase data access, role-filtered navigation, responsive application layout and initial management views across core gym domains.",
    architecture:
      "The Vite and React SPA communicates directly with Supabase Auth and PostgreSQL through the browser client. Row-level security is the primary data-authorization boundary. Navigation is currently state-based rather than URL-routed, and no separate server API or automated test suite is implemented.",
    capabilities: [
      "Supabase email and password authentication",
      "Role-filtered admin and staff navigation",
      "Live member, attendance and revenue aggregates",
      "Member listing, search, edit and delete workflows",
      "Read-only class, trainer, attendance and payment views",
      "Responsive sidebar and mobile drawer",
      "22-table PostgreSQL schema with row-level security",
      "Seeded membership-plan, class and payment-method data",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "RLS",
    ],
    currentStatus:
      "The project is an early prototype, not a production-ready system. Authentication and several dashboard views are functional, but member creation and class scheduling are blocked or incomplete; inventory, announcements and settings are placeholders; payments are read-only; member and trainer self-service workflows are not implemented; and there are no automated tests.",
    roadmap:
      "The documented priorities are to complete core operational workflows before broader platform claims or deployment readiness.",
    roadmapDetails: [
      "Secure member provisioning and complete member CRUD",
      "Class scheduling and trainer assignment",
      "Subscription and membership-plan management",
      "Announcements and inventory management",
      "Member self-service portal",
      "Automated tests, routing and error handling",
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
  {
    slug: "etl-banking-pipeline",
    title: "Data Automation & Intelligence Platform",
    category: "Data Engineering & Intelligence Foundations",
    status: "Completed foundation",
    statusVariant: "emerald",
    shortDescription:
      "A reusable Python ETL foundation for extracting, cleaning, validating and loading structured data from web, file and dataframe sources.",
    overview:
      "The default branch of the umbrella Data Automation and Intelligence repository provides a reusable ETL foundation for extracting web, file and dataframe inputs, applying configurable Pandas transformations and validation, and loading results to CSV and SQLite. Its checked-in example still uses archived largest-bank data, but it is a learning and engineering foundation rather than a banking platform or live financial integration. Separate branches later developed competitor-price, workflow-runtime and Document Intelligence tracks.",
    solution:
      "Built a reusable Python ETL pipeline that separates extraction, dataframe transformation, validation, storage, state and logging into maintainable processing stages.",
    architecture:
      "The project served as an earlier foundation whose pipeline and matching ideas contributed to the later development of the Competitor Price Intelligence project.",
    capabilities: [
      "Web, file, dataframe and connector extraction foundations",
      "Pandas-based cleaning and normalization",
      "Rule-based validation",
      "CSV and SQLite loading",
      "Pipeline state, logging and orchestration",
      "Basic extraction and orchestration tests",
      "Streamlit control-surface foundation",
    ],
    technologies: ["Python", "Pandas", "SQL", "SQLite", "Requests", "BeautifulSoup", "Pytest", "Streamlit"],
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
    featured: true,
  },
  {
    slug: "python-etl-learning-exercises",
    title: "Python ETL Learning Exercises",
    category: "Data Engineering Learning Projects",
    status: "Completed learning project",
    statusVariant: "default",
    shortDescription:
      "Four independent Python exercises covering archived web extraction, tabular transformations, CSV output, SQLite loading, logging and basic SQL queries.",
    overview:
      "This repository collects four independent learning exercises rather than one integrated banking system: largest-bank market-capitalization ETL, countries-by-GDP ETL, ranked-film extraction, and CSV-to-SQLite instructor queries. The scripts demonstrate early Python data-engineering fundamentals using static inputs and archived web pages.",
    solution:
      "Implemented small script-level workflows for HTML extraction, Pandas and NumPy transformations, CSV exports, SQLite table replacement, execution logging and basic database queries.",
    architecture:
      "Each script runs independently and performs file, network or database side effects immediately. There is no unified entry point, automated test suite, CI workflow, dependency lock or production integration boundary.",
    capabilities: [
      "Archived HTML table extraction",
      "Pandas and NumPy transformations",
      "Static currency conversion exercises",
      "CSV output and SQLite loading",
      "Basic SQL queries",
      "Timestamped ETL logging",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Requests", "BeautifulSoup", "SQLite", "SQL"],
    currentStatus:
      "Completed as educational exercises with reproducibility limitations. The repository does not connect to financial institutions, process transactions or implement production banking workflows, and two scripts retain machine-specific file paths that must be changed before use elsewhere.",
    links: [
      {
        url: "https://github.com/kamaubenjamin/EXTRACT-TRANSFORM-LOAD-PROJECT-BANKS",
        label: "View Repository",
        kind: "repository",
        primary: true,
      },
    ],
    featured: false,
  },
  {
    slug: "used-car-fuel-data-etl",
    title: "Used-Car Fuel Data ETL Practice",
    category: "Data Engineering Learning Project",
    status: "Completed learning project",
    statusVariant: "default",
    shortDescription:
      "A local Python ETL exercise that combines equivalent used-car records from CSV, JSON and XML, transforms price and fuel fields, and produces summary datasets and a chart.",
    overview:
      "This private learning repository demonstrates local multi-format extraction and transformation using equivalent sample used-car records stored as CSV, JSON and XML. The implemented script normalizes fuel names, converts numeric fields, applies a fixed practice exchange rate, calculates average prices by fuel type, exports combined and filtered datasets, creates a bar chart and appends progress logs.",
    solution:
      "Built a compact file-based ETL workflow that reads three structured formats, combines records with Pandas, derives normalized and aggregate values, exports CSV results and generates a Matplotlib visualization.",
    architecture:
      "A single Python script discovers inputs and writes outputs relative to its working directory. It has no automated tests, dependency manifest, packaging, CLI configuration or deployment setup, and broad CSV discovery can re-ingest generated outputs on later runs.",
    capabilities: [
      "CSV, JSON and XML extraction",
      "Fuel-name and numeric normalization",
      "Practice currency conversion",
      "Grouped average-price calculations",
      "Combined and fuel-specific CSV exports",
      "Matplotlib summary chart",
      "Timestamped progress logging",
    ],
    technologies: ["Python", "Pandas", "XML", "Matplotlib"],
    currentStatus:
      "Completed as a local learning project rather than a production pipeline. The repository is private, its fixed exchange rate is only a practice assumption, and its input-discovery behavior can duplicate generated records across reruns.",
    featured: false,
  },
  {
    slug: "movie-web-scraping-learning-project",
    title: "Movie Web-Scraping Learning Project",
    category: "Data Collection Learning Project",
    status: "Incomplete learning exercise",
    statusVariant: "default",
    shortDescription:
      "A small Python exercise that extracts ranked-film rows from an archived page and loads tabular snapshots into CSV and SQLite.",
    overview:
      "This early data-engineering exercise requests an archived ranked-films page, parses its first table with Beautiful Soup, builds a Pandas DataFrame and writes results to CSV and a local SQLite table. The repository also transparently retains unrelated historical GDP artifacts from a separate exercise.",
    solution:
      "Implemented a straightforward archived-page extraction and local loading example using Requests, Beautiful Soup, Pandas and SQLite.",
    architecture:
      "The single script performs network, CSV and database operations when run or imported. Parsing depends on fixed table positions, and the configured CSV path must be changed from the original machine-specific Windows path before use on another computer.",
    capabilities: [
      "Archived webpage requests",
      "HTML table parsing",
      "Pandas DataFrame creation",
      "CSV snapshot output",
      "SQLite table replacement",
    ],
    technologies: ["Python", "Requests", "BeautifulSoup", "Pandas", "SQLite"],
    currentStatus:
      "Incomplete as a reproducible learning exercise: historical output snapshots exist, but there are no automated tests, CI, dependency lock, command-line configuration, response validation, retry handling or portable end-to-end run settings.",
    links: [
      {
        url: "https://github.com/kamaubenjamin/WEBSCRAPPING",
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