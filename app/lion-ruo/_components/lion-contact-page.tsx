"use client";

import { useState, type FormEvent } from "react";
import type { ContactPageDocument, SiteContentDocument } from "@/lib/lion-ruo/types";
import { CertificateIcon, FlaskIcon, ShieldIcon } from "./icons";
import { LionFooter } from "./lion-footer";
import { LionHeader } from "./lion-header";
import styles from "../lion-ruo.module.css";

type SiteContent = SiteContentDocument["acf"];
type ContactContent = ContactPageDocument["acf"];

type Status = "idle" | "sending" | "success" | "error";

export function LionContactPage({ content, page }: { content: SiteContent; page: ContactContent }) {
  const [status, setStatus] = useState<Status>("idle");

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      topic: String(form.get("topic") ?? "General question"),
      orderNumber: String(form.get("orderNumber") ?? ""),
      message: String(form.get("message") ?? ""),
      source: "lion-ruo-contact",
    };

    try {
      const endpoint = process.env.NEXT_PUBLIC_LION_CONTACT_ENDPOINT;
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Contact request failed");
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 450));
      }

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

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

        <section className={styles.contactPageSection}>
          <div className={`${styles.shell} ${styles.contactPageGrid}`}>
            <div className={styles.contactFormCard}>
              <div className={styles.contactCardHeading}>
                <span className={styles.sectionEyebrow}>Send a message</span>
                <h2>How can we help?</h2>
              </div>

              {status === "success" ? (
                <div className={styles.contactSuccess} role="status">
                  <ShieldIcon />
                  <h3>Message received</h3>
                  <p>{page.success_text}</p>
                  <button type="button" onClick={() => setStatus("idle")}>Send another message</button>
                </div>
              ) : (
                <form className={styles.contactForm} onSubmit={submitContact}>
                  <div className={styles.formRow}>
                    <label>
                      <span>Name</span>
                      <input name="name" type="text" autoComplete="name" required />
                    </label>
                    <label>
                      <span>Email</span>
                      <input name="email" type="email" autoComplete="email" required />
                    </label>
                  </div>

                  <div className={styles.formRow}>
                    <label>
                      <span>Topic</span>
                      <select name="topic" defaultValue="General question">
                        {page.topics.map((topic) => <option key={topic}>{topic}</option>)}
                      </select>
                    </label>
                    <label>
                      <span>Order # <em>optional</em></span>
                      <input name="orderNumber" type="text" />
                    </label>
                  </div>

                  <label>
                    <span>Message</span>
                    <textarea name="message" rows={7} required />
                  </label>

                  {status === "error" && <p className={styles.formError}>{page.error_text}</p>}

                  <button className={styles.contactSubmit} type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            <aside className={styles.contactInfoColumn}>
              <div className={styles.contactInfoCard}>
                <CertificateIcon />
                <span>General contact</span>
                <a href={`mailto:${page.email}`}>{page.email}</a>
                <p>{page.response_note}</p>
              </div>
              <div className={styles.contactInfoCard}>
                <FlaskIcon />
                <span>Order questions</span>
                <p>Include your order number when available so the request can be matched quickly.</p>
              </div>
              <div className={styles.contactInfoCard}>
                <ShieldIcon />
                <span>Wholesale / bulk</span>
                <p>Choose Wholesale / bulk in the form and include the products and quantities you are asking about.</p>
              </div>
              <div className={styles.researchOnlyNote}>
                <strong>Research Use Only</strong>
                <p>{content.footer.legal}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <LionFooter content={content} />
    </div>
  );
}
