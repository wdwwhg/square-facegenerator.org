# square-facegenerator.org

Pixel Loom is a browser-based pixel art workshop built with TanStack Start, React, TypeScript, and the ShipAny template.

## Tools

- Image to pixel art: grid size, palettes, brightness, dithering, and native or 8× PNG export.
- Square face generator: original characters with colors, hairstyles, expressions, glasses, and transparent 256×256 PNG export.
- Pixel art resizer: sharp integer scaling with preserved transparency.
- Pattern maker: numbered grids, RGB color counts, PNG download, and browser printing / Save as PDF.

The public tools run locally in the browser and do not require an account. English and Chinese pages are available; Chinese URLs use `/zh`.

## Local development

Requirements: Node.js 22+ and pnpm.

```sh
pnpm install
```

Copy `.env.example` to `.env.development`, generate a fresh `AUTH_SECRET`, and configure the database. For local SQLite, use the default `DATABASE_PROVIDER=sqlite` and `DATABASE_URL=file:data/local.db`.

```sh
pnpm db:setup
pnpm db:push
pnpm dev
```

Open http://localhost:3000 or http://localhost:3000/zh.

## Production build

```sh
pnpm build
pnpm start
```

Before deploying, configure production database and authentication settings, a strong `AUTH_SECRET`, and the public `VITE_APP_URL`. Never commit real environment files or credentials.

## Current scope

The four public tools are free. AI generation, batch processing, saved projects, and brand-matched bead/thread palettes are planned and not yet available for purchase. Pattern colors are generic RGB values.

The production build and browser tool flows have been verified. The inherited template still has TypeScript diagnostics in its existing dashboard and dependency declarations; a successful build does not mean the full type check passes.

Local environment files, databases, uploads, generated route/message files, dependencies, and build output are excluded from version control. The template's automatic container-publishing workflow is not enabled in this repository.

Built with [ShipAny](https://shipany.ai/). See [LICENSE](LICENSE) for the template license.
