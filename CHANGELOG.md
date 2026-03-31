# Changelog

All notable changes to this project will be documented in this file.

## [1.0.6] - 2026-03-12

### Added

#### File & document helpers (`src/utils/file.ts`)

- **`getFileExtension(pathOrName)`** — Last segment extension, lowercased, without the dot.
- **`formatFileSize(bytes, options?)`** — Human-readable size (decimal 1000 or binary 1024 via `binary`).
- **`EXTENSION_TO_MIME`** — Common extension → MIME map (PDF, Markdown/MDX, Office, text, JSON, HTML, etc.).
- **`getMimeTypeFromExtension(ext)`** — Lookup MIME from extension.
- **`isPdfFile(pathOrName)`** — `.pdf`.
- **`isMarkdownFile(pathOrName)`** — `.md`, `.markdown`, `.mdown`, `.mkd`, `.mdx`.
- **`isOfficeDocumentFile(pathOrName)`** — Word, spreadsheet, presentation extensions (doc/docx, xls/xlsx, ppt/pptx, odt/ods/odp, rtf, csv).
- **`isWordDocumentFile`**, **`isSpreadsheetFile`**, **`isPresentationFile`** — Finer office buckets.
- **`isPlainTextFile(pathOrName)`** — `.txt`, `.log`, `.ini`, `.cfg`, `.env`.
- **`getDocumentKind(pathOrName)`** — `'pdf' | 'markdown' | 'office' | 'text' | 'unknown'`.
- **`getOfficeDocumentFamily(pathOrName)`** — `'word' | 'spreadsheet' | 'presentation' | 'other'`.
- **`sanitizeFilename(name, maxLength?)`** — Strip path unsafe characters for safe display/download names.
- **`readFileAsText(file)`** — Browser `FileReader` → UTF-8 `Promise<string>`.
- **`readFileAsArrayBuffer(file)`** — `FileReader` → `Promise<ArrayBuffer>`.
- **`readFileAsDataURL(file)`** — `FileReader.readAsDataURL` → `Promise<string>`.
- **`downloadBlob(blob, filename)`** — Trigger download via temporary object URL (no-op without `document`).
- **`downloadText(text, filename, mimeType?)`** — UTF-8 text download (default `text/plain;charset=utf-8`).
- **`getAcceptString(options?)`** — Build HTML `accept` from `pdf` / `markdown` / `office` / `text` flags and optional `extra` MIME or `.ext` entries.
- **`parseDataUrl(dataUrl)`** — Parse `data:` URLs into `{ mime, isBase64, data }` or `null`.

#### React

- **`useObjectUrl(blob)`** — `URL.createObjectURL` with revoke on change/unmount; returns `string | null`.

#### Types

- **`DocumentKind`**, **`OfficeDocFamily`** — Exported from `src/types/file.types.ts`.
- **`ParsedDataUrl`**, **`GetAcceptStringOptions`**
- **`UseObjectUrlReturn`** (hook)

#### Documentation portal (`portal/`)

- Vite and React documentation site using Bear for layout, theming, and components.
- Global search (Command K or Control K), responsive navigation, and a version page tied to `package.json`.
- Topic pages for utilities (array, object, string, function, file, cn, Scope debugger) and React/Vue hooks.
- Interactive sandbox that runs real imports from `@forgedevstack/anvil`.
- Changelog and package README rendered from the repository root for accuracy.

## [1.0.5] - 2026-02-15

### Added

#### Scope — Enhanced Debugger
- **`scope`** global singleton — drop-in replacement for `debugger;` with superpowers
- **`createScope(label, config?)`** — create scoped instances with custom labels and colors
- **`scope.pause(context?)`** — like `debugger;` but logs context before pausing
- **`scope.pauseIf(condition, context?)`** — conditional breakpoint, only pauses when condition is true
- **`scope.inspect(value, label?)`** — logs a value richly then pauses execution
- **`scope.watch(label, value)`** — track a value across calls, logs diffs when it changes
- **`scope.watchBreak(label, value)`** — watch + pause when value changes
- **`scope.time(label)` / `scope.timeEnd(label)`** — high-resolution performance timers with colored output
- **`scope.count(label?)`** — count how many times a code path is hit
- **`scope.snapshot(label, data)`** — capture data snapshots for time-travel debugging
- **`scope.assert(condition, message)`** — assertion that logs + pauses on failure
- **`scope.group(label)` / `scope.groupEnd()`** — grouped console output
- **`scope.table(data)`** — formatted table output
- **Styled console output** — colored labels, timestamps, level badges (TRACE/DEBUG/INFO/WARN/ERROR)
- **Log levels** — `scope.setLevel('warn')` to filter output
- **Enable/Disable** — `scope.enable()` / `scope.disable()` for production
- **Custom handler** — `scope.setHandler(fn)` to replace console with custom logging

#### useScope React Hook
- **`useScope(name)`** — scoped debugger tied to React component lifecycle
- Automatic **render count** tracking
- Automatic **mount/unmount** lifecycle logging
- All Scope methods available as stable callbacks
- Configurable via options: `trackRenders`, `trackLifecycle`, `config`

#### Types
- `DebugLevel`, `DebugLevelValue`, `ScopeConfig`, `ScopeConfigOverride`
- `WatchEntry`, `TimerEntry`, `Snapshot`, `DebugHandler`
- `UseScopeOptions`, `UseScopeReturn`

#### Constants
- `DEBUG_LEVELS`, `DEBUG_LEVEL_STYLES`, `DEBUG_LEVEL_BADGES`
- `DEFAULT_SCOPE_CONFIG`, `SCOPE_LOGO`
- `MAX_WATCH_HISTORY`, `MAX_SNAPSHOTS`, `MAX_TIMERS`

## [1.0.4] - 2026-02-09

### Added

#### New React Hooks
- **Network & Connectivity**:
  - `useOnline` - Detect online/offline network status with callbacks
  - `useWebSocket` - WebSocket connection management with auto-reconnect
- **User Activity**:
  - `useIdle` - Detect user inactivity with configurable timeout
  - `usePageVisibility` - Detect when page/tab is visible or hidden
- **Gestures**:
  - `useLongPress` - Detect long press gestures on elements

## [1.0.0] - 2026-01-19

### Added

#### Utility Functions
- **Type Guards**: `isUndefined`, `isNull`, `isNullOrUndefined`, `isDefined`, `isString`, `isNumber`, `isBoolean`, `isSymbol`, `isBigInt`, `isFunction`, `isAsyncFunction`, `isArray`, `isPlainObject`, `isObject`, `isDate`, `isValidDate`, `isRegExp`, `isMap`, `isSet`, `isWeakMap`, `isWeakSet`, `isPromise`, `isError`, `isEmpty`, `isPrimitive`, `isTruthy`, `isFalsy`, `isNaN`, `isFinite`, `isInteger`, `isPositive`, `isNegative`, `isZero`, `isEven`, `isOdd`
- **Clone Utilities**: `shallowClone`, `deepClone`, `deepFreeze`, `deepSeal`
- **Array Utilities**: `first`, `last`, `take`, `drop`, `takeLast`, `dropLast`, `compact`, `truthy`, `unique`, `flatten`, `flattenDeep`, `chunk`, `groupBy`, `find`, `findIndex`, `findLast`, `map`, `filter`, `sort`, `reverse`, `shuffle`, `intersection`, `difference`, `union`, `zip`, `sum`, `average`, `min`, `max`, `range`, `includesAll`, `includesAny`, `partition`, `countBy`, `at`, `uniqFlat`, `isEqual`, `insertAt`, `removeAt`, `move`, `swap`, `rotate`, `fill`, `isSorted`, `sample`, `frequency`, `uniqueOnly`, `duplicates`, `toArray`, `clean`, `ensureArray`, `nth`, `every`, `some`, `none`
- **Object Utilities**: `get`, `set`, `has`, `unset`, `pick`, `omit`, `pickBy`, `omitBy`, `keys`, `values`, `entries`, `fromEntries`, `merge`, `deepMerge`, `mapValues`, `mapKeys`, `filterObject`, `invert`, `flattenObject`, `unflattenObject`, `isEqual`, `defaults`, `defaultsDeep`, `transform`, `size`, `isEmpty`, `toMap`, `fromMap`, `renameKeys`, `zipObject`, `findKey`, `findKeyBy`, `forOwn`, `assignIf`, `computed`, `compact`, `compactDeep`, `ensure`
- **String Utilities**: `capitalize`, `uncapitalize`, `camelCase`, `pascalCase`, `snakeCase`, `kebabCase`, `constantCase`, `titleCase`, `sentenceCase`, `trim`, `trimStart`, `trimEnd`, `trimChars`, `padStart`, `padEnd`, `pad`, `truncate`, `truncateMiddle`, `repeat`, `reverse`, `countOccurrences`, `escapeRegExp`, `escapeHtml`, `unescapeHtml`, `slugify`, `unslugify`, `startsWith`, `endsWith`, `includes`, `isBlank`, `isNotBlank`, `isEmail`, `isUrl`, `isUuid`, `isNumeric`, `isAlphanumeric`, `removeWhitespace`, `collapseWhitespace`, `splitByMultiple`, `wordWrap`, `template`, `interpolate`, `mask`, `maskEmail`, `randomString`, `uuid`, `extractNumbers`, `extractWords`, `toBoolean`, `toNumber`, `pluralize`, `naturalCompare`, `levenshteinDistance`, `similarity`, `commonPrefix`, `commonSuffix`
- **Function Utilities**: `debounce`, `throttle`, `memoize`, `once`, `delay`, `retry`, `compose`, `pipe`, `curry`, `partial`, `negate`, `flip`, `over`, `allPass`, `anyPass`, `bind`, `asyncify`, `tryCatch`, `limit`, `timed`, `logged`, `after`, `before`, `wrap`, `sleep`, `timeout`, `withTimeout`, `identity`, `constant`, `noop`, `stubTrue`, `stubFalse`, `stubArray`, `stubObject`, `stubString`

#### React Hooks
- **Debounce & Throttle**: `useDebounce`, `useDebounceValue`, `useThrottle`, `useThrottleValue`
- **Responsive**: `useResponsive`, `useMediaQuery`, `useBreakpointUp`, `useBreakpointDown`, `useBreakpointBetween`, `useWindowSize`, `useOrientation`
- **Forms**: `useForm`, `useField`, `validators`
- **Storage**: `useLocalStorage`, `useSessionStorage`
- **Toggle**: `useToggle`, `useBoolean`, `useCycle`, `useDisclosure`
- **Previous Values**: `usePrevious`, `usePreviousDistinct`, `useHistory`, `useHasChanged`
- **Click Outside**: `useClickOutside`, `useClickOutsideMultiple`, `useHoverOutside`, `useEscapeKey`, `useFocusTrap`, `useClickPosition`
- **Async**: `useAsync`, `useFetch`, `useMutation`, `usePolling`, `useLazy`
- **Timers**: `useInterval`, `useTimeout`, `useCountdown`, `useStopwatch`, `useDelay`, `useRaf`
- **Lifecycle**: `useMounted`, `useUpdateEffect`, `useMountEffect`, `useUnmountEffect`, `useIsFirstRender`, `useForceUpdate`, `useRenderCount`, `useLifecycle`, `useSafeState`, `useDelayedRender`

#### Vue Composables
- `useDebounce`, `useThrottle`, `useResponsive`, `useMediaQuery`, `useLocalStorage`, `useToggle`, `useClickOutside`, `useInterval`, `useWindowSize`, `usePrevious`, `useMounted`, `useAsync`, `useCountdown`, `useEscapeKey`

#### Types
- Common types: `Primitive`, `Nullish`, `Falsy`, `AnyFunction`, `AnyObject`, `DeepPartial`, `DeepRequired`, `DeepReadonly`, `Mutable`, `DeepMutable`, `KeysOfType`, `OptionalKeys`, `RequiredKeys`, `PickByType`, `OmitByType`, `UnionToIntersection`, `Awaited`, `MaybePromise`, `MaybeArray`, `ElementOf`, `Path`, `PathValue`
- Array types: `ArrayCallback`, `ArrayPredicate`, `ArrayMapper`, `ArrayReducer`, `Comparator`, `SortOrder`, `SortConfig`, `GroupedResult`, `ChunkResult`, `UniqueByKey`, `FlattenDepth`, `Flatten`, `Tuple`, `Head`, `Tail`, `Last`, `Prepend`, `Append`
- Object types: `PropertyPath`, `NestedKeyOf`, `ObjectEntry`, `ObjectFromEntries`, `Merge`, `DeepMerge`, `Diff`, `Intersection`, `RenameKey`, `ValueOf`, `Entries`, `FromEntries`, `InvertObject`, `FlattenObject`, `PickNested`
- Function types: `AsyncFunction`, `VoidFunction`, `AsyncVoidFunction`, `Callback`, `ErrorCallback`, `SuccessCallback`, `Parameters`, `ReturnType`, `AwaitedReturnType`, `Curry`, `Partial`, `Debounced`, `Throttled`, `Memoized`, `Pipeline`, `Compose`
- Hook types: `Breakpoint`, `BreakpointConfig`, `ResponsiveState`, `FormFieldValue`, `FormValues`, `FormErrors`, `FormTouched`, `ValidationRule`, `ValidationRules`, `FormState`, `FormActions`, `UseFormReturn`, `UseDebounceOptions`, `UseThrottleOptions`, `UseLocalStorageOptions`, `UseToggleReturn`, `UseClickOutsideOptions`, `UseIntervalOptions`, `UseFetchState`, `UseFetchOptions`, `UseMediaQueryReturn`

#### Constants
- Numbers: `NUMBERS`, `DEBOUNCE_DELAY_MS`, `THROTTLE_INTERVAL_MS`, `DEFAULT_TIMEOUT_MS`, `ANIMATION_DURATION_MS`, `BREAKPOINTS`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`, file sizes (`KB`, `MB`, `GB`, `TB`), time constants (`MS_IN_SECOND`, etc.)
- Defaults: `DEFAULT_BREAKPOINT_CONFIG`, `DEFAULT_DEBOUNCE_OPTIONS`, `DEFAULT_THROTTLE_OPTIONS`, `DEFAULT_CLONE_OPTIONS`, `EMPTY_OBJECT`, `EMPTY_ARRAY`, `EMPTY_STRING`, `EMPTY_FUNCTION`, `IDENTITY_FUNCTION`, `NOOP`, `TRUE_FN`, `FALSE_FN`
- Strings: `TYPE_NAMES`, `OBJECT_TAGS`, `REGEX_PATTERNS`, `SPECIAL_CHARS`

