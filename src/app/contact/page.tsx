import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { personal } from "@/data/personal";
import { social } from "@/data/social";
import { Mail, MapPin, Phone } from "lucide-react";

const contactLinkClassName = "inline-flex min-h-11 min-w-11 items-center gap-2 rounded text-sm text-[var(--color-emerald)] transition-colors hover:text-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Discuss a business workflow, automation or data systems problem with Benkai Systems.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SectionWrapper>
      <Container>
        <SectionHeading
          title="Tell us what is slowing your business down."
          subtitle="If important work is being managed through spreadsheets, WhatsApp, paper records or disconnected tools, describe the workflow and Benkai Systems can assess whether a focused system or automation would help."
          level="h1"
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-12">
          {/* Contact info (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            <Card hover={false}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                  <MapPin size={18} aria-hidden="true" />
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

            {(social.phone || social.whatsapp) && (
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                    <Phone size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Phone</h3>
                    <div className="flex flex-wrap gap-x-4">
                      {social.phone && (
                        <a href={`tel:${social.phone}`} className={contactLinkClassName}>
                          {social.phone}
                        </a>
                      )}
                      {social.whatsapp && (
                        <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className={contactLinkClassName}>
                          <WhatsAppIcon size={18} />
                          Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {social.email && (
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                    <Mail size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Email</h3>
                    <a
                      href={`mailto:${social.email}`}
                      className="rounded text-sm text-[var(--color-emerald)] transition-colors hover:text-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
                    >
                      {social.email}
                    </a>
                  </div>
                </div>
              </Card>
            )}
            {social.instagram && (
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-emerald)]">
                    <InstagramIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-text)]">Instagram</h3>
                    <a href={social.instagram.url} target="_blank" rel="noopener noreferrer" className={contactLinkClassName}>
                      {social.instagram.handle}<span className="sr-only"> on Instagram (opens in a new tab)</span>
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
