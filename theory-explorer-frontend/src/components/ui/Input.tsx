import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900",
              "placeholder:text-gray-400",
              "transition-all duration-150",
              "focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none",
              "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
              error && "border-danger-500 focus:border-danger-500 focus:ring-danger-500",
              icon && "pl-10",
              className,
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-danger-600" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
