import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/contexts/ToastContext"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Breadcrumbs } from "@/components/layout/Breadcrumbs"
import { updatePreferences } from "@/lib/users"
import { Sun, Moon, Monitor, Globe, Brain, Bell, Save } from "lucide-react"

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "hi", label: "Hindi" },
]

const explanationLevels = [
  { value: "beginner", label: "Beginner", desc: "Simple explanations with basic concepts" },
  { value: "intermediate", label: "Intermediate", desc: "Balanced depth with some technical terms" },
  { value: "advanced", label: "Advanced", desc: "Deep dives with technical precision" },
]

export function SettingsPage() {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [language, setLanguage] = useState("en")
  const [explanationLevel, setExplanationLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate")
  const [emailNotifications, setEmailNotifications] = useState(true)

  useEffect(() => {
    if (user?.preferences) {
      setTheme(user.preferences.theme || "system")
      setLanguage(user.preferences.language || "en")
      setExplanationLevel(user.preferences.explanationLevel || "intermediate")
      setEmailNotifications(user.preferences.emailNotifications ?? true)
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    try {
      const prefs = await updatePreferences({ theme, language, explanationLevel, emailNotifications })
      if (user) {
        updateUser({ ...user, preferences: prefs })
      }
      toast("success", "Settings saved", "Your preferences have been updated.")
    } catch {
      toast("error", "Failed to save", "Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container-app py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: "Settings" }]} className="mb-6" />

      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Customize your learning experience</p>

      <div className="space-y-6">
        {/* Theme */}
        <Card>
          <Card.Title>Appearance</Card.Title>
          <Card.Description>Choose how Concept Atlas looks for you</Card.Description>
          <Card.Content className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "light", icon: Sun, label: "Light" },
                { value: "dark", icon: Moon, label: "Dark" },
                { value: "system", icon: Monitor, label: "System" },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value as typeof theme)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                    theme === value
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Language */}
        <Card>
          <Card.Title>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Language
            </div>
          </Card.Title>
          <Card.Description>Select your preferred language for explanations</Card.Description>
          <Card.Content className="mt-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="block w-full max-w-xs rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none transition-all"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </Card.Content>
        </Card>

        {/* Explanation Level */}
        <Card>
          <Card.Title>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" /> Explanation Level
            </div>
          </Card.Title>
          <Card.Description>Control the depth of concept explanations</Card.Description>
          <Card.Content className="mt-4 space-y-3">
            {explanationLevels.map((level) => (
              <label
                key={level.value}
                className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  explanationLevel === level.value
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="explanationLevel"
                  value={level.value}
                  checked={explanationLevel === level.value}
                  onChange={(e) => setExplanationLevel(e.target.value as typeof explanationLevel)}
                  className="mt-1 h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{level.label}</p>
                  <p className="text-xs text-gray-500">{level.desc}</p>
                </div>
              </label>
            ))}
          </Card.Content>
        </Card>

        {/* Notifications */}
        <Card>
          <Card.Title>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </div>
          </Card.Title>
          <Card.Description>Manage your notification preferences</Card.Description>
          <Card.Content className="mt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">Email notifications</p>
                <p className="text-xs text-gray-500">
                  Receive updates about new concepts, quiz results, and learning reminders
                </p>
              </div>
            </label>
          </Card.Content>
        </Card>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} loading={saving}>
            <Save className="h-4 w-4" /> Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
