import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AnimatedWrapper } from "@/components/ui/AnimatedWrapper";
import { HeroSection } from "@/components/hero/HeroSection";
import { DataFlowVisual } from "@/components/hero/DataFlowVisual";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ProcessSteps } from "@/components/process/ProcessSteps";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { personal } from "@/data/personal";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Code2,
  Layers,
  Workflow,
  Terminal,
  BarChart3,
  Globe,
  GitBranch,
  Blocks,
} from "lucide-react";

function CapabilityStrip() {
  const items = [
    { value: "2+", label: "Years of technical and workflow experience", icon: CheckCircle2 },
    { value: "7+", label: "Workflows supported", icon: Layers },
    { value: "Python, SQL, ETL", label: "Core technical stack", icon: Code2 },
    { value: "BSc IT", label: "Information Technology", icon: Database },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label} hover={false} className="text-center">
            <Icon className="mx-auto mb-2 h-6 w-6 text-[var(--color-emerald)]" />
            <p className="text-lg font-bold text-[var(--color-text)]">{item.value}</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">{item.label}</p>
          </Card>
        );
      })}
    </div>
  );
}

function ExperiencePreview() {
  return (
    <div className="space-y-6">
      {experiences.map((exp) => (
        <Card key={`${exp.company}-${exp.role}`} as="article">
          <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-[var(--color-text)]">{exp.company}</h3>
              <p className="text-sm text-[var(--color-emerald)]">{exp.role}</p>
            </div>
            <span className="text-sm text-[var(--color-text-muted)]">{exp.period}</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {exp.description}
          </p>
        </Card>
      ))}
    </div>
  );
}

function TechnologyGroups() {
  const categoryIcons: Record<string, React.ReactNode> = {
    "Data Engineering and Automation": <Database size={16} />,
    "Platforms and Databases": <Layers size={16} />,
    "Data Collection": <Globe size={16} />,
    "Web and Interfaces": <Code2 size={16} />,
    "Expanding Capabilities": <Blocks size={16} />,
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skillCategories.map((category) => (
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
  );
}

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
  const firstThreeSkills = skillCategories.slice(0, 3);

  return (
    <>
      {/* 1. Hero */}
      <AnimatedWrapper>
        <HeroSection />
      </AnimatedWrapper>

      {/* 3. Capability strip */}
      <SectionWrapper divider={false}>
        <Container>
          <AnimatedWrapper delay={0.1}>
            <CapabilityStrip />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 4. Six-service preview */}
      <SectionWrapper id="services" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="What I Build"
              subtitle="Practical data, automation and business systems — from ETL pipelines to internal tools."
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
            <div className="mt-10 text-center">
              <Button href="/services" variant="outline" size="lg">
                View All Services <ArrowRight size={16} />
              </Button>
            </div>
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 5. Four featured projects */}
      <SectionWrapper id="projects" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="Featured Projects"
              subtitle="Selected work spanning data engineering, automation, document processing and web platforms."
            />
          </AnimatedWrapper>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <AnimatedWrapper key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedWrapper>
            ))}
          </div>
          <AnimatedWrapper delay={0.3}>
            <div className="mt-10 text-center">
              <Button href="/projects" variant="outline" size="lg">
                View All Projects <ArrowRight size={16} />
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
              title="How I Work"
              subtitle="A structured approach to understanding your problem, building the right solution and ensuring it delivers real results."
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.1}>
            <ProcessSteps />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 7. Experience preview */}
      <SectionWrapper id="experience" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="Experience"
              subtitle="Hands-on roles in technical support, workflow automation and IT operations."
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.1}>
            <ExperiencePreview />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.2}>
            <div className="mt-10 text-center">
              <Button href="/about" variant="outline" size="lg">
                Full Bio & Skills <ArrowRight size={16} />
              </Button>
            </div>
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 8. Technology groups */}
      <SectionWrapper id="skills" divider>
        <Container>
          <AnimatedWrapper>
            <SectionHeading
              title="Technologies I Work With"
              subtitle="Core tools and expanding capabilities across data engineering, automation and web platforms."
            />
          </AnimatedWrapper>
          <AnimatedWrapper delay={0.1}>
            <TechnologyGroups />
          </AnimatedWrapper>
        </Container>
      </SectionWrapper>

      {/* 9. Final CTA */}
      <SectionWrapper>
        <Container>
          <AnimatedWrapper>
            <Card hover={false} className="overflow-hidden border-[var(--color-emerald)]/20 text-center">
              <div className="relative px-4 py-12 sm:px-12 sm:py-16">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-emerald)]/5 to-transparent" />
                <h2 className="relative mb-4 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
                  Ready to turn your data into practical business impact?
                </h2>
                <p className="relative mb-8 mx-auto max-w-2xl text-lg text-[var(--color-text-muted)]">
                  Have a repetitive process, messy data or systems that do not communicate with each other? Let's map the problem and build a practical solution.
                </p>
                <div className="relative flex flex-wrap justify-center gap-4">
                  <Button href="/contact" variant="primary" size="lg">
                    Discuss a Project <ArrowRight size={18} />
                  </Button>
                  <Button href={personal.cvFile} variant="outline" size="lg" download>
                    Download CV
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