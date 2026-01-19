import { REGEX_PATTERNS } from '../constants';

/**
 * Capitalizes the first letter of a string
 * @param str - The string
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Lowercases the first letter of a string
 * @param str - The string
 * @returns String with lowercase first letter
 */
export function uncapitalize(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

/**
 * Converts string to camelCase
 * @param str - The string
 * @returns camelCase string
 */
export function camelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

/**
 * Converts string to PascalCase
 * @param str - The string
 * @returns PascalCase string
 */
export function pascalCase(str: string): string {
  return capitalize(camelCase(str));
}

/**
 * Converts string to snake_case
 * @param str - The string
 * @returns snake_case string
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}

/**
 * Converts string to kebab-case
 * @param str - The string
 * @returns kebab-case string
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

/**
 * Converts string to CONSTANT_CASE
 * @param str - The string
 * @returns CONSTANT_CASE string
 */
export function constantCase(str: string): string {
  return snakeCase(str).toUpperCase();
}

/**
 * Converts string to Title Case
 * @param str - The string
 * @returns Title Case string
 */
export function titleCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(capitalize)
    .join(' ');
}

/**
 * Converts string to Sentence case
 * @param str - The string
 * @returns Sentence case string
 */
export function sentenceCase(str: string): string {
  const result = str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .toLowerCase();
  return capitalize(result);
}

/**
 * Trims whitespace from both ends
 * @param str - The string
 * @returns Trimmed string
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Trims whitespace from start
 * @param str - The string
 * @returns Trimmed string
 */
export function trimStart(str: string): string {
  return str.trimStart();
}

/**
 * Trims whitespace from end
 * @param str - The string
 * @returns Trimmed string
 */
export function trimEnd(str: string): string {
  return str.trimEnd();
}

/**
 * Trims specific characters from both ends
 * @param str - The string
 * @param chars - Characters to trim
 * @returns Trimmed string
 */
export function trimChars(str: string, chars: string): string {
  const escaped = chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g');
  return str.replace(regex, '');
}

/**
 * Pads string at start
 * @param str - The string
 * @param length - Target length
 * @param char - Padding character
 * @returns Padded string
 */
export function padStart(str: string, length: number, char: string = ' '): string {
  return str.padStart(length, char);
}

/**
 * Pads string at end
 * @param str - The string
 * @param length - Target length
 * @param char - Padding character
 * @returns Padded string
 */
export function padEnd(str: string, length: number, char: string = ' '): string {
  return str.padEnd(length, char);
}

/**
 * Pads string on both sides
 * @param str - The string
 * @param length - Target length
 * @param char - Padding character
 * @returns Padded string
 */
export function pad(str: string, length: number, char: string = ' '): string {
  const totalPad = length - str.length;
  if (totalPad <= 0) return str;
  const startPad = Math.floor(totalPad / 2);
  const endPad = totalPad - startPad;
  return char.repeat(startPad) + str + char.repeat(endPad);
}

/**
 * Truncates string to specified length
 * @param str - The string
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Truncates string in the middle
 * @param str - The string
 * @param length - Maximum length
 * @param separator - Middle separator
 * @returns Truncated string
 */
export function truncateMiddle(str: string, length: number, separator: string = '...'): string {
  if (str.length <= length) return str;
  const charsToShow = length - separator.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return str.slice(0, frontChars) + separator + str.slice(-backChars);
}

/**
 * Repeats string n times
 * @param str - The string
 * @param n - Number of times to repeat
 * @returns Repeated string
 */
export function repeat(str: string, n: number): string {
  return str.repeat(n);
}

/**
 * Reverses a string
 * @param str - The string
 * @returns Reversed string
 */
export function reverse(str: string): string {
  return [...str].reverse().join('');
}

/**
 * Counts occurrences of substring
 * @param str - The string
 * @param substring - Substring to count
 * @returns Number of occurrences
 */
export function countOccurrences(str: string, substring: string): number {
  if (!substring) return 0;
  return (str.match(new RegExp(escapeRegExp(substring), 'g')) || []).length;
}

/**
 * Escapes special regex characters
 * @param str - The string
 * @returns Escaped string
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Escapes HTML entities
 * @param str - The string
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => entities[char]);
}

/**
 * Unescapes HTML entities
 * @param str - The string
 * @returns Unescaped string
 */
export function unescapeHtml(str: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(/&(amp|lt|gt|quot|#39);/g, (match) => entities[match]);
}

/**
 * Converts string to slug
 * @param str - The string
 * @returns Slug string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Converts slug to readable string
 * @param str - The slug
 * @returns Readable string
 */
export function unslugify(str: string): string {
  return titleCase(str.replace(/-/g, ' '));
}

/**
 * Checks if string starts with substring
 * @param str - The string
 * @param prefix - Prefix to check
 * @returns True if starts with prefix
 */
export function startsWith(str: string, prefix: string): boolean {
  return str.startsWith(prefix);
}

/**
 * Checks if string ends with substring
 * @param str - The string
 * @param suffix - Suffix to check
 * @returns True if ends with suffix
 */
export function endsWith(str: string, suffix: string): boolean {
  return str.endsWith(suffix);
}

/**
 * Checks if string contains substring
 * @param str - The string
 * @param substring - Substring to check
 * @returns True if contains substring
 */
export function includes(str: string, substring: string): boolean {
  return str.includes(substring);
}

/**
 * Checks if string is empty or whitespace
 * @param str - The string
 * @returns True if blank
 */
export function isBlank(str: string): boolean {
  return str.trim().length === 0;
}

/**
 * Checks if string is not empty or whitespace
 * @param str - The string
 * @returns True if not blank
 */
export function isNotBlank(str: string): boolean {
  return !isBlank(str);
}

/**
 * Checks if string is valid email
 * @param str - The string
 * @returns True if valid email
 */
export function isEmail(str: string): boolean {
  return REGEX_PATTERNS.EMAIL.test(str);
}

/**
 * Checks if string is valid URL
 * @param str - The string
 * @returns True if valid URL
 */
export function isUrl(str: string): boolean {
  return REGEX_PATTERNS.URL.test(str);
}

/**
 * Checks if string is valid UUID
 * @param str - The string
 * @returns True if valid UUID
 */
export function isUuid(str: string): boolean {
  return REGEX_PATTERNS.UUID.test(str);
}

/**
 * Checks if string contains only numbers
 * @param str - The string
 * @returns True if numeric
 */
export function isNumeric(str: string): boolean {
  return REGEX_PATTERNS.NUMERIC.test(str);
}

/**
 * Checks if string contains only alphanumeric characters
 * @param str - The string
 * @returns True if alphanumeric
 */
export function isAlphanumeric(str: string): boolean {
  return REGEX_PATTERNS.ALPHANUMERIC.test(str);
}

/**
 * Removes all whitespace
 * @param str - The string
 * @returns String without whitespace
 */
export function removeWhitespace(str: string): string {
  return str.replace(/\s+/g, '');
}

/**
 * Collapses whitespace to single spaces
 * @param str - The string
 * @returns String with collapsed whitespace
 */
export function collapseWhitespace(str: string): string {
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Splits string by multiple delimiters
 * @param str - The string
 * @param delimiters - Delimiters to split by
 * @returns Array of parts
 */
export function splitByMultiple(str: string, delimiters: string[]): string[] {
  const pattern = delimiters.map(escapeRegExp).join('|');
  return str.split(new RegExp(pattern));
}

/**
 * Wraps string at specified width
 * @param str - The string
 * @param width - Maximum width
 * @param separator - Line separator
 * @returns Wrapped string
 */
export function wordWrap(str: string, width: number, separator: string = '\n'): string {
  const words = str.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  for (const word of words) {
    if (currentLine.length + word.length + 1 > width) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.join(separator);
}

/**
 * Template literal tag for template strings
 * @param strings - Template strings
 * @param values - Template values
 * @returns Interpolated string
 */
export function template(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
}

/**
 * Interpolates variables in a string
 * @param str - The template string
 * @param vars - Variables to interpolate
 * @returns Interpolated string
 */
export function interpolate(str: string, vars: Record<string, unknown>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ''));
}

/**
 * Masks part of a string
 * @param str - The string
 * @param start - Start index to mask
 * @param end - End index to mask
 * @param maskChar - Mask character
 * @returns Masked string
 */
export function mask(str: string, start: number, end?: number, maskChar: string = '*'): string {
  const endIdx = end ?? str.length;
  const masked = maskChar.repeat(endIdx - start);
  return str.slice(0, start) + masked + str.slice(endIdx);
}

/**
 * Masks email address
 * @param email - The email
 * @returns Masked email
 */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const maskedLocal = local.length > 2
    ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
    : '*'.repeat(local.length);
  return `${maskedLocal}@${domain}`;
}

/**
 * Generates random string
 * @param length - String length
 * @param charset - Character set to use
 * @returns Random string
 */
export function randomString(
  length: number,
  charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Generates UUID v4
 * @returns UUID string
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Extracts numbers from string
 * @param str - The string
 * @returns Array of numbers
 */
export function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Extracts words from string
 * @param str - The string
 * @returns Array of words
 */
export function extractWords(str: string): string[] {
  return str.match(/[a-zA-Z]+/g) || [];
}

/**
 * Converts string to boolean
 * @param str - The string
 * @returns Boolean value
 */
export function toBoolean(str: string): boolean {
  return ['true', '1', 'yes', 'on'].includes(str.toLowerCase());
}

/**
 * Converts string to number safely
 * @param str - The string
 * @param defaultValue - Default value if conversion fails
 * @returns Number value
 */
export function toNumber(str: string, defaultValue: number = 0): number {
  const num = Number(str);
  return Number.isNaN(num) ? defaultValue : num;
}

/**
 * Pluralizes a word
 * @param word - The word
 * @param count - Count for pluralization
 * @param plural - Custom plural form
 * @returns Pluralized word
 */
export function pluralize(word: string, count: number, plural?: string): string {
  if (count === 1) return word;
  return plural ?? `${word}s`;
}

/**
 * Compares strings naturally
 * @param a - First string
 * @param b - Second string
 * @returns Comparison result
 */
export function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * Calculates Levenshtein distance
 * @param a - First string
 * @param b - Second string
 * @returns Edit distance
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

/**
 * Calculates string similarity
 * @param a - First string
 * @param b - Second string
 * @returns Similarity score (0-1)
 */
export function similarity(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - levenshteinDistance(a, b) / maxLength;
}

/**
 * Finds common prefix of strings
 * @param strings - Array of strings
 * @returns Common prefix
 */
export function commonPrefix(strings: string[]): string {
  if (strings.length === 0) return '';
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === '') return '';
    }
  }
  return prefix;
}

/**
 * Finds common suffix of strings
 * @param strings - Array of strings
 * @returns Common suffix
 */
export function commonSuffix(strings: string[]): string {
  return reverse(commonPrefix(strings.map(reverse)));
}

