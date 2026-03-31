import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { HOOKS_REACT_REFERENCE } from '@/data/reference';
import { HOOKS_REACT_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'React hooks';

const PAGE_DESC =
  'Hooks from Anvil for forms, async, browser state, and more—rules of hooks, import paths, and copyable examples for each export.';

const HooksReactPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={HOOKS_REACT_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={HOOKS_REACT_REFERENCE} language="tsx" />
    </DocPageShell>
  </AppShell>
);

export default HooksReactPage;
