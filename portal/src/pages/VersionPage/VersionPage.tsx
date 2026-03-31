import type { FC } from 'react';
import { Card, CardBody, Typography } from '@forgedevstack/bear';
import { AppShell } from '@/components/AppShell';
import { NPM_PACKAGE_URL } from '@/constants/strings.const';
import { PACKAGE_NAME, PACKAGE_VERSION } from '@/constants/version.const';
import {
  VERSION_BODY,
  VERSION_LABEL_NAME,
  VERSION_LABEL_VERSION,
  VERSION_SECTION_PACKAGE,
  VERSION_SECTION_REGISTRY,
} from './VersionPage.const';

export const VersionPage: FC = () => (
  <AppShell>
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Typography variant="h1" className="text-3xl font-bold mb-6">
        Version
      </Typography>
      <Typography variant="body2" color="secondary" className="mb-8">
        {VERSION_BODY}
      </Typography>
      <Card variant="elevated" className="mb-6">
        <CardBody>
          <Typography variant="caption" color="muted" className="uppercase tracking-wide mb-2">
            {VERSION_SECTION_PACKAGE}
          </Typography>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-gray-500">{VERSION_LABEL_NAME}: </span>
              {PACKAGE_NAME}
            </div>
            <div>
              <span className="text-gray-500">{VERSION_LABEL_VERSION}: </span>
              {PACKAGE_VERSION}
            </div>
          </div>
        </CardBody>
      </Card>
      <Card variant="outlined">
        <CardBody>
          <Typography variant="caption" color="muted" className="uppercase tracking-wide mb-2">
            {VERSION_SECTION_REGISTRY}
          </Typography>
          <a
            href={NPM_PACKAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-anvil-600 dark:text-anvil-400 underline text-sm font-medium"
          >
            {NPM_PACKAGE_URL}
          </a>
        </CardBody>
      </Card>
    </div>
  </AppShell>
);

export default VersionPage;
