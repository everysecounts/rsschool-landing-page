import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    sourcemap: true,
    minify: false,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
