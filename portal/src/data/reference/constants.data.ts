import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

export const CONSTANTS_REFERENCE: ReferenceItem[] = [
  r(
    'NUMBERS',
    'Named integers such as ZERO, ONE, TWO—use instead of bare 0/1/2 when the meaning is semantic (indices, counts) and you want grep-friendly code.',
    'NUMBERS.ZERO;',
  ),
  r(
    'DEBOUNCE_DELAY_MS',
    'Default milliseconds for debounce helpers and hooks so UX feels consistent across the app.',
    'DEBOUNCE_DELAY_MS;',
  ),
  r(
    'THROTTLE_INTERVAL_MS',
    'Default throttle window—caps how often scroll/resize style handlers fire.',
    'THROTTLE_INTERVAL_MS;',
  ),
  r(
    'DEFAULT_TIMEOUT_MS',
    'Baseline timeout for async utilities (fetch wrappers, retries)—tune per call when needed.',
    'DEFAULT_TIMEOUT_MS;',
  ),
  r(
    'ANIMATION_DURATION_MS',
    'Suggested default for CSS/JS transitions when you do not have design tokens yet.',
    'ANIMATION_DURATION_MS;',
  ),
  r(
    'BREAKPOINTS',
    'Pixel widths for XS, SM, MD, LG, XL—aligns responsive hooks with the same numbers as CSS media queries.',
    'BREAKPOINTS.MD;',
  ),
  r(
    'MAX_SAFE_INTEGER',
    'Re-export style access to Number.MAX_SAFE_INTEGER for readable comparisons in business logic.',
    'MAX_SAFE_INTEGER;',
  ),
  r(
    'MIN_SAFE_INTEGER',
    'Same for Number.MIN_SAFE_INTEGER.',
    'MIN_SAFE_INTEGER;',
  ),
  r(
    'KB',
    '1024 bytes—binary kilobyte factor for size math (file utils, buffers).',
    'KB;',
  ),
  r(
    'MB',
    'KB * 1024—binary megabyte.',
    'MB;',
  ),
  r(
    'GB',
    'Binary gigabyte factor.',
    'GB;',
  ),
  r(
    'TB',
    'Binary terabyte factor.',
    'TB;',
  ),
  r(
    'SECONDS_IN_MINUTE',
    '60—use when converting timestamps or TTL seconds to minutes.',
    'SECONDS_IN_MINUTE;',
  ),
  r(
    'MINUTES_IN_HOUR',
    '60 minutes per hour.',
    'MINUTES_IN_HOUR;',
  ),
  r(
    'HOURS_IN_DAY',
    '24 hours per day.',
    'HOURS_IN_DAY;',
  ),
  r(
    'DAYS_IN_WEEK',
    '7 days per week.',
    'DAYS_IN_WEEK;',
  ),
  r(
    'MONTHS_IN_YEAR',
    '12 months per year.',
    'MONTHS_IN_YEAR;',
  ),
  r(
    'MS_IN_SECOND',
    '1000 ms per second—core for duration formatting.',
    'MS_IN_SECOND;',
  ),
  r(
    'MS_IN_MINUTE',
    'Milliseconds in one minute (60 * MS_IN_SECOND).',
    'MS_IN_MINUTE;',
  ),
  r(
    'MS_IN_HOUR',
    'Milliseconds in one hour.',
    'MS_IN_HOUR;',
  ),
  r(
    'MS_IN_DAY',
    'Milliseconds in one day (often 24h; no DST adjustment).',
    'MS_IN_DAY;',
  ),
  r(
    'MS_IN_WEEK',
    'Milliseconds in seven days.',
    'MS_IN_WEEK;',
  ),
  r(
    'DEFAULT_BREAKPOINT_CONFIG',
    'Object consumed by responsive hooks: which keys map to which min-widths.',
    'DEFAULT_BREAKPOINT_CONFIG;',
  ),
  r(
    'DEFAULT_DEBOUNCE_OPTIONS',
    'Leading/trailing and delay defaults for debounce()—spread and override per call.',
    'DEFAULT_DEBOUNCE_OPTIONS;',
  ),
  r(
    'DEFAULT_THROTTLE_OPTIONS',
    'Same idea for throttle().',
    'DEFAULT_THROTTLE_OPTIONS;',
  ),
  r(
    'DEFAULT_CLONE_OPTIONS',
    'Reserved defaults for deep clone behavior if options are extended in the library.',
    'DEFAULT_CLONE_OPTIONS;',
  ),
  r(
    'EMPTY_OBJECT',
    'Frozen shared {} reference—safe default for Redux-style “no params” without allocating.',
    'EMPTY_OBJECT;',
  ),
  r(
    'EMPTY_ARRAY',
    'Frozen shared []—stable empty list for default props.',
    'EMPTY_ARRAY;',
  ),
  r(
    'EMPTY_STRING',
    'Literal "" constant—avoids typos and satisfies “no magic string” lint rules.',
    'EMPTY_STRING;',
  ),
  r(
    'EMPTY_FUNCTION',
    'Stable no-op callback for optional handlers.',
    'EMPTY_FUNCTION;',
  ),
  r(
    'IDENTITY_FUNCTION',
    'Function that returns its argument—default mapper in generic utilities.',
    'IDENTITY_FUNCTION(42);',
  ),
  r(
    'NOOP',
    'Callable no-op (often same as EMPTY_FUNCTION depending on build—use for side-effect placeholders).',
    'NOOP();',
  ),
  r(
    'TRUE_FN',
    '() => true—stub predicate.',
    'TRUE_FN();',
  ),
  r(
    'FALSE_FN',
    '() => false—stub predicate.',
    'FALSE_FN();',
  ),
  r(
    'TYPE_NAMES',
    'String map of internal type labels used by guards and serializers.',
    'TYPE_NAMES;',
  ),
  r(
    'OBJECT_TAGS',
    'Object.prototype.toString slice tags for built-ins—helps instanceof-free checks.',
    'OBJECT_TAGS;',
  ),
  r(
    'REGEX_PATTERNS',
    'Central regexes (email-ish, uuid-ish, etc.)—single place to update patterns.',
    'REGEX_PATTERNS;',
  ),
  r(
    'SPECIAL_CHARS',
    'Character class strings for sanitization or slugify helpers.',
    'SPECIAL_CHARS;',
  ),
  r(
    'DEBUG_LEVELS',
    'Ordered keys for Scope log filtering (trace … error).',
    'DEBUG_LEVELS;',
  ),
  r(
    'DEBUG_LEVEL_STYLES',
    'CSS-ish console %c strings per level for colored output.',
    'DEBUG_LEVEL_STYLES;',
  ),
  r(
    'DEBUG_LEVEL_BADGES',
    'Short text badges prepended to scope log lines.',
    'DEBUG_LEVEL_BADGES;',
  ),
  r(
    'DEFAULT_SCOPE_CONFIG',
    'Baseline Scope options: timestamps, colors, max history—merged by createScope.',
    'DEFAULT_SCOPE_CONFIG;',
  ),
  r(
    'SCOPE_LOGO',
    'ASCII or emoji banner for scope branding in console.',
    'SCOPE_LOGO;',
  ),
  r(
    'MAX_WATCH_HISTORY',
    'Cap on watch() history to avoid unbounded memory in long sessions.',
    'MAX_WATCH_HISTORY;',
  ),
  r(
    'MAX_SNAPSHOTS',
    'Cap on snapshot() storage.',
    'MAX_SNAPSHOTS;',
  ),
  r(
    'MAX_TIMERS',
    'Cap on concurrent named timers in Scope.',
    'MAX_TIMERS;',
  ),
  r(
    'DEFAULT_COUNTER_LABEL',
    'Fallback label for scope.count when none passed.',
    'DEFAULT_COUNTER_LABEL;',
  ),
  r(
    'HAS_PERFORMANCE',
    'Feature detect performance.now—false in some workers or old environments.',
    'HAS_PERFORMANCE;',
  ),
  r(
    'IS_BROWSER',
    'Heuristic true when window/document-style globals exist—guard SSR code paths.',
    'IS_BROWSER;',
  ),
  r(
    'HAS_CONSOLE',
    'True when console methods exist—some embedded JS runtimes omit them.',
    'HAS_CONSOLE;',
  ),
];
