import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Lock, ArrowLeft } from "lucide-react"

export function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-50">
        <Lock className="h-7 w-7 text-danger-500" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Access denied</h1>
      <p className="mt-2 text-center text-sm text-gray-500 max-w-sm">
        You don't have permission to access this page. Please contact your
        administrator if you think this is a mistake.
      </p>
      <Link to="/">
        <Button variant="primary" className="mt-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
