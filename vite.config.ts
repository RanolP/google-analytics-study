import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';
import soonlohVite from 'soonloh/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [UnoCSS(), solid(), soonlohVite()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(import.meta.dirname, 'src') },
    ],
  },
});
