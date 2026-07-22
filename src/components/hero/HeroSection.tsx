import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { personal } from "@/data/personal";
import { social } from "@/data/social";
import { DataFlowVisual } from "./DataFlowVisual";
import { MapPin, Briefcase, Download, Eye, MessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-24 lg:pt-32">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[var(--color-emerald)]/5 blur-[120px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left column: content */}
          <div className="lg:col-span-7">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[var(--color-emerald)]">
              {personal.location}
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
              {personal.name}
            </h1>
            <p className="mb-3 text-xl font-medium text-[var(--color-text)] sm:text-2xl">
              <GradientText>{personal.title}</GradientText>
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              {personal.tagline}
            </p>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)]">
              {personal.shortBio}
            </p>

            <div className="mb-8 flex flex-wrap gap-4">
              <Button href="/projects" variant="primary" size="lg">
                <Eye size={18} />
                View My Work
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                <MessageSquare size={18} />
                Discuss a Project
              </Button>
              <Button
                href={personal.cvFile}
                variant="ghost"
                size="lg"
                download
              >
                <Download size={18} />
                Download CV
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--color-emerald)]" />
                {personal.location}
              </span>
              {personal.remoteAvailable && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase size={14} className="text-[var(--color-lime)]" />
                  Remote opportunities
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Briefcase size={14} className="text-[var(--color-emerald)]" />
                {personal.availability}
              </span>
            </div>

            {social.github || social.linkedin ? (
              <div className="mt-6 flex items-center gap-3">
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[var(--radius-button)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)]"
                    aria-label="GitHub"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[var(--radius-button)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)]"
                    aria-label="LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            ) : null}
          </div>

          {/* Right column: animated data visual */}
          <div className="lg:col-span-5 w-full">
            <DataFlowVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
