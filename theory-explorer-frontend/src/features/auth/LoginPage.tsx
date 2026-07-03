import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Lock, ArrowRight } from "lucide-react"

export function LoginPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          icon={<Mail className="h-4 w-4" />}
          required
        />
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock className="h-4 w-4" />}
            required
          />
          <div className="mt-1 text-right">
            <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-700">
              Forgot password?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg">
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
