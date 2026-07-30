import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Projects",
  description:
    "Selected work across data engineering, workflow automation, document intelligence and operational platforms.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const additionalProjects = projects.filter((project) => !project.featured);

  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Selected Projects"
          subtitle="Selected work across data engineering, workflow automation, document intelligence and operational platforms."
          level="h1"
        />
        <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text)]">Featured Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <h2 className="mb-6 mt-14 text-2xl font-semibold text-[var(--color-text)]">Additional Work</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {additionalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}