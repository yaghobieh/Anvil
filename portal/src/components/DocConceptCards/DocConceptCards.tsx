import type { FC } from 'react';
import { Card, CardBody, Typography } from '@forgedevstack/bear';
import type { DocConceptBlock } from '@/types/docConcept.types';

export interface DocConceptCardsProps {
  concepts: readonly DocConceptBlock[];
}

export const DocConceptCards: FC<DocConceptCardsProps> = ({ concepts }) => (
  <div className="space-y-6 mb-12">
    {concepts.map((block) => (
      <Card key={block.title} variant="elevated">
        <CardBody>
          <Typography variant="h4" className="text-base font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {block.title}
          </Typography>
          <Typography variant="body2" color="secondary" className="leading-relaxed">
            {block.body}
          </Typography>
        </CardBody>
      </Card>
    ))}
  </div>
);
