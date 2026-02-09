import { useCallback, useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

/**
 * Options for useLongPress hook
 */
export interface UseLongPressOptions {
  /** Duration in ms to trigger long press (default: 400) */
  threshold?: number;
  /** Callback for long press */
  onLongPress?: (event: MouseEvent | TouchEvent) => void;
  /** Callback for regular click */
  onClick?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press starts */
  onStart?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press ends */
  onFinish?: (event: MouseEvent | TouchEvent) => void;
  /** Callback when press is cancelled */
  onCancel?: (event: MouseEvent | TouchEvent) => void;
  /** Filter function */
  filterEvents?: (event: MouseEvent | TouchEvent) => boolean;
  /** Disable the long press */
  disabled?: boolean;
}

/**
 * Return type for useLongPress hook
 */
export interface UseLongPressReturn {
  onMouseDown: (event: MouseEvent) => void;
  onMouseUp: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
}

const DEFAULT_THRESHOLD = 400;

/**
 * useLongPress - Detect long press gestures
 * 
 * @example
 * ```tsx
 * const longPressProps = useLongPress({
 *   threshold: 500,
 *   onLongPress: () => console.log('Long pressed!'),
 *   onClick: () => console.log('Clicked!'),
 * });
 * 
 * return <button {...longPressProps}>Hold me</button>;
 * ```
 */
export function useLongPress(options: UseLongPressOptions = {}): UseLongPressReturn {
  const {
    threshold = DEFAULT_THRESHOLD,
    onLongPress,
    onClick,
    onStart,
    onFinish,
    onCancel,
    filterEvents,
    disabled = false,
  } = options;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef(false);
  const isActiveRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback((event: MouseEvent | TouchEvent) => {
    if (disabled) return;
    if (filterEvents && !filterEvents(event)) return;

    isActiveRef.current = true;
    isLongPressRef.current = false;

    onStart?.(event);

    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      onLongPress?.(event);
    }, threshold);
  }, [disabled, filterEvents, onStart, onLongPress, threshold]);

  const cancel = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isActiveRef.current) return;
    clear();
    isActiveRef.current = false;
    onCancel?.(event);
  }, [clear, onCancel]);

  const stop = useCallback((event: MouseEvent | TouchEvent) => {
    if (!isActiveRef.current) return;
    clear();
    isActiveRef.current = false;

    if (!isLongPressRef.current && onClick) {
      onClick(event);
    }

    onFinish?.(event);
  }, [clear, onClick, onFinish]);

  return {
    onMouseDown: useCallback((e: MouseEvent) => e.button === 0 && start(e), [start]),
    onMouseUp: useCallback((e: MouseEvent) => stop(e), [stop]),
    onMouseLeave: useCallback((e: MouseEvent) => cancel(e), [cancel]),
    onTouchStart: useCallback((e: TouchEvent) => start(e), [start]),
    onTouchEnd: useCallback((e: TouchEvent) => stop(e), [stop]),
  };
}
