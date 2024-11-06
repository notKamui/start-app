import indexCss from '@/styles/index.css?url'
import { TansTackRouterDevtools } from '@/utils/tanstack-router-devtools'
import { ClerkProvider } from '@clerk/tanstack-start'
import { clerkClient, getAuth } from '@clerk/tanstack-start/server'
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts, createServerFn } from '@tanstack/start'
import { type ReactNode, Suspense } from 'react'

const $fetchClerkUser = createServerFn('GET', async (_, context) => {
  const auth = await getAuth(context.request)
  if (!auth.userId) return { user: null }
  const user = await clerkClient({}).users.getUser(auth.userId)
  return {
    user: {
      ...user,
      auth,
    },
  }
})

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      title: 'Tanstack Start Starter',
    },
  ],
  links: () => [
    {
      rel: 'stylesheet',
      href: indexCss,
    },
  ],
  beforeLoad: async () => {
    const { user } = await $fetchClerkUser()
    return { user }
  },
  component: () => {
    return (
      <ClerkProvider>
        <RootDocument>
          <Outlet />
          <Suspense>
            <TansTackRouterDevtools position="bottom-right" />
          </Suspense>
        </RootDocument>
      </ClerkProvider>
    )
  },
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  )
}
