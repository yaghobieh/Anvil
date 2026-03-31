# Anvil documentation portal

This folder is the Vite and React documentation site for `@forgedevstack/anvil`. It uses `@forgedevstack/bear` for layout, theming, and UI.

## Scripts

Run from the `anvil` package root:

- `npm run portal:install` — install portal dependencies
- `npm run portal` — development server (builds the library first)
- `npm run portal:build` — production build into `portal/dist`

## Search

Use the search button in the header or press Command K (Control K on Windows) to open the search dialog.

## Deploying on Vercel

Set the project root to `anvil/portal` (or the monorepo subfolder that contains this `package.json`). Use `npm install` and `npm run build`. The `prebuild` script builds the Anvil library from the parent directory. Configure SPA rewrites so all routes serve `index.html` (see `vercel.json`).

## Registry

The published package is listed at:

https://www.npmjs.com/package/@forgedevstack/anvil
