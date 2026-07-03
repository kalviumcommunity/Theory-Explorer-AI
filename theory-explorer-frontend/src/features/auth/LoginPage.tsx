import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/contexts/ToastContext"
import { Mail, Lock, ArrowRight } from "lucide-react"

export function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/workspace"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      toast("success", "Welcome back!", "You've been signed in successfully.")
      navigate(from, { replace: true })
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Invalid email or password"
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700" role="alert">
            {error}
          </div>
        )}
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          icon={<Mail className="h-4 w-4" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="mt-1 text-right">
            <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Sign In
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-700">
          Create one
        </Link>
      </p>
    </>
  )
}
