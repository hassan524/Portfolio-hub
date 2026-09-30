import type { ResponsiveBreakpoint } from "@/types/previewEditTypes";
import type { RefObject } from "react";

export const DEFAULT_RESPONSIVE_WIDTH = 390;
export const DEFAULT_RESPONSIVE_HEIGHT = 844;
export const DEFAULT_DESKTOP_WIDTH = 1440;
export const VIEWPORT_PADDING = 40;

export const BREAKPOINT_PRESETS: Record<ResponsiveBreakpoint, { width: number; height: number }> = {
  desktop: { width: 1280, height: 800 },
  tablet: { width: 834, height: 1194 },
  mobile: { width: 390, height: 844 },
};

export const MIN_FRAME_WIDTH = 280;
export const MAX_FRAME_WIDTH = 1400;

export function handlePreviewNavigationClick({
  event,
  isDesktop,
  contentRef,
  desktopScrollRef,
  responsiveFrameRef,
}: {
  event: React.MouseEvent;
  isDesktop: boolean;
  contentRef: RefObject<HTMLDivElement | null>;
  desktopScrollRef: RefObject<HTMLDivElement | null>;
  responsiveFrameRef: RefObject<HTMLIFrameElement | null>;
}) {
  const target = event.target as HTMLElement;
  const anchor = target.closest("a");
  const linkedElement = target.closest<HTMLElement>("[data-preview-link-href]");

  if (anchor) {
    event.preventDefault();
    const href = anchor.getAttribute("href");
    if (href?.startsWith("#")) {
      scrollPreviewToHref(href, isDesktop, contentRef, desktopScrollRef, responsiveFrameRef);
    } else if (href && href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    return;
  }

  if (linkedElement?.dataset.previewLinkHref) {
    event.preventDefault();
    const href = linkedElement.dataset.previewLinkHref;
    if (href.startsWith("#")) {
      scrollPreviewToHref(href, isDesktop, contentRef, desktopScrollRef, responsiveFrameRef);
    } else if (/^https?:\/\//i.test(href)) {
      window.open(
        href,
        linkedElement.dataset.previewLinkTarget === "_self" ? "_self" : "_blank",
        "noopener,noreferrer",
      );
    }
    return;
  }

  const button = target.closest("button") as HTMLButtonElement | null;
  if (button?.type === "submit") {
    event.preventDefault();
  }
}

export function scrollPreviewToHref(
  href: string,
  isDesktop: boolean,
  contentRef: RefObject<HTMLDivElement | null>,
  desktopScrollRef: RefObject<HTMLDivElement | null>,
  responsiveFrameRef: RefObject<HTMLIFrameElement | null>,
) {
  const id = href.slice(1);

  const scrollToTop = () => {
    if (isDesktop) {
      desktopScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      responsiveFrameRef.current?.contentWindow?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!id) {
    scrollToTop();
    return;
  }

  const targetEl = contentRef.current?.querySelector(`[id="${id}"]`);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (id === "top" || id === "page-top") {
    scrollToTop();
  }
}

export function buildResponsiveEditorStyles(accent: string) {
  return `
    .preview-edit-canvas.edit-active {
      cursor: default;
    }
    .preview-edit-canvas.edit-active .preview-edit-hovered:not(.preview-edit-selected) {
      outline: 2px dashed ${accent}cc !important;
      outline-offset: 3px !important;
      cursor: pointer !important;
      transform: scale(1.01);
      transition: outline 0.12s ease, transform 0.12s ease;
    }
    .preview-edit-canvas.move-active .preview-edit-hovered:not(.preview-edit-selected) {
      outline: 2px dashed ${accent}dd !important;
      outline-offset: 4px !important;
      cursor: move !important;
      transform: scale(1.01);
      transition: outline 0.12s ease, transform 0.12s ease;
    }
    [data-free-positioned="true"] {
      z-index: 250 !important;
    }
    [data-has-free-positioned="true"],
    [data-has-free-positioned="true"] [data-block-id],
    [data-has-free-positioned="true"] > [data-block-id] > section,
    [data-has-free-positioned="true"] > [data-block-id] > header,
    [data-has-free-positioned="true"] > [data-block-id] > nav,
    [data-has-free-positioned="true"] > [data-block-id] > footer,
    [data-has-free-positioned="true"] section,
    [data-has-free-positioned="true"] .group\/block,
    [data-has-free-positioned="true"] .group\/dragblock {
      overflow: visible !important;
    }
    .preview-edit-canvas.edit-active .preview-edit-selected,
    .preview-edit-selected {
      outline: 2px solid ${accent} !important;
      outline-offset: 3px !important;
      box-shadow: 0 0 0 4px ${accent}33, 0 8px 24px rgba(0,0,0,0.18) !important;
      transform: scale(1.02) !important;
      z-index: 200 !important;
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.15s ease, box-shadow 0.18s ease !important;
    }
    .preview-hover-lift:hover {
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 24px -6px rgba(0,0,0,0.2) !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }
  `;
}
