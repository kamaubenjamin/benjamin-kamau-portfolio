export interface TechnologyGroup {
  category: string;
  technologies: string[];
}

export const workingTechnologyGroups: TechnologyGroup[] = [
  {
    category: "Data & Automation",
    technologies: ["Python", "SQL", "Pandas", "ETL", "Data transformation", "Regex", "Data validation", "Fuzzy matching"],
  },
  {
    category: "Applications",
    technologies: ["React", "Next.js", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    category: "Data Platforms",
    technologies: ["PostgreSQL", "Supabase", "SQLite", "Streamlit"],
  },
  {
    category: "Integration & Version Control",
    technologies: ["REST APIs", "Git", "GitHub"],
  },
  {
    category: "Testing & Data Collection",
    technologies: ["Playwright", "Selenium", "BeautifulSoup", "Requests"],
  },
];