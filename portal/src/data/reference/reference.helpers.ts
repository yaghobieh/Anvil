import { DEFAULT_IMPORT_SOURCE } from './reference.const';
import type { ReferenceItem } from './reference.types';

export function imp(names: string, source: string = DEFAULT_IMPORT_SOURCE): string {
  return `import { ${names} } from '${source}';`;
}

/** Single named export; body is lines after the import. */
export function r(name: string, description: string, body: string, source?: string): ReferenceItem {
  return {
    name,
    description,
    example: [imp(name, source), '', body.trim()].join('\n'),
  };
}

/** Shown title may differ from import (e.g. re-export alias). */
export function rAlias(
  displayName: string,
  importClause: string,
  description: string,
  body: string,
  source?: string,
): ReferenceItem {
  return {
    name: displayName,
    description,
    example: [imp(importClause, source), '', body.trim()].join('\n'),
  };
}

/** Scope singleton method — import { scope } only. */
export function rScope(name: string, description: string, callLine: string): ReferenceItem {
  return {
    name,
    description,
    example: [imp('scope'), '', callLine.trim()].join('\n'),
  };
}
