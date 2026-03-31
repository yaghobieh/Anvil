import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

const DM = '@forgedevstack/anvil/date-master';

export const DATE_REFERENCE: ReferenceItem[] = [
  // ── Parsing ───────────────────────────────────────────────
  r(
    'toDate',
    'Parse any DateInput (Date, string, or number) into a new Date—never mutates the original.',
    'const d = toDate("2026-03-24");\nconsole.log(d); // Date 2026-03-24T00:00:00.000Z',
    DM,
  ),
  r(
    'isValidDateValue',
    'True if the input can be parsed into a valid Date.',
    'isValidDateValue("2026-01-01"); // true\nisValidDateValue("nope");       // false',
    DM,
  ),
  r(
    'fromObject',
    'Create a Date from individual components (Luxon-style). Missing fields default to epoch-safe values.',
    'fromObject({ year: 2026, month: 3, day: 24, hour: 14 });\n// Date 2026-03-24T14:00:00',
    DM,
  ),
  r(
    'parseFormat',
    'Parse a date string with a format pattern. Supports YYYY, MM, DD, HH, mm, ss tokens.',
    'parseFormat("24/03/2026", "DD/MM/YYYY");\n// Date 2026-03-24\n\nparseFormat("2026-03-24 14:30", "YYYY-MM-DD HH:mm");\n// Date 2026-03-24T14:30:00',
    DM,
  ),

  // ── Getters ───────────────────────────────────────────────
  r('year', 'Full year.', 'year("2026-03-24"); // 2026', DM),
  r('month', 'Month 1–12 (human-friendly).', 'month("2026-03-24"); // 3', DM),
  r('day', 'Day of month 1–31.', 'day("2026-03-24"); // 24', DM),
  r('weekday', 'Day of week 0=Sunday … 6=Saturday.', 'weekday("2026-03-24"); // 2 (Tuesday)', DM),
  r('isoWeekday', 'ISO day of week 1=Monday … 7=Sunday.', 'isoWeekday("2026-03-24"); // 2 (Tuesday)', DM),
  r('hour', 'Hour 0–23.', 'hour(new Date("2026-03-24T14:30:00")); // 14', DM),
  r('minute', 'Minute 0–59.', 'minute(new Date("2026-03-24T14:30:00")); // 30', DM),
  r('second', 'Second 0–59.', 'second(new Date("2026-03-24T14:30:45")); // 45', DM),
  r('millisecond', 'Millisecond 0–999.', 'millisecond(new Date("2026-03-24T14:30:45.123")); // 123', DM),
  r('unix', 'Unix timestamp in seconds.', 'unix("2026-03-24"); // 1774252800', DM),
  r('daysInMonth', 'Days in the month.', 'daysInMonth("2026-02-01"); // 28\ndaysInMonth("2024-02-01"); // 29', DM),
  r('dayOfYear', 'Day of the year 1–366.', 'dayOfYear("2026-03-24"); // 83', DM),
  r('weekOfYear', 'ISO week number 1–53.', 'weekOfYear("2026-01-01"); // 1', DM),
  r('quarter', 'Quarter of the year 1–4.', 'quarter("2026-08-15"); // 3', DM),
  r('isLeapYear', 'True if the year is a leap year.', 'isLeapYear("2024-01-01"); // true\nisLeapYear("2026-01-01"); // false', DM),
  r(
    'toObject',
    'Decompose a date into all its parts as a plain object (Luxon-style .toObject()).',
    'toObject("2026-03-24");\n// { year: 2026, month: 3, day: 24, hour: 0, minute: 0,\n//   second: 0, millisecond: 0, weekday: 2, weekOfYear: 13,\n//   dayOfYear: 83, quarter: 1, unix: 1774252800, isLeapYear: false }',
    DM,
  ),

  // ── Manipulation ──────────────────────────────────────────
  r(
    'add',
    'Return a new Date with amount of unit added. Supports short aliases (y, M, w, d, h, m, s, ms).',
    'add("2026-03-24", 5, "day");   // Mar 29\nadd("2026-01-31", 1, "M");     // Feb 28\nadd("2026-03-24", 2, "h");     // Mar 24 02:00',
    DM,
  ),
  r('subtract', 'Return a new Date with amount of unit subtracted.', 'subtract("2026-03-24", 1, "month"); // Feb 24', DM),
  r(
    'setDate',
    'Return a new Date with one or more fields set (like Luxon .set()). Import as `set` from date-master or `setDate` from main entry.',
    'set("2026-03-24", { hour: 14, minute: 30 });\n// 2026-03-24T14:30:00\n\nset("2026-03-24", { month: 12, day: 25 });\n// 2026-12-25',
    DM,
  ),
  r(
    'startOf',
    'Return a new Date set to the start of the given unit.',
    'startOf("2026-03-24T14:30:00", "day");   // Mar 24 00:00\nstartOf("2026-03-24", "month");          // Mar 1\nstartOf("2026-03-24", "year");           // Jan 1',
    DM,
  ),
  r(
    'endOf',
    'Return a new Date set to the end of the given unit.',
    'endOf("2026-03-24T14:30:00", "day"); // Mar 24 23:59:59.999\nendOf("2026-03-24", "month");        // Mar 31 23:59:59.999',
    DM,
  ),

  // ── Comparison ────────────────────────────────────────────
  r('isBefore', 'True if a is before b.', 'isBefore("2026-01-01", "2026-12-31"); // true', DM),
  r('isAfter', 'True if a is after b.', 'isAfter("2026-12-31", "2026-01-01"); // true', DM),
  r(
    'isSame',
    'True if two dates match at the same instant or unit boundary.',
    'isSame("2026-03-24", "2026-03-24"); // true\nisSame("2026-03-24T10:00", "2026-03-24T22:00", "day"); // true',
    DM,
  ),
  r('isSameOrBefore', 'True if a ≤ b (optionally at unit granularity).', 'isSameOrBefore("2026-03-24", "2026-03-24"); // true', DM),
  r('isSameOrAfter', 'True if a ≥ b.', 'isSameOrAfter("2026-03-24", "2026-03-24"); // true', DM),
  r('isBetween', 'True if date is between start and end (inclusive).', 'isBetween("2026-06-15", "2026-01-01", "2026-12-31"); // true', DM),
  r('isToday', 'True if the date is today.', 'isToday(new Date()); // true', DM),
  r('isYesterday', 'True if the date is yesterday.', 'isYesterday(subtract(new Date(), 1, "day")); // true', DM),
  r('isTomorrow', 'True if the date is tomorrow.', 'isTomorrow(add(new Date(), 1, "day")); // true', DM),
  r('isWeekend', 'True if Saturday or Sunday.', 'isWeekend("2026-03-28"); // true (Saturday)', DM),
  r('isWeekday', 'True if Monday–Friday.', 'isWeekday("2026-03-24"); // true (Tuesday)', DM),
  r('isPast', 'True if in the past.', 'isPast("2020-01-01"); // true', DM),
  r('isFuture', 'True if in the future.', 'isFuture("2030-01-01"); // true', DM),

  // ── Difference ────────────────────────────────────────────
  r(
    'diff',
    'Signed difference (a − b) in the specified unit.',
    'diff("2026-03-30", "2026-03-24", "day");  // 6\ndiff("2026-01-01", "2027-01-01", "year"); // -1\ndiff("2026-03-24T14:00", "2026-03-24T10:00", "h"); // 4',
    DM,
  ),

  // ── Formatting ────────────────────────────────────────────
  r(
    'formatDate',
    'Format with moment-compatible tokens. Supports YYYY MM DD HH mm ss Do dddd ddd A a X x Z ZZ SSS and locale shortcuts LT LTS L LL LLL LLLL l ll lll llll. Escape with [brackets].',
    'formatDate("2026-03-24", "MMMM Do YYYY, h:mm:ss a");\n// "March 24th 2026, 12:00:00 am"\n\nformatDate("2026-03-24", "dddd");\n// "Tuesday"\n\nformatDate(new Date(), "LT");   // "2:30 PM"\nformatDate(new Date(), "LL");   // "March 24, 2026"\nformatDate(new Date(), "LLLL"); // "Tuesday, March 24, 2026 2:30 PM"\nformatDate(new Date(), "l");    // "3/24/2026"',
    DM,
  ),
  r('toISOString', 'ISO 8601 string.', 'toISOString("2026-03-24"); // "2026-03-24T00:00:00.000Z"', DM),

  // ── Locale-aware formatting ───────────────────────────────
  r(
    'formatLocale',
    'Format using Intl.DateTimeFormat for full locale support (like Luxon toLocaleString).',
    'formatLocale("2026-03-24", { dateStyle: "full" }, { locale: "fr-FR" });\n// "mardi 24 mars 2026"\n\nformatLocale("2026-03-24", { dateStyle: "long" }, { locale: "ja-JP" });\n// "2026年3月24日"',
    DM,
  ),
  r('toLocaleDateString', 'Locale-aware short date string.', 'toLocaleDateString("2026-03-24", "en-GB"); // "24/03/2026"\ntoLocaleDateString("2026-03-24", "en-US"); // "3/24/2026"', DM),
  r('toLocaleTimeString', 'Locale-aware time string.', 'toLocaleTimeString(new Date(), "en-US"); // "2:30:00 PM"', DM),
  r('toLocaleString', 'Locale-aware full date + time.', 'toLocaleString("2026-03-24", "de-DE"); // "24.3.2026, 00:00:00"', DM),
  r(
    'monthName',
    'Get the month name using Intl for any locale. Style: "long", "short", or "narrow".',
    'monthName("2026-03-24");                // "March"\nmonthName("2026-03-24", "short");        // "Mar"\nmonthName("2026-03-24", "long", "fr-FR"); // "mars"',
    DM,
  ),
  r(
    'weekdayName',
    'Get the weekday name using Intl for any locale.',
    'weekdayName("2026-03-24");                // "Tuesday"\nweekdayName("2026-03-24", "long", "es-ES"); // "martes"',
    DM,
  ),
  r(
    'monthNames',
    'All 12 month names for a locale (like moment.months()).',
    'monthNames();             // ["January","February",...]\nmonthNames("short", "fr"); // ["janv.","févr.",...]',
    DM,
  ),
  r(
    'weekdayNames',
    'All 7 weekday names for a locale (like moment.weekdays()).',
    'weekdayNames();             // ["Sunday","Monday",...]\nweekdayNames("short", "ja"); // ["日","月","火",...]',
    DM,
  ),

  // ── Calendar time ─────────────────────────────────────────
  r(
    'calendar',
    'Calendar time string relative to now — like moment .calendar(). Returns "Today at 2:30 PM", "Yesterday at …", "Last Monday at …", or falls back to a date format.',
    'calendar(new Date());                          // "Today at 2:30 PM"\ncalendar(subtract(new Date(), 1, "day"));      // "Yesterday at 2:30 PM"\ncalendar(subtract(new Date(), 3, "day"));      // "Last Saturday at 2:30 PM"\ncalendar(subtract(new Date(), 10, "day"));     // "03/14/2026"\ncalendar(add(new Date(), 1, "day"));           // "Tomorrow at 2:30 PM"',
    DM,
  ),

  // ── Relative time ─────────────────────────────────────────
  r(
    'formatRelative',
    'Human-readable relative time — "3 days ago", "in 2 hours". Configurable reference and maxUnit.',
    'formatRelative(subtract(new Date(), 3, "day")); // "3 days ago"\nformatRelative(add(new Date(), 2, "hour"));      // "in 2 hours"',
    DM,
  ),
  r(
    'formatRelativeLocale',
    'Locale-aware relative time using Intl.RelativeTimeFormat.',
    'formatRelativeLocale(subtract(new Date(), 3, "day"), "day", "en");\n// "3 days ago"\n\nformatRelativeLocale(subtract(new Date(), 3, "day"), "day", "fr");\n// "il y a 3 jours"',
    DM,
  ),
  r('fromNow', 'Like moment .fromNow() — relative string from now.', 'fromNow("2026-03-20"); // "4 days ago"', DM),
  r('toNow', 'Inverse perspective of fromNow.', 'toNow("2026-03-28"); // "4 days ago"', DM),

  // ── Duration ──────────────────────────────────────────────
  r(
    'toDuration',
    'Break milliseconds into a DurationObject { days, hours, minutes, seconds, milliseconds }.',
    'toDuration(90061000);\n// { days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 0 }',
    DM,
  ),
  r(
    'durationToMs',
    'Convert a DurationObject or raw ms number to total milliseconds.',
    'durationToMs({ hours: 2, minutes: 30 }); // 9000000\ndurationToMs({ days: 1 });                // 86400000',
    DM,
  ),
  r('addDuration', 'Add a duration (object or ms) to a date.', 'addDuration("2026-03-24", { hours: 2, minutes: 30 });\n// Date 2026-03-24T02:30:00', DM),
  r('subtractDuration', 'Subtract a duration from a date.', 'subtractDuration("2026-03-24", { days: 5 });\n// Date 2026-03-19', DM),
  r(
    'humanizeDuration',
    'Human-readable duration — "2 hours", "a minute", "3 days" (like moment.duration().humanize()).',
    'humanizeDuration(7200000);              // "2 hours"\nhumanizeDuration({ days: 1 });           // "a day"\nhumanizeDuration({ months: 3 });         // "3 months"',
    DM,
  ),
  r(
    'formatDuration',
    'Format a duration as HH:mm:ss (useful for timers / countdowns).',
    'formatDuration(3661000);         // "01:01:01"\nformatDuration({ hours: 2 });     // "02:00:00"',
    DM,
  ),

  // ── Interval ──────────────────────────────────────────────
  r(
    'interval',
    'Create a DateInterval { start, end } between two dates (like Luxon Interval).',
    'const iv = interval("2026-03-01", "2026-03-31");',
    DM,
  ),
  r('intervalLength', 'Duration of an interval in the given unit.', 'intervalLength(interval("2026-03-01", "2026-03-31"), "day"); // 30', DM),
  r('intervalContains', 'True if a date falls within the interval.', 'intervalContains(interval("2026-01-01", "2026-12-31"), "2026-06-15"); // true', DM),
  r('intervalsOverlap', 'True if two intervals overlap.', 'intervalsOverlap(\n  interval("2026-01-01", "2026-06-30"),\n  interval("2026-03-01", "2026-12-31"),\n); // true', DM),
  r(
    'intervalIntersection',
    'Return the overlap of two intervals, or null.',
    'intervalIntersection(\n  interval("2026-01-01", "2026-06-30"),\n  interval("2026-03-01", "2026-12-31"),\n);\n// { start: Mar 1, end: Jun 30 }',
    DM,
  ),
  r(
    'intervalSplit',
    'Split an interval into chunks of the given unit size.',
    'intervalSplit(interval("2026-03-01", "2026-03-10"), 3, "day");\n// [{Mar 1→Mar 4}, {Mar 4→Mar 7}, {Mar 7→Mar 10}]',
    DM,
  ),

  // ── Timezone ──────────────────────────────────────────────
  r(
    'formatInTimeZone',
    'Format a date in a specific IANA timezone using Intl. Like moment-timezone\'s `.tz().format()`.',
    'formatInTimeZone("2026-06-01T12:00:00Z", { timeZone: "America/New_York" },\n  { hour: "numeric", minute: "2-digit", timeZoneName: "short" });\n// "8:00 AM EDT"\n\nformatInTimeZone("2026-06-01T12:00:00Z", { timeZone: "Asia/Tokyo" },\n  { hour: "numeric", minute: "2-digit", timeZoneName: "short" });\n// "9:00 PM JST"',
    DM,
  ),
  r(
    'getTimezoneOffset',
    'Get the UTC offset string for a timezone at a given moment.',
    'getTimezoneOffset("America/New_York", "2026-07-01"); // "-04:00"\ngetTimezoneOffset("Asia/Kolkata");                   // "+05:30"',
    DM,
  ),
  r(
    'getTimezoneInfo',
    'Get comprehensive timezone info: name, offset, offsetMinutes, abbreviation.',
    'getTimezoneInfo("America/New_York", "2026-07-01");\n// { name: "America/New_York", offset: "-04:00",\n//   offsetMinutes: -240, abbreviation: "EDT" }',
    DM,
  ),
  r(
    'convertTimezone',
    'Convert a date from one timezone display to another.',
    'convertTimezone("2026-06-01T12:00:00Z", "UTC", "America/Los_Angeles");\n// "06/01/2026, 05:00:00"\n\nconvertTimezone("2026-06-01T12:00:00Z", "UTC", "Europe/London");\n// "06/01/2026, 13:00:00"',
    DM,
  ),

  // ── Range & utilities ─────────────────────────────────────
  r('minDate', 'Return the earlier of two dates.', 'minDate("2026-01-01", "2026-12-31"); // Jan 1', DM),
  r('maxDate', 'Return the later of two dates.', 'maxDate("2026-01-01", "2026-12-31"); // Dec 31', DM),
  r('clampDate', 'Clamp a date to [min, max].', 'clampDate("2025-06-01", "2026-01-01", "2026-12-31"); // Jan 1', DM),
  r(
    'dateRange',
    'Generate an array of dates from start to end.',
    'dateRange("2026-03-24", "2026-03-28");\n// [Mar 24, Mar 25, Mar 26, Mar 27, Mar 28]\n\ndateRange("2026-01-01", "2026-06-01", 1, "month");\n// [Jan 1, Feb 1, Mar 1, Apr 1, May 1, Jun 1]',
    DM,
  ),
  r('sortDates', 'Sort an array of dates (returns new array).', 'sortDates(["2026-12-01", "2026-01-01", "2026-06-15"]);\n// [Jan 1, Jun 15, Dec 1]', DM),
  r('closestDate', 'Find the closest date from a list to a target.', 'closestDate("2026-03-24", ["2026-01-01", "2026-03-20", "2026-12-31"]);\n// Mar 20', DM),
  r('age', 'Full years of age from a birthdate.', 'age("1990-05-15"); // 35 (as of March 2026)', DM),
  r('timeOfDay', 'Return "morning", "afternoon", "evening", or "night".', 'timeOfDay(new Date("2026-03-24T09:00")); // "morning"', DM),
  r('fromUnix', 'Create a Date from a Unix timestamp (seconds).', 'fromUnix(1774252800); // Date 2026-03-24', DM),
  r('now', 'Shorthand for new Date().', 'now(); // current Date', DM),
  r(
    'businessDaysBetween',
    'Count business days (Mon-Fri) between two dates.',
    'businessDaysBetween("2026-03-23", "2026-03-27"); // 5',
    DM,
  ),
  r(
    'addBusinessDays',
    'Add N business days (skipping weekends) to a date.',
    'addBusinessDays("2026-03-24", 5); // Mar 31 (skips Sat/Sun)',
    DM,
  ),
  r(
    'datesInMonth',
    'Get all dates in the month of the given date (useful for calendar grids).',
    'datesInMonth("2026-02-15").length; // 28',
    DM,
  ),
  r(
    'calendarGrid',
    'Get 42 dates (6×7) for a month calendar grid, padded with prev/next month days.',
    'calendarGrid("2026-03-01"); // [Feb 23, Feb 24, ..., Mar 1, ..., Mar 31, Apr 1, ...]',
    DM,
  ),
];
