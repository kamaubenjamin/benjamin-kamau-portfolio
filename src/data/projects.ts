export interface Project {
  slug: string;
  title: string;
  category: string;
  status: "completed" | "ongoing" | "maintenance";
  shortDescription: string;
  overview: string;
  problem?: string;
  responsibilities?: string;
  architecture?: string;
  solution?: string;
  capabilities?: string[];
  technologies: string[];
  challenges?: string;
  currentStatus?: string;
  roadmap?: string;
  lessonsLearned?: string;
  image?: string;
  featured: boolean;
  repositoryUrl?: string;
  liveDemoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "intelligent-document-processing-platform",
    title: "Intelligent Document Processing Platform",
    category: "Document Processing & Automation",
    status: "ongoing",
    shortDescription:
      "Document processing platform that extracts, classifies and validates structured data from semi-structured documents using Python, regex patterns and validation rules.",
    overview:
      "An intelligent document processing platform designed to extract, classify and validate structured data from semi-structured business documents. The platform uses Python-based extraction pipelines, regex pattern matching, and multi-stage validation rules to process invoices, purchase orders, delivery notes and similar documents with high accuracy.",
    problem:
      "Manual data extraction from diverse, unstructured files (PDF, CSV, XLSX, email and TXT) is prone to errors and creates major processing bottlenecks in standard financial operations.",
    solution:
      "Implemented a processing platform that ingests raw documents, applies canonical normalization, runs structural parsing across blocks, sections and tables, and executes custom DAG orchestration workflows to filter, fuzzy-match, compare, validate and report anomalies.",
    architecture:
      "Built with an audit-oriented architecture ensuring every extraction step is traceable. Currently uses Streamlit for an operator-facing console to track extraction parameters, error workflows and manual reviews.",
    capabilities: [
      "PDF, CSV, XLSX, email and TXT ingestion",
      "Canonical normalization & structural validation",
      "Block, section and table parsing",
      "Quality scoring and DAG orchestration",
      "Fuzzy-matching, comparison, alerts and reports",
    ],
    technologies: ["Python", "Regex", "Pandas", "Streamlit", "SQLite", "Data Validation"],
    currentStatus:
      "Current development focus is on expanding the entity runtime, financial field extraction, document-reference matching, confidence scoring, and designing a future FlowSync-based production interface.",
    featured: true,
  },
  {
    slug: "exploreafrica-travel-platform",
    title: "ExploreAfrica Travel Platform",
    category: "Web Platform & Booking",
    status: "ongoing",
    shortDescription:
      "A modern travel platform being built with Next.js, TypeScript and Tailwind CSS to showcase African destinations and facilitate travel inquiries.",
    overview:
      "A modern travel platform built with Next.js, TypeScript and Tailwind CSS. The platform showcases African destinations, travel packages and provides an intuitive interface for users to explore and make travel inquiries.",
    problem:
      "Establishing a robust, secure and highly multi-tenant infrastructure is critical before developing customer-facing booking and dynamic transaction logic.",
    solution:
      "Engineered the platform foundation focusing on high-density architecture decision records, data models, identity provisioning flows, role-based authorization structures and clean PostgreSQL schema models.",
    architecture:
      "Powered by Next.js and TypeScript on the frontend, using Tailwind CSS for a fully responsive visual layout. It integrates with a backend architectural model designed on Supabase and PostgreSQL, with row-level security (RLS) policies and unified tenant isolation schemas.",
    capabilities: [
      "Next.js, TypeScript and Tailwind CSS frontend",
      "Supabase and PostgreSQL architectural schema",
      "Multi-tenant data modeling and ERD planning",
      "Row-level security (RLS) and authorization models",
      "Identity provisioning flow designs",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    currentStatus: "Architecture and platform foundation in development.",
    roadmap:
      "Future milestones include implementing booking transactions, dynamic package-management tools, and payment system integrations.",
    featured: true,
  },
  {
    slug: "competitor-price-intelligence-platform",
    title: "Competitor Price Intelligence Platform",
    category: "Data Collection & Intelligence",
    status: "ongoing",
    shortDescription:
      "A data collection and analysis platform that tracks competitor pricing using Playwright for web scraping and Python for data transformation.",
    overview:
      "A data collection and analysis platform that tracks competitor pricing and market positioning. Uses Playwright for reliable web scraping, Python for data transformation and cleaning, and structured storage for trend analysis.",
    problem:
      "Manual competitor pricing analysis is slow, irregular, and prone to formatting discrepancies when retrieving catalog details from dynamic websites.",
    solution:
      "Built automated data extraction routines to fetch raw product data, normalise catalog attributes, apply fuzzy matching for equivalent items, detect price fluctuations, and route immediate change notifications.",
    architecture:
      "The system runs Python-based extraction scripts that store results in structured SQLite files. A Streamlit operator dashboard tracks pricing history, matching metrics and run logs.",
    capabilities: [
      "Website and source data extraction",
      "Product-data normalization & catalog cleaning",
      "Fuzzy matching for non-identical products",
      "Price-history tracking & change detection",
      "Streamlit dashboard with execution metrics & logging",
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
    featured: true,
  },
  {
    slug: "flow-sync",
    title: "FlowSync",
    category: "Workflow Automation & Business Systems",
    status: "ongoing",
    shortDescription:
      "An evolving workflow-facing interface and platform foundation built with Next.js, React, TypeScript and Supabase, designed for operations orchestration.",
    overview:
      "FlowSync is a workflow automation and business systems brand focused on helping organisations streamline their operations. It encompasses a growing set of tools and methodologies for data pipeline orchestration, process automation, system integration and operational reporting.",
    problem:
      "Internal tooling and data collection scripts often lack a unified, security-compliant user interface, requiring developers and operators to interact via CLI or raw databases.",
    solution:
      "Created an evolving workflow-facing interface and platform foundation supporting user authentication, role assignments and structural layouts for administrative operations.",
    architecture:
      "The platform foundation is engineered on Next.js, React, TypeScript and Tailwind CSS, integrating Supabase for authorization rules and identity management.",
    capabilities: [
      "Evolving workflow-facing interface layouts",
      "Next.js, React, TypeScript, and Supabase integration",
      "Authentication and role-based interface boundaries",
      "Administrative workflow foundation design",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Git"],
    currentStatus:
      "FlowSync acts as a platform foundation. Note that its existing Competitor Price Intelligence integration remains completely separate, and it is not currently integrated with the Document Intelligence Platform. Streamlit remains the designated operators' console for Document Intelligence, while a separate FlowSync-based Document interface may be developed in a future phase.",
    featured: true,
  },
  {
    slug: "pair-and-place-website-operations",
    title: "Pair and Place Website Operations",
    category: "Web Operations & Support",
    status: "maintenance",
    shortDescription:
      "WordPress maintenance and operational review for an accommodation and travel platform, ensuring reliability, configuration checks, and usability testing.",
    overview:
      "Website operations and technical support for Pair and Place, an accommodation and travel booking website. Engagements focused on routine system maintenance, configuration audits, security compliance reviews, and booking-form usability testing.",
    solution:
      "Established a baseline WordPress maintenance routine, implemented comprehensive site backup routines, completed configuration and plugin audits, and resolved server timezone offsets to ensure consistent booking timestamps.",
    capabilities: [
      "WordPress maintenance baseline and full backup implementation",
      "Configuration audits and timezone corrections",
      "Booking-form testing and email notification configuration",
      "Reliability, security and analytics preparation reviews",
      "Identification of booking-form usability friction points",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Git", "Technical Support"],
    featured: false,
  },
  {
    slug: "etl-banking-pipeline",
    title: "ETL Banking Pipeline",
    category: "Data Engineering",
    status: "completed",
    shortDescription:
      "An earlier portfolio project that extracts, transforms and normalises financial data to demonstrate pipeline and reporting concepts.",
    overview:
      "An early data engineering portfolio project focused on extraction, transformation, normalization, and matching concepts. The pipeline processes raw simulated transaction files, standardises attributes, and aggregates metrics for reporting concepts.",
    solution:
      "Constructed a lightweight pipeline that takes transaction files, cleans null attributes, runs simple schema validation rules, matches corresponding ledger references, and structures transaction statistics.",
    architecture:
      "Built as a lightweight Python utility using SQL and Pandas to demonstrate data standardisation. The pipeline ideas and matching workflows directly contributed to the architectural evolution of the Competitor Price Intelligence project.",
    capabilities: [
      "Raw transaction file ingestion & validation patterns",
      "Data transformation, cleaning & normalization",
      "Basic ledger matching logic & reporting concepts",
      "Data engineering pipeline architecture exercises",
    ],
    technologies: ["Python", "SQL", "Pandas", "ETL", "Data Validation", "PostgreSQL"],
    featured: false,
  },
];
