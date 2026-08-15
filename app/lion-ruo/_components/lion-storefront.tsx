"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { readCart, writeCart } from "@/lib/lion-ruo/cart";
import type { CartLine, Faq, Product, SiteContentDocument } from "@/lib/lion-ruo/types";
import {
  ArrowIcon,
  CertificateIcon,
  FlaskIcon,
  PlusIcon,
  ShieldIcon,
  SparkIcon,
} from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import { ProductThumb } from "./product-thumb";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];

type Props = {
  products: Product[];
  faqs: Faq[];
  content: SiteContent;
};

const iconMap = {
  shield: ShieldIcon,
  certificate: CertificateIcon,
  spark: SparkIcon,
  flask: FlaskIcon,
};

const formatPrice = (product: Product) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

export function LionStorefront({ products, faqs, content }: Props) {
  const perPage = Math.max(1, content.catalog.per_page || 9);
  const pageCount = Math.max(1, Math.ceil(products.length / perPage));
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    setCart(readCart());
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    writeCart(cart);
  }, [cart, cartReady]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * perPage;
    return products.slice(start, start + perPage);
  }, [page, perPage, products]);

  const addToCheckout = (product: Product) => {
    setCart((current) => {
      const existing = current.find(
        (line) => line.productId === product.id,
      );

      return existing
        ? current.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        )
        : [...current, { productId: product.id, quantity: 1 }];
    });

    setToast(`${product.name} added to checkout`);
  };

  const changePage = (nextPage: number) => {
    setPage(Math.min(pageCount, Math.max(1, nextPage)));
    window.requestAnimationFrame(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const cartTotalCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className={styles.lionSite}>
      <LionHeader content={content} />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={`${styles.shell} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>{content.hero.eyebrow}</span>
              <h1>
                {content.hero.title} <em>{content.hero.accent}</em>
              </h1>
              <p>{content.hero.description}</p>
              <a href={content.hero.primary_cta_href} className={styles.primaryButton}>
                {content.hero.primary_cta_label}
                <ArrowIcon className={styles.buttonIcon} />
              </a>
            </div>

            <div className={styles.heroMedia}>
              <div className={styles.heroMediaGlow} aria-hidden="true" />
              <Image
                src={content.hero.image_url}
                alt="Lion RUO Peptides research vial"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 48vw"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.trustStrip} aria-label="Product quality highlights">
          <div className={`${styles.shell} ${styles.trustGrid}`}>
            {content.trust_items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div className={styles.trustItem} key={item.title}>
                  <Icon className={styles.trustIcon} />
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="catalog" className={styles.catalogSection}>
          <div className={styles.shell}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionEyebrow}>{content.catalog.eyebrow}</span>
                <h2>{content.catalog.heading}</h2>
              </div>
              <p>{content.catalog.description}</p>
            </div>

            <div className={styles.catalogGrid}>
              {visibleProducts.map((product) => (
                <article className={styles.productCard} key={product.id}>
                  <div className={styles.productMedia}>
                    <ProductThumb image={product.image} name={product.name} />
                    <span className={styles.purityBadge}>{product.purity} purity</span>
                  </div>

                  <div className={styles.productBody}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    <dl className={styles.productMeta}>
                      <div>
                        <dt>Size</dt>
                        <dd>{product.size}</dd>
                      </div>
                      <div>
                        <dt>Lot</dt>
                        <dd>{product.lotNumber}</dd>
                      </div>
                    </dl>

                    <div className={styles.productFooter}>
                      <div>
                        <strong>{formatPrice(product)}</strong>
                        <span>{product.currency}</span>
                      </div>
                      <button
                        type="button"
                        className={styles.addButton}
                        onClick={() => addToCheckout(product)}
                        aria-label={`Add ${product.name} to checkout`}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <nav className={styles.pagination} aria-label="Catalog pagination">
              <button
                type="button"
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                aria-label="Previous catalog page"
              >
                ←
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
                <button
                  key={number}
                  type="button"
                  className={number === page ? styles.activePage : undefined}
                  aria-current={number === page ? "page" : undefined}
                  onClick={() => changePage(number)}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={page === pageCount}
                aria-label="Next catalog page"
              >
                →
              </button>
            </nav>
          </div>
        </section>

        <section id="verification" className={styles.verificationSection}>
          <div className={`${styles.shell} ${styles.verificationGrid}`}>
            {content.verification_cards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <article key={card.title} className={styles.verificationCard}>
                  <Icon className={styles.verificationIcon} />
                  <div>
                    <h2>{card.title}</h2>
                    <p>{card.text}</p>
                    <a href={card.link_href}>{card.link_label} →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="faq" className={styles.faqSection}>
          <div className={styles.shell}>
            <div className={styles.faqHeading}>
              <span className={styles.sectionEyebrow}>FAQ</span>
              <h2>Research catalog questions</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.id} className={styles.faqItem}>
                  <summary>{faq.question}<span>+</span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LionFooter content={content} />

      {cartTotalCount > 0 && (
        <Link href="/lion-ruo/checkout" className={styles.mobileCheckoutBar}>
          Checkout ({cartTotalCount})
          <ArrowIcon />
        </Link>
      )}

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`} role="status" aria-live="polite">
        {toast ?? ""}
      </div>
    </div>
  );
}
