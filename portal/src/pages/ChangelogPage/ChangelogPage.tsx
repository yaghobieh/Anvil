import type { FC } from 'react';
import changelogRaw from '../../../../CHANGELOG.md?raw';
import { AppShell } from '@/components/AppShell';
import { MarkdownPlain } from '@/components/MarkdownPlain';
import { CONTENT_MAX_WIDTH_PX } from '@/constants/numbers.const';
import { CHANGELOG_PAGE_TITLE } from './ChangelogPage.const';

export const ChangelogPage: FC = () => (
  <AppShell>
    <div className="max-w-6xl mx-auto px-4 py-10" style={{ maxWidth: CONTENT_MAX_WIDTH_PX }}>
      <MarkdownPlain text={changelogRaw} title={CHANGELOG_PAGE_TITLE} />
    </div>
  </AppShell>
);

export default ChangelogPage;
