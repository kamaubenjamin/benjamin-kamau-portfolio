import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]">
      <Card className="flex h-full flex-col">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-emerald)]">
            {project.category}
          </span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <Badge
            variant={
              project.status === "completed"
                ? "emerald"
                : project.status === "ongoing"
                  ? "lime"
                  : "default"
            }
          >
            {project.status}
          </Badge>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-emerald)]">
          {project.title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge>+{project.technologies.length - 4}</Badge>
          )}
        </div>
      </Card>
    </Link>
  );
}