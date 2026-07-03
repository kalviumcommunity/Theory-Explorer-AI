import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  ChevronDown,
  Bookmark,
} from "lucide-react"

interface NavbarProps {
  variant?: "public" | "app"
}

export function Navbar({ variant = "public" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const publicLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur-sm",
      )}
    >
      <div className="container-app flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Bookmark className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            Concept Atlas
          </span>
        </Link>

        {/* Public Nav Links */}
        {variant === "public" && (
          <nav className="hidden md:flex items-center gap-8">
            {publicLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* App Nav - Search */}
        {variant === "app" && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search concepts, collections..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"
              />
              <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-xs text-gray-400 sm:inline">
                ⌘K
              </kbd>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {variant === "public" ? (
            <>
              <Link to="/login" className="hidden md:inline-flex">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/register" className="hidden md:inline-flex">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500 ring-2 ring-white" />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
                aria-label="Profile menu"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                  JD
                </div>
                <ChevronDown className="hidden h-4 w-4 sm:block" />
              </button>
            </>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && variant === "public" && (
        <div className="border-t border-gray-200 bg-white md:hidden animate-slide-down">
          <div className="container-app py-4 space-y-3">
            {publicLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
