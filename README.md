# Furniture DEALS Dasma

A React furniture showroom with one scrolling page, product detail modals, favorites, and an inquiry drawer. The catalog contains 44 furniture entries across eight categories, using the supplied business photos with advertising removed.

## Local development

Use Node.js 24 (also recorded in `.nvmrc` and `package.json`).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite.

```sh
npm run check
npm run build
npm run preview
```

The build runs catalog and image checks before compiling. Production files are written to `dist/`. Preview serves this output locally; it is not a production server.

## Deploy to Vercel

1. Put this project in a Git repository and import it into Vercel, or import the existing repository when available.
2. Select the project directory as the root and Node.js **24.x**.
3. The included `vercel.json` sets the Vite framework, `npm ci` install command, `npm run build` build command, and `dist` output directory. No environment variables are required.
4. Deploy, then check the homepage, a shared product link, images, mobile navigation, and the copy-and-Facebook inquiry flow on the deployment URL.
5. Connect the business domain in Vercel when available. Set `og:url` and an absolute `og:image` URL in `index.html` once the final domain is known.

The rewrite supports direct visits to product and legacy section URLs. Hashed JavaScript/CSS assets receive long-lived caching. `.vercelignore` keeps local originals, docs, installed dependencies, and previous builds out of uploads.

Official references: [Vercel Vite deployment](https://vercel.com/docs/frameworks/frontend/vite), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [Vite static deployment](https://vite.dev/guide/static-deploy.html).

For another static host, publish only `dist/` and configure its SPA fallback to `index.html`. Do not upload the whole source directory as the public website.

## Content maintenance

- **Products:** `src/data/imported-products.json`. Keep IDs and slugs stable so saved lists and shared links continue working. Use unique IDs/slugs and a category listed in `catalog.js`.
- **Images:** `public/images/products/` contains 44 cleaned photos. The hero is `public/images/showroom.jpg`; official logos are in `public/images/confirmed/`. Use `/images/...` URLs in the catalog. The build rejects missing and unused public images.
- **Categories, collections, offers:** `src/data/catalog.js`. Promotions are empty until confirmed offers are available.
- **Business information:** `src/data/business.js`. Keep the contact details and structured metadata in `index.html` consistent when changing the address, telephone, or hours.
- **Homepage content:** `src/pages/Home.jsx`. Shop, Contact, and Promotions are sections of this page.

Only Monaco (PHP 23,500) and Lexumburg (PHP 26,500) have prices legible in their original photos. These are labeled photo prices, requiring current showroom confirmation. Other products display “Ask for Price.” Unknown specifications and availability remain unconfirmed.

The photos were edited to remove advertising; reconstructed areas may differ from the original. Product details disclose this. Source mappings and editing notes are in `docs/`. The 45 original photos are preserved in **`archive/original-photos.zip`**, outside the public website and excluded from Git/deployment. Keep a separate backup of that archive before moving this project to another computer.

## Browsing and inquiries

Navigation scrolls to homepage sections. Product cards open a native dialog; shareable links use `/?product=<slug>#shop`. Older `/products/<slug>` URLs are normalized automatically. Browser Back dismisses a product opened from a card.

Favorites and inquiry quantities are stored in the visitor's browser. Customers review their list, copy the prepared message, open the official Facebook page, then paste and send it themselves. The contact form also prepares a message. **There is no backend, automatic message delivery, checkout, or payment processing.** Clipboard copying requires HTTPS or localhost; manual copying is offered when unavailable.

## Release checks

- Run `npm ci`, `npm run build`, and `npm audit`.
- Preview the production build and check desktop/mobile layouts, navigation, product dialogs, Escape/Back, favorites, quantities, and inquiry copying.
- Check these interactions again on the deployed HTTPS URL, including a direct shared product link.

The build validates catalog IDs, categories, prices, image references, and unused images. A successful build does not replace a visual browser review or a live deployment smoke check.

### Latest local verification — October 16, 2026

Clean dependency installation, catalog/image validation, JavaScript/JSX syntax, local imports, and CSS parsing passed. The dependency audit reported zero vulnerabilities. Production compilation passed after a fresh `npm ci`; the current output is in `dist/`. The development server started successfully, and HTTP checks returned 200 for the homepage, React entry point, Home module, and hero image. Visual browser review and a deployed HTTPS smoke check remain outstanding. No live deployment was performed.

### Rollup compatibility

This computer's Windows Application Control rejects Rollup's native Windows module. The project uses Rollup's official platform-independent [`@rollup/wasm-node`](https://github.com/rollup/rollup/blob/master/docs/migration/index.md) package instead. `package.json` aliases it as `rollup`, pins version `4.64.7`, and uses an npm override so Vite resolves the same package. The lockfile preserves this setup for clean installs and deployment. No Windows security settings were changed. Keep the alias and override together when updating dependencies; the WebAssembly implementation may compile more slowly than the native implementation.
