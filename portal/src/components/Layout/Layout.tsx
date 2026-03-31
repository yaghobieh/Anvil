import type { FC } from 'react';
import { LAYOUT_MAIN_CLASS } from './Layout.const';
import type { LayoutProps } from './Layout.types';

export const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={LAYOUT_MAIN_CLASS}>{children}</div>
);
