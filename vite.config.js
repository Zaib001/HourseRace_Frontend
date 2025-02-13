import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Keep this for Render
  server: {
    historyApiFallback: true,  // Ensures client-side routing works
  }
});
