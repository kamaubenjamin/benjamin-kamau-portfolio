import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { skillCategories } from "@/data/skills";
import { Download, GraduationCap, Award, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Benjamin Kamau — Data Engineer focused on Workflow Automation and Document Intelligence in Nairobi, Kenya.",
  alternates: { canonical: "/about" },
};

function Timeline() {
  return (
    <div className="space-y-8">
      {experiences.map((exp, i) => (
        <div
          key={i}
          className="relative pl-8 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-[var(--color-border)] last:before:hidden"
        >
          <div className="absolute left-0 top-2 h-6 w-6 rounded-full border-2 border-[var(--color-emerald)] bg-[var(--color-bg)]" />
          <Card hover={false}>
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-[var(--color-text)]">
                  {exp.company}
                </h3>
                <p className="text-sm text-[var(--color-emerald)]">{exp.role}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                <Calendar size={14} />
                {exp.period}
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {exp.description}
            </p>
            <ul className="space-y-1.5">
              {exp.highlights.map((h, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-emerald)]" />
                  {h}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <Container>
          <SectionHeading title="About Me" subtitle={personal.shortBio} align="left" level="h1" />

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none">
                {personal.bio.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-[var(--color-text-muted)]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <Button href={personal.cvFile} variant="primary" download>
                  <Download size={16} />
                  Download CV
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card hover={false}>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-emerald)]">
                  Location
                </h3>
                <p className="text-[var(--color-text)]">{personal.location}</p>
              </Card>
              <Card hover={false}>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-emerald)]">
                  Availability
                </h3>
                <p className="text-[var(--color-text)]">{personal.availability}</p>
              </Card>
              <Card hover={false}>
                <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-emerald)]">
                  Remote
                </h3>
                <p className="text-[var(--color-text)]">
                  {personal.remoteAvailable
                    ? "Open to remote opportunities"
                    : "On-site"}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <SectionHeading title="Experience" align="left" />
          <Timeline />
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading title="Education" align="left" />
              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.degree} hover={false}>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-emerald)]" />
                      <div>
                        <h3 className="font-semibold text-[var(--color-text)]">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-[var(--color-emerald)]">
                          {edu.institution}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {edu.period}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading title="Certifications & Training" align="left" />
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <Card key={cert.title} hover={false}>
                    <div className="flex items-start gap-3">
                      <Award className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-lime)]" />
                      <div>
                        <h3 className="font-semibold text-[var(--color-text)]">
                          {cert.issuer}
                        </h3>
                        <p className="text-sm text-[var(--color-text)]">
                          {cert.title}
                        </p>
                        {cert.description && (
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {cert.description}
                          </p>
                        )}
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block rounded text-sm text-[var(--color-emerald)] transition-colors hover:text-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
                          >
                            View credential →
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <SectionHeading title="Technologies" align="left" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <Card key={category.category} as="section">
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.name}
                      variant={
                        skill.level === "expanding"
                          ? "expanding"
                          : skill.level === "expert"
                            ? "lime"
                            : "emerald"
                      }
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}