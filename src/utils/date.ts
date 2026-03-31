import type {
  CalendarOptions,
  DateInput,
  DateInterval,
  DateObject,
  DateUnit,
  DateUnitInput,
  DurationInput,
  DurationObject,
  LocaleOptions,
  RelativeTimeOptions,
  TimeZoneFormatOptions,
  TimezoneInfo,
} from '../types/date.types';

const UNIT_MAP: Record<string, DateUnit> = {
  y: 'year', M: 'month', w: 'week', d: 'day',
  h: 'hour', m: 'minute', s: 'second', ms: 'millisecond',
  year: 'year', month: 'month', week: 'week', day: 'day',
  hour: 'hour', minute: 'minute', second: 'second', millisecond: 'millisecond',
};

const MS_SECOND = 1_000;
const MS_MINUTE = 60 * MS_SECOND;
const MS_HOUR = 60 * MS_MINUTE;
const MS_DAY = 24 * MS_HOUR;
const MS_WEEK = 7 * MS_DAY;

function resolveUnit(u: DateUnitInput): DateUnit {
  return UNIT_MAP[u] ?? 'millisecond';
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ─── Parsing ────────────────────────────────────────────────────────────────

/**
 * Parse any DateInput into a Date. Returns a new Date instance so the
 * original is never mutated.
 */
export function toDate(input: DateInput): Date {
  if (input instanceof Date) return new Date(input.getTime());
  return new Date(input);
}

/** Returns true if the input can be parsed into a valid Date. */
export function isValidDate(input: DateInput): boolean {
  return !isNaN(toDate(input).getTime());
}

/**
 * Create a Date from individual components (Luxon-style `DateTime.fromObject`).
 */
export function fromObject(obj: Partial<DateObject>): Date {
  return new Date(
    obj.year ?? new Date().getFullYear(),
    (obj.month ?? 1) - 1,
    obj.day ?? 1,
    obj.hour ?? 0,
    obj.minute ?? 0,
    obj.second ?? 0,
    obj.millisecond ?? 0,
  );
}

/**
 * Parse a date string with a format pattern (e.g. "24/03/2026" with "DD/MM/YYYY").
 * Supports YYYY, MM, DD, HH, mm, ss tokens.
 */
export function parseFormat(dateStr: string, fmt: string): Date {
  const tokenRe = /YYYY|MM|DD|HH|mm|ss/g;
  let match: RegExpExecArray | null;
  const parts: { token: string; start: number }[] = [];
  while ((match = tokenRe.exec(fmt)) !== null) {
    parts.push({ token: match[0], start: match.index });
  }
  let y = 2000, M = 1, D = 1, H = 0, mi = 0, s = 0;
  for (const p of parts) {
    const val = parseInt(dateStr.substring(p.start, p.start + p.token.length), 10);
    if (isNaN(val)) continue;
    switch (p.token) {
      case 'YYYY': y = val; break;
      case 'MM': M = val; break;
      case 'DD': D = val; break;
      case 'HH': H = val; break;
      case 'mm': mi = val; break;
      case 'ss': s = val; break;
    }
  }
  return new Date(y, M - 1, D, H, mi, s);
}

// ─── Getters ────────────────────────────────────────────────────────────────

/** Full year (e.g. 2026). */
export function year(input: DateInput): number { return toDate(input).getFullYear(); }
/** Month (1-12, human-friendly — not zero-based). */
export function month(input: DateInput): number { return toDate(input).getMonth() + 1; }
/** Day of month (1-31). */
export function day(input: DateInput): number { return toDate(input).getDate(); }
/** Day of week (0 = Sunday, 6 = Saturday). */
export function weekday(input: DateInput): number { return toDate(input).getDay(); }
/** ISO day of week (1 = Monday, 7 = Sunday — ISO 8601). */
export function isoWeekday(input: DateInput): number { return toDate(input).getDay() || 7; }
/** Hour (0-23). */
export function hour(input: DateInput): number { return toDate(input).getHours(); }
/** Minute (0-59). */
export function minute(input: DateInput): number { return toDate(input).getMinutes(); }
/** Second (0-59). */
export function second(input: DateInput): number { return toDate(input).getSeconds(); }
/** Millisecond (0-999). */
export function millisecond(input: DateInput): number { return toDate(input).getMilliseconds(); }
/** Unix timestamp in seconds (like moment.unix()). */
export function unix(input: DateInput): number { return Math.floor(toDate(input).getTime() / MS_SECOND); }

/** Number of days in the month of the given date. */
export function daysInMonth(input: DateInput): number {
  const d = toDate(input);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

/** Day of the year (1-366). */
export function dayOfYear(input: DateInput): number {
  const d = toDate(input);
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / MS_DAY);
}

/** ISO week number (1-53). */
export function weekOfYear(input: DateInput): number {
  const d = toDate(input);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const jan4 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - jan4.getTime()) / MS_DAY - 3 + ((jan4.getDay() + 6) % 7)) / 7);
}

/** Quarter of the year (1-4). */
export function quarter(input: DateInput): number {
  return Math.ceil((toDate(input).getMonth() + 1) / 3);
}

/** True if the year of the date is a leap year. */
export function isLeapYear(input: DateInput): boolean {
  const y = toDate(input).getFullYear();
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** Decompose a date into all its parts (Luxon-style `.toObject()`). */
export function toObject(input: DateInput): DateObject {
  const d = toDate(input);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
    millisecond: d.getMilliseconds(),
    weekday: d.getDay(),
    weekOfYear: weekOfYear(d),
    dayOfYear: dayOfYear(d),
    quarter: quarter(d),
    unix: Math.floor(d.getTime() / MS_SECOND),
    isLeapYear: isLeapYear(d),
  };
}

// ─── Manipulation ───────────────────────────────────────────────────────────

/** Return a new Date with `amount` of `unit` added. */
export function add(input: DateInput, amount: number, unit: DateUnitInput): Date {
  const d = toDate(input);
  const u = resolveUnit(unit);
  switch (u) {
    case 'year': d.setFullYear(d.getFullYear() + amount); break;
    case 'month': d.setMonth(d.getMonth() + amount); break;
    case 'week': d.setDate(d.getDate() + amount * 7); break;
    case 'day': d.setDate(d.getDate() + amount); break;
    case 'hour': d.setHours(d.getHours() + amount); break;
    case 'minute': d.setMinutes(d.getMinutes() + amount); break;
    case 'second': d.setSeconds(d.getSeconds() + amount); break;
    case 'millisecond': d.setMilliseconds(d.getMilliseconds() + amount); break;
  }
  return d;
}

/** Return a new Date with `amount` of `unit` subtracted. */
export function subtract(input: DateInput, amount: number, unit: DateUnitInput): Date {
  return add(input, -amount, unit);
}

/** Return a new Date with one or more fields set (like Luxon's `.set()`). */
export function set(input: DateInput, values: Partial<Pick<DateObject, 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'>>): Date {
  const d = toDate(input);
  if (values.year !== undefined) d.setFullYear(values.year);
  if (values.month !== undefined) d.setMonth(values.month - 1);
  if (values.day !== undefined) d.setDate(values.day);
  if (values.hour !== undefined) d.setHours(values.hour);
  if (values.minute !== undefined) d.setMinutes(values.minute);
  if (values.second !== undefined) d.setSeconds(values.second);
  if (values.millisecond !== undefined) d.setMilliseconds(values.millisecond);
  return d;
}

/** Return a new Date set to the start of the given unit. */
export function startOf(input: DateInput, unit: DateUnitInput): Date {
  const d = toDate(input);
  const u = resolveUnit(unit);
  switch (u) {
    case 'year': return new Date(d.getFullYear(), 0, 1);
    case 'month': return new Date(d.getFullYear(), d.getMonth(), 1);
    case 'week': {
      const dow = d.getDay();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow + (dow === 0 ? -6 : 1));
    }
    case 'day': return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    case 'hour': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours());
    case 'minute': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());
    case 'second': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds());
    case 'millisecond': return new Date(d.getTime());
  }
}

/** Return a new Date set to the end of the given unit. */
export function endOf(input: DateInput, unit: DateUnitInput): Date {
  const d = toDate(input);
  const u = resolveUnit(unit);
  switch (u) {
    case 'year': return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
    case 'month': return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
    case 'week': {
      const s = startOf(d, 'week');
      s.setDate(s.getDate() + 6);
      s.setHours(23, 59, 59, 999);
      return s;
    }
    case 'day': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
    case 'hour': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), 59, 59, 999);
    case 'minute': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), 59, 999);
    case 'second': return new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 999);
    case 'millisecond': return new Date(d.getTime());
  }
}

// ─── Comparison ─────────────────────────────────────────────────────────────

/** True if a is before b. */
export function isBefore(a: DateInput, b: DateInput): boolean {
  return toDate(a).getTime() < toDate(b).getTime();
}

/** True if a is after b. */
export function isAfter(a: DateInput, b: DateInput): boolean {
  return toDate(a).getTime() > toDate(b).getTime();
}

/** True if a and b are the same instant (or same unit boundary when unit is given). */
export function isSame(a: DateInput, b: DateInput, unit?: DateUnitInput): boolean {
  if (!unit) return toDate(a).getTime() === toDate(b).getTime();
  return startOf(a, unit).getTime() === startOf(b, unit).getTime();
}

/** True if a ≤ b (optionally at unit granularity). */
export function isSameOrBefore(a: DateInput, b: DateInput, unit?: DateUnitInput): boolean {
  return isSame(a, b, unit) || isBefore(unit ? startOf(a, unit) : a, unit ? startOf(b, unit) : b);
}

/** True if a ≥ b (optionally at unit granularity). */
export function isSameOrAfter(a: DateInput, b: DateInput, unit?: DateUnitInput): boolean {
  return isSame(a, b, unit) || isAfter(unit ? startOf(a, unit) : a, unit ? startOf(b, unit) : b);
}

/** True if `input` is between `start` and `end` (inclusive). */
export function isBetween(input: DateInput, start: DateInput, end: DateInput, unit?: DateUnitInput): boolean {
  return isSameOrAfter(input, start, unit) && isSameOrBefore(input, end, unit);
}

/** True if the date is today. */
export function isToday(input: DateInput): boolean { return isSame(input, new Date(), 'day'); }
/** True if the date is yesterday. */
export function isYesterday(input: DateInput): boolean { return isSame(input, subtract(new Date(), 1, 'day'), 'day'); }
/** True if the date is tomorrow. */
export function isTomorrow(input: DateInput): boolean { return isSame(input, add(new Date(), 1, 'day'), 'day'); }
/** True if Saturday or Sunday. */
export function isWeekend(input: DateInput): boolean { const dow = toDate(input).getDay(); return dow === 0 || dow === 6; }
/** True if Monday–Friday. */
export function isWeekday(input: DateInput): boolean { return !isWeekend(input); }
/** True if the date is in the past. */
export function isPast(input: DateInput): boolean { return toDate(input).getTime() < Date.now(); }
/** True if the date is in the future. */
export function isFuture(input: DateInput): boolean { return toDate(input).getTime() > Date.now(); }

// ─── Difference ─────────────────────────────────────────────────────────────

/** Difference between two dates in the given unit. Returns signed (a − b). */
export function diff(a: DateInput, b: DateInput, unit: DateUnitInput = 'millisecond'): number {
  const msA = toDate(a).getTime();
  const msB = toDate(b).getTime();
  const delta = msA - msB;
  const u = resolveUnit(unit);
  switch (u) {
    case 'millisecond': return delta;
    case 'second': return Math.floor(delta / MS_SECOND);
    case 'minute': return Math.floor(delta / MS_MINUTE);
    case 'hour': return Math.floor(delta / MS_HOUR);
    case 'day': return Math.floor(delta / MS_DAY);
    case 'week': return Math.floor(delta / MS_WEEK);
    case 'month': {
      const dA = toDate(a), dB = toDate(b);
      return (dA.getFullYear() - dB.getFullYear()) * 12 + (dA.getMonth() - dB.getMonth());
    }
    case 'year': return toDate(a).getFullYear() - toDate(b).getFullYear();
  }
}

// ─── Formatting ─────────────────────────────────────────────────────────────

const pad2 = (n: number): string => String(n).padStart(2, '0');
const pad3 = (n: number): string => String(n).padStart(3, '0');
const pad4 = (n: number): string => String(n).padStart(4, '0');

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_NAMES_MIN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Format a date using a token string (moment-compatible).
 *
 * Tokens: YYYY YY MMMM MMM MM M Do DD D dddd ddd dd d
 *         HH H hh h mm m ss s SSS A a X x ZZ Z
 *         [escaped text]
 *
 * Locale shortcuts: LT LTS L LL LLL LLLL l ll lll llll
 */
export function format(input: DateInput, fmt: string): string {
  const d = toDate(input);
  const Y = d.getFullYear();
  const Mo = d.getMonth();
  const D = d.getDate();
  const H = d.getHours();
  const mi = d.getMinutes();
  const s = d.getSeconds();
  const ms = d.getMilliseconds();
  const dow = d.getDay();
  const h12 = H % 12 || 12;

  const tz = d.getTimezoneOffset();
  const tzSign = tz <= 0 ? '+' : '-';
  const tzAbs = Math.abs(tz);
  const tzH = pad2(Math.floor(tzAbs / 60));
  const tzM = pad2(tzAbs % 60);

  const LOCALE_FORMATS: Record<string, string> = {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A',
    l: 'M/D/YYYY',
    ll: 'MMM D, YYYY',
    lll: 'MMM D, YYYY h:mm A',
    llll: 'ddd, MMM D, YYYY h:mm A',
  };

  let resolved = fmt;
  for (const [key, val] of Object.entries(LOCALE_FORMATS)) {
    resolved = resolved.replace(new RegExp(`\\b${key}\\b`, 'g'), val);
  }

  const escaped: string[] = [];
  resolved = resolved.replace(/\[([^\]]*)\]/g, (_, content: string) => {
    escaped.push(content);
    return `\x00${escaped.length - 1}\x00`;
  });

  const tokens: Record<string, string> = {
    YYYY: pad4(Y),
    YY: String(Y).slice(-2),
    MMMM: MONTH_NAMES[Mo],
    MMM: MONTH_NAMES_SHORT[Mo],
    MM: pad2(Mo + 1),
    Do: ordinal(D),
    DD: pad2(D),
    dddd: DAY_NAMES[dow],
    ddd: DAY_NAMES_SHORT[dow],
    dd: DAY_NAMES_MIN[dow],
    HH: pad2(H),
    hh: pad2(h12),
    mm: pad2(mi),
    ss: pad2(s),
    SSS: pad3(ms),
    ZZ: `${tzSign}${tzH}${tzM}`,
    A: H < 12 ? 'AM' : 'PM',
    a: H < 12 ? 'am' : 'pm',
    X: String(Math.floor(d.getTime() / MS_SECOND)),
    x: String(d.getTime()),
    Z: `${tzSign}${tzH}:${tzM}`,
    M: String(Mo + 1),
    D: String(D),
    H: String(H),
    h: String(h12),
    d: String(dow),
    s: String(s),
  };

  const pattern = Object.keys(tokens)
    .sort((a, b) => b.length - a.length)
    .join('|');

  let result = resolved.replace(new RegExp(pattern, 'g'), (m) => tokens[m] ?? m);

  result = result.replace(/\x00(\d+)\x00/g, (_, idx) => escaped[parseInt(idx, 10)]);

  return result;
}

/** Format as ISO 8601 string. */
export function toISOString(input: DateInput): string {
  return toDate(input).toISOString();
}

// ─── Locale-aware formatting (via Intl) ─────────────────────────────────────

/**
 * Format a date using the browser's Intl.DateTimeFormat for full locale support.
 * Like Luxon's `toLocaleString()`.
 */
export function formatLocale(
  input: DateInput,
  options?: Intl.DateTimeFormatOptions,
  localeOpts?: LocaleOptions,
): string {
  return new Intl.DateTimeFormat(localeOpts?.locale, options).format(toDate(input));
}

/** Locale-aware short date (e.g. "3/24/2026" in en-US, "24/03/2026" in en-GB). */
export function toLocaleDateString(input: DateInput, locale?: string): string {
  return toDate(input).toLocaleDateString(locale);
}

/** Locale-aware time string (e.g. "2:30:00 PM"). */
export function toLocaleTimeString(input: DateInput, locale?: string): string {
  return toDate(input).toLocaleTimeString(locale);
}

/** Locale-aware full date + time string. */
export function toLocaleString(input: DateInput, locale?: string): string {
  return toDate(input).toLocaleString(locale);
}

/** Get month name using Intl for any locale. */
export function monthName(input: DateInput, style: 'long' | 'short' | 'narrow' = 'long', locale?: string): string {
  return new Intl.DateTimeFormat(locale, { month: style }).format(toDate(input));
}

/** Get weekday name using Intl for any locale. */
export function weekdayName(input: DateInput, style: 'long' | 'short' | 'narrow' = 'long', locale?: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(toDate(input));
}

// ─── Locale info (like Luxon Info / moment.months()) ────────────────────────

/** Return all month names for a locale (like `moment.months()`). */
export function monthNames(style: 'long' | 'short' | 'narrow' = 'long', locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { month: style });
  return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2026, i, 1)));
}

/** Return all weekday names for a locale (starting Sunday, like `moment.weekdays()`). */
export function weekdayNames(style: 'long' | 'short' | 'narrow' = 'long', locale?: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: style });
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2026, 0, 4 + i)));
}

// ─── Calendar time ──────────────────────────────────────────────────────────

/**
 * Calendar time string — relative to "now" with human-readable labels.
 *
 * Like moment's `.calendar()`:
 * - Today at 2:30 PM
 * - Yesterday at 2:30 PM
 * - Tomorrow at 2:30 PM
 * - Last Monday at 2:30 PM
 * - Next Friday at 2:30 PM
 * - 03/10/2026
 */
export function calendar(input: DateInput, options: CalendarOptions = {}): string {
  const d = toDate(input);
  const ref = options.now ? toDate(options.now) : new Date();
  const diffDays = Math.floor((startOf(d, 'day').getTime() - startOf(ref, 'day').getTime()) / MS_DAY);
  const timeFmt = format(d, 'h:mm A');
  const fmts = options.formats ?? {};

  if (diffDays === 0) {
    return fmts.sameDay ? format(d, fmts.sameDay) : `Today at ${timeFmt}`;
  }
  if (diffDays === -1) {
    return fmts.lastDay ? format(d, fmts.lastDay) : `Yesterday at ${timeFmt}`;
  }
  if (diffDays === 1) {
    return fmts.nextDay ? format(d, fmts.nextDay) : `Tomorrow at ${timeFmt}`;
  }
  if (diffDays > 1 && diffDays < 7) {
    return fmts.nextWeek ? format(d, fmts.nextWeek) : `${DAY_NAMES[d.getDay()]} at ${timeFmt}`;
  }
  if (diffDays < 0 && diffDays > -7) {
    return fmts.lastWeek ? format(d, fmts.lastWeek) : `Last ${DAY_NAMES[d.getDay()]} at ${timeFmt}`;
  }
  return fmts.sameElse ? format(d, fmts.sameElse) : format(d, 'MM/DD/YYYY');
}

// ─── Relative time ──────────────────────────────────────────────────────────

const RELATIVE_THRESHOLDS: [number, DateUnit, string, string][] = [
  [MS_SECOND, 'second', 'a few seconds ago', 'in a few seconds'],
  [MS_MINUTE, 'minute', '1 minute ago', 'in 1 minute'],
  [MS_HOUR, 'hour', '1 hour ago', 'in 1 hour'],
  [MS_DAY, 'day', '1 day ago', 'in 1 day'],
  [MS_WEEK, 'week', '1 week ago', 'in 1 week'],
  [30 * MS_DAY, 'month', '1 month ago', 'in 1 month'],
  [365 * MS_DAY, 'year', '1 year ago', 'in 1 year'],
];

/** Human-readable relative time string (e.g. "3 days ago", "in 2 hours"). */
export function formatRelative(input: DateInput, options: RelativeTimeOptions = {}): string {
  const now = options.now ? toDate(options.now) : new Date();
  const d = toDate(input);
  const deltaMs = d.getTime() - now.getTime();
  const absDelta = Math.abs(deltaMs);
  const past = deltaMs < 0;

  if (absDelta < MS_SECOND) return 'just now';

  for (let i = RELATIVE_THRESHOLDS.length - 1; i >= 0; i--) {
    const [threshold, unit] = RELATIVE_THRESHOLDS[i];
    if (options.maxUnit && resolveUnit(options.maxUnit) === unit) {
      const count = Math.floor(absDelta / threshold);
      const plural = count !== 1 ? `${unit}s` : unit;
      return past ? `${count} ${plural} ago` : `in ${count} ${plural}`;
    }
    if (absDelta >= threshold) {
      const count = Math.floor(absDelta / threshold);
      if (count === 1) return past ? RELATIVE_THRESHOLDS[i][2] : RELATIVE_THRESHOLDS[i][3];
      const plural = `${unit}s`;
      return past ? `${count} ${plural} ago` : `in ${count} ${plural}`;
    }
  }

  const secs = Math.floor(absDelta / MS_SECOND);
  return past ? `${secs} seconds ago` : `in ${secs} seconds`;
}

/** Locale-aware relative time using browser's `Intl.RelativeTimeFormat`. */
export function formatRelativeLocale(input: DateInput, unit: DateUnitInput = 'day', locale?: string): string {
  const d = toDate(input);
  const delta = diff(d, new Date(), unit);
  const u = resolveUnit(unit);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  return rtf.format(delta, u as Intl.RelativeTimeFormatUnit);
}

/** Like moment's `.fromNow()`. */
export function fromNow(input: DateInput): string { return formatRelative(input); }
/** Inverse of fromNow. */
export function toNow(input: DateInput): string { return formatRelative(new Date(), { now: input }); }

// ─── Duration ───────────────────────────────────────────────────────────────

/** Create a DurationObject from milliseconds. */
export function toDuration(ms: number): DurationObject {
  const abs = Math.abs(ms);
  const days = Math.floor(abs / MS_DAY);
  const hours = Math.floor((abs % MS_DAY) / MS_HOUR);
  const minutes = Math.floor((abs % MS_HOUR) / MS_MINUTE);
  const seconds = Math.floor((abs % MS_MINUTE) / MS_SECOND);
  const milliseconds = abs % MS_SECOND;
  return { days, hours, minutes, seconds, milliseconds };
}

/** Convert a DurationObject or ms number to total milliseconds. */
export function durationToMs(input: DurationInput): number {
  if (typeof input === 'number') return input;
  return (
    (input.years ?? 0) * 365 * MS_DAY +
    (input.months ?? 0) * 30 * MS_DAY +
    (input.weeks ?? 0) * MS_WEEK +
    (input.days ?? 0) * MS_DAY +
    (input.hours ?? 0) * MS_HOUR +
    (input.minutes ?? 0) * MS_MINUTE +
    (input.seconds ?? 0) * MS_SECOND +
    (input.milliseconds ?? 0)
  );
}

/** Add a duration to a date. */
export function addDuration(input: DateInput, duration: DurationInput): Date {
  return new Date(toDate(input).getTime() + durationToMs(duration));
}

/** Subtract a duration from a date. */
export function subtractDuration(input: DateInput, duration: DurationInput): Date {
  return new Date(toDate(input).getTime() - durationToMs(duration));
}

/**
 * Human-readable duration string.
 * E.g. "2 hours, 15 minutes, 30 seconds"
 */
export function humanizeDuration(input: DurationInput): string {
  const ms = typeof input === 'number' ? input : durationToMs(input);
  const abs = Math.abs(ms);

  if (abs < MS_SECOND) return 'a few milliseconds';
  if (abs < MS_MINUTE) return `${Math.floor(abs / MS_SECOND)} seconds`;
  if (abs < MS_HOUR) {
    const m = Math.floor(abs / MS_MINUTE);
    return m === 1 ? 'a minute' : `${m} minutes`;
  }
  if (abs < MS_DAY) {
    const h = Math.floor(abs / MS_HOUR);
    return h === 1 ? 'an hour' : `${h} hours`;
  }
  if (abs < 30 * MS_DAY) {
    const d = Math.floor(abs / MS_DAY);
    return d === 1 ? 'a day' : `${d} days`;
  }
  if (abs < 365 * MS_DAY) {
    const mo = Math.floor(abs / (30 * MS_DAY));
    return mo === 1 ? 'a month' : `${mo} months`;
  }
  const y = Math.floor(abs / (365 * MS_DAY));
  return y === 1 ? 'a year' : `${y} years`;
}

/** Format a duration as HH:mm:ss (useful for timers / countdowns). */
export function formatDuration(input: DurationInput): string {
  const ms = typeof input === 'number' ? input : durationToMs(input);
  const abs = Math.abs(ms);
  const h = Math.floor(abs / MS_HOUR);
  const m = Math.floor((abs % MS_HOUR) / MS_MINUTE);
  const s = Math.floor((abs % MS_MINUTE) / MS_SECOND);
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

// ─── Interval ───────────────────────────────────────────────────────────────

/** Create a DateInterval between two dates. */
export function interval(start: DateInput, end: DateInput): DateInterval {
  return { start: toDate(start), end: toDate(end) };
}

/** Duration of an interval in milliseconds. */
export function intervalLength(iv: DateInterval, unit: DateUnitInput = 'millisecond'): number {
  return diff(iv.end, iv.start, unit);
}

/** True if the date falls within the interval (inclusive). */
export function intervalContains(iv: DateInterval, input: DateInput): boolean {
  return isBetween(input, iv.start, iv.end);
}

/** True if two intervals overlap. */
export function intervalsOverlap(a: DateInterval, b: DateInterval): boolean {
  return isBefore(a.start, b.end) && isAfter(a.end, b.start);
}

/** Return the intersection of two intervals, or null if they don't overlap. */
export function intervalIntersection(a: DateInterval, b: DateInterval): DateInterval | null {
  if (!intervalsOverlap(a, b)) return null;
  return {
    start: isAfter(a.start, b.start) ? toDate(a.start) : toDate(b.start),
    end: isBefore(a.end, b.end) ? toDate(a.end) : toDate(b.end),
  };
}

/** Split an interval into chunks of the specified unit size. */
export function intervalSplit(iv: DateInterval, step: number = 1, unit: DateUnitInput = 'day'): DateInterval[] {
  const result: DateInterval[] = [];
  let current = toDate(iv.start);
  while (isBefore(current, iv.end)) {
    const next = add(current, step, unit);
    result.push({ start: toDate(current), end: isBefore(next, iv.end) ? next : toDate(iv.end) });
    current = next;
  }
  return result;
}

// ─── Timezone ───────────────────────────────────────────────────────────────

/**
 * Format a date in a specific IANA timezone.
 * Uses `Intl.DateTimeFormat` — works in all modern browsers and Node 14+.
 */
export function formatInTimeZone(
  input: DateInput,
  options: TimeZoneFormatOptions,
  fmt?: Intl.DateTimeFormatOptions,
): string {
  const d = toDate(input);
  const merged: Intl.DateTimeFormatOptions = {
    ...fmt,
    timeZone: options.timeZone,
  };
  return new Intl.DateTimeFormat(options.locale, merged).format(d);
}

/**
 * Get the UTC offset string for a timezone at a given moment.
 * E.g. getTimezoneOffset("America/New_York", "2026-07-01") → "-04:00"
 */
export function getTimezoneOffset(timeZone: string, input?: DateInput): string {
  const d = input ? toDate(input) : new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  }).formatToParts(d);
  const tzPart = parts.find((p) => p.type === 'timeZoneName');
  if (!tzPart) return '+00:00';
  const offset = tzPart.value.replace('GMT', '');
  return offset || '+00:00';
}

/**
 * Get comprehensive timezone info for a date.
 */
export function getTimezoneInfo(timeZone: string, input?: DateInput): TimezoneInfo {
  const d = input ? toDate(input) : new Date();

  const offsetStr = getTimezoneOffset(timeZone, d);
  const [hStr, mStr] = offsetStr.replace(/[+-]/, '').split(':');
  const sign = offsetStr.startsWith('-') ? -1 : 1;
  const offsetMinutes = sign * (parseInt(hStr, 10) * 60 + parseInt(mStr || '0', 10));

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'short',
  }).formatToParts(d);
  const abbreviation = parts.find((p) => p.type === 'timeZoneName')?.value ?? timeZone;

  return { name: timeZone, offset: offsetStr, offsetMinutes, abbreviation };
}

/**
 * Convert a date from one timezone to another.
 * Returns a locale string showing the converted time.
 */
export function convertTimezone(
  input: DateInput,
  fromTz: string,
  toTz: string,
  locale?: string,
): string {
  const d = toDate(input);
  return new Intl.DateTimeFormat(locale ?? 'en-US', {
    timeZone: toTz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(d);
}

// ─── Range & Utilities ──────────────────────────────────────────────────────

/** Return the earlier of two dates. */
export function minDate(a: DateInput, b: DateInput): Date {
  return isBefore(a, b) ? toDate(a) : toDate(b);
}

/** Return the later of two dates. */
export function maxDate(a: DateInput, b: DateInput): Date {
  return isAfter(a, b) ? toDate(a) : toDate(b);
}

/** Clamp a date to [min, max]. */
export function clampDate(input: DateInput, min: DateInput, max: DateInput): Date {
  return maxDate(min, minDate(input, max));
}

/** Generate an array of dates from start to end, stepping by n units. */
export function dateRange(start: DateInput, end: DateInput, step: number = 1, unit: DateUnitInput = 'day'): Date[] {
  const result: Date[] = [];
  let current = toDate(start);
  const endDate = toDate(end);
  while (current.getTime() <= endDate.getTime()) {
    result.push(new Date(current.getTime()));
    current = add(current, step, unit);
  }
  return result;
}

/** Sort an array of dates (returns new array). */
export function sortDates(dates: DateInput[], order: 'asc' | 'desc' = 'asc'): Date[] {
  return dates.map(toDate).sort((a, b) => order === 'asc' ? a.getTime() - b.getTime() : b.getTime() - a.getTime());
}

/** Return the closest date from a list to the given target. */
export function closestDate(target: DateInput, dates: DateInput[]): Date {
  const t = toDate(target).getTime();
  let best = toDate(dates[0]);
  let bestDiff = Math.abs(best.getTime() - t);
  for (let i = 1; i < dates.length; i++) {
    const d = toDate(dates[i]);
    const dd = Math.abs(d.getTime() - t);
    if (dd < bestDiff) { best = d; bestDiff = dd; }
  }
  return best;
}

/** Full years of age from a birthdate. */
export function age(birthdate: DateInput, reference?: DateInput): number {
  const ref = reference ? toDate(reference) : new Date();
  const birth = toDate(birthdate);
  let a = ref.getFullYear() - birth.getFullYear();
  const mDiff = ref.getMonth() - birth.getMonth();
  if (mDiff < 0 || (mDiff === 0 && ref.getDate() < birth.getDate())) a--;
  return a;
}

/** "morning" | "afternoon" | "evening" | "night" */
export function timeOfDay(input: DateInput): 'morning' | 'afternoon' | 'evening' | 'night' {
  const h = toDate(input).getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  if (h >= 17 && h < 21) return 'evening';
  return 'night';
}

/** Create a Date from a Unix timestamp (seconds). */
export function fromUnix(timestamp: number): Date {
  return new Date(timestamp * MS_SECOND);
}

/** Shorthand for `new Date()`. */
export function now(): Date {
  return new Date();
}

/** Count business days (Mon-Fri) between two dates. */
export function businessDaysBetween(start: DateInput, end: DateInput): number {
  let count = 0;
  let current = startOf(start, 'day');
  const last = startOf(end, 'day');
  while (current.getTime() <= last.getTime()) {
    if (isWeekday(current)) count++;
    current = add(current, 1, 'day');
  }
  return count;
}

/** Add N business days (Mon-Fri) to a date. */
export function addBusinessDays(input: DateInput, days: number): Date {
  let d = toDate(input);
  let remaining = Math.abs(days);
  const sign = days >= 0 ? 1 : -1;
  while (remaining > 0) {
    d = add(d, sign, 'day');
    if (isWeekday(d)) remaining--;
  }
  return d;
}

/** Get all dates in the month of the given date (useful for calendar grids). */
export function datesInMonth(input: DateInput): Date[] {
  const d = toDate(input);
  const count = daysInMonth(d);
  return Array.from({ length: count }, (_, i) =>
    new Date(d.getFullYear(), d.getMonth(), i + 1),
  );
}

/** Get the calendar grid for a month (6×7 = 42 cells, padded with prev/next month). */
export function calendarGrid(input: DateInput, weekStartsOn: 0 | 1 = 0): Date[] {
  const firstDay = startOf(startOf(input, 'month'), 'day');
  let startDay = firstDay.getDay() - weekStartsOn;
  if (startDay < 0) startDay += 7;
  const gridStart = subtract(firstDay, startDay, 'day');
  return Array.from({ length: 42 }, (_, i) => add(gridStart, i, 'day'));
}
