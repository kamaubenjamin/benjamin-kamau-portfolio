import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/navigation/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    default: "Benjamin Kamau | Data Engineer & AI Workflow Automation Specialist",
    template: "%s | Benjamin Kamau",
  },
  description:
    "Data Engineer & AI Workflow Automation Specialist in Nairobi, Kenya. Building scalable data, automation and AI-powered systems.",
  openGraph: {
    title: "Benjamin Kamau | Data Engineer & AI Workflow Automation Specialist",
    description:
      "Building scalable data, automation and AI-powered systems.",
    type: "website",
    locale: "en_KE",
    siteName: "Benjamin Kamau Portfolio",
    url: "/",
    images: [absoluteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Benjamin Kamau | Data Engineer & AI Workflow Automation Specialist",
    description:
      "Building scalable data, automation and AI-powered systems.",
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
      </body>
    </html>
  );
}