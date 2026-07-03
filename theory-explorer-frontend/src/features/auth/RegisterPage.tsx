import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/contexts/ToastContext"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

export function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      toast("success", "Account created!", "Welcome to Concept Atlas.")
      navigate("/workspace", { replace: true })
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Registration failed"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-2 text-sm text-gray-500">
          Start your learning journey with Concept Atlas.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700" role="alert">
            {error}
          </div>
        )}
        <Input
          label="Full name"
          type="text"
          placeholder="John Doe"
          icon={<User className="h-4 w-4" />}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          icon={<Mail className="h-4 w-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password (8+ characters)"
          icon={<Lock className="h-4 w-4" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Create Account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-gray-400">
        By creating an account, you agree to our{" "}
        <a href="#" className="underline hover:text-gray-600">Terms</a> and{" "}
        <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
      </p>
    </>
  )
}
