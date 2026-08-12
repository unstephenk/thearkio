# The Ark — deployment checklist

This is the next phase after the fifth-pass code is approved.

## 1. Run the real app locally

```bash
pnpm install
pnpm dev
```

Then test `http://localhost:3000` on desktop and on a phone connected to the same network, or use browser device emulation for a first pass.

Before moving on:

- hero buttons and mobile navigation behave correctly
- every anchor lands below the fixed header
- Jake Groves showcase is aligned at phone/tablet/desktop widths
- FAQ opens and closes with mouse and keyboard
- project form validates cleanly
- no horizontal scrolling occurs at narrow widths

## 2. Put the project in GitHub

Create a repository for The Ark and push this project as the initial production candidate. From this point forward, use branches / pull requests for meaningful changes so Vercel can create preview deployments before production changes go live.

## 3. Create the Vercel project

Import the GitHub repository into Vercel and deploy it to a temporary Vercel preview/production URL before touching `theark.io` DNS.

Add these environment variables in Vercel:

```text
RESEND_API_KEY=
CONTACT_TO_EMAIL=Stephen@theark.io
CONTACT_FROM_EMAIL=The Ark <projects@theark.io>
```

## 4. Configure email delivery

Verify `theark.io` with Resend, create the sending identity used by `CONTACT_FROM_EMAIL`, then add the real API key to Vercel.

Test all of these cases on the live preview deployment:

- normal valid project inquiry
- website entered as `business.com`
- website entered as `https://business.com`
- missing required field
- invalid email
- short project description
- Resend failure/fallback behavior
- reply to the received message and confirm it replies to the prospect, not the sending address

## 5. Real-device QA

Test the Vercel URL on at least:

- Samsung / Chrome
- iPhone / Safari if available
- desktop Chrome
- desktop Edge
- desktop Safari if available

Check 360px, 390px, 430px, tablet, laptop, and wide desktop layouts.

## 6. Final brand/content pass

Before production DNS:

- decide whether the typography-only `The Ark` wordmark is final
- replace stylized Jake Groves project imagery with approved real screenshots if desired
- proofread all copy
- confirm the exact Ark Care wording
- confirm the contact email mailbox is live and monitored
- decide whether a formal privacy notice is needed before launch

## 7. Connect the domain

Only after the Vercel deployment is approved:

- make `theark.io` the public marketing site
- move the existing Mission Control product to `app.theark.io` if that remains the desired architecture
- add the Vercel DNS records / nameservers required for the selected setup
- verify `https://theark.io`, redirects, SSL, and `www` behavior

## 8. Search + analytics launch

After production is live:

- verify Vercel Analytics and Speed Insights are receiving data
- add `https://theark.io` to Google Search Console
- submit `https://theark.io/sitemap.xml`
- inspect the live URL in Search Console
- confirm robots and canonical metadata resolve to the production domain
- validate structured data

## 9. First-week launch check

During the first week:

- submit a real test lead each day for the first few days
- watch for form failures
- check mobile layout on real traffic devices
- review Core Web Vitals / Speed Insights
- fix any copy or interaction friction found from actual use

After this checklist, the site is in normal production/iteration mode rather than active build mode.
