/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public site origin for canonical URLs and OG tags, e.g. https://anvil.example.com */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
