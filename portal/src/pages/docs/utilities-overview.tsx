import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { AppShell } from '@/components/AppShell';
import { DocPageShell } from '@/components/DocPageShell';
import {
  ROUTE_DOCS_ARRAY,
  ROUTE_DOCS_CLONE,
  ROUTE_DOCS_CN,
  ROUTE_DOCS_CONSTANTS,
  ROUTE_DOCS_DEBUG,
  ROUTE_DOCS_FILE,
  ROUTE_DOCS_FUNCTION,
  ROUTE_DOCS_OBJECT,
  ROUTE_DOCS_STRING,
  ROUTE_DOCS_TYPE_GUARDS,
} from '@/constants/strings.const';

const LINK_CLASS = 'text-anvil-600 dark:text-anvil-400 font-medium underline';

export const UtilitiesOverviewPage: FC = () => (
  <AppShell>
    <DocPageShell
      title="Utilities overview"
      description="Anvil groups helpers by domain. Each doc page lists every export with a short description and a copyable code example."
    >
      <Typography variant="body2" color="secondary">
        Start with the area that matches your task. Use the search bar (⌘K) to jump to a module.
      </Typography>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_TYPE_GUARDS}>
            Type guards
          </Link>
          {' — '}runtime checks for values and built-ins.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_CLONE}>
            Clone
          </Link>
          {' — '}shallow/deep clone, freeze, seal.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_CONSTANTS}>
            Constants
          </Link>
          {' — '}shared numbers, defaults, regex maps, and scope-related constants.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_ARRAY}>
            Array
          </Link>
          {' — '}ordering, grouping, uniqueness, functional transforms.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_OBJECT}>
            Object
          </Link>
          {' — '}paths, merge, pick and omit, key remapping.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_STRING}>
            String
          </Link>
          {' — '}case conversion, trimming, slugify, simple validation helpers.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_FUNCTION}>
            Function
          </Link>
          {' — '}debounce, throttle, memoize, composition, async helpers.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_FILE}>
            File and mime
          </Link>
          {' — '}extensions, MIME hints, downloads, data URLs, accept strings.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_CN}>
            cn (class names)
          </Link>
          {' — '}Tailwind-friendly class merging.
        </li>
        <li>
          <Link className={LINK_CLASS} to={ROUTE_DOCS_DEBUG}>
            Scope debugger
          </Link>
          {' — '}structured logging and breakpoints for development workflows.
        </li>
      </ul>
    </DocPageShell>
  </AppShell>
);

export default UtilitiesOverviewPage;
