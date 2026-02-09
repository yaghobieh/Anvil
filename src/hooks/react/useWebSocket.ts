import { useState, useEffect, useCallback, useRef } from 'react';

export type WebSocketStatus = 'connecting' | 'open' | 'closing' | 'closed';

/**
 * Options for useWebSocket hook
 */
export interface UseWebSocketOptions {
  /** Auto-connect on mount (default: true) */
  autoConnect?: boolean;
  /** Auto-reconnect on disconnect (default: true) */
  autoReconnect?: boolean;
  /** Reconnect attempts (default: 5) */
  reconnectAttempts?: number;
  /** Reconnect interval in ms (default: 3000) */
  reconnectInterval?: number;
  /** WebSocket protocols */
  protocols?: string | string[];
  /** Callback when connection opens */
  onOpen?: (event: Event) => void;
  /** Callback when connection closes */
  onClose?: (event: CloseEvent) => void;
  /** Callback when error occurs */
  onError?: (event: Event) => void;
  /** Callback when message received */
  onMessage?: (event: MessageEvent) => void;
}

/**
 * Return type for useWebSocket hook
 */
export interface UseWebSocketReturn<T = unknown> {
  /** Current connection status */
  status: WebSocketStatus;
  /** Whether the connection is open */
  isConnected: boolean;
  /** Last received message data */
  lastMessage: T | null;
  /** Last error */
  error: Event | null;
  /** Send a message */
  send: (data: string | ArrayBuffer | Blob) => void;
  /** Send JSON data */
  sendJson: (data: unknown) => void;
  /** Connect to WebSocket */
  connect: () => void;
  /** Disconnect from WebSocket */
  disconnect: (code?: number, reason?: string) => void;
  /** Get the raw WebSocket instance */
  getSocket: () => WebSocket | null;
}

/**
 * useWebSocket - WebSocket connection management
 * 
 * @example
 * ```tsx
 * const { status, lastMessage, send, isConnected } = useWebSocket('wss://echo.websocket.org', {
 *   onMessage: (event) => console.log('Received:', event.data),
 * });
 * ```
 */
export function useWebSocket<T = unknown>(
  url: string,
  options: UseWebSocketOptions = {}
): UseWebSocketReturn<T> {
  const {
    autoConnect = true,
    autoReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    protocols,
    onOpen,
    onClose,
    onError,
    onMessage,
  } = options;

  const [status, setStatus] = useState<WebSocketStatus>('closed');
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [error, setError] = useState<Event | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountedRef = useRef(false);

  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;
    onMessageRef.current = onMessage;
  }, [onOpen, onClose, onError, onMessage]);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    clearReconnectTimeout();
    setStatus('connecting');
    setError(null);

    try {
      socketRef.current = new WebSocket(url, protocols);

      socketRef.current.onopen = (event) => {
        if (unmountedRef.current) return;
        setStatus('open');
        reconnectCountRef.current = 0;
        onOpenRef.current?.(event);
      };

      socketRef.current.onclose = (event) => {
        if (unmountedRef.current) return;
        setStatus('closed');
        onCloseRef.current?.(event);

        if (autoReconnect && reconnectCountRef.current < reconnectAttempts && !unmountedRef.current) {
          reconnectCountRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => connect(), reconnectInterval);
        }
      };

      socketRef.current.onerror = (event) => {
        if (unmountedRef.current) return;
        setError(event);
        onErrorRef.current?.(event);
      };

      socketRef.current.onmessage = (event) => {
        if (unmountedRef.current) return;
        try {
          setLastMessage(JSON.parse(event.data) as T);
        } catch {
          setLastMessage(event.data as T);
        }
        onMessageRef.current?.(event);
      };
    } catch (err) {
      setStatus('closed');
      setError(err as Event);
    }
  }, [url, protocols, autoReconnect, reconnectAttempts, reconnectInterval, clearReconnectTimeout]);

  const disconnect = useCallback((code?: number, reason?: string) => {
    clearReconnectTimeout();
    reconnectCountRef.current = reconnectAttempts;
    
    if (socketRef.current) {
      setStatus('closing');
      socketRef.current.close(code, reason);
      socketRef.current = null;
    }
  }, [clearReconnectTimeout, reconnectAttempts]);

  const send = useCallback((data: string | ArrayBuffer | Blob) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    }
  }, []);

  const sendJson = useCallback((data: unknown) => {
    send(JSON.stringify(data));
  }, [send]);

  const getSocket = useCallback(() => socketRef.current, []);

  useEffect(() => {
    unmountedRef.current = false;
    if (autoConnect) connect();

    return () => {
      unmountedRef.current = true;
      clearReconnectTimeout();
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [autoConnect, connect, clearReconnectTimeout]);

  return { status, isConnected: status === 'open', lastMessage, error, send, sendJson, connect, disconnect, getSocket };
}
