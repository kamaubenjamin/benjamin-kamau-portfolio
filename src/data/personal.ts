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

Benkai helps organisations turn repetitive processes, fragmented data and disconnected systems into streamlined operations with clearer information, better data consistency and less repeated manual work.`,
  location: "Nairobi, Kenya",
  remoteAvailable: true,
  availability: "Selected projects and contract opportunities",
};
