import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { CONSTANTS_REFERENCE } from '@/data/reference';
import { CONSTANTS_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Constants';

const PAGE_DESC =
  'Shared numbers, time units, defaults, empty sentinels, regex maps, and Scope-related constants—why they exist, tree-shaking, and copyable examples for each export.';

const UtilityConstantsPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={CONSTANTS_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={CONSTANTS_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityConstantsPage;
