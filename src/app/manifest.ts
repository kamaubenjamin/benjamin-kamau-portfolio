import type { MetadataRoute } from "next";

// Static export: emitted as a build-time file instead of a request-time route.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Benkai Systems | Business Systems, Workflow Automation & Data Engineering",
    short_name: "Benkai Systems",
    description: "Practical business systems, workflow automation and data infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a09",
    theme_color: "#8df5bd",
    icons: [
      { src: "/brand/benkai-app-192-v2.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/benkai-app-512-v2.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
