import type { Metadata } from "next";
import { LionInfoPage } from "@/app/lion-ruo/_components/lion-info-page";
import { lionInfoContent, lionSiteContent } from "@/lib/lion-ruo/content";

export const metadata: Metadata = {
  title: "Information — Lion RUO Peptides",
  description: "Information about Lion RUO Peptides, documentation, research-use positioning, storage, and shipping.",
};

export default function InfoPage() {
  return <LionInfoPage content={lionSiteContent.acf} page={lionInfoContent.acf} />;
}
