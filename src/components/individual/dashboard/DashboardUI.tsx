import React, { type ReactNode } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export function DashboardInput({ label, value, onChange, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="text-xs font-bold text-ink">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: { value: string; label: string }[];
}

export function DashboardSelect({ label, value, onChange, options, className = "", ...props }: SelectProps) {
  return (
    <div>
      <label className="text-xs font-bold text-ink">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none transition-all ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export function DashboardTextarea({ label, value, onChange, className = "", ...props }: TextareaProps) {
  return (
    <div>
      <label className="text-xs font-bold text-ink">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
