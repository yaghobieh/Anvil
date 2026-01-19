export const NUMBERS = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
  THOUSAND: 1000,
  MILLION: 1000000,
  BILLION: 1000000000,
} as const;

export const DEBOUNCE_DELAY_MS = 300;
export const THROTTLE_INTERVAL_MS = 100;
export const DEFAULT_TIMEOUT_MS = 5000;
export const ANIMATION_DURATION_MS = 200;

export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;

export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
export const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;

export const KB = 1024;
export const MB = KB * 1024;
export const GB = MB * 1024;
export const TB = GB * 1024;

export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;

export const MS_IN_SECOND = 1000;
export const MS_IN_MINUTE = MS_IN_SECOND * SECONDS_IN_MINUTE;
export const MS_IN_HOUR = MS_IN_MINUTE * MINUTES_IN_HOUR;
export const MS_IN_DAY = MS_IN_HOUR * HOURS_IN_DAY;
export const MS_IN_WEEK = MS_IN_DAY * DAYS_IN_WEEK;

