import { defineConfig } from '@tanstack/start/config'
import viteAlias from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'bun',
  },
  vite: {
    plugins: [
      viteAlias({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
