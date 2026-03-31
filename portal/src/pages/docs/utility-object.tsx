import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { OBJECT_REFERENCE } from '@/data/reference';
import { OBJECT_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Object utilities';

const PAGE_DESC =
  'Paths, merge, pick, equality, and transforms—how this module thinks about objects, plus copyable examples for every export (including re-export aliases).';

const UtilityObjectPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={OBJECT_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={OBJECT_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityObjectPage;
