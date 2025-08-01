import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'partials')
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
