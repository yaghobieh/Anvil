import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Options for useIdle hook
 */
export interface UseIdleOptions {
  /** Timeout in milliseconds before user is considered idle (default: 60000 = 1 min) */
  timeout?: number;
  /** Events to listen for as activity */
  events?: (keyof WindowEventMap)[];
  /** Initial idle state */
  initialState?: boolean;
  /** Callback when user becomes idle */
  onIdle?: () => void;
  /** Callback when user becomes active */
  onActive?: () => void;
}

/**
 * Return type for useIdle hook
 */
export interface UseIdleReturn {
  /** Whether the user is currently idle */
  isIdle: boolean;
  /** Time remaining until idle (ms) */
  remaining: number;
  /** Last activity timestamp */
  lastActive: number;
  /** Reset the idle timer */
  reset: () => void;
  /** Pause idle detection */
  pause: () => void;
  /** Resume idle detection */
  resume: () => void;
}

const DEFAULT_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'wheel',
];

const DEFAULT_TIMEOUT = 60000;

/**
 * useIdle - Detect user inactivity
 * 
 * @example
 * ```tsx
 * const { isIdle, remaining, reset } = useIdle({
 *   timeout: 30000,
 *   onIdle: () => console.log('User is idle'),
 * });
 * ```
 */
export function useIdle(options: UseIdleOptions = {}): UseIdleReturn {
  const {
    timeout = DEFAULT_TIMEOUT,
    events = DEFAULT_EVENTS,
    initialState = false,
    onIdle,
    onActive,
  } = options;

  const [isIdle, setIsIdle] = useState(initialState);
  const [lastActive, setLastActive] = useState(Date.now());
  const [remaining, setRemaining] = useState(timeout);
  const [isPaused, setIsPaused] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onIdle, onActive]);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(() => {
    if (isPaused) return;
    
    clearTimers();
    const startTime = Date.now();
    setRemaining(timeout);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setRemaining(Math.max(0, timeout - elapsed));
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdleRef.current?.();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, timeout);
  }, [timeout, isPaused, clearTimers]);

  const handleActivity = useCallback(() => {
    if (isPaused) return;
    
    const wasIdle = isIdle;
    setIsIdle(false);
    setLastActive(Date.now());
    startTimer();

    if (wasIdle) onActiveRef.current?.();
  }, [isPaused, isIdle, startTimer]);

  const reset = useCallback(() => {
    setIsIdle(false);
    setLastActive(Date.now());
    startTimer();
  }, [startTimer]);

  const pause = useCallback(() => {
    setIsPaused(true);
    clearTimers();
  }, [clearTimers]);

  const resume = useCallback(() => {
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    startTimer();

    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      clearTimers();
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [events, handleActivity, startTimer, clearTimers]);

  return { isIdle, remaining, lastActive, reset, pause, resume };
}
