import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_REQUEST_SIZE = 25_000;
const ALLOWED_GOALS = new Set([
  "Get more calls or leads",
  "Book appointments",
  "Look more established",
  "Launch a new business",
  "Replace an outdated site",
  "Not sure yet",
]);
const ALLOWED_TIMELINES = new Set([
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–2 months",
  "Flexible",
]);

function json(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeWebsite(value: string) {
  if (!value) return "";
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  const parsed = new URL(candidate);
  if (!/^https?:$/.test(parsed.protocol) || !parsed.hostname.includes(".")) {
    throw new Error("Invalid website URL");
  }
  return parsed.toString();
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    if (!isSameOrigin(request)) {
      return json({ error: "Invalid request origin" }, 403);
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return json({ error: "Unsupported request type" }, 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > MAX_REQUEST_SIZE) {
      return json({ error: "Request too large" }, 413);
    }

    const rawBody = await request.text();
    if (!rawBody || rawBody.length > MAX_REQUEST_SIZE) {
      return json({ error: rawBody ? "Request too large" : "Invalid request" }, rawBody ? 413 : 400);
    }

    let body: Record<string, unknown>;
    try {
      const parsed = JSON.parse(rawBody) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
      body = parsed as Record<string, unknown>;
    } catch {
      return json({ error: "Invalid request" }, 400);
    }

    if (body.companyFax) {
      return json({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 200).toLowerCase();
    const business = clean(body.business, 160);
    const websiteInput = clean(body.website, 500);
    const goal = clean(body.goal, 120);
    const timeline = clean(body.timeline, 120);
    const message = clean(body.message, 4000);

    if (
      !name ||
      !business ||
      message.length < 20 ||
      !EMAIL_RE.test(email) ||
      !ALLOWED_GOALS.has(goal) ||
      !ALLOWED_TIMELINES.has(timeline)
    ) {
      return json({ error: "Please check the required fields and try again." }, 400);
    }

    let website = "";
    if (websiteInput) {
      try {
        website = normalizeWebsite(websiteInput);
      } catch {
        return json({ error: "Please enter a valid website, such as yourbusiness.com." }, 400);
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "Stephen@theark.io";
    const from = process.env.CONTACT_FROM_EMAIL ?? "The Ark <projects@theark.io>";

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business: ${business}`,
      `Website: ${website || "Not provided"}`,
      `Main goal: ${goal}`,
      `Timeline: ${timeline}`,
      "",
      "Project details:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111;line-height:1.55">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#666;margin:0 0 10px">The Ark · Project inquiry</p>
        <h1 style="font-size:28px;line-height:1.15;margin:0 0 28px">${escapeHtml(business)}</h1>
        <table role="presentation" style="border-collapse:collapse;width:100%;margin-bottom:28px">
          <tr><td style="padding:7px 12px 7px 0;color:#666;width:120px">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="padding:7px 12px 7px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
          <tr><td style="padding:7px 12px 7px 0;color:#666">Website</td><td>${website ? `<a href="${escapeHtml(website)}">${escapeHtml(website)}</a>` : "Not provided"}</td></tr>
          <tr><td style="padding:7px 12px 7px 0;color:#666">Goal</td><td>${escapeHtml(goal)}</td></tr>
          <tr><td style="padding:7px 12px 7px 0;color:#666">Timeline</td><td>${escapeHtml(timeline)}</td></tr>
        </table>
        <p style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#666;margin:0 0 8px">Project details</p>
        <div style="white-space:pre-wrap;border-top:1px solid #ddd;padding-top:18px">${escapeHtml(message)}</div>
      </div>`;

    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.info("[The Ark contact form]", { name, email, business, website, goal, timeline, message });
        return json({ ok: true, development: true });
      }
      return json({ error: "The contact form is temporarily unavailable." }, 503);
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "The-Ark-Contact-Form/1.1",
      },
      signal: AbortSignal.timeout(10_000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New project inquiry — ${cleanHeader(business)}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Resend error", response.status, error.slice(0, 1000));
      return json({ error: "The contact form is temporarily unavailable." }, 502);
    }

    return json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return json({ error: "The contact form timed out. Please try again." }, 504);
    }
    console.error("Contact form error", error);
    return json({ error: "Invalid request" }, 400);
  }
}
