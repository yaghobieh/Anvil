export interface SearchItem {
  id: string;
  title: string;
  section: string;
  path: string;
  keywords: string[];
  /** In-page anchor (e.g. api-debounce) for API doc hits */
  hash?: string;
}
