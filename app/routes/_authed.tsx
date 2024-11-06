import { SignIn } from '@clerk/tanstack-start'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed')({
  beforeLoad: ({ context }) => {
    if (!context.user) throw new Error('Not authenticated')
  },
  errorComponent: ({ error }) => {
    if (error.message !== 'Not authenticated') throw error
    return (
      <div className="flex items-center justify-center p-12">
        <SignIn routing="hash" forceRedirectUrl={window.location.href} />
      </div>
    )
  },
})
