import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import {
  ROUTE_CHANGELOG,
  ROUTE_DOCS_ARRAY,
  ROUTE_DOCS_CLONE,
  ROUTE_DOCS_CN,
  ROUTE_DOCS_CONSTANTS,
  ROUTE_DOCS_DATE,
  ROUTE_DOCS_DEBUG,
  ROUTE_DOCS_FILE,
  ROUTE_DOCS_FUNCTION,
  ROUTE_DOCS_GETTING_STARTED,
  ROUTE_DOCS_HOOKS_REACT,
  ROUTE_DOCS_HOOKS_VUE,
  ROUTE_DOCS_OBJECT,
  ROUTE_DOCS_STRING,
  ROUTE_DOCS_TYPE_GUARDS,
  ROUTE_DOCS_UTILITIES,
  ROUTE_PACKAGE_README,
  ROUTE_VERSION,
} from '@/constants/strings.const';
import { SIDEBAR_LINK_ACTIVE_CLASS, SIDEBAR_LINK_CLASS, SIDEBAR_NAV_CLASS } from './DocSidebar.const';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `${SIDEBAR_LINK_CLASS} ${isActive ? SIDEBAR_LINK_ACTIVE_CLASS : ''}`;

export const DocSidebar: FC = () => (
  <nav className={SIDEBAR_NAV_CLASS} aria-label="Documentation sections">
    <Typography variant="caption" color="muted" className="px-2 mb-2 uppercase tracking-wide">
      Guide
    </Typography>
    <NavLink to={ROUTE_DOCS_GETTING_STARTED} className={navClass}>
      Getting started
    </NavLink>
    <NavLink to={ROUTE_DOCS_UTILITIES} className={navClass}>
      Utilities overview
    </NavLink>
    <Typography variant="caption" color="muted" className="px-2 mt-4 mb-2 uppercase tracking-wide">
      Modules
    </Typography>
    <NavLink to={ROUTE_DOCS_TYPE_GUARDS} className={navClass}>
      Type guards
    </NavLink>
    <NavLink to={ROUTE_DOCS_CLONE} className={navClass}>
      Clone
    </NavLink>
    <NavLink to={ROUTE_DOCS_CONSTANTS} className={navClass}>
      Constants
    </NavLink>
    <NavLink to={ROUTE_DOCS_ARRAY} className={navClass}>
      Array
    </NavLink>
    <NavLink to={ROUTE_DOCS_OBJECT} className={navClass}>
      Object
    </NavLink>
    <NavLink to={ROUTE_DOCS_STRING} className={navClass}>
      String
    </NavLink>
    <NavLink to={ROUTE_DOCS_FUNCTION} className={navClass}>
      Function
    </NavLink>
    <NavLink to={ROUTE_DOCS_FILE} className={navClass}>
      File and mime
    </NavLink>
    <NavLink to={ROUTE_DOCS_CN} className={navClass}>
      cn (classes)
    </NavLink>
    <NavLink to={ROUTE_DOCS_DATE} className={navClass}>
      Date Master
    </NavLink>
    <NavLink to={ROUTE_DOCS_DEBUG} className={navClass}>
      Scope debugger
    </NavLink>
    <Typography variant="caption" color="muted" className="px-2 mt-4 mb-2 uppercase tracking-wide">
      Frameworks
    </Typography>
    <NavLink to={ROUTE_DOCS_HOOKS_REACT} className={navClass}>
      React hooks
    </NavLink>
    <NavLink to={ROUTE_DOCS_HOOKS_VUE} className={navClass}>
      Vue composables
    </NavLink>
    <Typography variant="caption" color="muted" className="px-2 mt-4 mb-2 uppercase tracking-wide">
      Package
    </Typography>
    <NavLink to={ROUTE_CHANGELOG} className={navClass}>
      Changelog
    </NavLink>
    <NavLink to={ROUTE_PACKAGE_README} className={navClass}>
      README
    </NavLink>
    <NavLink to={ROUTE_VERSION} className={navClass}>
      Version
    </NavLink>
  </nav>
);
