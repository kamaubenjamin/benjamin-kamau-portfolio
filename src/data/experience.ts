export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: "Patika Technology Limited / Sanifu AI",
    role: "Technical Support & Workflow Specialist",
    period: "November 2023 – January 2026",
    description:
      "Provided technical support and workflow automation expertise, bridging the gap between user-facing issues and backend data processing systems.",
    highlights: [
      "Supported and maintained workflow automation systems for document processing and data extraction",
      "Troubleshot technical issues across the platform stack, reducing user-reported incidents",
      "Assisted in building and refining ETL pipelines for processing semi-structured business documents",
      "Documented system processes and created technical guides for end users and internal teams",
    ],
  },
  {
    company: "CFAO Motors Kenya",
    role: "IT Support Intern",
    period: "February 2023 – August 2023",
    description:
      "Provided IT support across the organisation, assisting with hardware, software and network-related issues while gaining foundational experience in enterprise IT operations.",
    highlights: [
      "Provided first-line IT support for staff across multiple departments",
      "Assisted with system maintenance, user account management and software installations",
      "Supported the IT team in maintaining network infrastructure and resolving connectivity issues",
      "Documented common support procedures and troubleshooting guides",
    ],
  },
];