import { defineConfig, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
// import { dependencies } from './package.json';
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs';
// import commonjs from 'rollup-plugin-commonjs'
function renderChunks(deps: Record<string, string>) {
  const chunks: any = {};
  Object.keys(deps).forEach(key => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  base: '/email-teammate/',

  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    checker,
    splitVendorChunkPlugin(),
    viteCommonjs({
      exclude: ['suneditor', 'suneditor-react', 'ckeditor', 'antlr4'],
    }),
    esbuildCommonjs(['antlr4']),
  ],
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    open: true,
    port: 3000,
  },
  optimizeDeps: {
    // include: ['antlr4'],
  },
  // mode: 'development',
  build: {
    minify: false,
    sourcemap: true,

    commonjsOptions: {
      transformMixedEsModules: true,
      exclude: ['ckeditor/*'],
      include: [],
    },
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       ...renderChunks(dependencies),
    //       vendor: ['react', 'react-router-dom', 'react-dom'],
    //       storybook: ['@harmon.ie/collabria-frontend-storybook'],
    //     },
    //   },
    // },
  },
});
