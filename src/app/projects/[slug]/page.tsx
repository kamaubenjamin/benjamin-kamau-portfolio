import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink, GitBranch } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <SectionWrapper>
      <Container>
        <div className="mb-8">
          <Button href="/projects" variant="ghost" size="sm">
            <ArrowLeft size={16} />
            Back to Projects
          </Button>
        </div>

        <header className="mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-emerald)]">
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
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-muted)]">
            {project.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.repositoryUrl && (
              <Button href={project.repositoryUrl} variant="outline" external>
                <GitBranch size={16} />
                Repository
              </Button>
            )}
            {project.liveDemoUrl && (
              <Button href={project.liveDemoUrl} variant="primary" external>
                <ExternalLink size={16} />
                Live Demo
              </Button>
            )}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {project.overview && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Overview</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.overview}</p>
              </section>
            )}

            {project.problem && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Problem</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Solution</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.solution}</p>
              </section>
            )}

            {project.challenges && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Challenges</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.challenges}</p>
              </section>
            )}

            {project.currentStatus && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Current Status</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.currentStatus}</p>
              </section>
            )}

            {project.lessonsLearned && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Lessons Learned</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.lessonsLearned}</p>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <Card hover={false}>
              <h3 className="mb-3 font-semibold text-[var(--color-text)]">Technologies</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="emerald">{tech}</Badge>
                ))}
              </div>
            </Card>

            {project.capabilities && project.capabilities.length > 0 && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Key Capabilities</h3>
                <ul className="space-y-1.5">
                  {project.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {project.roadmap && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Future Roadmap</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{project.roadmap}</p>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}