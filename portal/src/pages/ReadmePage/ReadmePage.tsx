import type { FC } from 'react';
import readmeRaw from '../../../../README.md?raw';
import { AppShell } from '@/components/AppShell';
import { MarkdownPlain } from '@/components/MarkdownPlain';
import { CONTENT_MAX_WIDTH_PX } from '@/constants/numbers.const';
import { README_PAGE_TITLE } from './ReadmePage.const';

export const ReadmePage: FC = () => (
  <AppShell>
    <div className="max-w-6xl mx-auto px-4 py-10" style={{ maxWidth: CONTENT_MAX_WIDTH_PX }}>
      <MarkdownPlain text={readmeRaw} title={README_PAGE_TITLE} />
    </div>
  </AppShell>
);

export default ReadmePage;
