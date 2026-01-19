import { useRef, useEffect, useCallback, type RefObject } from 'react';
import type { UseClickOutsideOptions } from '../../types';

/**
 * Hook that detects clicks outside of an element
 * @param handler - Handler called on outside click
 * @param options - Options for the hook
 * @returns Ref to attach to element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  options: UseClickOutsideOptions = {}
): RefObject<T> {
  const { enabled = true, eventTypes = ['mousedown', 'touchstart'] } = options;
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: Event): void => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) {
        return;
      }
      handlerRef.current();
    };

    for (const eventType of eventTypes) {
      document.addEventListener(eventType, listener);
    }

    return () => {
      for (const eventType of eventTypes) {
        document.removeEventListener(eventType, listener);
      }
    };
  }, [enabled, eventTypes]);

  return ref;
}

/**
 * Hook that detects clicks outside of multiple elements
 * @param refs - Refs to elements
 * @param handler - Handler called on outside click
 * @param enabled - Whether the hook is enabled
 */
export function useClickOutsideMultiple(
  refs: RefObject<HTMLElement>[],
  handler: () => void,
  enabled: boolean = true
): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: Event): void => {
      const clickedOutsideAll = refs.every((ref) => {
        const element = ref.current;
        return element && !element.contains(event.target as Node);
      });

      if (clickedOutsideAll) {
        handlerRef.current();
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, enabled]);
}

/**
 * Hook that detects hover outside of an element
 * @param handler - Handler called on outside hover
 * @param delay - Delay before triggering handler
 * @returns Ref to attach to element
 */
export function useHoverOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  delay: number = 0
): RefObject<T> {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = (): void => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleMouseLeave = (): void => {
      timeoutRef.current = setTimeout(() => {
        handlerRef.current();
      }, delay);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  return ref;
}

/**
 * Hook that detects escape key press
 * @param handler - Handler called on escape
 * @param enabled - Whether the hook is enabled
 */
export function useEscapeKey(handler: () => void, enabled: boolean = true): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handlerRef.current();
      }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [enabled]);
}

/**
 * Hook for focus trap
 * @param enabled - Whether trap is enabled
 * @returns Ref to attach to container
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  enabled: boolean = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return ref;
}

/**
 * Hook that returns click position relative to element
 * @returns Ref and click position
 */
export function useClickPosition<T extends HTMLElement = HTMLElement>(): {
  ref: RefObject<T>;
  position: { x: number; y: number } | null;
  reset: () => void;
} {
  const ref = useRef<T>(null);
  const positionRef = useRef<{ x: number; y: number } | null>(null);

  const reset = useCallback((): void => {
    positionRef.current = null;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleClick = (event: MouseEvent): void => {
      const rect = element.getBoundingClientRect();
      positionRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    element.addEventListener('click', handleClick);
    return () => element.removeEventListener('click', handleClick);
  }, []);

  return { ref, position: positionRef.current, reset };
}

