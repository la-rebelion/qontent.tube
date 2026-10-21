# Qontent Tube website

The public Qontent Tube site is a TypeScript Docusaurus project with a custom landing page, end-user documentation, and a product blog.

## Run locally

Requirements: Bun 1.4 or later and Node.js 20 or later.

```bash
bun install
bun run start
```

The development server opens at `http://localhost:3000` by default.

The pricing CTA expects the checkout Worker at `http://localhost:8787` during
local development. Production builds use `https://api.qontent.tube` by default.
Copy the backend's `.dev.vars.example` before testing checkout locally.

## Validate and build

```bash
bun run format:check
bun run typecheck
bun run build
bun run serve
```

The production output is written to `build/`. Broken routes, anchors, and Markdown links fail the production build.

## Publish to GitHub Pages

The `static/CNAME` file preserves the `qontent.tube` custom domain in the
published output. The production Turnstile site key is public and configured in
`docusaurus.config.ts`; never put its secret key in this repository or in a
frontend environment variable. Override the site key only when testing another
widget:

```bash
QONTENT_TURNSTILE_SITE_KEY=0x... bun run build
```

Publish the contents of `build/` to GitHub Pages. Checkout remains visibly
disabled if the public site key is absent, which prevents a partially
configured production launch.

## Content and design

- `src/pages/index.tsx` renders the landing page.
- `src/components/landing/` contains its reusable marketing sections and responsive styles.
- `docs/` contains the end-user guide shown under `/docs`.
- `blog/` contains product posts shown under `/blog`.
- `src/theme/Footer/` is a minimal ejected Docusaurus Footer swizzle shared by every route.
- `static/img/product/` contains the supplied product screenshots.
- `static/img/roadmap/` contains rendered previews of the animation roadmap.

Brand tokens and shared Docusaurus styling live in `src/css/custom.css`. The original `qontent.tube-landing-page.html` remains in the project root as a migration reference and is not included in the production build.
