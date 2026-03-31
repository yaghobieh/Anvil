import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { DEBUG_REFERENCE } from '@/data/reference';
import { DEBUG_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Scope debugger';

const PAGE_DESC =
  'Structured logging, timers, watches, and breakpoints—how Scope compares to raw console, singleton vs named scopes, and copyable examples for every method.';

const UtilityDebugPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={DEBUG_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={DEBUG_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityDebugPage;
