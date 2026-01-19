import { useState, useEffect, useCallback } from 'react';
import type { Breakpoint, BreakpointConfig, ResponsiveState } from '../../types';
import { DEFAULT_BREAKPOINT_CONFIG, BREAKPOINTS } from '../../constants';

/**
 * Hook that provides responsive state information
 * @param customBreakpoints - Custom breakpoint configuration
 * @returns Responsive state object
 */
export function useResponsive(customBreakpoints?: Partial<BreakpointConfig>): ResponsiveState {
  const breakpoints: BreakpointConfig = {
    ...DEFAULT_BREAKPOINT_CONFIG,
    ...customBreakpoints,
  };

  const getBreakpoint = useCallback(
    (width: number): Breakpoint => {
      if (width >= breakpoints['2xl']) return '2xl';
      if (width >= breakpoints.xl) return 'xl';
      if (width >= breakpoints.lg) return 'lg';
      if (width >= breakpoints.md) return 'md';
      if (width >= breakpoints.sm) return 'sm';
      return 'xs';
    },
    [breakpoints]
  );

  const getState = useCallback((): ResponsiveState => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 0;
    const height = typeof window !== 'undefined' ? window.innerHeight : 0;
    const breakpoint = getBreakpoint(width);

    return {
      breakpoint,
      width,
      height,
      isMobile: width < BREAKPOINTS.MD,
      isTablet: width >= BREAKPOINTS.MD && width < BREAKPOINTS.LG,
      isDesktop: width >= BREAKPOINTS.LG,
      isLandscape: width > height,
      isPortrait: height >= width,
    };
  }, [getBreakpoint]);

  const [state, setState] = useState<ResponsiveState>(getState);

  useEffect(() => {
    const handleResize = (): void => {
      setState(getState());
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getState]);

  return state;
}

/**
 * Hook that checks if viewport matches a media query
 * @param query - Media query string
 * @returns Whether the query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Hook that checks if viewport is above a breakpoint
 * @param breakpoint - Breakpoint to check
 * @param customBreakpoints - Custom breakpoint values
 * @returns Whether viewport is above breakpoint
 */
export function useBreakpointUp(
  breakpoint: Breakpoint,
  customBreakpoints?: Partial<BreakpointConfig>
): boolean {
  const breakpoints: BreakpointConfig = {
    ...DEFAULT_BREAKPOINT_CONFIG,
    ...customBreakpoints,
  };

  return useMediaQuery(`(min-width: ${breakpoints[breakpoint]}px)`);
}

/**
 * Hook that checks if viewport is below a breakpoint
 * @param breakpoint - Breakpoint to check
 * @param customBreakpoints - Custom breakpoint values
 * @returns Whether viewport is below breakpoint
 */
export function useBreakpointDown(
  breakpoint: Breakpoint,
  customBreakpoints?: Partial<BreakpointConfig>
): boolean {
  const breakpoints: BreakpointConfig = {
    ...DEFAULT_BREAKPOINT_CONFIG,
    ...customBreakpoints,
  };

  return useMediaQuery(`(max-width: ${breakpoints[breakpoint] - 1}px)`);
}

/**
 * Hook that checks if viewport is between breakpoints
 * @param min - Minimum breakpoint
 * @param max - Maximum breakpoint
 * @param customBreakpoints - Custom breakpoint values
 * @returns Whether viewport is between breakpoints
 */
export function useBreakpointBetween(
  min: Breakpoint,
  max: Breakpoint,
  customBreakpoints?: Partial<BreakpointConfig>
): boolean {
  const breakpoints: BreakpointConfig = {
    ...DEFAULT_BREAKPOINT_CONFIG,
    ...customBreakpoints,
  };

  return useMediaQuery(
    `(min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 1}px)`
  );
}

/**
 * Hook that returns window dimensions
 * @returns Window width and height
 */
export function useWindowSize(): { width: number; height: number } {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = (): void => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

/**
 * Hook for device orientation
 * @returns Orientation state
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    }
    return 'portrait';
  });

  useEffect(() => {
    const handleChange = (): void => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    };

    window.addEventListener('resize', handleChange);
    window.addEventListener('orientationchange', handleChange);

    return () => {
      window.removeEventListener('resize', handleChange);
      window.removeEventListener('orientationchange', handleChange);
    };
  }, []);

  return orientation;
}

