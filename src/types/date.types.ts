/** Units accepted by add / subtract / startOf / endOf / diff. */
export type DateUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

/** Short aliases for DateUnit (moment-style). */
export type DateUnitShort = 'y' | 'M' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms';

/** Accepts both long and short unit forms. */
export type DateUnitInput = DateUnit | DateUnitShort;

/** Anything that can be parsed into a Date. */
export type DateInput = Date | string | number;

/** Options for `formatRelative`. */
export interface RelativeTimeOptions {
  /** Reference date (defaults to now). */
  now?: DateInput;
  /** Maximum unit to show (e.g. "day" → "3 days ago" instead of "1 month ago"). */
  maxUnit?: DateUnit;
}

/** Options for locale-aware formatting functions. */
export interface LocaleOptions {
  /** BCP 47 locale string (e.g. "en-US", "fr-FR", "ja-JP"). Defaults to runtime locale. */
  locale?: string;
}

/** Options for `calendar()`. */
export interface CalendarOptions extends LocaleOptions {
  /** Reference date — defaults to now. */
  now?: DateInput;
  /** Custom format overrides per bucket. */
  formats?: {
    sameDay?: string;
    nextDay?: string;
    nextWeek?: string;
    lastDay?: string;
    lastWeek?: string;
    sameElse?: string;
  };
}

/** Represents a length of time (inspired by Luxon Duration). */
export interface DurationObject {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

/** Input for duration — can be milliseconds or an object. */
export type DurationInput = number | DurationObject;

/** Represents a date/time interval (start → end). */
export interface DateInterval {
  start: Date;
  end: Date;
}

/** Options for `formatInTimeZone`. */
export interface TimeZoneFormatOptions extends LocaleOptions {
  /** IANA timezone identifier (e.g. "America/New_York", "Europe/London"). */
  timeZone: string;
}

/** Object returned by `getTimezoneInfo`. */
export interface TimezoneInfo {
  /** IANA timezone name. */
  name: string;
  /** Offset string like "+05:30" or "-08:00". */
  offset: string;
  /** Offset in minutes from UTC. */
  offsetMinutes: number;
  /** Short timezone abbreviation (e.g. "EST", "PST"). */
  abbreviation: string;
}

/** Object form of a parsed date (Luxon-style). */
export interface DateObject {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
  weekday: number;
  weekOfYear: number;
  dayOfYear: number;
  quarter: number;
  unix: number;
  isLeapYear: boolean;
}
