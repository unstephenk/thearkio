import type { LegalPageDocument, SiteContentDocument } from "@/lib/lion-ruo/types";
import { ShieldIcon } from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];
type LegalContent = LegalPageDocument["acf"];

export function LionLegalPage({ content, page }: { content: SiteContent; page: LegalContent }) {

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

        <div className={styles.shell}>
          <div className={`${styles.reviewBanner} ${styles.legalReviewBanner}`}>
            <ShieldIcon />
            <div>
              <strong>Client review required before launch</strong>
              <span>{page.review_note}</span>
            </div>
          </div>
        </div>

        <section className={styles.legalPageSection}>
          <div className={`${styles.shell} ${styles.legalPageLayout}`}>
            <aside className={styles.legalSideNav} aria-label="Legal page sections">
              <span>Policies</span>
              {page.sections.map((section) => (
                <a href={`#${section.id}`} key={section.id}>{section.title}</a>
              ))}
            </aside>

            <div className={styles.legalSections}>
              {page.sections.map((section, index) => (
                <article id={section.id} className={styles.legalSection} key={section.id}>
                  <span className={styles.legalSectionNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items?.length ? (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LionFooter content={content} />
    </div>
  );
}
