import type { MetadataRoute } from "next";

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
      {
        src: "/brand/benkai-mark-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/brand/benkai-mark.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/benkai-mark-64.png",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
