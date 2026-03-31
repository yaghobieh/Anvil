import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, BearIcons } from '@forgedevstack/bear';
import { SEARCH_ITEMS } from '@/data/search.data';
import { SEARCH_DEFAULT_LIMIT } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import type { SearchItem } from '@/types/search.types';
import { MODAL_BACKDROP_CLASS, MODAL_PANEL_CLASS } from './PortalSearch.const';
import type { PortalSearchProps } from './PortalSearch.types';

export const PortalSearch: FC<PortalSearchProps> = ({ open, onClose }) => {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo<SearchItem[]>(() => {
    if (!query.trim()) return SEARCH_ITEMS.slice(0, SEARCH_DEFAULT_LIMIT);
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)) ||
        (item.hash?.toLowerCase().includes(q) ?? false),
    );
  }, [query]);

  const goTo = useCallback(
    (path: string, hash?: string) => {
      navigate({
        pathname: path,
        hash: hash ? (hash.startsWith('#') ? hash : `#${hash}`) : undefined,
      });
      onClose();
      setQuery('');
    },
    [navigate, onClose],
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIdx]) {
        const hit = results[activeIdx];
        goTo(hit.path, hit.hash);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [results, activeIdx, goTo, onClose],
  );

  const noResultsText = t('search.noResults');

  if (!open) return null;

  return (
    <div
      className={MODAL_BACKDROP_CLASS}
      style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="presentation"
    >
      <div className={MODAL_PANEL_CLASS} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <BearIcons.SearchIcon size="sm" className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100"
          />
          <kbd className="hidden sm:inline text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
            ESC
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Typography variant="body2" color="secondary">
                {noResultsText}
              </Typography>
            </div>
          )}
          {results.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`w-full flex flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                idx === activeIdx ? 'bg-anvil-50 dark:bg-anvil-950/50' : ''
              }`}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => goTo(item.path, item.hash)}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</span>
              <span className="text-xs text-gray-500">{item.section}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
