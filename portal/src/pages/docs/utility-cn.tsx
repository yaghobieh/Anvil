import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { CN_REFERENCE } from '@/data/reference';
import { CN_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Class names (cn)';

const PAGE_DESC =
  'Tailwind-friendly class merging and the ClassValue type—why `cn` exists, how variants work, and copyable examples for every export.';

const UtilityCnPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={CN_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={CN_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityCnPage;
