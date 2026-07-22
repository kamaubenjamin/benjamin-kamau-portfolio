export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    title: "Data Engineering & ETL",
    description:
      "Design and build robust ETL pipelines that extract, transform and load data from multiple sources. Focused on improving data consistency, reducing duplicate entry, and structuring data for clearer operational visibility.",
    icon: "Database",
    features: [
      "reducing repetitive manual work",
      "improving data consistency",
      "reducing duplicate entry",
      "creating clearer operational visibility",
    ],
  },
  {
    title: "Workflow Automation",
    description:
      "Automate repetitive manual processes and connect disparate business applications to streamline operations, reduce duplicate entry, and make daily workflows practical and consistent.",
    icon: "Workflow",
    features: [
      "reducing repetitive manual work",
      "improving data consistency",
      "making exceptions easier to identify",
      "creating clearer operational visibility",
    ],
  },
  {
    title: "Intelligent Document Processing",
    description:
      "Extract, standardise and validate structured data from semi-structured documents (PDFs, CSVs, XLSX, email). Reduces repetitive manual entry and makes layout exceptions easier to identify.",
    icon: "FileText",
    features: [
      "reducing repetitive manual work",
      "improving data consistency",
      "making exceptions easier to identify",
      "reducing duplicate entry",
    ],
  },
  {
    title: "Business Data Reconciliation",
    description:
      "Align transactions and datasets across multiple software programs. Designed to improve data consistency, reduce manual lookups, and make reporting discrepancies easier to identify.",
    icon: "Scale",
    features: [
      "improving data consistency",
      "making exceptions easier to identify",
      "reducing duplicate entry",
      "creating clearer operational visibility",
    ],
  },
  {
    title: "Dashboards & Internal Tools",
    description:
      "Build custom, lightweight internal interfaces and operations dashboards to track key performance metrics and simplify daily administrative data tasks.",
    icon: "LayoutDashboard",
    features: [
      "reducing repetitive manual work",
      "improving data consistency",
      "creating clearer operational visibility",
    ],
  },
  {
    title: "Technical Consulting & System Audits",
    description:
      "Review current technical systems, document workflow bottlenecks, and offer practical, actionable recommendations to improve standard data operations.",
    icon: "SearchCheck",
    features: [
      "improving data consistency",
      "making exceptions easier to identify",
      "creating clearer operational visibility",
    ],
  },
];
