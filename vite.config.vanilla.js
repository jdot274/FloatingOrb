/**
 * Vite Configuration for Vanilla JS Web Component Bundle
 * 
 * This builds the standalone floating-orb.js that works everywhere
 * without React dependencies.
 */

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/floating-orb.js'),
      name: 'FloatingOrb',
      formats: ['es', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'floating-orb.esm.js';
        if (format === 'umd') return 'floating-orb.umd.js';
        if (format === 'iife') return 'floating-orb.min.js';
        return `floating-orb.${format}.js`;
      },
    },
    rollupOptions: {
      // Don't externalize three.js - bundle it for standalone use
      external: [],
      output: {
        // Global variable name for IIFE/UMD builds
        name: 'FloatingOrb',
        // Provide global variable names for externalized deps
        globals: {},
      },
    },
    outDir: 'dist',
    emptyOutDir: false, // Don't clear dist folder (preserve React build)
    minify: 'esbuild',
    sourcemap: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});

