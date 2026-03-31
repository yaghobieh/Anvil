/**
 * Debug / Scope Types
 * Enhanced debugger types for ForgeStack
 */

/** Log level for controlling debug output */
export type DebugLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

/** Numeric values for log levels (for comparison) */
export type DebugLevelValue = 0 | 1 | 2 | 3 | 4 | 5;

/** Configuration for Scope debugger instance */
export interface ScopeConfig {
  /** Whether debugging is enabled */
  enabled: boolean;
  /** Minimum log level to display */
  level: DebugLevel;
  /** Whether to show timestamps */
  timestamps: boolean;
  /** Whether to show the caller name/label */
  showLabel: boolean;
  /** Custom label color (CSS color string) */
  labelColor: string;
  /** Whether to group related logs */
  groupCollapsed: boolean;
  /** Whether `pause()` / `pauseIf()` should trigger `debugger;` */
  breakpoints: boolean;
  /** Maximum depth for object inspection */
  maxDepth: number;
  /** Whether to track performance metrics */
  performance: boolean;
  /** Custom log handler (replaces console) */
  handler: DebugHandler | null;
}

/** Partial config for overrides */
export type ScopeConfigOverride = Partial<ScopeConfig>;

/** A single watched variable entry */
export interface WatchEntry {
  label: string;
  previousValue: unknown;
  currentValue: unknown;
  changeCount: number;
  lastChanged: number;
}

/** Performance timer entry */
export interface TimerEntry {
  label: string;
  startTime: number;
  endTime: number | null;
  duration: number | null;
}

/** A snapshot captured by the profiler */
export interface Snapshot {
  id: number;
  timestamp: number;
  label: string;
  data: Record<string, unknown>;
}

/** Custom log handler function */
export type DebugHandler = (
  level: DebugLevel,
  label: string,
  message: string,
  data?: unknown
) => void;

/** Options for the useScope React hook */
export interface UseScopeOptions {
  /** Component/scope name */
  name: string;
  /** Override global config for this scope */
  config?: ScopeConfigOverride;
  /** Track render count */
  trackRenders?: boolean;
  /** Track mount/unmount */
  trackLifecycle?: boolean;
}

/** Return type of the useScope React hook */
export interface UseScopeReturn {
  /** Log at debug level */
  log: (message: string, ...data: unknown[]) => void;
  /** Log at info level */
  info: (message: string, ...data: unknown[]) => void;
  /** Log at warn level */
  warn: (message: string, ...data: unknown[]) => void;
  /** Log at error level */
  error: (message: string, ...data: unknown[]) => void;
  /** Trace (verbose) log */
  trace: (message: string, ...data: unknown[]) => void;
  /** Pause execution (like debugger;) */
  pause: (context?: unknown) => void;
  /** Pause only when condition is true */
  pauseIf: (condition: boolean, context?: unknown) => void;
  /** Inspect a value — logs and pauses */
  inspect: (value: unknown, label?: string) => void;
  /** Watch a value for changes */
  watch: (label: string, value: unknown) => void;
  /** Start a performance timer */
  time: (label: string) => void;
  /** End a performance timer and log duration */
  timeEnd: (label: string) => number | null;
  /** Get current render count */
  renderCount: number;
  /** Group related logs */
  group: (label: string) => void;
  /** End a log group */
  groupEnd: () => void;
  /** Log a table */
  table: (data: unknown) => void;
  /** Clear the console */
  clear: () => void;
  /** Assert a condition — logs error if false */
  assert: (condition: boolean, message: string, ...data: unknown[]) => void;
  /** Count how many times this label has been called */
  count: (label?: string) => number;
  /** Take a snapshot of data */
  snapshot: (label: string, data: Record<string, unknown>) => void;
  /** Get all snapshots */
  getSnapshots: () => Snapshot[];
}
