import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";
import { professionalServiceJsonLd, serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data engineering, workflow automation, intelligent document processing, business data reconciliation, dashboards and technical consulting services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(professionalServiceJsonLd()),
        }}
      />
      <SectionWrapper>
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Practical data, automation and business systems — from ETL pipelines to internal tools."
          level="h1"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Container>
      </SectionWrapper>
    </>
  );
}