# AML portfolio validation

## Local checks

- Next.js 16.4.1 production static export builds successfully.
- `npm run check`: 18 checks pass, including case switching, keyboard navigation, mobile-menu state, contact draft encoding, static request handling, asset types, path traversal and preserved geometry utilities.
- `npm audit --omit=dev`: zero known vulnerabilities at the time of this revision.
- Root portable HTML and styles are generated from the same React page and CSS used by the production export.
- `npm run preview:file` generates a standalone preview successfully.

## Visual review

The desktop hero and investigation desk were reviewed in the managed browser preview. The preview browser blocked Next development chunk URLs with `ERR_BLOCKED_BY_CLIENT`; interactive behavior in that preview could not be established. The automatic Cloudflare deployment was verified live: case switching by click and arrow keys, mobile navigation opening and closing, and empty contact-form validation. The live page starts the native controller and reports no application console errors. A narrow 320px overflow found during this review was corrected by allowing hero grid items to shrink and scaling the headline to the available width.

## Content boundaries

TraceCase is identified as an independent, AI-assisted learning project with fictional cases. The page does not claim professional AML employment, bank deployment, regulatory filings or proven crime. Existing software and reporting employment is retained as background. The current resume remains labelled as a software and reporting background CV.
