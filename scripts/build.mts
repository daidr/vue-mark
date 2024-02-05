import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function buildForBrowser() {
  await build({
    configFile: path.resolve(__dirname, '../packages/debug/vite.config.ts'),
    root: path.resolve(__dirname, '../packages/debug'),
    build: {
      emptyOutDir: true,
      sourcemap: true,
      outDir: '../../dist',
      lib: {
        entry: '../core/index.ts',
        name: 'VueMark',
        fileName: 'vuemark',
        formats: ['es', 'iife', 'umd'],
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
}

buildForBrowser()
