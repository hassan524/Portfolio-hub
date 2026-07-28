import type { BlockKind, SiteData } from "@/types/builder.schema";

export type PreviewElementStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string | null;
  backgroundColor?: string | null;
  borderRadius?: number | null;
  padding?: number | null;
  fontSize?: number | null;
  width?: string | null;
  height?: string | null;
  x?: number;
  y?: number;
  removed?: boolean;
};

export type PreviewElementEdit = {
  id: string;
  blockId: string;
  blockKind: BlockKind;
  label: string;
  style: PreviewElementStyle;
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
