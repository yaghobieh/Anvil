import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseDebounceOptions } from '../../types';
import { DEBOUNCE_DELAY_MS } from '../../constants';

/**
 * Hook that returns a debounced value
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 */
export function useDebounceValue<T>(value: T, delay: number = DEBOUNCE_DELAY_MS): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that returns a debounced callback
 * @param callback - Callback to debounce
 * @param options - Debounce options
 * @returns Debounced callback
 */
export function useDebounce<T extends (...args: never[]) => unknown>(
  callback: T,
  options: UseDebounceOptions = { delay: DEBOUNCE_DELAY_MS }
): { call: T; cancel: () => void; flush: () => void } {
  const { delay, leading = false, trailing = true } = options;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);
  const lastArgsRef = useRef<Parameters<T> | null>(null);
  const leadingCalledRef = useRef(false);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = null;
    leadingCalledRef.current = false;
  }, []);

  const flush = useCallback(() => {
    if (lastArgsRef.current) {
      callbackRef.current(...lastArgsRef.current);
      cancel();
    }
  }, [cancel]);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      lastArgsRef.current = args;

      if (leading && !leadingCalledRef.current) {
        leadingCalledRef.current = true;
        callbackRef.current(...args);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (trailing && lastArgsRef.current) {
          callbackRef.current(...lastArgsRef.current);
        }
        cancel();
      }, delay);
    }) as T,
    [delay, leading, trailing, cancel]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { call: debouncedCallback, cancel, flush };
}

