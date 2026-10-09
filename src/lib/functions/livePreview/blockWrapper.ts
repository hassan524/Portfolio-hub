import type { CSSProperties } from "react";
import type { Block, SiteData, Theme } from "@/types/builder.schema";

const OVERFLOW_VISIBLE =
  "[&_section]:!overflow-visible [&_header]:!overflow-visible [&_nav]:!overflow-visible [&_footer]:!overflow-visible";

export function isNavbarBlock(block: Block): boolean {
  return block.props.kind === "navbar";
}

export function isFooterBlock(block: Block): boolean {
  return block.props.kind === "footer";
}

export function isSpacerBlock(block: Block): boolean {
  return block.props.kind === "spacer";
}

export function getPreviewBlockTheme(theme: Theme, block: Block): Theme {
  if (!block.bgColor) return theme;
  return {
    ...theme,
    bg: block.bgColor,
    "bg-second": block.bgColor,
  };
}

export function getPreviewBlockComponentProps(
  block: Block,
  site: Pick<SiteData, "logo">,
): Record<string, unknown> {
  const isNavbar = isNavbarBlock(block);
  const isFooter = isFooterBlock(block);
  const isSpacer = isSpacerBlock(block);

  if (isNavbar || isFooter) {
    return { ...block.props, logo: site.logo };
  }

  if (isSpacer) {
    const spacerProps = block.props as Record<string, unknown>;
    return {
      ...spacerProps,
      backgroundColor: block.bgColor || spacerProps.backgroundColor,
      backgroundImage: block.bgColor ? "none" : spacerProps.backgroundImage,
      isBlended: block.bgColor ? false : Boolean(spacerProps.isBlended),
    };
  }

  return block.props as Record<string, unknown>;
}

export function getPreviewBlockWrapperClasses(
  block: Block,
  options?: { isActive?: boolean },
): string {
  const isNavbar = isNavbarBlock(block);
  const hasCustomBg = Boolean(block.bgColor);
  const hasHeight = Boolean(block.height);

  const navbarLayout = isNavbar
    ? "[&_header]:!relative [&_header]:!top-auto [&_nav]:!relative [&_nav]:!top-auto"
    : "";

  const heightClasses = hasHeight
    ? "[&_section]:!box-border [&_section]:!h-full [&_section]:!min-h-0 [&_section]:!max-h-full " +
      "[&_header]:!box-border [&_header]:!h-full [&_header]:!min-h-0 [&_header]:!max-h-full " +
      "[&_nav]:!box-border [&_nav]:!h-full [&_nav]:!min-h-0 [&_nav]:!max-h-full " +
      "[&_footer]:!box-border [&_footer]:!h-full [&_footer]:!min-h-0 [&_footer]:!max-h-full"
    : "";

  const customBgClasses = hasCustomBg
    ? "[&_section]:![background-color:var(--block-bg)] [&_header]:![background-color:var(--block-bg)] " +
      "[&_nav]:![background-color:var(--block-bg)] [&_footer]:![background-color:var(--block-bg)]"
    : "";

  return [
    "relative group/block",
    OVERFLOW_VISIBLE,
    navbarLayout,
    heightClasses,
    customBgClasses,
    options?.isActive ? "outline outline-2 outline-offset-[-2px]" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getPreviewBlockInnerClasses(block: Block): string | undefined {
  if (!block.height) return undefined;
  return "h-full min-h-0 [&>*]:!h-full [&>*]:!min-h-0 [&>*]:!max-h-full";
}

export function getPreviewBlockWrapperStyle(
  block: Block,
  theme: Theme,
  options?: { isActive?: boolean; hasFreePositioned?: boolean },
): CSSProperties {
  const hasCustomBg = Boolean(block.bgColor);

  const isNavbar = isNavbarBlock(block);
  return {
    ...(options?.isActive ? { outlineColor: theme.accent } : undefined),
    minHeight: block.height ? `${block.height}px` : undefined,
    height: block.height ? `${block.height}px` : undefined,
    backgroundColor: block.bgColor || undefined,
    zIndex: options?.hasFreePositioned ? 200 : isNavbar ? 50 : 1,
    overflow: options?.hasFreePositioned ? "visible" : undefined,
    position: "relative",
    ...(hasCustomBg ? ({ "--block-bg": block.bgColor } as CSSProperties) : {}),
  };
}

export function findPreviewBlockSurface(root: HTMLElement | null): HTMLElement | null {
  if (!root) return null;
  const surface = root.querySelector<HTMLElement>("section, nav, header, footer");
  return surface ?? root;
}

export function getElementZoomScale(el: HTMLElement | null): number {
  if (!el) return 1;

  // 1. Check currentCSSZoom (Chrome standard for effective inherited zoom)
  if (typeof (el as any).currentCSSZoom === "number") {
    const cz = (el as any).currentCSSZoom;
    if (cz > 0) return cz;
  }

  // 2. Walk up ancestors to find the element that has CSS zoom applied (e.g. frameRef style.zoom)
  let curr: HTMLElement | null = el;
  while (curr && curr !== curr.ownerDocument?.documentElement) {
    const rawZoom = (curr.style as any)?.zoom;
    if (rawZoom) {
      const z = parseFloat(rawZoom);
      if (!isNaN(z) && z > 0 && Math.abs(z - 1) > 0.001) return z;
    }
    curr = curr.parentElement;
  }

  return 1;
}

export function measurePreviewBlockHeight(root: HTMLElement | null): number | null {
  const surface = findPreviewBlockSurface(root);
  if (!surface) return null;

  // 1. offsetHeight is the native unzoomed layout height in CSS pixels across all browsers
  if (surface.offsetHeight > 0) {
    return surface.offsetHeight;
  }

  if (root && root.offsetHeight > 0) {
    return root.offsetHeight;
  }

  // 2. Fallback to getBoundingClientRect() divided by zoom scale if offsetHeight is 0
  const scale = getElementZoomScale(surface);
  const safeScale = scale > 0 ? scale : 1;

  const rect = surface.getBoundingClientRect();
  if (rect.height > 0) {
    const unscaled = Math.round(rect.height / safeScale);
    if (unscaled > 0) return unscaled;
  }

  return null;
}

/** Hex background for sidebar display — reads the block surface, not random child chips/buttons. */
export function measurePreviewBlockBackground(
  root: HTMLElement | null,
  rgbToHex: (rgb: string) => string | null,
  fallback?: string | null,
): string | null {
  const surface = findPreviewBlockSurface(root);
  if (!surface) return fallback ?? null;

  const inline = surface.style.backgroundColor?.trim();
  if (inline && inline !== "transparent") {
    if (inline.startsWith("#")) {
      if (inline.length === 9) return inline.slice(0, 7);
      if (inline.length === 7) return inline;
    }
    const fromInline = rgbToHex(inline);
    if (fromInline) return fromInline;
  }

  const computed = getComputedStyle(surface).backgroundColor;
  if (computed && computed !== "transparent" && computed !== "rgba(0, 0, 0, 0)") {
    const hex = rgbToHex(computed);
    if (hex) return hex;
  }

  return fallback ?? null;
}

export function getBlockDefaultBackground(block: Block, theme: Theme): string {
  if (block.bgColor) return block.bgColor;
  const props = block.props as Record<string, unknown>;
  if (isSpacerBlock(block) && typeof props.backgroundColor === "string" && props.backgroundColor) {
    return props.backgroundColor;
  }
  return theme.bg;
}

export function applyPreviewBlockSurfaceStyles(
  blockRoot: HTMLElement,
  block: Block | undefined,
  options?: { backgroundColor?: string | null },
): void {
  const surfaceSelectors = "section, nav, header, footer";
  const bg = options?.backgroundColor ?? block?.bgColor;

  if (bg) {
    blockRoot.style.setProperty("--block-bg", bg);
    blockRoot.style.setProperty("background-color", bg, "important");

    blockRoot.querySelectorAll<HTMLElement>(surfaceSelectors).forEach((node) => {
      if (node.hasAttribute("data-preview-chrome") || node.hasAttribute("data-block-drag-handle")) {
        return;
      }
      node.style.setProperty("background-color", bg, "important");
      if (block && isSpacerBlock(block)) {
        node.style.setProperty("background-image", "none", "important");
      }
    });
  }

  if (block?.height) {
    blockRoot.style.setProperty("height", `${block.height}px`, "important");
    blockRoot.style.setProperty("min-height", `${block.height}px`, "important");

    blockRoot.querySelectorAll<HTMLElement>(surfaceSelectors).forEach((node) => {
      if (node.hasAttribute("data-preview-chrome") || node.hasAttribute("data-block-drag-handle")) {
        return;
      }
      node.style.setProperty("height", "100%", "important");
      node.style.setProperty("min-height", "0", "important");
      node.style.setProperty("max-height", "100%", "important");
    });
  } else {
    blockRoot.style.removeProperty("height");
    blockRoot.style.removeProperty("min-height");

    blockRoot.querySelectorAll<HTMLElement>(surfaceSelectors).forEach((node) => {
      if (node.hasAttribute("data-preview-chrome")) return;
      node.style.removeProperty("height");
      node.style.removeProperty("min-height");
      node.style.removeProperty("max-height");
    });
  }
}
