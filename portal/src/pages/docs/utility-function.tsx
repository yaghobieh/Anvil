import type { FC } from 'react';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { FUNCTION_REFERENCE } from '@/data/reference';
import { FUNCTION_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Function utilities';

const PAGE_DESC =
  'Debounce, throttle, composition, async control flow, and stubs—what each pattern is for, where the code lives, and copyable examples for every export.';

const UtilityFunctionPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={FUNCTION_PAGE_CONCEPTS} />
      <DocApiReferenceSection items={FUNCTION_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityFunctionPage;
