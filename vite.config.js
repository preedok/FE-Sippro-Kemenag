import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip', // You can use 'brotliCompress' for Brotli compression
      ext: '.gz', // File extension after compression
      deleteOriginFile: false, // Keep the original uncompressed files
    }),
  ],
});
