import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { DATE_REFERENCE } from '@/data/reference';
import { DATE_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Date Master';

const PAGE_DESC =
  'Moment-like date utilities — parse, format, manipulate, compare, and display relative time. Zero dependencies, tree-shakeable, immutable.';

const UtilityDatePage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={DATE_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={DATE_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityDatePage;
