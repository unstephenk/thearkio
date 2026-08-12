# Fifth-pass changelog

## Production hardening

- Added `next.config.ts` with conservative production security headers:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - strict-origin referrer policy
  - camera/microphone/geolocation permission restrictions
  - same-origin opener policy
- Disabled the framework `X-Powered-By` response header.
- Contact API responses now use `Cache-Control: no-store`.
- Contact body size is checked after reading the body as well as via `Content-Length`.
- JSON body shape is explicitly validated before field processing.
- Resend messages now include a formatted HTML email plus a plain-text fallback.

## Form UX

- Website field accepts `business.com` instead of requiring visitors to type the protocol.
- Server normalizes website entries to a safe HTTP(S) URL.
- Project details require at least 20 characters client- and server-side.
- Email and website fields disable inappropriate capitalization/spellcheck behavior on mobile.
- Success/error feedback receives focus after submission and uses appropriate live-region roles.

## SEO / discovery

- FAQ content now lives in shared typed content and feeds both the visible accordion and FAQPage JSON-LD.
- Added stable entity IDs and richer ProfessionalService / Service / WebSite relationships.
- Added contact point and areas/skills to service structured data.
- Added app category, explicit icon metadata, format-detection controls, and Googlebot preview directives.
- API routes are explicitly disallowed in `robots.txt`.
- Removed constantly-changing sitemap `lastModified` output.

## Accessibility / responsive

- FAQ answer regions are associated with their controlling buttons.
- Mobile-menu focus restoration now checks that the menu button is actually visible before focusing it.
- Retained all approved mobile fixes from earlier passes, including opaque menu layering, in-flow project phone mockup, and contained footer wordmark.

## Workflow

- Added `DEPLOYMENT_CHECKLIST.md` describing the next phase from local runtime through GitHub, Vercel, Resend, domain cutover, Search Console, and first-week QA.

## Sixth pass — brand system
- Locked the standalone geometric **A** mark; removed the discontinued `TA` direction from implementation.
- Added light, dark, and gold SVG logo assets.
- Added production favicon, Apple touch icon, 512px app icon, and social avatar assets.
- Added reusable `BrandLockup` component and integrated it into the header.
- Added a small A signature to the footer while preserving the approved oversized `The Ark` wordmark.
- Updated Open Graph artwork to use the finalized A mark.
- Updated metadata and manifest icon references.
- Added `BRAND_GUIDE.md` with usage rules and asset inventory.
