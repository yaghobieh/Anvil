import type { BreakpointConfig, UseDebounceOptions, UseThrottleOptions } from '../types';
import { BREAKPOINTS, DEBOUNCE_DELAY_MS, THROTTLE_INTERVAL_MS } from './numbers.constants';

export const DEFAULT_BREAKPOINT_CONFIG: BreakpointConfig = {
  xs: BREAKPOINTS.XS,
  sm: BREAKPOINTS.SM,
  md: BREAKPOINTS.MD,
  lg: BREAKPOINTS.LG,
  xl: BREAKPOINTS.XL,
  '2xl': BREAKPOINTS.XXL,
};

export const DEFAULT_DEBOUNCE_OPTIONS: UseDebounceOptions = {
  delay: DEBOUNCE_DELAY_MS,
  leading: false,
  trailing: true,
};

export const DEFAULT_THROTTLE_OPTIONS: UseThrottleOptions = {
  interval: THROTTLE_INTERVAL_MS,
  leading: true,
  trailing: true,
};

export const DEFAULT_CLONE_OPTIONS = {
  deep: true,
  circular: false,
} as const;

export const EMPTY_OBJECT = Object.freeze({});
export const EMPTY_ARRAY = Object.freeze([]);
export const EMPTY_STRING = '';
export const EMPTY_FUNCTION = (): void => {};
export const IDENTITY_FUNCTION = <T>(x: T): T => x;
export const NOOP = (): void => {};
export const TRUE_FN = (): boolean => true;
export const FALSE_FN = (): boolean => false;

