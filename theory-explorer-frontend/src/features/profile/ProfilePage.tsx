import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/contexts/ToastContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Skeleton } from "@/components/ui/Skeleton"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { fetchProfile, updateProfile } from "@/lib/users"
import { Bookmark, Brain, Clock, TrendingUp, Save, X, User, Mail } from "lucide-react"

export function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [interests, setInterests] = useState("")
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setUsername(user.username || "")
      setBio(user.bio || "")
      setInterests(user.interests?.join(", ") || "")
      setDifficulty(user.difficulty)
      setLoading(false)
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    setError("")
    try {
      const updated = await updateProfile({
        name,
        username: username || undefined,
        bio: bio || undefined,
        interests: interests.split(",").map((s) => s.trim()).filter(Boolean),
        difficulty,
      })
      updateUser(updated)
      toast("success", "Profile updated", "Your changes have been saved.")
      setEditing(false)
    } catch (err: unknown) {
      setError((err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?"

  if (loading) {
    return (
      <div className="container-app py-8">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton.Card />
          <div className="lg:col-span-2 space-y-6">
            <Skeleton.Card />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app py-8">
      <Breadcrumbs
        items={[{ label: "Profile" }]}
        className="mb-6"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Avatar & Stats */}
        <div className="space-y-6">
          <Card className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-2xl font-semibold text-primary-700">
              {initials}
            </div>
            <Card.Title className="mt-4">{user?.name}</Card.Title>
            <p className="text-sm text-gray-500">{user?.email}</p>
            {user?.username && (
              <p className="text-xs text-gray-400">@{user.username}</p>
            )}
            {user?.bio && (
              <p className="mt-3 text-sm text-gray-600">{user.bio}</p>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {user?.interests?.map((interest) => (
                <Badge key={interest} variant="primary">
                  {interest}
                </Badge>
              ))}
            </div>

            {user?.difficulty && (
              <div className="mt-4">
                <Badge variant="accent">{user.difficulty}</Badge>
              </div>
            )}
          </Card>

          <Card>
            <h4 className="mb-3 text-sm font-semibold text-gray-900">Learning Stats</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <Bookmark className="h-4 w-4" /> Collections
                </span>
                <span className="font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <Brain className="h-4 w-4" /> Quizzes Taken
                </span>
                <span className="font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" /> Concepts Viewed
                </span>
                <span className="font-medium text-gray-900">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <TrendingUp className="h-4 w-4" /> Streak
                </span>
                <span className="font-medium text-gray-900">0 days</span>
              </div>
            </div>
          </Card>

          <p className="text-xs text-gray-400 text-center">
            Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "N/A"}
          </p>
        </div>

        {/* Right column - Edit Profile */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <Card.Title>Profile Information</Card.Title>
                <Card.Description>Manage your public profile details</Card.Description>
              </div>
              {!editing ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setError("") }}>
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                  <Button size="sm" loading={saving} onClick={handleSave}>
                    <Save className="h-4 w-4" /> Save
                  </Button>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700" role="alert">
                {error}
              </div>
            )}

            {editing ? (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User className="h-4 w-4" />}
                  />
                  <Input
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<User className="h-4 w-4" />}
                    placeholder="your-username"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    maxLength={500}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="mt-1 text-xs text-gray-400">{bio.length}/500</p>
                </div>
                <Input
                  label="Interests (comma separated)"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Physics, Mathematics, Machine Learning"
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as typeof difficulty)}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <span className="text-gray-500">Name</span>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Username</span>
                    <p className="font-medium text-gray-900">{user?.username || "—"}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Bio</span>
                  <p className="text-gray-900">{user?.bio || "No bio set"}</p>
                </div>
                <div>
                  <span className="text-gray-500">Interests</span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {user?.interests?.length ? (
                      user.interests.map((i) => <Badge key={i} size="sm">{i}</Badge>)
                    ) : (
                      <span className="text-gray-400">No interests added</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Preferred Difficulty</span>
                  <p className="font-medium text-gray-900 capitalize">{user?.difficulty}</p>
                </div>
              </div>
            )}
          </Card>

          {/* Recent Activity */}
          <Card>
            <Card.Title>Recent Activity</Card.Title>
            <Card.Description>Your latest actions on Concept Atlas</Card.Description>
            <Card.Content className="mt-4">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="mb-2 h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">No recent activity</p>
                <p className="text-xs text-gray-400 mt-1">
                  Start exploring concepts to see your activity here.
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  )
}
