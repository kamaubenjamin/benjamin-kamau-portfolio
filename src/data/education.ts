export interface Education {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export const education: Education[] = [
  {
    degree: "BSc Information Technology",
    institution: "Mount Kenya University",
    period: "2020 – 2023",
    details: "Bachelor of Science in Information Technology",
  },
];