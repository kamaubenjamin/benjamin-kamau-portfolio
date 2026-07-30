import { personal } from "@/data/personal";
import { services } from "@/data/services";
import { social } from "@/data/social";

const fallbackSiteUrl = "http://localhost:3000";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl
).origin;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

export function personJsonLd() {
  const sameAs = [social.github, social.linkedin].filter(
    (url): url is string => Boolean(url)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: "Data Engineer & Workflow Automation Specialist",
    url: absoluteUrl("/"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personal.name} — Data Engineering, Workflow Automation and Document Intelligence`,
    url: absoluteUrl("/services"),
    description:
      "Data engineering, workflow automation, intelligent document processing, data reconciliation, dashboards and technical consulting services.",
    areaServed: {
      "@type": "City",
      name: "Nairobi",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Professional services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}