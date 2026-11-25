/**
 * BenKai GA4 conversion instrumentation.
 * Reuses the single GA4 tag managed by the website layout.
 * Never sends contact fields, message text, identifiers, or full URLs to analytics.
 */
type BenkaiConversionEvent = "generate_lead" | "contact_click" | "project_demo_click";

type GtagFunction = (...args: [string, string, Record<string, string>]) => void;

export function trackBenkaiEvent(
  event: BenkaiConversionEvent,
  parameters: Record<string, string>,
): void {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: GtagFunction }).gtag;
  if (typeof gtag !== "function") return; // Do not load a second tag or queue PII.
  try {
    gtag("event", event, parameters);
  } catch {
    // Analytics must never break an accepted enquiry or link navigation.
  }
}
