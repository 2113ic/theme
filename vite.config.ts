import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ outDir: './package' })],
  build: {
    outDir: './package/dist',
    cssMinify: 'lightningcss',
    lib: {
      entry: './package/index.ts',
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
