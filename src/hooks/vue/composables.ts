import { ref, computed, watch, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue';
import type { ResponsiveState, BreakpointConfig, Breakpoint } from '../../types';
import { DEFAULT_BREAKPOINT_CONFIG, BREAKPOINTS, DEBOUNCE_DELAY_MS, THROTTLE_INTERVAL_MS } from '../../constants';

/**
 * Composable that returns a debounced ref
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced ref
 */
export function useDebounce<T>(value: Ref<T>, delay: number = DEBOUNCE_DELAY_MS): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeoutId: ReturnType<typeof setTimeout>;

  watch(value, (newValue) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  return debouncedValue;
}

/**
 * Composable that returns a throttled ref
 * @param value - Value to throttle
 * @param interval - Interval in milliseconds
 * @returns Throttled ref
 */
export function useThrottle<T>(value: Ref<T>, interval: number = THROTTLE_INTERVAL_MS): Ref<T> {
  const throttledValue = ref(value.value) as Ref<T>;
  let lastTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  watch(value, (newValue) => {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastTime = now;
      throttledValue.value = newValue;
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastTime = Date.now();
        timeoutId = null;
        throttledValue.value = value.value;
      }, remaining);
    }
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return throttledValue;
}

/**
 * Composable for responsive state
 * @param customBreakpoints - Custom breakpoint configuration
 * @returns Responsive state object
 */
export function useResponsive(customBreakpoints?: Partial<BreakpointConfig>): {
  state: ComputedRef<ResponsiveState>;
  breakpoint: ComputedRef<Breakpoint>;
  isMobile: ComputedRef<boolean>;
  isTablet: ComputedRef<boolean>;
  isDesktop: ComputedRef<boolean>;
} {
  const breakpoints: BreakpointConfig = {
    ...DEFAULT_BREAKPOINT_CONFIG,
    ...customBreakpoints,
  };

  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0);

  const getBreakpoint = (w: number): Breakpoint => {
    if (w >= breakpoints['2xl']) return '2xl';
    if (w >= breakpoints.xl) return 'xl';
    if (w >= breakpoints.lg) return 'lg';
    if (w >= breakpoints.md) return 'md';
    if (w >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const breakpoint = computed(() => getBreakpoint(width.value));
  const isMobile = computed(() => width.value < BREAKPOINTS.MD);
  const isTablet = computed(() => width.value >= BREAKPOINTS.MD && width.value < BREAKPOINTS.LG);
  const isDesktop = computed(() => width.value >= BREAKPOINTS.LG);

  const state = computed<ResponsiveState>(() => ({
    breakpoint: breakpoint.value,
    width: width.value,
    height: height.value,
    isMobile: isMobile.value,
    isTablet: isTablet.value,
    isDesktop: isDesktop.value,
    isLandscape: width.value > height.value,
    isPortrait: height.value >= width.value,
  }));

  const handleResize = (): void => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { state, breakpoint, isMobile, isTablet, isDesktop };
}

/**
 * Composable for media query
 * @param query - Media query string
 * @returns Matches ref
 */
export function useMediaQuery(query: string): Ref<boolean> {
  const matches = ref(false);
  let mediaQuery: MediaQueryList;

  const handleChange = (event: MediaQueryListEvent): void => {
    matches.value = event.matches;
  };

  onMounted(() => {
    if (typeof window !== 'undefined') {
      mediaQuery = window.matchMedia(query);
      matches.value = mediaQuery.matches;
      mediaQuery.addEventListener('change', handleChange);
    }
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleChange);
  });

  return matches;
}

/**
 * Composable for localStorage sync
 * @param key - Storage key
 * @param initialValue - Initial value
 * @returns Synced ref
 */
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const readValue = (): T => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const storedValue = ref(readValue()) as Ref<T>;

  watch(
    storedValue,
    (newValue) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    { deep: true }
  );

  return storedValue;
}

/**
 * Composable for toggle state
 * @param initialValue - Initial value
 * @returns Toggle state and handlers
 */
export function useToggle(initialValue: boolean = false): {
  value: Ref<boolean>;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
} {
  const value = ref(initialValue);

  const toggle = (): void => {
    value.value = !value.value;
  };

  const setTrue = (): void => {
    value.value = true;
  };

  const setFalse = (): void => {
    value.value = false;
  };

  return { value, toggle, setTrue, setFalse };
}

/**
 * Composable for click outside detection
 * @param handler - Handler to call on outside click
 * @returns Ref to attach to element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(handler: () => void): Ref<T | null> {
  const elementRef = ref<T | null>(null) as Ref<T | null>;

  const listener = (event: Event): void => {
    if (!elementRef.value || elementRef.value.contains(event.target as Node)) {
      return;
    }
    handler();
  };

  onMounted(() => {
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener);
    document.removeEventListener('touchstart', listener);
  });

  return elementRef;
}

/**
 * Composable for interval
 * @param callback - Callback to execute
 * @param delay - Delay in milliseconds
 * @returns Interval controls
 */
export function useInterval(
  callback: () => void,
  delay: number
): { start: () => void; stop: () => void; isActive: Ref<boolean> } {
  const isActive = ref(false);
  let intervalId: ReturnType<typeof setInterval>;

  const start = (): void => {
    if (!isActive.value) {
      isActive.value = true;
      intervalId = setInterval(callback, delay);
    }
  };

  const stop = (): void => {
    if (isActive.value) {
      isActive.value = false;
      clearInterval(intervalId);
    }
  };

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return { start, stop, isActive };
}

/**
 * Composable for window size
 * @returns Window size refs
 */
export function useWindowSize(): { width: Ref<number>; height: Ref<number> } {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 0);

  const handleResize = (): void => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return { width, height };
}

/**
 * Composable for previous value
 * @param value - Current value
 * @returns Previous value ref
 */
export function usePrevious<T>(value: Ref<T>): Ref<T | undefined> {
  const previous = ref<T | undefined>();

  watch(value, (_, oldValue) => {
    previous.value = oldValue;
  });

  return previous;
}

/**
 * Composable for mounted state
 * @returns Mounted ref
 */
export function useMounted(): Ref<boolean> {
  const mounted = ref(false);

  onMounted(() => {
    mounted.value = true;
  });

  return mounted;
}

/**
 * Composable for async operations
 * @param asyncFn - Async function
 * @returns Async state and execute function
 */
export function useAsync<T, Args extends unknown[] = unknown[]>(
  asyncFn: (...args: Args) => Promise<T>
): {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: Args) => Promise<T | undefined>;
} {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async (...args: Args): Promise<T | undefined> => {
    loading.value = true;
    error.value = null;

    try {
      const result = await asyncFn(...args);
      data.value = result;
      return result;
    } catch (e) {
      error.value = e as Error;
      return undefined;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}

/**
 * Composable for countdown
 * @param seconds - Starting seconds
 * @returns Countdown state and controls
 */
export function useCountdown(seconds: number): {
  count: Ref<number>;
  isRunning: Ref<boolean>;
  start: () => void;
  stop: () => void;
  reset: () => void;
} {
  const count = ref(seconds);
  const isRunning = ref(false);
  let intervalId: ReturnType<typeof setInterval>;

  const start = (): void => {
    if (!isRunning.value) {
      isRunning.value = true;
      intervalId = setInterval(() => {
        if (count.value > 0) {
          count.value--;
        } else {
          stop();
        }
      }, 1000);
    }
  };

  const stop = (): void => {
    isRunning.value = false;
    clearInterval(intervalId);
  };

  const reset = (): void => {
    stop();
    count.value = seconds;
  };

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return { count, isRunning, start, stop, reset };
}

/**
 * Composable for escape key detection
 * @param handler - Handler to call on escape
 */
export function useEscapeKey(handler: () => void): void {
  const listener = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      handler();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', listener);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', listener);
  });
}

