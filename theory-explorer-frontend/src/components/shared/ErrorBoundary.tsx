import { Component, type ReactNode, type ErrorInfo } from "react"
import { Button } from "@/components/ui/Button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-50">
            <AlertTriangle className="h-6 w-6 text-danger-500" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p className="mt-1 text-sm text-gray-500 max-w-sm">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {this.state.error?.message && (
            <p className="mt-2 max-w-md text-xs text-gray-400 font-mono bg-gray-50 rounded-lg p-2">
              {this.state.error.message}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" /> Refresh Page
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
