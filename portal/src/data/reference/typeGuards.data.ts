import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

export const TYPE_GUARDS_REFERENCE: ReferenceItem[] = [
  r(
    'isUndefined',
    'Strictly checks value === undefined. In TypeScript, narrowing after this guard treats the value as defined in the else branch.',
    "isUndefined(undefined); // true",
  ),
  r(
    'isNull',
    'Strictly checks value === null (not undefined). Distinct from isNullOrUndefined when you care about null-only.',
    "isNull(null); // true",
  ),
  r(
    'isNullOrUndefined',
    'True for null or undefined—common “no value” check without treating 0 or "" as empty.',
    "isNullOrUndefined(null); // true",
  ),
  r(
    'isDefined',
    'True when the value is neither null nor undefined. Useful before accessing properties on optional data.',
    "isDefined(0); // true",
  ),
  r(
    'isString',
    'True for primitive strings. Does not coerce numbers; use when you need typeof === "string" semantics consistently.',
    "isString('a'); // true",
  ),
  r(
    'isNumber',
    'True when typeof value is number—including NaN and Infinity. Pair with isFinite or isNaN guard when you need real numeric input.',
    "isNumber(3.14); // true",
  ),
  r(
    'isBoolean',
    'True only for true or false primitives, not truthy/falsy objects.',
    "isBoolean(false); // true",
  ),
  r('isSymbol', 'True for symbol primitives.', 'isSymbol(Symbol("x")); // true'),
  r('isBigInt', 'True for bigint primitives.', 'isBigInt(1n); // true'),
  r(
    'isFunction',
    'True for callable values (including sync functions). Async functions are also functions; use isAsyncFunction to distinguish.',
    'isFunction(() => {}); // true',
  ),
  r(
    'isAsyncFunction',
    'True when the function is an async function (returns a Promise). Helps choose await vs direct call in generic utilities.',
    'isAsyncFunction(async () => {}); // true',
  ),
  r(
    'isArray',
    'True for Array.isArray-style detection—distinguishes arrays from array-like objects and plain objects.',
    'isArray([]); // true',
  ),
  r(
    'isPlainObject',
    'True for “plain” objects: typically Object.prototype or null prototype, not Date, Map, class instances, etc. Safe default for deep merge keys.',
    'isPlainObject({}); // true',
  ),
  r(
    'isObject',
    'Broader than isPlainObject: any non-null object type (may include functions, dates—see implementation).',
    'isObject({}); // typically true',
  ),
  r('isDate', 'True for Date instances (including Invalid Date—pair with isValidDate).', 'isDate(new Date()); // true'),
  r(
    'isValidDate',
    'True when value is a Date and getTime() is finite—filters out Invalid Date.',
    'isValidDate(new Date("2020-01-01")); // true',
  ),
  r('isRegExp', 'True for RegExp instances.', '/x/.test("x"); isRegExp(/x/); // true'),
  r('isMap', 'True for Map instances.', 'isMap(new Map()); // true'),
  r('isSet', 'True for Set instances.', 'isSet(new Set()); // true'),
  r('isWeakMap', 'True for WeakMap instances.', 'isWeakMap(new WeakMap()); // true'),
  r('isWeakSet', 'True for WeakSet instances.', 'isWeakSet(new WeakSet()); // true'),
  r(
    'isPromise',
    'True for thenables: native Promise or objects with a callable then method—useful for normalizing async APIs.',
    'isPromise(Promise.resolve(1)); // true',
  ),
  r(
    'isError',
    'True for Error and subclasses (TypeError, etc.)—handy in catch blocks when rethrowing or logging.',
    'isError(new TypeError()); // true',
  ),
  r(
    'isEmpty',
    'Opinionated “no content”: empty string, empty array, empty Map/Set, object with no own keys, etc. Does not treat whitespace-only strings as empty unless implemented that way—check source for edge cases.',
    'isEmpty([]); // true',
  ),
  r(
    'isPrimitive',
    'True for null, undefined, string, number, boolean, symbol, bigint—everything that is not typeof object (with null special-cased per implementation).',
    'isPrimitive("x"); // true',
  ),
  r(
    'isTruthy',
    'Matches Boolean(value)—non-empty strings (including "0") are truthy; only falsy values fail.',
    'isTruthy("0"); // true',
  ),
  r(
    'isFalsy',
    'Opposite of Boolean coercion: false, 0, "", null, undefined, NaN, etc.',
    'isFalsy(""); // true',
  ),
  r(
    'isNaN',
    'True only when value is the number NaN—stricter than global isNaN which coerces strings.',
    'isNaN(NaN); // true',
  ),
  r(
    'isFinite',
    'True for finite numbers; excludes NaN and ±Infinity.',
    'isFinite(1); // true',
  ),
  r(
    'isInteger',
    'True when the number is an integer (no fractional part).',
    'isInteger(2); // true',
  ),
  r(
    'isPositive',
    'True for numbers strictly greater than zero.',
    'isPositive(0.1); // true',
  ),
  r(
    'isNegative',
    'True for numbers strictly less than zero.',
    'isNegative(-1); // true',
  ),
  r(
    'isZero',
    'True only for exactly 0 (not -0 vs +0 nuances depend on implementation).',
    'isZero(0); // true',
  ),
  r(
    'isEven',
    'True for even integers; non-integers may be false or per implementation.',
    'isEven(4); // true',
  ),
  r(
    'isOdd',
    'True for odd integers.',
    'isOdd(3); // true',
  ),
];
