# Lion RUO next development pass

This package adds the three items requested by the client:

1. **Inventory / Sold Out behavior**
   - `stock_quantity` and `low_stock_threshold` are WordPress-shaped ACF fields in `products.json`.
   - Quantity 0 automatically renders **Sold out** and disables Add to Checkout.
   - Low inventory can show a low-stock message.
   - Checkout validates the current inventory and provides +/- quantity controls.
   - The preview does not decrement inventory when an order request is submitted. That should be tied to the future confirmed-order/payment workflow.

2. **Individual product pages**
   - Every product gets `/lion-ruo/products/[slug]`.
   - Catalog cards now link to the product detail page.
   - Detail pages display full description, image, price, size, purity, lot, format, storage, inventory and COA support.

3. **Age gate**
   - Site-wide age confirmation applies to all `/lion-ruo` pages.
   - Current preview age is 18 and is configured in `content/lion-ruo/site-content.json`.
   - The minimum age and wording are content-managed placeholders; client should approve final language before production launch.
   - Acceptance is remembered for 30 days in localStorage.

## Main files changed / added

- `app/lion-ruo/layout.tsx`
- `app/lion-ruo/lion-ruo.module.css`
- `app/lion-ruo/_components/lion-storefront.tsx`
- `app/lion-ruo/_components/lion-checkout.tsx`
- `app/lion-ruo/_components/lion-age-gate.tsx` (new)
- `app/lion-ruo/_components/lion-product-detail.tsx` (new)
- `app/lion-ruo/products/[slug]/page.tsx` (new)
- `content/lion-ruo/products.json`
- `content/lion-ruo/site-content.json`
- `lib/lion-ruo/content.ts`
- `lib/lion-ruo/types.ts`
- `WORDPRESS_MAPPING.md`
- `LION_RUO_README.md`
