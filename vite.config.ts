import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: there is deliberately no `define` block injecting GEMINI_API_KEY.
// Vite's `define` performs build-time substitution, which would inline the
// literal key into the client bundle where anyone could read it. The key is
// held server-side only (see server.ts); the browser calls /api/triage.
export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
