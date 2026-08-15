import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

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
  return <div className={`${inter.variable} ${space.variable}`}>{children}</div>;
}
