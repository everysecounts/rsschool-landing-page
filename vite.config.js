import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ command }) => ({
  root: 'src',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  appType: 'spa',
  base: command === 'build' ? '/rsschool-landing-page/' : '/',
  build: {
    sourcemap: true,
    minify: false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}));
