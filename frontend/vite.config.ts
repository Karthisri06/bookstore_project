import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: ['node_modules/', 'src/main.tsx', 'src/vite-env.d.ts'],
    },
  },
});
