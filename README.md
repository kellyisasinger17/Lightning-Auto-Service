# Lightning Auto Service

Static, framework-free marketing site for Lightning Auto Service.

## Project structure

- Root `*.html` files are the public pages. Keeping them at the root preserves the existing extensionless Netlify routes.
- `css/styles.css` contains all shared and page-scoped styles.
- `js/navigation.js` builds the shared navigation dropdowns.
- `js/bottom-anchor.js` inserts the shared quick-links panel above each footer.
- `assets/images/` contains images and video used by the site.
- `assets/downloads/` contains downloadable documents.
- `scripts/generate-sitemap.js` creates `sitemap.xml`.

## Local development

Serve the repository root with any static file server. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Build

The site serves readable source CSS and JavaScript directly; no bundling or minification step is required. The only build task refreshes the sitemap:

```sh
npm run build
```

The sitemap generator uses Node.js built-ins and does not require installed packages.
