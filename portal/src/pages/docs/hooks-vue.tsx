import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { HOOKS_VUE_REFERENCE } from '@/data/reference';
import { HOOKS_VUE_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Vue composables';

const PAGE_DESC =
  'Vue 3 composables aligned with Anvil patterns—setup usage, import path, and copyable examples for each export.';

const HooksVuePage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={HOOKS_VUE_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={HOOKS_VUE_REFERENCE} language="typescript" />
    </DocPageShell>
  </AppShell>
);

export default HooksVuePage;
