import type { DocConceptBlock } from '@/types/docConcept.types';

/** Line counts from `anvil/src` (including comments) — update if sources move. */
const LOC = {
  typeGuards: 327,
  array: 632,
  object: 581,
  string: 666,
  function: 579,
  file: 283,
  cn: 196,
  debug: 625,
  clone: 121,
  constantsDir: 276,
  date: 380,
} as const;

export const CLONE_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'What this page covers',
    body: 'These helpers copy data (shallow or deep) or lock objects down (freeze or seal). They live in one small module so behavior is easy to read and audit—no hidden dependencies.',
  },
  {
    title: 'Shallow vs deep (plain language)',
    body: 'Shallow means “new container, same inner references.” The outer object or array is new, but nested objects inside still point to the originals. Deep means “walk the whole tree”: nested objects and arrays are new instances. Anvil’s deepClone tracks cycles with a WeakMap so circular graphs do not blow the stack.',
  },
  {
    title: 'Immutability: freeze vs seal',
    body: 'Freeze: Object.freeze recursively—no adds, removes, or reassignments. Seal: Object.seal recursively—keys fixed, but writable values may still change. TypeScript readonly is compile-time only; these are runtime locks.',
  },
  {
    title: 'How big is the implementation?',
    body: `Implemented in one file (\`src/utils/clone.ts\`), about ${LOC.clone} lines including JSDoc. Small surface area makes cloning behavior easy to reason about.`,
  },
];

export const TYPE_GUARDS_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'What is a type guard?',
    body: 'A type guard is a function that returns a boolean and (when used with TypeScript) helps narrow a value’s type—e.g. after `if (isString(x))`, `x` is treated as `string`. At runtime they are normal checks; they complement `typeof` / `instanceof` with consistent rules for arrays, plain objects, Dates, collections, and “empty” shapes.',
  },
  {
    title: 'Why not only `typeof`?',
    body: '`typeof null` is `"object"`, arrays are objects, and `instanceof` breaks across realms (e.g. iframes). These helpers encode one opinionated, testable rule set so your app and tests agree on what counts as a plain object, a promise, an empty collection, etc.',
  },
  {
    title: 'Where the code lives',
    body: `Guards are implemented in \`src/utils/type-guards.ts\` (about ${LOC.typeGuards} lines). Import from \`@forgedevstack/anvil\` or \`@forgedevstack/anvil/utils\` like the rest of the utilities.`,
  },
];

export const CONSTANTS_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'What are these constants for?',
    body: 'Shared numbers (timeouts, debounce defaults, breakpoints), time units, empty sentinels (`EMPTY_OBJECT`, `EMPTY_STRING`, …), regex maps, and Scope-related defaults. Centralizing them avoids magic numbers and keeps hooks and utils aligned on the same defaults.',
  },
  {
    title: 'Tree-shaking and bundle size',
    body: 'Import only what you use. Named exports let bundlers drop unused constants. Prefer these over duplicating `300` or `1024` across files when the value is part of Anvil’s public contract.',
  },
  {
    title: 'Where the code lives',
    body: `Split across \`src/constants/*.ts\` (together about ${LOC.constantsDir} lines) and re-exported from the package root. Some entries mirror browser APIs (e.g. max safe integer) for clarity in app code.`,
  },
];

export const ARRAY_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'What this module gives you',
    body: 'Immutable-style helpers: they return new arrays instead of mutating arguments (unless noted otherwise in source). You get functional patterns—map/filter wrappers, chunking, grouping, set operations, sorting copies, random sampling, and numeric aggregates—without reaching for a large dependency.',
  },
  {
    title: 'Immutability vs in-place',
    body: 'If a name sounds like “insert” or “remove”, Anvil still returns a new array rather than splicing the original. That makes React state updates predictable: spread or replace the array reference and let the UI diff.',
  },
  {
    title: 'Where the code lives',
    body: `Almost everything is in \`src/utils/array.ts\` (about ${LOC.array} lines). \`isArrayEqual\` is documented under that name but imported from the object equality helper (alias) as shown in each snippet.`,
  },
];

export const OBJECT_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Objects as data',
    body: 'Path get/set, merge, pick/omit, key transforms, and equality. Helpers assume plain objects for deep operations; class instances or exotic objects may not traverse the same way—check JSDoc in source when in doubt.',
  },
  {
    title: 'Equality and “empty”',
    body: 'Deep equality compares nested structure; shallow helpers only look at top-level keys. Some exports are aliases (e.g. compact object, array equality) so the doc name matches what you expect while the implementation lives in one place.',
  },
  {
    title: 'Where the code lives',
    body: `Core logic in \`src/utils/object.ts\` (about ${LOC.object} lines). Large surface area—use this page or search to find the exact helper instead of scanning the file.`,
  },
];

export const STRING_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'String handling in Anvil',
    body: 'Case transforms, padding, trimming, slugify, validation helpers, distance metrics, templates, and masking. Strings are immutable in JavaScript; every function returns a new string (or a boolean/number) and never mutates the input.',
  },
  {
    title: 'Locales and Unicode',
    body: 'Some case operations may use JavaScript’s default locale rules; for user-visible formatting in production, pair these helpers with `Intl` or explicit locale options where the implementation exposes them.',
  },
  {
    title: 'Where the code lives',
    body: `Implemented in \`src/utils/string.ts\` (about ${LOC.string} lines). A few names (e.g. reverse string) are re-export aliases—snippets show the import you should type.`,
  },
];

export const FUNCTION_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Higher-order and control-flow',
    body: 'Debounce waits for a quiet period then runs once (search fields). Throttle caps how often a function runs (scroll). Memoize caches results by arguments. Compose / pipe build pipelines; curry / partial fix arguments. Async helpers add retries, timeouts, concurrency limits, and delays without rewriting boilerplate each time.',
  },
  {
    title: 'Stubs and identity',
    body: '`noop`, `constant`, `identity`, and `stub*` functions are useful as defaults for optional callbacks, tests, and generic constraints—so you do not allocate new lambdas at every call site.',
  },
  {
    title: 'Where the code lives',
    body: `Most helpers live in \`src/utils/function.ts\` (about ${LOC.function} lines). Behavior (e.g. debounce leading/trailing) follows the options in that file—use the types from the package for full option lists.`,
  },
];

export const FILE_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Browser vs Node',
    body: 'Extension and MIME helpers work with paths or names in any environment. FileReader-based helpers and download helpers expect browser APIs (`File`, `document`); they are no-ops or promises that reject when those APIs are missing—guard with `typeof window` in SSR if needed.',
  },
  {
    title: 'MIME map and safety',
    body: '`EXTENSION_TO_MIME` covers common document types; unknown extensions fall back to sensible defaults per function. `sanitizeFilename` reduces path traversal and odd characters for user-triggered downloads.',
  },
  {
    title: 'Where the code lives',
    body: `Implemented in \`src/utils/file.ts\` (about ${LOC.file} lines). Keep file handling logic here so UI code stays small and testable.`,
  },
];

export const CN_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Why `cn`?',
    body: 'UI libraries and Tailwind produce conditional and merged class strings. `cn` (and friends) flatten arrays, objects, and booleans into one string and can resolve conflicting Tailwind utilities so the last intent wins—cleaner than manual string concatenation.',
  },
  {
    title: '`ClassValue` type',
    body: 'The `ClassValue` type describes everything `cn` accepts: strings, falsy values to skip, arrays, and object maps of class → boolean. Import it with `import type` so it erases at compile time.',
  },
  {
    title: 'Where the code lives',
    body: `Implemented in \`src/utils/cn.ts\` (about ${LOC.cn} lines). Variants like \`cnPrefix\` and \`cnVariants\` reduce repetition for design-system components.`,
  },
];

export const DEBUG_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Scope debugger vs `console.log`',
    body: 'Scope adds levels, enable/disable, groups, timers, watches, and conditional pauses (`pause`, `pauseIf`, `inspect`) in one API. You can swap the log handler for remote logging or strip noise in production with `disable()`.',
  },
  {
    title: 'Singleton vs named scopes',
    body: '`scope` is the default app-wide instance. `createScope("Label")` or `new Scope("Label")` give you namespaces (e.g. “Checkout”, “Worker”) so console output stays scannable. Child scopes inherit configuration patterns from the implementation.',
  },
  {
    title: 'Where the code lives',
    body: `Core implementation in \`src/utils/debug.ts\` (about ${LOC.debug} lines). Methods are documented as \`scope.*\`; import { scope } once from the package—see each snippet.`,
  },
];

export const DATE_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Why Date Master?',
    body: 'Date Master provides the full power of moment.js and Luxon without the 70 kB bundle. 80+ tree-shakeable functions covering parsing, formatting, manipulation, comparison, relative time, calendar time, durations, intervals, timezones, and locale support. Every function takes a DateInput (Date, string, or number) and returns a new Date or primitive—nothing is mutated.',
  },
  {
    title: 'Formatting: tokens + locale shortcuts',
    body: '`formatDate()` supports moment-compatible tokens: YYYY, MM, DD, Do (ordinal), HH, mm, ss, dddd, MMMM, A/a, X, x, Z/ZZ, SSS. Locale shortcuts work too: LT (time), LTS (time+seconds), L (short date), LL (long date), LLL (date+time), LLLL (full). Escape text with [brackets].',
  },
  {
    title: 'Multiple locale support',
    body: '`formatLocale()`, `monthName()`, `weekdayName()`, `monthNames()`, and `weekdayNames()` use the browser\'s `Intl.DateTimeFormat` for native locale support in 100+ languages—no locale bundles needed. `formatRelativeLocale()` uses `Intl.RelativeTimeFormat` for localized relative time strings like "il y a 3 jours" or "vor 3 Tagen".',
  },
  {
    title: 'Calendar time',
    body: '`calendar()` produces human-readable labels relative to "now": "Today at 2:30 PM", "Yesterday at 10:00 AM", "Last Monday at 3:15 PM", or falls back to a date format for older dates. Custom format overrides per bucket (sameDay, lastDay, nextWeek, etc.) are supported.',
  },
  {
    title: 'Timezone support',
    body: '`formatInTimeZone()` formats a date in any IANA timezone (like moment-timezone). `getTimezoneOffset()`, `getTimezoneInfo()`, and `convertTimezone()` give you offset strings, abbreviations, and cross-timezone conversion—all powered by `Intl`, no data files needed.',
  },
  {
    title: 'Duration and intervals',
    body: '`toDuration()` breaks milliseconds into days/hours/minutes/seconds. `humanizeDuration()` produces "2 hours" or "a day". `formatDuration()` gives HH:mm:ss for timers. Interval functions (`interval`, `intervalContains`, `intervalsOverlap`, `intervalIntersection`, `intervalSplit`) bring Luxon-style range operations.',
  },
  {
    title: 'Business days and calendar grids',
    body: '`businessDaysBetween()` and `addBusinessDays()` handle Mon-Fri calculations. `datesInMonth()` and `calendarGrid()` generate date arrays for calendar UIs — the grid returns 42 cells (6×7) padded with previous/next month days.',
  },
  {
    title: 'Where the code lives',
    body: `Implemented in \`src/utils/date.ts\` (about ${LOC.date} lines) with types in \`src/types/date.types.ts\`. Available via the dedicated \`@forgedevstack/anvil/date-master\` sub-path export or the main \`@forgedevstack/anvil\` entry.`,
  },
];

export const HOOKS_REACT_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'React hooks from Anvil',
    body: 'Hooks wrap browser and app patterns: responsive breakpoints, form state, debounce/throttle, async data, WebSocket, idle, visibility, storage, and more. They follow React’s rules of hooks—call them at the top level of function components or other hooks.',
  },
  {
    title: 'Import path',
    body: 'Snippets use the main package entry (`@forgedevstack/anvil`) where hooks are re-exported. You can also use `@forgedevstack/anvil/hooks/react` if you split client bundles.',
  },
  {
    title: 'Where the code lives',
    body: 'Each hook is typically one file under `src/hooks/react/` (e.g. `useDebounce.ts`) with a barrel `index.ts`. Total size is modest; prefer reading the hook you use for option types and cleanup behavior.',
  },
];

export const HOOKS_VUE_PAGE_CONCEPTS: readonly DocConceptBlock[] = [
  {
    title: 'Vue composables',
    body: 'Same ideas as the React hooks—reactivity, timers, browser state—expressed as composables for Vue 3 (`ref`, `computed`, lifecycle). Use inside `setup()` or `<script setup>`.',
  },
  {
    title: 'Import path',
    body: 'Import from `@forgedevstack/anvil/hooks/vue` as shown in each block. Types follow Vue’s `Ref` and `MaybeRef` patterns where applicable.',
  },
  {
    title: 'Where the code lives',
    body: 'Defined in `src/hooks/vue/composables.ts` and related files (several hundred lines total). Check the source for edge cases (SSR, teardown) for production apps.',
  },
];
