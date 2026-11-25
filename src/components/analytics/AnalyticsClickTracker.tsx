"use client";

import { useEffect } from "react";
import { trackBenkaiEvent } from "@/lib/analytics-events";

/**
 * Count explicit contact actions and project demo launches.
 * This listener does not intercept navigation, create a GA4 tag, or log PII.
 */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const contactMethod = href.startsWith("mailto:")
        ? "email"
        : href.startsWith("tel:")
          ? "phone"
          : /^(https?:\/\/)?(?:wa\.me\/|api\.whatsapp\.com\/|web\.whatsapp\.com\/)/i.test(href)
            ? "whatsapp"
            : null;

      if (contactMethod) {
        trackBenkaiEvent("contact_click", {
          contact_method: contactMethod,
          click_location: anchor.closest("footer") ? "footer" : "page",
        });
      }

      const demoSlug = anchor.dataset.benkaiProjectDemo;
      if (demoSlug && /^[a-z0-9-]+$/.test(demoSlug)) {
        trackBenkaiEvent("project_demo_click", {
          project_slug: demoSlug,
        });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
