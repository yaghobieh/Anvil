import type { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, useBear } from '@forgedevstack/bear';
import { BearIcons } from '@forgedevstack/bear';
import {
  NPM_PACKAGE_URL,
  ROUTE_CHANGELOG,
  ROUTE_DOCS_GETTING_STARTED,
  ROUTE_DOCS_UTILITIES,
  ROUTE_HOME,
  ROUTE_SANDBOX,
  ROUTE_VERSION,
} from '@/constants/strings.const';
import { PACKAGE_VERSION } from '@/constants/version.const';
import { useI18n } from '@/i18n';
import { NAV_LINK_CLASS } from './PortalNavbar.const';
import type { PortalNavbarProps } from './PortalNavbar.types';

export const PortalNavbar: FC<PortalNavbarProps> = ({ onOpenSearch }) => {
  const { toggleMode, mode } = useBear();
  const { t, messages } = useI18n();
  const n = messages.nav;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to={ROUTE_HOME} className="flex flex-col items-start gap-0.5 min-w-0 shrink-0">
          <span className="text-[10px] font-mono font-medium text-anvil-600 dark:text-anvil-400 leading-none tabular-nums">
            v{PACKAGE_VERSION}
          </span>
          <span className="flex items-center gap-2">
            <img src="/anvil-logo.svg" alt={n.logoAlt} className="h-9 w-9 shrink-0" />
            <span className="font-semibold text-lg text-gray-900 dark:text-white truncate">{n.brand}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink
            to={ROUTE_DOCS_GETTING_STARTED}
            className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? 'text-anvil-600 dark:text-anvil-400' : ''}`}
          >
            {n.docs}
          </NavLink>
          <NavLink
            to={ROUTE_DOCS_UTILITIES}
            className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? 'text-anvil-600 dark:text-anvil-400' : ''}`}
          >
            {n.utilities}
          </NavLink>
          <NavLink
            to={ROUTE_SANDBOX}
            className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? 'text-anvil-600 dark:text-anvil-400' : ''}`}
          >
            {n.sandbox}
          </NavLink>
          <NavLink
            to={ROUTE_CHANGELOG}
            className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? 'text-anvil-600 dark:text-anvil-400' : ''}`}
          >
            {n.changelog}
          </NavLink>
          <NavLink
            to={ROUTE_VERSION}
            className={({ isActive }) => `${NAV_LINK_CLASS} ${isActive ? 'text-anvil-600 dark:text-anvil-400' : ''}`}
          >
            {n.version}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onOpenSearch}
            leftIcon={<BearIcons.SearchIcon size="sm" />}
            aria-label={t('common.openSearch')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleMode()}
            aria-label={mode === 'dark' ? t('common.lightMode') : t('common.darkMode')}
          >
            {mode === 'dark' ? <BearIcons.SunIcon size="sm" /> : <BearIcons.MoonIcon size="sm" />}
          </Button>
          <a href={NPM_PACKAGE_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" leftIcon={<BearIcons.PackageIcon size="xs" />} className="!border-anvil-400 dark:!border-anvil-600">
              {n.npm}
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
};
