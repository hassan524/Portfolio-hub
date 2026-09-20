import { useEffect, useRef, useState, useMemo } from "react";
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
  ChevronUp,
  ChevronDown,
  MousePointerClick,
  PlayCircle,
  Square,
  Layers,
  Ban,
} from "lucide-react";
import type { PreviewElementEdit, PreviewElementStyle, ResponsiveBreakpoint } from "@/types/previewEditTypes";
import type { Theme } from "@/types/builder.schema";
import { isHexColor, to6DigitHex } from "@/lib/functions/template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
  responsiveEditMode?: boolean;
  editBreakpoint?: ResponsiveBreakpoint;
  onThemeChange?: (patch: Partial<Theme>) => void;
  onChange: (patch: Partial<PreviewElementStyle>) => void;
  onRemove: () => void;
  onReset: () => void;
  onClose: () => void;
};

const FONT_FAMILIES_STATIC = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Outfit", value: "'Outfit', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Fira Code", value: "'Fira Code', monospace" },
];

const GRADIENT_PRESETS = [
  { name: "None", value: "" },
  { name: "Emerald Mint", value: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { name: "Cyber Neon", value: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" },
  { name: "Sunset Glow", value: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)" },
  { name: "Ocean Breeze", value: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)" },
  { name: "Dark Slate", value: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" },
  { name: "Cosmic Sunset", value: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)" },
];

const DEPTH_PRESETS = [
  { name: "None", value: "none" },
  { name: "Soft", value: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)" },
  { name: "Medium", value: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" },
  { name: "Strong", value: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)" },
  { name: "Emerald Glow", value: "0 0 25px rgba(16, 185, 129, 0.5)" },
  { name: "Rose Glow", value: "0 0 25px rgba(244, 63, 94, 0.5)" },
];

const TEXT_SHADOW_PRESETS = [
  { name: "None", value: "" },
  { name: "Soft", value: "1px 1px 2px rgba(0,0,0,0.35)" },
  { name: "Medium", value: "2px 2px 4px rgba(0,0,0,0.5)" },
  { name: "Strong", value: "3px 3px 6px rgba(0,0,0,0.7)" },
  { name: "Glow", value: "0 0 8px rgba(255,255,255,0.8)" },
];

const HOVER_EFFECT_OPTIONS: { value: NonNullable<PreviewElementStyle["hoverEffect"]>; label: string }[] = [
  { value: "none", label: "None" },
  { value: "grow", label: "Grow" },
  { value: "lift", label: "Lift" },
  { value: "glow", label: "Glow" },
  { value: "darken", label: "Darken" },
];

const ENTRANCE_OPTIONS: { value: NonNullable<PreviewElementStyle["entrance"]>; label: string }[] = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade" },
  { value: "slideUp", label: "Slide Up" },
  { value: "zoom", label: "Zoom" },
];

type CardPreset = {
  key: string;
  name: string;
  icon: typeof Square;
  apply: Partial<PreviewElementStyle>;
};

const CARD_STYLE_PRESETS: CardPreset[] = [
  {
    key: "none",
    name: "None",
    icon: Ban,
    apply: {
      glassmorphism: false,
      backgroundColor: undefined,
      borderWidth: undefined,
      borderColor: undefined,
      boxShadow: "none",
    },
  },
  {
    key: "flat",
    name: "Flat",
    icon: Square,
    apply: { glassmorphism: false, backgroundColor: "#18181b", borderWidth: 0, boxShadow: "none" },
  },
  {
    key: "soft",
    name: "Soft",
    icon: Layers,
    apply: {
      glassmorphism: false,
      backgroundColor: "#18181b",
      borderWidth: 0,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.2)",
    },
  },
  { key: "glass", name: "Glass", icon: Wand2, apply: { glassmorphism: true } },
  {
    key: "outline",
    name: "Outline",
    icon: Square,
    apply: {
      glassmorphism: false,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#ffffff40",
      boxShadow: "none",
    },
  },
];

function activeCardStyleKey(style: PreviewElementStyle): string {
  for (const preset of CARD_STYLE_PRESETS) {
    if (preset.key === "none") continue;
    const matches = Object.entries(preset.apply).every(([k, v]) => {
      const current = (style as Record<string, unknown>)[k];
      return current === v || (v === undefined && (current === undefined || current === null));
    });
    if (matches) return preset.key;
  }
  return "none";
}

const SWATCHES = [
  "#f43f5e", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#ffffff", "#a1a1aa", "#52525b", "#000000",
];

const fieldClass =
  "h-8 px-2.5 cursor-pointer rounded-lg border border-border/80 bg-background text-[11px] font-medium text-foreground hover:border-foreground/30 focus-visible:ring-1 focus-visible:ring-ring transition-all";

const labelClass = "text-[10px] font-semibold text-muted-foreground leading-tight";

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
  else[r, g, b] = [c, 0, x];
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
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label className={labelClass}>{label}</Label>
        <span className="font-mono text-[9px] text-muted-foreground/50">{value.toUpperCase()}</span>
      </div>

      <div className="flex flex-wrap items-center gap-1">
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

          <PopoverContent align="start" className="w-52 space-y-2 border-border bg-surface p-2.5 z-[60]">
            <div
              ref={svRef}
              onPointerDown={dragSv}
              className="relative h-24 w-full cursor-crosshair select-none rounded-md"
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
      <Label className={labelClass}>{label}</Label>
      <div className="flex h-8 items-center rounded-lg border border-border/80 bg-background pl-2.5 pr-1 focus-within:border-foreground/30 focus-within:ring-1 focus-within:ring-ring transition-all">
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(clamp(n));
          }}
          className="h-full w-full min-w-0 bg-transparent text-[11px] font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {unit && <span className="mr-1 text-[10px] font-medium text-muted-foreground/60">{unit}</span>}
        <div className="flex flex-col">
          <button type="button" onClick={() => bump(step)} className="grid h-3.5 w-3.5 cursor-pointer place-items-center text-muted-foreground/60 hover:text-foreground">
            <ChevronUp className="h-2.5 w-2.5" />
          </button>
          <button type="button" onClick={() => bump(-step)} className="grid h-3.5 w-3.5 cursor-pointer place-items-center text-muted-foreground/60 hover:text-foreground">
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className={labelClass}>{label}</Label>
        <span className="font-mono text-[10px] text-muted-foreground/60 font-medium">{value}{unit}</span>
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
      <Label className={labelClass}>{label}</Label>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="h-8 px-2.5 rounded-lg border-border/80 bg-background text-[11px] font-medium text-foreground focus-visible:ring-ring focus-visible:ring-1 transition-all"
      />
    </div>
  );
}

function PresetRow<T extends string>({
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
        onValueChange={(v) => v && onChange(v as T)}
        className="inline-flex w-full gap-1 rounded-lg border border-border/70 p-1 bg-secondary/30 h-8"
      >
        {options.map((opt) => (
          <ToggleGroupItem
            key={opt.value}
            value={opt.value}
            className="h-full flex-1 rounded-md cursor-pointer text-[10px] font-medium data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all"
          >
            {opt.text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
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

const SPACING_MAP = { tight: 8, cozy: 16, roomy: 32 } as const;
type SpacingKey = keyof typeof SPACING_MAP;
function spacingKeyFromValue(padding: number | null | undefined): SpacingKey {
  if (padding === SPACING_MAP.tight) return "tight";
  if (padding === SPACING_MAP.roomy) return "roomy";
  return "cozy";
}

const CORNER_MAP = { sharp: 0, rounded: 12, pill: 999 } as const;
type CornerKey = keyof typeof CORNER_MAP;
function cornerKeyFromValue(radius: number | null | undefined): CornerKey {
  if (!radius) return "sharp";
  if (radius >= 100) return "pill";
  return "rounded";
}

/* ---------------------------------- main panel ---------------------------------- */

export function ElementStylePanel({
  edit,
  theme,
  responsiveEditMode,
  editBreakpoint,
  onChange,
  onRemove,
  onReset,
  onClose,
}: Props) {
  if (!edit) return null;

  const style = useMemo(() => {
    const base = { ...edit.style };
    if (editBreakpoint && edit.style.responsive?.[editBreakpoint]) {
      Object.assign(base, edit.style.responsive[editBreakpoint]);
    }
    return base;
  }, [edit.style, editBreakpoint]);
  const isHidden = Boolean(style.removed);
  const gradient = parseGradient(style.backgroundGradient || "");

  const dynamicFontFamilies = [
    { label: "Theme Default", value: "inherit" },
    ...(theme?.fontHeading ? [{ label: `Heading (${theme.fontHeading})`, value: theme.fontHeading }] : []),
    ...(theme?.fontBody ? [{ label: `Body (${theme.fontBody})`, value: theme.fontBody }] : []),
    ...FONT_FAMILIES_STATIC,
  ];

  const formatValues = [
    style.bold ? "bold" : "",
    style.italic ? "italic" : "",
    style.underline ? "underline" : "",
    style.strikethrough ? "strike" : "",
  ].filter(Boolean);

  const activeCard = activeCardStyleKey(style);

  return (
    <aside className="w-[320px] shrink-0 border-r border-border border-l text-sm flex flex-col h-full shadow-sm rounded-none bg-background select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header matching TemplateSidebar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4 bg-background/50">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary/80 border border-border/60 shadow-xs">
            <Sliders className="h-4 w-4 text-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold text-foreground">
              Element Style
            </span>
            <span className="truncate text-[10px] text-muted-foreground capitalize">
              {edit.blockKind ? `${edit.blockKind} section` : "Selected Element"}
              {responsiveEditMode && editBreakpoint ? ` · ${editBreakpoint}` : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            title="Reset Element Styles"
            className="h-7 w-7 rounded-lg cursor-pointer text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Back to Sidebar"
            className="h-7 w-7 rounded-lg cursor-pointer text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <PanelLeft className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text" className="flex min-h-0 flex-1 flex-col gap-0">
        <div className="px-3 py-2 shrink-0 border-b border-border/50 bg-background/30">
          <TabsList className="w-full h-8 grid grid-cols-5 gap-0.5 rounded-lg bg-secondary/50 border border-border/40 p-0.5">
            <TabsTrigger value="text" className="cursor-pointer rounded-md text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all">Text</TabsTrigger>
            <TabsTrigger value="fill" className="cursor-pointer rounded-md text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all">Fill</TabsTrigger>
            <TabsTrigger value="border" className="cursor-pointer rounded-md text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all">Border</TabsTrigger>
            <TabsTrigger value="fx" className="cursor-pointer rounded-md text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all">FX</TabsTrigger>
            <TabsTrigger value="layout" className="cursor-pointer rounded-md text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-xs transition-all">Layout</TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 simple-scrollbar">
          {/* Tab 1: Typography */}
          <TabsContent value="text" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-2.5">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Typography</div>
                <div className="grid grid-cols-[1fr_80px] gap-2">
                  <div className="space-y-1">
                    <Label className={labelClass}>Font Family</Label>
                    <Select value={style.fontFamily ?? "inherit"} onValueChange={(fontFamily) => onChange({ fontFamily })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {dynamicFontFamilies.map((font) => (
                          <SelectItem key={font.value} value={font.value} className="cursor-pointer text-[11px]">{font.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberField label="Font Size" value={style.fontSize ?? 16} min={8} max={140} unit="px" onChange={(fontSize) => onChange({ fontSize })} />
                </div>

                <div className="space-y-3 pt-1">
                  <SliderField label="Line Height" value={style.lineHeight ?? 1.5} min={0.8} max={3} step={0.1} onChange={(lineHeight) => onChange({ lineHeight })} />
                  <SliderField label="Letter Spacing" value={style.letterSpacing ?? 0} min={-5} max={20} step={0.5} unit="px" onChange={(letterSpacing) => onChange({ letterSpacing })} />
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Style & Alignment</div>
                <div className="space-y-1">
                  <Label className={labelClass}>Formatting</Label>
                  <ToggleGroup
                    type="multiple"
                    value={formatValues}
                    onValueChange={(v) => onChange({
                      bold: v.includes("bold"),
                      italic: v.includes("italic"),
                      underline: v.includes("underline"),
                      strikethrough: v.includes("strike"),
                    })}
                    className="inline-flex w-full gap-1 rounded-lg border border-border/70 p-1 bg-secondary/30 h-8"
                  >
                    <ToggleGroupItem value="bold" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Bold"><Bold className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="italic" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Italic"><Italic className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="underline" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Underline"><Underline className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="strike" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Strikethrough"><Strikethrough className="h-3.5 w-3.5" /></ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div className="space-y-1">
                  <Label className={labelClass}>Alignment</Label>
                  <ToggleGroup
                    type="single"
                    value={style.textAlign ?? "left"}
                    onValueChange={(v) => v && onChange({ textAlign: v as PreviewElementStyle["textAlign"] })}
                    className="inline-flex w-full gap-1 rounded-lg border border-border/70 p-1 bg-secondary/30 h-8"
                  >
                    <ToggleGroupItem value="left" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Align Left"><AlignLeft className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="center" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Align Center"><AlignCenter className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="right" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Align Right"><AlignRight className="h-3.5 w-3.5" /></ToggleGroupItem>
                    <ToggleGroupItem value="justify" className="h-full flex-1 rounded-md cursor-pointer data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs p-0 transition-all" title="Justify"><AlignJustify className="h-3.5 w-3.5" /></ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Color & Shadow</div>
                <ColorPicker label="Text Color" value={style.color ?? "#ffffff"} onChange={(color) => onChange({ color })} />

                <div className="space-y-1">
                  <Label className={labelClass}>Text Shadow</Label>
                  <Select value={style.textShadow || "none"} onValueChange={(v) => onChange({ textShadow: v === "none" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TEXT_SHADOW_PRESETS.map((preset) => (
                        <SelectItem key={preset.name} value={preset.value || "none"} className="cursor-pointer text-[11px]">{preset.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 2: Fill */}
          <TabsContent value="fill" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Background Color</div>
                <ColorPicker label="Color" value={style.backgroundColor ?? "#000000"} onChange={(backgroundColor) => onChange({ backgroundColor })} />
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Gradient Overlay</div>
                <div className="space-y-1">
                  <Label className={labelClass}>Preset</Label>
                  <Select value={style.backgroundGradient || "none"} onValueChange={(v) => onChange({ backgroundGradient: v === "none" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {GRADIENT_PRESETS.map((grad) => (
                        <SelectItem key={grad.name} value={grad.value || "none"} className="cursor-pointer text-[11px]">{grad.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {style.backgroundGradient ? (
                  <div className="space-y-3 rounded-lg border border-border/80 bg-secondary/20 p-3">
                    <SliderField label="Angle" value={gradient.angle} min={0} max={360} unit="°" onChange={(angle) => onChange({ backgroundGradient: buildGradient(angle, gradient.colorA, gradient.colorB) })} />
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <ColorPicker label="Stop A" value={gradient.colorA} onChange={(colorA) => onChange({ backgroundGradient: buildGradient(gradient.angle, colorA, gradient.colorB) })} />
                      <ColorPicker label="Stop B" value={gradient.colorB} onChange={(colorB) => onChange({ backgroundGradient: buildGradient(gradient.angle, gradient.colorA, colorB) })} />
                    </div>
                  </div>
                ) : null}
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Transparency</div>
                <SliderField label="Opacity" value={Math.round((style.opacity ?? 1) * 100)} min={0} max={100} unit="%" onChange={(v) => onChange({ opacity: v / 100 })} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 3: Border */}
          <TabsContent value="border" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Corners</div>
                <PresetRow<CornerKey>
                  label="Preset"
                  value={cornerKeyFromValue(style.borderRadius)}
                  options={[
                    { value: "sharp", text: "Sharp" },
                    { value: "rounded", text: "Rounded" },
                    { value: "pill", text: "Pill" },
                  ]}
                  onChange={(key) => onChange({ borderRadius: CORNER_MAP[key] })}
                />
                <NumberField label="Corner Radius" value={style.borderRadius ?? 0} min={0} max={120} unit="px" onChange={(borderRadius) => onChange({ borderRadius })} />
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Border Line</div>
                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="Thickness" value={style.borderWidth ?? 0} min={0} max={20} unit="px" onChange={(borderWidth) => onChange({ borderWidth })} />
                  <div className="space-y-1">
                    <Label className={labelClass}>Style</Label>
                    <Select value={style.borderStyle ?? "solid"} onValueChange={(borderStyle) => onChange({ borderStyle: borderStyle as PreviewElementStyle["borderStyle"] })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid" className="cursor-pointer text-[11px]">Solid</SelectItem>
                        <SelectItem value="dashed" className="cursor-pointer text-[11px]">Dashed</SelectItem>
                        <SelectItem value="dotted" className="cursor-pointer text-[11px]">Dotted</SelectItem>
                        <SelectItem value="none" className="cursor-pointer text-[11px]">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ColorPicker label="Border Color" value={style.borderColor ?? "#ffffff"} onChange={(borderColor) => onChange({ borderColor })} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 4: FX */}
          <TabsContent value="fx" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Card Presets</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CARD_STYLE_PRESETS.map((preset) => {
                    const Icon = preset.icon;
                    const isActive = activeCard === preset.key;
                    return (
                      <button
                        key={preset.key}
                        type="button"
                        onClick={() => onChange(preset.apply)}
                        className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-medium transition-all cursor-pointer ${isActive
                          ? "border-foreground bg-foreground text-background shadow-xs font-semibold"
                          : "border-border/70 bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Hover Effect</div>
                <ToggleGroup
                  type="single"
                  value={style.hoverEffect ?? "none"}
                  onValueChange={(v) => v && onChange({ hoverEffect: v as PreviewElementStyle["hoverEffect"] })}
                  className="grid grid-cols-3 gap-1"
                >
                  {HOVER_EFFECT_OPTIONS.map((opt) => (
                    <ToggleGroupItem
                      key={opt.value}
                      value={opt.value}
                      className={`h-7 rounded-lg border cursor-pointer text-[10px] font-medium data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs transition-all ${opt.value === "none" ? "border-dashed border-border/70 text-muted-foreground/70" : "border-border/80"
                        }`}
                    >
                      {opt.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Entrance Animation</div>
                <ToggleGroup
                  type="single"
                  value={style.entrance ?? "none"}
                  onValueChange={(v) => v && onChange({ entrance: v as PreviewElementStyle["entrance"] })}
                  className="grid grid-cols-2 gap-1"
                >
                  {ENTRANCE_OPTIONS.map((opt) => (
                    <ToggleGroupItem
                      key={opt.value}
                      value={opt.value}
                      className={`h-7 rounded-lg border cursor-pointer text-[10px] font-medium data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-xs transition-all ${opt.value === "none" ? "border-dashed border-border/70 text-muted-foreground/70" : "border-border/80"
                        }`}
                    >
                      {opt.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>

                {style.entrance && style.entrance !== "none" && (
                  <SliderField
                    label="Animation Duration"
                    value={style.entranceDuration ?? 0.6}
                    min={0.1}
                    max={2}
                    step={0.1}
                    unit="s"
                    onChange={(entranceDuration) => onChange({ entranceDuration })}
                  />
                )}
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 5: Layout */}
          <TabsContent value="layout" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Spacing</div>
                <PresetRow<SpacingKey>
                  label="Preset"
                  value={spacingKeyFromValue(style.padding)}
                  options={[
                    { value: "tight", text: "Tight" },
                    { value: "cozy", text: "Cozy" },
                    { value: "roomy", text: "Roomy" },
                  ]}
                  onChange={(key) => onChange({ padding: SPACING_MAP[key] })}
                />

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <NumberField label="Padding" value={style.padding ?? 0} min={0} max={120} unit="px" onChange={(padding) => onChange({ padding })} />
                  <NumberField label="Margin" value={style.margin ?? 0} min={-60} max={120} unit="px" onChange={(margin) => onChange({ margin })} />
                </div>
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Dimensions</div>
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Width"
                    value={style.width !== undefined ? (style.width ?? "") : (edit.computedWidth ?? "")}
                    placeholder={edit.computedWidth ? `auto (${edit.computedWidth})` : "auto"}
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
                    placeholder={edit.computedHeight ? `auto (${edit.computedHeight})` : "auto"}
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
              </div>

              <Separator className="bg-border/60" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-soft">Behavior</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className={labelClass}>Cursor</Label>
                    <Select value={style.cursor || "default"} onValueChange={(v) => onChange({ cursor: v === "default" ? "" : v })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default" className="cursor-pointer text-[11px]">Default</SelectItem>
                        <SelectItem value="pointer" className="cursor-pointer text-[11px]">Pointer</SelectItem>
                        <SelectItem value="text" className="cursor-pointer text-[11px]">Text</SelectItem>
                        <SelectItem value="grab" className="cursor-pointer text-[11px]">Grab</SelectItem>
                        <SelectItem value="not-allowed" className="cursor-pointer text-[11px]">Not Allowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelClass}>Overflow</Label>
                    <Select value={style.overflow || "visible"} onValueChange={(v) => onChange({ overflow: v as PreviewElementStyle["overflow"] })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visible" className="cursor-pointer text-[11px]">Visible</SelectItem>
                        <SelectItem value="hidden" className="cursor-pointer text-[11px]">Hidden</SelectItem>
                        <SelectItem value="auto" className="cursor-pointer text-[11px]">Auto</SelectItem>
                        <SelectItem value="scroll" className="cursor-pointer text-[11px]">Scroll</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-border/50 bg-background/50 p-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({ removed: !isHidden })}
          className="h-8 flex-1 cursor-pointer gap-1.5 border-border/80 bg-secondary/40 text-xs font-medium text-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors"
        >
          {isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          {isHidden ? "Show Element" : "Hide Element"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="h-8 flex-1 cursor-pointer gap-1.5 border-rose-500/30 bg-rose-500/10 text-xs font-medium text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </Button>
      </div>
    </aside>
  );
}