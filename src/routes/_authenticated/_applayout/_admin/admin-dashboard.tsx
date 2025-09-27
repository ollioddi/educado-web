import { createFileRoute } from '@tanstack/react-router'

const RouteComponent = () => {
  return (
    <div>
      Hello &quot;/_authenticated/_applayout/_admin/admin-dashboard&quot;!
    </div>
  )
}

export const Route = createFileRoute(
  '/_authenticated/_applayout/_admin/admin-dashboard',
)({
  component: RouteComponent,
})
