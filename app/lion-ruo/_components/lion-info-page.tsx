import Link from "next/link";
import type { InfoPageDocument, SiteContentDocument } from "@/lib/lion-ruo/types";
import { CertificateIcon, FlaskIcon, ShieldIcon, SparkIcon } from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];
type InfoContent = InfoPageDocument["acf"];

const icons = [ShieldIcon, CertificateIcon, SparkIcon, FlaskIcon];

export function LionInfoPage({ content, page }: { content: SiteContent; page: InfoContent }) {

  return (
    <div className={styles.lionSite}>
      <LionHeader content={content} />

      <main>
        <section className={styles.internalHero}>
          <div className={styles.internalHeroGlow} aria-hidden="true" />
          <div className={styles.shell}>
            <span className={styles.sectionEyebrow}>{page.eyebrow}</span>
            <h1>{page.heading}</h1>
            <p>{page.intro}</p>
          </div>
        </section>

        {page.review_note && (
          <div className={styles.shell}>
            <div className={styles.reviewBanner}>
              <strong>Preview copy</strong>
              <span>{page.review_note}</span>
            </div>
          </div>
        )}

        <section className={styles.infoPageSection}>
          <div className={`${styles.shell} ${styles.infoPageLayout}`}>
            <aside className={styles.infoSideNav} aria-label="Information page sections">
              <span>On this page</span>
              {page.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>{section.title}</a>
              ))}
            </aside>

            <div className={styles.infoSections}>
              {page.sections.map((section, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <article id={section.id} className={styles.infoSectionCard} key={section.id}>
                    <div className={styles.infoSectionIcon}><Icon /></div>
                    <div>
                      <span className={styles.infoSectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                      <h2>{section.title}</h2>
                      <p>{section.description}</p>
                      {section.items?.length ? (
                        <ul>
                          {section.items.map((item) => <li key={item}>{item}</li>)}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.pageCtaBand}>
          <div className={`${styles.shell} ${styles.pageCtaInner}`}>
            <div>
              <span className={styles.sectionEyebrow}>Need something specific?</span>
              <h2>Questions about documentation, orders, or the catalog?</h2>
            </div>
            <Link href="/lion-ruo/contact" className={styles.primaryButton}>Contact Lion RUO →</Link>
          </div>
        </section>
      </main>

      <LionFooter content={content} />
    </div>
  );
}
