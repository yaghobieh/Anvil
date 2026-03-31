import type { FC } from 'react';
import { Typography, CodeBlock } from '@forgedevstack/bear';
import { AppShell } from '@/components/AppShell';
import { DocPageShell } from '@/components/DocPageShell';
import { NPM_PACKAGE_URL } from '@/constants/strings.const';

const INSTALL_SNIPPET = `npm install @forgedevstack/anvil`;

const IMPORT_SNIPPET = `import { deepClone, debounce, unique } from '@forgedevstack/anvil';
import { useDebounce } from '@forgedevstack/anvil'; // React hooks re-exported from main entry`;

const PATH_SNIPPET = `import { groupBy } from '@forgedevstack/anvil/utils';
import { useForm } from '@forgedevstack/anvil/hooks/react';`;

export const GettingStartedPage: FC = () => (
  <AppShell>
    <DocPageShell
      title="Getting started"
      description="Install Anvil, choose an entry point, and import only what you need. The package is tree-shakeable and ships TypeScript declarations."
    >
      <Typography variant="h3" className="text-xl font-semibold mt-2">
        Requirements
      </Typography>
      <Typography variant="body2" color="secondary">
        Modern bundlers (Vite, Webpack, esbuild, Rollup) and Node 18+ for tooling. React hooks require React 16.8 or newer. Vue composables target Vue 3.
      </Typography>
      <Typography variant="h3" className="text-xl font-semibold">
        Install
      </Typography>
      <CodeBlock code={INSTALL_SNIPPET} language="bash" copyable title="npm" />
      <Typography variant="body2" color="secondary">
        Package on npm:{' '}
        <a href={NPM_PACKAGE_URL} className="text-anvil-600 dark:text-anvil-400 underline" target="_blank" rel="noreferrer">
          @forgedevstack/anvil
        </a>
        .
      </Typography>
      <Typography variant="h3" className="text-xl font-semibold">
        Default import path
      </Typography>
      <CodeBlock code={IMPORT_SNIPPET} language="typescript" copyable />
      <Typography variant="h3" className="text-xl font-semibold">
        Subpath imports
      </Typography>
      <Typography variant="body2" color="secondary">
        For explicit splits, use the published subpath exports to document intent and help bundlers.
      </Typography>
      <CodeBlock code={PATH_SNIPPET} language="typescript" copyable />
      <Typography variant="h3" className="text-xl font-semibold">
        TypeScript
      </Typography>
      <Typography variant="body2" color="secondary">
        Types ship with the package. Enable strict mode in your app for the best inference on generics such as object paths and form state.
      </Typography>
    </DocPageShell>
  </AppShell>
);

export default GettingStartedPage;
