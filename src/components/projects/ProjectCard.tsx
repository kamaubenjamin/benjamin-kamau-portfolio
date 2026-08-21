import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const technologies = project.cardTechnologies ?? project.technologies;
  const visibleTechnologyCount = project.cardTechnologies ? 6 : 4;
  const liveDemo = project.links?.find(
    (link) =>
      link.label === "Live Demo" ||
      link.label === "View Live Demo" ||
      link.label === "Live Pilot",
  );

  return (
    <Card className="flex h-full flex-col">
      <Link href={`/projects/${project.slug}`} className="group flex flex-1 flex-col rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-emerald)]">
            {project.category}
          </span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <Badge
            variant={project.statusVariant}
          >
            {project.status}
          </Badge>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-emerald)]">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {featured && project.featuredDescription
            ? project.featuredDescription
            : project.cardDescription ?? project.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {technologies.slice(0, visibleTechnologyCount).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {technologies.length > visibleTechnologyCount && (
            <Badge>+{technologies.length - visibleTechnologyCount}</Badge>
          )}
        </div>
      </Link>
      {liveDemo && (
        <a
          href={liveDemo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-fit rounded text-sm font-medium text-[var(--color-emerald)] hover:text-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
        >
          {liveDemo.label} →
        </a>
      )}
    </Card>
  );
}