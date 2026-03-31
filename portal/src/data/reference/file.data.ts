import { r } from './reference.helpers';
import type { ReferenceItem } from './reference.types';

export const FILE_REFERENCE: ReferenceItem[] = [
  r(
    'EXTENSION_TO_MIME',
    'Readonly map from lowercase file extension (without dot) to IANA-style MIME string. Use for quick Content-Type hints when the browser or server does not infer it; not a substitute for sniffing bytes for security-sensitive paths.',
    "EXTENSION_TO_MIME['pdf']; // 'application/pdf'",
  ),
  r(
    'getFileExtension',
    'Returns the substring after the last dot in the last path segment, lowercased. Note: for `archive.tar.gz` the extension is `gz`, not `tar.gz`—split further if you need compound extensions.',
    "getFileExtension('a/b/archive.tar.gz'); // 'gz'",
  ),
  r(
    'formatFileSize',
    'Formats byte counts as human-readable strings (KB/MB/etc.) using decimal or binary factors depending on options. Good for upload progress and storage UI.',
    'formatFileSize(1536000);',
  ),
  r(
    'getMimeTypeFromExtension',
    'Looks up MIME from extension using the built-in map; returns a sensible default when unknown. Pair with `sanitizeFilename` before trusting user input.',
    "getMimeTypeFromExtension('md');",
  ),
  r(
    'isPdfFile',
    'True when the path or name ends with a PDF extension (case-insensitive). Does not open the file—only string matching.',
    "isPdfFile('x.pdf');",
  ),
  r(
    'isMarkdownFile',
    'True for common Markdown and text-markdown extensions. Useful for accept lists and icon selection.',
    "isMarkdownFile('README.md');",
  ),
  r(
    'isOfficeDocumentFile',
    'True for Word, Excel, PowerPoint, and related Office-style extensions grouped together.',
    "isOfficeDocumentFile('f.xlsx');",
  ),
  r(
    'isWordDocumentFile',
    'Narrower than office-wide check: Word `.doc`, `.docx`, etc.',
    "isWordDocumentFile('a.docx');",
  ),
  r(
    'isSpreadsheetFile',
    'Spreadsheet extensions including CSV and Excel formats.',
    "isSpreadsheetFile('a.csv');",
  ),
  r(
    'isPresentationFile',
    'Presentation extensions such as `.pptx`.',
    "isPresentationFile('a.pptx');",
  ),
  r(
    'isPlainTextFile',
    'Common plain-text extensions (log, txt, etc.).',
    "isPlainTextFile('log.txt');",
  ),
  r(
    'getDocumentKind',
    "Returns a coarse bucket: 'pdf' | 'markdown' | 'office' | 'text' | 'unknown' for UI routing or icons.",
    "getDocumentKind('n.md');",
  ),
  r(
    'getOfficeDocumentFamily',
    "Within Office files, classifies as 'word' | 'spreadsheet' | 'presentation' | 'other'.",
    "getOfficeDocumentFamily('a.pptx');",
  ),
  r(
    'sanitizeFilename',
    'Strips directory components and removes characters unsafe for downloads or cross-platform paths. Always run on user-supplied names before `downloadBlob` / `downloadText`.',
    "sanitizeFilename('../../etc/passwd');",
  ),
  r(
    'readFileAsText',
    'Browser-only: wraps FileReader in a Promise resolving UTF-8 text. Requires a `File` or `Blob`; reject handling depends on reader errors.',
    '// await readFileAsText(file);',
  ),
  r(
    'readFileAsArrayBuffer',
    'Browser-only: Promise that resolves to an ArrayBuffer for binary parsing (e.g. WASM, custom formats).',
    '// await readFileAsArrayBuffer(file);',
  ),
  r(
    'readFileAsDataURL',
    'Browser-only: Promise for a `data:...;base64,...` URL suitable for `<img src>` or preview.',
    '// await readFileAsDataURL(file);',
  ),
  r(
    'downloadBlob',
    'Creates an object URL, triggers a programmatic click on a temporary anchor, then revokes the URL. No-op or guarded when `document` is unavailable (SSR).',
    'downloadBlob(blob, "out.bin");',
  ),
  r(
    'downloadText',
    'Encodes a string as a Blob with the given MIME and filename, then triggers download—convenient for JSON/CSV exports.',
    'downloadText("{}", "data.json", "application/json");',
  ),
  r(
    'getAcceptString',
    'Builds the `accept` attribute for `<input type="file">` from boolean flags (pdf, markdown, …) plus optional extra extensions.',
    'getAcceptString({ pdf: true, markdown: true });',
  ),
  r(
    'parseDataUrl',
    'Splits a data URL into mime type, whether payload is base64, and the raw data segment. Useful when consuming pasted or embedded data URLs.',
    "parseDataUrl('data:text/plain;base64,SGk=');",
  ),
];
