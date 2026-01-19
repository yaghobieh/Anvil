import { useState, useEffect, useRef, useCallback } from 'react';
import type { UseThrottleOptions } from '../../types';
import { THROTTLE_INTERVAL_MS } from '../../constants';

/**
 * Hook that returns a throttled value
 * @param value - Value to throttle
 * @param interval - Interval in milliseconds
 * @returns Throttled value
 */
export function useThrottleValue<T>(value: T, interval: number = THROTTLE_INTERVAL_MS): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastUpdated.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastUpdated.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastUpdated.current = Date.now();
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}

/**
 * Hook that returns a throttled callback
 * @param callback - Callback to throttle
 * @param options - Throttle options
 * @returns Throttled callback with cancel function
 */
export function useThrottle<T extends (...args: never[]) => unknown>(
  callback: T,
  options: UseThrottleOptions = { interval: THROTTLE_INTERVAL_MS }
): { call: T; cancel: () => void } {
  const { interval, leading = true, trailing = true } = options;
  const callbackRef = useRef(callback);
  const lastTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = null;
  }, []);

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const remaining = interval - (now - lastTimeRef.current);

      lastArgsRef.current = args;

      if (remaining <= 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        if (leading || lastTimeRef.current !== 0) {
          lastTimeRef.current = now;
          callbackRef.current(...args);
        }
      } else if (!timeoutRef.current && trailing) {
        timeoutRef.current = setTimeout(() => {
          lastTimeRef.current = leading ? Date.now() : 0;
          timeoutRef.current = null;
          if (lastArgsRef.current) {
            callbackRef.current(...lastArgsRef.current);
          }
        }, remaining);
      }
    }) as T,
    [interval, leading, trailing]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { call: throttledCallback, cancel };
}

