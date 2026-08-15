"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { readCart, writeCart } from "@/lib/lion-ruo/cart";
import type { CartLine, Product, SiteContentDocument } from "@/lib/lion-ruo/types";
import { CertificateIcon, FlaskIcon, LockIcon, ShieldIcon, SparkIcon } from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import { ProductThumb } from "./product-thumb";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];

type Props = {
  products: Product[];
  content: SiteContent;
};

type DetailedLine = CartLine & {
  product: Product;
};

const formatMoney = (value: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);

export function LionCheckout({ products, content }: Props) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCart(readCart());
    setHydrated(true);
  }, []);

  const lines: DetailedLine[] = useMemo(
    () =>
      cart.flatMap((line) => {
        const product = products.find((item) => item.id === line.productId);
        return product ? [{ ...line, product }] : [];
      }),
    [cart, products],
  );

  const total = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const currency = lines[0]?.product.currency ?? "USD";

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lines.length || submitting) return;

    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      customer: {
        fullName: String(form.get("fullName") ?? ""),
        email: String(form.get("email") ?? ""),
        shippingAddress: String(form.get("shippingAddress") ?? ""),
        notes: String(form.get("notes") ?? ""),
      },
      items: lines.map((line) => ({
        productId: line.product.id,
        slug: line.product.slug,
        name: line.product.name,
        size: line.product.size,
        quantity: line.quantity,
        unitPrice: line.product.price,
        currency: line.product.currency,
      })),
      total,
      currency,
      source: "theark-lion-ruo-preview",
    };

    try {
      const endpoint = process.env.NEXT_PUBLIC_LION_ORDER_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("The order endpoint returned an error.");
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 500));
        console.info("Lion RUO preview order payload", payload);
      }

      writeCart([]);
      setCart([]);
      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError("The preview could not submit this order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.lionSite}>
      <LionHeader content={content} checkout />

      <main className={styles.checkoutMain}>
        <div className={styles.shell}>
          {!hydrated ? (
            <section className={styles.checkoutSuccess}>
              <span className={styles.sectionEyebrow}>Checkout</span>
              <h1>Loading your checkout…</h1>
            </section>
          ) : submitted ? (
            <section className={styles.checkoutSuccess}>
              <span className={styles.sectionEyebrow}>Preview confirmation</span>
              <h1>{content.checkout.success_heading}</h1>
              <p>{content.checkout.success_text}</p>
              <Link href="/lion-ruo#catalog" className={styles.primaryButton}>
                Return to catalog
              </Link>
            </section>
          ) : lines.length === 0 ? (
            <section className={styles.checkoutSuccess}>
              <span className={styles.sectionEyebrow}>Checkout</span>
              <h1>Your checkout list is empty.</h1>
              <p>Add products from the catalog first, then come back here to review the request.</p>
              <Link href="/lion-ruo#catalog" className={styles.primaryButton}>
                Browse catalog
              </Link>
            </section>
          ) : (
            <div className={styles.checkoutGrid}>
              <section>
                <span className={styles.sectionEyebrow}>Order request</span>
                <h1 className={styles.checkoutTitle}>{content.checkout.heading}</h1>

                <form className={styles.checkoutForm} onSubmit={submitOrder}>
                  <label>
                    Full name
                    <input name="fullName" type="text" autoComplete="name" required placeholder="Enter your full name" />
                  </label>
                  <label>
                    Email
                    <input name="email" type="email" autoComplete="email" required placeholder="Enter your email address" />
                  </label>
                  <label>
                    Shipping address
                    <textarea
                      name="shippingAddress"
                      rows={4}
                      autoComplete="street-address"
                      required
                      placeholder="Enter your shipping address"
                    />
                  </label>
                  <label>
                    Order notes <span>(optional)</span>
                    <textarea name="notes" rows={3} placeholder="Add any notes for your order" />
                  </label>

                  {error && <p className={styles.formError} role="alert">{error}</p>}

                  <button className={styles.placeOrderButton} type="submit" disabled={submitting}>
                    <span>{submitting ? "Submitting…" : content.checkout.submit_label}</span>
                    <LockIcon className={styles.buttonIcon} />
                  </button>
                  <p className={styles.paymentNote}>
                    <LockIcon />
                    {content.checkout.payment_note}
                  </p>
                </form>
              </section>

              <aside className={styles.orderSummary}>
                <h2>Order Summary</h2>
                <div className={styles.orderLines}>
                  {lines.map((line) => (
                    <article className={styles.orderLine} key={line.productId}>
                      <ProductThumb image={line.product.image} name={line.product.name} compact />
                      <div className={styles.orderLineCopy}>
                        <strong>{line.product.name}</strong>
                        <span>{line.product.size}</span>
                        <p>{line.product.description}</p>
                      </div>
                      <span className={styles.orderQty}>× {line.quantity}</span>
                      <strong className={styles.orderPrice}>
                        {formatMoney(line.product.price * line.quantity, line.product.currency)}
                      </strong>
                    </article>
                  ))}
                </div>

                <div className={styles.summaryTotals}>
                  <div><span>Subtotal</span><strong>{formatMoney(total, currency)}</strong></div>
                  <div><span>Shipping</span><strong>—</strong></div>
                  <div className={styles.grandTotal}><span>Total</span><strong>{formatMoney(total, currency)}</strong></div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <section className={styles.checkoutTrust} aria-label="Order quality highlights">
        <div className={`${styles.shell} ${styles.trustGrid}`}>
          <div className={styles.trustItem}><ShieldIcon className={styles.trustIcon} /><div><strong>Batch-tested</strong><span>Lot-specific data fields</span></div></div>
          <div className={styles.trustItem}><CertificateIcon className={styles.trustIcon} /><div><strong>Certificate of Analysis</strong><span>Product-level COA support</span></div></div>
          <div className={styles.trustItem}><SparkIcon className={styles.trustIcon} /><div><strong>Purity</strong><span>Displayed per product</span></div></div>
          <div className={styles.trustItem}><FlaskIcon className={styles.trustIcon} /><div><strong>Research Use Only</strong><span>Not for human consumption</span></div></div>
        </div>
      </section>

      <LionFooter content={content} checkout />
    </div>
  );
}
