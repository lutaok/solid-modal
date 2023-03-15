import { resolve } from 'path';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      exclude: ['node_modules', 'dist'],
      insertTypesEntry: true,
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Modal',
      // the proper extensions will be added
      fileName: 'solid-modal',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['solid-js'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          ['solid-js']: 'solidjs',
        },
      },
    },
  },
});
