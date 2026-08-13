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
          {project.positioning && (
            <p className="mb-3 max-w-3xl text-xl font-medium text-[var(--color-text)]">
              {project.positioning}
            </p>
          )}
          <p className="max-w-2xl text-lg text-[var(--color-text-muted)]">
            {project.valueProposition ?? project.shortDescription}
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
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Overview</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.overview}</p>
              </section>
            )}

            {project.problem && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  {project.slug === "gymbolt-gym-management-system" ? "Business Problem" : "Problem"}
                </h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.problem}</p>
              </section>
            )}

            {project.solution && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Solution</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.solution}</p>
                {project.solutionDetails && (
                  <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                    {project.solutionDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {project.caseStudySections?.map((section) => (
              <section key={section.title}>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">{section.title}</h2>
                {section.description && (
                  <p className="leading-relaxed text-[var(--color-text-muted)]">{section.description}</p>
                )}
                {section.details && (
                  <ul className={`${section.description ? "mt-4" : ""} space-y-2 text-[var(--color-text-muted)]`}>
                    {section.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {project.architecture && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Architecture</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.architecture}</p>
                {project.architectureDetails && (
                  <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                    {project.architectureDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span className="min-w-0 break-words">{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {project.paymentWorkflow && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  {project.slug === "gymbolt-gym-management-system"
                    ? "Payment Reconciliation Principle"
                    : "M-Pesa Payment Workflow"}
                </h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.paymentWorkflow}</p>
                {project.paymentWorkflowDetails && (
                  <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                    {project.paymentWorkflowDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {project.engineeringHighlights && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Engineering & Security Highlights</h2>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {project.engineeringHighlights.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.verifiedOutcomes && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Verified Outcomes</h2>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {project.verifiedOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-lime)]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.responsibilities && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Responsibilities</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.responsibilities}</p>
              </section>
            )}

            {project.role && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">My Role & Contribution</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.role}</p>
                {project.roleDetails && (
                  <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                    {project.roleDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {project.servicePositioning && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Suitable Service Positioning</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.servicePositioning}</p>
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
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">
                  {project.currentStatusHeading ?? "Current Status"}
                </h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.currentStatus}</p>
                {project.currentStatusDetails && (
                  <ul className="mt-4 space-y-2 text-[var(--color-text-muted)]">
                    {project.currentStatusDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 leading-relaxed">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {project.lessonsLearned && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Lessons Learned</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.lessonsLearned}</p>
              </section>
            )}

            {project.screenshotRecommendations && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Recommended Case-Study Screenshots</h2>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {project.screenshotRecommendations.map((recommendation) => (
                    <li key={recommendation} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.demoVideoRecommendation && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Short Demo-Video Recommendation</h2>
                <p className="leading-relaxed text-[var(--color-text-muted)]">{project.demoVideoRecommendation}</p>
              </section>
            )}

            {project.claimsNotToMake && (
              <section>
                <h2 className="mb-3 text-xl font-semibold text-[var(--color-text)]">Public Claim Boundaries</h2>
                <ul className="space-y-2 text-[var(--color-text-muted)]">
                  {project.claimsNotToMake.map((claim) => (
                    <li key={claim} className="flex items-start gap-3 leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                      <span>{claim}</span>
                    </li>
                  ))}
                </ul>
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

            {(project.liveDemoStatus || project.repositoryStatus) && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Project Access</h3>
                <dl className="space-y-3 text-sm">
                  {project.liveDemoStatus && (
                    <div>
                      <dt className="font-medium text-[var(--color-text)]">
                        {project.slug === "gymbolt-gym-management-system"
                          ? "Live Demo"
                          : project.slug === "essiedo-catalogue-pilot"
                            ? "Live Pilot"
                            : "Live demo"}
                      </dt>
                      <dd className="text-[var(--color-text-muted)]">{project.liveDemoStatus}</dd>
                    </div>
                  )}
                  {project.repositoryStatus && (
                    <div>
                      <dt className="font-medium text-[var(--color-text)]">
                        {project.repositoryStatus === "Private Repository" ? "Source Code" : "Repository"}
                      </dt>
                      <dd className="text-[var(--color-text-muted)]">{project.repositoryStatus}</dd>
                    </div>
                  )}
                </dl>
              </Card>
            )}

            {project.tags && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Project Tags</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </Card>
            )}

            {project.ctaLabels && (
              <Card hover={false}>
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">Recommended CTA Labels</h3>
                <ul className="space-y-1.5">
                  {project.ctaLabels.map((label) => (
                    <li key={label} className="text-sm text-[var(--color-text-muted)]">{label}</li>
                  ))}
                </ul>
              </Card>
            )}

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
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">
                  {project.slug === "gymbolt-gym-management-system" ? "Remaining Work" : "Future Roadmap"}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">{project.roadmap}</p>
                {project.roadmapDetails && (
                  <ul className="mt-3 space-y-2">
                    {project.roadmapDetails.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}