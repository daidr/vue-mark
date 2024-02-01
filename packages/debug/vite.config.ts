import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({ include: './core' })],
  build: {
    lib: {
      entry: '../core/index.ts',
      name: 'VueMark',
      fileName: 'vuemark',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
