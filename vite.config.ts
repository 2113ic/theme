import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ outDir: '.' })],
  build: {
    cssMinify: 'lightningcss',
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        format: 'esm',
        assetFileNames: 'index.css',
      },
    },
  },
})
