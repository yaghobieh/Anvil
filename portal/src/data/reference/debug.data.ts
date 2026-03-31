import { r, rScope } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

export const DEBUG_REFERENCE: ReferenceItem[] = [
  r(
    'scope',
    'The default Scope singleton (label "App"). Same methods as any other Scope: logs, timers, watches, conditional breakpoints. Call scope.disable() in production builds for zero console noise; scope.enable() turns tooling back on.',
    "scope.log('ready');\nscope.disable();",
  ),
  r(
    'createScope',
    'Factory that returns a new Scope with a custom label and optional config (log level, timestamps, etc.). Prefer named scopes so logs are grouped by feature or route.',
    "const dbg = createScope('Checkout', { level: 'warn' });\ndbg.log('start');",
  ),
  r(
    'Scope',
    'The class behind all scopes. Instantiate with new Scope("Label") when you need full control; most apps use scope or createScope.',
    "const s = new Scope('Worker');\ns.info('tick');",
  ),
  rScope(
    'scope.create',
    'Creates a "child" scope from the singleton—hierarchical labels for nested components or steps. Child inherits configuration patterns from the parent implementation.',
    "scope.create('Page');",
  ),
  rScope(
    'scope.enable',
    'Turns Scope "on": logs, timers, watches, and breakpoints are active. Pair with `disable()` for environment-based toggling.',
    'scope.enable();',
  ),
  rScope(
    'scope.disable',
    'Silences Scope: most methods become no-ops so you pay negligible cost and no console spam—useful for production or CI.',
    'scope.disable();',
  ),
  rScope(
    'scope.isEnabled',
    'Returns whether Scope is currently "enabled"—branch UI or tests without duplicating env checks.',
    'scope.isEnabled();',
  ),
  rScope(
    'scope.setLevel',
    'Sets the minimum "log level" (e.g. trace, log, warn). Messages below the level are filtered out.',
    "scope.setLevel('warn');",
  ),
  rScope(
    'scope.configure',
    '"Merges" config into the current Scope (timestamps, badges, colors, etc.) without replacing the whole object.',
    'scope.configure({ showTimestamp: false });',
  ),
  rScope(
    'scope.setHandler',
    'Replaces the default "console sink" with your own function—send logs to a remote service, format JSON, or tee to multiple targets.',
    'scope.setHandler((level, msg, data) => {});',
  ),
  rScope(
    'scope.trace',
    '"Trace"-level log—finest granularity; often filtered out unless level is set to trace.',
    "scope.trace('detail', { id: 1 });",
  ),
  rScope(
    'scope.log',
    'Standard "debug" log with optional structured data payload.',
    "scope.log('message', payload);",
  ),
  rScope(
    'scope.info',
    '"Info"-level message—user-relevant milestones.',
    "scope.info('started');",
  ),
  rScope(
    'scope.warn',
    '"Warning"—recoverable oddities, deprecations, performance hints.',
    "scope.warn('slow');",
  ),
  rScope(
    'scope.error',
    '"Error"—failures; pass `Error` instances or context objects as the second argument when useful.',
    "scope.error('failed', err);",
  ),
  rScope(
    'scope.pause',
    'Acts like "`debugger`" but Scope-aware: optionally logs context, then pauses execution in devtools when enabled.',
    'scope.pause({ step: 1 });',
  ),
  rScope(
    'scope.pauseIf',
    '"Conditional pause": only invokes the pause path when the boolean is true—hunt rare bugs without stopping every iteration.',
    'scope.pauseIf(count > 100, { count });',
  ),
  rScope(
    'scope.inspect',
    'Logs a "labelled value" then pauses—quick “what is this variable right now?” without scattering `console.log` + `debugger`.',
    'scope.inspect(user, "payload");',
  ),
  rScope(
    'scope.watch',
    'Registers a "named watch": on each call, if the serialized value changed since last time, Scope logs the diff. Great for reactive state.',
    "scope.watch('total', total);",
  ),
  rScope(
    'scope.watchBreak',
    'Like "watch" but "breaks" (pauses) when the value changes—stronger than log-only watches.',
    "scope.watchBreak('token', token);",
  ),
  rScope(
    'scope.unwatch',
    'Removes a single watch by "name".',
    "scope.unwatch('total');",
  ),
  rScope(
    'scope.unwatchAll',
    'Clears "all" watches—reset when leaving a route or finishing a debug session.',
    'scope.unwatchAll();',
  ),
  rScope(
    'scope.time',
    'Starts a "named timer" (paired with `timeEnd`). Multiple concurrent timers use distinct labels.',
    "scope.time('fetch');",
  ),
  rScope(
    'scope.timeEnd',
    'Ends the named timer and typically "logs duration" in ms. Mismatched labels are ignored or warned per implementation.',
    "scope.timeEnd('fetch');",
  ),
  rScope(
    'scope.count',
    'Increments a "labelled counter" and logs the count—useful for render loops, event bursts, or branch hit counts.',
    'scope.count("hits");',
  ),
  rScope(
    'scope.countReset',
    'Resets a "counter" label to zero.',
    'scope.countReset("hits");',
  ),
  rScope(
    'scope.group',
    'Opens a "console group" so nested logs collapse together.',
    "scope.group('Batch');",
  ),
  rScope(
    'scope.groupEnd',
    'Closes the "innermost" open group.',
    'scope.groupEnd();',
  ),
  rScope(
    'scope.table',
    'Pretty-prints "tabular" data via `console.table` when available.',
    'scope.table(rows);',
  ),
  rScope(
    'scope.assert',
    'If the condition is "false", logs and "pauses" with a message—like `console.assert` with Scope ergonomics.',
    "scope.assert(x > 0, 'x must be positive', x);",
  ),
  rScope(
    'scope.clear',
    'Clears internal "watch/timer/snapshot" state without tearing down the whole Scope.',
    'scope.clear();',
  ),
  rScope(
    'scope.snapshot',
    'Stores a "named snapshot" of data for later comparison or export—debugging state transitions.',
    "scope.snapshot('state', { a: 1 });",
  ),
  rScope(
    'scope.clearSnapshots',
    'Removes stored "snapshots".',
    'scope.clearSnapshots();',
  ),
  rScope(
    'scope.reset',
    '"Full reset": watches, timers, snapshots, counters—back to a clean slate while keeping config.',
    'scope.reset();',
  ),
];
