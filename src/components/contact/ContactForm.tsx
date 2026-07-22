"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ContactFormProps {
  recipientEmail?: string;
}

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    contactMethod: "",
    company: "",
    serviceNeeded: "",
    currentProcess: "",
    toolsUsed: "",
    desiredOutcome: "",
    timeline: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const servicesList = [
    "Data Engineering & ETL",
    "Workflow Automation",
    "Intelligent Document Processing",
    "Business Data Reconciliation",
    "Dashboards & Internal Tools",
    "Technical Consulting & System Audits",
    "Other / Custom Project",
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactMethod.trim()) {
      newErrors.contactMethod = "Email or WhatsApp is required";
    }
    if (!formData.serviceNeeded) {
      newErrors.serviceNeeded = "Please select a service";
    }
    if (!formData.currentProcess.trim()) {
      newErrors.currentProcess = "Please describe your current process or problem";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam check
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    if (!recipientEmail) {
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const emailBody = `Project Inquiry Details:
----------------------------------
Name: ${formData.name}
Email/WhatsApp: ${formData.contactMethod}
Company: ${formData.company || "N/A"}
Service Needed: ${formData.serviceNeeded}
Timeline: ${formData.timeline || "N/A"}

Current Process/Problem:
${formData.currentProcess}

Tools Currently Used:
${formData.toolsUsed || "N/A"}

Desired Outcome:
${formData.desiredOutcome || "N/A"}`;

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${encodeURIComponent(
      emailBody
    )}`;

    window.location.href = mailtoUrl;
  };

  const isConfigured = !!recipientEmail;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="form-hp">Do not fill this</label>
        <input
          id="form-hp"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="form-name" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Your Name *
          </label>
          <input
            id="form-name"
            type="text"
            required
            disabled={!isConfigured}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "form-name-error" : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              errors.name ? "border-red-500" : "border-[var(--color-border)] focus-visible:border-[var(--color-emerald)]"
            }`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p id="form-name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="form-contact" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Email or WhatsApp *
          </label>
          <input
            id="form-contact"
            type="text"
            required
            disabled={!isConfigured}
            aria-invalid={!!errors.contactMethod}
            aria-describedby={errors.contactMethod ? "form-contact-error" : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              errors.contactMethod ? "border-red-500" : "border-[var(--color-border)] focus-visible:border-[var(--color-emerald)]"
            }`}
            value={formData.contactMethod}
            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
          />
          {errors.contactMethod && (
            <p id="form-contact-error" className="mt-1 text-xs text-red-500">{errors.contactMethod}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="form-company" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Company or Organisation
          </label>
          <input
            id="form-company"
            type="text"
            disabled={!isConfigured}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="form-service" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Service Needed *
          </label>
          <select
            id="form-service"
            required
            disabled={!isConfigured}
            aria-invalid={!!errors.serviceNeeded}
            aria-describedby={errors.serviceNeeded ? "form-service-error" : undefined}
            className={`w-full rounded-lg border bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              errors.serviceNeeded ? "border-red-500" : "border-[var(--color-border)] focus-visible:border-[var(--color-emerald)]"
            }`}
            value={formData.serviceNeeded}
            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
          >
            <option value="">Select a service...</option>
            {servicesList.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
          {errors.serviceNeeded && (
            <p id="form-service-error" className="mt-1 text-xs text-red-500">{errors.serviceNeeded}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="form-process" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          Current Process or Problem *
        </label>
        <textarea
          id="form-process"
          required
          rows={4}
          disabled={!isConfigured}
          aria-invalid={!!errors.currentProcess}
          aria-describedby={errors.currentProcess ? "form-process-error" : undefined}
          placeholder="Please describe the repetitive work, messy data or systems that do not communicate."
          className={`w-full rounded-lg border bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black resize-y ${
            errors.currentProcess ? "border-red-500" : "border-[var(--color-border)] focus-visible:border-[var(--color-emerald)]"
          }`}
          value={formData.currentProcess}
          onChange={(e) => setFormData({ ...formData, currentProcess: e.target.value })}
        />
        {errors.currentProcess && (
          <p id="form-process-error" className="mt-1 text-xs text-red-500">{errors.currentProcess}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="form-tools" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Tools Currently Used
          </label>
          <input
            id="form-tools"
            type="text"
            disabled={!isConfigured}
            placeholder="e.g. Excel, PostgreSQL, manual folders"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.toolsUsed}
            onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="form-timeline" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Approximate Timeline
          </label>
          <input
            id="form-timeline"
            type="text"
            disabled={!isConfigured}
            placeholder="e.g. 2-4 weeks, flexible"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="form-outcome" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          Desired Outcome
        </label>
        <textarea
          id="form-outcome"
          rows={2}
          disabled={!isConfigured}
          placeholder="Describe what success looks like (e.g. synchronized records, daily automated report, readable dashboard)."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black resize-y"
          value={formData.desiredOutcome}
          onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isConfigured}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-emerald)] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--color-emerald)] shadow-[var(--shadow-glow)]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Send Project Inquiry
        </button>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
        This form compiles your details and opens your local email application to send.
        No personal data is stored on a server.
      </p>
    </form>
  );
}
