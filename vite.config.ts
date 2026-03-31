import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
        'date-master/index': resolve(__dirname, 'src/utils/date.ts'),
        'hooks/index': resolve(__dirname, 'src/hooks/index.ts'),
        'hooks/react/index': resolve(__dirname, 'src/hooks/react/index.ts'),
        'hooks/vue/index': resolve(__dirname, 'src/hooks/vue/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'vue'],
      output: {
        globals: {
          react: 'React',
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@types': resolve(__dirname, 'src/types'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
  },
});

