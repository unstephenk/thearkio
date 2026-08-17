import type { Metadata } from "next";
import { LionLegalPage } from "@/app/lion-ruo/_components/lion-legal-page";
import { lionLegalContent, lionSiteContent } from "@/lib/lion-ruo/content";

export const metadata: Metadata = {
  title: "Legal & Policies — Lion RUO Peptides",
  description: "Research-use, terms, privacy, shipping, and return policy structure for Lion RUO Peptides.",
};

export default function LegalPage() {
  return <LionLegalPage content={lionSiteContent.acf} page={lionLegalContent.acf} />;
}
