export interface ReferenceItem {
  /** Public API name (as imported from @forgedevstack/anvil). */
  name: string;
  /** One-line explanation. */
  description: string;
  /** Full snippet: import + usage (copy button copies this block). */
  example: string;
}
