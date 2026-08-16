import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { LionAgeGate } from "@/app/lion-ruo/_components/lion-age-gate";
import { lionSiteContent } from "@/lib/lion-ruo/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-lion-body",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-lion-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lion RUO Peptides — Client Preview",
  description: "Private Lion RUO Peptides storefront concept.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function LionRuoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = lionSiteContent.acf;

  return (
    <div className={`${inter.variable} ${space.variable}`}>
      {content.age_gate && <LionAgeGate content={content.age_gate} brand={content.brand} />}
      {children}
    </div>
  );
}
