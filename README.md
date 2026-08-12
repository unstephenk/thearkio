# The Ark — fifth-pass landing page

Single-page marketing site for **The Ark**, a Dallas–Fort Worth web-design studio focused on custom landing pages for small businesses.

## Stack

- Next.js 16 / App Router
- React 19 + TypeScript
- Tailwind CSS 4 + custom editorial design system
- Motion for React
- Vercel Web Analytics
- Vercel Speed Insights
- Vercel-ready contact API using Resend

## Fifth-pass focus

This is the final pre-deployment development pass. It keeps the approved design intact and concentrates on production readiness.

- FAQ content moved to shared typed content and exposed as FAQPage structured data
- More complete ProfessionalService / Service / WebSite structured data
- Cleaner crawler controls, sitemap behavior, metadata, icon declaration, and Googlebot preview directives
- Production security headers and removal of the `X-Powered-By` header
- Contact form accepts friendly website input such as `business.com` and normalizes it safely server-side
- Project description now has a minimum useful length on both client and server
- Form success/error messages receive focus and use appropriate live-region behavior
- Email submissions now send both plain-text and formatted HTML versions
- Contact API enforces its payload limit even when `Content-Length` is missing
- No-store responses for the contact endpoint
- Mobile navigation focus restoration avoids trying to focus a hidden desktop breakpoint control
- All fourth-pass mobile visual fixes retained, including the contained footer wordmark

## Run locally

```bash
pnpm install
pnpm dev
```

Then open `http://localhost:3000`.

`npm install && npm run dev` works too.

## Contact form

Copy `.env.example` to `.env.local` and add a Resend API key after `theark.io` is verified with Resend.

```bash
cp .env.example .env.local
```

In development, if `RESEND_API_KEY` is missing, the API logs the submission to the server console and returns success so the UI can still be tested.

Default destination:

```text
Stephen@theark.io
```

## What happens next

The build phase is now followed by a **deployment + real-device QA phase** rather than another design pass by default.

See [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) for the exact sequence:

1. install and run the real Next.js app locally
2. push to GitHub
3. deploy a Vercel preview
4. configure and test Resend
5. test real phones/desktops
6. finish brand assets and real Jake screenshots if desired
7. connect `theark.io`
8. configure Search Console / analytics
9. watch the first week of production traffic

## Locked decisions

- Brand: **The Ark**
- Primary CTA: **Start a Project**
- No public pricing
- Primary audience: small businesses
- Initial geographic focus: Dallas–Fort Worth
- Service areas: Dallas, Richardson, Plano, Garland, Fort Worth, DFW
- Featured real client: Jake Groves Music
- Jake project scope: strategy, design, development, WordPress integration, SEO
- Typical landing-page build: about one week after requirements/content/assets are ready
- Ongoing maintenance offer: **Ark Care**

## Still intentionally open

- Final logo/brand mark; typography-only wordmark remains the default
- Final premium font selection
- Approved real Jake Groves screenshots vs. the stylized project mockup
- First concept-project vertical after launch
- Exact Ark Care pricing, which remains private

## Brand assets
The finalized brand system is documented in `BRAND_GUIDE.md`. All production-ready logo and icon assets live in `public/brand/`. The approved icon is the standalone geometric **A**; the earlier `TA` monogram is not used.
