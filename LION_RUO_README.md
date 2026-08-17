# Lion RUO client preview — drop-in for The Ark

This folder contains the approved Lion RUO one-page storefront concept plus its separate checkout screen.

## Where it goes

Copy the contents of this package into the **root of your existing The Ark Next.js repo**.

It adds new files only; it does not replace your existing `/` homepage.

After copying, the preview routes are:

```text
https://theark.io/lion-ruo
https://theark.io/lion-ruo/info
https://theark.io/lion-ruo/contact
https://theark.io/lion-ruo/legal
https://theark.io/lion-ruo/products/{slug}
https://theark.io/lion-ruo/checkout
```

Both routes are configured `noindex` so this client preview does not become a searchable page on The Ark.

## Added project structure

```text
app/
  lion-ruo/
    _components/
      icons.tsx
      lion-brand.tsx
      lion-checkout.tsx
      lion-contact-page.tsx
      lion-footer.tsx
      lion-header.tsx
      lion-info-page.tsx
      lion-legal-page.tsx
      lion-product-detail.tsx
      lion-storefront.tsx
      product-thumb.tsx
    checkout/
      page.tsx
    contact/
      page.tsx
    info/
      page.tsx
    legal/
      page.tsx
    products/[slug]/
      page.tsx
    layout.tsx
    lion-ruo.module.css
    page.tsx

content/
  lion-ruo/
    products.json
    site-content.json
    faqs.json
    info-page.json
    contact-page.json
    legal-page.json

lib/
  lion-ruo/
    cart.ts
    content.ts
    types.ts

public/
  client-previews/
    lion-ruo/
      lion-ruo-logo.png
      nad-500mg.webp
      glow-70mg.webp
```

## Current behavior

- One-page homepage
- 3 catalog cards per row on desktop
- 9 products per catalog page (3 rows)
- Pagination under catalog
- Product descriptions on homepage cards
- Add-to-checkout buttons persist with `localStorage`
- Header checkout count updates immediately
- Separate checkout route
- Checkout order summary includes product descriptions
- Checkout form does not collect payment
- Without an order endpoint, submit is simulated for the client preview
- Responsive 3 → 2 → 1 column product layout
- Client-supplied Lion logo, NAD+ photo, and Glow photo included
- Products without supplied photography use a neutral branded vial placeholder

## Run it

From the existing The Ark repo:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000/lion-ruo
```

Before pushing:

```bash
pnpm build
```

## WordPress

See `WORDPRESS_MAPPING.md`.

The JSON is deliberately shaped like WordPress REST responses with ACF fields so you can replace static JSON with headless WordPress later without rebuilding the React components.

## Important launch note

The product names, prices, purity values, lot numbers, testing statements, legal language, contact information, and compliance claims in this preview are sample/client-concept content. They must be replaced or approved by the client before any production launch.

## Newsletter / 10% first-order offer

The homepage includes a CMS-driven email signup section immediately before the footer. Its heading, description, placeholder, button label, and status copy live in `content/lion-ruo/site-content.json` under `acf.newsletter`.

For the preview, the form shows a successful state without transmitting data when no endpoint is configured. To connect it later, set:

```bash
NEXT_PUBLIC_LION_NEWSLETTER_ENDPOINT=https://client-domain.com/wp-json/lion/v1/newsletter
```

The browser will POST:

```json
{
  "email": "researcher@example.com",
  "source": "lion-ruo-homepage",
  "offer": "10-percent-first-order"
}
```

The endpoint can be a custom WordPress REST route, an email marketing platform proxy, or another client-approved subscriber workflow.

## Next-pass features: inventory, product pages, age gate

This package now adds:

- WordPress-shaped `stock_quantity` and `low_stock_threshold` fields on every product.
- Automatic **Sold out** behavior when inventory reaches zero.
- Low-stock messaging when quantity reaches the configured threshold.
- Per-product pages at `/lion-ruo/products/[slug]`.
- A site-wide configurable age-confirmation modal for all `/lion-ruo` routes.
- Checkout inventory validation so a stale cart cannot submit a product that is now sold out or above the available quantity.

### Important production behavior

The preview does **not** automatically decrement inventory when an order request is submitted. That is intentional because the current checkout does not collect payment. In production, inventory should be reduced/reserved only after the client's chosen order-confirmation/payment workflow defines when an order becomes committed.

### Age gate

The age gate currently uses a sample minimum age of `18` from `site-content.json`. This should be changed to the client's approved minimum age and final wording before launch.

## Supporting pages: Info, Contact, Legal

The client-requested subpages are now built:

```text
http://localhost:3000/lion-ruo/info
http://localhost:3000/lion-ruo/contact
http://localhost:3000/lion-ruo/legal
```

The top navigation now uses **Catalog / Info / Contact**. Legal and policy links live in the footer so the main navigation stays compact.

### Info

Includes structured sections for About, Quality & Testing, COAs, Storage & Handling, Shipping & Fulfillment, and Research Use Only. Copy is separated into `content/lion-ruo/info-page.json` so it maps naturally to a WordPress Page.

### Contact

Includes a real contact form layout with topic selection, optional order number, direct email information, order guidance, and wholesale/bulk routing. Without an endpoint configured, preview submission is simulated.

Production endpoint:

```bash
NEXT_PUBLIC_LION_CONTACT_ENDPOINT=https://client-domain.com/wp-json/lion/v1/contact
```

Use the endpoint to keep Resend credentials server-side rather than exposing an API key in the browser.

### Legal

Includes permanent anchored sections for Research Use Only, Terms, Privacy, Shipping, and Returns. The included wording is explicitly preview copy and must be replaced/approved by the client before launch.

The global age gate automatically covers these routes because it lives in the `/lion-ruo` layout.
