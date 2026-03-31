import { imp } from './reference.helpers';
import { HOOKS_VUE_IMPORT_SOURCE } from './reference.const';
import type { ReferenceItem } from './reference.types';

function hv(name: string, description: string, body: string): ReferenceItem {
  return {
    name,
    description,
    example: [imp(name, HOOKS_VUE_IMPORT_SOURCE), '', body.trim()].join('\n'),
  };
}

export const HOOKS_VUE_REFERENCE: ReferenceItem[] = [
  hv('useDebounce', 'Vue debounce composable.', '// const debounced = useDebounce(source, 300)'),
  hv('useThrottle', 'Vue throttle composable.', '// useThrottle(fn, options)'),
  hv('useResponsive', 'Breakpoint-aware layout.', '// const { isMobile } = useResponsive()'),
  hv('useMediaQuery', 'Match media query string.', '// useMediaQuery("(min-width: 768px)")'),
  hv('useLocalStorage', 'Persist in localStorage.', '// useLocalStorage(key, defaultValue)'),
  hv('useToggle', 'Boolean ref + toggle.', '// const { value, toggle } = useToggle(false)'),
  hv('useClickOutside', 'Click outside element ref.', '// useClickOutside(targetRef, handler)'),
  hv('useInterval', 'Interval timer.', '// useInterval(callback, delay)'),
  hv('useWindowSize', 'Window dimensions.', '// const { width, height } = useWindowSize()'),
  hv('usePrevious', 'Previous ref value.', '// usePrevious(x)'),
  hv('useMounted', 'Mounted flag.', '// useMounted()'),
  hv('useAsync', 'Async state composable.', '// useAsync(asyncFn)'),
  hv('useCountdown', 'Countdown timer.', '// useCountdown(seconds)'),
  hv('useEscapeKey', 'Escape key handler.', '// useEscapeKey(handler)'),
];
