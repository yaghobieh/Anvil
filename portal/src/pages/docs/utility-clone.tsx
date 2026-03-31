import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { CLONE_REFERENCE } from '@/data/reference';
import { CLONE_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Clone and immutability';

const PAGE_DESC =
  'Shallow and deep copies, recursive freeze and seal—what each word means, how big the module is, and copyable examples for every export.';

const UtilityClonePage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={CLONE_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={CLONE_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityClonePage;
