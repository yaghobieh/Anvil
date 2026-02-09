import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Options for useOnline hook
 */
export interface UseOnlineOptions {
  /** Callback when going online */
  onOnline?: () => void;
  /** Callback when going offline */
  onOffline?: () => void;
}

/**
 * Return type for useOnline hook
 */
export interface UseOnlineReturn {
  /** Whether the browser is currently online */
  isOnline: boolean;
  /** Time since last status change (ms) */
  since: number | null;
}

/**
 * useOnline - Detect online/offline network status
 * 
 * @example
 * ```tsx
 * const { isOnline, since } = useOnline({
 *   onOnline: () => console.log('Back online!'),
 *   onOffline: () => console.log('Gone offline!'),
 * });
 * 
 * return <div>{isOnline ? '🟢 Online' : '🔴 Offline'}</div>;
 * ```
 */
export function useOnline(options: UseOnlineOptions = {}): UseOnlineReturn {
  const { onOnline, onOffline } = options;
  
  const [isOnline, setIsOnline] = useState<boolean>(() => 
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [since, setSince] = useState<number | null>(null);
  
  const onOnlineRef = useRef(onOnline);
  const onOfflineRef = useRef(onOffline);
  
  useEffect(() => {
    onOnlineRef.current = onOnline;
    onOfflineRef.current = onOffline;
  }, [onOnline, onOffline]);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
    setSince(Date.now());
    onOnlineRef.current?.();
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
    setSince(Date.now());
    onOfflineRef.current?.();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOnline, handleOffline]);

  return { isOnline, since };
}
