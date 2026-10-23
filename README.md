# Chaitanya Kulkarni — AML & KYC portfolio

Live: https://chaitanya-portfolio-a2f.pages.dev/

An entry-level career portfolio for a commerce graduate moving into AML, KYC and financial crime operations. TraceCase is the featured independent learning project. Its two fictional investigations illustrate why similar transaction metrics can warrant different questions when the supporting evidence changes.

## Develop and verify

Node.js 22 or newer is required.

```sh
npm ci
npm run dev
```

Open http://localhost:5173. The development wrapper also accepts `--host` and `--port` for managed previews. Stop the development server before building, because both use Next's default build directory.

```sh
npm run build
npm run check
npm run preview
```

`npm run build` exports Next.js to `out/`, adds hashes for its inline bootstrap scripts to the exported CSP, and regenerates root `index.html` and `styles.css` from the same prerendered page. The root entry runs a native module controller without React hydration. Both deployment paths contain the same content and case comparison.

`npm run preview:file` produces a self-contained HTML preview in `dist/`. External project links still need an internet connection. Resume and social assets are included locally.

## Content and interactions

- TraceCase live demo, source and evidence-review workflow come first.
- The case excerpt supports mouse, touch and standard keyboard tab navigation.
- The background retains actual software and reporting roles; it does not relabel them as professional AML experience.
- The existing CV is explicitly labelled as a software and reporting background CV, pending the separate AML resume rewrite.
- Email links, copy-email feedback and a WhatsApp draft form provide direct contact paths. The visitor reviews and sends the draft themselves. The site stores no messages and loads no analytics or embedded third-party players.
- The initial case, background and ordinary links remain readable without JavaScript.
- Responsive layouts, a skip link, visible keyboard focus, labelled form fields and reduced-motion support are included.

## Main files

| File | Purpose |
| --- | --- |
| `app/page.jsx` | Prerendered content and accessible markup |
| `app/globals.css` | Shared responsive styling |
| `app/layout.jsx` | Search and social metadata |
| `lib/portfolio-data.js` | Case excerpts and project URLs |
| `app.js` | Case comparison, navigation and contact controller |
| `app/Enhancements.jsx` | Next.js client entry |
| `bootstrap.js` | Portable HTML client entry |
| `public/assets/`, `assets/` | Matching production and portable public assets |
| `scripts/finalize-export.mjs` | Export validation, CSP hashes and root entry generation |
| `scripts/dev.mjs` | Development CLI flag adapter |

The earlier GPU implementation remains in source history-compatible modules but is not loaded by this design.

## Hosting

The existing Cloudflare Pages GitHub integration deploys `main` automatically. Recommended build settings: `npm run build`, output `out`, repository root, `NODE_VERSION=24`. The root portable entry also works with the existing raw static hosting configuration. There are no hosting credentials in this repository.

`PORTFOLIO_SITE_URL` can override the production canonical URL for Next metadata. The default is the verified Cloudflare site. Native public assets and a strict script policy avoid third-party runtime dependencies.
