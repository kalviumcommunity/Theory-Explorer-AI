import { Outlet, Link } from "react-router-dom"
import { Bookmark } from "lucide-react"

export function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - Brand */}
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-12 text-white lg:flex">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Bookmark className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Concept Atlas</span>
          </Link>
        </div>
        <blockquote className="max-w-md">
          <p className="text-lg leading-relaxed text-white/90">
            "The beautiful thing about learning is that nobody can take it away from you."
          </p>
          <footer className="mt-3 text-sm text-white/60">— B.B. King</footer>
        </blockquote>
        <div className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} Concept Atlas. All rights reserved.
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
