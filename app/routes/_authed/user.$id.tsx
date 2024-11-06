import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/user/$id')({
  component: () => {
    const { id } = Route.useParams()
    return (
      <div>
        <h1>User with id: {id}</h1>
        <Link to="/">Go back</Link>
      </div>
    )
  },
})
