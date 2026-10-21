import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages публикует сайт с под-пути /react-bot-test/,
// поэтому все ассеты должны резолвиться от этого базового пути.
export default defineConfig({
  plugins: [react()],
  base: '/react-bot-test/',
  server: {
    port: 5000,
  },
});
