import type { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  Input,
  Typography,
} from '@forgedevstack/bear';
import {
  camelCase,
  formatFileSize,
  groupBy,
  scope,
  unique,
  useDebounceValue,
} from '@forgedevstack/anvil';
import { AppShell } from '@/components/AppShell';
import { SANDBOX_DEBOUNCE_MS_DEFAULT } from '@/constants/numbers.const';
import { STACKBLITZ_VITE_REACT_TS } from '@/constants/strings.const';
import { useI18n } from '@/i18n';
import type { SandboxTabId } from './Sandbox.types';
import { SandboxPanel } from './components/SandboxPanel';

const SAMPLE_ROWS = [
  { id: '1', dept: 'sales', name: 'Ada' },
  { id: '2', dept: 'eng', name: 'Bob' },
  { id: '3', dept: 'sales', name: 'Cid' },
];

const TAB_ARRAY: SandboxTabId = 'array';
const TAB_STRING: SandboxTabId = 'string';
const TAB_FILE: SandboxTabId = 'file';
const TAB_DEBOUNCE: SandboxTabId = 'debounce';
const TAB_SCOPE: SandboxTabId = 'scope';
const TAB_EXTERNAL: SandboxTabId = 'external';

export const Sandbox: FC = () => {
  const { t, messages } = useI18n();
  const s = messages.sandbox;

  const [tab, setTab] = useState<SandboxTabId>(TAB_ARRAY);
  const [arrayInput, setArrayInput] = useState('1, 2, 2, 3');
  const [stringInput, setStringInput] = useState('hello world');
  const [bytes, setBytes] = useState(String(1536000));
  const [debounceSource, setDebounceSource] = useState('');

  useEffect(() => {
    if (tab === TAB_SCOPE) {
      scope.enable();
      return () => {
        scope.disable();
      };
    }
    scope.disable();
    return undefined;
  }, [tab]);

  const parsedNumbers = useMemo(() => {
    return arrayInput
      .split(/[,\s]+/)
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => Number(x))
      .filter((n) => !Number.isNaN(n));
  }, [arrayInput]);

  const uniqueResult = useMemo(() => unique(parsedNumbers), [parsedNumbers]);
  const groupResult = useMemo(() => groupBy(SAMPLE_ROWS, 'dept'), []);

  const camelResult = useMemo(() => camelCase(stringInput), [stringInput]);

  const bytesNum = Number(bytes);
  const sizeLabel = useMemo(() => {
    if (!Number.isFinite(bytesNum) || bytesNum < 0) return t('sandbox.invalidSize');
    return formatFileSize(bytesNum);
  }, [bytesNum, t]);

  const debouncedEcho = useDebounceValue(debounceSource, SANDBOX_DEBOUNCE_MS_DEFAULT);

  const tabBtn = (id: SandboxTabId, label: string) => (
    <Button
      variant={tab === id ? 'anvil' : 'outline'}
      size="sm"
      onClick={() => setTab(id)}
      className={tab === id ? '' : '!border-anvil-300 dark:!border-anvil-700'}
    >
      {label}
    </Button>
  );

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Typography variant="h1" className="text-3xl font-bold mb-2">
          {s.title}
        </Typography>
        <Typography variant="body2" color="secondary" className="mb-8">
          {s.description}
        </Typography>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabBtn(TAB_ARRAY, s.tabArray)}
          {tabBtn(TAB_STRING, s.tabString)}
          {tabBtn(TAB_FILE, s.tabFile)}
          {tabBtn(TAB_DEBOUNCE, s.tabDebounce)}
          {tabBtn(TAB_SCOPE, s.tabScope)}
          {tabBtn(TAB_EXTERNAL, s.tabExternal)}
        </div>

        {tab === TAB_ARRAY && (
          <SandboxPanel title={s.arrayPanelTitle}>
            <Typography variant="body2" color="secondary" className="mb-4">
              {s.arrayPanelHelp}
            </Typography>
            <Input label={s.arrayLabel} value={arrayInput} onChange={(e) => setArrayInput(e.target.value)} className="mb-4" />
            <Typography variant="body2" className="font-mono text-sm mb-2">
              unique([...]) = {JSON.stringify(uniqueResult)}
            </Typography>
            <Typography variant="body2" className="font-mono text-sm whitespace-pre-wrap">
              groupBy(sample, dept) = {JSON.stringify(groupResult, null, 2)}
            </Typography>
          </SandboxPanel>
        )}

        {tab === TAB_STRING && (
          <SandboxPanel title={s.stringPanelTitle}>
            <Input label={s.stringLabel} value={stringInput} onChange={(e) => setStringInput(e.target.value)} className="mb-4" />
            <Typography variant="body2" className="font-mono text-sm">
              camelCase(input) = {camelResult}
            </Typography>
          </SandboxPanel>
        )}

        {tab === TAB_FILE && (
          <SandboxPanel title={s.filePanelTitle}>
            <Input
              label={s.fileLabel}
              type="number"
              min={0}
              value={bytes}
              onChange={(e) => setBytes(e.target.value)}
              className="mb-4"
            />
            <Typography variant="body2" className="font-mono text-sm">
              formatFileSize(bytes) = {sizeLabel}
            </Typography>
          </SandboxPanel>
        )}

        {tab === TAB_DEBOUNCE && (
          <SandboxPanel title={s.debouncePanelTitle}>
            <Typography variant="body2" color="secondary" className="mb-4">
              {t('sandbox.debounceHelp', { ms: SANDBOX_DEBOUNCE_MS_DEFAULT })}
            </Typography>
            <Input
              label={s.debounceLabel}
              value={debounceSource}
              onChange={(e) => setDebounceSource(e.target.value)}
              className="mb-4"
            />
            <Typography variant="body2" className="font-mono text-sm">
              debounced = {debouncedEcho || '(empty)'}
            </Typography>
          </SandboxPanel>
        )}

        {tab === TAB_SCOPE && (
          <SandboxPanel title={s.scopePanelTitle}>
            <Typography variant="body2" color="secondary" className="mb-4">
              {s.scopeHelp}
            </Typography>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="anvil" size="sm" onClick={() => scope.enable()}>
                {s.scopeEnable}
              </Button>
              <Button variant="outline" size="sm" onClick={() => scope.disable()}>
                {s.scopeDisable}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scope.log('sandbox', { at: new Date().toISOString() })}
              >
                {s.scopeLog}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  scope.time('demo');
                  setTimeout(() => scope.timeEnd('demo'), 80);
                }}
              >
                {s.scopeTime}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  scope.group('Anvil sandbox');
                  scope.log('inside group');
                  scope.groupEnd();
                }}
              >
                {s.scopeGroup}
              </Button>
              <Button variant="outline" size="sm" onClick={() => scope.pauseIf(false, { note: 'no pause' })}>
                {s.scopePauseIf}
              </Button>
            </div>
          </SandboxPanel>
        )}

        {tab === TAB_EXTERNAL && (
          <Card variant="elevated">
            <CardBody>
              <Typography variant="h4" className="mb-2 font-semibold">
                {s.externalTitle}
              </Typography>
              <Typography variant="body2" color="secondary" className="mb-4 leading-relaxed">
                {s.externalBody}
              </Typography>
              <a href={STACKBLITZ_VITE_REACT_TS} target="_blank" rel="noopener noreferrer">
                <Button variant="anvil" size="md">
                  {s.stackblitzViteReact}
                </Button>
              </a>
            </CardBody>
          </Card>
        )}
      </div>
    </AppShell>
  );
};

export default Sandbox;
