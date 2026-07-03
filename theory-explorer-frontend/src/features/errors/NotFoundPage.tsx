import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Bookmark } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <Bookmark className="h-7 w-7 text-gray-400" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 text-center text-sm text-gray-500 max-w-sm">
        Sorry, we couldn't find the page you're looking for. It might have been
        moved or doesn't exist.
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
