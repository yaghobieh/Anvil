import type { FC } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n';

function upsertMeta(attrName: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** Updates document head for SPA SEO (title, description, OG, canonical). */
export const DefaultSeo: FC = () => {
  const { pathname } = useLocation();
  const { messages } = useI18n();
  const base = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
  const { meta } = messages;

  useEffect(() => {
    document.title = meta.defaultTitle;
    document.documentElement.lang = 'en';

    upsertMeta('name', 'description', meta.defaultDescription);
    upsertMeta('name', 'keywords', meta.keywords);
    upsertMeta('name', 'robots', 'index,follow');

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:title', meta.defaultTitle);
    upsertMeta('property', 'og:description', meta.defaultDescription);
    upsertMeta('property', 'og:site_name', meta.siteName);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.defaultTitle);
    upsertMeta('name', 'twitter:description', meta.defaultDescription);

    if (base) {
      const path = pathname === '/' ? '' : pathname;
      const canonical = `${base}${path}`;
      upsertLink('canonical', canonical);
      upsertMeta('property', 'og:url', canonical);
      upsertMeta('property', 'og:image', `${base}/anvil-logo.svg`);
    }
  }, [pathname, base, meta]);

  return null;
};
