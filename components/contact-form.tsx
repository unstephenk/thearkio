"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

type ErrorResponse = {
  error?: string;
};

const nextSteps = [
  ["01", "I review the details", "I look at the business, goal, timing, and what the page needs to do."],
  ["02", "I reply directly", "No sales handoff. You hear back from the person who would design and build it."],
  ["03", "You get a clear scope", "If it looks like a fit, I outline the work, timeline, and price before anything starts."],
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      statusRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as ErrorResponse;
        throw new Error(data.error || "Unable to send your project details right now.");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Unable to send your project details right now.",
      );
      setStatus("error");
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-busy={status === "sending"}
      onChange={() => {
        if (status === "error") {
          setStatus("idle");
          setErrorMessage("");
        }
      }}
    >
      <div className="form-intro">
        <span>Project inquiry</span>
        <p>No obligation. Share what you know so far—even if the idea is still rough.</p>
      </div>

      <div className="form-next-steps" aria-label="What happens after you submit a project inquiry">
        {nextSteps.map(([number, title, body]) => (
          <div className="form-next-step" key={title}>
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <div className="form-row">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={200} placeholder="you@business.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Business *</span>
          <input name="business" autoComplete="organization" required maxLength={160} placeholder="Business name" />
        </label>
        <label>
          <span>Current website</span>
          <input name="website" type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={500} placeholder="yourbusiness.com" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Main goal *</span>
          <select name="goal" required defaultValue="">
            <option value="" disabled>Select a goal</option>
            <option value="Get more calls or leads">Get more calls or leads</option>
            <option value="Book appointments">Book appointments</option>
            <option value="Look more established">Look more established</option>
            <option value="Launch a new business">Launch a new business</option>
            <option value="Replace an outdated site">Replace an outdated site</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label>
          <span>Timeline *</span>
          <select name="timeline" required defaultValue="">
            <option value="" disabled>Select a timeline</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within 2–4 weeks">Within 2–4 weeks</option>
            <option value="Within 1–2 months">Within 1–2 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
      </div>
      <label>
        <span>Tell me about the project *</span>
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          placeholder="What does your business do? What should the site help customers understand or do?"
        />
      </label>
      <input className="hp-field" name="companyFax" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="form-actions">
        <button
          className="button button-light form-submit"
          type="submit"
          disabled={status === "sending" || status === "success"}
        >
          {status === "sending" ? "Sending…" : status === "success" ? "Project Sent" : "Send Project Details"}
          <span aria-hidden="true">→</span>
        </button>
        <span className="form-privacy">Your information is only used to respond to this inquiry.</span>
      </div>
      <div
        ref={statusRef}
        className={`form-status ${status === "success" ? "is-success" : status === "error" ? "is-error" : ""}`}
        role={status === "error" ? "alert" : "status"}
        aria-live={status === "error" ? "assertive" : "polite"}
        tabIndex={-1}
      >
        {status === "success" && (
          <div>
            <strong>Project received.</strong>
            <p>Thanks — your details are on their way. I’ll review them and reply directly.</p>
          </div>
        )}
        {status === "error" && (
          <div>
            <strong>Something went wrong.</strong>
            <p>
              {errorMessage} You can also email me directly at{" "}
              <a href="mailto:Stephen@theark.io">Stephen@theark.io</a>.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
