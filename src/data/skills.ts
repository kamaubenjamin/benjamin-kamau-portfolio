export interface Skill {
  name: string;
  level?: "expert" | "proficient" | "expanding";
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Data Engineering and Automation",
    skills: [
      { name: "Python", level: "expert" },
      { name: "SQL", level: "expert" },
      { name: "Pandas", level: "proficient" },
      { name: "NumPy", level: "proficient" },
      { name: "ETL", level: "proficient" },
      { name: "Data transformation", level: "proficient" },
      { name: "Regex", level: "proficient" },
      { name: "Data validation", level: "proficient" },
      { name: "Fuzzy matching", level: "proficient" },
    ],
  },
  {
    category: "Platforms and Databases",
    skills: [
      { name: "PostgreSQL", level: "proficient" },
      { name: "Supabase", level: "proficient" },
      { name: "SQLite", level: "proficient" },
      { name: "Streamlit", level: "proficient" },
      { name: "REST APIs", level: "proficient" },
      { name: "Git", level: "proficient" },
      { name: "GitHub", level: "proficient" },
    ],
  },
  {
    category: "Data Collection",
    skills: [
      { name: "Playwright", level: "proficient" },
      { name: "Selenium", level: "proficient" },
      { name: "BeautifulSoup", level: "proficient" },
      { name: "Requests", level: "proficient" },
    ],
  },
  {
    category: "Web and Interfaces",
    skills: [
      { name: "React", level: "proficient" },
      { name: "Next.js", level: "proficient" },
      { name: "TypeScript", level: "proficient" },
      { name: "Vite", level: "proficient" },
      { name: "Tailwind CSS", level: "proficient" },
    ],
  },
  {
    category: "Expanding Capabilities",
    skills: [
      { name: "Apache Airflow", level: "expanding" },
      { name: "Apache Kafka", level: "expanding" },
      { name: "Scalable orchestration", level: "expanding" },
    ],
  },
];