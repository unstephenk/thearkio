import { LionStorefront } from "@/app/lion-ruo/_components/lion-storefront";
import { lionFaqs, lionProducts, lionSiteContent } from "@/lib/lion-ruo/content";

export default function LionRuoPreviewPage() {
  return (
    <LionStorefront
      products={lionProducts}
      faqs={lionFaqs}
      content={lionSiteContent.acf}
    />
  );
}
