export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  bio: string;
  location: string;
  remoteAvailable: boolean;
  availability: string;
  cvFile: string;
}

export const personal: PersonalInfo = {
  name: "Benjamin Kamau",
  title: "Data Engineer & AI Workflow Automation Specialist",
  tagline: "Building scalable data, automation and AI-powered systems.",
  shortBio:
    "I build scalable data pipelines, workflow automations and intelligent document systems, with modern web interfaces that make those systems practical to use.",
  bio: `I am a Data Engineer and AI Workflow Automation Specialist based in Nairobi, Kenya. I design and build practical data solutions — ETL pipelines, intelligent document-processing systems, workflow automations, dashboards and business platforms.

With over two years of technical experience spanning workflow automation, data engineering, and technical support, I help organisations turn repetitive processes, fragmented data and disconnected systems into streamlined, automated, data-driven operations.

I combine strong analytical thinking with hands-on engineering to deliver measurable outcomes: reducing repetitive manual work, improving data consistency, making exceptions easier to identify, and creating clearer operational visibility without expensive platform licenses.`,
  location: "Nairobi, Kenya",
  remoteAvailable: true,
  availability: "Selected projects and contract opportunities",
  cvFile: "/documents/Benjamin-Kamau-CV.pdf",
};
