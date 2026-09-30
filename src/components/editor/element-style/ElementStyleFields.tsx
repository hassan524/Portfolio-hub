import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isHexColor, to6DigitHex } from "@/lib/functions/template";
import {
  SWATCHES,
  hexToRgb,
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
} from "@/lib/functions/elementStyle";

export const fieldClass =
  "h-8 px-2.5 cursor-pointer rounded-lg border border-white/15 bg-zinc-950 text-[11px] font-medium text-white hover:border-white/30 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:border-primary shadow-xs transition-all";

export const labelClass = "text-[10px] font-semibold text-zinc-400 leading-tight";

export function ColorPicker({
  id,
  label,
  value,
  isOpen = false,
  onOpenChange,
  onChange,
}: {
  id?: string;
  label: string;
  value: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange: (value: string) => void;
}) {
  const safeHex = isHexColor(value) ? to6DigitHex(value) : "#ffffff";
  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const start = rgbToHsv(hexToRgb(safeHex).r, hexToRgb(safeHex).g, hexToRgb(safeHex).b);
  const [hue, setHue] = useState(start.h);
  const [sat, setSat] = useState(start.s);
  const [val, setVal] = useState(start.v);
  const [hexInput, setHexInput] = useState(safeHex);

  useEffect(() => {
    if (!isHexColor(value)) return;
    const hex6 = to6DigitHex(value);
    if (hex6.toLowerCase() === hexInput.toLowerCase()) return;
    const { r, g, b } = hexToRgb(hex6);
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    setHexInput(hex6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isOpen || !onOpenChange) return;

    function handleCapturePointerDown(e: PointerEvent | MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest("[data-element-color-popover]") ||
        target.closest("[data-color-picker-trigger]")
      ) {
        return;
      }
      onOpenChange?.(false);
    }

    window.addEventListener("pointerdown", handleCapturePointerDown, true);
    return () => {
      window.removeEventListener("pointerdown", handleCapturePointerDown, true);
    };
  }, [isOpen, onOpenChange]);

  const applyHsv = (nextHue: number, nextSat: number, nextVal: number) => {
    const { r, g, b } = hsvToRgb(nextHue, nextSat, nextVal);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    onChange(hex);
  };

  const applyHex = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    setHexInput(hex);
    onChange(hex);
  };

  const dragSv = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = svRef.current;
    if (!el) return;

    const move = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const nextSat = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const nextVal = 1 - Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      setSat(nextSat);
      setVal(nextVal);
      applyHsv(hue, nextSat, nextVal);
    };

    move(event.clientX, event.clientY);
    const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const dragHue = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = hueRef.current;
    if (!el) return;

    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const nextHue = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 360;
      setHue(nextHue);
      applyHsv(nextHue, sat, val);
    };

    move(event.clientX);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const isTransparent = (value ?? "").toLowerCase() === "transparent";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className={labelClass}>{label}</Label>
        <span className="font-mono text-[9px] text-muted-foreground/50">
          {isTransparent ? "TRANSPARENT" : value ? value.toUpperCase() : "DEFAULT"}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1 mt-2">
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <button
              type="button"
              data-color-picker-trigger={id}
              className="h-5 w-5 shrink-0 rounded-full border border-border cursor-pointer relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:scale-105 transition-transform"
              title="Custom Color"
              style={{
                background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
              }}
            >
              <div
                className="absolute inset-[2px] rounded-full border border-black/10 bg-background"
                style={{
                  backgroundColor: isTransparent ? "transparent" : hexInput,
                  backgroundImage: isTransparent
                    ? "linear-gradient(45deg, #71717a 25%, transparent 25%), linear-gradient(-45deg, #71717a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #71717a 75%), linear-gradient(-45deg, transparent 75%, #71717a 75%)"
                    : undefined,
                  backgroundSize: "5px 5px",
                  backgroundPosition: "0 0, 0 2.5px, 2.5px -2.5px, -2.5px 0px",
                }}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            data-element-color-popover=""
            className="w-52 space-y-2 border border-border bg-popover p-2.5 z-[60] shadow-2xl rounded-xl"
          >
            <div
              ref={svRef}
              onPointerDown={dragSv}
              className="relative h-24 w-full cursor-crosshair select-none rounded-md border border-border"
              style={{
                backgroundColor: `hsl(${hue}, 100%, 50%)`,
                backgroundImage:
                  "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
              }}
            >
              <div
                className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
                style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
              />
            </div>

            <div
              ref={hueRef}
              onPointerDown={dragHue}
              className="relative h-2.5 w-full cursor-pointer select-none rounded-full border border-border"
              style={{
                background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
              }}
            >
              <div
                className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
                style={{ left: `${(hue / 360) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5">
              <div
                className="h-6 w-6 shrink-0 rounded border border-input relative overflow-hidden"
                style={{
                  backgroundColor: isTransparent ? "transparent" : hexInput,
                  backgroundImage: isTransparent
                    ? "linear-gradient(45deg, #71717a 25%, transparent 25%), linear-gradient(-45deg, #71717a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #71717a 75%), linear-gradient(-45deg, transparent 75%, #71717a 75%)"
                    : undefined,
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                }}
              />
              <Input
                value={hexInput}
                onChange={(event) => {
                  const next = event.target.value;
                  setHexInput(next);
                  if (isHexColor(next)) applyHex(to6DigitHex(next));
                }}
                className="h-6 px-1.5 border-input bg-secondary font-mono text-[10px] uppercase text-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/30"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                onChange("transparent");
                onOpenChange?.(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-md border border-border bg-secondary hover:bg-secondary/80 text-[10px] font-semibold text-foreground transition-colors cursor-pointer"
            >
              <div
                className="h-3.5 w-3.5 rounded-full relative overflow-hidden border border-border flex items-center justify-center shrink-0"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #71717a 25%, transparent 25%), linear-gradient(-45deg, #71717a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #71717a 75%), linear-gradient(-45deg, transparent 75%, #71717a 75%)",
                  backgroundSize: "4px 4px",
                  backgroundPosition: "0 0, 0 2px, 2px -2px, -2px 0px",
                  backgroundColor: "#222",
                }}
              >
                <div className="w-full h-[1px] bg-red-500 rotate-45" />
              </div>
              Transparent
            </button>
          </PopoverContent>
        </Popover>

        {/* Quick Transparent Swatch */}
        <button
          type="button"
          onClick={() => onChange("transparent")}
          className={`h-4.5 w-4.5 rounded-full cursor-pointer transition-all hover:scale-110 relative overflow-hidden flex items-center justify-center ${
            isTransparent
              ? "ring-1.5 ring-foreground ring-offset-1 ring-offset-background"
              : "border border-border/80"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(45deg, #71717a 25%, transparent 25%), linear-gradient(-45deg, #71717a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #71717a 75%), linear-gradient(-45deg, transparent 75%, #71717a 75%)",
            backgroundSize: "5px 5px",
            backgroundPosition: "0 0, 0 2.5px, 2.5px -2.5px, -2.5px 0px",
            backgroundColor: "#18181b",
          }}
          title="Transparent"
        >
          <div className="w-full h-[1.5px] bg-red-500 rotate-45" />
        </button>

        {SWATCHES.map((swatch) => {
          const isSelected = swatch.toLowerCase() === value.toLowerCase();
          return (
            <button
              key={swatch}
              type="button"
              onClick={() => applyHex(swatch)}
              className={`h-4.5 w-4.5 rounded-full cursor-pointer transition-all hover:scale-110 ${isSelected
                ? "ring-1.5 ring-foreground ring-offset-1 ring-offset-background"
                : "border border-border/80"
                }`}
              style={{ backgroundColor: swatch }}
              title={swatch}
            />
          );
        })}
      </div>
    </div>
  );
}

export function NumberField({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  const clamp = (nextValue: number) =>
    Math.min(max, Math.max(min, nextValue));

  const bump = (delta: number) =>
    onChange(Math.round(clamp(value + delta) * 100) / 100);

  return (
    <div className="space-y-1">
      {label && <Label className={labelClass}>{label}</Label>}

      <div className="flex h-8 items-center rounded-lg border border-white/15 bg-zinc-950 pl-2.5 pr-1 hover:border-white/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40 shadow-xs transition-all">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const nextValue = Number(event.target.value);

            if (!Number.isNaN(nextValue)) {
              onChange(clamp(nextValue));
            }
          }}
          className="h-full w-full min-w-0 bg-transparent text-[11px] font-medium text-white placeholder:text-zinc-600 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => bump(step)}
            className="grid h-2.5 w-2.5 cursor-pointer place-items-center text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronUp className="h-2.5 w-2.5" />
          </button>

          <button
            type="button"
            onClick={() => bump(-step)}
            className="grid h-2.5 w-2.5 cursor-pointer place-items-center text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex items-center justify-between">
          <Label className={labelClass}>{label}</Label>

          <span className="font-mono text-[10px] font-medium text-zinc-400">
            {value}
            {unit}
          </span>
        </div>
      )}

      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([nextValue]) => onChange(nextValue)}
        className="
          cursor-pointer
          [&_[data-slot=slider-track]]:h-1
          [&_[data-slot=slider-track]]:rounded-full
          [&_[data-slot=slider-track]]:bg-zinc-800
          [&_[data-slot=slider-range]]:h-1
          [&_[data-slot=slider-range]]:rounded-full
          [&_[data-slot=slider-range]]:bg-primary
          [&_[data-slot=slider-thumb]]:h-2
          [&_[data-slot=slider-thumb]]:w-2
          [&_[data-slot=slider-thumb]]:rounded-full
          [&_[data-slot=slider-thumb]]:border
          [&_[data-slot=slider-thumb]]:border-primary
          [&_[data-slot=slider-thumb]]:bg-white
          [&_[data-slot=slider-thumb]]:shadow-sm
          [&_[data-slot=slider-thumb]]:cursor-pointer
        "
      />
    </div>
  );
}

export function TextField({
  label,
  value,
  placeholder,
  onChange,
  onKeyDown,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className={labelClass}>{label}</Label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        className="h-8 w-full px-2.5 rounded-lg border border-white/15 bg-zinc-950 text-[11px] font-medium text-white placeholder:text-zinc-600 hover:border-white/30 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none shadow-xs transition-all"
      />
    </div>
  );
}

export function PresetRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; text: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className={labelClass}>{label}</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(nextValue) => nextValue && onChange(nextValue as T)}
        className="flex w-full h-8 !rounded-none !gap-0 !p-0 border border-white/10 bg-zinc-950 overflow-hidden"
      >
        {options.map((option, i) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className={`flex-1 min-w-0 flex items-center justify-center cursor-pointer !rounded-none !border-0 !shadow-none text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-white/5 data-[state=on]:bg-white/10 data-[state=on]:text-white ${i !== options.length - 1 ? "border-r border-white/10" : ""
              }`}
          >
            {option.text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export function DimensionField({
  label,
  value,
  defaultValue,
  onChange,
}: {
  label: string;
  value?: string | null;
  defaultValue?: string | null;
  onChange: (value: string | undefined) => void;
}) {
  const parsePx = (val?: string | null) => {
    if (!val) return null;
    const num = parseFloat(String(val).replace(/px/gi, "").trim());
    return typeof num === "number" && !isNaN(num) ? num : null;
  };

  const activeNum = parsePx(value) ?? parsePx(defaultValue);
  const displayVal = activeNum !== null ? String(Math.round(activeNum)) : "";

  const bump = (delta: number) => {
    const current = activeNum !== null ? activeNum : 0;
    const next = Math.max(0, Math.round(current + delta));
    onChange(`${next}px`);
  };

  return (
    <div className="space-y-1">
      {label && <Label className={labelClass}>{label}</Label>}

      <div className="flex h-8 items-center rounded-lg border border-white/15 bg-zinc-950 pl-2.5 pr-1 hover:border-white/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40 shadow-xs transition-all">
        <input
          type="number"
          value={displayVal}
          min={0}
          step={1}
          onChange={(event) => {
            const val = event.target.value.trim();
            if (val === "") {
              onChange(undefined);
            } else {
              const parsed = Number(val);
              if (!Number.isNaN(parsed)) {
                onChange(`${Math.max(0, Math.round(parsed))}px`);
              }
            }
          }}
          className="h-full w-full min-w-0 bg-transparent text-[11px] font-medium text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <span className="text-zinc-500 font-mono text-[10px] select-none pr-1">px</span>

        <div className="flex flex-col">
          <button
            type="button"
            onClick={(e) => bump(e.shiftKey ? 10 : 1)}
            className="grid h-2.5 w-2.5 cursor-pointer place-items-center text-zinc-400 transition-colors hover:text-white"
            title="Increase (+10 with Shift)"
          >
            <ChevronUp className="h-2.5 w-2.5" />
          </button>

          <button
            type="button"
            onClick={(e) => bump(e.shiftKey ? -10 : -1)}
            className="grid h-2.5 w-2.5 cursor-pointer place-items-center text-zinc-400 transition-colors hover:text-white"
            title="Decrease (-10 with Shift)"
          >
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}