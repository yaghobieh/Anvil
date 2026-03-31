import type { ReferenceItem } from '@/data/reference/reference.types';

export interface ReferenceListingProps {
  items: ReferenceItem[];
  /** CodeBlock language (default typescript). */
  language?: string;
}
