import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { HeroSection } from "@/components/hero/HeroSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProcessSteps } from "@/components/process/ProcessSteps";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { workingTechnologyGroups } from "@/data/technologies";
import { personJsonLd, serializeJsonLd } from "@/lib/json-ld";
import {
  ArrowRight,
  Database,
  Code2,
  Layers,
  Terminal,
  Globe,
  Cloud,
  Braces,
  ServerCog,
} from "lucide-react";

function TechnologyStrip() {
  const items = [
    { label: "React", icon: Code2 },
    { label: "TypeScript", icon: Braces },
    { label: "Python", icon: Terminal },
    { label: "PostgreSQL", icon: Database },
    { label: "Supabase", icon: ServerCog },
    { label: "Cloudflare", icon: Cloud },
  ];

  return (
    <div className="border-y border-[var(--color-border)] px-1 py-5 sm:px-0">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
        Core technologies
      </p>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => {
          const Icon = item.icon;
          return <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium text-[var(--color-text-muted)]"><Icon size={17} className="text-[var(--color-mint-muted)]" aria-hidden="true" /><span>{item.label}</span></div>;
        })}
      </div>
    </div>
  );
}

function TechnologyGroups() {
  const categoryIcons: Record<string, React.ReactNode> = {
    "Data & Automation": <Database size={16} />,
    Applications: <Code2 size={16} />,
    "Data Platforms": <Layers size={16} />,
    "Integration & Version Control": <Terminal size={16} />,
    "Testing & Data Collection": <Globe size={16} />,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {workingTechnologyGroups.map((category) => (
        <Card key={category.category} as="section">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[var(--color-emerald)]">
              {categoryIcons[category.category] || <Terminal size={16} />}
            </span>
            <h3 className="font-semibold text-[var(--color-text)]">
              {category.category}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {category.technologies.map((technology) => (
              <Badge key={technology} variant="emerald">
                {technology}
              </Badge>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  const featuredProjects = projects.filter((project) => project.featured);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
      />
      {/* 1. Hero */}
      <AnimatedWrapper>
        <HeroSection />
      </AnimatedWrapper>

      {/* Evidenced technology strip */}
      <SectionWrapper divider={false} className="py-8 sm:py-10 lg:py-10">
        <Container>
          <AnimatedWrapper delay={0.1}>
            <TechnologyStrip />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 4. Six-service preview */}
      <SectionWrapper id="services" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="What We Build"
              subtitle="Benkai Systems designs and builds practical business systems, workflow automation and data infrastructure around real operational needs."
            />
          </AnimatedWrapper>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimatedWrapper key={service.title} delay={i * 0.05}>
                <ServiceCard service={service} />
              </AnimatedWrapper>
            ))}
          </div>
          <AnimatedWrapper delay={0.3}>
            <div className="mt-8 text-center">
              <Button href="/services" variant="outline" size="lg">
                View All Services <ArrowRight size={16} />
              </Button>
            </div>
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 5. Featured projects */}
      <SectionWrapper id="projects" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="Selected Work"
              subtitle="Systems and case studies demonstrating practical operations, automation, document processing and data engineering."
            />
          </AnimatedWrapper>
          <p className="mb-6 text-sm text-[var(--color-text-muted)]">
            Current focus: real purchase-order accuracy baseline following the completed v0.22 UAT demonstration.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <AnimatedWrapper key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} featured />
              </AnimatedWrapper>
            ))}
          </div>
          <AnimatedWrapper delay={0.3}>
            <div className="mt-8 text-center">
              <Button href="/projects" variant="outline" size="lg">
                View Selected Projects <ArrowRight size={16} />
              </Button>
            </div>
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 6. Four-step working process */}
      <SectionWrapper id="process" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="How We Work"
              subtitle="We do not start with software. We start with the workflow."
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.1}>
            <ProcessSteps />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 7. Working technology groups */}
      <SectionWrapper id="technologies" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="Working Technologies"
              subtitle="A focused stack demonstrated across current Benkai projects and implementations."
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.1}>
            <TechnologyGroups />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 8. Final CTA */}
      <SectionWrapper>
        <Container>
          <AnimatedWrapper>
            <Card hover={false} className="overflow-hidden text-center">
              <div className="relative px-4 py-9 sm:px-12 sm:py-12">
                <h2 className="relative mb-4 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
                  Ready to turn your data into practical business impact?
                </h2>
                <p className="relative mb-8 mx-auto max-w-2xl text-lg text-[var(--color-text-muted)]">
                  Have a repetitive process, messy data or systems that do not communicate with each other? Let&apos;s map the problem and build a practical solution.
                </p>
                <div className="relative flex flex-wrap justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg">
                    Discuss a Project <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>
    </>
  );
}