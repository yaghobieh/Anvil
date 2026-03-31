import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

export const FUNCTION_REFERENCE: ReferenceItem[] = [
  r(
    'debounce',
    '"Debounce" delays execution until the function stops being called for `delay` ms. Use for search-as-you-type, window resize, or any burst of events where you only want the "last" call to win. Returns `call` (invoke debounced fn), `cancel` (drop pending), and `flush` (run immediately).',
    'const { call } = debounce((q: string) => search(q), { delay: 300 });',
  ),
  r(
    'throttle',
    '"Throttle" enforces a minimum time between invocations: at most once per wait ms even if you call faster. Unlike debounce, work can run during activity (e.g. scroll, drag). Good when you need steady sampling, not only after idle.',
    'const { call } = throttle(() => onScroll(), { delay: 100 });',
  ),
  r(
    'memoize',
    '"Memoize" caches the return value keyed by arguments (default: first arg; optional hash function for complex keys). Pure functions with expensive work benefit; avoid if results depend on mutable external state.',
    'const fib = memoize((n: number) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));',
  ),
  r(
    'once',
    '"Once" wraps a function so the inner logic runs a single time; later calls return the first result. Use for idempotent initialization or lazy singleton setup.',
    'const init = once(() => setup());',
  ),
  r(
    'delay',
    '"Delay" schedules a synchronous callback after `ms` (typically `setTimeout`). Not a Promise—pair with `sleep` if you need async/await.',
    'delay(() => tick(), 500);',
  ),
  r(
    'retry',
    '"Retry" re-runs an async function that may fail, with configurable retries and backoff. Use for flaky network calls when you want bounded retries instead of manual loops.',
    'await retry(() => fetch("/api"), { retries: 3 });',
  ),
  r(
    'compose',
    '"Compose" builds `f∘g∘h…`: the "rightmost" function runs first, each result feeds the next. Familiar from functional libraries; order matters.',
    'const f = compose((x: number) => x + 1, (x: number) => x * 2); f(3);',
  ),
  r(
    'pipe',
    '"Pipe" is compose left-to-right: first function runs first, then the next. Matches reading order for data transformations.',
    'const f = pipe((x: number) => x * 2, (x: number) => x + 1); f(3); // 7',
  ),
  r(
    'curry',
    '"Curry" turns a multi-argument function into a sequence of unary calls. Useful for partial configuration and point-free style.',
    'const add3 = curry((a: number, b: number, c: number) => a + b + c)(1)(2);',
  ),
  r(
    'partial',
    '"Partial" fixes the first arguments of a function, returning a smaller-arity function. Like `bind` without a `this` context.',
    'const add5 = partial((a: number, b: number) => a + b, 5);',
  ),
  r(
    'negate',
    '"Negate" flips a predicate: `negate(pred)(x)` is `!pred(x)`. Handy for `filter`/`find` when you only have a positive check.',
    'const notEmpty = negate((s: string) => s.length === 0);',
  ),
  r(
    'flip',
    '"Flip" swaps the first two arguments of a binary function. Useful when an API’s argument order does not match `map`/`reduce`.',
    'const div = (a: number, b: number) => a / b;\nconst divFlipped = flip(div);',
  ),
  r(
    'over',
    '"Over" (juxtaposition): given several functions, returns one function that runs them all on the "same" arguments and collects results (e.g. as an array).',
    'const both = over((n: number) => n * 2, (n: number) => n + 1);\nboth(3); // [6, 4]',
  ),
  r(
    'allPass',
    '"allPass" returns a predicate true only when "every" inner predicate passes. Logical AND over functions.',
    'const ok = allPass([(n: number) => n > 0, (n: number) => n < 10]);',
  ),
  r(
    'anyPass',
    '"anyPass" returns a predicate true when "at least one" inner predicate passes. Logical OR over functions.',
    'const hit = anyPass([(s: string) => s.startsWith("a")]);',
  ),
  r(
    'bind',
    '"bind" is `Function.prototype.bind`: fixes `this` and optional leading arguments. Use when passing object methods as callbacks.',
    'bind(obj.method, obj);',
  ),
  r(
    'asyncify',
    '"asyncify" wraps a synchronous function so it returns a Promise (microtask/async style). Helps uniform `await` chains.',
    'await asyncify((x: number) => x * 2)(4);',
  ),
  r(
    'tryCatch',
    '"tryCatch" runs a function and returns a "fallback" if it throws—avoids try/catch at every call site for parse-like operations.',
    'tryCatch(() => JSON.parse("x"), null);',
  ),
  r(
    'limit',
    '"limit" (concurrency limiter) caps how many async calls run at once; extra calls queue. Protects APIs from stampeding when mapping over many items.',
    'const limited = limit(fetchMany, 2);',
  ),
  r(
    'timed',
    '"timed" wraps a function to measure how long it runs (e.g. `performance.now`) and optionally log with a label—lightweight profiling.',
    'timed(() => heavy(), "label");',
  ),
  r(
    'logged',
    '"logged" wraps a function to log arguments and return value—debugging wrapper without editing the inner implementation.',
    'logged((x: number) => x * 2);',
  ),
  r(
    'after',
    '"after" returns a function that ignores the first n-1 calls and runs the original on the nth call. Useful for on-third-click style patterns.',
    'const done = after(3, () => finish());',
  ),
  r(
    'before',
    '"before" runs the original only for the first `n-1` invocations; after that returns the "last" computed result without re-invoking.',
    'const save = before(2, persist);',
  ),
  r(
    'wrap',
    '"wrap" adapts a function to return its result as a "single-element tuple"—sometimes needed for generic utilities or tuple typing.',
    'const w = wrap((x: number) => x * 2);\nw(3); // [6]',
  ),
  r(
    'sleep',
    '"sleep" returns a Promise that resolves after `ms`. Use in async flows for deliberate pacing or tests.',
    'await sleep(100);',
  ),
  r(
    'timeout',
    '"timeout" returns a Promise that "rejects" after `ms`—often `Promise.race`d against real work to implement deadlines.',
    'await Promise.race([work, timeout(5000)]);',
  ),
  r(
    'withTimeout',
    '"withTimeout" races a Promise against a timeout: resolves with the Promise’s value or rejects if time runs out—cleaner than manual `race` for one-off calls.',
    'await withTimeout(fetch("/"), 3000);',
  ),
  r(
    'identity',
    '"identity" returns the canonical identity function (or a typed variant): `x => x`. Useful as default transform in generics.',
    'const id = identity<number>();\nid(5); // 5',
  ),
  r(
    'constant',
    '"constant" builds a nullary function that always returns the same value—good for stubs and table-driven tests.',
    'const always1 = constant(1);\nalways1();',
  ),
  r(
    'noop',
    '"noop" is a function that does nothing. Default callback when optional handlers are omitted.',
    'noop();',
  ),
  r(
    'stubTrue',
    '"stubTrue" always returns `true`—predicate or flag stub.',
    'stubTrue();',
  ),
  r(
    'stubFalse',
    '"stubFalse" always returns `false`.',
    'stubFalse();',
  ),
  r(
    'stubArray',
    '"stubArray" returns a new empty array (typed).',
    'stubArray<number>();',
  ),
  r(
    'stubObject',
    '"stubObject" returns a new empty object (typed).',
    'stubObject<{ a: number }>();',
  ),
  r(
    'stubString',
    '"stubString" always returns `""`.',
    'stubString();',
  ),
];
