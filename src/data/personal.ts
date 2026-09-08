export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  bio: string;
  location: string;
  remoteAvailable: boolean;
  availability: string;
}

export const personal: PersonalInfo = {
  name: "Benjamin Kamau",
  title: "Benjamin Kamau — Founder & Technical Builder",
  tagline: "Practical software, workflow automation and data systems for real business operations.",
  shortBio:
    "Benkai Systems is an independent software and data systems studio focused on practical business operations, workflow automation and data engineering.",
  bio: `Benkai Systems is an independent software and data systems studio focused on practical business operations, workflow automation and data engineering. We do not start with software. We start with the workflow.

Benjamin Kamau designs and builds the systems behind Benkai Systems, working across business discovery, architecture, data modelling, implementation, deployment and iteration.

With over two years of technical experience spanning workflow automation, data engineering, and technical support, I help organisations turn repetitive processes, fragmented data and disconnected systems into streamlined, automated, data-driven operations.

I combine strong analytical thinking with hands-on engineering to deliver practical outcomes: reducing repetitive manual work, improving data consistency, making exceptions easier to identify, and creating clearer operational visibility without expensive platform licenses.`,
  location: "Nairobi, Kenya",
  remoteAvailable: true,
  availability: "Selected projects and contract opportunities",
};
