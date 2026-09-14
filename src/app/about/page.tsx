import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { personal } from "@/data/personal";
import { services } from "@/data/services";
import { workingTechnologyGroups } from "@/data/technologies";

export const metadata: Metadata = {
  title: "About",
  description: "About Benkai Systems and Benjamin Kamau, Founder & Technical Builder.",
  alternates: { canonical: "/about" },
};

const capabilityDescriptions: Record<string, string> = {
  "Business Operations Systems": "Focused systems for day-to-day workflows, governed records and role-aware access.",
  "Workflow Automation": "Practical automation for repeated work, duplicate entry and disconnected business tools.",
  "Data Engineering & ETL": "Reliable pipelines that prepare data from multiple sources for consistent operational use.",
  "Document Intelligence": "Structured extraction and validation for documents, spreadsheets and email workflows.",
  "Dashboards & Internal Tools": "Clear internal interfaces that simplify administration and operational visibility.",
  "System Modernization & Migration": "Controlled improvements to existing systems, data and platform workflows.",
};

export default function AboutPage() {
  return (
    <>
      <SectionWrapper>
        <Container>
          <SectionHeading title="About Benkai Systems" subtitle={personal.shortBio} align="left" level="h1" />
          <div className="max-w-3xl space-y-4 text-base leading-7 text-[var(--color-text-muted)]">
            <p>
              Benkai starts by understanding how work actually happens: where information enters, which steps repeat,
              and where manual or disconnected processes slow the operation down. We then build practical systems
              around that real workflow.
            </p>
            <p className="border-l-2 border-[var(--color-emerald)] pl-4 font-medium text-[var(--color-text)]">
              We do not start with software. We start with the workflow.
            </p>
            <p>
              The goal is not software built for appearance. It is a useful operational outcome: clearer information,
              less repeated work and systems that support the people using them.
            </p>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <SectionHeading title="Founder" align="left" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
            <Card hover={false} className="border-[var(--color-border-hover)] bg-[var(--color-mint-surface)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-mint-muted)]">Founder &amp; Technical Builder</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text)]">Benjamin Kamau</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--color-text-muted)]">
                I&apos;m Benjamin Kamau, the founder and technical builder behind Benkai Systems. I design and build
                practical systems around real business workflows, with a focus on automation, data, document
                processing and internal operations.
              </p>
            </Card>
            <Card hover={false} className="justify-center">
              <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-emerald)]">Location</dt>
                  <dd className="mt-1 text-sm text-[var(--color-text)]">{personal.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-emerald)]">Availability</dt>
                  <dd className="mt-1 text-sm text-[var(--color-text)]">{personal.availability}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-emerald)]">Remote</dt>
                  <dd className="mt-1 text-sm text-[var(--color-text)]">Open to remote opportunities</dd>
                </div>
              </dl>
            </Card>
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <SectionHeading title="Capabilities" subtitle="What Benkai can help build, shaped around the workflow that needs to improve." align="left" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={service.title} as="article" hover={false} className="border-[var(--color-border)]">
                <span className="font-mono text-xs text-[var(--color-mint-muted)]">0{index + 1}</span>
                <h3 className="mt-4 font-semibold text-[var(--color-text)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{capabilityDescriptions[service.title]}</p>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <SectionHeading title="Working Technologies" subtitle="A focused working stack demonstrated across Benkai projects and implementations." align="left" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workingTechnologyGroups.map((group) => (
              <Card key={group.category} as="section" hover={false} className="p-5">
                <h3 className="mb-3 font-semibold text-[var(--color-text)]">{group.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.technologies.map((technology) => (
                    <Badge key={technology} variant="emerald">{technology}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      <SectionWrapper divider>
        <Container>
          <Card hover={false} className="border-[var(--color-border-hover)] bg-[var(--color-mint-surface)] text-center">
            <div className="mx-auto max-w-2xl py-3 sm:py-5">
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl">
                Have an operational problem to solve?
              </h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-[var(--color-text-muted)]">
                Share the workflow, data or system challenge. Benkai can review where a focused practical system may help.
              </p>
              <Button href="/contact" size="lg" className="mt-6">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </div>
          </Card>
        </Container>
      </SectionWrapper>
    </>
  );
}