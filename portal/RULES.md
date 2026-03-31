# Anvil portal — development rules

These rules align with Bear and Grid Table portal conventions.

## Types

- Shared props and domain shapes live in `*.types.ts` next to the component or feature.
- Do not inline large object types in `*.tsx` files when they are reused or exported.

## File layout

- Each feature folder uses `index.ts`, `Name.tsx`, `Name.types.ts`, and optional `Name.utils.ts` or `Name.constants.ts`.
- Nested UI belongs under a `components` subfolder inside the feature.

## Strings and numbers

- User-visible copy and route paths belong in `src/constants/strings.const.ts` or local `Name.const.ts` files.
- Use named numeric constants in `src/constants/numbers.const.ts` for layout, timing, and limits. Avoid magic numbers in JSX and logic.

## Styling

- Use Bear components and tokens first. Tailwind utility classes are allowed for layout and spacing consistent with Bear portals.

## Content

- Prefer real imports from `@forgedevstack/anvil` in examples and in the sandbox so documentation stays honest.
- Keep the package README and changelog as sources of truth; the portal can render them as raw Markdown for accuracy.
