import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { CONTENT_MAX_WIDTH_PX } from '@/constants/numbers.const';
import { DocSidebar } from '@/components/DocSidebar';
import { DOC_ARTICLE_CLASS } from './DocPageShell.const';
import type { DocPageShellProps } from './DocPageShell.types';

export const DocPageShell: FC<DocPageShellProps> = ({ title, description, children }) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-10">
    <aside className="lg:w-56 shrink-0">
      <DocSidebar />
    </aside>
    <article className="flex-1 min-w-0" style={{ maxWidth: CONTENT_MAX_WIDTH_PX }}>
      <Typography variant="h1" className="mb-2 text-3xl font-bold">
        {title}
      </Typography>
      {description ? (
        <Typography variant="body1" color="secondary" className="mb-8">
          {description}
        </Typography>
      ) : (
        <div className="mb-8" />
      )}
      <div className={DOC_ARTICLE_CLASS}>{children}</div>
    </article>
  </div>
);
