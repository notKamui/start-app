import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return `User ID: ${id}`
}
