"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart, writeCart } from "@/lib/lion-ruo/cart";
import type { CartLine, Product, SiteContentDocument } from "@/lib/lion-ruo/types";
import { ArrowIcon, CertificateIcon, FlaskIcon, PlusIcon, ShieldIcon } from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import { ProductThumb } from "./product-thumb";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];

const formatPrice = (product: Product) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

export function LionProductDetail({ product, content }: { product: Product; content: SiteContent }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

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

  const quantityInCart = cart.find((line) => line.productId === product.id)?.quantity ?? 0;
  const canAdd = product.inStock && quantityInCart < product.stockQuantity;
  const lowStock = product.inStock && product.stockQuantity <= product.lowStockThreshold;

  const addToCheckout = () => {
    if (!canAdd) return;

    setCart((current) => {
      const existing = current.find((line) => line.productId === product.id);
      return existing
        ? current.map((line) =>
            line.productId === product.id ? { ...line, quantity: line.quantity + 1 } : line,
          )
        : [...current, { productId: product.id, quantity: 1 }];
    });
    setToast(`${product.name} added to checkout`);
  };

  return (
    <div className={styles.lionSite}>
      <LionHeader content={content} checkout />

      <main className={styles.productDetailMain}>
        <div className={styles.shell}>
          <Link href="/lion-ruo#catalog" className={styles.backLink}>← Back to catalog</Link>

          <div className={styles.productDetailGrid}>
            <section className={styles.productDetailMedia}>
              <ProductThumb image={product.image} name={product.name} />
              <span className={styles.purityBadge}>{product.purity} purity</span>
              {!product.inStock && <span className={styles.soldOutOverlay}>Sold out</span>}
            </section>

            <section className={styles.productDetailCopy}>
              <span className={styles.sectionEyebrow}>{product.category}</span>
              <h1>{product.name}</h1>
              <p className={styles.productDetailLead}>{product.longDescription}</p>

              <div className={styles.productDetailPriceRow}>
                <div>
                  <strong>{formatPrice(product)}</strong>
                  <span>{product.size}</span>
                </div>
                <span className={`${styles.stockPill} ${!product.inStock ? styles.stockPillSoldOut : lowStock ? styles.stockPillLow : ""}`}>
                  {!product.inStock
                    ? content.catalog.sold_out_label ?? "Sold out"
                    : lowStock
                      ? `${content.catalog.low_stock_label ?? "Low stock"} · ${product.stockQuantity} left`
                      : `${content.catalog.in_stock_label ?? "In stock"} · ${product.stockQuantity} available`}
                </span>
              </div>

              <button
                type="button"
                className={styles.productDetailAdd}
                onClick={addToCheckout}
                disabled={!canAdd}
              >
                <PlusIcon />
                {!product.inStock
                  ? content.catalog.sold_out_label ?? "Sold out"
                  : quantityInCart >= product.stockQuantity
                    ? "Maximum available quantity in checkout"
                    : "Add to Checkout"}
              </button>

              <dl className={styles.productDetailMeta}>
                <div><dt>Format</dt><dd>{product.format}</dd></div>
                <div><dt>Lot</dt><dd>{product.lotNumber}</dd></div>
                <div><dt>Purity</dt><dd>{product.purity}</dd></div>
                <div><dt>Storage</dt><dd>{product.storage}</dd></div>
              </dl>

              <div className={styles.productDetailActions}>
                {product.coaUrl ? (
                  <a href={product.coaUrl} target="_blank" rel="noreferrer" className={styles.secondaryButton}>
                    <CertificateIcon /> View Certificate of Analysis
                  </a>
                ) : (
                  <span className={styles.coaPending}><CertificateIcon /> COA link can be attached in WordPress</span>
                )}
              </div>
            </section>
          </div>

          <section className={styles.productResearchNotice}>
            <ShieldIcon />
            <div>
              <strong>Research Use Only</strong>
              <p>{content.footer.legal}</p>
            </div>
          </section>

          <section className={styles.productDetailTrust}>
            <div><CertificateIcon /><strong>Lot documentation</strong><span>COA and lot fields are managed per product.</span></div>
            <div><ShieldIcon /><strong>Inventory controlled</strong><span>Zero inventory automatically changes the product to Sold Out.</span></div>
            <div><FlaskIcon /><strong>CMS managed</strong><span>Descriptions, pricing, inventory and documentation can come from WordPress.</span></div>
          </section>
        </div>
      </main>

      <LionFooter content={content} checkout />

      <div className={`${styles.toast} ${toast ? styles.toastVisible : ""}`} role="status" aria-live="polite">
        {toast ?? ""}
      </div>
    </div>
  );
}
