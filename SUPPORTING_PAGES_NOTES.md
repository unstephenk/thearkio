# Lion RUO supporting-pages pass

Client request implemented:

- `/lion-ruo/info`
- `/lion-ruo/contact`
- `/lion-ruo/legal`

Also updated:

- Main navigation: Catalog / Info / Contact
- Footer: Shop / Info / Support / Legal groups
- Homepage-anchor links now resolve correctly from every subpage
- Contact form supports an optional `NEXT_PUBLIC_LION_CONTACT_ENDPOINT`
- Supporting page content is stored as separate WordPress-shaped Page JSON files
- Global age gate applies automatically to all three new pages
- Existing inventory, Sold Out state, checkout quantity validation, newsletter, and product detail routes remain intact

## WordPress pages to create later

Create normal WordPress Pages with slugs:

```text
lion-info
lion-contact
lion-legal
```

The frontend is ready for those pages to replace the static fallback JSON once the WordPress REST fetch layer is connected.

## Important

Testing, product, RUO, policy, shipping, returns, privacy, and compliance wording in the preview must be client-approved before production launch.
