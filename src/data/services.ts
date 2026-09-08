export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    title: "Business Operations Systems",
    description:
      "Build focused systems around day-to-day operational workflows, governed records and role-aware access.",
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
    title: "Data Engineering & ETL",
    description:
      "Design reliable pipelines that extract, transform and load data from multiple sources for consistent operational use.",
    icon: "FileText",
    features: [
      "reducing repetitive manual work",
      "improving data consistency",
      "making exceptions easier to identify",
      "reducing duplicate entry",
    ],
  },
  {
    title: "Document Intelligence",
    description:
      "Extract, standardise and validate structured data from PDFs, CSVs, spreadsheets and email with governed exception handling.",
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
    title: "System Modernization & Migration",
    description:
      "Assess existing workflows and move data or applications between platforms with controlled validation and rollback boundaries.",
    icon: "SearchCheck",
    features: [
      "improving data consistency",
      "making exceptions easier to identify",
      "creating clearer operational visibility",
    ],
  },
];
