import type {
  DocumentKind,
  OfficeDocFamily,
  ParsedDataUrl,
  GetAcceptStringOptions,
} from '../types/file.types';

const PDF_EXTENSIONS = new Set(['pdf']);

const MARKDOWN_EXTENSIONS = new Set([
  'md',
  'markdown',
  'mdown',
  'mkd',
  'mdx',
]);

const OFFICE_WORD = new Set(['doc', 'docx', 'odt', 'rtf']);
const OFFICE_SHEET = new Set(['xls', 'xlsx', 'ods', 'csv']);
const OFFICE_SLIDE = new Set(['ppt', 'pptx', 'odp']);

const OFFICE_ALL = new Set([...OFFICE_WORD, ...OFFICE_SHEET, ...OFFICE_SLIDE]);

const TEXT_EXTENSIONS = new Set(['txt', 'log', 'ini', 'cfg', 'env']);

/** Common extension → MIME (subset for PDF, Markdown, Office, text). */
export const EXTENSION_TO_MIME: Readonly<Record<string, string>> = Object.freeze({
  pdf: 'application/pdf',
  md: 'text/markdown',
  markdown: 'text/markdown',
  mdx: 'text/mdx',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  odt: 'application/vnd.oasis.opendocument.text',
  ods: 'application/vnd.oasis.opendocument.spreadsheet',
  odp: 'application/vnd.oasis.opendocument.presentation',
  rtf: 'application/rtf',
  csv: 'text/csv',
  txt: 'text/plain',
  json: 'application/json',
  xml: 'application/xml',
  html: 'text/html',
  htm: 'text/html',
});

/**
 * Last path segment’s extension, lowercased, without the dot (e.g. `"archive.tar.gz"` → `"gz"`).
 */
export function getFileExtension(pathOrName: string): string {
  if (!pathOrName || typeof pathOrName !== 'string') return '';
  const base = pathOrName.replace(/\\/g, '/').split('/').pop() ?? '';
  const dot = base.lastIndexOf('.');
  if (dot <= 0 || dot === base.length - 1) return '';
  return base.slice(dot + 1).toLowerCase();
}

/**
 * Human-readable size (B, KB, MB, GB, TB).
 */
export function formatFileSize(
  bytes: number,
  options?: { decimals?: number; binary?: boolean }
): string {
  const { decimals = 1, binary = false } = options ?? {};
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes === 0) return '0 B';
  const base = binary ? 1024 : 1000;
  const units = binary
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB']
    : ['B', 'KB', 'MB', 'GB', 'TB'];
  let n = bytes;
  let u = 0;
  while (n >= base && u < units.length - 1) {
    n /= base;
    u += 1;
  }
  const d = u === 0 ? 0 : decimals;
  return `${parseFloat(n.toFixed(d))} ${units[u]}`;
}

/**
 * MIME for a normalized extension (no dot), or `undefined` if unknown.
 */
export function getMimeTypeFromExtension(extension: string): string | undefined {
  const ext = extension.replace(/^\./, '').toLowerCase();
  return EXTENSION_TO_MIME[ext];
}

export function isPdfFile(pathOrName: string): boolean {
  return PDF_EXTENSIONS.has(getFileExtension(pathOrName));
}

export function isMarkdownFile(pathOrName: string): boolean {
  return MARKDOWN_EXTENSIONS.has(getFileExtension(pathOrName));
}

/** Microsoft Office / OpenDocument / common “document” spreadsheets & slides (by extension only). */
export function isOfficeDocumentFile(pathOrName: string): boolean {
  return OFFICE_ALL.has(getFileExtension(pathOrName));
}

export function isWordDocumentFile(pathOrName: string): boolean {
  return OFFICE_WORD.has(getFileExtension(pathOrName));
}

export function isSpreadsheetFile(pathOrName: string): boolean {
  return OFFICE_SHEET.has(getFileExtension(pathOrName));
}

export function isPresentationFile(pathOrName: string): boolean {
  return OFFICE_SLIDE.has(getFileExtension(pathOrName));
}

export function isPlainTextFile(pathOrName: string): boolean {
  return TEXT_EXTENSIONS.has(getFileExtension(pathOrName));
}

/**
 * Single bucket for UI filters: pdf | markdown | office | text | unknown.
 */
export function getDocumentKind(pathOrName: string): DocumentKind {
  const ext = getFileExtension(pathOrName);
  if (PDF_EXTENSIONS.has(ext)) return 'pdf';
  if (MARKDOWN_EXTENSIONS.has(ext)) return 'markdown';
  if (OFFICE_ALL.has(ext)) return 'office';
  if (TEXT_EXTENSIONS.has(ext)) return 'text';
  return 'unknown';
}

/**
 * Finer office grouping (word / spreadsheet / presentation / other).
 */
export function getOfficeDocumentFamily(pathOrName: string): OfficeDocFamily {
  const ext = getFileExtension(pathOrName);
  if (OFFICE_WORD.has(ext)) return 'word';
  if (OFFICE_SHEET.has(ext)) return 'spreadsheet';
  if (OFFICE_SLIDE.has(ext)) return 'presentation';
  return 'other';
}

/**
 * Remove path segments and unsafe characters for display / download names.
 */
export function sanitizeFilename(name: string, maxLength = 255): string {
  if (!name || typeof name !== 'string') return 'file';
  const base = name.replace(/\\/g, '/').split('/').pop() ?? name;
  const cleaned = base.replace(/[<>:"|?*\x00-\x1f]/g, '_').trim() || 'file';
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

/**
 * Browser: read a `File` as UTF-8 text (rejects in non-browser if `File` is unavailable).
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

/**
 * Browser: read a `File` as `ArrayBuffer` (`FileReader`).
 */
export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = reader.result;
      if (r instanceof ArrayBuffer) resolve(r);
      else reject(new Error('Expected ArrayBuffer from FileReader'));
    };
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Browser: read a `File` as a data URL string (`FileReader.readAsDataURL`).
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Browser: trigger a file download for a `Blob` (creates a temporary object URL; no-op if `document` is unavailable).
 */
export function downloadBlob(blob: Blob, filename: string): void {
  if (typeof document === 'undefined') return;
  const safe = sanitizeFilename(filename);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = safe;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/**
 * Browser: download a string as a text file (UTF-8 `Blob` + {@link downloadBlob}).
 */
export function downloadText(
  text: string,
  filename: string,
  mimeType = 'text/plain;charset=utf-8'
): void {
  const blob = new Blob([text], { type: mimeType });
  downloadBlob(blob, filename);
}

function addAcceptTokensForExtensions(
  set: Set<string>,
  extensions: Iterable<string>
): void {
  for (const ext of extensions) {
    const e = ext.replace(/^\./, '').toLowerCase();
    const mime = getMimeTypeFromExtension(e);
    if (mime) set.add(mime);
    set.add(`.${e}`);
  }
}

/**
 * Build an HTML `accept` string from category flags and optional extra MIME / `.ext` entries.
 * Values are de-duplicated; order is not guaranteed.
 */
export function getAcceptString(options: GetAcceptStringOptions = {}): string {
  const { pdf, markdown, office, text, extra = [] } = options;
  const set = new Set<string>();

  if (pdf) {
    set.add('application/pdf');
    set.add('.pdf');
  }
  if (markdown) {
    addAcceptTokensForExtensions(set, MARKDOWN_EXTENSIONS);
  }
  if (office) {
    addAcceptTokensForExtensions(set, OFFICE_ALL);
  }
  if (text) {
    addAcceptTokensForExtensions(set, TEXT_EXTENSIONS);
  }
  for (const e of extra) {
    const t = String(e).trim();
    if (t) set.add(t);
  }

  return [...set].join(',');
}

/**
 * Parse a `data:` URL into MIME, base64 flag, and raw payload (not decoded).
 * Returns `null` if the string is not a valid data URL.
 */
export function parseDataUrl(dataUrl: string): ParsedDataUrl | null {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const prefix = 'data:';
  if (!dataUrl.startsWith(prefix)) return null;
  const rest = dataUrl.slice(prefix.length);
  const comma = rest.indexOf(',');
  if (comma < 0) return null;
  const meta = rest.slice(0, comma);
  const data = rest.slice(comma + 1);
  const segments = meta.split(';').map((s) => s.trim());
  const first = segments[0] ?? '';
  const mime = first || 'text/plain';
  const isBase64 = segments.slice(1).some((s) => s.toLowerCase() === 'base64');
  return { mime, isBase64, data };
}
