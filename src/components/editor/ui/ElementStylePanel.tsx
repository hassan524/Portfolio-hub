import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sliders,
  Trash2,
  Eye,
  EyeOff,
  PanelLeft,
  RotateCcw,
  Wand2,
  Sparkles,
  Zap,
  MousePointer,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";
import type { Theme } from "@/types/builder.schema";
import { isHexColor, to6DigitHex } from "@/lib/functions/template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  edit: PreviewElementEdit | null;
  theme?: Theme;
  onThemeChange?: (patch: Partial<Theme>) => void;
  onChange: (patch: Partial<PreviewElementStyle>) => void;
  onRemove: () => void;
  onReset: () => void;
  onClose: () => void;
};

const FONT_FAMILIES = [
  { label: "Default Theme Font", value: "inherit" },
  { label: "Inter (Sans-Serif)", value: "'Inter', sans-serif" },
  { label: "Outfit (Modern)", value: "'Outfit', sans-serif" },
  { label: "Roboto (Clean)", value: "'Roboto', sans-serif" },
  { label: "Playfair Display (Serif)", value: "'Playfair Display', serif" },
  { label: "Space Grotesk (Tech)", value: "'Space Grotesk', sans-serif" },
  { label: "Fira Code (Monospace)", value: "'Fira Code', monospace" },
];

const GRADIENT_PRESETS = [
  { name: "Solid / None", value: "" },
  { name: "Emerald Mint", value: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { name: "Cyber Neon", value: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" },
  { name: "Sunset Glow", value: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)" },
  { name: "Ocean Breeze", value: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)" },
  { name: "Dark Slate", value: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" },
  { name: "Cosmic Sunset", value: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)" },
];

const SHADOW_PRESETS = [
  { name: "None", value: "none" },
  { name: "Emerald Accent Glow", value: "0 0 25px rgba(16, 185, 129, 0.5)" },
  { name: "Soft Elevation", value: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)" },
  { name: "Medium Lift", value: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" },
  { name: "Heavy Drop Shadow", value: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)" },
  { name: "Rose Glow", value: "0 0 25px rgba(244, 63, 94, 0.5)" },
];

const SWATCHES = [
  "#f43f5e", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#ffffff", "#a1a1aa", "#52525b", "#000000",
];

const fieldClass =
  "h-7 px-2.5 cursor-pointer border-border bg-background text-[11px] font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-1";

/* ---------------------------------- color math ---------------------------------- */

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const int = parseInt(full || "000000", 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function buildGradient(angle: number, colorA: string, colorB: string) {
  return `linear-gradient(${Math.round(angle)}deg, ${colorA} 0%, ${colorB} 100%)`;
}

function parseGradient(css: string) {
  const angleMatch = css.match(/(-?\d+(\.\d+)?)deg/);
  const colors = css.match(/#[0-9a-fA-F]{3,8}/g) || [];
  return {
    angle: angleMatch ? parseFloat(angleMatch[1]) : 135,
    colorA: colors[0] || "#10b981",
    colorB: colors[colors.length - 1] || "#059669",
  };
}

/* ---------------------------------- color picker ---------------------------------- */
/* Theme-color swatch row removed — theme colors now live in the dedicated
   "Website Theme" section in the Fill tab, so ColorPicker no longer needs
   a themeColors prop. */

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
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

  const applyHsv = (nh: number, ns: number, nv: number) => {
    const { r, g, b } = hsvToRgb(nh, ns, nv);
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

  const dragSv = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = svRef.current;
    if (!el) return;
    const move = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const ns = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const nv = 1 - Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      setSat(ns);
      setVal(nv);
      applyHsv(hue, ns, nv);
    };
    move(e.clientX, e.clientY);
    const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const dragHue = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = hueRef.current;
    if (!el) return;
    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const nh = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 360;
      setHue(nh);
      applyHsv(nh, sat, val);
    };
    move(e.clientX);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">{label}</Label>
        <span className="font-mono text-[10px] text-muted-foreground/50">{value.toUpperCase()}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {/* Custom Color Trigger Button with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="h-5 w-5 shrink-0 rounded-full border border-border cursor-pointer relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:scale-105 transition-transform"
              title="Custom Color"
              style={{
                background: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red)",
              }}
            >
              <div
                className="absolute inset-[2px] rounded-full border border-black/10 bg-background"
                style={{ backgroundColor: hexInput }}
              />
            </button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-56 space-y-2 border-border bg-surface p-2.5 z-50">
            <div
              ref={svRef}
              onPointerDown={dragSv}
              className="relative h-28 w-full cursor-crosshair select-none rounded-md"
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
              className="relative h-2.5 w-full cursor-pointer select-none rounded-full"
              style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
            >
              <div
                className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
                style={{ left: `${(hue / 360) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 shrink-0 rounded border border-border" style={{ backgroundColor: hexInput }} />
              <Input
                value={hexInput}
                onChange={(e) => {
                  const next = e.target.value;
                  setHexInput(next);
                  if (isHexColor(next)) applyHex(to6DigitHex(next));
                }}
                className="h-6 px-1.5 border-border bg-background font-mono text-[10px] uppercase text-foreground focus-visible:ring-ring focus-visible:ring-1"
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Inline Swatches */}
        {SWATCHES.map((swatch) => {
          const isSelected = swatch.toLowerCase() === value.toLowerCase();
          return (
            <button
              key={swatch}
              type="button"
              onClick={() => applyHex(swatch)}
              className={`h-5 w-5 rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center ${
                isSelected
                  ? "ring-1.5 ring-foreground ring-offset-1.5 ring-offset-background"
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

/* ---------------------------------- small field helpers ---------------------------------- */

function NumberField({
  label, value, min, max, step = 1, unit, onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string;
  onChange: (value: number) => void;
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const bump = (delta: number) => onChange(Math.round((clamp(value + delta)) * 100) / 100);

  return (
    <div className="space-y-1">
      <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">{label}</Label>
      <div className="flex h-7 items-center rounded-md border border-border bg-background pl-2.5 pr-1 focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-ring">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(clamp(n));
          }}
          className="h-full w-full min-w-0 bg-transparent text-[11px] font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {unit && <span className="mr-1 text-[10px] text-muted-foreground/50">{unit}</span>}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => bump(step)}
            className="grid h-3 w-3.5 cursor-pointer place-items-center text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            <ChevronUp className="h-2.5 w-2.5" />
          </button>
          <button
            type="button"
            onClick={() => bump(-step)}
            className="grid h-3 w-3.5 cursor-pointer place-items-center text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label, value, min, max, step = 1, unit = "", onChange,
}: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">{label}</Label>
        <span className="font-mono text-[10px] text-muted-foreground/50">{value}{unit}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        className="cursor-pointer [&_[data-slot=slider-thumb]]:cursor-pointer"
      />
    </div>
  );
}

function TextField({
  label, value, placeholder, onChange, onKeyDown,
}: {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">{label}</Label>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="h-7 px-2.5 border-border bg-background text-[11px] font-medium text-foreground focus-visible:ring-ring focus-visible:ring-1"
      />
    </div>
  );
}

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.18, ease: "easeOut" as const, delay },
  };
}

/* ---------------------------------- main panel ---------------------------------- */

export function ElementStylePanel({ edit, theme, onThemeChange, onChange, onRemove, onReset, onClose }: Props) {
  if (!edit) return null;

  const style = edit.style;
  const isHidden = Boolean(style.removed);
  const gradient = parseGradient(style.backgroundGradient || "");

  const dynamicFontFamilies = [
    { label: "Default Theme Font", value: "inherit" },
    ...(theme?.fontHeading ? [{ label: `Theme Heading (${theme.fontHeading})`, value: theme.fontHeading }] : []),
    ...(theme?.fontBody ? [{ label: `Theme Body (${theme.fontBody})`, value: theme.fontBody }] : []),
    { label: "Inter (Sans-Serif)", value: "'Inter', sans-serif" },
    { label: "Outfit (Modern)", value: "'Outfit', sans-serif" },
    { label: "Roboto (Clean)", value: "'Roboto', sans-serif" },
    { label: "Playfair Display (Serif)", value: "'Playfair Display', serif" },
    { label: "Space Grotesk (Tech)", value: "'Space Grotesk', sans-serif" },
    { label: "Fira Code (Monospace)", value: "'Fira Code', monospace" },
  ];

  const formatValues = [
    style.bold ? "bold" : "",
    style.italic ? "italic" : "",
    style.underline ? "underline" : "",
    style.strikethrough ? "strike" : "",
  ].filter(Boolean);

  return (
    <aside className="flex h-full w-[310px] shrink-0 select-none flex-col overflow-hidden border border-border rounded-2xl bg-surface text-foreground shadow-sm">
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3.5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-background border border-border">
            <Sliders className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[11px] font-semibold text-foreground">Style Editor</span>
            <span className="truncate text-[9px] text-muted-foreground/70">Selected element</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            title="Reset style"
            className="h-7 w-7 cursor-pointer text-muted-foreground hover:bg-background hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Close editor"
            className="h-7 w-7 cursor-pointer text-muted-foreground hover:bg-background hover:text-foreground"
          >
            <PanelLeft className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text" className="flex min-h-0 flex-1 flex-col gap-0">
        <TabsList className="w-full h-8 shrink-0 grid grid-cols-5 border-b border-border bg-background/30 p-0 rounded-none">
          <TabsTrigger
            value="text"
            className="cursor-pointer rounded-none border-b border-transparent text-[10.5px] font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all py-1.5"
          >
            Text
          </TabsTrigger>
          <TabsTrigger
            value="fill"
            className="cursor-pointer rounded-none border-b border-transparent text-[10.5px] font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all py-1.5"
          >
            Fill
          </TabsTrigger>
          <TabsTrigger
            value="border"
            className="cursor-pointer rounded-none border-b border-transparent text-[10.5px] font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all py-1.5"
          >
            Border
          </TabsTrigger>
          <TabsTrigger
            value="fx"
            className="cursor-pointer rounded-none border-b border-transparent text-[10.5px] font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all py-1.5"
          >
            Effects
          </TabsTrigger>
          <TabsTrigger
            value="layout"
            className="cursor-pointer rounded-none border-b border-transparent text-[10.5px] font-medium text-muted-foreground data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none transition-all py-1.5"
          >
            Layout
          </TabsTrigger>
        </TabsList>

        <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-4 simple-scrollbar">
          {/* Text */}
          <TabsContent value="text" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="grid grid-cols-[1fr_80px] gap-2">
                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Font Family</Label>
                  <Select value={style.fontFamily ?? "inherit"} onValueChange={(fontFamily) => onChange({ fontFamily })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {dynamicFontFamilies.map((font) => (
                        <SelectItem key={font.value} value={font.value} className="cursor-pointer">{font.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <NumberField label="Size" value={style.fontSize ?? 16} min={8} max={140} onChange={(fontSize) => onChange({ fontSize })} />
              </div>

              <SliderField label="Line Height" value={style.lineHeight ?? 1.5} min={0.8} max={3} step={0.1} onChange={(lineHeight) => onChange({ lineHeight })} />
              <SliderField label="Letter Spacing" value={style.letterSpacing ?? 0} min={-5} max={20} step={0.5} unit="px" onChange={(letterSpacing) => onChange({ letterSpacing })} />

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Formatting</Label>
                  <ToggleGroup
                    type="multiple"
                    value={formatValues}
                    onValueChange={(v) => onChange({
                      bold: v.includes("bold"),
                      italic: v.includes("italic"),
                      underline: v.includes("underline"),
                      strikethrough: v.includes("strike"),
                    })}
                    className="inline-flex w-full gap-0.5 rounded-md border border-border p-0.5 bg-background h-7"
                  >
                    <ToggleGroupItem value="bold" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><Bold className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="italic" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><Italic className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="underline" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><Underline className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="strike" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><Strikethrough className="h-3 w-3" /></ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Alignment</Label>
                  <ToggleGroup
                    type="single"
                    value={style.textAlign ?? "left"}
                    onValueChange={(v) => v && onChange({ textAlign: v as PreviewElementStyle["textAlign"] })}
                    className="inline-flex w-full gap-0.5 rounded-md border border-border p-0.5 bg-background h-7"
                  >
                    <ToggleGroupItem value="left" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><AlignLeft className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="center" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><AlignCenter className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="right" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><AlignRight className="h-3 w-3" /></ToggleGroupItem>
                    <ToggleGroupItem value="justify" className="h-full flex-1 rounded-sm cursor-pointer data-[state=on]:bg-accent data-[state=on]:text-accent-foreground p-0"><AlignJustify className="h-3 w-3" /></ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              <ColorPicker label="Text Color" value={style.color ?? "#ffffff"} onChange={(color) => onChange({ color })} />
            </motion.div>
          </TabsContent>

          {/* Fill */}
          <TabsContent value="fill" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">

              {/* Website Theme — moved here from the sidebar's old Theme tab */}
              {theme && onThemeChange && (
                <>
                  <div className="space-y-3 rounded-md border border-border bg-background/50 p-2.5">
                    <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">
                      Website Theme
                    </Label>

                    <ColorPicker
                      label="Background"
                      value={theme.bg ?? "#ffffff"}
                      onChange={(bg) => onThemeChange({ bg })}
                    />
                    <ColorPicker
                      label="Text"
                      value={theme.ink ?? "#000000"}
                      onChange={(ink) => onThemeChange({ ink })}
                    />
                    <ColorPicker
                      label="Accent"
                      value={theme.accent ?? "#000000"}
                      onChange={(accent) => onThemeChange({ accent })}
                    />
                    {theme.accent2 !== undefined && (
                      <ColorPicker
                        label="Accent 2"
                        value={theme.accent2 ?? "#000000"}
                        onChange={(accent2) => onThemeChange({ accent2 })}
                      />
                    )}
                    {theme.surface !== undefined && (
                      <ColorPicker
                        label="Surface"
                        value={theme.surface ?? "#ffffff"}
                        onChange={(surface) => onThemeChange({ surface })}
                      />
                    )}

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">
                          Spacing
                        </Label>
                        <Select
                          value={String(theme.spacing ?? "cozy")}
                          onValueChange={(spacing) => onThemeChange({ spacing } as Partial<Theme>)}
                        >
                          <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact" className="cursor-pointer">Compact</SelectItem>
                            <SelectItem value="cozy" className="cursor-pointer">Cozy</SelectItem>
                            <SelectItem value="airy" className="cursor-pointer">Airy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">
                          Heading Font
                        </Label>
                        <Input
                          value={String(theme.fontHeading ?? "")}
                          onChange={(e) => onThemeChange({ fontHeading: e.target.value })}
                          className="h-7 px-2.5 border-border bg-background text-[11px] font-medium text-foreground focus-visible:ring-ring focus-visible:ring-1 cursor-text"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">
                        Body Font
                      </Label>
                      <Input
                        value={String(theme.fontBody ?? "")}
                        onChange={(e) => onThemeChange({ fontBody: e.target.value })}
                        className="h-7 px-2.5 border-border bg-background text-[11px] font-medium text-foreground focus-visible:ring-ring focus-visible:ring-1 cursor-text"
                      />
                    </div>
                  </div>

                  <Separator className="bg-border" />
                </>
              )}

              <ColorPicker label="Background Color" value={style.backgroundColor ?? "#000000"} onChange={(backgroundColor) => onChange({ backgroundColor })} />

              <div className="space-y-1">
                <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Background Gradient</Label>
                <Select value={style.backgroundGradient || "none"} onValueChange={(v) => onChange({ backgroundGradient: v === "none" ? "" : v })}>
                  <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GRADIENT_PRESETS.map((grad) => (
                      <SelectItem key={grad.name} value={grad.value || "none"} className="cursor-pointer">{grad.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {style.backgroundGradient ? (
                <div className="space-y-3 rounded-md border border-border bg-background/50 p-2.5">
                  <SliderField
                    label="Angle"
                    value={gradient.angle}
                    min={0}
                    max={360}
                    unit="°"
                    onChange={(angle) => onChange({ backgroundGradient: buildGradient(angle, gradient.colorA, gradient.colorB) })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <ColorPicker
                      label="Color A"
                      value={gradient.colorA}
                      onChange={(colorA) => onChange({ backgroundGradient: buildGradient(gradient.angle, colorA, gradient.colorB) })}
                    />
                    <ColorPicker
                      label="Color B"
                      value={gradient.colorB}
                      onChange={(colorB) => onChange({ backgroundGradient: buildGradient(gradient.angle, gradient.colorA, colorB) })}
                    />
                  </div>
                </div>
              ) : null}

              <SliderField
                label="Opacity"
                value={Math.round((style.opacity ?? 1) * 100)}
                min={0}
                max={100}
                unit="%"
                onChange={(v) => onChange({ opacity: v / 100 })}
              />
            </motion.div>
          </TabsContent>

          {/* Border */}
          <TabsContent value="border" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <NumberField label="Corner Radius" value={style.borderRadius ?? 0} min={0} max={120} onChange={(borderRadius) => onChange({ borderRadius })} />
                <NumberField label="Border Width" value={style.borderWidth ?? 0} min={0} max={20} onChange={(borderWidth) => onChange({ borderWidth })} />
              </div>

              <div className="space-y-1">
                <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Border Style</Label>
                <Select value={style.borderStyle ?? "solid"} onValueChange={(borderStyle) => onChange({ borderStyle: borderStyle as PreviewElementStyle["borderStyle"] })}>
                  <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid" className="cursor-pointer">Solid</SelectItem>
                    <SelectItem value="dashed" className="cursor-pointer">Dashed</SelectItem>
                    <SelectItem value="dotted" className="cursor-pointer">Dotted</SelectItem>
                    <SelectItem value="none" className="cursor-pointer">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ColorPicker label="Border Color" value={style.borderColor ?? "#ffffff"} onChange={(borderColor) => onChange({ borderColor })} />
            </motion.div>
          </TabsContent>

          {/* Effects */}
          <TabsContent value="fx" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-1">
                <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Box Shadow</Label>
                <Select value={style.boxShadow ?? "none"} onValueChange={(boxShadow) => onChange({ boxShadow })}>
                  <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SHADOW_PRESETS.map((shadow) => (
                      <SelectItem key={shadow.name} value={shadow.value} className="cursor-pointer">{shadow.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <SliderField label="Backdrop Blur" value={style.backdropBlur ?? 0} min={0} max={30} onChange={(backdropBlur) => onChange({ backdropBlur })} />

              <Separator className="bg-border" />

              <div className="space-y-2">
                <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Toggle
                    pressed={Boolean(style.glassmorphism)}
                    onPressedChange={(p) => onChange({ glassmorphism: p })}
                    className="h-7 cursor-pointer justify-start gap-1.5 border border-border bg-background text-[11px] text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground px-2"
                  >
                    <Wand2 className="h-3 w-3" /> Glass Card
                  </Toggle>
                  <Toggle
                    pressed={Boolean(style.gradientText)}
                    onPressedChange={(p) => onChange({ gradientText: p })}
                    className="h-7 cursor-pointer justify-start gap-1.5 border border-border bg-background text-[11px] text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground px-2"
                  >
                    <Sparkles className="h-3 w-3" /> Gradient Text
                  </Toggle>
                  <Toggle
                    pressed={Boolean(style.glowAccent)}
                    onPressedChange={(p) => onChange({ glowAccent: p })}
                    className="h-7 cursor-pointer justify-start gap-1.5 border border-border bg-background text-[11px] text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground px-2"
                  >
                    <Zap className="h-3 w-3" /> Neon Glow
                  </Toggle>
                  <Toggle
                    pressed={Boolean(style.hoverLift)}
                    onPressedChange={(p) => onChange({ hoverLift: p })}
                    className="h-7 cursor-pointer justify-start gap-1.5 border border-border bg-background text-[11px] text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground px-2"
                  >
                    <MousePointer className="h-3 w-3" /> Hover Lift
                  </Toggle>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Layout */}
          <TabsContent value="layout" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <NumberField label="Padding" value={style.padding ?? 0} min={0} max={120} onChange={(padding) => onChange({ padding })} />
                <NumberField label="Margin" value={style.margin ?? 0} min={-60} max={120} onChange={(margin) => onChange({ margin })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="Width"
                  value={style.width !== undefined ? (style.width ?? "") : (edit.computedWidth ?? "")}
                  placeholder={edit.computedWidth ? `auto (${edit.computedWidth})` : "auto / 100%"}
                  onChange={(width) => onChange({ width })}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                      e.preventDefault();
                      const currentVal = style.width !== undefined ? (style.width ?? "") : (edit.computedWidth ?? "");
                      const match = currentVal.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
                      if (match) {
                        const num = parseFloat(match[1]);
                        const unit = match[2] || "px";
                        const step = e.shiftKey ? 10 : 1;
                        const nextNum = e.key === "ArrowUp" ? num + step : Math.max(0, num - step);
                        onChange({ width: `${nextNum}${unit}` });
                      } else {
                        onChange({ width: e.key === "ArrowUp" ? "10px" : "0px" });
                      }
                    }
                  }}
                />
                <TextField
                  label="Height"
                  value={style.height !== undefined ? (style.height ?? "") : (edit.computedHeight ?? "")}
                  placeholder={edit.computedHeight ? `auto (${edit.computedHeight})` : "auto / 300px"}
                  onChange={(height) => onChange({ height })}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                      e.preventDefault();
                      const currentVal = style.height !== undefined ? (style.height ?? "") : (edit.computedHeight ?? "");
                      const match = currentVal.trim().match(/^(\d+(?:\.\d+)?)(.*)$/);
                      if (match) {
                        const num = parseFloat(match[1]);
                        const unit = match[2] || "px";
                        const step = e.shiftKey ? 10 : 1;
                        const nextNum = e.key === "ArrowUp" ? num + step : Math.max(0, num - step);
                        onChange({ height: `${nextNum}${unit}` });
                      } else {
                        onChange({ height: e.key === "ArrowUp" ? "10px" : "0px" });
                      }
                    }
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <NumberField label="Z-Index" value={style.zIndex ?? 0} min={-10} max={1000} step={5} onChange={(zIndex) => onChange({ zIndex })} />
                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Display</Label>
                  <Select value={style.display || "default"} onValueChange={(v) => onChange({ display: v === "default" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default" className="cursor-pointer">Default</SelectItem>
                      <SelectItem value="block" className="cursor-pointer">Block</SelectItem>
                      <SelectItem value="inline-block" className="cursor-pointer">Inline Block</SelectItem>
                      <SelectItem value="flex" className="cursor-pointer">Flex</SelectItem>
                      <SelectItem value="grid" className="cursor-pointer">Grid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Cursor</Label>
                  <Select value={style.cursor || "default"} onValueChange={(v) => onChange({ cursor: v === "default" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default" className="cursor-pointer">Default</SelectItem>
                      <SelectItem value="pointer" className="cursor-pointer">Pointer</SelectItem>
                      <SelectItem value="text" className="cursor-pointer">Text</SelectItem>
                      <SelectItem value="grab" className="cursor-pointer">Grab</SelectItem>
                      <SelectItem value="not-allowed" className="cursor-pointer">Not Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground/80">Overflow</Label>
                  <Select value={style.overflow || "visible"} onValueChange={(v) => onChange({ overflow: v as PreviewElementStyle["overflow"] })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visible" className="cursor-pointer">Visible</SelectItem>
                      <SelectItem value="hidden" className="cursor-pointer">Hidden</SelectItem>
                      <SelectItem value="auto" className="cursor-pointer">Auto</SelectItem>
                      <SelectItem value="scroll" className="cursor-pointer">Scroll</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border" />

              <div className="flex items-center justify-between rounded-md border border-border bg-background p-2.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-foreground">Priority Override</span>
                    <span className="text-[9px] text-muted-foreground/60">Apply as !important</span>
                  </div>
                </div>
                <Switch
                  checked={Boolean(style.isImportant)}
                  onCheckedChange={(isImportant) => onChange({ isImportant })}
                  className="scale-90 cursor-pointer"
                />
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border p-3">
        <Button
          variant="outline"
          onClick={() => onChange({ removed: !isHidden })}
          className="h-7.5 flex-1 cursor-pointer gap-1.5 border-border bg-background text-[11px] text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          {isHidden ? "Show" : "Hide"}
        </Button>
        <Button
          variant="outline"
          onClick={onRemove}
          className="h-7.5 flex-1 cursor-pointer gap-1.5 border-rose-500/20 bg-rose-500/10 text-[11px] text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </Button>
      </div>
    </aside>
  );
}