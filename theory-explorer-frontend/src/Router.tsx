import { createBrowserRouter, Navigate } from "react-router-dom"
import { PublicLayout } from "@/components/layout/PublicLayout"
import { AppLayout } from "@/components/layout/AppLayout"
import { AuthLayout } from "@/components/layout/AuthLayout"
import { ProtectedRoute } from "@/components/layout/ProtectedRoute"
import { LandingPage } from "@/features/landing/LandingPage"
import { WorkspacePage } from "@/features/workspace/WorkspacePage"
import { ExplorePage } from "@/features/explore/ExplorePage"
import { KnowledgePage } from "@/features/knowledge/KnowledgePage"
import { KnowledgeGraphPage } from "@/features/graph/KnowledgeGraphPage"
import { CollectionsPage } from "@/features/collections/CollectionsPage"
import { HistoryPage } from "@/features/history/HistoryPage"
import { PracticePage } from "@/features/practice/PracticePage"
import { ProfilePage } from "@/features/profile/ProfilePage"
import { SettingsPage } from "@/features/settings/SettingsPage"
import { LoginPage } from "@/features/auth/LoginPage"
import { RegisterPage } from "@/features/auth/RegisterPage"
import { NotFoundPage } from "@/features/errors/NotFoundPage"
import { UnauthorizedPage } from "@/features/errors/UnauthorizedPage"

function ProtectedAppLayout() {
  return (
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedAppLayout />,
    children: [
      { path: "workspace", element: <WorkspacePage /> },
      { path: "explore", element: <ExplorePage /> },
      { path: "knowledge/:id", element: <KnowledgePage /> },
      { path: "graph", element: <KnowledgeGraphPage /> },
      { path: "collections", element: <CollectionsPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "practice", element: <PracticePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
