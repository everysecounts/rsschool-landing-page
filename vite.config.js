import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => ({
  root: 'src',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  appType: 'spa',
  base: mode === 'production' ? '/rsschool-landing-page/' : '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./src/index.html', import.meta.url)),
        menu: fileURLToPath(new URL('./src/menu.html', import.meta.url)),
        notFound: fileURLToPath(new URL('./src/404.html', import.meta.url)),
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
}));
