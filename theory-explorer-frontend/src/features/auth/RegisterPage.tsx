import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Mail, Lock, User, ArrowRight } from "lucide-react"

export function RegisterPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-2 text-sm text-gray-500">
          Start your learning journey with Concept Atlas.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Full name"
          type="text"
          placeholder="John Doe"
          icon={<User className="h-4 w-4" />}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="name@example.com"
          icon={<Mail className="h-4 w-4" />}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          icon={<Lock className="h-4 w-4" />}
          required
        />
        <Button type="submit" className="w-full" size="lg">
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
