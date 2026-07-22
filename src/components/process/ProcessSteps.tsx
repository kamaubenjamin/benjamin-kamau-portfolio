import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Understand the business process",
    description:
      "I start by learning how your current process works — the people involved, the tools used, the data flowing through it, and where the friction points are.",
  },
  {
    number: "02",
    title: "Map data and system requirements",
    description:
      "I map out the data sources, system dependencies, validation rules and output requirements. This becomes the blueprint for the solution.",
  },
  {
    number: "03",
    title: "Build and validate the solution",
    description:
      "I build the solution iteratively — starting with a working core, then adding layers of validation, error handling and edge-case coverage. You see progress at every stage.",
  },
  {
    number: "04",
    title: "Document, deploy and improve",
    description:
      "Every solution comes with clear documentation. I deploy it into your environment, confirm it works with your real data, and remain available for improvements as your needs evolve.",
  },
];

export function ProcessSteps() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {steps.map((step) => (
        <Card key={step.number} as="article" className="relative">
          <span className="mb-3 block text-3xl font-bold text-[var(--color-emerald)]/30">
            {step.number}
          </span>
          <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
            {step.description}
          </p>
        </Card>
      ))}
    </div>
  );
}