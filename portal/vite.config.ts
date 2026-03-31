import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      /** Anvil dist may import Vue; portal is React-only — satisfy Rollup (same pattern as Bear portal). */
      vue: resolve(__dirname, './src/vue-stub.ts'),
      /** Prefer workspace Anvil build over nested copies under Bear. */
      '@forgedevstack/anvil': resolve(__dirname, '..'),
    },
  },
  server: {
    port: 3040,
  },
});
