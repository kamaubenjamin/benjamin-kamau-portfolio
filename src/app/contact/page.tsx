import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { personal } from "@/data/personal";
import { social } from "@/data/social";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Benjamin Kamau for data engineering, workflow automation, and technical consulting projects.",
};

export default function ContactPage() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? Let's discuss how I can help turn your data and processes into practical solutions."
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-12">
          {/* Contact info (4 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text)]">Location</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {personal.location}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Available for remote engagements
                  </p>
                </div>
              </div>
            </Card>

            {social.email && (
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Email</h3>
                    <a
                      href={`mailto:${social.email}`}
                      className="text-sm text-[var(--color-emerald)] transition-colors hover:text-[var(--color-emerald-light)]"
                    >
                      {social.email}
                    </a>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Contact form (7 cols) */}
          <div className="lg:col-span-7">
            <Card hover={false} className="h-full">
              <ContactForm recipientEmail={social.email} />
            </Card>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
