import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook that returns whether component is mounted
 * @returns Mounted state ref
 */
export function useMounted(): () => boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return useCallback(() => mountedRef.current, []);
}

/**
 * Hook that runs effect only after first mount
 * @param effect - Effect to run
 * @param deps - Dependencies
 */
export function useUpdateEffect(
  effect: () => void | (() => void),
  deps: React.DependencyList
): void {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    return effect();
  }, deps);
}

/**
 * Hook that runs effect only on first mount
 * @param effect - Effect to run
 */
export function useMountEffect(effect: () => void | (() => void)): void {
  useEffect(() => {
    return effect();
  }, []);
}

/**
 * Hook that runs effect on unmount
 * @param effect - Effect to run on unmount
 */
export function useUnmountEffect(effect: () => void): void {
  const effectRef = useRef(effect);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    return () => {
      effectRef.current();
    };
  }, []);
}

/**
 * Hook for first render detection
 * @returns Whether this is first render
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
}

/**
 * Hook that forces component to re-render
 * @returns Force update function
 */
export function useForceUpdate(): () => void {
  const [, setTick] = useState(0);

  return useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
}

/**
 * Hook for render count
 * @returns Render count
 */
export function useRenderCount(): number {
  const countRef = useRef(0);
  countRef.current += 1;
  return countRef.current;
}

/**
 * Hook that tracks component lifecycle
 * @param name - Component name for logging
 */
export function useLifecycle(name: string = 'Component'): void {
  useEffect(() => {
    console.log(`${name} mounted`);
    return () => {
      console.log(`${name} unmounted`);
    };
  }, [name]);
}

/**
 * Hook for safe state updates (prevents updates after unmount)
 * @param initialState - Initial state
 * @returns State and safe setter
 */
export function useSafeState<T>(
  initialState: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState(initialState);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setSafeState = useCallback((value: T | ((prev: T) => T)) => {
    if (mountedRef.current) {
      setState(value);
    }
  }, []);

  return [state, setSafeState];
}

/**
 * Hook for conditional rendering with delay
 * @param condition - Condition to check
 * @param delay - Delay before showing/hiding
 * @returns Whether to render
 */
export function useDelayedRender(condition: boolean, delay: number = 0): boolean {
  const [shouldRender, setShouldRender] = useState(condition);

  useEffect(() => {
    if (condition) {
      const timer = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldRender(false);
    }
  }, [condition, delay]);

  return shouldRender;
}

