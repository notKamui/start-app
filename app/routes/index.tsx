import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
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
  loader: async () => ({
    count: await getCount(),
  }),
})

function RouteComponent() {
  const router = useRouter()
  const { count } = Route.useLoaderData()

  console.log('Hello')

  return (
    <button type="button" onClick={() => updateCount(1).then(() => router.invalidate())}>
      Add 1 to {count} ?
    </button>
  )
}
