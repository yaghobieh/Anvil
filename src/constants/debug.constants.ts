/**
 * Debug / Scope Constants
 */
import type { DebugLevel, DebugLevelValue, ScopeConfig } from '../types/debug.types';

/** Numeric log level values for comparison */
export const DEBUG_LEVELS: Record<DebugLevel, DebugLevelValue> = {
  trace: 0,
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  silent: 5,
} as const;

/** Console style prefix for each level */
export const DEBUG_LEVEL_STYLES: Record<DebugLevel, string> = {
  trace: 'color: #6b7280; font-weight: normal;',
  debug: 'color: #60a5fa; font-weight: normal;',
  info: 'color: #34d399; font-weight: bold;',
  warn: 'color: #fbbf24; font-weight: bold;',
  error: 'color: #f87171; font-weight: bold;',
  silent: '',
} as const;

/** Level badge text */
export const DEBUG_LEVEL_BADGES: Record<DebugLevel, string> = {
  trace: 'TRACE',
  debug: 'DEBUG',
  info: 'INFO',
  warn: 'WARN',
  error: 'ERROR',
  silent: '',
} as const;

/** Default Scope configuration */
export const DEFAULT_SCOPE_CONFIG: ScopeConfig = {
  enabled: true,
  level: 'debug',
  timestamps: true,
  showLabel: true,
  labelColor: '#ec4899',
  groupCollapsed: true,
  breakpoints: true,
  maxDepth: 4,
  performance: true,
  handler: null,
} as const;

/** Forge logo prefix for styled console */
export const SCOPE_LOGO = '🔍';

/** Maximum watch history entries */
export const MAX_WATCH_HISTORY = 50;

/** Maximum snapshots to keep */
export const MAX_SNAPSHOTS = 100;

/** Maximum timers to keep */
export const MAX_TIMERS = 200;

/** Default label for unnamed counters */
export const DEFAULT_COUNTER_LABEL = 'default';

/** Performance.now() fallback for non-browser */
export const HAS_PERFORMANCE = typeof performance !== 'undefined';

/** Whether we're in a browser environment */
export const IS_BROWSER = typeof window !== 'undefined';

/** Whether DevTools is likely open (heuristic) */
export const HAS_CONSOLE = typeof console !== 'undefined';
