import type { FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CodeBlock,
  Container,
  Flex,
  Typography,
} from '@forgedevstack/bear';
import { BearIcons } from '@forgedevstack/bear';
import { AppShell } from '@/components/AppShell';
import { HERO_MIN_HEIGHT_VH } from '@/constants/numbers.const';
import {
  BEAR_NPM_URL,
  NPM_PACKAGE_URL,
  ROUTE_DOCS_GETTING_STARTED,
  ROUTE_SANDBOX,
} from '@/constants/strings.const';
import { PACKAGE_VERSION } from '@/constants/version.const';
import { useI18n } from '@/i18n';

const Home: FC = () => {
  const { messages, t } = useI18n();
  const h = messages.home;

  return (
    <AppShell>
      <section
        className="relative flex flex-col items-center justify-center px-4 text-center"
        style={{ minHeight: `${HERO_MIN_HEIGHT_VH}vh` }}
      >
        <div
          className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(99,102,241,0.25), transparent)',
          }}
        />
        <Container className="py-16 max-w-4xl">
          <Flex justify="center" className="mb-6">
            <img src="/anvil-logo.svg" alt="" className="h-24 w-24 sm:h-28 sm:w-28" width={112} height={112} />
          </Flex>
          <Flex justify="center" gap={2} wrap="wrap" className="mb-4">
            <Badge className="!bg-anvil-600 !text-white border-0">v{PACKAGE_VERSION}</Badge>
            <Badge variant="outline" className="!border-anvil-400 dark:!border-anvil-600">
              {h.forgeStackBadge}
            </Badge>
          </Flex>
          <Typography variant="h1" className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            {h.heroHeadline}
          </Typography>
          <Typography variant="body1" color="secondary" className="mb-8 max-w-2xl mx-auto text-lg">
            {h.heroSubhead}
          </Typography>
          <Flex justify="center" gap={3} wrap="wrap" className="mb-10">
            <Link to={ROUTE_DOCS_GETTING_STARTED}>
              <Button variant="anvil" size="lg" leftIcon={<BearIcons.BookOpenIcon size="xs" />}>
                {h.ctaDocs}
              </Button>
            </Link>
            <Link to={ROUTE_SANDBOX}>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<BearIcons.TerminalIcon size="xs" />}
                className="!border-anvil-500 !text-anvil-700 hover:!bg-anvil-50 dark:!text-anvil-300 dark:hover:!bg-anvil-950/50"
              >
                {h.ctaSandbox}
              </Button>
            </Link>
            <a href={NPM_PACKAGE_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg" leftIcon={<BearIcons.PackageIcon size="xs" />}>
                {h.ctaNpm}
              </Button>
            </a>
          </Flex>
          <div className="text-left max-w-2xl mx-auto mb-4">
            <Typography variant="caption" color="muted" className="mb-2">
              {t('common.install')}
            </Typography>
            <CodeBlock code={h.installCmd} language="bash" copyable title="shell" />
          </div>
          <div className="text-left max-w-2xl mx-auto">
            <Typography variant="caption" color="muted" className="mb-2">
              {t('common.example')}
            </Typography>
            <CodeBlock code={h.codeSample} language="typescript" copyable maxHeight={320} />
          </div>
        </Container>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="forge-ecosystem-section px-4 py-10 sm:px-8 sm:py-12 mb-10">
          <div className="forge-ecosystem-inner">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <Typography variant="h2" className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                {h.forgeSectionTitle}
              </Typography>
              <Typography variant="body1" color="secondary" className="leading-relaxed">
                {h.forgeSectionIntro}
              </Typography>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {h.ecosystemCards.map((part) => (
                <Card key={part.id} variant="elevated" className="bg-white/80 dark:bg-gray-950/60 backdrop-blur-sm">
                  <CardBody>
                    <Typography variant="h4" className="mb-2 font-semibold">
                      {part.title}
                    </Typography>
                    <Typography variant="body2" color="secondary" className="leading-relaxed">
                      {part.body}
                    </Typography>
                  </CardBody>
                </Card>
              ))}
            </div>
            <div className="max-w-3xl mx-auto mb-10 text-center">
              <Typography variant="h3" className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {h.forgeEaseTitle}
              </Typography>
              <Typography variant="body2" color="secondary" className="leading-relaxed">
                {h.forgeEaseBody}
              </Typography>
            </div>
            <Card variant="elevated" className="mb-10 bg-white/85 dark:bg-gray-950/65 backdrop-blur-sm">
              <CardBody>
                <Typography variant="h3" className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {h.bearDeepTitle}
                </Typography>
                <Typography variant="body2" color="secondary" className="leading-relaxed mb-4">
                  {h.bearDeepBody}
                </Typography>
                <a href={BEAR_NPM_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="anvil" size="sm" leftIcon={<BearIcons.PackageIcon size="xs" />}>
                    {h.builtWithBearCta}
                  </Button>
                </a>
              </CardBody>
            </Card>
            <div className="overflow-x-auto rounded-xl border border-anvil-200/80 dark:border-anvil-800 bg-white/90 dark:bg-gray-950/70 backdrop-blur-sm">
              <table className="w-full text-left text-sm border-collapse">
                <caption className="sr-only">{h.comparisonTitle}</caption>
                <thead>
                  <tr className="border-b border-anvil-200 dark:border-anvil-800 bg-anvil-50/90 dark:bg-anvil-950/50">
                    <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {h.comparisonColTopic}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {h.comparisonColAnvil}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {h.comparisonRows.map((row) => (
                    <tr
                      key={row.topic}
                      className="border-b border-gray-200/80 dark:border-gray-800 last:border-0"
                    >
                      <th scope="row" className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 align-top">
                        {row.topic}
                      </th>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 align-top">{row.anvil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Card
          variant="elevated"
          className="border border-anvil-200 dark:border-anvil-800 bg-anvil-50/80 dark:bg-anvil-950/40 mb-12"
        >
          <CardBody>
            <Typography variant="h3" className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {h.builtWithBearHeadline}
            </Typography>
            <Typography variant="body2" color="secondary" className="mb-4 leading-relaxed">
              {h.builtWithBearBody}
            </Typography>
            <a href={BEAR_NPM_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" leftIcon={<BearIcons.PackageIcon size="xs" />}>
                {h.builtWithBearCta}
              </Button>
            </a>
          </CardBody>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 gap-6">
          {h.features.map((f) => (
            <Card key={f.id} variant="elevated">
              <CardBody>
                <Typography variant="h4" className="mb-2 font-semibold">
                  {f.title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {f.body}
                </Typography>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
};

export default Home;
