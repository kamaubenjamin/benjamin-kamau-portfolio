import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Benjamin Kamau's audited portfolio of data engineering, workflow automation, document processing, operations platforms and learning projects.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="All Projects"
          subtitle="Audited work across data engineering, automation, document processing, operations platforms, technical support and foundational learning projects."
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