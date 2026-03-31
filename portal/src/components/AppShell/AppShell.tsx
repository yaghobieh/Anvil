import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { PortalNavbar } from '@/components/PortalNavbar';
import { PortalSearch } from '@/components/PortalSearch';
import { KEYBOARD_SHORTCUT_SEARCH } from '@/constants/strings.const';
import type { AppShellProps } from './AppShell.types';

export const AppShell: FC<AppShellProps> = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === KEYBOARD_SHORTCUT_SEARCH) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Layout>
      <PortalNavbar onOpenSearch={openSearch} />
      <PortalSearch open={searchOpen} onClose={closeSearch} />
      {children}
    </Layout>
  );
};
