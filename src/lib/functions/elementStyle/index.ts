import type { PreviewElementStyle } from "@/types/previewEditTypes";

export const FONT_FAMILIES_STATIC = [
  { label: "Poppins", value: '"Poppins", sans-serif' },
  { label: "Inter", value: '"Inter", sans-serif' },
  { label: "Fraunces", value: '"Fraunces", Georgia, serif' },
  { label: "Space Grotesk", value: '"Space Grotesk", sans-serif' },
  { label: "Cormorant Garamond", value: '"Cormorant Garamond", Georgia, serif' },
  { label: "DM Sans", value: '"DM Sans", Arial, sans-serif' },
  { label: "Instrument Serif", value: '"Instrument Serif", serif' },
  { label: "Outfit", value: '"Outfit", sans-serif' },
  { label: "Comic Relief", value: '"Comic Relief", system-ui' },
  { label: "Open Sans", value: '"Open Sans", sans-serif' },
  { label: "Roboto", value: '"Roboto", sans-serif' },
  { label: "System Sans", value: 'ui-sans-serif, system-ui, sans-serif' },
  { label: "System Serif", value: 'ui-serif, Georgia, Cambria, "Times New Roman", serif' },
  { label: "System Mono", value: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' },
];

export const GRADIENT_PRESETS = [
  { name: "None", value: "" },
  { name: "Emerald Mint", value: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { name: "Cyber Neon", value: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)" },
  { name: "Sunset Glow", value: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)" },
  { name: "Ocean Breeze", value: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)" },
  { name: "Dark Slate", value: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" },
  { name: "Cosmic Sunset", value: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)" },
];

export const DEPTH_PRESETS = [
  { name: "None", value: "none" },
  { name: "Soft", value: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)" },
  { name: "Medium", value: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)" },
  { name: "Strong", value: "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)" },
  { name: "Emerald Glow", value: "0 0 25px rgba(16, 185, 129, 0.5)" },
  { name: "Rose Glow", value: "0 0 25px rgba(244, 63, 94, 0.5)" },
];

export const TEXT_SHADOW_PRESETS = [
  { name: "None", value: "" },
  { name: "Soft", value: "1px 1px 2px rgba(0,0,0,0.35)" },
  { name: "Medium", value: "2px 2px 4px rgba(0,0,0,0.5)" },
  { name: "Strong", value: "3px 3px 6px rgba(0,0,0,0.7)" },
  { name: "Glow", value: "0 0 8px rgba(255,255,255,0.8)" },
];

export const HOVER_EFFECT_OPTIONS: {
  value: NonNullable<PreviewElementStyle["hoverEffect"]>;
  label: string;
}[] = [
    { value: "none", label: "None" },
    { value: "grow", label: "Grow" },
    { value: "lift", label: "Lift" },
    { value: "glow", label: "Glow" },
    { value: "darken", label: "Darken" },
  ];

export const ENTRANCE_OPTIONS: {
  value: NonNullable<PreviewElementStyle["entrance"]>;
  label: string;
}[] = [
    { value: "none", label: "None" },
    { value: "fade", label: "Fade" },
    { value: "slideUp", label: "Slide Up" },
    { value: "zoom", label: "Zoom" },
  ];

export const SWATCHES = [
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#ffffff",
  "#a1a1aa",
  "#52525b",
  "#000000",
];

export const SPACING_MAP = { tight: 8, cozy: 16, roomy: 32 } as const;
export type SpacingKey = keyof typeof SPACING_MAP;

export const CORNER_MAP = { sharp: 0, rounded: 12, pill: 999 } as const;
export type CornerKey = keyof typeof CORNER_MAP;

export function activeStylePresetKey<T extends { key: string; apply: Partial<PreviewElementStyle> }>(
  style: PreviewElementStyle,
  presets: T[],
): string {
  for (const preset of presets) {
    if (preset.key === "none") continue;
    const matches = Object.entries(preset.apply).every(([key, value]) => {
      const current = (style as Record<string, unknown>)[key];
      return current === value || (value === undefined && (current === undefined || current === null));
    });
    if (matches) return preset.key;
  }

  return "none";
}

export function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean;
  const int = parseInt(full || "000000", 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;

  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: max === 0 ? 0 : delta / max, v: max };
}

export function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else[r, g, b] = [c, 0, x];

  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

export function buildGradient(angle: number, colorA: string, colorB: string) {
  return `linear-gradient(${Math.round(angle)}deg, ${colorA} 0%, ${colorB} 100%)`;
}

export function parseGradient(css: string) {
  const angleMatch = css.match(/(-?\d+(\.\d+)?)deg/);
  const colors = css.match(/#[0-9a-fA-F]{3,8}/g) || [];
  return {
    angle: angleMatch ? parseFloat(angleMatch[1]) : 135,
    colorA: colors[0] || "#10b981",
    colorB: colors[colors.length - 1] || "#059669",
  };
}

export function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.18, ease: "easeOut" as const, delay },
  };
}

export function spacingKeyFromValue(padding: number | null | undefined): SpacingKey {
  if (padding === SPACING_MAP.tight) return "tight";
  if (padding === SPACING_MAP.roomy) return "roomy";
  return "cozy";
}

export function cornerKeyFromValue(radius: number | null | undefined): CornerKey {
  if (!radius) return "sharp";
  if (radius >= 100) return "pill";
  return "rounded";
}
