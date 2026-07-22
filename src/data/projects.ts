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
      "Document processing platform for deterministic ingestion, normalization, structural parsing, validation, quality scoring and configurable workflows.",
    overview:
      "An intelligent document processing platform designed around deterministic ingestion, canonical normalization, structural parsing, structural validation, quality scoring and workflow execution.",
    problem:
      "Documents and source files arrive in different formats and structures, creating a need for consistent ingestion, normalization, parsing and validation before downstream workflows can use them.",
    solution:
      "Built a processing foundation that ingests PDF, CSV, XLSX, email and TXT sources, applies canonical normalization, parses blocks, sections and tables, and runs workflow definitions through a DAG-based runtime.",
    architecture:
      "The platform uses an audit-oriented architecture with structural validation, quality scoring and workflow operations for transform, filter, fuzzy-match, compare, alert and report steps.",
    capabilities: [
      "PDF, CSV, XLSX, email and TXT ingestion",
      "Canonical normalization and structural validation",
      "Block, section and table parsing",
      "Quality scoring, workflow definitions and workflow runtime",
      "DAG orchestration with transform, filter, fuzzy-match, compare, alert and report operations",
    ],
    technologies: ["Python", "Streamlit"],
    currentStatus:
      "Entity-runtime work is ongoing, with current direction covering entity extraction, financial extraction, document-reference extraction and confidence scoring. Streamlit is intended as the operator console, with a separate FlowSync-based production interface possible later.",
    featured: true,
  },
  {
    slug: "exploreafrica-travel-platform",
    title: "ExploreAfrica Travel Platform",
    category: "Travel Platform Architecture",
    status: "ongoing",
    shortDescription:
      "A travel-platform architecture and interface foundation built with React, TypeScript, Tailwind CSS, PostgreSQL and Supabase.",
    overview:
      "A travel-platform foundation in development, covering a React and TypeScript interface, platform data architecture, identity foundations and authorization planning for a future booking platform.",
    problem:
      "A future booking platform requires clear data, identity, tenant, role, authorization and audit foundations before transactional features are developed.",
    solution:
      "Developed the platform ERD, PostgreSQL schema, Supabase architecture, authorization model, identity provisioning flow, tenant and role foundations, row-level security planning and architecture decision records.",
    architecture:
      "The architecture combines a React, TypeScript and Tailwind CSS interface foundation with PostgreSQL and Supabase planning, including row-level security and audit architecture.",
    capabilities: [
      "React, TypeScript and Tailwind CSS interface foundation",
      "Platform ERD and PostgreSQL schema",
      "Supabase architecture and authorization model",
      "Identity provisioning, tenant and role foundations",
      "Row-level security planning, audit architecture and architecture decision records",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    currentStatus: "Architecture and platform foundation in development.",
    roadmap:
      "The longer-term direction is a booking platform; booking functionality is not presented as complete.",
    featured: true,
  },
  {
    slug: "competitor-price-intelligence-platform",
    title: "Competitor Price Intelligence Platform",
    category: "Data Collection & Intelligence",
    status: "ongoing",
    shortDescription:
      "A Python-based platform for source extraction, product-data normalization, fuzzy matching, price-history tracking, change detection and alerts.",
    overview:
      "A competitor price intelligence platform that extracts product data from websites and other sources, normalizes it, matches comparable products and tracks price changes over time.",
    problem:
      "Product information from different websites and sources can vary in structure and naming, making comparison and price-change tracking difficult without normalization and matching.",
    solution:
      "Built extraction, product-data normalization, fuzzy-matching, price-history, change-detection and alert workflows, supported by execution metrics and logging.",
    architecture:
      "Python extraction and processing tools use SQLite for storage, with a Streamlit dashboard for price history, execution metrics and logs.",
    capabilities: [
      "Website and source data extraction",
      "Product-data normalization",
      "Fuzzy matching for non-identical products",
      "Price-history tracking, change detection and alerts",
      "Streamlit dashboard, execution metrics and logging",
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
      "An evolving workflow-facing interface and platform foundation for future user and admin interfaces.",
    overview:
      "FlowSync is an evolving workflow-facing interface and a platform foundation for future user and administrative interfaces.",
    problem:
      "Workflow-facing tools need clear authentication and interface foundations before broader user and administrative experiences can be developed.",
    solution:
      "Built authentication and interface foundations using Next.js, React, TypeScript, Tailwind CSS and Supabase.",
    architecture:
      "The platform foundation uses Next.js, React, TypeScript, Tailwind CSS and Supabase.",
    capabilities: [
      "Evolving workflow-facing interface layouts",
      "Next.js, React, TypeScript, and Supabase integration",
      "Authentication foundations",
      "Future user and admin interface foundations",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
    currentStatus:
      "FlowSync remains a platform foundation. Its existing Competitor Price Intelligence integration is separate, and it is not currently integrated with the Document Intelligence Platform. Streamlit remains the intended internal operator console for Document Intelligence, while a separate FlowSync-based Document Intelligence interface may be created later.",
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
      "WordPress website maintenance and operational review for Pair and Place, a travel and accommodation website.",
    solution:
      "Established a maintenance baseline, completed a full backup and configuration review, corrected the website timezone, tested the booking form and configured email notifications.",
    capabilities: [
      "WordPress maintenance baseline and full backup",
      "Configuration review and website timezone correction",
      "Booking-form testing and email notification configuration",
      "Reliability and security review",
      "Analytics and conversion-tracking preparation",
      "Identification of booking-form usability issues",
    ],
    technologies: ["WordPress"],
    featured: false,
  },
  {
    slug: "etl-banking-pipeline",
    title: "ETL Banking Pipeline",
    category: "Data Engineering",
    status: "completed",
    shortDescription:
      "An earlier portfolio project exploring extraction, transformation, normalization, data matching, pipeline concepts and reporting concepts.",
    overview:
      "An earlier data engineering portfolio project focused on extraction, transformation, normalization, data matching, pipeline concepts and reporting concepts.",
    solution:
      "Developed a portfolio pipeline to explore extraction, transformation, normalization, data matching and reporting concepts.",
    architecture:
      "The project served as an earlier foundation whose pipeline and matching ideas contributed to the later development of the Competitor Price Intelligence project.",
    capabilities: [
      "Extraction and transformation concepts",
      "Data normalization and matching concepts",
      "Pipeline and reporting concepts",
    ],
    technologies: ["ETL"],
    featured: false,
  },
];
