/**
 * Scope — Enhanced Debugger for ForgeStack
 *
 * Works everywhere: functions, classes, callbacks, async code, React FC, hooks.
 * Drop-in replacement for `debugger;` with superpowers.
 */
import type {
  DebugLevel,
  ScopeConfig,
  ScopeConfigOverride,
  WatchEntry,
  TimerEntry,
  Snapshot,
  DebugHandler,
} from '../types/debug.types';
import {
  DEBUG_LEVELS,
  DEBUG_LEVEL_STYLES,
  DEBUG_LEVEL_BADGES,
  DEFAULT_SCOPE_CONFIG,
  SCOPE_LOGO,
  MAX_WATCH_HISTORY,
  MAX_SNAPSHOTS,
  MAX_TIMERS,
  DEFAULT_COUNTER_LABEL,
  HAS_PERFORMANCE,
  HAS_CONSOLE,
} from '../constants/debug.constants';

/** Get current high-resolution timestamp */
function now(): number {
  return HAS_PERFORMANCE ? performance.now() : Date.now();
}

/** Format timestamp for display */
function formatTime(): string {
  const d = new Date();
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
}

/** Deep compare two values (shallow for performance) */
function hasChanged(a: unknown, b: unknown): boolean {
  if (a === b) return false;
  if (typeof a !== typeof b) return true;
  if (a === null || b === null) return a !== b;
  if (typeof a === 'object' && typeof b === 'object') {
    try {
      return JSON.stringify(a) !== JSON.stringify(b);
    } catch {
      return true;
    }
  }
  return a !== b;
}

/**
 * Scope class — the enhanced debugger
 *
 * Usage:
 * ```ts
 * import { scope } from '@forgedevstack/anvil';
 *
 * // Like debugger; but smarter
 * scope.pause();
 * scope.pauseIf(count > 100);
 * scope.inspect(user, 'Login payload');
 *
 * // Scoped instance
 * const debug = scope.create('CartPage');
 * debug.log('Mounted');
 * debug.time('fetchItems');
 * debug.timeEnd('fetchItems');
 *
 * // Watch state changes
 * debug.watch('items', items);
 *
 * // Global controls
 * scope.enable();
 * scope.disable();
 * scope.setLevel('warn');
 * ```
 */
class Scope {
  private config: ScopeConfig;
  private label: string;
  private watches: Map<string, WatchEntry> = new Map();
  private timers: Map<string, TimerEntry> = new Map();
  private counters: Map<string, number> = new Map();
  private snapshots: Snapshot[] = [];
  private snapshotId = 0;

  constructor(label = 'Scope', config?: ScopeConfigOverride) {
    this.label = label;
    this.config = { ...DEFAULT_SCOPE_CONFIG, ...config };
  }

  // ──────────────────────────────────────────────
  // Configuration
  // ──────────────────────────────────────────────

  /** Enable all debugging */
  enable(): this {
    this.config.enabled = true;
    return this;
  }

  /** Disable all debugging (production) */
  disable(): this {
    this.config.enabled = false;
    return this;
  }

  /** Check if debugging is enabled */
  isEnabled(): boolean {
    return this.config.enabled;
  }

  /** Set the minimum log level */
  setLevel(level: DebugLevel): this {
    this.config.level = level;
    return this;
  }

  /** Get the current log level */
  getLevel(): DebugLevel {
    return this.config.level;
  }

  /** Update configuration */
  configure(overrides: ScopeConfigOverride): this {
    Object.assign(this.config, overrides);
    return this;
  }

  /** Set a custom log handler */
  setHandler(handler: DebugHandler | null): this {
    this.config.handler = handler;
    return this;
  }

  // ──────────────────────────────────────────────
  // Logging
  // ──────────────────────────────────────────────

  /** Check if a level should be displayed */
  private shouldLog(level: DebugLevel): boolean {
    if (!this.config.enabled) return false;
    return DEBUG_LEVELS[level] >= DEBUG_LEVELS[this.config.level];
  }

  /** Core log method */
  private _log(level: DebugLevel, message: string, data: unknown[]): void {
    if (!this.shouldLog(level)) return;

    // Custom handler takes priority
    if (this.config.handler) {
      this.config.handler(level, this.label, message, data.length === 1 ? data[0] : data);
      return;
    }

    if (!HAS_CONSOLE) return;

    const parts: string[] = [];
    const styles: string[] = [];

    // Logo
    parts.push(`%c${SCOPE_LOGO}`);
    styles.push('font-size: 12px;');

    // Timestamp
    if (this.config.timestamps) {
      parts.push(`%c${formatTime()}`);
      styles.push('color: #6b7280; font-size: 10px;');
    }

    // Level badge
    parts.push(`%c ${DEBUG_LEVEL_BADGES[level]} `);
    styles.push(
      `${DEBUG_LEVEL_STYLES[level]} background: ${level === 'error' ? '#fef2f2' : level === 'warn' ? '#fffbeb' : 'transparent'}; padding: 1px 4px; border-radius: 3px; font-size: 10px;`
    );

    // Label
    if (this.config.showLabel) {
      parts.push(`%c[${this.label}]`);
      styles.push(`color: ${this.config.labelColor}; font-weight: bold; font-size: 11px;`);
    }

    // Message
    parts.push(`%c${message}`);
    styles.push('color: inherit; font-weight: normal;');

    const prefix = parts.join(' ');

    // Use appropriate console method
    const consoleFn =
      level === 'error'
        ? console.error
        : level === 'warn'
          ? console.warn
          : level === 'info'
            ? console.info
            : level === 'trace'
              ? console.debug
              : console.log;

    if (data.length > 0) {
      consoleFn(prefix, ...styles, ...data);
    } else {
      consoleFn(prefix, ...styles);
    }
  }

  /** Log at trace level (verbose) */
  trace(message: string, ...data: unknown[]): void {
    this._log('trace', message, data);
  }

  /** Log at debug level */
  log(message: string, ...data: unknown[]): void {
    this._log('debug', message, data);
  }

  /** Log at info level */
  info(message: string, ...data: unknown[]): void {
    this._log('info', message, data);
  }

  /** Log at warn level */
  warn(message: string, ...data: unknown[]): void {
    this._log('warn', message, data);
  }

  /** Log at error level */
  error(message: string, ...data: unknown[]): void {
    this._log('error', message, data);
  }

  // ──────────────────────────────────────────────
  // Breakpoints (enhanced debugger;)
  // ──────────────────────────────────────────────

  /**
   * Pause execution — like `debugger;` but with context.
   * When DevTools is open, this will trigger a breakpoint.
   * All local variables in the calling scope are accessible.
   */
  pause(context?: unknown): void {
    if (!this.config.enabled || !this.config.breakpoints) return;
    if (context !== undefined) {
      this._log('debug', '⏸ Breakpoint hit', [context]);
    } else {
      this._log('debug', '⏸ Breakpoint hit', []);
    }
    // eslint-disable-next-line no-debugger
    debugger;
  }

  /**
   * Conditional pause — only triggers debugger; when condition is true.
   *
   * ```ts
   * scope.pauseIf(items.length > 100, { items, count: items.length });
   * ```
   */
  pauseIf(condition: boolean, context?: unknown): void {
    if (!condition) return;
    if (!this.config.enabled || !this.config.breakpoints) return;
    this._log('debug', '⏸ Conditional breakpoint triggered', context !== undefined ? [context] : []);
    // eslint-disable-next-line no-debugger
    debugger;
  }

  /**
   * Inspect a value — logs it richly then pauses.
   * Like debugger; but shows you the value first.
   */
  inspect(value: unknown, label = 'Inspecting'): void {
    if (!this.config.enabled) return;
    this._log('info', `🔎 ${label}`, [value]);
    if (this.config.breakpoints) {
      // eslint-disable-next-line no-debugger
      debugger;
    }
  }

  // ──────────────────────────────────────────────
  // Watch (detect state changes)
  // ──────────────────────────────────────────────

  /**
   * Watch a value — logs a diff whenever it changes.
   * Call on every render / update with the same label.
   *
   * ```ts
   * scope.watch('user', user); // logs when user object changes
   * ```
   */
  watch(label: string, value: unknown): void {
    if (!this.config.enabled) return;

    const existing = this.watches.get(label);

    if (!existing) {
      // First call — register
      this.watches.set(label, {
        label,
        previousValue: undefined,
        currentValue: value,
        changeCount: 0,
        lastChanged: Date.now(),
      });
      this._log('debug', `👁 Watch registered: "${label}"`, [value]);
      return;
    }

    if (hasChanged(existing.currentValue, value)) {
      const entry: WatchEntry = {
        label,
        previousValue: existing.currentValue,
        currentValue: value,
        changeCount: existing.changeCount + 1,
        lastChanged: Date.now(),
      };
      this.watches.set(label, entry);
      this._log('info', `👁 Watch "${label}" changed (#${entry.changeCount})`, [
        { from: existing.currentValue, to: value },
      ]);

      // Trim old entries if needed
      if (this.watches.size > MAX_WATCH_HISTORY) {
        const firstKey = this.watches.keys().next().value;
        if (firstKey) this.watches.delete(firstKey);
      }
    }
  }

  /**
   * Watch + pause — pauses when value changes
   */
  watchBreak(label: string, value: unknown): void {
    if (!this.config.enabled) return;

    const existing = this.watches.get(label);
    this.watch(label, value);

    if (existing && hasChanged(existing.currentValue, value)) {
      this._log('warn', `⏸ Watch breakpoint: "${label}" changed`, [
        { from: existing.currentValue, to: value },
      ]);
      if (this.config.breakpoints) {
        // eslint-disable-next-line no-debugger
        debugger;
      }
    }
  }

  /** Get all current watches */
  getWatches(): Map<string, WatchEntry> {
    return new Map(this.watches);
  }

  /** Clear a specific watch */
  unwatch(label: string): void {
    this.watches.delete(label);
  }

  /** Clear all watches */
  unwatchAll(): void {
    this.watches.clear();
  }

  // ──────────────────────────────────────────────
  // Performance Timing
  // ──────────────────────────────────────────────

  /**
   * Start a performance timer
   *
   * ```ts
   * scope.time('API call');
   * await fetchUsers();
   * scope.timeEnd('API call'); // → "API call: 123.45ms"
   * ```
   */
  time(label: string): void {
    if (!this.config.enabled || !this.config.performance) return;
    this.timers.set(label, {
      label,
      startTime: now(),
      endTime: null,
      duration: null,
    });
  }

  /**
   * End a timer and log the duration
   * @returns Duration in ms, or null if timer not found
   */
  timeEnd(label: string): number | null {
    if (!this.config.enabled || !this.config.performance) return null;

    const timer = this.timers.get(label);
    if (!timer) {
      this._log('warn', `⏱ Timer "${label}" not found`, []);
      return null;
    }

    const endTime = now();
    const duration = endTime - timer.startTime;

    timer.endTime = endTime;
    timer.duration = duration;

    const formatted = duration < 1
      ? `${(duration * 1000).toFixed(0)}µs`
      : duration < 1000
        ? `${duration.toFixed(2)}ms`
        : `${(duration / 1000).toFixed(2)}s`;

    const color = duration < 100 ? '#34d399' : duration < 500 ? '#fbbf24' : '#f87171';

    if (HAS_CONSOLE) {
      console.log(
        `${SCOPE_LOGO} %c⏱ ${label}: %c${formatted}`,
        `color: ${this.config.labelColor}; font-weight: bold;`,
        `color: ${color}; font-weight: bold; font-size: 12px;`
      );
    }

    // Trim
    if (this.timers.size > MAX_TIMERS) {
      const firstKey = this.timers.keys().next().value;
      if (firstKey) this.timers.delete(firstKey);
    }

    return duration;
  }

  /** Get all recorded timers */
  getTimers(): Map<string, TimerEntry> {
    return new Map(this.timers);
  }

  // ──────────────────────────────────────────────
  // Counters
  // ──────────────────────────────────────────────

  /**
   * Count how many times a label has been called
   *
   * ```ts
   * scope.count('render'); // → 1
   * scope.count('render'); // → 2
   * ```
   */
  count(label = DEFAULT_COUNTER_LABEL): number {
    const current = (this.counters.get(label) || 0) + 1;
    this.counters.set(label, current);
    if (this.shouldLog('debug')) {
      this._log('debug', `🔢 ${label}: ${current}`, []);
    }
    return current;
  }

  /** Reset a counter */
  countReset(label = DEFAULT_COUNTER_LABEL): void {
    this.counters.set(label, 0);
  }

  // ──────────────────────────────────────────────
  // Console utilities
  // ──────────────────────────────────────────────

  /** Start a grouped log section */
  group(label: string): void {
    if (!this.config.enabled || !HAS_CONSOLE) return;
    if (this.config.groupCollapsed) {
      console.groupCollapsed(`${SCOPE_LOGO} [${this.label}] ${label}`);
    } else {
      console.group(`${SCOPE_LOGO} [${this.label}] ${label}`);
    }
  }

  /** End a grouped log section */
  groupEnd(): void {
    if (!this.config.enabled || !HAS_CONSOLE) return;
    console.groupEnd();
  }

  /** Log a table */
  table(data: unknown): void {
    if (!this.config.enabled || !HAS_CONSOLE) return;
    this._log('debug', '📊 Table:', []);
    console.table(data);
  }

  /** Assert a condition */
  assert(condition: boolean, message: string, ...data: unknown[]): void {
    if (!this.config.enabled) return;
    if (!condition) {
      this._log('error', `❌ Assertion failed: ${message}`, data);
      if (this.config.breakpoints) {
        // eslint-disable-next-line no-debugger
        debugger;
      }
    }
  }

  /** Clear the console */
  clear(): void {
    if (HAS_CONSOLE) console.clear();
  }

  // ──────────────────────────────────────────────
  // Snapshots
  // ──────────────────────────────────────────────

  /**
   * Take a snapshot of data at this point in time
   *
   * ```ts
   * scope.snapshot('before-update', { user, cart });
   * // ... update ...
   * scope.snapshot('after-update', { user, cart });
   * ```
   */
  snapshot(label: string, data: Record<string, unknown>): void {
    if (!this.config.enabled) return;

    const entry: Snapshot = {
      id: ++this.snapshotId,
      timestamp: Date.now(),
      label,
      data: JSON.parse(JSON.stringify(data)),
    };

    this.snapshots.push(entry);

    // Trim old
    if (this.snapshots.length > MAX_SNAPSHOTS) {
      this.snapshots.shift();
    }

    this._log('info', `📸 Snapshot #${entry.id}: "${label}"`, [data]);
  }

  /** Get all snapshots */
  getSnapshots(): Snapshot[] {
    return [...this.snapshots];
  }

  /** Clear all snapshots */
  clearSnapshots(): void {
    this.snapshots = [];
    this.snapshotId = 0;
  }

  // ──────────────────────────────────────────────
  // Factory
  // ──────────────────────────────────────────────

  /**
   * Create a scoped instance with its own label and config
   *
   * ```ts
   * const debug = scope.create('CartPage', { level: 'info' });
   * debug.log('mounted');
   * debug.time('loadItems');
   * ```
   */
  create(label: string, config?: ScopeConfigOverride): Scope {
    return new Scope(label, { ...this.config, ...config });
  }

  // ──────────────────────────────────────────────
  // Reset
  // ──────────────────────────────────────────────

  /** Reset all internal state */
  reset(): void {
    this.watches.clear();
    this.timers.clear();
    this.counters.clear();
    this.snapshots = [];
    this.snapshotId = 0;
  }
}

// ──────────────────────────────────────────────
// Global singleton
// ──────────────────────────────────────────────

/**
 * Global Scope instance — use this for quick debugging.
 *
 * ```ts
 * import { scope } from '@forgedevstack/anvil';
 *
 * scope.pause();                         // like debugger;
 * scope.pauseIf(count > 100);           // conditional
 * scope.inspect(user, 'Login payload'); // logs + pauses
 * scope.watch('cart', cartItems);        // logs on change
 * scope.time('API');                     // start timer
 * scope.timeEnd('API');                  // end timer
 *
 * scope.disable();                       // silence all (production)
 * scope.setLevel('warn');               // only warn+error
 *
 * const debug = scope.create('MyPage'); // scoped instance
 * ```
 */
export const scope = new Scope('App');

/**
 * Create a new Scope instance
 */
export function createScope(label: string, config?: ScopeConfigOverride): Scope {
  return new Scope(label, config);
}

export { Scope };
