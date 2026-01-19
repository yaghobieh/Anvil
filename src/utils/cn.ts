/**
 * Class name value types for conditional class names
 */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

/**
 * Converts a class value to array of class names
 * @param value - Class value to convert
 * @returns Array of class names
 */
function toClassNames(value: ClassValue): string[] {
  if (!value) return [];

  if (typeof value === 'string') {
    return value.split(/\s+/).filter(Boolean);
  }

  if (typeof value === 'number') {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(toClassNames);
  }

  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k);
  }

  return [];
}

/**
 * Conditionally join class names together (like clsx/classnames)
 * 
 * @param args - Class values (strings, objects, arrays, or falsy values)
 * @returns Combined class name string
 * 
 * @example
 * ```ts
 * cn('btn', 'primary');
 * // => 'btn primary'
 * 
 * cn('btn', { primary: true, disabled: false });
 * // => 'btn primary'
 * 
 * cn('btn', ['rounded', 'shadow'], { active: isActive });
 * // => 'btn rounded shadow active' (if isActive is true)
 * 
 * cn('btn', undefined, null, false, 'visible');
 * // => 'btn visible'
 * ```
 */
export function cn(...args: ClassValue[]): string {
  return args.flatMap(toClassNames).join(' ');
}

/**
 * Alias for cn - matches the classnames package API
 */
export const classNames = cn;

/**
 * Alias for cn - matches the clsx package API
 */
export const clsx = cn;

/**
 * Creates a cn function with a base class prefix
 * Useful for component libraries with namespaced classes
 * 
 * @param prefix - Base class prefix
 * @returns Prefixed cn function
 * 
 * @example
 * ```ts
 * const bem = cnPrefix('btn');
 * bem('primary', 'large');
 * // => 'btn btn-primary btn-large'
 * ```
 */
export function cnPrefix(prefix: string): (...args: ClassValue[]) => string {
  return (...args: ClassValue[]): string => {
    const classes = args.flatMap(toClassNames);
    const prefixed = classes.map((c) => `${prefix}-${c}`);
    return [prefix, ...prefixed].join(' ');
  };
}

/**
 * Creates a cn function that filters duplicates
 * 
 * @param args - Class values
 * @returns Deduplicated class name string
 * 
 * @example
 * ```ts
 * cnUnique('btn', 'btn', 'primary');
 * // => 'btn primary'
 * ```
 */
export function cnUnique(...args: ClassValue[]): string {
  const classes = args.flatMap(toClassNames);
  return [...new Set(classes)].join(' ');
}

/**
 * Merges class names with Tailwind CSS conflict resolution
 * Later classes override earlier conflicting classes
 * 
 * @param args - Class values
 * @returns Merged class name string with conflicts resolved
 * 
 * @example
 * ```ts
 * cnMerge('p-4', 'p-2');
 * // => 'p-2' (later wins)
 * 
 * cnMerge('text-red-500', 'text-blue-500');
 * // => 'text-blue-500'
 * ```
 */
export function cnMerge(...args: ClassValue[]): string {
  const classes = args.flatMap(toClassNames);
  const classMap = new Map<string, string>();

  // Common Tailwind prefix patterns for conflict detection
  const prefixPatterns = [
    // Spacing
    /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y)-/,
    // Sizing
    /^(w|h|min-w|min-h|max-w|max-h|size)-/,
    // Colors
    /^(text|bg|border|ring|shadow|outline|fill|stroke)-/,
    // Typography
    /^(font|text|leading|tracking|decoration|underline)-/,
    // Flexbox/Grid
    /^(flex|grid|justify|items|content|self|place|order|col|row)-/,
    // Layout
    /^(block|inline|hidden|visible|invisible|absolute|relative|fixed|sticky|static|z|inset|top|right|bottom|left)-/,
    // Borders
    /^(rounded|border)-/,
    // Effects
    /^(opacity|blur|brightness|contrast|grayscale|saturate|sepia|backdrop|transition|duration|ease|delay|animate)-/,
  ];

  for (const cls of classes) {
    let prefix = cls;

    // Find matching prefix pattern
    for (const pattern of prefixPatterns) {
      const match = cls.match(pattern);
      if (match) {
        prefix = match[1];
        break;
      }
    }

    classMap.set(prefix, cls);
  }

  return [...classMap.values()].join(' ');
}

/**
 * Conditionally apply class names with variant support
 * 
 * @param base - Base class names
 * @param variants - Variant conditions
 * @returns Combined class name string
 * 
 * @example
 * ```ts
 * cnVariants('btn', {
 *   primary: isPrimary,
 *   'btn-lg': size === 'large',
 *   'btn-disabled': disabled,
 * });
 * ```
 */
export function cnVariants(
  base: ClassValue,
  variants: { [key: string]: boolean | undefined | null }
): string {
  return cn(base, variants);
}

