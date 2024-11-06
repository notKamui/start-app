import * as fs from 'node:fs'
import { SignInButton, SignOutButton, SignUpButton, SignedIn, SignedOut } from '@clerk/tanstack-start'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

const filePath = 'count.txt'

async function readCount() {
  return Number.parseInt(await fs.promises.readFile(filePath, 'utf8').catch(() => '0'))
}

const getCount = createServerFn('GET', () => {
  return readCount()
})
const updateCount = createServerFn('POST', async (addBy: number) => {
  const counter = await readCount()
  await fs.promises.writeFile(filePath, `${counter + addBy}`)
})

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async ({ context }) => ({
    count: await getCount(),
    user: context.user,
  }),
})

function RouteComponent() {
  const router = useRouter()
  const { count, user } = Route.useLoaderData()

  return (
    <div>
      <h1>Home</h1>
      <SignedIn>
        <p>Signed in as </p>
        <div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        <div className="flex flex-col gap-2 w-min children:text-nowrap">
          <button type="button" onClick={() => updateCount(1).then(() => router.invalidate())}>
            Add 1 to {count} ?
          </button>
          <Link to="/user/$id" params={{ id: count.toString() }}>
            Go to user with id {count}
          </Link>
          <button type="button" onClick={() => updateCount(-count).then(() => router.invalidate())}>
            Reset
          </button>
          <SignOutButton />
        </div>
      </SignedIn>
      <SignedOut>
        <p>Please log in</p>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
    </div>
  )
}
