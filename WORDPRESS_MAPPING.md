# Lion RUO → WordPress content mapping

This preview intentionally keeps the UI independent from the CMS. Today it reads static JSON. Later, the same mapper can read the equivalent WordPress REST responses.

## Recommended WordPress model

### 1. `peptide_product` custom post type
Register a custom post type with `show_in_rest => true`.

REST endpoint:

```text
/wp-json/wp/v2/peptide_product?per_page=100
```

Recommended ACF fields (set the ACF field group to show in REST):

| ACF field | Type | Example |
|---|---|---|
| `product_category` | Text / taxonomy | `Cellular` |
| `size` | Text | `500mg` |
| `purity` | Text | `≥99.9%` |
| `price` | Number | `89.99` |
| `currency` | Select/Text | `USD` |
| `lot_number` | Text | `LR-NAD-2608` |
| `storage` | Text | Storage language from client |
| `format` | Text | `Lyophilized powder` |
| `image_url` | Image, return format URL | WordPress media URL |
| `coa_url` | File/URL | PDF or COA page |
| `featured` | True/False | `true` |

Use the WordPress post title for the product name and the excerpt for the short catalog description.

### 2. Homepage content
Create a WordPress Page with slug:

```text
lion-home
```

REST endpoint:

```text
/wp-json/wp/v2/pages?slug=lion-home
```

Add an ACF field group containing the sections represented in `content/lion-ruo/site-content.json`:

- brand
- navigation
- hero
- trust_items
- catalog
- verification_cards
- checkout
- footer

This lets the client update headline copy, CTA text, footer content, verification text, and checkout language without touching React.

### 3. `faq` custom post type
Register an FAQ custom post type with `show_in_rest => true`.

REST endpoint:

```text
/wp-json/wp/v2/faq?per_page=100&orderby=menu_order&order=asc
```

Use:

- post title → question
- `acf.answer` → answer
- `menu_order` → display order

## Swapping JSON for live WordPress

`lib/lion-ruo/content.ts` is deliberately the only place that maps WordPress-shaped records into the React-friendly `Product` and `Faq` objects.

When WordPress is ready, replace the JSON imports with `fetch()` calls in that file. The UI components should not need to change.

Example direction:

```ts
const base = process.env.WORDPRESS_API_URL;

const products = await fetch(
  `${base}/wp-json/wp/v2/peptide_product?per_page=100`,
  { next: { revalidate: 60 } },
).then((response) => response.json());
```

For an ACF Image field, set its REST return format to URL if you want to keep the current `acf.image_url` shape. Otherwise map the WordPress Media ID or `_embed` response inside `content.ts`.

## Checkout integration

The preview checkout stores its selected items in `localStorage` and does **not** collect payment.

If this remains an order/request workflow, configure:

```text
NEXT_PUBLIC_LION_ORDER_ENDPOINT=https://example.com/wp-json/lion/v1/order
```

The checkout will POST JSON to that endpoint. A custom WordPress REST route can then:

1. validate the request,
2. save it as an order/request custom post,
3. email the client,
4. return a success response.

Do not place WordPress administrator credentials or secret API keys in `NEXT_PUBLIC_*` variables. The custom WordPress endpoint should implement its own validation, anti-spam controls, and authorization model.

## Newsletter fields

Add an ACF group to the `lion-home` page for:

- `newsletter.heading`
- `newsletter.description`
- `newsletter.placeholder`
- `newsletter.submit_label`
- `newsletter.success_text`
- `newsletter.error_text`

The signup destination is intentionally separate from content retrieval. A custom WordPress REST endpoint such as `/wp-json/lion/v1/newsletter` can accept the submitted email and enroll it in the client's approved mailing-list workflow.

## Inventory fields added in the next pass

Each `peptide_product` now includes inventory fields inside `acf`:

```json
{
  "stock_quantity": 12,
  "low_stock_threshold": 3
}
```

The frontend derives stock state automatically:

- `stock_quantity > 0` → product can be added to checkout.
- `stock_quantity <= low_stock_threshold` → product shows a low-stock label.
- `stock_quantity === 0` → product automatically renders as **Sold out** and the add button is disabled.

This means WordPress only needs one editable inventory quantity per product. The React frontend should not require a separate manually-maintained Sold Out switch.

For the preview, inventory values are static JSON. In production, `lib/lion-ruo/content.ts` is the adapter layer to replace with a WordPress fetch.

## Individual product pages

Each published product now gets a route based on the WordPress slug:

```text
/lion-ruo/products/{slug}
```

Examples:

```text
/lion-ruo/products/nad-plus-500mg
/lion-ruo/products/ghk-cu-50mg
```

The detail page consumes the same WordPress product record and displays the full content field, image, price, size, purity, lot, storage, inventory state, and COA link.

## Age gate fields

The `lion-home` page content now includes an `age_gate` group:

```json
{
  "enabled": true,
  "minimum_age": 18,
  "heading": "Age confirmation required",
  "description": "...",
  "confirm_label": "I am 18 or older",
  "leave_label": "Leave site",
  "leave_href": "https://www.google.com/",
  "storage_days": 30
}
```

The age value and wording are intentionally content-managed so the client can approve the final requirement before launch. The current `18` value is preview content, not a legal determination.

## Supporting pages added: Info, Contact, Legal

The client requested a small number of true subpages in addition to the catalog/product pages. The preview now includes:

```text
/lion-ruo/info
/lion-ruo/contact
/lion-ruo/legal
```

The static fallback content is intentionally stored as separate WordPress-shaped Page records:

```text
content/lion-ruo/info-page.json      -> slug lion-info
content/lion-ruo/contact-page.json   -> slug lion-contact
content/lion-ruo/legal-page.json     -> slug lion-legal
```

In WordPress, create normal Pages with those same slugs so the client sees three obvious editable pages in the dashboard.

Suggested REST queries:

```text
/wp-json/wp/v2/pages?slug=lion-info
/wp-json/wp/v2/pages?slug=lion-contact
/wp-json/wp/v2/pages?slug=lion-legal
```

### Info page ACF

Recommended fields:

- `eyebrow`
- `heading`
- `intro`
- `review_note`
- `sections` repeater
  - `id`
  - `title`
  - `description`
  - `items` repeater/text list

Suggested section IDs currently used by the frontend:

```text
about
quality-testing
coa
storage-handling
shipping
research-use
```

### Contact page ACF

Recommended fields:

- `eyebrow`
- `heading`
- `intro`
- `email`
- `response_note`
- `topics` repeater/text list
- `success_text`
- `error_text`

The preview contact form does not expose a Resend secret in the browser. Configure a server-side/custom endpoint and set:

```text
NEXT_PUBLIC_LION_CONTACT_ENDPOINT=https://example.com/wp-json/lion/v1/contact
```

The browser POST payload is shaped like:

```json
{
  "name": "Researcher Name",
  "email": "researcher@example.com",
  "topic": "Product / COA question",
  "orderNumber": "",
  "message": "...",
  "source": "lion-ruo-contact"
}
```

The WordPress endpoint can validate/spam-check the request and then trigger Resend server-side.

### Legal page ACF

Recommended fields:

- `eyebrow`
- `heading`
- `intro`
- `review_note`
- `sections` repeater
  - `id`
  - `title`
  - `paragraphs` repeater/text list
  - `items` repeater/text list

Current anchors:

```text
/lion-ruo/legal#research-use
/lion-ruo/legal#terms
/lion-ruo/legal#privacy
/lion-ruo/legal#shipping
/lion-ruo/legal#returns
```

The legal copy included in the preview is intentionally labeled as preview content. Replace it with client-approved language before production launch.
