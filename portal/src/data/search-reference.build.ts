import {
  ROUTE_DOCS_ARRAY,
  ROUTE_DOCS_CLONE,
  ROUTE_DOCS_CN,
  ROUTE_DOCS_CONSTANTS,
  ROUTE_DOCS_DATE,
  ROUTE_DOCS_DEBUG,
  ROUTE_DOCS_FILE,
  ROUTE_DOCS_FUNCTION,
  ROUTE_DOCS_HOOKS_REACT,
  ROUTE_DOCS_HOOKS_VUE,
  ROUTE_DOCS_OBJECT,
  ROUTE_DOCS_STRING,
  ROUTE_DOCS_TYPE_GUARDS,
} from '@/constants/strings.const';
import type { SearchItem } from '@/types/search.types';
import {
  ARRAY_REFERENCE,
  CLONE_REFERENCE,
  CN_REFERENCE,
  CONSTANTS_REFERENCE,
  DATE_REFERENCE,
  DEBUG_REFERENCE,
  FILE_REFERENCE,
  FUNCTION_REFERENCE,
  HOOKS_REACT_REFERENCE,
  HOOKS_VUE_REFERENCE,
  OBJECT_REFERENCE,
  STRING_REFERENCE,
  TYPE_GUARDS_REFERENCE,
} from './reference';
import type { ReferenceItem } from './reference/reference.types';

const REF_SECTION_ANCHOR_PREFIX = 'api-';

function anchorForName(name: string): string {
  return `${REF_SECTION_ANCHOR_PREFIX}${name.replace(/[^a-zA-Z0-9]/g, '-')}`;
}

function keywordSet(description: string, name: string): string[] {
  const blob = `${name} ${description}`.toLowerCase();
  const tokens = blob
    .split(/[^a-z0-9]+/g)
    .filter((w) => w.length > 1)
    .slice(0, 40);
  return [...new Set(tokens)];
}

function itemsFor(path: string, moduleTitle: string, refs: ReferenceItem[]): SearchItem[] {
  return refs.map((item, idx) => ({
    id: `api-${moduleTitle.replace(/\s+/g, '-')}-${anchorForName(item.name)}-${idx}`,
    title: item.name,
    section: `API · ${moduleTitle}`,
    path,
    hash: anchorForName(item.name),
    keywords: keywordSet(item.description, item.name),
  }));
}

/** Search rows for every symbol on utility / hooks doc pages (deep link via hash). */
export function buildApiSearchItems(): SearchItem[] {
  return [
    ...itemsFor(ROUTE_DOCS_TYPE_GUARDS, 'Type guards', TYPE_GUARDS_REFERENCE),
    ...itemsFor(ROUTE_DOCS_CLONE, 'Clone', CLONE_REFERENCE),
    ...itemsFor(ROUTE_DOCS_CONSTANTS, 'Constants', CONSTANTS_REFERENCE),
    ...itemsFor(ROUTE_DOCS_ARRAY, 'Array', ARRAY_REFERENCE),
    ...itemsFor(ROUTE_DOCS_OBJECT, 'Object', OBJECT_REFERENCE),
    ...itemsFor(ROUTE_DOCS_STRING, 'String', STRING_REFERENCE),
    ...itemsFor(ROUTE_DOCS_FUNCTION, 'Function', FUNCTION_REFERENCE),
    ...itemsFor(ROUTE_DOCS_FILE, 'File', FILE_REFERENCE),
    ...itemsFor(ROUTE_DOCS_CN, 'cn', CN_REFERENCE),
    ...itemsFor(ROUTE_DOCS_DATE, 'Date Master', DATE_REFERENCE),
    ...itemsFor(ROUTE_DOCS_DEBUG, 'Scope debugger', DEBUG_REFERENCE),
    ...itemsFor(ROUTE_DOCS_HOOKS_REACT, 'React hooks', HOOKS_REACT_REFERENCE),
    ...itemsFor(ROUTE_DOCS_HOOKS_VUE, 'Vue composables', HOOKS_VUE_REFERENCE),
  ];
}
