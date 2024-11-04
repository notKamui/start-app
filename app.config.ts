import path from 'node:path'
import { defineConfig } from '@tanstack/start/config'

export default defineConfig({
  server: {
    preset: 'bun',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'app'),
      },
    },
  },
})
