import type { BlockKind, SiteData } from "@/types/builder.schema";

export type PreviewElementStyle = {
  // Typography
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  color?: string | null;
  fontSize?: number | null;
  fontFamily?: string | null;
  fontWeight?: string | null;
  lineHeight?: number | null;
  letterSpacing?: number | null;
  textAlign?: "left" | "center" | "right" | "justify" | null;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | null;

  // Background & Colors
  backgroundColor?: string | null;
  backgroundImage?: string | null;
  backgroundGradient?: string | null;
  opacity?: number | null;

  // Borders & Shadow
  borderRadius?: number | null;
  borderWidth?: number | null;
  borderColor?: string | null;
  borderStyle?: "solid" | "dashed" | "dotted" | "none" | null;
  boxShadow?: string | null;
  backdropBlur?: number | null;

  // Spacing & Dimensions
  padding?: number | null;
  margin?: number | null;
  width?: string | null;
  height?: string | null;

  // Important & SaaS Styles
  isImportant?: boolean;
  gradientText?: boolean;
  glassmorphism?: boolean;
  glowAccent?: boolean;
  hoverLift?: boolean;
  zIndex?: number | null;
  display?: string | null;
  cursor?: string | null;
  overflow?: "visible" | "hidden" | "auto" | "scroll" | null;

  // Position & Transform
  freePositioned?: boolean;
  desktop?: { x: number; y: number };
  mobile?: { x: number; y: number };
  x?: number;
  y?: number;
  rotate?: number | null;
  scale?: number | null;

  // Meta
  removed?: boolean;
};

export type PreviewElementEdit = {
  id: string;
  blockId: string;
  blockKind: BlockKind;
  label: string;
  style: PreviewElementStyle;
  computedWidth?: string;
  computedHeight?: string;
};

export type PreviewEditState = {
  analyzedAt: string;
  blocks: {
    id: string;
    kind: BlockKind;
    variant?: string;
    order: number;
  }[];
  elements: Record<string, PreviewElementEdit>;
};

export type PreviewEditableSite = SiteData & {
  previewEdits?: PreviewEditState;
};
