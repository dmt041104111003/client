import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'crypto', 'util', 'stream'],
      globals: {
        Buffer: true,
        global: true,
        process: true
      },
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      util: 'util',
      crypto: 'crypto-browserify',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
