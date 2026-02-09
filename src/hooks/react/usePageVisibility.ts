import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Options for usePageVisibility hook
 */
export interface UsePageVisibilityOptions {
  /** Callback when page becomes visible */
  onVisible?: () => void;
  /** Callback when page becomes hidden */
  onHidden?: () => void;
}

/**
 * Return type for usePageVisibility hook
 */
export interface UsePageVisibilityReturn {
  /** Whether the page is currently visible */
  isVisible: boolean;
  /** Document visibility state */
  visibilityState: DocumentVisibilityState;
}

/**
 * usePageVisibility - Detect when page/tab is visible or hidden
 * 
 * @example
 * ```tsx
 * const { isVisible } = usePageVisibility({
 *   onVisible: () => console.log('Tab is visible'),
 *   onHidden: () => console.log('Tab is hidden'),
 * });
 * 
 * // Pause video when tab is hidden
 * useEffect(() => {
 *   if (!isVisible) videoRef.current?.pause();
 * }, [isVisible]);
 * ```
 */
export function usePageVisibility(options: UsePageVisibilityOptions = {}): UsePageVisibilityReturn {
  const { onVisible, onHidden } = options;

  const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState>(() =>
    typeof document !== 'undefined' ? document.visibilityState : 'visible'
  );

  const onVisibleRef = useRef(onVisible);
  const onHiddenRef = useRef(onHidden);

  useEffect(() => {
    onVisibleRef.current = onVisible;
    onHiddenRef.current = onHidden;
  }, [onVisible, onHidden]);

  const handleVisibilityChange = useCallback(() => {
    const state = document.visibilityState;
    setVisibilityState(state);

    if (state === 'visible') {
      onVisibleRef.current?.();
    } else if (state === 'hidden') {
      onHiddenRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return {
    isVisible: visibilityState === 'visible',
    visibilityState,
  };
}
