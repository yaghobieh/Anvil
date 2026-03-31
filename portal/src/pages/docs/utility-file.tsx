import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { FILE_REFERENCE } from '@/data/reference';
import { FILE_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'File and MIME helpers';

const PAGE_DESC =
  'Extensions, MIME map, downloads, and FileReader helpers—browser vs Node, safety, and copyable examples for every export.';

const UtilityFilePage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={FILE_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={FILE_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityFilePage;
