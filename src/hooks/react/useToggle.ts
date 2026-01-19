import { useState, useCallback } from 'react';
import type { UseToggleReturn } from '../../types';

/**
 * Hook for boolean toggle state
 * @param initialValue - Initial boolean value
 * @returns Toggle state and handlers
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((): void => {
    setValue((prev) => !prev);
  }, []);

  const set = useCallback((newValue: boolean): void => {
    setValue(newValue);
  }, []);

  return [value, toggle, set];
}

/**
 * Hook for boolean state with on/off/toggle handlers
 * @param initialValue - Initial boolean value
 * @returns Extended toggle handlers
 */
export function useBoolean(initialValue: boolean = false): {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  set: (value: boolean) => void;
} {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((): void => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = useCallback((): void => {
    setValue(true);
  }, []);

  const setFalse = useCallback((): void => {
    setValue(false);
  }, []);

  const set = useCallback((newValue: boolean): void => {
    setValue(newValue);
  }, []);

  return { value, toggle, setTrue, setFalse, set };
}

/**
 * Hook for cycling through values
 * @param values - Array of values to cycle through
 * @param initialIndex - Initial index
 * @returns Current value and cycle handlers
 */
export function useCycle<T>(
  values: T[],
  initialIndex: number = 0
): {
  value: T;
  index: number;
  next: () => void;
  prev: () => void;
  set: (index: number) => void;
} {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback((): void => {
    setIndex((prev) => (prev + 1) % values.length);
  }, [values.length]);

  const prev = useCallback((): void => {
    setIndex((prev) => (prev - 1 + values.length) % values.length);
  }, [values.length]);

  const set = useCallback(
    (newIndex: number): void => {
      if (newIndex >= 0 && newIndex < values.length) {
        setIndex(newIndex);
      }
    },
    [values.length]
  );

  return { value: values[index], index, next, prev, set };
}

/**
 * Hook for disclosure state (modals, dropdowns, etc.)
 * @param initialOpen - Initial open state
 * @returns Disclosure state and handlers
 */
export function useDisclosure(initialOpen: boolean = false): {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
} {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, open, close, toggle };
}

