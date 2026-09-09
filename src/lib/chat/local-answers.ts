import "server-only";

import { personal } from "@/data/personal";
import { projects, type Project } from "@/data/projects";
import { services } from "@/data/services";

export interface LocalChatAnswer {
  message: string;
  projectSlug?: string;
}

function normalizeQuestion(value: string): string {
  return value.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9'&]+/g, " ").trim();
}

function matches(question: string, candidates: string[]): boolean {
  return candidates.includes(question);
}

function findProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Canonical project not found: ${slug}`);
  return project;
}

function projectAnswer(project: Project): LocalChatAnswer {
  const capabilities = project.capabilities?.slice(0, 4) ?? [];
  const capabilityText = capabilities.length
    ? `\n\nSome of its main capabilities are:\n${capabilities.map((item) => `- ${item}`).join("\n")}`
    : "";

  return {
    message: `${project.title} is ${project.shortDescription.charAt(0).toLowerCase()}${project.shortDescription.slice(1)}\n\nCurrent status: ${project.currentStatus ?? project.status}.${capabilityText}\n\nYou can ask a follow-up about how it works or a specific part of the project.`,
    projectSlug: project.slug,
  };
}

function gymBoltAnswer(): LocalChatAnswer {
  const project = findProject("gymbolt-gym-management-system");
  return {
    message: `GymBolt helps manage the everyday work of a gym in one place. It brings together memberships and payments, attendance, sessions and services, lockers, and a self-service Member Portal.\n\nIt is a ${project.status.toLowerCase()} at Lock & Load Gym. That means it is being tested in real reception workflows, not presented as fully adopted or as a large commercial rollout. The product is being improved from actual receptionist feedback.\n\nYou can ask about a specific area such as billing, attendance, mobile use, or how access is protected.`,
    projectSlug: project.slug,
  };
}

function technologyAnswer(): LocalChatAnswer {
  const canonicalTechnologies = new Set(projects.flatMap((project) => project.technologies));
  const technologies = [
    ["React", "React"],
    ["TypeScript", "TypeScript"],
    ["Python", "Python"],
    ["PostgreSQL", "PostgreSQL"],
    ["Supabase", "Supabase"],
    ["Cloudflare", [...canonicalTechnologies].find((item) => item.startsWith("Cloudflare"))],
  ].filter(([, canonical]) => canonical && canonicalTechnologies.has(canonical));

  return {
    message: `Benkai uses practical tools that fit the system being built. Current project work includes ${technologies.map(([label]) => label).join(", ")}.\n\nThe technology is chosen after understanding the workflow. If you want the technical reasoning behind a particular project, ask about that project directly.`,
  };
}

export function getLocalChatAnswer(message: string): LocalChatAnswer | null {
  const question = normalizeQuestion(message);

  if (matches(question, ["what does benkai build", "what does benkai systems build", "what is benkai", "what is benkai systems"])) {
    return { message: `${personal.shortBio}\n\nIn simple terms, Benkai builds practical software that reduces repeated manual work, keeps business information more consistent, and makes everyday operations easier to see and manage.` };
  }

  if (matches(question, ["who founded benkai", "who founded benkai systems", "who is benjamin kamau"])) {
    return { message: `${personal.name} founded and builds Benkai Systems. He works across business discovery, system design, data modelling, implementation, deployment, and practical iteration.` };
  }

  if (matches(question, ["where is benkai based", "where is benkai systems based", "where are you based"])) {
    return { message: `Benkai Systems is based in ${personal.location}. Remote opportunities are also considered.` };
  }

  if (matches(question, ["what services do you offer", "what services does benkai offer", "what are your services"])) {
    return { message: `Benkai offers six focused services:\n${services.map((service) => `- ${service.title}: ${service.description}`).join("\n")}\n\nThe starting point is the business workflow, not a predetermined software product.` };
  }

  if (matches(question, ["what technologies do you use", "what technology do you use", "what tech do you use"])) {
    return technologyAnswer();
  }

  if (matches(question, ["what projects have you built", "what projects has benkai built", "show me your projects"])) {
    return { message: `The selected work includes:\n${projects.map((project) => `- ${project.title} — ${project.status}`).join("\n")}\n\nEach project page explains what is working now, its current maturity, and its limits.` };
  }

  if (matches(question, ["tell me about gymbolt", "what is gymbolt", "is gymbolt live", "what is gymbolt's status", "what is gymbolt status"])) {
    return gymBoltAnswer();
  }

  const projectIntents: Array<[string[], string]> = [
    [["tell me about spice harvest", "what is spice harvest", "tell me about spice harvest ops"], "spice-harvest-ops"],
    [["tell me about idp", "what is idp", "tell me about the idp"], "intelligent-document-processing-platform"],
    [["tell me about home health", "what is home health", "tell me about home health operations"], "home-health-operations-demo"],
  ];
  for (const [questions, slug] of projectIntents) {
    if (matches(question, questions)) return projectAnswer(findProject(slug));
  }

  if (matches(question, ["how can i contact benkai", "how do i contact benkai", "how can i contact benkai systems"])) {
    return { message: "Use the Contact page to describe the workflow or business problem you want to discuss. Benkai can then review whether there is a practical fit." };
  }

  if (matches(question, ["where can i see your work", "where can i see benkai's work", "where can i see benkai work"])) {
    return { message: "Visit /projects to see the selected work. Each case study separates current capabilities, project status, and remaining work." };
  }

  return null;
}