import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { ReferenceListing } from '@/components/ReferenceListing';
import type { ReferenceItem } from '@/data/reference';

export interface DocApiReferenceSectionProps {
  items: ReferenceItem[];
  language?: string;
}

export const DOC_API_REFERENCE_INTRO =
  'Each entry explains the API in plain language, then shows a copyable import and sample. Adjust types and options to match your app.';

export const DocApiReferenceSection: FC<DocApiReferenceSectionProps> = ({ items, language }) => (
  <>
    <Typography variant="h3" className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
      API reference
    </Typography>
    <Typography variant="body2" color="secondary" className="mb-6 leading-relaxed">
      {DOC_API_REFERENCE_INTRO}
    </Typography>
    <ReferenceListing items={items} language={language} />
  </>
);
