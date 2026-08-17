import Link from "next/link";
import type { SiteContentDocument } from "@/lib/lion-ruo/types";
import { LionBrand } from "./lion-brand";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];

export function LionFooter({ content, checkout: _checkout = false }: { content: SiteContent; checkout?: boolean }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.shell}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrandColumn}>
            <LionBrand logoUrl={content.brand.logo_url} />
            <p>{content.footer.description}</p>
          </div>

          {content.footer.groups.map((group) => (
            <div key={group.heading} className={styles.footerColumn}>
              <h3>{group.heading}</h3>
              {group.links.map((link) => {
                const href = link.href.startsWith("#") ? `/lion-ruo${link.href}` : link.href;
                return (
                  <Link key={`${group.heading}-${link.label}`} href={href}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className={styles.footerColumn}>
            <h3>Connect</h3>
            <a href={`mailto:${content.footer.email}`}>{content.footer.email}</a>
            <span>{content.footer.instagram}</span>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Lion RUO Peptides. All rights reserved.</span>
          <span>{content.footer.legal}</span>
        </div>
      </div>
    </footer>
  );
}
