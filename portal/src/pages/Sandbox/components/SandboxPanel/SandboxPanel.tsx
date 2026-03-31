import type { FC } from 'react';
import { Card, CardBody, Typography } from '@forgedevstack/bear';
import type { SandboxPanelProps } from './SandboxPanel.types';

export const SandboxPanel: FC<SandboxPanelProps> = ({ title, children }) => (
  <Card variant="elevated">
    <CardBody>
      <Typography variant="h3" className="text-lg font-semibold mb-4">
        {title}
      </Typography>
      {children}
    </CardBody>
  </Card>
);
