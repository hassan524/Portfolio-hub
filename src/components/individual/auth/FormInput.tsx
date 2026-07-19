import { type ReactNode } from "react";

interface FormInputProps {
  label: string;
  icon: ReactNode;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  labelAction?: ReactNode;
  trailingAction?: ReactNode;
  required?: boolean;
}

export function FormInput({ label, icon, type, placeholder, value, onChange, labelAction, trailingAction, required = true }: FormInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium text-ink-soft">{label}</label>
        {labelAction}
      </div>
      <div className="relative flex items-center">
        <span className="absolute left-3.5 text-ink-soft">{icon}</span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-border bg-surface-elevated pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
        {trailingAction && <span className="absolute right-3.5">{trailingAction}</span>}
      </div>
    </div>
  );
}