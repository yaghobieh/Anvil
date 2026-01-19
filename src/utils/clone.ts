import { isArray, isDate, isMap, isPlainObject, isRegExp, isSet } from './type-guards';

/**
 * Creates a shallow clone of a value
 * @param value - The value to clone
 * @returns A shallow clone of the value
 */
export function shallowClone<T>(value: T): T {
  if (isArray(value)) {
    return [...value] as T;
  }
  if (isPlainObject(value)) {
    return { ...value } as T;
  }
  if (isMap(value)) {
    return new Map(value) as T;
  }
  if (isSet(value)) {
    return new Set(value) as T;
  }
  if (isDate(value)) {
    return new Date(value.getTime()) as T;
  }
  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags) as T;
  }
  return value;
}

/**
 * Creates a deep clone of a value
 * @param value - The value to clone
 * @param seen - WeakMap to track circular references
 * @returns A deep clone of the value
 */
export function deepClone<T>(value: T, seen: WeakMap<object, unknown> = new WeakMap()): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (seen.has(value as object)) {
    return seen.get(value as object) as T;
  }

  if (isDate(value)) {
    return new Date(value.getTime()) as T;
  }

  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (isArray(value)) {
    const cloned: unknown[] = [];
    seen.set(value as object, cloned);
    for (let i = 0; i < value.length; i++) {
      cloned[i] = deepClone(value[i], seen);
    }
    return cloned as T;
  }

  if (isMap(value)) {
    const cloned = new Map();
    seen.set(value as object, cloned);
    value.forEach((v, k) => {
      cloned.set(deepClone(k, seen), deepClone(v, seen));
    });
    return cloned as T;
  }

  if (isSet(value)) {
    const cloned = new Set();
    seen.set(value as object, cloned);
    value.forEach((v) => {
      cloned.add(deepClone(v, seen));
    });
    return cloned as T;
  }

  if (isPlainObject(value)) {
    const cloned: Record<string, unknown> = {};
    seen.set(value as object, cloned);
    for (const key of Object.keys(value)) {
      cloned[key] = deepClone((value as Record<string, unknown>)[key], seen);
    }
    return cloned as T;
  }

  return value;
}

/**
 * Freezes an object and all nested objects recursively
 * @param obj - The object to freeze
 * @returns The frozen object
 */
export function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.keys(obj).forEach((key) => {
    const value = (obj as Record<string, unknown>)[key];
    if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
      deepFreeze(value as object);
    }
  });
  return Object.freeze(obj);
}

/**
 * Seals an object and all nested objects recursively
 * @param obj - The object to seal
 * @returns The sealed object
 */
export function deepSeal<T extends object>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    const value = (obj as Record<string, unknown>)[key];
    if (value !== null && typeof value === 'object' && !Object.isSealed(value)) {
      deepSeal(value as object);
    }
  });
  return Object.seal(obj);
}

