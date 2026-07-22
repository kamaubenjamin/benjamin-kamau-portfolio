export interface Certification {
  title: string;
  issuer: string;
  date?: string;
  description?: string;
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    title: "Technical Support & Workflow Specialist",
    issuer: "micro1",
    description: "Specialised training in technical support workflows and automation.",
  },
  {
    title: "ETL and Data Pipelines with Shell, Airflow and Kafka",
    issuer: "IBM",
    description: "Training in ETL pipeline construction, shell scripting, Apache Airflow and Apache Kafka fundamentals.",
  },
  {
    title: "Python for Data Engineering",
    issuer: "IBM",
    description: "Python programming focused on data engineering applications.",
  },
  {
    title: "Relational Database Administration",
    issuer: "IBM",
    description: "Database administration fundamentals including PostgreSQL and SQL.",
  },
  {
    title: "Linux Shell",
    issuer: "IBM",
    description: "Linux command-line skills for system operations and automation.",
  },
  {
    title: "IBM ETL Labs",
    issuer: "IBM",
    description: "Hands-on ETL lab exercises covering data extraction, transformation and loading patterns.",
  },
];