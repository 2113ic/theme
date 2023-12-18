import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'

const utils = `
@use '@icxy/theme/src/fn' as *;
@use '@icxy/theme/src/mixins' as *;
`

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: utils }
    }
  }
})
