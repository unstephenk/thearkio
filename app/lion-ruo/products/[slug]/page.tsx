import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LionProductDetail } from "@/app/lion-ruo/_components/lion-product-detail";
import { getLionProductBySlug, lionProducts, lionSiteContent } from "@/lib/lion-ruo/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return lionProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getLionProductBySlug(slug);

  if (!product) return {};

  return {
    title: `${product.name} — Lion RUO Peptides`,
    description: product.description,
  };
}

export default async function LionProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getLionProductBySlug(slug);

  if (!product) notFound();

  return <LionProductDetail product={product} content={lionSiteContent.acf} />;
}
