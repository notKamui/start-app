import { json } from '@tanstack/start'
import { createAPIFileRoute } from '@tanstack/start/api'

export const Route = createAPIFileRoute('/api/user/$id')({
  GET: ({ params }) => {
    return json({ message: `User ID: ${params.id}` })
  },
})
