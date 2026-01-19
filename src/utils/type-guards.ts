import { TYPE_NAMES, OBJECT_TAGS } from '../constants';

const getTag = (value: unknown): string => Object.prototype.toString.call(value);

/**
 * Checks if a value is undefined
 * @param value - The value to check
 * @returns True if the value is undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is null
 * @param value - The value to check
 * @returns True if the value is null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns True if the value is null or undefined
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is defined (not null or undefined)
 * @param value - The value to check
 * @returns True if the value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is a string
 * @param value - The value to check
 * @returns True if the value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === TYPE_NAMES.STRING;
}

/**
 * Checks if a value is a number and not NaN
 * @param value - The value to check
 * @returns True if the value is a valid number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === TYPE_NAMES.NUMBER && !Number.isNaN(value);
}

/**
 * Checks if a value is a boolean
 * @param value - The value to check
 * @returns True if the value is a boolean
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === TYPE_NAMES.BOOLEAN;
}

/**
 * Checks if a value is a symbol
 * @param value - The value to check
 * @returns True if the value is a symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === TYPE_NAMES.SYMBOL;
}

/**
 * Checks if a value is a bigint
 * @param value - The value to check
 * @returns True if the value is a bigint
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === TYPE_NAMES.BIGINT;
}

/**
 * Checks if a value is a function
 * @param value - The value to check
 * @returns True if the value is a function
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === TYPE_NAMES.FUNCTION;
}

/**
 * Checks if a value is an async function
 * @param value - The value to check
 * @returns True if the value is an async function
 */
export function isAsyncFunction(value: unknown): value is (...args: unknown[]) => Promise<unknown> {
  return getTag(value) === OBJECT_TAGS.ASYNC_FUNCTION;
}

/**
 * Checks if a value is an array
 * @param value - The value to check
 * @returns True if the value is an array
 */
export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a plain object
 * @param value - The value to check
 * @returns True if the value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (getTag(value) !== OBJECT_TAGS.OBJECT) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

/**
 * Checks if a value is an object (including arrays, functions, etc.)
 * @param value - The value to check
 * @returns True if the value is an object
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === TYPE_NAMES.OBJECT;
}

/**
 * Checks if a value is a Date object
 * @param value - The value to check
 * @returns True if the value is a Date
 */
export function isDate(value: unknown): value is Date {
  return getTag(value) === OBJECT_TAGS.DATE;
}

/**
 * Checks if a value is a valid Date (not Invalid Date)
 * @param value - The value to check
 * @returns True if the value is a valid Date
 */
export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !Number.isNaN(value.getTime());
}

/**
 * Checks if a value is a RegExp
 * @param value - The value to check
 * @returns True if the value is a RegExp
 */
export function isRegExp(value: unknown): value is RegExp {
  return getTag(value) === OBJECT_TAGS.REGEXP;
}

/**
 * Checks if a value is a Map
 * @param value - The value to check
 * @returns True if the value is a Map
 */
export function isMap<K = unknown, V = unknown>(value: unknown): value is Map<K, V> {
  return getTag(value) === OBJECT_TAGS.MAP;
}

/**
 * Checks if a value is a Set
 * @param value - The value to check
 * @returns True if the value is a Set
 */
export function isSet<T = unknown>(value: unknown): value is Set<T> {
  return getTag(value) === OBJECT_TAGS.SET;
}

/**
 * Checks if a value is a WeakMap
 * @param value - The value to check
 * @returns True if the value is a WeakMap
 */
export function isWeakMap<K extends object = object, V = unknown>(value: unknown): value is WeakMap<K, V> {
  return getTag(value) === OBJECT_TAGS.WEAKMAP;
}

/**
 * Checks if a value is a WeakSet
 * @param value - The value to check
 * @returns True if the value is a WeakSet
 */
export function isWeakSet<T extends object = object>(value: unknown): value is WeakSet<T> {
  return getTag(value) === OBJECT_TAGS.WEAKSET;
}

/**
 * Checks if a value is a Promise
 * @param value - The value to check
 * @returns True if the value is a Promise
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return getTag(value) === OBJECT_TAGS.PROMISE || (isObject(value) && isFunction((value as Promise<T>).then));
}

/**
 * Checks if a value is an Error
 * @param value - The value to check
 * @returns True if the value is an Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - The value to check
 * @returns True if the value is empty
 */
export function isEmpty(value: unknown): boolean {
  if (isNullOrUndefined(value)) return true;
  if (isString(value) || isArray(value)) return value.length === 0;
  if (isMap(value) || isSet(value)) return value.size === 0;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
}

/**
 * Checks if a value is a primitive type
 * @param value - The value to check
 * @returns True if the value is a primitive
 */
export function isPrimitive(value: unknown): value is string | number | boolean | null | undefined | symbol | bigint {
  return value === null || (typeof value !== TYPE_NAMES.OBJECT && typeof value !== TYPE_NAMES.FUNCTION);
}

/**
 * Checks if a value is truthy
 * @param value - The value to check
 * @returns True if the value is truthy
 */
export function isTruthy<T>(value: T | null | undefined | false | 0 | ''): value is T {
  return Boolean(value);
}

/**
 * Checks if a value is falsy
 * @param value - The value to check
 * @returns True if the value is falsy
 */
export function isFalsy(value: unknown): value is false | 0 | '' | null | undefined {
  return !value;
}

/**
 * Checks if a value is NaN
 * @param value - The value to check
 * @returns True if the value is NaN
 */
export function isNaN(value: unknown): boolean {
  return Number.isNaN(value);
}

/**
 * Checks if a value is a finite number
 * @param value - The value to check
 * @returns True if the value is a finite number
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value);
}

/**
 * Checks if a value is an integer
 * @param value - The value to check
 * @returns True if the value is an integer
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value);
}

/**
 * Checks if a value is a positive number
 * @param value - The value to check
 * @returns True if the value is a positive number
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * Checks if a value is a negative number
 * @param value - The value to check
 * @returns True if the value is a negative number
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

/**
 * Checks if a value is zero
 * @param value - The value to check
 * @returns True if the value is zero
 */
export function isZero(value: unknown): value is 0 {
  return value === 0;
}

/**
 * Checks if a value is an even number
 * @param value - The value to check
 * @returns True if the value is an even number
 */
export function isEven(value: unknown): value is number {
  return isInteger(value) && value % 2 === 0;
}

/**
 * Checks if a value is an odd number
 * @param value - The value to check
 * @returns True if the value is an odd number
 */
export function isOdd(value: unknown): value is number {
  return isInteger(value) && value % 2 !== 0;
}

