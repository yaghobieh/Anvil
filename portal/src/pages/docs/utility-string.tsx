import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { STRING_REFERENCE } from '@/data/reference';
import { STRING_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'String utilities';

const PAGE_DESC =
  'Case, validation, slugify, templates, and more—immutability, locales, and copyable examples for every export.';

const UtilityStringPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={STRING_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={STRING_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityStringPage;
