import type { Debounced, Throttled, Memoized } from '../types';
import { DEFAULT_DEBOUNCE_OPTIONS, DEFAULT_THROTTLE_OPTIONS } from '../constants';

/**
 * Creates a debounced function
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @param options - Debounce options
 * @returns Debounced function
 */
export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number = DEFAULT_DEBOUNCE_OPTIONS.delay,
  options: { leading?: boolean; trailing?: boolean } = {}
): Debounced<T> {
  const { leading = false, trailing = true } = options;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastResult: ReturnType<T>;
  let isLeadingInvoked = false;

  const cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
    isLeadingInvoked = false;
  };

  const flush = (): void => {
    if (timeoutId && lastArgs) {
      lastResult = fn(...lastArgs) as ReturnType<T>;
      cancel();
    }
  };

  const debounced = ((...args: Parameters<T>): void => {
    lastArgs = args;

    if (leading && !isLeadingInvoked) {
      isLeadingInvoked = true;
      lastResult = fn(...args) as ReturnType<T>;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      if (trailing && lastArgs) {
        lastResult = fn(...lastArgs) as ReturnType<T>;
      }
      cancel();
    }, delay);
  }) as Debounced<T>;

  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
}

/**
 * Creates a throttled function
 * @param fn - Function to throttle
 * @param interval - Interval in milliseconds
 * @param options - Throttle options
 * @returns Throttled function
 */
export function throttle<T extends (...args: never[]) => unknown>(
  fn: T,
  interval: number = DEFAULT_THROTTLE_OPTIONS.interval,
  options: { leading?: boolean; trailing?: boolean } = {}
): Throttled<T> {
  const { leading = true, trailing = true } = options;
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;

  const cancel = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastArgs = null;
  };

  const throttled = ((...args: Parameters<T>): void => {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    lastArgs = args;

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (leading || lastTime !== 0) {
        lastTime = now;
        fn(...args);
      }
    } else if (!timeoutId && trailing) {
      timeoutId = setTimeout(() => {
        lastTime = leading ? Date.now() : 0;
        timeoutId = null;
        if (lastArgs) {
          fn(...lastArgs);
        }
      }, remaining);
    }
  }) as Throttled<T>;

  throttled.cancel = cancel;

  return throttled;
}

/**
 * Creates a memoized function
 * @param fn - Function to memoize
 * @param keyResolver - Custom key resolver
 * @returns Memoized function
 */
export function memoize<T extends (...args: never[]) => unknown>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string
): Memoized<T> {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  }) as Memoized<T>;

  memoized.cache = cache;
  memoized.clear = (): void => {
    cache.clear();
  };

  return memoized;
}

/**
 * Creates a function that can only be called once
 * @param fn - Function to wrap
 * @returns Function that executes only once
 */
export function once<T extends (...args: never[]) => unknown>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args) as ReturnType<T>;
    }
    return result;
  }) as T;
}

/**
 * Creates a function that delays execution
 * @param fn - Function to delay
 * @param wait - Delay in milliseconds
 * @returns Delayed function
 */
export function delay<T extends (...args: never[]) => unknown>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn(...args) as ReturnType<T>);
      }, wait);
    });
  };
}

/**
 * Creates a function that retries on failure
 * @param fn - Function to retry
 * @param retries - Number of retries
 * @param delayMs - Delay between retries
 * @returns Retrying function
 */
export function retry<T extends (...args: never[]) => Promise<unknown>>(
  fn: T,
  retries: number = 3,
  delayMs: number = 1000
): T {
  return (async (...args: Parameters<T>): Promise<unknown> => {
    let lastError: Error;
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error as Error;
        if (i < retries) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }
    throw lastError!;
  }) as T;
}

/**
 * Composes functions from right to left
 * @param fns - Functions to compose
 * @returns Composed function
 */
export function compose<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T): T => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Pipes functions from left to right
 * @param fns - Functions to pipe
 * @returns Piped function
 */
export function pipe<T>(...fns: ((arg: T) => T)[]): (arg: T) => T {
  return (arg: T): T => fns.reduce((acc, fn) => fn(acc), arg);
}

/**
 * Curries a function
 * @param fn - Function to curry
 * @returns Curried function
 */
export function curry<T extends (...args: never[]) => unknown>(
  fn: T
): (...args: unknown[]) => unknown {
  const arity = fn.length;
  return function curried(...args: unknown[]): unknown {
    if (args.length >= arity) {
      return fn(...(args as Parameters<T>));
    }
    return (...moreArgs: unknown[]): unknown => curried(...args, ...moreArgs);
  };
}

/**
 * Partially applies arguments to a function
 * @param fn - Function to partially apply
 * @param args - Arguments to apply
 * @returns Partially applied function
 */
export function partial<T extends (...args: never[]) => unknown>(
  fn: T,
  ...args: unknown[]
): (...moreArgs: unknown[]) => ReturnType<T> {
  return (...moreArgs: unknown[]): ReturnType<T> => {
    return fn(...(args.concat(moreArgs) as Parameters<T>)) as ReturnType<T>;
  };
}

/**
 * Negates a predicate function
 * @param fn - Predicate function
 * @returns Negated function
 */
export function negate<T extends (...args: never[]) => boolean>(fn: T): T {
  return ((...args: Parameters<T>): boolean => !fn(...args)) as T;
}

/**
 * Flips function argument order
 * @param fn - Function to flip
 * @returns Flipped function
 */
export function flip<A, B, R>(fn: (a: A, b: B) => R): (b: B, a: A) => R {
  return (b: B, a: A): R => fn(a, b);
}

/**
 * Creates a function that calls multiple functions
 * @param fns - Functions to call
 * @returns Function that calls all
 */
export function over<T extends (...args: never[]) => unknown>(
  ...fns: T[]
): (...args: Parameters<T>) => ReturnType<T>[] {
  return (...args: Parameters<T>): ReturnType<T>[] => {
    return fns.map((fn) => fn(...args) as ReturnType<T>);
  };
}

/**
 * Creates a function that checks if all predicates pass
 * @param fns - Predicate functions
 * @returns Combined predicate
 */
export function allPass<T extends (...args: never[]) => boolean>(
  ...fns: T[]
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>): boolean => fns.every((fn) => fn(...args));
}

/**
 * Creates a function that checks if any predicate passes
 * @param fns - Predicate functions
 * @returns Combined predicate
 */
export function anyPass<T extends (...args: never[]) => boolean>(
  ...fns: T[]
): (...args: Parameters<T>) => boolean {
  return (...args: Parameters<T>): boolean => fns.some((fn) => fn(...args));
}

/**
 * Creates a function with a fixed this context
 * @param fn - Function to bind
 * @param context - This context
 * @returns Bound function
 */
export function bind<T extends (...args: never[]) => unknown>(
  fn: T,
  context: unknown
): T {
  return fn.bind(context) as T;
}

/**
 * Creates an async version of a function
 * @param fn - Function to wrap
 * @returns Async function
 */
export function asyncify<T extends (...args: never[]) => unknown>(
  fn: T
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return fn(...args) as ReturnType<T>;
  };
}

/**
 * Wraps function with try-catch
 * @param fn - Function to wrap
 * @param fallback - Fallback value on error
 * @returns Safe function
 */
export function tryCatch<T extends (...args: never[]) => unknown>(
  fn: T,
  fallback: ReturnType<T>
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args) as ReturnType<T>;
    } catch {
      return fallback;
    }
  }) as T;
}

/**
 * Creates a function that limits concurrent calls
 * @param fn - Async function
 * @param limit - Concurrency limit
 * @returns Limited function
 */
export function limit<T extends (...args: never[]) => Promise<unknown>>(
  fn: T,
  limitNum: number
): T {
  let running = 0;
  const queue: (() => void)[] = [];

  return (async (...args: Parameters<T>): Promise<unknown> => {
    if (running >= limitNum) {
      await new Promise<void>((resolve) => queue.push(resolve));
    }
    running++;
    try {
      return await fn(...args);
    } finally {
      running--;
      const next = queue.shift();
      if (next) next();
    }
  }) as T;
}

/**
 * Creates a function that times execution
 * @param fn - Function to time
 * @param label - Console label
 * @returns Timed function
 */
export function timed<T extends (...args: never[]) => unknown>(
  fn: T,
  label?: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`${label || fn.name || 'Function'}: ${end - start}ms`);
    return result as ReturnType<T>;
  }) as T;
}

/**
 * Creates a function that logs arguments and result
 * @param fn - Function to log
 * @param label - Console label
 * @returns Logged function
 */
export function logged<T extends (...args: never[]) => unknown>(
  fn: T,
  label?: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const name = label || fn.name || 'Function';
    console.log(`${name} called with:`, args);
    const result = fn(...args);
    console.log(`${name} returned:`, result);
    return result as ReturnType<T>;
  }) as T;
}

/**
 * Creates a function that executes after n calls
 * @param n - Number of calls before execution
 * @param fn - Function to execute
 * @returns Delayed execution function
 */
export function after<T extends (...args: never[]) => unknown>(n: number, fn: T): T {
  let count = 0;
  return ((...args: Parameters<T>): ReturnType<T> | undefined => {
    count++;
    if (count >= n) {
      return fn(...args) as ReturnType<T>;
    }
    return undefined;
  }) as T;
}

/**
 * Creates a function that executes only first n times
 * @param n - Maximum number of executions
 * @param fn - Function to execute
 * @returns Limited function
 */
export function before<T extends (...args: never[]) => unknown>(n: number, fn: T): T {
  let count = 0;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (count < n) {
      count++;
      result = fn(...args) as ReturnType<T>;
    }
    return result;
  }) as T;
}

/**
 * Creates a function that wraps result in array
 * @param fn - Function to wrap
 * @returns Function returning array
 */
export function wrap<T extends (...args: never[]) => unknown>(
  fn: T
): (...args: Parameters<T>) => [ReturnType<T>] {
  return (...args: Parameters<T>): [ReturnType<T>] => {
    return [fn(...args) as ReturnType<T>];
  };
}

/**
 * Sleeps for specified duration
 * @param ms - Duration in milliseconds
 * @returns Promise that resolves after duration
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Creates a timeout promise
 * @param ms - Timeout in milliseconds
 * @param message - Error message
 * @returns Promise that rejects after timeout
 */
export function timeout<T>(ms: number, message: string = 'Timeout'): Promise<T> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
}

/**
 * Races a promise against a timeout
 * @param promise - Promise to race
 * @param ms - Timeout in milliseconds
 * @param message - Error message
 * @returns Promise result or timeout error
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message?: string
): Promise<T> {
  return Promise.race([promise, timeout<T>(ms, message)]);
}

/**
 * Creates an identity function
 * @returns Identity function
 */
export function identity<T>(): (value: T) => T {
  return (value: T): T => value;
}

/**
 * Creates a constant function
 * @param value - Value to return
 * @returns Constant function
 */
export function constant<T>(value: T): () => T {
  return (): T => value;
}

/**
 * No-operation function
 */
export function noop(): void {}

/**
 * Stub function returning true
 * @returns True
 */
export function stubTrue(): boolean {
  return true;
}

/**
 * Stub function returning false
 * @returns False
 */
export function stubFalse(): boolean {
  return false;
}

/**
 * Stub function returning empty array
 * @returns Empty array
 */
export function stubArray<T>(): T[] {
  return [];
}

/**
 * Stub function returning empty object
 * @returns Empty object
 */
export function stubObject<T extends object>(): T {
  return {} as T;
}

/**
 * Stub function returning empty string
 * @returns Empty string
 */
export function stubString(): string {
  return '';
}

