import { LionCheckout } from "@/app/lion-ruo/_components/lion-checkout";
import { lionProducts, lionSiteContent } from "@/lib/lion-ruo/content";

export default function LionRuoCheckoutPage() {
  return <LionCheckout products={lionProducts} content={lionSiteContent.acf} />;
}
