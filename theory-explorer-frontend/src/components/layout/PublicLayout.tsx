import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar variant="public" />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
