import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Typography } from '@forgedevstack/bear';
import { DefaultSeo } from '@/components/Seo';
import { useI18n } from '@/i18n';
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
  ROUTE_HOME,
  ROUTE_PACKAGE_README,
  ROUTE_SANDBOX,
  ROUTE_VERSION,
} from '@/constants/strings.const';

const Home = lazy(() => import('@/pages/Home'));
const GettingStartedPage = lazy(() => import('@/pages/docs/getting-started'));
const UtilitiesOverviewPage = lazy(() => import('@/pages/docs/utilities-overview'));
const UtilityTypeGuardsPage = lazy(() => import('@/pages/docs/utility-type-guards'));
const UtilityClonePage = lazy(() => import('@/pages/docs/utility-clone'));
const UtilityConstantsPage = lazy(() => import('@/pages/docs/utility-constants'));
const UtilityArrayPage = lazy(() => import('@/pages/docs/utility-array'));
const UtilityObjectPage = lazy(() => import('@/pages/docs/utility-object'));
const UtilityStringPage = lazy(() => import('@/pages/docs/utility-string'));
const UtilityFunctionPage = lazy(() => import('@/pages/docs/utility-function'));
const UtilityFilePage = lazy(() => import('@/pages/docs/utility-file'));
const UtilityCnPage = lazy(() => import('@/pages/docs/utility-cn'));
const UtilityDatePage = lazy(() => import('@/pages/docs/utility-date'));
const UtilityDebugPage = lazy(() => import('@/pages/docs/utility-debug'));
const HooksReactPage = lazy(() => import('@/pages/docs/hooks-react'));
const HooksVuePage = lazy(() => import('@/pages/docs/hooks-vue'));
const Sandbox = lazy(() => import('@/pages/Sandbox'));
const ChangelogPage = lazy(() => import('@/pages/ChangelogPage'));
const ReadmePage = lazy(() => import('@/pages/ReadmePage'));
const VersionPage = lazy(() => import('@/pages/VersionPage'));

const PageFallback = () => {
  const { t } = useI18n();
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <Typography variant="body2" color="secondary">
        {t('common.loading')}
      </Typography>
    </div>
  );
};

function App() {
  return (
    <>
      <DefaultSeo />
      <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path={ROUTE_HOME} element={<Home />} />
        <Route path={ROUTE_DOCS_GETTING_STARTED} element={<GettingStartedPage />} />
        <Route path={ROUTE_DOCS_UTILITIES} element={<UtilitiesOverviewPage />} />
        <Route path={ROUTE_DOCS_TYPE_GUARDS} element={<UtilityTypeGuardsPage />} />
        <Route path={ROUTE_DOCS_CLONE} element={<UtilityClonePage />} />
        <Route path={ROUTE_DOCS_CONSTANTS} element={<UtilityConstantsPage />} />
        <Route path={ROUTE_DOCS_ARRAY} element={<UtilityArrayPage />} />
        <Route path={ROUTE_DOCS_OBJECT} element={<UtilityObjectPage />} />
        <Route path={ROUTE_DOCS_STRING} element={<UtilityStringPage />} />
        <Route path={ROUTE_DOCS_FUNCTION} element={<UtilityFunctionPage />} />
        <Route path={ROUTE_DOCS_FILE} element={<UtilityFilePage />} />
        <Route path={ROUTE_DOCS_CN} element={<UtilityCnPage />} />
        <Route path={ROUTE_DOCS_DATE} element={<UtilityDatePage />} />
        <Route path={ROUTE_DOCS_DEBUG} element={<UtilityDebugPage />} />
        <Route path={ROUTE_DOCS_HOOKS_REACT} element={<HooksReactPage />} />
        <Route path={ROUTE_DOCS_HOOKS_VUE} element={<HooksVuePage />} />
        <Route path={ROUTE_SANDBOX} element={<Sandbox />} />
        <Route path={ROUTE_CHANGELOG} element={<ChangelogPage />} />
        <Route path={ROUTE_PACKAGE_README} element={<ReadmePage />} />
        <Route path={ROUTE_VERSION} element={<VersionPage />} />
        <Route path="*" element={<Navigate to={ROUTE_HOME} replace />} />
      </Routes>
      </Suspense>
    </>
  );
}

export default App;
