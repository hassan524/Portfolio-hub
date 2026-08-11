import {
  Bold,
  Italic,
  Minus,
  PaintBucket,
  Plus,
  RotateCcw,
  Trash2,
  Type,
  Underline,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import type { PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";
import { isHexColor, stepStepperValue } from "@/lib/functions/template";

type Props = {
  edit: PreviewElementEdit | null;
  onChange: (patch: Partial<PreviewElementStyle>) => void;
  onRemove: () => void;
  onReset: () => void;
  onClose: () => void;
};

const softInput =
  "h-7 w-full rounded-md border border-transparent bg-secondary/50 px-2 text-[11px] text-foreground outline-none transition focus:border-transparent focus:bg-background focus:ring-1 focus:ring-ring";

export function ElementStylePanel({ edit, onChange, onRemove, onReset, onClose }: Props) {
  if (!edit) return null;

  const style = edit.style;

  return (
    <aside className="w-[260px] shrink-0 bg-white text-sm">
      {/* Header — empty, same height/border as TemplateLivePreview's header */}
      <div className="flex h-12 shrink-0 items-center justify-end border-b border-border bg-background px-3">
        <button
          type="button"
          onClick={onClose}
          className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
          aria-label="Close element editor"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="h-[calc(100%-3rem)] overflow-y-auto px-3 py-3 [zoom:0.9]">
        {/* Style row: bold, italic, underline, text color, bg color */}
        <div className="flex items-center gap-0.5">
          <IconToggle active={Boolean(style.bold)} onClick={() => onChange({ bold: !style.bold })}>
            <Bold className="h-3 w-3" />
          </IconToggle>
          <IconToggle
            active={Boolean(style.italic)}
            onClick={() => onChange({ italic: !style.italic })}
          >
            <Italic className="h-3 w-3" />
          </IconToggle>
          <IconToggle
            active={Boolean(style.underline)}
            onClick={() => onChange({ underline: !style.underline })}
          >
            <Underline className="h-3 w-3" />
          </IconToggle>
          <ColorSwatch
            icon={<Type className="h-3 w-3" />}
            title="Text color"
            value={style.color ?? "#111111"}
            onChange={(color) => onChange({ color })}
          />
          <ColorSwatch
            icon={<PaintBucket className="h-3 w-3" />}
            title="Background"
            value={style.backgroundColor ?? "#ffffff"}
            onChange={(backgroundColor) => onChange({ backgroundColor })}
          />
          <div className="flex h-7 items-center rounded-md bg-secondary/50 pl-1.5 pr-1">
            <input
              type="number"
              min={8}
              max={128}
              value={style.fontSize ?? 16}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              className="h-full w-8 min-w-0 bg-transparent text-center text-[11px] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-[9px] text-ink-soft">px</span>
          </div>
        </div>

        {/* Radius / Padding / Width / Height */}
        <div className="mt-4 grid grid-cols-2 gap-1.5">
          <NumberStepperField
            label="Radius"
            value={style.borderRadius ?? 0}
            min={0}
            max={96}
            onChange={(borderRadius) => onChange({ borderRadius })}
          />
          <NumberStepperField
            label="Padding"
            value={style.padding ?? 0}
            min={0}
            max={96}
            onChange={(padding) => onChange({ padding })}
          />
          <TextField
            label="Width"
            value={style.width ?? ""}
            placeholder="auto"
            onChange={(width) => onChange({ width })}
          />
          <TextField
            label="Height"
            value={style.height ?? ""}
            placeholder="auto"
            onChange={(height) => onChange({ height })}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={onReset}
            className="flex h-7 cursor-pointer items-center justify-center gap-1 rounded-md text-[11px] font-medium text-ink-soft hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex h-7 cursor-pointer items-center justify-center gap-1 rounded-md text-[11px] font-medium text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3 w-3" />
            Remove
          </button>
        </div>
      </div>
    </aside>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block text-[9px] font-medium uppercase tracking-wide text-ink-soft">
      {children}
    </span>
  );
}

function IconToggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md transition ${
        active ? "bg-foreground text-background" : "text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

function ColorSwatch({
  icon,
  title,
  value,
  onChange,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label
      title={title}
      className="relative grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md text-foreground hover:bg-secondary"
    >
      {icon}
      <span
        className="pointer-events-none absolute bottom-0.5 left-1/2 h-1 w-3.5 -translate-x-1/2 rounded-full"
        style={{ backgroundColor: isHexColor(value) ? value : "#ffffff" }}
      />
      <input
        type="color"
        value={isHexColor(value) ? value : "#ffffff"}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </label>
  );
}

function NumberStepperField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block space-y-0.5">
      <FieldLabel>{label}</FieldLabel>
      <div className="flex h-7 items-center rounded-md bg-secondary/50 focus-within:bg-background focus-within:ring-1 focus-within:ring-ring">
        <button
          type="button"
          onClick={() => stepStepperValue(value, -1, min, max, onChange)}
          className="grid h-7 w-6 shrink-0 cursor-pointer place-items-center text-ink-soft hover:text-foreground"
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-2.5 w-2.5" />
        </button>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-full w-full min-w-0 bg-transparent text-center text-[11px] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => stepStepperValue(value, 1, min, max, onChange)}
          className="grid h-7 w-6 shrink-0 cursor-pointer place-items-center text-ink-soft hover:text-foreground"
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-2.5 w-2.5" />
        </button>
      </div>
    </label>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-0.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={softInput}
      />
    </label>
  );
}
