import type { FC } from 'react';
import { CodeBlock, Typography } from '@forgedevstack/bear';
import { REF_SECTION_ANCHOR_PREFIX } from './ReferenceListing.const';
import type { ReferenceListingProps } from './ReferenceListing.types';

export const ReferenceListing: FC<ReferenceListingProps> = ({
  items,
  language = 'typescript',
}) => (
  <div className="space-y-10">
    {items.map((item) => {
      const anchor = `${REF_SECTION_ANCHOR_PREFIX}${item.name.replace(/[^a-zA-Z0-9]/g, '-')}`;
      return (
        <section key={item.name} id={anchor} className="scroll-mt-24">
          <Typography variant="h4" className="font-mono text-base sm:text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {item.name}
          </Typography>
          <Typography variant="body2" color="secondary" className="mb-3 leading-relaxed">
            {item.description}
          </Typography>
          <CodeBlock
            code={item.example}
            language={language}
            copyable
            title={item.name}
            maxHeight={480}
          />
        </section>
      );
    })}
  </div>
);
