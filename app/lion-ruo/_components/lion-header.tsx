"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartCount, readCart } from "@/lib/lion-ruo/cart";
import type { SiteContentDocument } from "@/lib/lion-ruo/types";
import { CartIcon } from "./icons";
import { LionBrand } from "./lion-brand";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];

export function LionHeader({ content, checkout = false }: { content: SiteContent; checkout?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const refresh = () => setCount(cartCount(readCart()));
    refresh();
    window.addEventListener("lion-cart-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("lion-cart-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.shell}>
        <div className={styles.navbar}>
          <LionBrand logoUrl={content.brand.logo_url} />

          <nav className={styles.navLinks} aria-label="Lion RUO navigation">
            {content.navigation.map((item) => (
              <Link
                key={item.label}
                href={checkout ? `/lion-ruo${item.href}` : item.href}
                className={styles.navLink}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="/lion-ruo/checkout" className={styles.checkoutButton}>
            <span>Checkout ({count})</span>
            <CartIcon className={styles.buttonIcon} />
          </Link>
        </div>
      </div>
    </header>
  );
}
