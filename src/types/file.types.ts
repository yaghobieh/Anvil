/**
 * Rough document category for file-name / extension checks (no parsing of file contents).
 */
export type DocumentKind = 'pdf' | 'markdown' | 'office' | 'text' | 'unknown';

export type OfficeDocFamily = 'word' | 'spreadsheet' | 'presentation' | 'other';

/** Result of {@link parseDataUrl}. */
export interface ParsedDataUrl {
  mime: string;
  isBase64: boolean;
  /** Raw payload after the comma (not decoded). */
  data: string;
}

/** Options for {@link getAcceptString} (HTML `accept` attribute). */
export interface GetAcceptStringOptions {
  pdf?: boolean;
  markdown?: boolean;
  office?: boolean;
  text?: boolean;
  /** Extra MIME types and/or `.ext` entries (e.g. `image/png`, `.svg`). */
  extra?: string[];
}
