import { defineConfig } from '@tanstack/start/config'
import viteAlias from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    preset: 'bun',
  },
  tsr: {
    autoCodeSplitting: false,
  },
  vite: {
    plugins: [
      viteAlias({
        projects: ['./tsconfig.json'],
      }),
    ],
  },
})
