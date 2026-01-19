import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseFetchState, UseFetchOptions } from '../../types';

/**
 * Hook for handling async operations
 * @param asyncFn - Async function to execute
 * @param options - Options for the hook
 * @returns Async state and controls
 */
export function useAsync<T, Args extends unknown[] = unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
  options: UseFetchOptions = {}
): UseFetchState<T> & {
  execute: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
} {
  const { immediate = false, refetchInterval } = options;
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });
  const mountedRef = useRef(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await asyncFn(...args);
        if (mountedRef.current) {
          setState({ data: result, loading: false, error: null });
        }
        return result;
      } catch (error) {
        if (mountedRef.current) {
          setState({ data: null, loading: false, error: error as Error });
        }
        return undefined;
      }
    },
    [asyncFn]
  );

  const reset = useCallback((): void => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (immediate) {
      execute(...([] as unknown as Args));
    }
  }, [immediate, execute]);

  useEffect(() => {
    if (refetchInterval) {
      intervalRef.current = setInterval(() => {
        execute(...([] as unknown as Args));
      }, refetchInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refetchInterval, execute]);

  return { ...state, execute, reset };
}

/**
 * Hook for fetching data
 * @param url - URL to fetch
 * @param options - Fetch options
 * @returns Fetch state
 */
export function useFetch<T>(
  url: string,
  options?: RequestInit & UseFetchOptions
): UseFetchState<T> & { refetch: () => Promise<void> } {
  const { immediate = true, refetchOnFocus = false, refetchInterval, ...fetchOptions } = options || {};

  const fetchData = useCallback(async (): Promise<T> => {
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }, [url, fetchOptions]);

  const { data, loading, error, execute, reset } = useAsync<T, []>(fetchData, {
    immediate,
    refetchInterval,
  });

  const refetch = useCallback(async (): Promise<void> => {
    await execute();
  }, [execute]);

  useEffect(() => {
    if (!refetchOnFocus) return;

    const handleFocus = (): void => {
      refetch();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnFocus, refetch]);

  return { data, loading, error, refetch };
}

/**
 * Hook for mutation operations
 * @param mutationFn - Mutation function
 * @returns Mutation state and mutate function
 */
export function useMutation<T, Args extends unknown[] = unknown[]>(
  mutationFn: (...args: Args) => Promise<T>
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  mutate: (...args: Args) => Promise<T | undefined>;
  reset: () => void;
} {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mutate = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const result = await mutationFn(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error });
        return undefined;
      }
    },
    [mutationFn]
  );

  const reset = useCallback((): void => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, mutate, reset };
}

/**
 * Hook for polling data
 * @param asyncFn - Async function to poll
 * @param interval - Polling interval in ms
 * @param enabled - Whether polling is enabled
 * @returns Poll state
 */
export function usePolling<T>(
  asyncFn: () => Promise<T>,
  interval: number,
  enabled: boolean = true
): UseFetchState<T> & { stop: () => void; start: () => void } {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  const [isPolling, setIsPolling] = useState(enabled);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const poll = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const result = await asyncFn();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error }));
    }
  }, [asyncFn]);

  const stop = useCallback((): void => {
    setIsPolling(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const start = useCallback((): void => {
    setIsPolling(true);
  }, []);

  useEffect(() => {
    if (!isPolling) return;

    poll();
    intervalRef.current = setInterval(poll, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPolling, interval, poll]);

  return { ...state, stop, start };
}

/**
 * Hook for lazy loading
 * @param loader - Loader function
 * @returns Lazy state and trigger
 */
export function useLazy<T>(loader: () => Promise<T>): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  load: () => Promise<T | undefined>;
  isLoaded: boolean;
} {
  const [state, setState] = useState<UseFetchState<T> & { isLoaded: boolean }>({
    data: null,
    loading: false,
    error: null,
    isLoaded: false,
  });

  const load = useCallback(async (): Promise<T | undefined> => {
    if (state.isLoaded) return state.data ?? undefined;

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const result = await loader();
      setState({ data: result, loading: false, error: null, isLoaded: true });
      return result;
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error }));
      return undefined;
    }
  }, [loader, state.isLoaded, state.data]);

  return { ...state, load };
}

