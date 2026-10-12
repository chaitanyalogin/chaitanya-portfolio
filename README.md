# Chaitanya Kulkarni Portfolio

A Next.js portfolio with GPU rendered 3D, project showcases, The Chay Show videos, resume downloads and WhatsApp contact.

## Open the supplied download

Extract the archive and double click **START_PORTFOLIO.bat** on Windows. Node.js 22 or newer must be installed. The archive includes a production build in `out`, so previewing it does not require installing packages.

The launcher opens `http://localhost:5173`. Keep its terminal window open. This serves the optimized production website, rather than the development server.

## Develop in VS Code

Open this folder, then choose **Terminal → New Terminal**:

```sh
npm ci
npm run dev
```

Open `http://localhost:5173`. After edits, produce an optimized build and preview it:

```sh
npm run build
npm run check
npm run preview
```

## Technology and performance

* Next.js 16.4.0 App Router with static export.
* React 19.3.0. Portfolio content is prerendered; a small client component loads the interaction controller.
* Native WebGL2 with GPU vertex transforms, smooth lighting, a depth buffer and a single indexed draw per ordinary frame.
* Geometry uploads once. The animation loop reuses its rotation buffer and submits only uniforms and drawing commands.
* Display synchronized animation with adaptive render resolution, capped pixel density and visibility based suspension.
* Motion controls, system reduced motion support and a static 3D fallback if WebGL is unavailable.
* Immediate content visibility, no delayed reveal animations, no per scroll layout reads and no continuous backdrop blur compositing.
* On demand YouTube and project embeds. Public files are served locally, including the PDF and Word resumes.

The software Canvas renderer from the first version is removed. The GPU renderer changes the actual rendering work; adopting Next.js alone would not have fixed the frame cost.

## Main files

| File | Purpose |
| --- | --- |
| `app/page.jsx` | Server rendered portfolio content |
| `app/layout.jsx` | Metadata and document layout |
| `app/globals.css` | Production styles and responsive layouts |
| `app/Enhancements.jsx` | Small client entry point |
| `app.js` | Menu, contact, videos, motion controls and sample interaction |
| `lib/gpu-scene.js` | WebGL2 shaders, GPU setup and animation |
| `scene.js` | One time mesh construction and geometry helpers |
| `public/assets/` | Public resume documents, images and favicon |
| `scripts/finalize-export.mjs` | Static export checks and CSP hashes |
| `scripts/serve-static.mjs` | Local production preview server |

The root `index.html`, `styles.css` and `assets` are retained only for the portable design preview generator. Production content is in the `app` directory; production assets are in `public`. Keep the preview template aligned after content changes, or review the production build instead.

## Contact and media

WhatsApp: `919591454650`. Email: `chaitanyarocks.kulkarni@gmail.com`.

The WhatsApp form opens a draft. No messages are stored or sent by the website itself. The visitor decides whether to send. There are no visitor analytics scripts.

Project illustrations are explicitly labeled. EntitlementCI sample values demonstrate its purpose; the embedded reviewer demo uses sample data. External links are provided if YouTube or project embedding is blocked.

## Cloudflare later

This project contains no hosting credentials or deployment workflow. Nothing has been deployed for this portfolio.

Intended Cloudflare Pages settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output | `out` |
| Production branch | `main` |
| Root directory | Repository root |

Next.js runs at build time for this static export. No Next.js server is required on the host. The postbuild step hashes Next.js inline bootstrap scripts into the exported `_headers`, preserving a strict content security policy.

Before the final public build, set `PORTFOLIO_SITE_URL` to the real HTTPS domain to enable correct canonical and social image URLs. No placeholder public domain is embedded.

References: [Next.js static export](https://nextjs.org/docs/app/guides/static-exports) and [Cloudflare static HTML hosting](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).
