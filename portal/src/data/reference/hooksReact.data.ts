import { imp } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

function h(name: string, description: string, body: string): ReferenceItem {
  return {
    name,
    description,
    example: [imp(name), '', body.trim()].join('\n'),
  };
}

function hm(importNames: string, displayName: string, description: string, body: string): ReferenceItem {
  return {
    name: displayName,
    description,
    example: [imp(importNames), '', body.trim()].join('\n'),
  };
}

export const HOOKS_REACT_REFERENCE: ReferenceItem[] = [
  h('useDebounce', 'Debounced callback with call, cancel, flush.', 'const { call } = useDebounce(fn, { delay: 300 });'),
  h('useDebounceValue', 'Mirror value after delay.', 'const q = useDebounceValue(raw, 400);'),
  h('useThrottle', 'Throttled callback.', 'const { call } = useThrottle(fn, { delay: 100 });'),
  h('useThrottleValue', 'Mirror value on throttle cadence.', 'const v = useThrottleValue(raw, 100);'),
  h('useResponsive', 'Breakpoints, flags, and current breakpoint.', 'const { isMobile, breakpoint } = useResponsive();'),
  h('useMediaQuery', 'Match a CSS media query.', 'const dark = useMediaQuery("(prefers-color-scheme: dark)");'),
  h('useBreakpointUp', 'True at or above breakpoint key.', 'const ok = useBreakpointUp("md");'),
  h('useBreakpointDown', 'True below breakpoint key.', 'const ok = useBreakpointDown("lg");'),
  h('useBreakpointBetween', 'True between two breakpoints.', 'useBreakpointBetween("sm", "lg");'),
  h('useWindowSize', 'Inner width and height.', 'const { width, height } = useWindowSize();'),
  h('useOrientation', 'Portrait / landscape.', 'const { isPortrait } = useOrientation();'),
  h(
    'useForm',
    'Lightweight form state: values, errors, touched, handlers.',
    'const { values, setValue, handleSubmit, errors } = useForm({ email: "" });',
  ),
  h(
    'useField',
    'Bind one field when using useForm-style field config.',
    '// Typically: const field = useField("email"); — see useForm module',
  ),
  hm(
    'validators',
    'validators',
    'Validation helpers for useForm (required, email, minLength, …).',
    'const rule = validators.required("Required");',
  ),
  h('useLocalStorage', 'Persist state in localStorage.', 'const [theme, setTheme] = useLocalStorage("theme", "dark");'),
  h('useSessionStorage', 'Persist state in sessionStorage.', 'const [tab, setTab] = useSessionStorage("tab", "a");'),
  h('useToggle', 'Boolean toggle tuple.', 'const [open, toggle] = useToggle(false);'),
  h('useBoolean', 'Explicit setTrue / setFalse.', 'const { value, setTrue, setFalse } = useBoolean();'),
  h('useCycle', 'Cycle through values.', 'const [mode, next] = useCycle(["a", "b"] as const);'),
  h('useDisclosure', 'Open/close API.', 'const { isOpen, open, close, toggle } = useDisclosure();'),
  h('usePrevious', 'Previous render value.', 'const prev = usePrevious(count);'),
  h('usePreviousDistinct', 'Previous value when it changed.', 'usePreviousDistinct(id);'),
  h('useHistory', 'Push/pop history stack.', 'const { state, push, undo } = useHistory(initial);'),
  h('useHasChanged', 'True when value changed since last render.', 'useHasChanged(value);'),
  h('useClickOutside', 'Callback when click outside ref.', 'useClickOutside(ref, () => close());'),
  h('useClickOutsideMultiple', 'Multiple refs considered inside.', 'useClickOutsideMultiple([a, b], onOutside);'),
  h('useHoverOutside', 'Pointer left all refs.', 'useHoverOutside(ref, onLeave);'),
  h('useEscapeKey', 'Handler on Escape.', 'useEscapeKey(() => close());'),
  h('useFocusTrap', 'Trap focus inside container.', 'useFocusTrap(active, containerRef);'),
  h('useClickPosition', 'Last click coordinates.', 'const pos = useClickPosition();'),
  h('useAsync', 'Async operation state machine.', 'const { execute, status, data, error } = useAsync(load);'),
  h('useFetch', 'HTTP fetch with status.', 'const { data, loading } = useFetch("/api/x");'),
  h('useMutation', 'POST/PUT style mutation helper.', 'const { mutate } = useMutation(postFn);'),
  h('usePolling', 'Interval refetch.', 'usePolling(fetcher, 5000);'),
  h('useLazy', 'Defer execution until triggered.', 'const { run, result } = useLazy(heavy);'),
  h('useInterval', 'Recurring timer.', 'useInterval(() => tick(), 1000);'),
  h('useTimeout', 'One-shot delayed callback.', 'useTimeout(() => done(), 500);'),
  h('useCountdown', 'Countdown timer state.', 'const { seconds, start } = useCountdown(60);'),
  h('useStopwatch', 'Elapsed ms.', 'const { elapsed, start, stop } = useStopwatch();'),
  h('useDelay', 'Boolean flips true after delay.', 'const ready = useDelay(300);'),
  h('useRaf', 'requestAnimationFrame loop.', 'useRaf((t) => draw(t));'),
  h('useMounted', 'True after mount.', 'const mounted = useMounted();'),
  h('useUpdateEffect', 'useEffect that skips the first run.', 'useUpdateEffect(() => {}, [dep]);'),
  h('useMountEffect', 'Run once on mount.', 'useMountEffect(() => {});'),
  h('useUnmountEffect', 'Run on unmount.', 'useUnmountEffect(() => cleanup());'),
  h('useIsFirstRender', 'True only on first render.', 'const first = useIsFirstRender();'),
  h('useForceUpdate', 'Bump state to re-render.', 'const redraw = useForceUpdate();'),
  h('useRenderCount', 'Incrementing render counter.', 'const n = useRenderCount();'),
  h('useLifecycle', 'Mount/update/unmount callbacks.', 'useLifecycle({ onMount: () => {} });'),
  h('useSafeState', 'setState ignored after unmount.', 'const [x, setX] = useSafeState(0);'),
  h('useDelayedRender', 'Delay showing children.', 'useDelayedRender(open, 200);'),
  h('useOnline', 'navigator.onLine + events.', 'const online = useOnline();'),
  h('useWebSocket', 'WebSocket with reconnect.', 'const { send, status } = useWebSocket(url);'),
  h('useIdle', 'User idle detection.', 'const idle = useIdle({ timeout: 60000 });'),
  h('usePageVisibility', 'document.visibilityState.', 'const visible = usePageVisibility();'),
  h('useLongPress', 'Pointer long-press gesture.', 'const bind = useLongPress(onLongPress);'),
  h('useScope', 'Scope debugger tied to component lifecycle.', 'const dbg = useScope("MyCard");'),
  h('useObjectUrl', 'Object URL for Blob/File with revoke.', 'const url = useObjectUrl(file);'),
];
