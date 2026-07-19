import React, { type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-350 cursor-pointer shadow-soft hover:shadow-lift active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const variantStyles = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary: "border border-border bg-surface-elevated text-foreground hover:bg-secondary hover:border-foreground/20",
    danger: "border border-red-200 text-red-650 bg-surface-elevated hover:bg-red-500/5 hover:border-red-300",
  };

  const sizeStyles = {
    sm: "rounded-lg px-3.5 py-2 text-xs",
    md: "rounded-full px-5 py-3 text-sm",
    lg: "rounded-full px-6 py-3.5 text-base",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {!loading && icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
