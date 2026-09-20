import { useEffect, useRef, useState } from "react";
import type { SiteData, Theme } from "@/types/builder.schema";
import { isHexColor, to6DigitHex } from "@/lib/functions/template";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function formatThemeKeyLabel(key: string): { label: string; shortLabel: string } {
  const lower = key.toLowerCase();
  if (lower === "bg") return { label: "Background", shortLabel: "BG" };
  if (lower === "bg-second" || lower === "bgsecond") return { label: "Bg Second", shortLabel: "BG 2" };
  if (lower === "accent") return { label: "Accent", shortLabel: "Accent" };
  if (lower === "accent2") return { label: "Accent 2", shortLabel: "Accent 2" };
  if (lower === "surface") return { label: "Surface", shortLabel: "Surface" };
  if (lower === "ink") return { label: "Text", shortLabel: "Text" };
  if (lower === "ink-second" || lower === "inksecond") return { label: "Text Second", shortLabel: "Text 2" };

  const formatted = key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();

  const short = formatted.length > 8 ? formatted.slice(0, 7) + "…" : formatted;
  return { label: formatted, shortLabel: short };
}

export function ThemeCircleRow({
  theme,
  site,
  onThemeChange,
  showLabels = true,
}: {
  theme: Theme;
  site?: SiteData;
  onThemeChange?: (patch: Partial<Theme>) => void;
  showLabels?: boolean;
}) {
  const NON_COLOR_KEYS = new Set([
    "fontHeading",
    "fontBody",
    "corners",
    "spacing",
    "id",
    "name",
    "category",
  ]);

  const priorityOrder = ["bg", "bg-second", "accent", "surface", "accent2", "ink", "ink-second"];

  // Check if active website actually uses dual backgrounds (e.g. AIProduct 3)
  const usesDualBg = Boolean(
    site?.id === "startup-founder-paper-airy" ||
    site?.blocks?.some((b: any) => {
      const v = String(b?.props?.variant || "");
      return v === "AIProduct3About" || v === "AIProduct3" || v === "about-3";
    })
  );

  // Dynamically extract all color keys from the theme object that are actually used
  const colorKeys = Object.keys(theme || {})
    .filter((key) => {
      if (NON_COLOR_KEYS.has(key)) return false;
      const lower = key.toLowerCase();
      // If site does not use dual backgrounds, hide bg-second and ink-second
      if (!usesDualBg && (lower === "bg-second" || lower === "bgsecond" || lower === "ink-second" || lower === "inksecond")) {
        return false;
      }
      const val = (theme as Record<string, any>)[key];
      return (
        typeof val === "string" &&
        (isHexColor(val) || val.startsWith("#") || priorityOrder.includes(key))
      );
    })
    .sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

  return (
    <div className={showLabels ? "flex flex-wrap items-start gap-3" : "flex items-center gap-2"}>
      {colorKeys.map((key) => {
        const { label, shortLabel } = formatThemeKeyLabel(key);
        const raw = (theme as Record<string, any>)[key];
        const fallback = key === "bg" ? "#ffffff" : "#000000";
        const value = typeof raw === "string" && isHexColor(raw) ? raw : fallback;
        return (
          <ThemeCircle
            key={key}
            label={label}
            shortLabel={shortLabel}
            value={value}
            showLabel={showLabels}
            onChange={(next) => onThemeChange?.({ [key]: next } as Partial<Theme>)}
          />
        );
      })}
    </div>
  );
}

export function ThemeCircle({
  label,
  shortLabel,
  value,
  onChange,
  showLabel = true,
}: {
  label: string;
  shortLabel: string;
  value: string;
  onChange: (value: string) => void;
  showLabel?: boolean;
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
    <Popover>
      <PopoverTrigger asChild>
        {showLabel ? (
          <div className="flex w-12 flex-col items-center gap-1">
            <button
              type="button"
              aria-label={`${label} color`}
              className="group relative h-6 w-6 shrink-0 rounded-full cursor-pointer transition-all duration-200 ease-out hover:scale-[1.12] active:scale-95"
              style={{
                backgroundColor: value,
                boxShadow: `0 1px 2px rgba(0,0,0,0.15), 0 0 0 2px ${value}30, 0 0 8px 1px ${value}40`,
              }}
              title={`${label}: ${value}`}
            >
              <span className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-br from-white/40 via-white/5 to-black/10" />
              <span
                className="pointer-events-none absolute -inset-1.5 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-60"
                style={{ backgroundColor: value }}
              />
            </button>
            <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.08em] text-ink-soft">
              {shortLabel}
            </span>
          </div>
        ) : (
          <button
            type="button"
            aria-label={`${label} color`}
            className="group relative h-5 w-5 shrink-0 rounded-full cursor-pointer transition-all duration-200 ease-out hover:scale-110 active:scale-95 border border-border/60"
            style={{
              backgroundColor: value,
              boxShadow: `0 1px 3px rgba(0,0,0,0.25), 0 0 0 1.5px ${value}40`,
            }}
            title={`${label}: ${value}`}
          >
            <span className="pointer-events-none absolute inset-[0.5px] rounded-full bg-gradient-to-br from-white/40 via-white/5 to-black/10" />
            <span
              className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-50"
              style={{ backgroundColor: value }}
            />
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent align="start" className="w-56 space-y-3 border-border bg-surface p-3 z-[60] rounded-xl shadow-lg">
        <div className="text-[10px] font-bold uppercase tracking-wide text-foreground">
          {label}
        </div>

        <div
          ref={svRef}
          onPointerDown={dragSv}
          className="relative h-32 w-full cursor-crosshair select-none rounded-lg overflow-hidden shadow-inner"
          style={{
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            backgroundImage:
              "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
          }}
        >
          <div
            className="pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
            style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
          />
        </div>

        <div
          ref={hueRef}
          onPointerDown={dragHue}
          className="relative h-3 w-full cursor-pointer select-none rounded-full shadow-inner"
          style={{
            background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
        >
          <div
            className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <div
            className="h-7 w-7 shrink-0 rounded-md border border-border shadow-sm"
            style={{ backgroundColor: hexInput }}
          />
          <Input
            value={hexInput}
            onChange={(e) => {
              const next = e.target.value;
              setHexInput(next);
              if (isHexColor(next)) applyHex(to6DigitHex(next));
            }}
            className="h-7 px-2 border-border bg-background font-mono text-[11px] uppercase text-foreground focus-visible:ring-ring focus-visible:ring-2 rounded-md transition-all"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* --- color math --- */
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
        .split("")
        .map((c) => c + c)
        .join("")
      : clean;
  const int = parseInt(full || "000000", 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
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
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}
