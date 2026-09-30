import { useEffect, useState } from "react";

import type { Block, Theme } from "@/types/builder.schema";
import { IMAGE_OVERRIDES_PROP } from "@/lib/imageOverrideUtils";
import {
  handleAddBlock,
  handleArrayItemChange,
  handleBlockHeightChange,
  moveSidebarBlock,
} from "@/lib/functions/template";
import {
  getBlockDefaultBackground,
  measurePreviewBlockBackground,
  measurePreviewBlockHeight,
} from "@/lib/functions/livePreview/blockWrapper";

export type ImagePath = (string | number)[];

export type SidebarImageEntry = {
  src: string;
  originalSrc: string;
  path: ImagePath | null;
  siteKey?: "logo";
};

export function addSidebarBlock(
  sortedBlocks: Block[],
  theme: Theme,
  onReorderBlocks: (blocks: Block[]) => void,
) {
  handleAddBlock(sortedBlocks, theme, (nextBlocks) => {
    const patched = nextBlocks.map((nextBlock) => {
      const existed = sortedBlocks.some((block) => block.id === nextBlock.id);
      if (existed) return nextBlock;

      const isSpacerDefault = (nextBlock.label ?? "").toLowerCase() === "spacer";
      return {
        ...nextBlock,
        label: isSpacerDefault ? "New Block" : (nextBlock.label ?? "New Block"),
        sectionHref: "",
        bgColor: nextBlock.bgColor ?? theme.bg,
      };
    });

    onReorderBlocks(patched);
  });
}

export function moveSidebarBlockToTarget(
  draggedId: string | null,
  targetId: string,
  blocks: Block[],
  onReorderBlocks: (blocks: Block[]) => void,
) {
  moveSidebarBlock(draggedId, targetId, blocks, onReorderBlocks);
}

export function updateSidebarBlockHeight(
  blockId: string,
  value: string,
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void,
) {
  handleBlockHeightChange(blockId, value, onUpdateBlock);
}

export function updateSidebarArrayItem(
  current: unknown[],
  index: number,
  nextValue: unknown,
  parentValue: Record<string, unknown>,
  key: string,
  onChange: (nextValue: Record<string, unknown>) => void,
) {
  handleArrayItemChange(current, index, nextValue, parentValue, key, onChange);
}

export function rgbStringToHex(rgb: string): string | null {
  const match = rgb.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return null;
  const [r, g, b] = match.map(Number);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;

  return `#${[r, g, b]
    .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0"))
    .join("")}`;
}

export function findVisibleBackgroundColor(root: HTMLElement | null): string | null {
  if (!root) return null;
  const queue: HTMLElement[] = [root];

  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;
    if (node.hasAttribute("data-preview-chrome") || node.hasAttribute("data-blend-ignore")) {
      continue;
    }

    const bg = getComputedStyle(node).backgroundColor;
    if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
      const hex = rgbStringToHex(bg);
      if (hex) return hex;
    }

    for (const child of Array.from(node.children)) {
      if (child instanceof HTMLElement) queue.push(child);
    }
  }

  return null;
}

export function findBlockElement(blockId: string): HTMLElement | null {
  const el = document.querySelector<HTMLElement>(`[data-block-id="${blockId}"]`);
  if (el) return el;

  const iframe = document.querySelector<HTMLIFrameElement>("iframe");
  return iframe?.contentDocument?.querySelector<HTMLElement>(`[data-block-id="${blockId}"]`) ?? null;
}

export function useLiveBlockBg(blockId: string, active: boolean, fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!active) {
      setColor(fallback);
      return;
    }

    const measure = () => {
      const el = findBlockElement(blockId);
      const hex = measurePreviewBlockBackground(el, rgbStringToHex, fallback);
      setColor(hex ?? fallback);
    };

    measure();
    const timer = setTimeout(measure, 100);
    return () => clearTimeout(timer);
  }, [active, blockId, fallback]);

  return color;
}

export function useLiveBlockHeight(blockId: string, active: boolean): number | null {
  const [liveHeight, setLiveHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const measure = () => {
      const el = findBlockElement(blockId);
      const height = measurePreviewBlockHeight(el);
      if (height) setLiveHeight(height);
    };

    measure();
    const timer = setTimeout(measure, 100);
    return () => clearTimeout(timer);
  }, [active, blockId]);

  return liveHeight;
}

export function getBlockSectionHref(block: Block): string {
  if (block.sectionHref !== undefined) {
    if (!block.sectionHref.trim()) return "";
    return block.sectionHref.startsWith("#") ? block.sectionHref : `#${block.sectionHref}`;
  }

  const raw = block.props.kind === "hero" ? "home" : block.label || block.name || block.props.kind;
  const slug = raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `#${slug || block.props.kind}`;
}

export function normalizeSectionHref(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "#") return "";

  const withoutHash = trimmed.replace(/^#+/, "");
  const slugified = `#${withoutHash
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-|-$/g, "")}`;

  return slugified === "#" ? "" : slugified;
}

export function isImageUrlSmart(val: string, path: ImagePath): boolean {
  if (typeof val !== "string") return false;
  const value = val.trim();
  if (!value || value.length < 5 || value.length > 2048) return false;
  if (!value.startsWith("data:image/") && (value.includes(" ") || value.includes("\n"))) {
    return false;
  }

  if (value.startsWith("data:image/") || value.startsWith("blob:") || value.startsWith("/")) {
    return true;
  }

  if (!/^https?:\/\//i.test(value)) return false;
  if (/\.(html|htm|php|asp|jsp|js|css)(\?.*)?$/i.test(value)) return false;
  if (/\.(png|jpe?g|webp|svg|gif|avif|ico|bmp)(\?.*)?$/i.test(value)) return true;

  const lower = value.toLowerCase();
  if (
    lower.includes("images.unsplash.com") ||
    lower.includes("unsplash.com") ||
    lower.includes("cloudinary.com") ||
    lower.includes("supabase.co") ||
    lower.includes("imgur.com") ||
    lower.includes("picsum.photos") ||
    lower.includes("firebasestorage.googleapis.com") ||
    lower.includes("ibb.co")
  ) {
    return true;
  }

  const pathStr = path.map(String).join("/").toLowerCase();
  return [
    "image",
    "img",
    "photo",
    "avatar",
    "logo",
    "banner",
    "icon",
    "slide",
    "carousel",
    "gallery",
    "portfolio",
    "item",
    "card",
  ].some((hint) => pathStr.includes(hint));
}

export function extractImageUrlsFromProps(
  obj: unknown,
  path: ImagePath = [],
  found: { url: string; path: ImagePath }[] = [],
): { url: string; path: ImagePath }[] {
  if (typeof obj === "string") {
    if (isImageUrlSmart(obj, path)) found.push({ url: obj, path });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      extractImageUrlsFromProps(item, [...path, index], found);
    });
  } else if (obj && typeof obj === "object") {
    Object.entries(obj as Record<string, unknown>).forEach(([key, val]) => {
      if (key === IMAGE_OVERRIDES_PROP) return;
      extractImageUrlsFromProps(val, [...path, key], found);
    });
  }

  return found;
}

export function buildImagePathMap(
  value: unknown,
  path: ImagePath = [],
  map: Map<string, ImagePath> = new Map(),
): Map<string, ImagePath> {
  if (typeof value === "string") {
    if (!map.has(value)) map.set(value, path);
    return map;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => buildImagePathMap(item, [...path, index], map));
    return map;
  }

  if (value && typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(([key, item]) => {
      buildImagePathMap(item, [...path, key], map);
    });
  }

  return map;
}

export function setNestedValue(obj: unknown, path: ImagePath, newValue: unknown): unknown {
  if (path.length === 0) return newValue;
  const [head, ...rest] = path;

  if (Array.isArray(obj)) {
    const clone = [...obj];
    clone[head as number] = setNestedValue(clone[head as number], rest, newValue);
    return clone;
  }

  const record = (obj && typeof obj === "object" ? obj : {}) as Record<string, unknown>;
  return {
    ...record,
    [head]: setNestedValue(record[head as string], rest, newValue),
  };
}

export function createEditableArrayItem(key: string, blockKind?: Block["props"]["kind"]): unknown {
  if (key === "paragraphs" || key === "skills") return "";
  if (key === "links") return { label: "", href: "" };
  if (key === "socials") return { platform: "", label: "" };
  if (key === "experience") return { co: "", role: "", yr: "", desc: "" };
  if (key === "items" && blockKind === "projects") {
    return { title: "", desc: "", category: "", period: "", tags: "", link: "" };
  }
  if (key === "items" && blockKind === "testimonials") {
    return { quote: "", name: "", role: "" };
  }
  if (key === "items" && blockKind === "services") {
    return { title: "", desc: "", icon: "", tags: [] };
  }
  if (key === "items" && blockKind === "stats") return { value: "", label: "", suffix: "" };
  return "";
}

export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}
