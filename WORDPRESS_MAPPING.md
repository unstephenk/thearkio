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
