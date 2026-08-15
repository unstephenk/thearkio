import faqSource from "@/content/lion-ruo/faqs.json";
import productSource from "@/content/lion-ruo/products.json";
import siteSource from "@/content/lion-ruo/site-content.json";
import type {
  Faq,
  Product,
  SiteContentDocument,
  WordpressFaq,
  WordpressProduct,
} from "@/lib/lion-ruo/types";

const decodeEntities = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'");

const toPlainText = (value: string) =>
  decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

export const lionSiteContent = siteSource as SiteContentDocument;

export const lionProducts: Product[] = (productSource as WordpressProduct[])
  .filter((product) => product.status === "publish")
  .map((product) => ({
    id: product.id,
    slug: product.slug,
    name: toPlainText(product.title.rendered),
    description: toPlainText(product.excerpt.rendered || product.content.rendered),
    category: product.acf.product_category,
    size: product.acf.size,
    purity: product.acf.purity,
    price: Number(product.acf.price),
    currency: product.acf.currency,
    lotNumber: product.acf.lot_number,
    storage: product.acf.storage,
    format: product.acf.format,
    image: product.acf.image_url,
    coaUrl: product.acf.coa_url,
    featured: product.acf.featured,
  }));

export const lionFaqs: Faq[] = (faqSource as WordpressFaq[])
  .filter((faq) => faq.status === "publish")
  .sort((a, b) => a.menu_order - b.menu_order)
  .map((faq) => ({
    id: faq.id,
    question: toPlainText(faq.title.rendered),
    answer: toPlainText(faq.acf.answer),
  }));
