import type { FC } from 'react';
import { Typography } from '@forgedevstack/bear';
import { MARKDOWN_PRE_CLASS } from './MarkdownPlain.const';
import type { MarkdownPlainProps } from './MarkdownPlain.types';

export const MarkdownPlain: FC<MarkdownPlainProps> = ({ text, title }) => (
  <div>
    <Typography variant="h1" className="text-3xl font-bold mb-6">
      {title}
    </Typography>
    <pre className={MARKDOWN_PRE_CLASS} role="article">
      {text}
    </pre>
  </div>
);
