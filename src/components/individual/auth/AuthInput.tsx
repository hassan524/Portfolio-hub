import * as React from "react";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.ComponentProps<typeof Input> {
  icon?: React.ReactNode;
  error?: string;
  endAdornment?: React.ReactNode;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon, error, endAdornment, ...props }, ref) => (
    <>
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-3 text-ink-soft">
            {icon}
          </span>
        )}
        <Input
          ref={ref}
          {...props}
          aria-invalid={!!error || props["aria-invalid"]}
          className={cn(
            "h-10 w-full rounded-md border bg-surface-elevated text-sm transition-all focus-visible:border-ring focus-visible:ring-1",
            icon ? "pl-9" : "pl-3",
            endAdornment ? "pr-9" : "pr-4",
            error
              ? "border-red-500/60 bg-red-500/5 focus-visible:ring-red-500/20"
              : "border-white/10 focus-visible:ring-foreground/15 focus-visible:border-white/20",
            className,
          )}
        />
        {endAdornment && (
          <span className="absolute right-0.5 flex items-center">
            {endAdornment}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-red-500">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </>
  ),
);

AuthInput.displayName = "AuthInput";

export { AuthInput };