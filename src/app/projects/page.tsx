import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected work across data engineering, workflow automation, document intelligence and operational platforms.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Selected Work"
          subtitle="Selected work across data engineering, workflow automation, document intelligence and operational platforms."
          level="h1"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}