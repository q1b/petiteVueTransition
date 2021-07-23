import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'esnext',
    // minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'VuePetiteTransition',
      formats: ['es', 'umd', 'iife']
    },
  }
})