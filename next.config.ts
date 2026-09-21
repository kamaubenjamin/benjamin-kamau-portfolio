import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The public portfolio is delivered as pre-rendered static assets on Cloudflare.
   * Every public route (including all nine project case studies, robots.txt,
   * sitemap.xml, manifest.webmanifest and the custom 404 page) is emitted into
   * `out/` at build time and served by the Cloudflare static asset layer, so page
   * requests never invoke a Worker request handler or a Next.js server runtime.
   *
   * Only `/api/chat` and `/api/chat/analytics` reach the narrow Worker in
   * `workers/index.ts`.
   */
  output: "export",
  images: {
    // Required by `output: "export"`; the site ships pre-sized brand assets.
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
