import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://theark.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Ark | Landing Page Web Design for DFW Small Businesses",
    template: "%s | The Ark",
  },
  description:
    "Custom, conversion-focused landing pages for small businesses in Dallas, Richardson, Plano, Garland, Fort Worth, and beyond.",
  keywords: [
    "Dallas web design",
    "Dallas landing page design",
    "Richardson web designer",
    "Plano web design",
    "Garland web design",
    "Fort Worth web design",
    "DFW small business website",
    "small business landing page",
  ],
  applicationName: "The Ark",
  category: "Web Design",
  authors: [{ name: "The Ark" }],
  creator: "The Ark",
  publisher: "The Ark",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    title: "The Ark — Websites built to move businesses forward.",
    description:
      "Custom landing pages for small businesses that want to look established, earn trust, and turn visitors into customers.",
    url: siteUrl,
    siteName: "The Ark",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Ark — Websites built to move businesses forward.",
    description: "Custom landing pages for small businesses in DFW and beyond.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070807" },
    { media: "(prefers-color-scheme: light)", color: "#f1eee7" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
