import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "select-none",

          variant === "primary" &&
            "bg-primary-600 text-white shadow-xs hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-primary-500",
          variant === "secondary" &&
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus-visible:outline-gray-400",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-gray-400",
          variant === "ghost" &&
            "text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus-visible:outline-gray-400",
          variant === "danger" &&
            "bg-danger-600 text-white shadow-xs hover:bg-danger-700 active:bg-danger-800 focus-visible:outline-danger-500",

          size === "sm" && "h-8 px-3 text-xs rounded-md",
          size === "md" && "h-10 px-4 text-sm rounded-lg",
          size === "lg" && "h-12 px-6 text-base rounded-lg",

          className,
        )}
        {...props}
      >
        {loading ? (
          <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button }
