import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { ARRAY_REFERENCE } from '@/data/reference';
import { ARRAY_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Array utilities';

const PAGE_DESC =
  'Immutable-style array helpers: concepts, where the code lives, and copyable examples for every export.';

const UtilityArrayPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={ARRAY_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={ARRAY_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityArrayPage;
