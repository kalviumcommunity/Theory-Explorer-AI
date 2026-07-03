import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "accent"
  size?: "sm" | "md"
}

function Badge({ className, variant = "default", size = "sm", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-2.5 py-1 text-sm",
        variant === "default" && "bg-gray-100 text-gray-700",
        variant === "primary" && "bg-primary-50 text-primary-700",
        variant === "success" && "bg-success-50 text-success-700",
        variant === "warning" && "bg-warning-50 text-warning-700",
        variant === "danger" && "bg-danger-50 text-danger-700",
        variant === "accent" && "bg-accent-50 text-accent-700",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
