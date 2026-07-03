import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  GitBranch,
  Clock,
  Brain,
  Settings,
  User,
} from "lucide-react"

const sidebarItems = [
  { label: "Workspace", href: "/workspace", icon: LayoutDashboard },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Collections", href: "/collections", icon: Bookmark },
  { label: "Knowledge Graph", href: "/graph", icon: GitBranch },
  { label: "History", href: "/history", icon: Clock },
  { label: "Practice", href: "/practice", icon: Brain },
]

const bottomItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation()

  const NavItem = ({ item }: { item: (typeof sidebarItems)[number] }) => {
    const Icon = item.icon
    const isActive = location.pathname === item.href

    return (
      <Link
        to={item.href}
        onClick={onClose}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-primary-50 text-primary-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        )}
      >
        <Icon className="h-4.5 w-4.5 shrink-0" />
        {item.label}
      </Link>
    )
  }

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-60 flex-col border-r border-gray-200 bg-white transition-transform duration-200",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="border-t border-gray-200 p-3 space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary-50 text-primary-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </aside>
    </>
  )
}
