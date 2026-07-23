"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";

interface ContactFormProps {
  recipientEmail?: string;
}

type SubmissionStatus = "idle" | "sending" | "accepted" | "failed";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

const servicesList = [
  "Data Engineering & ETL",
  "Workflow Automation",
  "Intelligent Document Processing",
  "Business Data Reconciliation",
  "Dashboards & Internal Tools",
  "Technical Consulting & System Audits",
  "Other / Custom Project",
] as const;

const fieldLimits = {
  name: 100,
  contactMethod: 160,
  company: 160,
  currentProcess: 3000,
  toolsUsed: 500,
  desiredOutcome: 1500,
  timeline: 160,
} as const;

const initialFormData = {
  name: "",
  contactMethod: "",
  company: "",
  serviceNeeded: "",
  currentProcess: "",
  toolsUsed: "",
  desiredOutcome: "",
  timeline: "",
  honeypot: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactNumberPattern = /^\+?[\d\s().-]{7,24}$/;

export function ContactForm({ recipientEmail }: ContactFormProps) {
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const submissionLockRef = useRef(false);

  const validate = () => {
    const trimmed = {
      ...formData,
      name: formData.name.trim(),
      contactMethod: formData.contactMethod.trim(),
      company: formData.company.trim(),
      serviceNeeded: formData.serviceNeeded.trim(),
      currentProcess: formData.currentProcess.trim(),
      toolsUsed: formData.toolsUsed.trim(),
      desiredOutcome: formData.desiredOutcome.trim(),
      timeline: formData.timeline.trim(),
    };
    const newErrors: Record<string, string> = {};
    if (!trimmed.name) newErrors.name = "Name is required";
    else if (trimmed.name.length > fieldLimits.name) newErrors.name = "Name is too long";

    if (!trimmed.contactMethod) {
      newErrors.contactMethod = "Email or WhatsApp is required";
    } else if (trimmed.contactMethod.length > fieldLimits.contactMethod) {
      newErrors.contactMethod = "Contact detail is too long";
    } else if (
      trimmed.contactMethod.includes("@")
        ? !emailPattern.test(trimmed.contactMethod)
        : !contactNumberPattern.test(trimmed.contactMethod)
    ) {
      newErrors.contactMethod = "Enter a valid email address or WhatsApp number";
    }

    if (!servicesList.includes(trimmed.serviceNeeded as (typeof servicesList)[number])) {
      newErrors.serviceNeeded = "Please select a service";
    }

    if (!trimmed.currentProcess) {
      newErrors.currentProcess = "Please describe your current process or problem";
    } else if (trimmed.currentProcess.length > fieldLimits.currentProcess) {
      newErrors.currentProcess = "Description is too long";
    }

    if (trimmed.company.length > fieldLimits.company) newErrors.company = "Company name is too long";
    if (trimmed.toolsUsed.length > fieldLimits.toolsUsed) newErrors.toolsUsed = "Tools description is too long";
    if (trimmed.desiredOutcome.length > fieldLimits.desiredOutcome) newErrors.desiredOutcome = "Desired outcome is too long";
    if (trimmed.timeline.length > fieldLimits.timeline) newErrors.timeline = "Timeline is too long";

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, trimmed };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionLockRef.current || formData.honeypot) {
      return;
    }

    setSubmissionStatus("idle");
    setSubmissionMessage("");

    const { isValid, trimmed } = validate();
    if (!isValid) {
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setSubmissionStatus("failed");
      setSubmissionMessage(`The form is temporarily unavailable. Please email ${recipientEmail ?? "me"} directly.`);
      return;
    }

    const isEmailContact = emailPattern.test(trimmed.contactMethod);
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `Portfolio enquiry — ${trimmed.serviceNeeded} — ${trimmed.name}`,
      from_name: "Benjamin Kamau Portfolio",
      name: trimmed.name,
      contact: trimmed.contactMethod,
      company: trimmed.company || "Not provided",
      service: trimmed.serviceNeeded,
      current_process: trimmed.currentProcess,
      tools_used: trimmed.toolsUsed || "Not provided",
      desired_outcome: trimmed.desiredOutcome || "Not provided",
      timeline: trimmed.timeline || "Not provided",
      source: "Benjamin Kamau Portfolio",
      botcheck: "",
    };

    if (isEmailContact) payload.replyto = trimmed.contactMethod;

    submissionLockRef.current = true;
    setSubmissionStatus("sending");
    setSubmissionMessage("Sending your enquiry…");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result: unknown = await response.json();
      const wasAccepted =
        response.ok &&
        typeof result === "object" &&
        result !== null &&
        "success" in result &&
        result.success === true;

      if (!wasAccepted) throw new Error("Provider rejected submission");

      setFormData(initialFormData);
      setErrors({});
      setSubmissionStatus("accepted");
      setSubmissionMessage("Your message has been sent. I’ll get back to you soon.");
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Web3Forms submission failed", error instanceof Error ? error.name : "UnknownError");
      }
      setSubmissionStatus("failed");
      setSubmissionMessage("Unable to send your message right now. Please try again or use the email link below.");
    } finally {
      submissionLockRef.current = false;
    }
  };

  const isSending = submissionStatus === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-busy={isSending}>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="form-hp">Do not fill this</label>
        <input
          id="form-hp"
          name="botcheck"
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
            disabled={isSending}
            maxLength={fieldLimits.name}
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
            disabled={isSending}
            maxLength={fieldLimits.contactMethod}
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
            disabled={isSending}
            maxLength={fieldLimits.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "form-company-error" : undefined}
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          {errors.company && <p id="form-company-error" className="mt-1 text-xs text-red-500">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="form-service" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Service Needed *
          </label>
          <select
            id="form-service"
            required
            disabled={isSending}
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
          disabled={isSending}
          maxLength={fieldLimits.currentProcess}
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
            disabled={isSending}
            maxLength={fieldLimits.toolsUsed}
            aria-invalid={!!errors.toolsUsed}
            aria-describedby={errors.toolsUsed ? "form-tools-error" : undefined}
            placeholder="e.g. Excel, PostgreSQL, manual folders"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.toolsUsed}
            onChange={(e) => setFormData({ ...formData, toolsUsed: e.target.value })}
          />
          {errors.toolsUsed && <p id="form-tools-error" className="mt-1 text-xs text-red-500">{errors.toolsUsed}</p>}
        </div>

        <div>
          <label htmlFor="form-timeline" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
            Approximate Timeline
          </label>
          <input
            id="form-timeline"
            type="text"
            disabled={isSending}
            maxLength={fieldLimits.timeline}
            aria-invalid={!!errors.timeline}
            aria-describedby={errors.timeline ? "form-timeline-error" : undefined}
            placeholder="e.g. 2-4 weeks, flexible"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          />
          {errors.timeline && <p id="form-timeline-error" className="mt-1 text-xs text-red-500">{errors.timeline}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="form-outcome" className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          Desired Outcome
        </label>
        <textarea
          id="form-outcome"
          rows={2}
          disabled={isSending}
          maxLength={fieldLimits.desiredOutcome}
          aria-invalid={!!errors.desiredOutcome}
          aria-describedby={errors.desiredOutcome ? "form-outcome-error" : undefined}
          placeholder="Describe what success looks like (e.g. synchronized records, daily automated report, readable dashboard)."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus-visible:border-[var(--color-emerald)] focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black resize-y"
          value={formData.desiredOutcome}
          onChange={(e) => setFormData({ ...formData, desiredOutcome: e.target.value })}
        />
        {errors.desiredOutcome && <p id="form-outcome-error" className="mt-1 text-xs text-red-500">{errors.desiredOutcome}</p>}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSending}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-emerald)] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[var(--color-emerald-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--color-emerald)] shadow-[var(--shadow-glow)]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSending ? "Sending…" : "Send Project Inquiry"}
        </button>
      </div>

      {submissionMessage && (
        <p
          className={`text-sm leading-relaxed ${submissionStatus === "failed" ? "text-red-400" : submissionStatus === "accepted" ? "text-[var(--color-emerald-light)]" : "text-[var(--color-text-muted)]"}`}
          role={submissionStatus === "failed" ? "alert" : "status"}
          aria-live="polite"
        >
          {submissionMessage}
        </p>
      )}

      <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
        Submit the form to send your enquiry directly through Web3Forms. You can also email{" "}
        {recipientEmail ? (
          <a className="text-[var(--color-emerald)] hover:text-[var(--color-emerald-light)]" href={`mailto:${recipientEmail}`}>
            {recipientEmail}
          </a>
        ) : (
          "me directly"
        )}
        . The portfolio does not store form submissions in its own database.
      </p>
    </form>
  );
}
