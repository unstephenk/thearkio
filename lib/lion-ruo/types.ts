export type WordpressRendered = {
  rendered: string;
};

export type WordpressProduct = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: "publish" | "draft";
  type: "peptide_product";
  title: WordpressRendered;
  content: WordpressRendered;
  excerpt: WordpressRendered;
  featured_media: number;
  acf: {
    product_category: string;
    size: string;
    purity: string;
    price: number | string;
    currency: string;
    lot_number: string;
    storage: string;
    format: string;
    image_url: string | null;
    coa_url: string | null;
    featured: boolean;
  };
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  size: string;
  purity: string;
  price: number;
  currency: string;
  lotNumber: string;
  storage: string;
  format: string;
  image: string | null;
  coaUrl: string | null;
  featured: boolean;
};

export type WordpressFaq = {
  id: number;
  slug: string;
  status: "publish" | "draft";
  type: "faq";
  menu_order: number;
  title: WordpressRendered;
  acf: {
    answer: string;
  };
};

export type Faq = {
  id: number;
  question: string;
  answer: string;
};

export type SiteContentDocument = {
  id: number;
  slug: "lion-home";
  status: "publish" | "draft";
  type: "page";
  title: WordpressRendered;
  content: WordpressRendered;
  acf: {
    brand: {
      name: string;
      descriptor: string;
      logo_url: string;
    };
    navigation: Array<{ label: string; href: string }>;
    hero: {
      eyebrow: string;
      title: string;
      accent: string;
      description: string;
      primary_cta_label: string;
      primary_cta_href: string;
      image_url: string;
    };
    trust_items: Array<{
      icon: "shield" | "certificate" | "spark" | "flask";
      title: string;
      text: string;
    }>;
    catalog: {
      eyebrow: string;
      heading: string;
      description: string;
      per_page: number;
    };
    verification_cards: Array<{
      icon: "certificate" | "shield" | "flask";
      title: string;
      text: string;
      link_label: string;
      link_href: string;
    }>;
    checkout: {
      heading: string;
      payment_note: string;
      submit_label: string;
      success_heading: string;
      success_text: string;
    };
    footer: {
      description: string;
      legal: string;
      email: string;
      instagram: string;
      groups: Array<{
        heading: string;
        links: Array<{ label: string; href: string }>;
      }>;
    };
  };
};

export type CartLine = {
  productId: number;
  quantity: number;
};
