// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages でのパス設定
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});