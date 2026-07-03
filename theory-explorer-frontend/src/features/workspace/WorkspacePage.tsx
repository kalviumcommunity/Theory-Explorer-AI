import { useAuth } from "@/contexts/AuthContext"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import {
  Bookmark,
  Compass,
  Brain,
  TrendingUp,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  BarChart3,
} from "lucide-react"

const quickActions = [
  { label: "Explore Topics", href: "/explore", icon: Compass, variant: "primary" as const },
  { label: "View Collections", href: "/collections", icon: Bookmark, variant: "outline" as const },
  { label: "Practice Quizzes", href: "/practice", icon: Brain, variant: "outline" as const },
  { label: "Knowledge Graph", href: "/graph", icon: TrendingUp, variant: "outline" as const },
]

export function WorkspacePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="container-app py-8">
        <div className="space-y-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-96" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => <Skeleton.Card key={i} />)}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton.Card />
            <Skeleton.Card />
          </div>
        </div>
      </div>
    )
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  return (
    <div className="container-app py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0] || "Learner"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Continue your learning journey. You have {user?.interests?.length || 0} topics of interest.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">0</p>
              <p className="text-xs text-gray-500">Concepts Explored</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">0</p>
              <p className="text-xs text-gray-500">Quizzes Taken</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-50 text-success-600">
              <Bookmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">0</p>
              <p className="text-xs text-gray-500">Collections</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning-50 text-warning-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">0</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning */}
          <Card>
            <Card.Title>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  Continue Learning
                </span>
              </div>
            </Card.Title>
            <Card.Content className="mt-2">
              <EmptyState
                icon={<BookOpen className="h-6 w-6" />}
                title="No concepts in progress"
                description="Start exploring topics and your recent learning will appear here."
                action={
                  <Link to="/explore">
                    <Button size="sm">
                      <Compass className="h-4 w-4" /> Explore Topics
                    </Button>
                  </Link>
                }
              />
            </Card.Content>
          </Card>

          {/* Recent Activity */}
          <Card>
            <Card.Title>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  Recent Activity
                </span>
              </div>
            </Card.Title>
            <Card.Content className="mt-2">
              <EmptyState
                icon={<Search className="h-6 w-6" />}
                title="No activity yet"
                description="Your searches, views, and quiz attempts will be recorded here."
                action={
                  <Link to="/explore">
                    <Button variant="outline" size="sm">Start Exploring</Button>
                  </Link>
                }
              />
            </Card.Content>
          </Card>

          {/* Recommended Concepts */}
          <Card>
            <Card.Title>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-gray-400" />
                  Recommended for You
                </span>
              </div>
            </Card.Title>
            <Card.Description>
              Based on your interests: {user?.interests?.join(", ") || "not specified"}
            </Card.Description>
            <Card.Content className="mt-4">
              <EmptyState
                icon={<Sparkles className="h-6 w-6" />}
                title="Add interests to get recommendations"
                description="Update your profile with topics you're interested in."
                action={
                  <Link to="/profile">
                    <Button variant="outline" size="sm">Edit Profile</Button>
                  </Link>
                }
              />
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-base font-semibold text-primary-700">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {user?.interests?.map((interest) => (
                <Badge key={interest} size="sm">{interest}</Badge>
              ))}
            </div>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="mt-3 w-full">
                View Profile
              </Button>
            </Link>
          </Card>

          {/* Quick Actions */}
          <Card>
            <Card.Title className="text-sm">Quick Actions</Card.Title>
            <Card.Content className="mt-2 space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.href}
                    to={action.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                    <ArrowRight className="ml-auto h-3.5 w-3.5 text-gray-300" />
                  </Link>
                )
              })}
            </Card.Content>
          </Card>

          {/* Weekly Progress */}
          <Card>
            <Card.Title className="text-sm">This Week</Card.Title>
            <Card.Content className="mt-4">
              <div className="flex justify-between gap-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <span className="text-xs text-gray-400">{day}</span>
                    <div
                      className={`h-8 w-8 rounded-lg ${
                        i < new Date().getDay() - 1
                          ? "bg-primary-200"
                          : i === new Date().getDay() - 1
                          ? "bg-primary-500"
                          : "bg-gray-100"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-gray-500">
                0 activities this week
              </p>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}
