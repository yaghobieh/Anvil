import { useRef, useEffect } from 'react';

/**
 * Hook that returns the previous value
 * @param value - Current value
 * @returns Previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook that returns both previous and current values
 * @param value - Current value
 * @returns Object with current and previous values
 */
export function usePreviousDistinct<T>(value: T): {
  current: T;
  previous: T | undefined;
  hasChanged: boolean;
} {
  const previousRef = useRef<T>();
  const currentRef = useRef<T>(value);
  const hasChanged = currentRef.current !== value;

  useEffect(() => {
    if (hasChanged) {
      previousRef.current = currentRef.current;
      currentRef.current = value;
    }
  }, [value, hasChanged]);

  return {
    current: value,
    previous: previousRef.current,
    hasChanged,
  };
}

/**
 * Hook that tracks value history
 * @param value - Current value
 * @param maxHistory - Maximum history length
 * @returns History array
 */
export function useHistory<T>(value: T, maxHistory: number = 10): T[] {
  const historyRef = useRef<T[]>([]);

  useEffect(() => {
    historyRef.current = [...historyRef.current, value].slice(-maxHistory);
  }, [value, maxHistory]);

  return historyRef.current;
}

/**
 * Hook that tracks if value has changed
 * @param value - Current value
 * @param comparator - Custom comparison function
 * @returns Whether value has changed
 */
export function useHasChanged<T>(
  value: T,
  comparator: (a: T | undefined, b: T) => boolean = (a, b) => a !== b
): boolean {
  const previousRef = useRef<T>();
  const hasChanged = comparator(previousRef.current, value);

  useEffect(() => {
    previousRef.current = value;
  }, [value]);

  return hasChanged;
}

