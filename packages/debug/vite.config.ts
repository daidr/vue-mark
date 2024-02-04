import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [vue(), dts({ include: '../core' }), visualizer({
    gzipSize: true,
    brotliSize: true,
    sourcemap: true,
    filename: '../../stats.html',
  })],
  build: {
    emptyOutDir: true,
    sourcemap: true,
    outDir: '../../dist',
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
