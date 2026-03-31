import type { ReactNode } from 'react';

export interface DocPageShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}
