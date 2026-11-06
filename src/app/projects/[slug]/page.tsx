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
    notFound();
  }

  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
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
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-emerald)]">
              {project.category}
            </span>
            <span className="text-[var(--color-text-muted)]">·</span>
            <Badge
              variant={project.statusVariant}
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
            {project.links?.map((link) => (
              <Button
                key={`${link.kind}-${link.url}`}
                href={link.url}
                variant={link.primary ? "primary" : "outline"}
                external
              >
                {link.kind === "repository" ? <GitBranch size={16} /> : <ExternalLink size={16} />}
                {link.label}
              </Button>
            ))}
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {project.overview && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">What It Does</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.overview}</p>
              </section>
            )}

            {project.problem && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  The Problem
                </h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">The Solution</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.solution}</p>
              </section>
            )}

            {project.currentStatus && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  Current Status
                </h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.currentStatus}</p>
              </section>
            )}

            {project.callToAction && (
              <Card hover={false} className="border-[var(--color-emerald)]/20">
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  {project.slug === "gymbolt-gym-management-system"
                    ? "Build a More Connected Operations System"
                    : "Let’s Build a Practical Operations System"}
                </h2>
                <p className="mb-5 leading-relaxed text-[var(--color-text-muted)]">{project.callToAction}</p>
                <div className="flex flex-wrap gap-3">
                  <Button href="/contact" variant="primary">Discuss a Similar Project</Button>
                  {project.slug === "gymbolt-gym-management-system" && (
                    <Button href="/contact" variant="outline">Request a Guided Demo</Button>
                  )}
                </div>
              </Card>
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

            {(project.publicCapabilities ?? project.capabilities)?.length && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Main Capabilities</h3>
                <ul className="space-y-1.5">
                  {(project.publicCapabilities ?? project.capabilities ?? []).slice(0, 6).map((cap, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}