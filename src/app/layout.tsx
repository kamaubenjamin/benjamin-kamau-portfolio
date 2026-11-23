import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/navigation/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AssistantMount } from "@/components/assistant/AssistantMount";
import { absoluteUrl, siteUrl } from "@/lib/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Benkai Systems | Systems. Automation. Data.",
    template: "%s | Benkai Systems",
  },
  description:
    "Benkai Systems builds practical business systems, workflow automation, internal tools and data engineering solutions, founded and engineered by Benjamin W. Kamau.",
  icons: {
    icon: [
      { url: "/brand/benkai-app-v2.svg", type: "image/svg+xml" },
      { url: "/brand/benkai-app-32-v2.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/brand/benkai-app-32-v2.png"],
    apple: [{ url: "/brand/benkai-app-180-v2.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Benkai Systems | Business Systems, Workflow Automation & Data Engineering",
    description:
      "Practical business systems, workflow automation and data infrastructure, founded and engineered by Benjamin W. Kamau.",
    type: "website",
    locale: "en_KE",
    siteName: "Benkai Systems",
    url: "/",
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benkai Systems | Business Systems, Workflow Automation & Data Engineering",
    description:
      "Practical business systems, workflow automation and data infrastructure, founded and engineered by Benjamin W. Kamau.",
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AssistantMount />
      </body>
    </html>
  );
}