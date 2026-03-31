import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';
import en from '@/locales/en.json';
import type { LocaleCode, Messages } from './messages.types';

const MESSAGES_BY_LOCALE: Record<LocaleCode, Messages> = {
  en,
};

type Leaf = string | number | boolean | null;

function getLeaf(obj: unknown, path: string): Leaf | undefined {
  const parts = path.split('.');
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  if (typeof cur === 'string' || typeof cur === 'number' || typeof cur === 'boolean') return cur;
  return undefined;
}

export interface I18nContextValue {
  locale: LocaleCode;
  messages: Messages;
  t: (path: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  children: ReactNode;
  locale?: LocaleCode;
}

export const I18nProvider: FC<I18nProviderProps> = ({ children, locale = 'en' }) => {
  const messages = MESSAGES_BY_LOCALE[locale];

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>) => {
      const raw = getLeaf(messages, path);
      let out = typeof raw === 'string' ? raw : path;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          const token = `{{${k}}}`;
          out = out.split(token).join(String(v));
        }
      }
      return out;
    },
    [messages],
  );

  const value = useMemo<I18nContextValue>(() => ({ locale, messages, t }), [locale, messages, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
