# ⚒️ Anvil

<p align="center">
  <img src="./icons/logo.svg" alt="Anvil Logo" width="120" height="120">
</p>

<p align="center">
  <strong>A modern utility library with React hooks, Vue composables & enhanced debugging</strong>
  <br>
  <em>The forge where code is shaped</em>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@forgedevstack/anvil"><img src="https://img.shields.io/npm/v/@forgedevstack/anvil.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/@forgedevstack/anvil"><img src="https://img.shields.io/npm/dm/@forgedevstack/anvil.svg" alt="npm downloads"></a>
  <a href="https://github.com/yaghobieh/anvil/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@forgedevstack/anvil.svg" alt="license"></a>
</p>

---

## ✨ Features

- 🔧 **100+ Utility Functions** — Deep clone, type guards, array/object manipulation, string utilities, **file & document helpers** (PDF / Markdown / Office by extension, MIME, size formatting)
- ⚛️ **40+ React Hooks** — useResponsive, useForm, useDebounce, useWebSocket, useScope, and many more
- 💚 **Vue Composables** — First-class Vue 3 support with reactivity
- 🔍 **Scope (Enhanced Debugger)** — Drop-in `debugger;` replacement with superpowers
- 🎨 **Style Forge (cn)** — Class name utilities (clsx/classnames alternative + Tailwind merge)
- 🎯 **TypeScript First** — Full type safety with comprehensive type utilities
- 📦 **Tree-shakeable** — Import only what you need
- 🚀 **Zero Dependencies** — Lightweight and fast
- 🌐 **Framework Agnostic** — Works with React, Vue, Angular, Node.js, and vanilla JS

## 📦 Installation

```bash
npm install @forgedevstack/anvil
```

```bash
yarn add @forgedevstack/anvil
```

```bash
pnpm add @forgedevstack/anvil
```

## 🚀 Quick Start

### Utility Functions

```typescript
import {
  deepClone,
  isNullOrUndefined,
  debounce,
  throttle,
  camelCase,
  unique,
  groupBy,
} from '@forgedevstack/anvil';

const cloned = deepClone({ nested: { data: [1, 2, 3] } });

const debouncedSearch = debounce((query: string) => {
  console.log('Searching:', query);
}, 300);

const uniqueItems = unique([1, 2, 2, 3, 3, 3]);

const grouped = groupBy(users, 'role');
```

### File & document helpers (PDF, Markdown, Office)

Extension- and MIME-based checks only (no file parsing). Useful for upload UIs, filters, and labels.

```typescript
import {
  getFileExtension,
  formatFileSize,
  getMimeTypeFromExtension,
  isPdfFile,
  isMarkdownFile,
  isOfficeDocumentFile,
  getDocumentKind,
  sanitizeFilename,
  readFileAsText,
  readFileAsArrayBuffer,
  readFileAsDataURL,
  downloadBlob,
  downloadText,
  getAcceptString,
  parseDataUrl,
} from '@forgedevstack/anvil';

getFileExtension('reports/Q4/archive.tar.gz'); // 'gz'
formatFileSize(1536000); // '1.5 MB'
getMimeTypeFromExtension('pdf'); // 'application/pdf'

isPdfFile('scan.pdf'); // true
isMarkdownFile('README.md'); // true
isOfficeDocumentFile('deck.pptx'); // true

getDocumentKind('notes.md'); // 'markdown'

sanitizeFilename('../../etc/passwd'); // 'passwd'

// HTML input accept
getAcceptString({ pdf: true, markdown: true, extra: ['image/png'] });

// data: URLs
parseDataUrl('data:text/plain;base64,SGk='); // { mime, isBase64, data }

// Browser: after file input
// await readFileAsText(file);
// await readFileAsArrayBuffer(file);
// await readFileAsDataURL(file);
// downloadText('hello', 'note.txt');
// downloadBlob(blob, 'export.bin');
```

### React Hooks

```tsx
import {
  useResponsive,
  useDebounce,
  useForm,
  useLocalStorage,
  useToggle,
  useObjectUrl,
} from '@forgedevstack/anvil';

function MyComponent({ file }: { file: File | null }) {
  const { isMobile, isDesktop, breakpoint } = useResponsive();
  const objectUrl = useObjectUrl(file); // string | null — revoked on unmount / file change

  const [theme, setTheme] = useLocalStorage('theme', 'dark');

  const [isOpen, toggle] = useToggle(false);

  const { values, setValue, handleSubmit, errors } = useForm({
    email: '',
    password: '',
  });

  const { call: debouncedSearch } = useDebounce(
    (query: string) => fetchResults(query),
    { delay: 300 }
  );

  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Vue Composables

```vue
<script setup lang="ts">
import { useResponsive, useDebounce, useToggle } from '@forgedevstack/anvil/hooks/vue';

const { isMobile, isDesktop } = useResponsive();
const { value: isOpen, toggle } = useToggle(false);

const searchQuery = ref('');
const debouncedQuery = useDebounce(searchQuery, 300);
</script>
```

---

## 🔍 Scope — Enhanced Debugger

Drop-in replacement for `debugger;` with conditional breakpoints, styled logging, performance timers, state watching, and snapshots.

> 📖 See the full [Scope Deep Dive](./docs/scope-debugger.md) article for technical details on how JavaScript debugging works and how Scope enhances it.

### Basic Usage

```typescript
import { scope } from '@forgedevstack/anvil';

// Like debugger; but smarter
scope.pause();                                // pauses execution
scope.pauseIf(count > 100);                  // conditional pause
scope.inspect(user, 'Login payload');         // logs + pauses

// Styled logging with levels
scope.log('Loading...');                      // DEBUG level
scope.info('User logged in', user);           // INFO level
scope.warn('Rate limit approaching');         // WARN level
scope.error('Payment failed', error);         // ERROR level

// Performance timing
scope.time('API call');
await fetchUsers();
scope.timeEnd('API call');                    // ⏱ API call: 142.38ms

// Watch state changes
scope.watch('cart', cartItems);               // logs diff on change
scope.watchBreak('total', cart.total);        // pause on change

// Snapshots
scope.snapshot('before', { user, cart });
await update();
scope.snapshot('after', { user, cart });

// Production
scope.disable();                              // silence all
scope.setLevel('warn');                       // only warn+error
```

### Scoped Instances

```typescript
import { createScope } from '@forgedevstack/anvil';

const authDebug = createScope('Auth', { labelColor: '#34d399' });
const cartDebug = createScope('Cart', { labelColor: '#60a5fa' });

authDebug.log('Login attempt');   // 🔍 [Auth] Login attempt (green)
cartDebug.error('Empty cart');    // 🔍 [Cart] Empty cart    (blue)

authDebug.setLevel('error');      // independent level control
```

### React Hook — `useScope`

```tsx
import { useScope } from '@forgedevstack/anvil';

function CartPage() {
  const debug = useScope('CartPage');
  // Auto-logs: 🔍 [CartPage] Mounted
  // Auto-logs: 🔍 [CartPage] Render #2

  const [items, setItems] = useState([]);

  debug.watch('items', items);
  debug.pauseIf(items.length === 0);

  useEffect(() => {
    debug.time('fetchItems');
    fetchItems().then((data) => {
      debug.timeEnd('fetchItems');
      setItems(data);
    });
  }, []);

  return <div>...</div>;
  // Auto-logs: 🔍 [CartPage] Unmounted (after 5 renders)
}
```

---

## 🎨 Style Forge (cn)

Class name utilities — a zero-dependency alternative to `clsx`, `classnames`, and `tailwind-merge`.

```typescript
import { cn, cnMerge, cnPrefix, cnVariants } from '@forgedevstack/anvil';

// Conditional class names (like clsx)
cn('btn', 'primary');                         // → 'btn primary'
cn('btn', { active: true, disabled: false }); // → 'btn active'
cn('btn', ['rounded', 'shadow']);             // → 'btn rounded shadow'
cn('btn', undefined, null, false, 'visible'); // → 'btn visible'

// Tailwind conflict resolution (like tailwind-merge)
cnMerge('p-4', 'p-2');                       // → 'p-2'
cnMerge('text-red-500', 'text-blue-500');    // → 'text-blue-500'

// BEM-style prefix
const bem = cnPrefix('btn');
bem('primary', 'large');                      // → 'btn btn-primary btn-large'

// Variant support
cnVariants('btn', {
  primary: isPrimary,
  'btn-lg': size === 'large',
  'btn-disabled': disabled,
});
```

---

## 📚 API Reference

### Type Guards

```typescript
isUndefined(value)        isNull(value)
isNullOrUndefined(value)  isDefined(value)
isString(value)           isNumber(value)
isBoolean(value)          isSymbol(value)
isBigInt(value)           isFunction(value)
isAsyncFunction(value)    isArray(value)
isPlainObject(value)      isObject(value)
isDate(value)             isValidDate(value)
isRegExp(value)           isMap(value)
isSet(value)              isWeakMap(value)
isWeakSet(value)          isPromise(value)
isError(value)            isEmpty(value)
isPrimitive(value)        isTruthy(value)
isFalsy(value)            isNaN(value)
isFinite(value)           isInteger(value)
isPositive(value)         isNegative(value)
isZero(value)             isEven(value)
isOdd(value)
```

### Clone Utilities

```typescript
deepClone(value)          shallowClone(value)
deepFreeze(object)        deepSeal(object)
```

### Array Utilities

```typescript
first(arr)           last(arr)            take(arr, n)
drop(arr, n)         takeLast(arr, n)     dropLast(arr, n)
compact(arr)         truthy(arr)          unique(arr, key?)
flatten(arr)         flattenDeep(arr)     chunk(arr, size)
groupBy(arr, key)    find(arr, pred)      findIndex(arr, pred)
findLast(arr, pred)  map(arr, fn)         filter(arr, pred)
sort(arr, config)    reverse(arr)         shuffle(arr)
intersection(a, b)   difference(a, b)     union(a, b)
zip(a, b)            sum(arr)             average(arr)
min(arr)             max(arr)             range(start, end, step?)
includesAll(a, b)    includesAny(a, b)    partition(arr, pred)
countBy(arr, fn)     at(arr, index)       uniqFlat(arr)
isEqual(a, b)        insertAt(arr, i, v)  removeAt(arr, i)
move(arr, from, to)  swap(arr, i, j)      rotate(arr, n)
fill(arr, val)       isSorted(arr)        sample(arr, n?)
frequency(arr)       uniqueOnly(arr)      duplicates(arr)
toArray(val)         clean(arr)           ensureArray(val)
nth(arr, n)          every(arr, pred)     some(arr, pred)
none(arr, pred)
```

### Object Utilities

```typescript
get(obj, path, default?)        set(obj, path, value)
has(obj, path)                  unset(obj, path)
pick(obj, keys)                 omit(obj, keys)
pickBy(obj, pred)               omitBy(obj, pred)
keys(obj)                       values(obj)
entries(obj)                    fromEntries(entries)
merge(...objects)               deepMerge(...objects)
mapValues(obj, fn)              mapKeys(obj, fn)
filterObject(obj, pred)         invert(obj)
flattenObject(obj)              unflattenObject(obj)
isEqual(a, b)                   defaults(obj, ...sources)
defaultsDeep(obj, ...sources)   transform(obj, fn)
size(obj)                       isEmpty(obj)
toMap(obj)                      fromMap(map)
renameKeys(obj, map)            zipObject(keys, values)
findKey(obj, pred)              findKeyBy(obj, pred)
forOwn(obj, fn)                 assignIf(obj, cond, src)
computed(obj)                   compact(obj)
compactDeep(obj)                ensure(obj, key, default)
```

### String Utilities

```typescript
capitalize(str)           uncapitalize(str)
camelCase(str)            pascalCase(str)
snakeCase(str)            kebabCase(str)
constantCase(str)         titleCase(str)
sentenceCase(str)         trim(str)
trimStart(str)            trimEnd(str)
trimChars(str, chars)     padStart(str, len, ch?)
padEnd(str, len, ch?)     pad(str, len, ch?)
truncate(str, len, sfx?)  truncateMiddle(str, len)
repeat(str, n)            reverse(str)
countOccurrences(str, s)  escapeRegExp(str)
escapeHtml(str)           unescapeHtml(str)
slugify(str)              unslugify(str)
startsWith(str, s)        endsWith(str, s)
includes(str, s)          isBlank(str)
isNotBlank(str)           isEmail(str)
isUrl(str)                isUuid(str)
isNumeric(str)            isAlphanumeric(str)
removeWhitespace(str)     collapseWhitespace(str)
splitByMultiple(str, ds)  wordWrap(str, w)
template(str, data)       interpolate(str, data)
mask(str, char?)          maskEmail(str)
randomString(len?)        uuid()
extractNumbers(str)       extractWords(str)
toBoolean(str)            toNumber(str)
pluralize(str, count)     naturalCompare(a, b)
levenshteinDistance(a, b)  similarity(a, b)
commonPrefix(a, b)        commonSuffix(a, b)
```

### Function Utilities

```typescript
debounce(fn, delay, opts?)  throttle(fn, interval, opts?)
memoize(fn, keyResolver?)   once(fn)
delay(ms)                   retry(fn, retries?, delay?)
compose(...fns)             pipe(...fns)
curry(fn)                   partial(fn, ...args)
negate(fn)                  flip(fn)
over(fns, ...args)          allPass(fns)
anyPass(fns)                bind(fn, ctx)
asyncify(fn)                tryCatch(fn, handler)
limit(fn, n)                timed(fn)
logged(fn)                  after(n, fn)
before(n, fn)               wrap(fn, wrapper)
sleep(ms)                   timeout(fn, ms)
withTimeout(fn, ms)         identity(v)
constant(v)                 noop()
stubTrue()                  stubFalse()
stubArray()                 stubObject()
stubString()
```

### Style Forge (cn)

```typescript
cn(...args)                 // Conditional class names
classNames(...args)         // Alias for cn
clsx(...args)               // Alias for cn
cnPrefix(prefix)            // BEM-style prefix
cnUnique(...args)           // Deduplicated class names
cnMerge(...args)            // Tailwind conflict resolution
cnVariants(base, variants)  // Variant support
```

### Scope (Enhanced Debugger)

```typescript
// Global instance
scope.pause(context?)                    // Like debugger; with context
scope.pauseIf(condition, context?)       // Conditional breakpoint
scope.inspect(value, label?)             // Log + pause
scope.log(msg, ...data)                  // DEBUG level
scope.info(msg, ...data)                 // INFO level
scope.warn(msg, ...data)                 // WARN level
scope.error(msg, ...data)               // ERROR level
scope.trace(msg, ...data)               // TRACE level (verbose)
scope.watch(label, value)               // Track changes
scope.watchBreak(label, value)          // Track + pause on change
scope.time(label)                        // Start timer
scope.timeEnd(label)                     // End timer → duration
scope.count(label?)                      // Call counter
scope.snapshot(label, data)              // Capture data snapshot
scope.assert(condition, msg, ...data)    // Assert + pause on fail
scope.group(label)                       // Grouped output
scope.groupEnd()                         // End group
scope.table(data)                        // Table output
scope.enable()                           // Enable all
scope.disable()                          // Disable all (production)
scope.setLevel(level)                    // Filter by level
scope.setHandler(fn)                     // Custom log handler
scope.configure(options)                 // Update config
scope.create(label, config?)             // Create scoped instance
scope.reset()                            // Clear all state

// Factory
createScope(label, config?)              // Create new Scope instance
```

### React Hooks

```typescript
// Debounce & Throttle
useDebounce(callback, options)       useDebounceValue(value, delay)
useThrottle(callback, options)       useThrottleValue(value, interval)

// Responsive
useResponsive(breakpoints?)          useMediaQuery(query)
useBreakpointUp(breakpoint)          useBreakpointDown(breakpoint)
useBreakpointBetween(min, max)       useWindowSize()
useOrientation()

// Forms
useForm(initialValues, rules?)       useField(name, form)
validators                           // Built-in validators

// Storage
useLocalStorage(key, initial)        useSessionStorage(key, initial)

// Toggle & Boolean
useToggle(initial?)                  useBoolean(initial?)
useCycle(values)                     useDisclosure(initial?)

// Previous Values
usePrevious(value)                   usePreviousDistinct(value)
useHistory(value)                    useHasChanged(value)

// Click & Focus
useClickOutside(handler, opts?)      useClickOutsideMultiple(refs, handler)
useHoverOutside(handler)             useEscapeKey(handler)
useFocusTrap(ref)                    useClickPosition()

// Async & Fetch
useAsync(asyncFn, opts?)             useFetch(url, opts?)
useMutation(mutationFn, opts?)       usePolling(fn, interval)
useLazy(asyncFn)

// Timers
useInterval(callback, delay, opts?)  useTimeout(callback, delay)
useCountdown(seconds, onComplete?)   useStopwatch()
useDelay(ms)                         useRaf(callback)

// Lifecycle
useMounted()                         useUpdateEffect(effect, deps)
useMountEffect(effect)               useUnmountEffect(cleanup)
useIsFirstRender()                   useForceUpdate()
useRenderCount()                     useLifecycle(mount, unmount)
useSafeState(initial)                useDelayedRender(delay)

// Network & Connectivity
useOnline(options?)                  useWebSocket(url, options?)

// User Activity
useIdle(options?)                    usePageVisibility(options?)

// Gestures
useLongPress(options?)

// Debugging
useScope(name | options)
```

### Vue Composables

```typescript
useDebounce(value, delay)       useThrottle(value, interval)
useResponsive(breakpoints?)     useMediaQuery(query)
useLocalStorage(key, initial)   useToggle(initial?)
useClickOutside(handler)        useInterval(callback, delay)
useWindowSize()                 usePrevious(value)
useMounted()                    useAsync(asyncFn)
useCountdown(seconds)           useEscapeKey(handler)
```

### Types

```typescript
// Common
Primitive         Nullish           Falsy
AnyFunction       AnyObject         DeepPartial<T>
DeepRequired<T>   DeepReadonly<T>   Mutable<T>
DeepMutable<T>    KeysOfType<T,V>   OptionalKeys<T>
RequiredKeys<T>   PickByType<T,V>   OmitByType<T,V>
UnionToIntersection<U>              Awaited<T>
MaybePromise<T>   MaybeArray<T>     ElementOf<T>
Path<T>           PathValue<T,P>

// Array
ArrayCallback     ArrayPredicate    ArrayMapper
ArrayReducer      Comparator        SortOrder
SortConfig        GroupedResult     ChunkResult
UniqueByKey       FlattenDepth      Flatten
Tuple             Head<T>           Tail<T>
Last<T>           Prepend<T>        Append<T>

// Object
PropertyPath      NestedKeyOf       ObjectEntry
ObjectFromEntries Merge             DeepMerge
Diff              Intersection      RenameKey
ValueOf           Entries           FromEntries
InvertObject      FlattenObject     PickNested

// Function
AsyncFunction     VoidFunction      AsyncVoidFunction
Callback          ErrorCallback     SuccessCallback
FnParameters      FnReturnType      AwaitedFnReturnType
Curry             PartialApplication Debounced
Throttled         Memoized          Pipeline
Compose

// Debug
DebugLevel        DebugLevelValue   ScopeConfig
ScopeConfigOverride WatchEntry      TimerEntry
Snapshot          DebugHandler      UseScopeOptions
UseScopeReturn
```

### Constants

```typescript
// Numbers
NUMBERS  DEBOUNCE_DELAY_MS  THROTTLE_INTERVAL_MS
DEFAULT_TIMEOUT_MS  ANIMATION_DURATION_MS  BREAKPOINTS
MAX_SAFE_INTEGER  MIN_SAFE_INTEGER
KB  MB  GB  TB
SECONDS_IN_MINUTE  MINUTES_IN_HOUR  HOURS_IN_DAY
DAYS_IN_WEEK  MONTHS_IN_YEAR
MS_IN_SECOND  MS_IN_MINUTE  MS_IN_HOUR  MS_IN_DAY  MS_IN_WEEK

// Defaults
DEFAULT_BREAKPOINT_CONFIG  DEFAULT_DEBOUNCE_OPTIONS
DEFAULT_THROTTLE_OPTIONS   DEFAULT_CLONE_OPTIONS
EMPTY_OBJECT  EMPTY_ARRAY  EMPTY_STRING
EMPTY_FUNCTION  IDENTITY_FUNCTION  NOOP
TRUE_FN  FALSE_FN

// Strings
TYPE_NAMES  OBJECT_TAGS  REGEX_PATTERNS  SPECIAL_CHARS

// Debug
DEBUG_LEVELS  DEBUG_LEVEL_STYLES  DEBUG_LEVEL_BADGES
DEFAULT_SCOPE_CONFIG  SCOPE_LOGO
MAX_WATCH_HISTORY  MAX_SNAPSHOTS  MAX_TIMERS
```

## 🗂️ Subpath Imports

```typescript
// Main (tree-shakeable)
import { deepClone, scope, cn } from '@forgedevstack/anvil';

// Utils only
import { deepClone } from '@forgedevstack/anvil/utils';

// React hooks only
import { useForm, useScope } from '@forgedevstack/anvil/hooks/react';

// Vue composables only
import { useToggle } from '@forgedevstack/anvil/hooks/vue';
```

## Documentation portal

The `portal/` directory is a Vite and React documentation site (Bear UI, search, sandbox, changelog viewer). From this package:

```bash
npm run portal:install
npm run portal
npm run portal:build
```

The published package on npm is [\@forgedevstack/anvil](https://www.npmjs.com/package/@forgedevstack/anvil). The site favicon and hero use `icons/logo.svg`.

See `portal/README.md` and `portal/RULES.md` for structure and deployment notes (including Vercel SPA rewrites).

## 🎯 Philosophy

Anvil is designed with the following principles:

1. **Simplicity** — Clear, readable APIs that do one thing well
2. **Type Safety** — Comprehensive TypeScript support throughout
3. **Performance** — Optimized implementations with minimal overhead
4. **Flexibility** — Works with any framework or vanilla JavaScript
5. **Consistency** — Unified API design across utilities and hooks
6. **Developer Experience** — Tools that make debugging and development faster

## 📄 License

MIT © [John Yaghobieh](https://github.com/yaghobieh)

---

<p align="center">
  Part of the <a href="https://forgedevstack.com">ForgeStack</a> ecosystem
</p>
