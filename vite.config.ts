import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import image from '@rollup/plugin-image';

export default defineConfig({
  plugins: [
    react(),
    image()
  ],
  assetsInclude: ['**/*.png']
});
