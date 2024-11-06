import { lazy } from 'react'

export const TansTackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/router-devtools').then((module) => ({
          default: module.TanStackRouterDevtools,
        })),
      )
