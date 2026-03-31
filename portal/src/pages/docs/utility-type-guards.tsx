import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { AppShell } from '@/components/AppShell';
import { DocApiReferenceSection } from '@/components/DocApiReferenceSection';
import { DocConceptCards } from '@/components/DocConceptCards';
import { DocPageShell } from '@/components/DocPageShell';
import { TYPE_GUARDS_REFERENCE } from '@/data/reference';
import { TYPE_GUARDS_PAGE_CONCEPTS } from './doc-page-concepts.const';

const PAGE_TITLE = 'Type guards';

const PAGE_DESC =
  'Runtime type checks for primitives, collections, and built-ins—what guards are for, how they relate to TypeScript narrowing, and copyable examples for every export.';

const UtilityTypeGuardsPage: FC = () => (
  <AppShell>
    <DocPageShell title={PAGE_TITLE} description={PAGE_DESC}>
      <DocConceptCards concepts={TYPE_GUARDS_PAGE_CONCEPTS} />
      <Typography variant="body2" color="secondary" className="mb-8">
        Import from <code className="text-sm font-mono">@forgedevstack/anvil</code> or{' '}
        <code className="text-sm font-mono">@forgedevstack/anvil/utils</code>.
      </Typography>
      <DocApiReferenceSection items={TYPE_GUARDS_REFERENCE} />
    </DocPageShell>
  </AppShell>
);

export default UtilityTypeGuardsPage;
