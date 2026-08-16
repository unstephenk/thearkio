"use client";

import { FormEvent, useState } from "react";
import type { SiteContentDocument } from "@/lib/lion-ruo/types";
import styles from "../lion-ruo.module.css";

type NewsletterContent = SiteContentDocument["acf"]["newsletter"];

type Props = {
  content: NewsletterContent;
};

type Status = "idle" | "submitting" | "success" | "error";

export function LionNewsletter({ content }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submitNewsletter = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    setStatus("submitting");
    setMessage("");

    try {
      const endpoint = process.env.NEXT_PUBLIC_LION_NEWSLETTER_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: normalizedEmail,
            source: "lion-ruo-homepage",
            offer: "10-percent-first-order",
          }),
        });

        if (!response.ok) {
          throw new Error("Newsletter signup failed");
        }
      }

      setStatus("success");
      setMessage(content.success_text);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(content.error_text);
    }
  };

  return (
    <section className={styles.newsletterSection} aria-labelledby="lion-newsletter-heading">
      <div className={styles.newsletterGlow} aria-hidden="true" />
      <div className={`${styles.shell} ${styles.newsletterInner}`}>
        <h2 id="lion-newsletter-heading">{content.heading}</h2>
        <p>{content.description}</p>

        <form className={styles.newsletterForm} onSubmit={submitNewsletter}>
          <label className={styles.srOnly} htmlFor="lion-newsletter-email">
            Email address
          </label>
          <input
            id="lion-newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            placeholder={content.placeholder}
            onChange={(event) => setEmail(event.target.value)}
            disabled={status === "submitting"}
          />
          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Joining…" : content.submit_label}
          </button>
        </form>

        <div
          className={`${styles.newsletterStatus} ${
            status === "error" ? styles.newsletterError : ""
          }`}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      </div>
    </section>
  );
}
