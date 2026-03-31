/**
 * useScope — React hook for enhanced debugging
 *
 * Provides a scoped debugger instance tied to a component's lifecycle.
 * Automatically tracks renders, mount/unmount, and provides all Scope methods.
 */
import { useRef, useEffect, useCallback, useMemo } from 'react';
import type { UseScopeOptions, UseScopeReturn, ScopeConfigOverride } from '../../types/debug.types';
import { createScope, Scope } from '../../utils/debug';

/** Default options for useScope */
const DEFAULT_OPTIONS: Required<Pick<UseScopeOptions, 'trackRenders' | 'trackLifecycle'>> = {
  trackRenders: true,
  trackLifecycle: true,
};

/**
 * React hook for enhanced debugging — scoped to a component.
 *
 * ```tsx
 * function CartPage() {
 *   const debug = useScope({ name: 'CartPage' });
 *
 *   debug.log('rendering', { itemCount: items.length });
 *   debug.time('loadItems');
 *
 *   useEffect(() => {
 *     fetchItems().then(() => debug.timeEnd('loadItems'));
 *   }, []);
 *
 *   debug.watch('items', items);
 *   debug.pauseIf(items.length === 0, 'No items!');
 *
 *   return <div>...</div>;
 * }
 * ```
 */
export function useScope(options: UseScopeOptions | string): UseScopeReturn {
  const opts = typeof options === 'string'
    ? { name: options, ...DEFAULT_OPTIONS }
    : { ...DEFAULT_OPTIONS, ...options };

  const { name, config, trackRenders, trackLifecycle } = opts;

  // Stable scope instance across renders
  const scopeRef = useRef<Scope | null>(null);
  if (!scopeRef.current) {
    scopeRef.current = createScope(name, config);
  }

  const scopeInstance = scopeRef.current;

  // Render counter
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  if (trackRenders && renderCountRef.current > 1) {
    scopeInstance.trace(`Render #${renderCountRef.current}`);
  }

  // Lifecycle tracking
  useEffect(() => {
    if (trackLifecycle) {
      scopeInstance.info('Mounted');
    }
    return () => {
      if (trackLifecycle) {
        scopeInstance.info(`Unmounted (after ${renderCountRef.current} renders)`);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stable method references
  const log = useCallback((message: string, ...data: unknown[]) => {
    scopeInstance.log(message, ...data);
  }, [scopeInstance]);

  const info = useCallback((message: string, ...data: unknown[]) => {
    scopeInstance.info(message, ...data);
  }, [scopeInstance]);

  const warn = useCallback((message: string, ...data: unknown[]) => {
    scopeInstance.warn(message, ...data);
  }, [scopeInstance]);

  const error = useCallback((message: string, ...data: unknown[]) => {
    scopeInstance.error(message, ...data);
  }, [scopeInstance]);

  const trace = useCallback((message: string, ...data: unknown[]) => {
    scopeInstance.trace(message, ...data);
  }, [scopeInstance]);

  const pause = useCallback((context?: unknown) => {
    scopeInstance.pause(context);
  }, [scopeInstance]);

  const pauseIf = useCallback((condition: boolean, context?: unknown) => {
    scopeInstance.pauseIf(condition, context);
  }, [scopeInstance]);

  const inspect = useCallback((value: unknown, label?: string) => {
    scopeInstance.inspect(value, label);
  }, [scopeInstance]);

  const watch = useCallback((label: string, value: unknown) => {
    scopeInstance.watch(label, value);
  }, [scopeInstance]);

  const time = useCallback((label: string) => {
    scopeInstance.time(label);
  }, [scopeInstance]);

  const timeEnd = useCallback((label: string) => {
    return scopeInstance.timeEnd(label);
  }, [scopeInstance]);

  const group = useCallback((label: string) => {
    scopeInstance.group(label);
  }, [scopeInstance]);

  const groupEnd = useCallback(() => {
    scopeInstance.groupEnd();
  }, [scopeInstance]);

  const table = useCallback((data: unknown) => {
    scopeInstance.table(data);
  }, [scopeInstance]);

  const clear = useCallback(() => {
    scopeInstance.clear();
  }, [scopeInstance]);

  const assert = useCallback((condition: boolean, message: string, ...data: unknown[]) => {
    scopeInstance.assert(condition, message, ...data);
  }, [scopeInstance]);

  const count = useCallback((label?: string) => {
    return scopeInstance.count(label);
  }, [scopeInstance]);

  const snapshot = useCallback((label: string, data: Record<string, unknown>) => {
    scopeInstance.snapshot(label, data);
  }, [scopeInstance]);

  const getSnapshots = useCallback(() => {
    return scopeInstance.getSnapshots();
  }, [scopeInstance]);

  return useMemo(() => ({
    log,
    info,
    warn,
    error,
    trace,
    pause,
    pauseIf,
    inspect,
    watch,
    time,
    timeEnd,
    renderCount: renderCountRef.current,
    group,
    groupEnd,
    table,
    clear,
    assert,
    count,
    snapshot,
    getSnapshots,
  }), [
    log, info, warn, error, trace, pause, pauseIf, inspect,
    watch, time, timeEnd, group, groupEnd, table, clear,
    assert, count, snapshot, getSnapshots,
  ]);
}

export type { UseScopeOptions, UseScopeReturn };
