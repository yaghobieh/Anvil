import type { ArrayPredicate, ArrayMapper, Comparator, SortConfig, GroupedResult, ChunkResult, UniqueByKey } from '../types';
import { isArray, isFunction, isNullOrUndefined } from './type-guards';

/**
 * Returns the first element of an array
 * @param arr - The array
 * @returns The first element or undefined
 */
export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

/**
 * Returns the last element of an array
 * @param arr - The array
 * @returns The last element or undefined
 */
export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

/**
 * Returns an array with the first n elements
 * @param arr - The array
 * @param n - Number of elements to take
 * @returns Array with first n elements
 */
export function take<T>(arr: T[], n: number): T[] {
  return arr.slice(0, n);
}

/**
 * Returns an array without the first n elements
 * @param arr - The array
 * @param n - Number of elements to drop
 * @returns Array without first n elements
 */
export function drop<T>(arr: T[], n: number): T[] {
  return arr.slice(n);
}

/**
 * Returns an array with the last n elements
 * @param arr - The array
 * @param n - Number of elements to take
 * @returns Array with last n elements
 */
export function takeLast<T>(arr: T[], n: number): T[] {
  return arr.slice(-n);
}

/**
 * Returns an array without the last n elements
 * @param arr - The array
 * @param n - Number of elements to drop
 * @returns Array without last n elements
 */
export function dropLast<T>(arr: T[], n: number): T[] {
  return arr.slice(0, -n);
}

/**
 * Filters out null and undefined values from an array
 * @param arr - The array
 * @returns Array without null or undefined values
 */
export function compact<T>(arr: (T | null | undefined)[]): T[] {
  return arr.filter((item): item is T => !isNullOrUndefined(item));
}

/**
 * Filters out falsy values from an array
 * @param arr - The array
 * @returns Array without falsy values
 */
export function truthy<T>(arr: (T | false | 0 | '' | null | undefined)[]): T[] {
  return arr.filter(Boolean) as T[];
}

/**
 * Returns unique values from an array
 * @param arr - The array
 * @param key - Optional key or function to determine uniqueness
 * @returns Array with unique values
 */
export function unique<T>(arr: T[], key?: UniqueByKey<T>): T[] {
  if (!key) {
    return [...new Set(arr)];
  }
  const seen = new Set();
  return arr.filter((item) => {
    const k = isFunction(key) ? key(item) : item[key as keyof T];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * Flattens a nested array to a specified depth
 * @param arr - The array to flatten
 * @param depth - The depth to flatten
 * @returns Flattened array
 */
export function flatten<T>(arr: unknown[], depth: number = 1): T[] {
  return arr.flat(depth) as T[];
}

/**
 * Flattens a nested array completely
 * @param arr - The array to flatten
 * @returns Completely flattened array
 */
export function flattenDeep<T>(arr: unknown[]): T[] {
  return arr.flat(Infinity) as T[];
}

/**
 * Splits an array into chunks of specified size
 * @param arr - The array
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export function chunk<T>(arr: T[], size: number): ChunkResult<T> {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * Groups array elements by a key
 * @param arr - The array
 * @param key - Key to group by or function returning the key
 * @returns Grouped object
 */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  key: keyof T | ((item: T) => K)
): GroupedResult<T, K> {
  return arr.reduce((acc, item) => {
    const k = (isFunction(key) ? key(item) : item[key as keyof T]) as K;
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as GroupedResult<T, K>);
}

/**
 * Finds an element in an array
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns The found element or undefined
 */
export function find<T>(arr: T[], predicate: ArrayPredicate<T>): T | undefined {
  return arr.find(predicate);
}

/**
 * Finds the index of an element in an array
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns The index or -1 if not found
 */
export function findIndex<T>(arr: T[], predicate: ArrayPredicate<T>): number {
  return arr.findIndex(predicate);
}

/**
 * Finds the last element matching a predicate
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns The found element or undefined
 */
export function findLast<T>(arr: T[], predicate: ArrayPredicate<T>): T | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i, arr)) return arr[i];
  }
  return undefined;
}

/**
 * Maps array elements using a mapper function
 * @param arr - The array
 * @param mapper - Mapper function
 * @returns Mapped array
 */
export function map<T, R>(arr: T[], mapper: ArrayMapper<T, R>): R[] {
  return arr.map(mapper);
}

/**
 * Filters array elements using a predicate
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns Filtered array
 */
export function filter<T>(arr: T[], predicate: ArrayPredicate<T>): T[] {
  return arr.filter(predicate);
}

/**
 * Sorts an array
 * @param arr - The array
 * @param comparator - Comparator function or sort configs
 * @returns Sorted array
 */
export function sort<T>(arr: T[], comparator?: Comparator<T> | SortConfig<T>[]): T[] {
  const copy = [...arr];
  if (!comparator) return copy.sort();
  if (isFunction(comparator)) return copy.sort(comparator);
  return copy.sort((a, b) => {
    for (const config of comparator) {
      const { key, order = 'asc' } = config;
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Reverses an array without mutating
 * @param arr - The array
 * @returns Reversed array
 */
export function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

/**
 * Shuffles an array randomly
 * @param arr - The array
 * @returns Shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns the intersection of two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Array with common elements
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => set.has(item));
}

/**
 * Returns the difference between two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Array with elements in arr1 but not in arr2
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter((item) => !set.has(item));
}

/**
 * Returns the union of two arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Array with all unique elements
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set([...arr1, ...arr2])];
}

/**
 * Zips multiple arrays together
 * @param arrays - Arrays to zip
 * @returns Zipped array
 */
export function zip<T>(...arrays: T[][]): T[][] {
  const maxLength = Math.max(...arrays.map((arr) => arr.length));
  const result: T[][] = [];
  for (let i = 0; i < maxLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }
  return result;
}

/**
 * Calculates the sum of numbers in an array
 * @param arr - Array of numbers
 * @returns Sum of all numbers
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculates the average of numbers in an array
 * @param arr - Array of numbers
 * @returns Average value
 */
export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
}

/**
 * Returns the minimum value in an array
 * @param arr - Array of numbers
 * @returns Minimum value
 */
export function min(arr: number[]): number {
  return Math.min(...arr);
}

/**
 * Returns the maximum value in an array
 * @param arr - Array of numbers
 * @returns Maximum value
 */
export function max(arr: number[]): number {
  return Math.max(...arr);
}

/**
 * Creates a range of numbers
 * @param start - Start value
 * @param end - End value
 * @param step - Step value
 * @returns Array of numbers
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Checks if an array includes all specified values
 * @param arr - The array
 * @param values - Values to check
 * @returns True if all values are included
 */
export function includesAll<T>(arr: T[], values: T[]): boolean {
  return values.every((val) => arr.includes(val));
}

/**
 * Checks if an array includes any of the specified values
 * @param arr - The array
 * @param values - Values to check
 * @returns True if any value is included
 */
export function includesAny<T>(arr: T[], values: T[]): boolean {
  return values.some((val) => arr.includes(val));
}

/**
 * Partitions an array into two based on a predicate
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns Tuple of arrays matching and not matching the predicate
 */
export function partition<T>(arr: T[], predicate: ArrayPredicate<T>): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  arr.forEach((item, index) => {
    (predicate(item, index, arr) ? pass : fail).push(item);
  });
  return [pass, fail];
}

/**
 * Counts occurrences of each value in an array
 * @param arr - The array
 * @returns Object with value counts
 */
export function countBy<T>(arr: T[], key?: keyof T | ((item: T) => string | number)): Record<string, number> {
  return arr.reduce((acc, item) => {
    const k = key
      ? isFunction(key) ? String(key(item)) : String(item[key])
      : String(item);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * Safely accesses an array element at a given index
 * @param arr - The array
 * @param index - The index (supports negative)
 * @returns Element at index or undefined
 */
export function at<T>(arr: T[], index: number): T | undefined {
  const len = arr.length;
  const idx = index < 0 ? len + index : index;
  return idx >= 0 && idx < len ? arr[idx] : undefined;
}

/**
 * Removes duplicates and flattens an array
 * @param arr - The nested array
 * @returns Flattened array with unique values
 */
export function uniqFlat<T>(arr: unknown[]): T[] {
  return [...new Set(flattenDeep<T>(arr))];
}

/**
 * Checks if two arrays are equal
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns True if arrays are equal
 */
export function isEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => item === arr2[index]);
}

/**
 * Inserts an element at a specific index
 * @param arr - The array
 * @param index - Index to insert at
 * @param items - Items to insert
 * @returns New array with inserted items
 */
export function insertAt<T>(arr: T[], index: number, ...items: T[]): T[] {
  const copy = [...arr];
  copy.splice(index, 0, ...items);
  return copy;
}

/**
 * Removes elements at specific indices
 * @param arr - The array
 * @param indices - Indices to remove
 * @returns New array without the removed elements
 */
export function removeAt<T>(arr: T[], ...indices: number[]): T[] {
  const indexSet = new Set(indices);
  return arr.filter((_, i) => !indexSet.has(i));
}

/**
 * Moves an element from one index to another
 * @param arr - The array
 * @param from - Source index
 * @param to - Target index
 * @returns New array with moved element
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/**
 * Swaps two elements in an array
 * @param arr - The array
 * @param i - First index
 * @param j - Second index
 * @returns New array with swapped elements
 */
export function swap<T>(arr: T[], i: number, j: number): T[] {
  const copy = [...arr];
  [copy[i], copy[j]] = [copy[j], copy[i]];
  return copy;
}

/**
 * Rotates array elements
 * @param arr - The array
 * @param n - Number of positions to rotate (positive = right, negative = left)
 * @returns Rotated array
 */
export function rotate<T>(arr: T[], n: number): T[] {
  if (arr.length === 0) return arr;
  const len = arr.length;
  const offset = ((n % len) + len) % len;
  return [...arr.slice(-offset), ...arr.slice(0, -offset || len)];
}

/**
 * Fills an array with a value
 * @param length - Array length
 * @param value - Value or function to generate values
 * @returns Filled array
 */
export function fill<T>(length: number, value: T | ((index: number) => T)): T[] {
  return Array.from({ length }, (_, i) => (isFunction(value) ? value(i) : value));
}

/**
 * Checks if array is sorted
 * @param arr - The array
 * @param comparator - Optional comparator
 * @returns True if sorted
 */
export function isSorted<T>(arr: T[], comparator?: Comparator<T>): boolean {
  const compare = comparator || ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  for (let i = 0; i < arr.length - 1; i++) {
    if (compare(arr[i], arr[i + 1]) > 0) return false;
  }
  return true;
}

/**
 * Returns a sample of random elements from an array
 * @param arr - The array
 * @param count - Number of elements to sample
 * @returns Array of sampled elements
 */
export function sample<T>(arr: T[], count: number = 1): T[] {
  const shuffled = shuffle(arr);
  return shuffled.slice(0, count);
}

/**
 * Creates a frequency map of array elements
 * @param arr - The array
 * @returns Map with element frequencies
 */
export function frequency<T>(arr: T[]): Map<T, number> {
  return arr.reduce((map, item) => {
    map.set(item, (map.get(item) || 0) + 1);
    return map;
  }, new Map<T, number>());
}

/**
 * Returns elements that appear only once
 * @param arr - The array
 * @returns Array of unique occurrences
 */
export function uniqueOnly<T>(arr: T[]): T[] {
  const freq = frequency(arr);
  return arr.filter((item) => freq.get(item) === 1);
}

/**
 * Returns elements that appear more than once
 * @param arr - The array
 * @returns Array of duplicate elements
 */
export function duplicates<T>(arr: T[]): T[] {
  const freq = frequency(arr);
  return [...new Set(arr.filter((item) => (freq.get(item) || 0) > 1))];
}

/**
 * Converts array-like or iterable to array
 * @param source - Source iterable or array-like
 * @returns Array
 */
export function toArray<T>(source: Iterable<T> | ArrayLike<T>): T[] {
  return Array.from(source);
}

/**
 * Removes falsy values and flattens
 * @param arr - The array
 * @returns Cleaned and flattened array
 */
export function clean<T>(arr: unknown[]): T[] {
  return truthy(flattenDeep<T>(arr)) as T[];
}

/**
 * Ensures a value is an array
 * @param value - The value
 * @returns Array containing the value or the value itself if already an array
 */
export function ensureArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}

/**
 * Returns the nth element supporting negative index
 * @param arr - The array
 * @param n - The index
 * @returns Element at index
 */
export function nth<T>(arr: T[], n: number): T | undefined {
  return at(arr, n);
}

/**
 * Checks if all elements satisfy a predicate
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns True if all satisfy
 */
export function every<T>(arr: T[], predicate: ArrayPredicate<T>): boolean {
  return arr.every(predicate);
}

/**
 * Checks if some elements satisfy a predicate
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns True if some satisfy
 */
export function some<T>(arr: T[], predicate: ArrayPredicate<T>): boolean {
  return arr.some(predicate);
}

/**
 * Returns none if predicate matches no elements
 * @param arr - The array
 * @param predicate - Predicate function
 * @returns True if none match
 */
export function none<T>(arr: T[], predicate: ArrayPredicate<T>): boolean {
  return !arr.some(predicate);
}

