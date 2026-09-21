import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/json-ld";

// Static export: emitted as a build-time file instead of a request-time route.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}