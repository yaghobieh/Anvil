import type { PropertyPath } from '../types';
import { isArray, isNullOrUndefined, isPlainObject, isString, isFunction } from './type-guards';
import { deepClone } from './clone';

/**
 * Gets a value from an object by path
 * @param obj - The object
 * @param path - Property path (e.g., 'a.b.c' or ['a', 'b', 'c'])
 * @param defaultValue - Default value if not found
 * @returns The value at path or default value
 */
export function get<T = unknown>(obj: unknown, path: PropertyPath, defaultValue?: T): T | undefined {
  const keys = isString(path) ? path.split('.') : isArray(path) ? path : [path];
  let result: unknown = obj;
  for (const key of keys) {
    if (isNullOrUndefined(result)) return defaultValue;
    result = (result as Record<string | number | symbol, unknown>)[key];
  }
  return (result === undefined ? defaultValue : result) as T | undefined;
}

/**
 * Sets a value in an object by path
 * @param obj - The object
 * @param path - Property path
 * @param value - Value to set
 * @returns New object with value set
 */
export function set<T extends object>(obj: T, path: PropertyPath, value: unknown): T {
  const keys = isString(path) ? path.split('.') : isArray(path) ? path : [path];
  const result = deepClone(obj);
  let current: Record<string, unknown> = result as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = String(keys[i]);
    if (!isPlainObject(current[key])) {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  current[String(keys[keys.length - 1])] = value;
  return result;
}

/**
 * Checks if an object has a property at path
 * @param obj - The object
 * @param path - Property path
 * @returns True if property exists
 */
export function has(obj: unknown, path: PropertyPath): boolean {
  const keys = isString(path) ? path.split('.') : isArray(path) ? path : [path];
  let current: unknown = obj;
  for (const key of keys) {
    if (isNullOrUndefined(current) || !Object.prototype.hasOwnProperty.call(current, key)) {
      return false;
    }
    current = (current as Record<string | number | symbol, unknown>)[key];
  }
  return true;
}

/**
 * Removes a property at path
 * @param obj - The object
 * @param path - Property path
 * @returns New object without the property
 */
export function unset<T extends object>(obj: T, path: PropertyPath): T {
  const keys = isString(path) ? path.split('.') : isArray(path) ? path : [path];
  const result = deepClone(obj);
  if (keys.length === 1) {
    delete (result as Record<string, unknown>)[String(keys[0])];
    return result;
  }
  let current: Record<string, unknown> = result as Record<string, unknown>;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = String(keys[i]);
    if (!isPlainObject(current[key])) return result;
    current = current[key] as Record<string, unknown>;
  }
  delete current[String(keys[keys.length - 1])];
  return result;
}

/**
 * Picks specified properties from an object
 * @param obj - The object
 * @param keys - Keys to pick
 * @returns New object with only picked properties
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specified properties from an object
 * @param obj - The object
 * @param keys - Keys to omit
 * @returns New object without omitted properties
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const keySet = new Set(keys as (keyof T)[]);
  const result = {} as Record<keyof T, T[keyof T]>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (!keySet.has(key)) {
      result[key] = obj[key];
    }
  }
  return result as Omit<T, K>;
}

/**
 * Picks properties based on a predicate
 * @param obj - The object
 * @param predicate - Predicate function
 * @returns New object with matching properties
 */
export function pickBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits properties based on a predicate
 * @param obj - The object
 * @param predicate - Predicate function
 * @returns New object without matching properties
 */
export function omitBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  return pickBy(obj, (value, key) => !predicate(value, key));
}

/**
 * Returns object keys
 * @param obj - The object
 * @returns Array of keys
 */
export function keys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Returns object values
 * @param obj - The object
 * @returns Array of values
 */
export function values<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/**
 * Returns object entries
 * @param obj - The object
 * @returns Array of key-value pairs
 */
export function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Creates an object from entries
 * @param entries - Array of key-value pairs
 * @returns Object
 */
export function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>;
}

/**
 * Shallow merges objects
 * @param target - Target object
 * @param sources - Source objects
 * @returns Merged object
 */
export function merge<T extends object>(...sources: T[]): T {
  return Object.assign({}, ...sources);
}

/**
 * Deep merges objects
 * @param target - Target object
 * @param sources - Source objects
 * @returns Deep merged object
 */
export function deepMerge<T extends object>(...sources: T[]): T {
  const result = {} as Record<string, unknown>;
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const sourceValue = (source as Record<string, unknown>)[key];
      const targetValue = result[key];
      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        result[key] = deepMerge(targetValue as object, sourceValue as object);
      } else {
        result[key] = deepClone(sourceValue);
      }
    }
  }
  return result as T;
}

/**
 * Maps object values
 * @param obj - The object
 * @param mapper - Mapper function
 * @returns New object with mapped values
 */
export function mapValues<T extends object, R>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = mapper(obj[key], key);
  }
  return result;
}

/**
 * Maps object keys
 * @param obj - The object
 * @param mapper - Mapper function
 * @returns New object with mapped keys
 */
export function mapKeys<T extends object>(
  obj: T,
  mapper: (key: keyof T, value: T[keyof T]) => string
): Record<string, T[keyof T]> {
  const result = {} as Record<string, T[keyof T]>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const newKey = mapper(key, obj[key]);
    result[newKey] = obj[key];
  }
  return result;
}

/**
 * Filters object properties
 * @param obj - The object
 * @param predicate - Predicate function
 * @returns Filtered object
 */
export function filterObject<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  return pickBy(obj, predicate);
}

/**
 * Inverts an object's keys and values
 * @param obj - The object
 * @returns Inverted object
 */
export function invert<T extends Record<string, string | number>>(obj: T): Record<string, keyof T> {
  const result = {} as Record<string, keyof T>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[String(obj[key])] = key;
  }
  return result;
}

/**
 * Flattens a nested object
 * @param obj - The object
 * @param separator - Key separator
 * @param prefix - Key prefix
 * @returns Flattened object
 */
export function flattenObject(
  obj: Record<string, unknown>,
  separator: string = '.',
  prefix: string = ''
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}${separator}${key}` : key;
    if (isPlainObject(obj[key])) {
      Object.assign(result, flattenObject(obj[key] as Record<string, unknown>, separator, newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  return result;
}

/**
 * Unflattens an object
 * @param obj - The flattened object
 * @param separator - Key separator
 * @returns Nested object
 */
export function unflattenObject(
  obj: Record<string, unknown>,
  separator: string = '.'
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of Object.keys(obj)) {
    const keys = key.split(separator);
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k]) current[k] = {};
      current = current[k] as Record<string, unknown>;
    }
    current[keys[keys.length - 1]] = obj[key];
  }
  return result;
}

/**
 * Checks if two objects are deeply equal
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if deeply equal
 */
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== typeof obj2) return false;
  if (obj1 === null || obj2 === null) return obj1 === obj2;
  if (typeof obj1 !== 'object') return obj1 === obj2;
  if (isArray(obj1) && isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, i) => isEqual(item, obj2[i]));
  }
  if (isPlainObject(obj1) && isPlainObject(obj2)) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    return keys1.every((key) => isEqual(obj1[key], obj2[key]));
  }
  return false;
}

/**
 * Creates a defaults object
 * @param obj - The object
 * @param defaults - Default values
 * @returns Object with defaults applied
 */
export function defaults<T extends object>(obj: Partial<T>, defaultValues: T): T {
  const result = { ...defaultValues };
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (obj[key] !== undefined) {
      result[key] = obj[key] as T[keyof T];
    }
  }
  return result;
}

/**
 * Deep defaults
 * @param obj - The object
 * @param defaultValues - Default values
 * @returns Object with deep defaults applied
 */
export function defaultsDeep<T extends object>(obj: Partial<T>, defaultValues: T): T {
  return deepMerge(defaultValues, obj as T);
}

/**
 * Transforms an object
 * @param obj - The object
 * @param transformer - Transformer function
 * @returns Transformed object
 */
export function transform<T extends object, R extends object>(
  obj: T,
  transformer: (result: R, value: T[keyof T], key: keyof T) => void
): R {
  const result = {} as R;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    transformer(result, obj[key], key);
  }
  return result;
}

/**
 * Returns the size of an object
 * @param obj - The object
 * @returns Number of properties
 */
export function size(obj: object): number {
  return Object.keys(obj).length;
}

/**
 * Checks if an object is empty
 * @param obj - The object
 * @returns True if empty
 */
export function isEmpty(obj: object): boolean {
  return size(obj) === 0;
}

/**
 * Converts object to Map
 * @param obj - The object
 * @returns Map
 */
export function toMap<K extends string, V>(obj: Record<K, V>): Map<K, V> {
  return new Map(Object.entries(obj) as [K, V][]);
}

/**
 * Converts Map to object
 * @param map - The map
 * @returns Object
 */
export function fromMap<K extends string, V>(map: Map<K, V>): Record<K, V> {
  return Object.fromEntries(map) as Record<K, V>;
}

/**
 * Renames object keys
 * @param obj - The object
 * @param keyMap - Map of old keys to new keys
 * @returns Object with renamed keys
 */
export function renameKeys<T extends object>(
  obj: T,
  keyMap: Partial<Record<keyof T, string>>
): Record<string, T[keyof T]> {
  const result = {} as Record<string, T[keyof T]>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    const newKey = keyMap[key] ?? String(key);
    result[newKey] = obj[key];
  }
  return result;
}

/**
 * Creates object from arrays of keys and values
 * @param keys - Array of keys
 * @param values - Array of values
 * @returns Object
 */
export function zipObject<K extends string, V>(keys: K[], values: V[]): Record<K, V> {
  const result = {} as Record<K, V>;
  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }
  return result;
}

/**
 * Finds key by value
 * @param obj - The object
 * @param value - Value to find
 * @returns Key or undefined
 */
export function findKey<T extends object>(obj: T, value: T[keyof T]): keyof T | undefined {
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (obj[key] === value) return key;
  }
  return undefined;
}

/**
 * Finds key by predicate
 * @param obj - The object
 * @param predicate - Predicate function
 * @returns Key or undefined
 */
export function findKeyBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): keyof T | undefined {
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(obj[key], key)) return key;
  }
  return undefined;
}

/**
 * For each object property
 * @param obj - The object
 * @param callback - Callback function
 */
export function forOwn<T extends object>(
  obj: T,
  callback: (value: T[keyof T], key: keyof T) => void | boolean
): void {
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (callback(obj[key], key) === false) break;
  }
}

/**
 * Assigns value only if truthy
 * @param obj - The object
 * @param key - Key to assign
 * @param value - Value to assign
 * @returns Object
 */
export function assignIf<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K] | undefined | null
): T {
  if (value) {
    return { ...obj, [key]: value };
  }
  return obj;
}

/**
 * Creates a computed property
 * @param obj - The object
 * @param key - Property name
 * @param getter - Getter function
 * @returns Object with computed property
 */
export function computed<T extends object, K extends string, V>(
  obj: T,
  key: K,
  getter: (obj: T) => V
): T & Record<K, V> {
  return Object.defineProperty({ ...obj }, key, {
    get() {
      return getter(obj);
    },
    enumerable: true,
  }) as T & Record<K, V>;
}

/**
 * Removes undefined values from object
 * @param obj - The object
 * @returns Object without undefined values
 */
export function compact<T extends object>(obj: T): Partial<T> {
  return omitBy(obj, (value) => value === undefined) as Partial<T>;
}

/**
 * Removes null and undefined values from object
 * @param obj - The object
 * @returns Object without null or undefined values
 */
export function compactDeep<T extends object>(obj: T): Partial<T> {
  return omitBy(obj, isNullOrUndefined) as Partial<T>;
}

/**
 * Ensures object has all specified keys
 * @param obj - The object
 * @param keys - Required keys
 * @param defaultValue - Default value for missing keys
 * @returns Object with all keys
 */
export function ensure<T extends object, K extends string>(
  obj: T,
  keys: K[],
  defaultValue: unknown = undefined
): T & Record<K, unknown> {
  const result = { ...obj } as T & Record<K, unknown>;
  for (const key of keys) {
    if (!(key in result)) {
      (result as Record<K, unknown>)[key] = defaultValue;
    }
  }
  return result;
}

