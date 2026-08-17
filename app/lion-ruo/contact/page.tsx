import type { Metadata } from "next";
import { LionContactPage } from "@/app/lion-ruo/_components/lion-contact-page";
import { lionContactContent, lionSiteContent } from "@/lib/lion-ruo/content";

export const metadata: Metadata = {
  title: "Contact — Lion RUO Peptides",
  description: "Contact Lion RUO Peptides for catalog, order, documentation, or wholesale questions.",
};

export default function ContactPage() {
  return <LionContactPage content={lionSiteContent.acf} page={lionContactContent.acf} />;
}
