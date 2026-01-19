import { useEffect, useRef, useState, useCallback } from 'react';
import type { UseIntervalOptions } from '../../types';

/**
 * Hook for setInterval with cleanup
 * @param callback - Callback to execute
 * @param delay - Delay in milliseconds
 * @param options - Interval options
 */
export function useInterval(
  callback: () => void,
  delay: number | null,
  options: UseIntervalOptions = {}
): { start: () => void; stop: () => void; isActive: boolean } {
  const { immediate = false, paused = false } = options;
  const callbackRef = useRef(callback);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [isActive, setIsActive] = useState(!paused);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const start = useCallback((): void => {
    setIsActive(true);
  }, []);

  const stop = useCallback((): void => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    if (delay === null || !isActive) return;

    if (immediate) {
      callbackRef.current();
    }

    intervalRef.current = setInterval(() => {
      callbackRef.current();
    }, delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [delay, isActive, immediate]);

  return { start, stop, isActive };
}

/**
 * Hook for setTimeout with cleanup
 * @param callback - Callback to execute
 * @param delay - Delay in milliseconds
 */
export function useTimeout(
  callback: () => void,
  delay: number | null
): { reset: () => void; clear: () => void } {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = useCallback((): void => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const reset = useCallback((): void => {
    clear();
    if (delay !== null) {
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
      }, delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
}

/**
 * Hook for countdown timer
 * @param seconds - Starting seconds
 * @param onComplete - Callback when countdown completes
 * @returns Countdown state and controls
 */
export function useCountdown(
  seconds: number,
  onComplete?: () => void
): {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
} {
  const [count, setCount] = useState(seconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const start = useCallback((): void => {
    setIsRunning(true);
  }, []);

  const stop = useCallback((): void => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const reset = useCallback((): void => {
    stop();
    setCount(seconds);
  }, [seconds, stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          stop();
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, stop]);

  return { count, start, stop, reset, isRunning };
}

/**
 * Hook for stopwatch timer
 * @returns Stopwatch state and controls
 */
export function useStopwatch(): {
  time: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
  formatted: string;
} {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  const start = useCallback((): void => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
  }, []);

  const stop = useCallback((): void => {
    accumulatedRef.current = time;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [time]);

  const reset = useCallback((): void => {
    stop();
    setTime(0);
    accumulatedRef.current = 0;
  }, [stop]);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTime(accumulatedRef.current + (Date.now() - startTimeRef.current));
    }, 10);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatted = (() => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const ms = Math.floor((time % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
      .toString()
      .padStart(2, '0')}`;
  })();

  return { time, start, stop, reset, isRunning, formatted };
}

/**
 * Hook for delayed execution
 * @param delay - Delay in milliseconds
 * @returns Whether delay has passed
 */
export function useDelay(delay: number): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return ready;
}

/**
 * Hook for RAF (requestAnimationFrame)
 * @param callback - Callback to execute each frame
 * @param enabled - Whether RAF is enabled
 */
export function useRaf(callback: (deltaTime: number) => void, enabled: boolean = true): void {
  const callbackRef = useRef(callback);
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const loop = (time: number): void => {
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;
      callbackRef.current(deltaTime);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled]);
}

