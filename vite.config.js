import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: { host: true, port: 5173 },
  // `npm run build:preview` makes a relative-path build for a shareable preview link.
  ...(mode === 'artifact' && { base: './', build: { outDir: 'dist-preview' } }),
}));
