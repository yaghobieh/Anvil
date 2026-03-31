import { r } from './reference.helpers';
import { DEFAULT_IMPORT_SOURCE } from './reference.const';
import type { ReferenceItem } from './reference.types';

const CLASS_VALUE_TYPE: ReferenceItem = {
  name: 'ClassValue',
  description:
    'TypeScript-only union describing every value `cn` accepts: strings, numbers, booleans (falsy values are skipped), arrays of class values, or objects mapping class names to booleans. Use `import type` so it is erased at compile time and does not affect runtime bundles.',
  example: [
    `import type { ClassValue } from '${DEFAULT_IMPORT_SOURCE}';`,
    '',
    'const tokens: ClassValue = ["px-2", false && "hidden", { active: true }];',
  ].join('\n'),
};

export const CN_REFERENCE: ReferenceItem[] = [
  r(
    'cn',
    'Primary helper: merges many class arguments into one string. Falsy fragments are dropped; Tailwind-style conflicts can be resolved so later utilities override earlier ones (implementation follows tailwind-merge style rules where configured).',
    'cn("px-2", isOpen && "bg-white", "rounded");',
  ),
  r(
    'classNames',
    'Alias or parallel API to the same conditional-class pattern as `cn`—object form maps class names to booleans. Pick whichever name matches your codebase conventions.',
    'classNames({ active: true, disabled: false });',
  ),
  r(
    'clsx',
    'clsx-compatible entry: accepts the same heterogenous argument list as the popular `clsx` package. Useful when migrating code that already calls `clsx`.',
    'clsx("a", false && "b", "c");',
  ),
  r(
    'cnPrefix',
    'Returns a function that prepends a fixed prefix to each utility fragment—handy for BEM-style blocks (`btn`, `btn-primary`) without repeating the prefix string.',
    'const btn = cnPrefix("btn");\nbtn("primary", "lg");',
  ),
  r(
    'cnUnique',
    'Splits merged classes on whitespace and deduplicates identical tokens while preserving order of first occurrence—cleans up duplicated literals.',
    'cnUnique("a b a c");',
  ),
  r(
    'cnMerge',
    'Merges two (or more) class strings with Tailwind-aware conflict resolution: competing utilities such as `text-sm` vs `text-base` collapse to one winner.',
    'cnMerge("text-sm text-gray-500", "text-base");',
  ),
  r(
    'cnVariants',
    'Applies a base class plus optional variant classes keyed by string labels; boolean map selects which variant segments apply—reduces branching in components.',
    'cnVariants("btn", { "btn-primary": isPrimary, "btn-lg": size === "large" });',
  ),
  CLASS_VALUE_TYPE,
];
