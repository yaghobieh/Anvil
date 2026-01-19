export const TYPE_NAMES = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  OBJECT: 'object',
  FUNCTION: 'function',
  UNDEFINED: 'undefined',
  SYMBOL: 'symbol',
  BIGINT: 'bigint',
} as const;

export const OBJECT_TAGS = {
  ARRAY: '[object Array]',
  OBJECT: '[object Object]',
  DATE: '[object Date]',
  REGEXP: '[object RegExp]',
  MAP: '[object Map]',
  SET: '[object Set]',
  WEAKMAP: '[object WeakMap]',
  WEAKSET: '[object WeakSet]',
  PROMISE: '[object Promise]',
  ERROR: '[object Error]',
  NULL: '[object Null]',
  UNDEFINED: '[object Undefined]',
  FUNCTION: '[object Function]',
  ASYNC_FUNCTION: '[object AsyncFunction]',
  GENERATOR_FUNCTION: '[object GeneratorFunction]',
  SYMBOL: '[object Symbol]',
  ARGUMENTS: '[object Arguments]',
  ARRAYBUFFER: '[object ArrayBuffer]',
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/[^\s$.?#].[^\s]*$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  PHONE: /^\+?[\d\s-()]+$/,
  NUMERIC: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  IP_V4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  DATE_ISO: /^\d{4}-\d{2}-\d{2}$/,
} as const;

export const SPECIAL_CHARS = {
  NEWLINE: '\n',
  TAB: '\t',
  CARRIAGE_RETURN: '\r',
  SPACE: ' ',
  DOT: '.',
  COMMA: ',',
  COLON: ':',
  SEMICOLON: ';',
  SLASH: '/',
  BACKSLASH: '\\',
  UNDERSCORE: '_',
  HYPHEN: '-',
} as const;

