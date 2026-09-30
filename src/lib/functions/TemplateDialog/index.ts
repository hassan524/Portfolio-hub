import type {
  Dispatch,
  SetStateAction,
  RefObject,
  FocusEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import type {
  PreviewEditableSite,
  PreviewElementEdit,
  PreviewElementStyle,
} from "@/types/previewEditTypes";
import { ResponsiveBreakpoint } from "@/types/previewEditTypes";
import { applyPreviewBlockSurfaceStyles } from "@/lib/functions/livePreview/blockWrapper";

// ============================================================
// TemplatePreviewDialog
// ============================================================

export const BREAKPOINTS: Record<ResponsiveBreakpoint, { min: number; max?: number }> = {
  desktop: { min: 1024 },
  tablet: { min: 768, max: 1023 },
  mobile: { min: 0, max: 767 },
};

export function breakpointFromWidth(width: number): ResponsiveBreakpoint {
  if (width >= BREAKPOINTS.desktop.min) return "desktop";
  if (width >= BREAKPOINTS.tablet.min) return "tablet";
  return "mobile";
}

export function isPropControlled(style: PreviewElementStyle | undefined, key: keyof PreviewElementStyle): boolean {
  if (!style) return false;
  if ((style as any)[key] !== undefined) return true;
  const resp = style.responsive;
  if (!resp) return false;
  return Boolean(
    (resp.desktop && key in resp.desktop && (resp.desktop as any)[key] !== undefined) ||
    (resp.tablet && key in resp.tablet && (resp.tablet as any)[key] !== undefined) ||
    (resp.mobile && key in resp.mobile && (resp.mobile as any)[key] !== undefined)
  );
}

export function resolveResponsiveValue<K extends keyof PreviewElementStyle>(
  style: PreviewElementStyle,
  key: K,
  breakpoint: ResponsiveBreakpoint,
): PreviewElementStyle[K] {
  if (!style) return undefined as any;

  const responsive = style.responsive;

  if (responsive) {
    // This breakpoint's own explicit override wins, if it has one.
    if (responsive[breakpoint] && key in responsive[breakpoint]!) {
      const val = (responsive[breakpoint] as any)[key];
      if (val !== undefined) return val;
    }

    // No cross-breakpoint inheritance: desktop edits stay on desktop,
    // tablet edits stay on tablet, mobile edits stay on mobile.
    // (Previously this fell back mobile -> tablet -> desktop, and
    // tablet -> desktop, which is what caused desktop edits to leak
    // into tablet/mobile. That fallback has been removed.)

    // Fall back to the flat/base style — whatever was set outside
    // `responsive` (e.g. before Responsive Editing was ever turned on
    // for this element).
    if ((style as any)[key] !== undefined) {
      return (style as any)[key];
    }

    // If another breakpoint has its own override but this one doesn't,
    // don't inherit it — return undefined so the caller removes the
    // property instead of showing another breakpoint's value.
    const otherBps: ResponsiveBreakpoint[] = (["desktop", "tablet", "mobile"] as ResponsiveBreakpoint[]).filter(
      (b) => b !== breakpoint
    );
    const hasOtherOverride = otherBps.some((b) => responsive[b] && key in responsive[b]!);
    if (hasOtherOverride) {
      return undefined as any;
    }
  }

  return style[key];
}

// Switches the editor dialog in and out of maximized full-screen view.
export function toggleMaximize(
  isMaximized: boolean,
  setIsMaximized: Dispatch<SetStateAction<boolean>>,
  _dialogRef: RefObject<HTMLElement | null>,
): void {
  if (document.fullscreenElement) {
    document.exitFullscreen?.().catch(() => { });
  }
  setIsMaximized((prev) => !prev);
}

// Applies a patch (height, label, name, style, or block props) to a single
// block, and — if a style patch was included — also records it in previewEdits
// so it's remembered as an edit to that block's root element.
export function updateBlockProps(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  blockId: string,
  patch: Record<string, unknown>,
): void {
  setSite((prev) => {
    if (!prev) return prev;
    const { height, label, name, bgColor, sectionHref, elementStyle, ...restProps } = patch;

    const updatedBlocks = prev.blocks.map((b) => {
      if (b.id !== blockId) return b;
      const isSpacer = b.props.kind === "spacer" || b.type === "spacer";
      return {
        ...b,
        ...(height !== undefined ? { height: height as number } : {}),
        ...(label !== undefined ? { label: label as string } : {}),
        ...(name !== undefined ? { name: name as string } : {}),
        ...(bgColor !== undefined ? { bgColor: bgColor as string } : {}),
        ...(sectionHref !== undefined ? { sectionHref: sectionHref as string } : {}),
        props: {
          ...b.props,
          ...restProps,
          ...(bgColor !== undefined
            ? {
              backgroundColor: bgColor as string,
              ...(isSpacer ? { backgroundImage: undefined, isBlended: false } : {}),
            }
            : {}),
        },
      };
    });

    let nextPreviewEdits = prev.previewEdits;

    if (elementStyle || bgColor !== undefined) {
      const targetElementId = `${blockId}:root`;
      const prevElements = { ...(prev.previewEdits?.elements ?? {}) };
      const targetBlock = updatedBlocks.find((b) => b.id === blockId);
      const blockKind = targetBlock?.props.kind ?? "spacer";
      const blockLabel = targetBlock?.label ?? targetBlock?.name ?? blockKind;
      const isSpacer = blockKind === "spacer" || targetBlock?.type === "spacer";

      // If setting a solid bgColor on a spacer or block, update only the root element, not all child sub-elements
      if (bgColor !== undefined) {
        const rootExisting = prevElements[targetElementId];
        if (rootExisting) {
          prevElements[targetElementId] = {
            ...rootExisting,
            style: {
              ...rootExisting.style,
              backgroundColor: bgColor as string,
              ...(isSpacer ? { backgroundImage: null, backgroundGradient: null } : {}),
            },
          };
        }
      }

      const updatedElementEdit: PreviewElementEdit = {
        id: targetElementId,
        blockId,
        blockKind,
        label: blockLabel,
        style: {
          ...(prevElements[targetElementId]?.style ?? {}),
          ...(elementStyle as Partial<PreviewElementStyle>),
          ...(bgColor !== undefined
            ? {
              backgroundColor: bgColor as string,
              ...(isSpacer ? { backgroundImage: null, backgroundGradient: null } : {}),
            }
            : {}),
        },
      };

      nextPreviewEdits = {
        analyzedAt: new Date().toISOString(),
        blocks: updatedBlocks.map((b) => ({
          id: b.id,
          kind: b.props.kind,
          variant: (b.props as { variant?: string }).variant,
          order: b.order,
        })),
        elements: {
          ...prevElements,
          [targetElementId]: updatedElementEdit,
        },
      };
    }

    return {
      ...prev,
      blocks: updatedBlocks,
      ...(nextPreviewEdits ? { previewEdits: nextPreviewEdits } : {}),
    };
  });
}

// Merges a partial theme patch (e.g. a new accent color) into the site's theme.
export function updateTheme(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  patch: Partial<Theme>,
  fallbackTheme: Theme,
): void {
  setSite((prev) =>
    prev ? { ...prev, theme: { ...(prev.theme ?? fallbackTheme), ...patch } } : prev,
  );
}

// Updates top-level template metadata that belongs in siteData.
export function updateSiteMeta(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  patch: Partial<Pick<SiteData, "category" | "logo" | "name">>,
): void {
  setSite((prev) => (prev ? { ...prev, ...patch } : prev));
}

// Replaces the whole block list with a new order and re-numbers each block's
// `order` field to match its new position.
export function reorderBlocks(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  nextBlocks: Block[],
): void {
  setSite((prev) =>
    prev
      ? {
        ...prev,
        blocks: nextBlocks.map((block, order) => ({ ...block, order })),
      }
      : prev,
  );
}

// Saves a style patch (bold, color, position, etc.) for one specific element,
// merging it on top of whatever style that element already had, and keeps the
// currently-selected element's local state in sync too.
export function changeElementStyle(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>,
  elementId: string,
  patch: Partial<PreviewElementStyle>,
  editBreakpoint: ResponsiveBreakpoint = "desktop",
  responsiveEditMode: boolean = false,
): void {
  setSite((prev): SiteData | null => {
    if (!prev) return prev;

    const prevElements = prev.previewEdits?.elements ?? {};
    const prevStyle = prevElements[elementId]?.style ?? {};

    let nextStyle: PreviewElementStyle;
    if (responsiveEditMode) {
      const prevResponsive = prevStyle.responsive ?? {};
      const prevBreakpointSlot = prevResponsive[editBreakpoint] ?? {};
      nextStyle = {
        ...prevStyle,
        responsive: {
          ...prevResponsive,
          [editBreakpoint]: { ...prevBreakpointSlot, ...patch },
        },
      };
    } else {
      nextStyle = {
        ...prevStyle,
        ...patch,
      };
      if (nextStyle.responsive?.[editBreakpoint]) {
        nextStyle.responsive[editBreakpoint] = {
          ...nextStyle.responsive[editBreakpoint],
          ...patch,
        };
      }
    }

    const blockId = elementId.split(":")[0] ?? "";
    const block = prev.blocks.find((candidate) => candidate.id === blockId);
    const fallbackLabel = elementId.endsWith(":root")
      ? (block?.label ?? block?.name ?? block?.props.kind ?? "Section")
      : (prevElements[elementId]?.label ?? "Element");

    const nextElements = {
      ...prevElements,
      [elementId]: {
        id: elementId,
        blockId,
        blockKind: block?.props.kind ?? prevElements[elementId]?.blockKind ?? "spacer",
        label: prevElements[elementId]?.label ?? fallbackLabel,
        style: nextStyle,
      },
    };

    const nextPreviewEdits = {
      ...(prev.previewEdits ?? {}),
      elements: nextElements,
    };

    setSelectedElement((prev) =>
      prev && prev.id === elementId ? { ...prev, style: nextStyle } : prev,
    );

    return {
      ...prev,
      previewEdits: nextPreviewEdits,
    } as SiteData;
  });
}

// Marks the currently-selected element as "removed" (display: none / removing layout space)
// by setting a `removed: true` style flag on it.
export function removeSelectedElement(
  selectedElement: PreviewElementEdit | null,
  changeElementStyleFn: (elementId: string, patch: Partial<PreviewElementStyle>) => void,
): void {
  if (!selectedElement) return;
  changeElementStyleFn(selectedElement.id, { removed: true });
}

// Wipes out all saved style edits for the currently-selected element,
// putting it back to how it looked originally.
export function resetSelectedElement(
  selectedElement: PreviewElementEdit | null,
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>,
): void {
  if (!selectedElement) return;
  const elementId = selectedElement.id;

  setSite((prev) => {
    if (!prev?.previewEdits) return prev;
    const { [elementId]: _removed, ...rest } = prev.previewEdits.elements;
    return {
      ...prev,
      previewEdits: { ...prev.previewEdits, elements: rest },
    };
  });

  setSelectedElement((prev) => (prev && prev.id === elementId ? { ...prev, style: {} } : prev));
}

// Resets the whole editor back to a fresh copy of the given template — clears
// selection, resets device/zoom state, and deep-clones the template so edits
// don't mutate the original object.
export function syncTemplateState(
  template: SiteData | null,
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setActiveSection: Dispatch<SetStateAction<string>>,
  setDevice: Dispatch<SetStateAction<"responsive" | "desktop">>,
  setIsMaximized: Dispatch<SetStateAction<boolean>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>,
): void {
  if (template) {
    const nextSite = structuredClone(template);
    setSite(nextSite);
    const nonNavBlock = nextSite.blocks?.find((b) => b.props.kind !== "navbar");
    setActiveSection(nonNavBlock?.props.kind ?? "hero");
    setDevice("desktop");
    setIsMaximized(false);
    setSelectedElement(null);
  } else {
    setSite(null);
  }
}

// Keeps `isMaximized` state truthful if the user exits fullscreen using the
// browser's own controls (like pressing Esc) instead of our button.
export function handleFullscreenChange(setIsMaximized: Dispatch<SetStateAction<boolean>>): void {
  if (!document.fullscreenElement) {
    setIsMaximized(false);
  }
}

// Save button behavior: free users get redirected to pricing instead of
// saving; paid users get the save confirmation modal opened.
export function handleSaveClick(
  profile: { is_paid?: boolean } | null | undefined,
  onClose: () => void,
  navigate: (path: string) => void,
  setSaveModalOpen: Dispatch<SetStateAction<boolean>>,
): void {
  const isPaid = profile?.is_paid === true;

  if (!isPaid) {
    onClose();
    setTimeout(() => navigate("/pricing"), 320);
    return;
  }

  setSaveModalOpen(true);
}

// Runs after the user confirms a deploy — records which platform they picked
// (Vercel/Netlify) and calls the save handler with the current site.
export function handleConfirmSave(
  deploymentTarget: string | undefined,
  setDeployedPlatform: Dispatch<SetStateAction<"vercel" | "netlify" | undefined>>,
  onSave?: (site: SiteData) => void,
  site?: SiteData | null,
): void {
  if (deploymentTarget === "vercel" || deploymentTarget === "netlify") {
    setDeployedPlatform(deploymentTarget);
  }
  if (site) {
    onSave?.(site);
  }
}

// Turning move mode ON shows a one-time warning popup first (since it changes
// how dragging behaves). Turning it OFF just switches it off immediately.
export async function handleToggleMoveMode(
  moveMode: boolean,
  setMoveMode: Dispatch<SetStateAction<boolean>>,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  confirm: (options: {
    type: "allow";
    title: string;
    description: string;
    confirmLabel: string;
  }) => Promise<boolean>,
): Promise<void> {
  if (moveMode) {
    setMoveMode(false);
    return;
  }
  const ok = await confirm({
    type: "allow",
    title: "Turn on move mode?",
    description:
      "Elements can be freely moved. Alignment guides only appear when an element is close to another element.",
    confirmLabel: "Allow moving",
  });
  if (ok) {
    setEditMode(true);
    setMoveMode(true);
  }
}

// Handles a click inside the preview while edit mode is on. Works out
// which element and block were clicked, and selects it immediately — whether
// it's a specific element (text, card, button) or the whole section background.
export function handleInteractivePreviewClick(
  e: ReactMouseEvent | MouseEvent,
  editMode: boolean,
  blocks: Block[],
  site: PreviewEditableSite,
  onSelectElement: ((edit: PreviewElementEdit | null) => void) | undefined,
): void {
  if (!editMode || !onSelectElement) return;

  const target = getPreviewElementTarget(e.target);
  if (!target || isChromeElement(target)) return;
  const blockElement = target?.closest<HTMLElement>("[data-block-id]") ?? null;
  const element = e.altKey
    ? target?.closest<HTMLElement>('[data-preview-edit-id$=":root"]') ?? null
    : target
      ? findHoverableElement(target, blockElement)
      : null;

  if (!element || !blockElement) return;

  const block = blocks.find((candidate) => candidate.id === blockElement.dataset.blockId);
  if (!block) return;

  const elementId = element.dataset.previewEditId ?? "";
  const isRoot = elementId.endsWith(":root");
  const fallbackLabel = isRoot
    ? (block.label ?? block.name ?? block.props.kind ?? "Section Container")
    : getElementLabel(element);

  const ownerDoc = element.ownerDocument || document;
  const ownerWin = ownerDoc.defaultView || window;
  const computed = ownerWin.getComputedStyle(element);
  const parsedWidth = parseFloat(computed.width);
  const parsedHeight = parseFloat(computed.height);
  const safeW = !isNaN(parsedWidth) && parsedWidth > 0 ? Math.round(parsedWidth) : Math.round(element.offsetWidth || element.getBoundingClientRect().width);
  const safeH = !isNaN(parsedHeight) && parsedHeight > 0 ? Math.round(parsedHeight) : Math.round(element.offsetHeight || element.getBoundingClientRect().height);

  const computedStyle = extractElementComputedStyles(element);
  const nextSelection: PreviewElementEdit = {
    id: elementId,
    blockId: block.id,
    blockKind: block.props.kind,
    label: fallbackLabel,
    style: site.previewEdits?.elements[elementId]?.style ?? {},
    computedWidth: `${safeW}px`,
    computedHeight: `${safeH}px`,
    computedStyle,
  };

  e.stopPropagation();
  onSelectElement(nextSelection);
}

// Turns edit mode on/off. Turning it ON auto-selects the first editable
// element inside the currently active section, so the sidebar has something
// to show right away. Turning it OFF clears the selection and move mode.
export function selectFirstEditableElement(
  sortedBlocks: Block[],
  site: PreviewEditableSite,
  container: HTMLElement | null | undefined,
  activeSection: string,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
): void {
  if (!onSelectElement) return;

  const activeBlock =
    sortedBlocks.find((block) => block.props.kind === activeSection) ?? sortedBlocks.find(Boolean);

  let targetElement: HTMLElement | null = null;
  let targetBlock = activeBlock;

  if (container) {
    if (activeBlock) {
      const blockRoot = container.querySelector<HTMLElement>(`[data-block-id="${activeBlock.id}"]`);
      targetElement = blockRoot?.querySelector<HTMLElement>(
        '[data-preview-edit-id]:not([data-preview-edit-id$=":root"])',
      ) ?? null;
    }
    if (!targetElement) {
      targetElement = container.querySelector<HTMLElement>(
        '[data-preview-edit-id]:not([data-preview-edit-id$=":root"])',
      );
      if (targetElement) {
        const blkId = targetElement.closest<HTMLElement>("[data-block-id]")?.dataset.blockId;
        if (blkId) {
          targetBlock = sortedBlocks.find((b) => b.id === blkId) ?? activeBlock;
        }
      }
    }
  }

  if (targetBlock && targetElement) {
    const elementId = targetElement.dataset.previewEditId ?? "";
    const ownerDoc = targetElement.ownerDocument || document;
    const ownerWin = ownerDoc.defaultView || window;
    const firstChildComputedStyle = ownerWin.getComputedStyle(targetElement);
    const parsedWidth = parseFloat(firstChildComputedStyle.width);
    const parsedHeight = parseFloat(firstChildComputedStyle.height);
    const safeW = !isNaN(parsedWidth) && parsedWidth > 0 ? Math.round(parsedWidth) : Math.round(targetElement.offsetWidth || targetElement.getBoundingClientRect().width);
    const safeH = !isNaN(parsedHeight) && parsedHeight > 0 ? Math.round(parsedHeight) : Math.round(targetElement.offsetHeight || targetElement.getBoundingClientRect().height);

    const firstChildComputed = extractElementComputedStyles(targetElement);
    onSelectElement({
      id: elementId,
      blockId: targetBlock.id,
      blockKind: targetBlock.props.kind,
      label: getElementLabel(targetElement),
      style: site.previewEdits?.elements[elementId]?.style ?? {},
      computedWidth: `${safeW}px`,
      computedHeight: `${safeH}px`,
      computedStyle: firstChildComputed,
    });
  } else if (targetBlock) {
    const fallbackId = `${targetBlock.id}:title`;
    onSelectElement({
      id: fallbackId,
      blockId: targetBlock.id,
      blockKind: targetBlock.props.kind,
      label: "Heading",
      style: site.previewEdits?.elements[fallbackId]?.style ?? {},
      computedWidth: "auto",
      computedHeight: "auto",
      computedStyle: {},
    });
  }
}

export function handleInteractiveToggleEditMode(
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  setMoveMode: Dispatch<SetStateAction<boolean>>,
  sortedBlocks: Block[],
  site: PreviewEditableSite,
  contentRef: RefObject<HTMLElement | null>,
  activeSection: string,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
): void {
  if (!editMode && onSelectElement) {
    selectFirstEditableElement(
      sortedBlocks,
      site,
      contentRef.current,
      activeSection,
      onSelectElement,
    );
  }

  if (editMode) {
    setMoveMode(false);
    onSelectElement?.(null);
  }
  toggleEditMode(setEditMode, sortedBlocks, site, onSelectElement);
}

// Called continuously while resizing the responsive preview frame. Batches
// updates into a single animation frame per tick so dragging stays smooth.
export function handleFrameResizeMove(
  e: MouseEvent,
  dragStateRef: { current: FrameDragState | null },
  dragPointerRef: { current: { x: number; y: number } | null },
  dragRafRef: { current: number | null },
  setSize: Dispatch<SetStateAction<{ width: number; height: number }>>,
  minWidth = 280,
  maxWidth = 1400,
  minHeight = 400,
  maxHeight = 1400,
): void {
  const drag = dragStateRef.current;
  if (!drag) return;
  dragPointerRef.current = { x: e.clientX, y: e.clientY };
  if (dragRafRef.current !== null) return;

  dragRafRef.current = requestAnimationFrame(() => {
    dragRafRef.current = null;
    const pos = dragPointerRef.current;
    const currentDrag = dragStateRef.current;
    if (!pos || !currentDrag) return;
    const nextSize = calculateFrameResize(
      currentDrag,
      pos.x,
      pos.y,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
    );
    setSize(nextSize);
  });
}

// Thin wrapper that kicks off a free element drag when the user presses the
// mouse down inside the preview, but only if move mode is actually on.
export function handleContentFreeDragStart(
  e: ReactMouseEvent,
  editMode: boolean,
  moveMode: boolean,
  device: "desktop" | "responsive",
  scale: number,
  onChangeElementStyle?: (elementId: string, patch: Partial<PreviewElementStyle>) => void,
  setDragGuides?: (guides: GuideLine[]) => void,
  setDraggingElementId?: (id: string | null) => void,
  blocks?: Block[],
  site?: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
  selectedElement?: PreviewElementEdit | null,
): void {
  startElementFreeDrag(
    e,
    moveMode,
    device,
    scale,
    (elementId, patch) => onChangeElementStyle?.(elementId, patch),
    setDragGuides ?? (() => { }),
    setDraggingElementId ?? (() => { }),
    blocks,
    site,
    onSelectElement,
    selectedElement,
  );
}
// ============================================================
// TemplateLivePreview
// ============================================================

// Everything we need to remember about an in-progress frame resize drag.
export type FrameDragState = {
  edge: "left" | "right" | "bottom" | "corner";
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startScale: number;
};

// Given the drag's starting point and the mouse's current position, works out
// the frame's new width/height — different edges affect different dimensions,
// and the result is always clamped between the given min/max limits.
export function calculateFrameResize(
  drag: FrameDragState,
  clientX: number,
  clientY: number,
  minWidth = 280,
  maxWidth = 1400,
  minHeight = 400,
  maxHeight = 1400,
): { width: number; height: number } {
  const dx = (clientX - drag.startX) / drag.startScale;
  const dy = (clientY - drag.startY) / drag.startScale;

  let nextWidth = drag.startWidth;
  let nextHeight = drag.startHeight;

  if (drag.edge === "left") nextWidth = drag.startWidth - dx * 2;
  else if (drag.edge === "right") nextWidth = drag.startWidth + dx * 2;
  else if (drag.edge === "bottom") nextHeight = drag.startHeight + dy;
  else if (drag.edge === "corner") {
    nextWidth = drag.startWidth + dx * 2;
    nextHeight = drag.startHeight + dy;
  }

  nextWidth = Math.min(maxWidth, Math.max(minWidth, nextWidth));
  nextHeight = Math.min(maxHeight, Math.max(minHeight, nextHeight));
  return { width: nextWidth, height: nextHeight };
}

// Works out the zoom level needed to fit the responsive frame inside the
// visible viewport (with some padding), never zooming in past 100%.
export function calculateViewportScale(
  viewportWidth: number,
  viewportHeight: number,
  frameWidth: number,
  frameHeight: number,
  padding = 40,
): number {
  const availW = viewportWidth - padding * 2;
  const availH = viewportHeight - padding * 2;
  const next = Math.min(1, availW / frameWidth, availH / frameHeight);
  return Number.isFinite(next) && next > 0 ? next : 1;
}

// Tags a DOM element with a unique "block:path" id so we can later find it
// again and know exactly which block/element it belongs to.
export function stampEditableElement(element: HTMLElement, blockId: string, path: string): void {
  element.dataset.previewEditId = `${blockId}:${path}`;
}

// Checks if a DOM element is part of editor chrome/overlays (resize bars, drag handles, guides)
// so it doesn't get indexed or stamped as editable template content.
export function isChromeElement(el: Element | null | undefined): boolean {
  if (!el || typeof (el as Element).getAttribute !== "function") return false;
  return Boolean(
    el.hasAttribute("data-preview-chrome") ||
    el.closest?.("[data-preview-chrome]") ||
    el.hasAttribute("data-blend-ignore") ||
    el.closest?.("[data-blend-ignore]") ||
    el.hasAttribute("data-block-drag-handle") ||
    el.closest?.("[data-block-drag-handle]")
  );
}

// Works out an element's position path (e.g. "0.2.1") by walking up the DOM
// from the element to the block's root, recording each parent's child index.
// NEW
export function getElementPath(root: HTMLElement, element: HTMLElement): string {
  if (isChromeElement(element)) return "";
  const parts: number[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== root) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) return "";
    const siblings = Array.from(parent.children).filter(
      (el) => !isChromeElement(el),
    );
    const idx = siblings.indexOf(current as Element);
    if (idx === -1) return "";
    parts.unshift(idx);
    current = parent;
  }

  return parts.length ? parts.join(".") : "";
}

// Picks a human-readable label for an element — its text (trimmed and
// shortened), or its alt text if it's an image, or just its tag name.
export function getElementLabel(element: HTMLElement): string {
  const text = element.innerText?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 48);
  if (element instanceof HTMLImageElement) return element.alt || "Image";
  return element.tagName.toLowerCase();
}

// Tracks which CSS properties and attributes the editor applied to each element.
// Unedited elements are NEVER touched, preserving template inline styles (theme.surface, theme.accent, theme.bgSecond, etc.).
const appliedStylesByElement = new WeakMap<HTMLElement, Set<string>>();
const originalStylesBeforeEdit = new WeakMap<HTMLElement, Map<string, string>>();

function rememberOriginalStyle(element: HTMLElement, prop: string): void {
  let map = originalStylesBeforeEdit.get(element);
  if (!map) {
    map = new Map();
    originalStylesBeforeEdit.set(element, map);
  }
  if (!map.has(prop)) {
    map.set(prop, element.style.getPropertyValue(prop));
  }
}

function restoreOriginalStyle(element: HTMLElement, prop: string): void {
  const map = originalStylesBeforeEdit.get(element);
  if (map && map.has(prop)) {
    const orig = map.get(prop);
    if (orig && orig !== "") {
      element.style.setProperty(prop, orig);
    } else {
      element.style.removeProperty(prop);
    }
    map.delete(prop);
  } else {
    element.style.removeProperty(prop);
  }
}

// Applies one element's saved style (bold, color, size, position, etc.)
// directly onto its real DOM node. This is what makes saved edits actually
// show up visually in the preview.
export function applyPreviewStyle(
  element: HTMLElement,
  style: PreviewElementStyle | undefined,
  device: "desktop" | "responsive",
  breakpoint: ResponsiveBreakpoint = "desktop",
  allElements?: Record<string, PreviewElementEdit>,
): void {
  if (!element || !style || Object.keys(style).length === 0) return;

  const appliedProps = new Set<string>();

  const resolve = <K extends keyof PreviewElementStyle>(key: K): PreviewElementStyle[K] =>
    resolveResponsiveValue(style, key, breakpoint);

  const controlled = (key: keyof PreviewElementStyle): boolean => isPropControlled(style, key);

  const isImportant = resolve("isImportant");
  const imp = isImportant ? "important" : "";
  const setProp = (prop: string, val: string | undefined | null, priority = imp) => {
    if (val !== undefined && val !== null && val !== "") {
      rememberOriginalStyle(element, prop);
      element.style.setProperty(prop, val, priority);
      appliedProps.add(prop);
    } else {
      restoreOriginalStyle(element, prop);
      appliedProps.delete(prop);
    }
  };

  // Typography
  if (controlled("bold") || controlled("fontWeight")) {
    const bold = resolve("bold");
    const fontWeight = resolve("fontWeight");
    if (bold !== undefined || fontWeight !== undefined) {
      const weight = bold !== undefined ? (bold ? "700" : "400") : (fontWeight || "400");
      setProp("font-weight", String(weight));
    } else {
      element.style.removeProperty("font-weight");
    }
  }

  if (controlled("italic")) {
    const italic = resolve("italic");
    if (italic !== undefined) {
      setProp("font-style", italic ? "italic" : "normal");
    } else {
      element.style.removeProperty("font-style");
    }
  }

  if (controlled("underline") || controlled("strikethrough")) {
    const underline = resolve("underline");
    const strikethrough = resolve("strikethrough");
    if (underline || strikethrough) {
      const decorations: string[] = [];
      if (underline) decorations.push("underline");
      if (strikethrough) decorations.push("line-through");
      setProp("text-decoration", decorations.join(" "));
    } else {
      element.style.removeProperty("text-decoration");
    }
  }

  if (controlled("fontFamily")) {
    const fontFamily = resolve("fontFamily");
    if (fontFamily && fontFamily !== "inherit") {
      setProp("font-family", fontFamily);
    } else {
      element.style.removeProperty("font-family");
    }
  }

  if (controlled("fontSize")) {
    const fontSize = resolve("fontSize");
    if (fontSize) {
      setProp("font-size", `${fontSize}px`);
    } else {
      element.style.removeProperty("font-size");
    }
  }

  if (controlled("lineHeight")) {
    const lineHeight = resolve("lineHeight");
    if (lineHeight) {
      setProp("line-height", `${lineHeight}`);
    } else {
      element.style.removeProperty("line-height");
    }
  }

  if (controlled("letterSpacing")) {
    const letterSpacing = resolve("letterSpacing");
    if (letterSpacing !== undefined && letterSpacing !== null) {
      setProp("letter-spacing", `${letterSpacing}px`);
    } else {
      element.style.removeProperty("letter-spacing");
    }
  }

  if (controlled("textAlign")) {
    const textAlign = resolve("textAlign");
    if (textAlign) {
      setProp("text-align", textAlign);
    } else {
      element.style.removeProperty("text-align");
    }
  }

  if (controlled("textTransform")) {
    const textTransform = resolve("textTransform");
    if (textTransform && textTransform !== "none") {
      setProp("text-transform", textTransform);
    } else {
      element.style.removeProperty("text-transform");
    }
  }

  // Color & Descendant Cascading
  if (controlled("color")) {
    const color = resolve("color");
    if (color) {
      setProp("color", color, "important");
      setProp("--ai-theme-ink", color);
      setProp("--theme-ink", color);
      setProp("--ink", color);
    } else {
      setProp("color", null);
      setProp("--ai-theme-ink", null);
      setProp("--theme-ink", null);
      setProp("--ink", null);
    }

    const textDescendants = element.querySelectorAll<HTMLElement>("*");
    textDescendants.forEach((child) => {
      if (isChromeElement(child)) return;
      const childEditId = child.dataset.previewEditId;
      const childHasOwnColor = Boolean(
        childEditId &&
        allElements &&
        allElements[childEditId]?.style &&
        resolveResponsiveValue(allElements[childEditId].style, "color", breakpoint) !== undefined
      );
      if (!childHasOwnColor) {
        if (color) {
          rememberOriginalStyle(child, "color");
          rememberOriginalStyle(child, "--ai-theme-ink");
          rememberOriginalStyle(child, "--theme-ink");
          rememberOriginalStyle(child, "--ink");
          child.style.setProperty("color", color, "important");
          child.style.setProperty("--ai-theme-ink", color);
          child.style.setProperty("--theme-ink", color);
          child.style.setProperty("--ink", color);
          child.setAttribute("data-preview-cascaded-color", "true");
          appliedProps.add("cascaded-color");
        } else {
          restoreOriginalStyle(child, "color");
          restoreOriginalStyle(child, "--ai-theme-ink");
          restoreOriginalStyle(child, "--theme-ink");
          restoreOriginalStyle(child, "--ink");
          child.removeAttribute("data-preview-cascaded-color");
        }
      }
    });
  }

  if (controlled("textShadow")) {
    const textShadow = resolve("textShadow");
    if (textShadow) {
      setProp("text-shadow", textShadow);
    } else {
      element.style.removeProperty("text-shadow");
    }
  }

  // Gradient Text
  if (controlled("gradientText")) {
    const gradientText = resolve("gradientText");
    const backgroundGradient = resolve("backgroundGradient");
    if (gradientText) {
      setProp("background-image", backgroundGradient || "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)");
      setProp("-webkit-background-clip", "text");
      setProp("background-clip", "text");
      setProp("-webkit-text-fill-color", "transparent");
    } else {
      setProp("-webkit-background-clip", null);
      setProp("background-clip", null);
      setProp("-webkit-text-fill-color", null);
    }
  }

  // Background & Colors
  if (controlled("glassmorphism") || controlled("backgroundColor") || controlled("backgroundImage") || controlled("backgroundGradient")) {
    const glassmorphism = resolve("glassmorphism");
    const backgroundColor = resolve("backgroundColor");
    const backgroundImage = resolve("backgroundImage");
    const backgroundGradient = resolve("backgroundGradient");

    if (glassmorphism) {
      setProp("background-color", "rgba(255, 255, 255, 0.08)");
      setProp("backdrop-filter", "blur(16px)");
      setProp("-webkit-backdrop-filter", "blur(16px)");
      setProp("border", "1px solid rgba(255, 255, 255, 0.18)");
      setProp("box-shadow", "0 8px 32px 0 rgba(0, 0, 0, 0.25)");
    } else {
      if (glassmorphism === false) {
        setProp("backdrop-filter", null);
        setProp("-webkit-backdrop-filter", null);
      }
      if (controlled("backgroundColor")) {
        setProp("background-color", backgroundColor || null);
      }
      if (controlled("backgroundGradient") || controlled("backgroundImage")) {
        setProp("background-image", backgroundGradient || backgroundImage || null);
      }
    }
  }

  if (controlled("opacity")) {
    const opacity = resolve("opacity");
    if (opacity !== undefined && opacity !== null) {
      setProp("opacity", `${opacity}`);
    } else {
      element.style.removeProperty("opacity");
    }
  }

  // Borders & Shadow
  if (controlled("borderRadius")) {
    const borderRadius = resolve("borderRadius");
    if (borderRadius !== undefined && borderRadius !== null) {
      setProp("border-radius", `${borderRadius}px`);
    } else {
      element.style.removeProperty("border-radius");
    }
  }

  if (controlled("borderWidth")) {
    const borderWidth = resolve("borderWidth");
    if (borderWidth !== undefined && borderWidth !== null) {
      setProp("border-width", `${borderWidth}px`);
    } else {
      element.style.removeProperty("border-width");
    }
  }

  if (controlled("borderStyle")) {
    const borderStyle = resolve("borderStyle");
    if (borderStyle) {
      setProp("border-style", borderStyle);
    } else {
      element.style.removeProperty("border-style");
    }
  }

  if (controlled("borderColor")) {
    const borderColor = resolve("borderColor");
    if (borderColor) {
      setProp("border-color", borderColor);
    } else {
      element.style.removeProperty("border-color");
    }
  }

  if (controlled("glowAccent") || controlled("boxShadow")) {
    const glowAccent = resolve("glowAccent");
    const boxShadow = resolve("boxShadow");
    if (glowAccent) {
      setProp("box-shadow", "0 0 25px rgba(99, 102, 241, 0.6), 0 0 50px rgba(99, 102, 241, 0.3)");
    } else if (boxShadow && boxShadow !== "none") {
      setProp("box-shadow", boxShadow);
    } else {
      element.style.removeProperty("box-shadow");
    }
  }

  if (controlled("backdropBlur")) {
    const backdropBlur = resolve("backdropBlur");
    if (backdropBlur !== undefined && backdropBlur !== null) {
      setProp("backdrop-filter", `blur(${backdropBlur}px)`);
      setProp("-webkit-backdrop-filter", `blur(${backdropBlur}px)`);
    } else {
      element.style.removeProperty("backdrop-filter");
      element.style.removeProperty("-webkit-backdrop-filter");
    }
  }

  // Spacing & Dimensions
  if (controlled("padding")) {
    const padding = resolve("padding");
    if (padding !== undefined && padding !== null) {
      setProp("padding", `${padding}px`);
    } else {
      element.style.removeProperty("padding");
    }
  }

  if (controlled("margin")) {
    const margin = resolve("margin");
    if (margin !== undefined && margin !== null) {
      setProp("margin", `${margin}px`);
    } else {
      element.style.removeProperty("margin");
    }
  }

  if (controlled("width")) {
    const width = resolve("width");
    if (width) {
      const formattedWidth = /^\d+(\.\d+)?$/.test(String(width).trim()) ? `${String(width).trim()}px` : String(width).trim();
      setProp("width", formattedWidth);
      setProp("max-width", "none", "important");
      setProp("min-width", "0", "important");
    } else {
      setProp("width", null);
      setProp("max-width", null);
      setProp("min-width", null);
    }
  }

  if (controlled("height")) {
    const height = resolve("height");
    if (height) {
      const formattedHeight = /^\d+(\.\d+)?$/.test(String(height).trim()) ? `${String(height).trim()}px` : String(height).trim();
      setProp("height", formattedHeight);
      setProp("max-height", "none", "important");
      setProp("min-height", "0", "important");
    } else {
      setProp("height", null);
      setProp("max-height", null);
      setProp("min-height", null);
    }
  }

  if (controlled("zIndex")) {
    const zIndex = resolve("zIndex");
    if (zIndex !== undefined && zIndex !== null) {
      setProp("z-index", `${zIndex}`);
    } else {
      element.style.removeProperty("z-index");
    }
  }

  if (controlled("removed") || controlled("display")) {
    const removed = resolve("removed");
    const display = resolve("display");
    if (removed) {
      setProp("display", "none");
    } else if (display) {
      setProp("display", display);
    } else {
      element.style.removeProperty("display");
    }
  }

  if (controlled("hidden") || controlled("visibility")) {
    const hidden = resolve("hidden");
    const visibility = resolve("visibility");
    if (hidden) {
      setProp("visibility", "hidden");
    } else if (visibility && visibility !== "hidden") {
      setProp("visibility", visibility);
    } else {
      element.style.removeProperty("visibility");
    }
  }

  if (controlled("cursor")) {
    const cursor = resolve("cursor");
    if (cursor) {
      setProp("cursor", cursor);
    } else {
      element.style.removeProperty("cursor");
    }
  }

  if (controlled("overflow")) {
    const overflow = resolve("overflow");
    if (overflow) {
      setProp("overflow", overflow);
    } else {
      element.style.removeProperty("overflow");
    }
  }

  if (controlled("rotate") || controlled("scale")) {
    const rotate = resolve("rotate");
    const scale = resolve("scale");
    if (rotate || scale) {
      const transforms: string[] = [];
      if (rotate) transforms.push(`rotate(${rotate}deg)`);
      if (scale) transforms.push(`scale(${scale})`);
      setProp("transform", transforms.join(" "));
    } else {
      element.style.removeProperty("transform");
    }
  }

  if (controlled("freePositioned")) {
    const freePositioned = resolve("freePositioned");
    if (freePositioned) {
      const x = resolve("x");
      const y = resolve("y");
      const desktopCoords = resolve("desktop");
      const mobileCoords = resolve("mobile");
      const tabletCoords = resolve("tablet" as any);

      let coords: { x: number; y: number } | undefined;
      if (breakpoint === "desktop") {
        coords = desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      } else if (breakpoint === "tablet") {
        coords = tabletCoords || desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      } else {
        coords = mobileCoords || desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      }

      if (coords) {
        const isAbs =
          element.style.position === "absolute" ||
          ((element.getAttribute("class") || "").includes("absolute")) ||
          (typeof window !== "undefined" && window.getComputedStyle(element).position === "absolute");
        setProp("position", isAbs ? "absolute" : "relative", "important");
        setProp("left", `${coords.x}px`, "important");
        setProp("top", `${coords.y}px`, "important");
        setProp("right", "auto", "important");
        setProp("bottom", "auto", "important");
        setProp("z-index", "250", "important");
        element.setAttribute("data-free-positioned", "true");
        appliedProps.add("data-free-positioned");

        // Elevate blockRoot and canvas wrapper so cross-block drops are never hidden
        let p = element.parentElement;
        while (p && !p.hasAttribute("data-block-id") && p.tagName !== "BODY") {
          p = p.parentElement;
        }
        if (p && p.hasAttribute("data-block-id")) {
          p.setAttribute("data-has-free-positioned", "true");
          p.style.setProperty("overflow", "visible", "important");
          p.style.setProperty("position", "relative", "important");
          p.style.setProperty("z-index", "200", "important");
          let wrapper = p.parentElement;
          while (wrapper && wrapper.tagName !== "BODY" && !wrapper.classList.contains("preview-edit-canvas")) {
            wrapper.setAttribute("data-has-free-positioned", "true");
            wrapper.style.setProperty("overflow", "visible", "important");
            wrapper.style.setProperty("position", "relative", "important");
            wrapper.style.setProperty("z-index", "200", "important");
            wrapper = wrapper.parentElement;
          }
        }
      } else {
        setProp("position", null);
        setProp("left", null);
        setProp("top", null);
        setProp("right", null);
        setProp("bottom", null);
        setProp("z-index", null);
        element.removeAttribute("data-free-positioned");
        appliedProps.delete("data-free-positioned");
      }
    } else {
      setProp("position", null);
      setProp("left", null);
      setProp("top", null);
      setProp("right", null);
      setProp("bottom", null);
      setProp("z-index", null);
      element.removeAttribute("data-free-positioned");
      appliedProps.delete("data-free-positioned");
    }
  }

  if (controlled("hoverEffect")) {
    const hoverEffect = resolve("hoverEffect");
    if (hoverEffect && hoverEffect !== "none") {
      element.setAttribute("data-hover-fx", hoverEffect);
      appliedProps.add("data-hover-fx");
    } else {
      element.removeAttribute("data-hover-fx");
      appliedProps.delete("data-hover-fx");
    }
  }

  if (controlled("entrance")) {
    const entrance = resolve("entrance");
    const entranceDuration = resolve("entranceDuration");
    if (entrance && entrance !== "none") {
      element.setAttribute("data-entrance-fx", entrance);
      appliedProps.add("data-entrance-fx");
      setProp("animation-duration", `${entranceDuration !== undefined ? entranceDuration : 0.6}s`);
    } else {
      element.removeAttribute("data-entrance-fx");
      appliedProps.delete("data-entrance-fx");
      setProp("animation-duration", null);
    }
  }

  // Reconcile with previously applied properties: any property that was
  // previously applied to this element by the editor but is no longer in
  // appliedProps gets restored.
  const prevApplied = appliedStylesByElement.get(element);
  if (prevApplied) {
    for (const prop of prevApplied) {
      if (!appliedProps.has(prop)) {
        if (prop.startsWith("data-")) {
          element.removeAttribute(prop);
        } else if (prop === "cascaded-color") {
          element.querySelectorAll<HTMLElement>("[data-preview-cascaded-color]").forEach((child) => {
            restoreOriginalStyle(child, "color");
            restoreOriginalStyle(child, "--ai-theme-ink");
            restoreOriginalStyle(child, "--theme-ink");
            restoreOriginalStyle(child, "--ink");
            child.removeAttribute("data-preview-cascaded-color");
          });
        } else {
          restoreOriginalStyle(element, prop);
        }
      }
    }
  }

  appliedStylesByElement.set(element, appliedProps);
  if (appliedProps.size > 0) {
    element.setAttribute("data-preview-applied-props", Array.from(appliedProps).join(";"));
  } else {
    element.removeAttribute("data-preview-applied-props");
    appliedStylesByElement.delete(element);
  }
}

export function clearPreviewStyle(element: HTMLElement): void {
  // If the editor never touched this element, leave it completely alone!
  // This preserves template inline styles (theme.surface, theme.accent, theme.bgSecond, etc.).
  const applied = appliedStylesByElement.get(element);
  const attr = element.getAttribute("data-preview-applied-props");
  if ((!applied || applied.size === 0) && !attr) {
    return;
  }

  const propsToClear = applied && applied.size > 0
    ? new Set(applied)
    : new Set(attr?.split(";").filter(Boolean));

  for (const prop of propsToClear) {
    if (prop.startsWith("data-")) {
      element.removeAttribute(prop);
    } else if (prop === "cascaded-color") {
      element.querySelectorAll<HTMLElement>("[data-preview-cascaded-color]").forEach((child) => {
        restoreOriginalStyle(child, "color");
        restoreOriginalStyle(child, "--ai-theme-ink");
        restoreOriginalStyle(child, "--theme-ink");
        restoreOriginalStyle(child, "--ink");
        child.removeAttribute("data-preview-cascaded-color");
      });
    } else {
      restoreOriginalStyle(element, prop);
    }
  }

  element.removeAttribute("data-free-positioned");
  element.removeAttribute("data-hover-fx");
  element.removeAttribute("data-entrance-fx");
  element.removeAttribute("data-preview-applied-props");

  appliedStylesByElement.delete(element);
  originalStylesBeforeEdit.delete(element);
}

const PREVIEW_EFFECTS_STYLE_ID = "preview-effects-styles";

// Injects one shared <style> tag (once per document) containing the actual
// CSS rules for hover effects and entrance animations. applyPreviewStyle
// only ever sets a data-attribute — this stylesheet is what makes it visible.
export function ensurePreviewEffectsStylesheet(doc: Document | null | undefined): void {
  if (!doc) return;
  if (doc.getElementById(PREVIEW_EFFECTS_STYLE_ID)) return;

  const styleEl = doc.createElement("style");
  styleEl.id = PREVIEW_EFFECTS_STYLE_ID;
  styleEl.textContent = `
    [data-hover-fx="grow"] { transition: transform 0.2s ease; }
    [data-hover-fx="grow"]:hover { transform: scale(1.04); }

    [data-hover-fx="lift"] { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    [data-hover-fx="lift"]:hover { transform: translateY(-6px); box-shadow: 0 14px 28px -8px rgba(0,0,0,0.28); }

    [data-hover-fx="glow"] { transition: box-shadow 0.2s ease; }
    [data-hover-fx="glow"]:hover { box-shadow: 0 0 26px rgba(99,102,241,0.55); }

    [data-hover-fx="darken"] { transition: filter 0.2s ease; }
    [data-hover-fx="darken"]:hover { filter: brightness(0.85); }

    @keyframes pe-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pe-slide-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pe-zoom-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

    [data-entrance-fx="fade"] { animation: pe-fade-in 0.5s ease both; }
    [data-entrance-fx="slideUp"] { animation: pe-slide-up 0.5s ease both; }
    [data-entrance-fx="zoom"] { animation: pe-zoom-in 0.4s ease both; }

    [data-block-kind="navbar"] header,
    [data-block-kind="navbar"] nav {
      position: relative !important;
      top: auto !important;
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
    [data-has-free-positioned="true"] .group\\/block,
    [data-has-free-positioned="true"] .group\\/dragblock {
      overflow: visible !important;
    }

    .preview-edit-canvas.move-active section,
    .preview-edit-canvas.move-active [data-block-id],
    .preview-edit-canvas.move-active .group\\/block,
    .preview-edit-canvas.move-active .group\\/dragblock {
      overflow: visible !important;
    }
  `;
  doc.head.appendChild(styleEl);
}

// Walks the whole preview tree, stamps every element with its editable id,
// highlights whichever one is currently selected, and re-applies every
// element's saved style. Runs on both the desktop preview and the iframe.
export function tagAndApplyPreviewStyles(
  root: HTMLElement | null,
  blocks: Block[],
  selectedElementId: string | null | undefined,
  previewEdits: SiteData["previewEdits"] | undefined,
  device: "desktop" | "responsive",
  breakpoint: ResponsiveBreakpoint = "desktop",
): void {
  if (!root) return;

  ensurePreviewEffectsStylesheet(root.ownerDocument);

  const elements = previewEdits?.elements;

  // Track which blocks contain free-positioned elements
  const blocksWithFreePos = new Set<string>();
  if (elements) {
    for (const [editKey, editData] of Object.entries(elements)) {
      if (editData?.style?.freePositioned) {
        const bId = editData.blockId || editKey.split(":")[0];
        if (bId) blocksWithFreePos.add(bId);
      }
    }
  }

  root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((blockRoot) => {
    const blockId = blockRoot.dataset.blockId;
    if (!blockId) return;

    const block = blocks.find((b) => b.id === blockId);
    const sectionId = block ? getBlockSectionId(block) : "";
    if (sectionId && !blockRoot.querySelector(`#${sectionId}`)) {
      blockRoot.id = sectionId;
    } else if (!sectionId) {
      blockRoot.removeAttribute("id");
    }

    const hasFree = blocksWithFreePos.has(blockId);
    const wrapper = blockRoot.parentElement;

    if (hasFree) {
      blockRoot.setAttribute("data-has-free-positioned", "true");
      blockRoot.style.setProperty("overflow", "visible", "important");
      blockRoot.style.setProperty("position", "relative", "important");
      blockRoot.style.setProperty("z-index", "200", "important");
      if (wrapper && !wrapper.classList.contains("preview-edit-canvas")) {
        wrapper.setAttribute("data-has-free-positioned", "true");
        wrapper.style.setProperty("overflow", "visible", "important");
        wrapper.style.setProperty("position", "relative", "important");
        wrapper.style.setProperty("z-index", "200", "important");
      }
    } else {
      blockRoot.removeAttribute("data-has-free-positioned");
      blockRoot.style.setProperty("position", "relative", "important");
      blockRoot.style.setProperty("z-index", "1", "important");
      if (wrapper && !wrapper.classList.contains("preview-edit-canvas")) {
        wrapper.removeAttribute("data-has-free-positioned");
        wrapper.style.setProperty("position", "relative", "important");
        wrapper.style.setProperty("z-index", "1", "important");
      }
    }

    if (block) {
      applyPreviewBlockSurfaceStyles(blockRoot, block);
    }

    if (!blockRoot.dataset.previewEditId) {
      stampEditableElement(blockRoot, blockId, "root");
    }

    blockRoot.querySelectorAll<HTMLElement>("*").forEach((element) => {
      if (!element.dataset.previewEditId) {
        const path = getElementPath(blockRoot, element);
        if (path) stampEditableElement(element, blockId, path);
      }
    });
  });

  root.querySelectorAll<HTMLElement>("[data-preview-edit-id]").forEach((element) => {
    const editId = element.dataset.previewEditId;
    const isSelected = Boolean(editId && editId === selectedElementId);

    element.classList.toggle("preview-edit-selected", isSelected);

    if (elements && editId && elements[editId]?.style) {
      applyPreviewStyle(element, elements[editId].style, device, breakpoint, elements);
    } else {
      clearPreviewStyle(element);
    }
  });

  // Re-apply block-level bg/height after per-element preview styles.
  root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((blockRoot) => {
    const blockId = blockRoot.dataset.blockId;
    if (!blockId) return;
    const block = blocks.find((b) => b.id === blockId);
    if (block) {
      applyPreviewBlockSurfaceStyles(blockRoot, block);
    }
  });
}

export function getBlockSectionId(block: Block): string {
  if (block.sectionHref !== undefined) {
    const clean = block.sectionHref.replace(/^#+/, "").trim();
    if (!clean) return "";
    return clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  const raw = block.props.kind === "hero"
    ? "home"
    : (block.label || block.name || block.props.kind);
  return raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ------------------------------------------------------------
// Hover highlighting (used by both the desktop preview and the
// responsive iframe preview)
// ------------------------------------------------------------

// A vertical or horizontal alignment guide line, shown while dragging.
export type GuideLine = {
  type: "v" | "h";
  position: number;
  start?: number;
  end?: number;
  emphasis?: "center" | "edge" | "canvas";
};

// A ref-like object holding whatever HTML element is currently hovered.
type HoverRef = { current: HTMLElement | null };

// Highlights whichever editable element the mouse is currently over, and
// un-highlights the previous one. Holding Alt highlights the whole section
// (the block's "root" element) instead of the specific piece under the cursor.
const HOVER_OUTLINE_COLOR = "#10b981cc";

// `instanceof Element` only works for elements created by this window. The
// responsive preview is rendered in an iframe, whose elements have a
// different Element constructor, so use the DOM shape instead.
function getPreviewElementTarget(eventTarget: EventTarget | null): HTMLElement | null {
  if (
    eventTarget &&
    typeof eventTarget === "object" &&
    "nodeType" in eventTarget &&
    (eventTarget as Node).nodeType === 1 &&
    "closest" in eventTarget
  ) {
    return eventTarget as HTMLElement;
  }
  return null;
}

export function updatePreviewHoverHighlight(
  eventTarget: EventTarget | null,
  altKey: boolean,
  hoveredElementRef: HoverRef,
): void {
  if (elementDragActive) return;
  const target = getPreviewElementTarget(eventTarget);
  if (!target) {
    clearPreviewHoverHighlight(hoveredElementRef);
    return;
  }

  const blockRoot = target.closest<HTMLElement>("[data-block-id]");

  const element = altKey
    ? target.closest<HTMLElement>('[data-preview-edit-id$=":root"]')
    : findHoverableElement(target, blockRoot);

  const nextElement = element ?? null;
  if (nextElement === hoveredElementRef.current) return;

  clearPreviewHoverHighlight(hoveredElementRef);

  hoveredElementRef.current = nextElement;
  if (nextElement) {
    const isMoveMode = nextElement.closest(".preview-edit-canvas")?.classList.contains("move-active");
    nextElement.classList.add("preview-edit-hovered");
    // Applied inline, not just via class — guarantees the highlight shows
    // up even if the cloned stylesheet hasn't synced into the iframe's
    // document yet. Doesn't depend on any external CSS at all.
    nextElement.style.setProperty("outline", `2px dashed ${HOVER_OUTLINE_COLOR}`, "important");
    nextElement.style.setProperty("outline-offset", "4px", "important");
    nextElement.style.setProperty("cursor", isMoveMode ? "move" : "pointer", "important");

  }
}

// A block's own top-level rendered node (direct child of [data-block-id])
// IS that block's background/section, not a distinct editable element —
// plain hover/click shouldn't be able to grab it, only Alt (whole section) can.
function findHoverableElement(
  target: HTMLElement,
  blockRoot: HTMLElement | null,
): HTMLElement | null {
  if (isChromeElement(target)) return null;
  const candidate = target.closest<HTMLElement>(
    '[data-preview-edit-id]:not([data-preview-edit-id$=":root"])',
  );
  if (!candidate || isChromeElement(candidate)) return null;
  if (blockRoot && candidate.parentElement === blockRoot) return null;

  const isNavbar =
    blockRoot?.dataset.blockKind === "navbar" ||
    Boolean(blockRoot?.querySelector("header, nav"));

  if (isNavbar) {
    const tag = candidate.tagName.toUpperCase();
    if (tag === "HEADER" || candidate.querySelector("nav") || candidate.querySelector("header")) {
      return null;
    }
  }

  return candidate;
}

// Removes whatever hover highlight is currently showing — used when the
// mouse leaves the preview area entirely.
export function clearPreviewHoverHighlight(hoveredElementRef: HoverRef): void {
  if (hoveredElementRef.current) {
    hoveredElementRef.current.classList.remove("preview-edit-hovered");
    hoveredElementRef.current.style.removeProperty("outline");
    hoveredElementRef.current.style.removeProperty("outline-offset");
    hoveredElementRef.current.style.removeProperty("cursor");
    hoveredElementRef.current = null;
  }
}

// ------------------------------------------------------------
// Responsive (iframe) preview interactions
// ------------------------------------------------------------

// The responsive preview lives inside a separate <iframe> document, so React's
// normal onClick/onMouseMove props can't reach it. This manually wires up the
// same click-to-select and hover-highlight behavior directly on that iframe's
// body using plain DOM event listeners, and gives back a cleanup function to
// remove those listeners when the iframe is torn down or re-rendered.
export function bindResponsivePreviewInteractions(
  body: HTMLElement,
  options: {
    editMode: boolean;
    blocks: Block[];
    site: PreviewEditableSite;
    device: "desktop" | "responsive";
    onSelectElement?: (edit: PreviewElementEdit | null) => void;
    hoverRef: HoverRef;
    onMouseDown?: (e: MouseEvent) => void;
  },
): () => void {
  const { editMode, blocks, site, onSelectElement, hoverRef, onMouseDown } = options;

  // Same "find the clicked element + its block, then select it" logic as the
  // desktop preview, using capture phase so interactive children don't swallow clicks.
  function handleClick(e: MouseEvent) {
    if (!editMode || !onSelectElement) return;
    handleInteractivePreviewClick(e, editMode, blocks, site, onSelectElement);
  }

  let moveRaf: number | null = null;
  // Highlights the hovered element while in edit mode.
  function handleMouseMove(e: MouseEvent) {
    if (!editMode) return;
    const target = e.target;
    const altKey = e.altKey;
    if (moveRaf !== null) return;
    moveRaf = requestAnimationFrame(() => {
      moveRaf = null;
      updatePreviewHoverHighlight(target, altKey, hoverRef);
    });
  }

  // Clears the highlight once the mouse leaves the iframe's body.
  function handleMouseLeave() {
    if (moveRaf !== null) {
      cancelAnimationFrame(moveRaf);
      moveRaf = null;
    }
    clearPreviewHoverHighlight(hoverRef);
  }

  body.addEventListener("click", handleClick, true);
  if (onMouseDown) {
    body.addEventListener("mousedown", onMouseDown, true);
  }
  body.addEventListener("mousemove", handleMouseMove, true);
  body.addEventListener("mouseleave", handleMouseLeave);

  const doc = body.ownerDocument;
  function handleIframeKeyDown(e: KeyboardEvent) {
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    if (isCtrlOrCmd && (e.key === "z" || e.key === "Z" || e.key === "y" || e.key === "Y")) {
      const active = (body.ownerDocument || document).activeElement;
      if (
        active instanceof HTMLInputElement ||
        active instanceof HTMLTextAreaElement ||
        (active as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: e.key,
          code: e.code,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          bubbles: true,
        }),
      );
    }
  }

  if (doc) {
    doc.addEventListener("keydown", handleIframeKeyDown);
    if (doc !== document) {
      doc.addEventListener("mouseleave", handleMouseLeave);
    }
  }

  // Cleanup — call this (e.g. in a useEffect return) to unbind everything.
  return () => {
    if (moveRaf !== null) {
      cancelAnimationFrame(moveRaf);
      moveRaf = null;
    }
    body.removeEventListener("click", handleClick, true);
    if (onMouseDown) {
      body.removeEventListener("mousedown", onMouseDown, true);
    }
    body.removeEventListener("mousemove", handleMouseMove, true);
    body.removeEventListener("mouseleave", handleMouseLeave);
    if (doc) {
      doc.removeEventListener("keydown", handleIframeKeyDown);
      if (doc !== document) {
        doc.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
  };
}

// ------------------------------------------------------------
// Snapping / alignment guides for free-dragging elements (Figma-style)
// ------------------------------------------------------------

export type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  centerX: number;
  centerY: number;
  always?: boolean;
  strong?: boolean;
  inBlock?: boolean;
};

const SNAP_SCREEN_PX = 8; // responsive & magnetic snap distance in on-screen pixels (zoom-independent)
const DRAG_THRESHOLD = 5; // screen px before a drag starts
const ALIGN_EPS = 0.5; // lines closer than this count as "aligned"

function rectFromDom(r: DOMRect, containerRect: DOMRect, scale = 1): Rect {
  const s = scale || 1;
  const left = (r.left - containerRect.left) / s;
  const top = (r.top - containerRect.top) / s;
  const width = r.width / s;
  const height = r.height / s;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
}

export function rectOf(el: HTMLElement, containerRect: DOMRect, scale = 1): Rect {
  return rectFromDom(el.getBoundingClientRect(), containerRect, scale);
}

const xLines = (r: Rect) => [r.left, r.centerX, r.right];
const yLines = (r: Rect) => [r.top, r.centerY, r.bottom];

// Proximity to consider targets from other sections (canvas px)
const SNAP_PROXIMITY = 600;

const gapY = (a: Rect, b: Rect) =>
  Math.max(0, Math.max(a.top, b.top) - Math.min(a.bottom, b.bottom));
const gapX = (a: Rect, b: Rect) =>
  Math.max(0, Math.max(a.left, b.left) - Math.min(a.right, b.right));

// One snap per axis, one guide line per axis (Figma-style).



// One snap per axis, one guide line per axis (Figma-style).
// Canvas centre guides are marked "canvas" and span the full canvas.
export function computeSnap(
  dragged: Rect,
  targets: Rect[],
  threshold: number,
): { dx: number; dy: number; guides: GuideLine[] } {
  type Best = { score: number; delta: number; pos: number; center: boolean; canvas: boolean; target: Rect };
  let bestX: Best | null = null;
  let bestY: Best | null = null;
  const dX = xLines(dragged);
  const dY = yLines(dragged);

  for (const t of targets) {
    const nearY = t.always || t.inBlock || gapY(dragged, t) <= SNAP_PROXIMITY;
    const nearX = t.always || t.inBlock || gapX(dragged, t) <= SNAP_PROXIMITY;
    const tX = xLines(t);
    const tY = yLines(t);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Only snap matching alignments: center↔center (1↔1), left↔left (0↔0), right↔right (2↔2).
        // Never opposite edges (e.g. 0↔2 or 2↔0), which causes elements to instantly attach/stick to neighbors!
        if (i !== j) continue;

        if (nearY) {
          const d = tX[i] - dX[j];
          const a = Math.abs(d);
          if (a <= threshold) {
            const canvas = Boolean(t.always) && i === 1;
            const centerPair = i === 1 && j === 1;
            const score =
              a -
              (canvas ? 8 : centerPair && t.strong ? 8 : centerPair ? 5 : t.always ? 1 : 0);
            if (!bestX || score < bestX.score) {
              bestX = { score, delta: d, pos: tX[i], center: i === 1 || j === 1, canvas, target: t };
            }
          }
        }
        if (nearX) {
          const d = tY[i] - dY[j];
          const a = Math.abs(d);
          if (a <= threshold) {
            const canvas = Boolean(t.always) && i === 1;
            const centerPair = i === 1 && j === 1;
            const score =
              a -
              (canvas ? 8 : centerPair && t.strong ? 8 : centerPair ? 5 : t.always ? 1 : 0);
            if (!bestY || score < bestY.score) {
              bestY = { score, delta: d, pos: tY[i], center: i === 1 || j === 1, canvas, target: t };
            }
          }
        }
      }
    }
  }

  const dx = bestX ? (bestX as Best).delta : 0;
  const dy = bestY ? (bestY as Best).delta : 0;

  const s: Rect = {
    left: dragged.left + dx,
    right: dragged.right + dx,
    centerX: dragged.centerX + dx,
    top: dragged.top + dy,
    bottom: dragged.bottom + dy,
    centerY: dragged.centerY + dy,
  };

  const guides: GuideLine[] = [];

  if (bestX) {
    const bx = bestX as Best;
    let start = Math.min(s.top, bx.target.top);
    let end = Math.max(s.bottom, bx.target.bottom);
    if (bx.canvas) {
      start = bx.target.top;
      end = bx.target.bottom;
    } else {
      for (const t of targets) {
        if (t.always || (!t.inBlock && gapY(s, t) > SNAP_PROXIMITY)) continue;
        if (xLines(t).some((v) => Math.abs(v - bx.pos) <= 2)) {
          start = Math.min(start, t.top);
          end = Math.max(end, t.bottom);
        }
      }
      start = Math.max(0, start - 16);
      end = end + 16;
    }
    guides.push({
      type: "v",
      position: bx.pos,
      start,
      end,
      emphasis: bx.canvas ? "canvas" : bx.center ? "center" : "edge",
    });
  }

  if (bestY) {
    const by = bestY as Best;
    let start = Math.min(s.left, by.target.left);
    let end = Math.max(s.right, by.target.right);
    if (by.canvas) {
      start = by.target.left;
      end = by.target.right;
    } else {
      for (const t of targets) {
        if (t.always || (!t.inBlock && gapX(s, t) > SNAP_PROXIMITY)) continue;
        if (yLines(t).some((v) => Math.abs(v - by.pos) <= 2)) {
          start = Math.min(start, t.left);
          end = Math.max(end, t.right);
        }
      }
      start = Math.max(0, start - 16);
      end = end + 16;
    }
    guides.push({
      type: "h",
      position: by.pos,
      start,
      end,
      emphasis: by.canvas ? "canvas" : by.center ? "center" : "edge",
    });
  }

  return { dx, dy, guides };
}

// Collected ONCE per drag (not every frame): canvas, every block, every editable element.
function collectSnapTargets(
  canvasRoot: HTMLElement,
  draggedElement: HTMLElement,
  canvasRect: DOMRect,
  scale: number,
  blockRoot: HTMLElement,
  startRectDom?: DOMRect,
): Rect[] {
  const out: Rect[] = [];
  const seen = new Set<string>();
  const push = (r: Rect) => {
    const key = [r.left, r.top, r.right, r.bottom].map((n) => Math.round(n)).join(",");
    if (seen.has(key)) return;
    seen.add(key);
    out.push(r);
  };

  if (startRectDom) {
    const sr = rectFromDom(startRectDom, canvasRect, scale);
    push({
      left: sr.left,
      right: sr.right,
      top: sr.top,
      bottom: sr.bottom,
      centerX: sr.centerX,
      centerY: sr.centerY,
      strong: true,
      inBlock: true,
    });
  }

  // 1. Global landmarks: canvas full width/height & center
  const cw = canvasRect.width / scale;
  const ch = canvasRect.height / scale;
  push({ left: 0, top: 0, right: cw, bottom: ch, centerX: cw / 2, centerY: ch / 2, always: true });

  // 2. All section blocks
  canvasRoot.querySelectorAll<HTMLElement>("[data-block-id]").forEach((b) => {
    if (isChromeElement(b)) return;
    const r = rectOf(b, canvasRect, scale);
    if (b === blockRoot) {
      r.strong = true;
      r.inBlock = true;
    }
    push(r);
  });

  const ownerWin = draggedElement.ownerDocument.defaultView || window;
  const SVG_INNER = new Set(["PATH", "CIRCLE", "LINE", "RECT", "G", "DEFS", "POLYLINE", "POLYGON", "CLIPPAT", "USE"]);

  const isUsable = (el: HTMLElement) =>
    el !== draggedElement &&
    !draggedElement.contains(el) &&
    !el.contains(draggedElement) &&
    !isChromeElement(el) &&
    !SVG_INNER.has(el.tagName.toUpperCase());

  const pushEl = (el: HTMLElement, inBlock = false) => {
    if (!isUsable(el)) return;
    const r = el.getBoundingClientRect();
    const w = r.width / scale;
    const h = r.height / scale;
    if (w < 4 || h < 4) return;
    const rect = rectFromDom(r, canvasRect, scale);
    if (inBlock) rect.inBlock = true;
    push(rect);
  };

  // Parent container's content box (inside border + padding), like Figma's parent-frame snapping.
  const pushContentBox = (el: HTMLElement, inBlock = false) => {
    const base = rectFromDom(el.getBoundingClientRect(), canvasRect, scale);
    const cs = ownerWin.getComputedStyle(el);
    const n = (v: string) => Number.parseFloat(v) || 0;
    const left = base.left + n(cs.borderLeftWidth) + n(cs.paddingLeft);
    const right = base.right - n(cs.borderRightWidth) - n(cs.paddingRight);
    const top = base.top + n(cs.borderTopWidth) + n(cs.paddingTop);
    const bottom = base.bottom - n(cs.borderBottomWidth) - n(cs.paddingBottom);
    if (right - left < 4 || bottom - top < 4) return;
    push({
      left,
      right,
      top,
      bottom,
      centerX: (left + right) / 2,
      centerY: (top + bottom) / 2,
      strong: true,
      inBlock,
    });
  };

  // 3. Current block's padded content box & center
  pushContentBox(blockRoot, true);

  // 4. Scoped targets: walk up parent hierarchy of draggedElement up to blockRoot
  let chain: HTMLElement = draggedElement;
  let parent: HTMLElement | null = draggedElement.parentElement;

  for (let level = 0; parent && parent !== canvasRoot && level < 4; level++) {
    pushContentBox(parent, true);

    const kids = Array.from(parent.children) as HTMLElement[];
    const siblingRects: Rect[] = [];
    for (const child of kids) {
      if (child === chain || !isUsable(child)) continue;
      const r = child.getBoundingClientRect();
      const w = r.width / scale;
      const h = r.height / scale;
      if (w < 4 || h < 4) continue;
      const rect = rectFromDom(r, canvasRect, scale);
      rect.inBlock = true;
      push(rect);
      siblingRects.push(rect);
      if (level <= 1) {
        for (const grandChild of Array.from(child.children) as HTMLElement[]) {
          pushEl(grandChild, true);
        }
      }
    }

    // Gap centers between adjacent siblings (Figma equidistant distribution center snapping)
    if (siblingRects.length >= 2) {
      // Horizontal gaps (e.g. chart bars, navbar items)
      const sortedByX = [...siblingRects].sort((a, b) => a.left - b.left);
      for (let sIdx = 0; sIdx < sortedByX.length - 1; sIdx++) {
        const a = sortedByX[sIdx];
        const b = sortedByX[sIdx + 1];
        if (b.left > a.right) {
          const midX = (a.right + b.left) / 2;
          const top = Math.min(a.top, b.top);
          const bottom = Math.max(a.bottom, b.bottom);
          push({
            left: midX,
            right: midX,
            top,
            bottom,
            centerX: midX,
            centerY: (top + bottom) / 2,
            strong: true,
            inBlock: true,
          });
        }
      }

      // Vertical gaps (e.g. stacked cards, list items)
      const sortedByY = [...siblingRects].sort((a, b) => a.top - b.top);
      for (let sIdx = 0; sIdx < sortedByY.length - 1; sIdx++) {
        const a = sortedByY[sIdx];
        const b = sortedByY[sIdx + 1];
        if (b.top > a.bottom) {
          const midY = (a.bottom + b.top) / 2;
          const left = Math.min(a.left, b.left);
          const right = Math.max(a.right, b.right);
          push({
            left,
            right,
            top: midY,
            bottom: midY,
            centerX: (left + right) / 2,
            centerY: midY,
            strong: true,
            inBlock: true,
          });
        }
      }
    }

    if (parent === blockRoot) break;
    chain = parent;
    parent = parent.parentElement;
  }

  // 5. Also collect other visible editable elements in the section
  blockRoot.querySelectorAll<HTMLElement>("[data-preview-edit-id]").forEach((el) => {
    pushEl(el, true);
  });

  return out;
}

export function isDraggableElement(el: HTMLElement, blockRoot: HTMLElement): boolean {
  if (!el || el === blockRoot || el === document.body) return false;
  if (isChromeElement(el)) return false;

  const editId = el.dataset.previewEditId;
  if (!editId || editId.endsWith(":root")) return false;

  const tag = el.tagName.toUpperCase();
  if (["SECTION", "HEADER", "FOOTER", "MAIN", "BODY"].includes(tag)) return false;

  if (el.parentElement === blockRoot) return false;
  if (el.classList.contains("group/block") || el.hasAttribute("data-block-id")) return false;

  const blockRect = blockRoot.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  // If this is a navbar block or contains navbar elements:
  const isNavbar =
    blockRoot.dataset.blockKind === "navbar" ||
    Boolean(blockRoot.querySelector("header, nav"));

  if (isNavbar) {
    // The nav element itself (links group) is draggable so all links can be moved at once
    if (tag === "NAV") return true;

    // The top-level bar/container of the navbar should not be dragged as a single unit
    if (el.querySelector("nav") || el.closest("header") === el || el.querySelector("header")) {
      return false;
    }
    // Any container wrapping the entire navbar layout
    if (elRect.width >= blockRect.width * 0.7 && el.children.length > 1) {
      return false;
    }
  }

  if (
    ["DIV", "ARTICLE", "MAIN", "SECTION"].includes(tag) &&
    elRect.width >= blockRect.width * 0.88 &&
    elRect.height >= blockRect.height * 0.75 &&
    el.children.length > 1
  ) {
    return false;
  }

  return true;
}
export function findCardOrCompositeElement(
  target: HTMLElement,
  blockRoot: HTMLElement,
): HTMLElement | null {
  if (!target || target === blockRoot || target === target.ownerDocument?.body) return null;

  let curr: HTMLElement | null = target;
  let matchedCard: HTMLElement | null = null;

  while (curr && curr !== blockRoot && curr !== curr.ownerDocument?.body) {
    if (curr.parentElement === blockRoot) {
      const tag = curr.tagName.toUpperCase();
      if (["SECTION", "HEADER", "FOOTER", "MAIN"].includes(tag)) break;
    }

    const tag = curr.tagName.toUpperCase();
    if (["SECTION", "HEADER", "FOOTER", "MAIN", "BODY"].includes(tag)) break;
    if (curr.dataset.previewEditId?.endsWith(":root")) break;

    const win = curr.ownerDocument?.defaultView || window;
    const cs = win.getComputedStyle(curr);

    const isAbs = curr.style.position === "absolute" || cs.position === "absolute";
    const isFree = curr.hasAttribute("data-free-positioned");

    const cls = typeof curr.className === "string" ? curr.className : "";
    const hasCardShape =
      /rounded-(?:[23]?xl|lg|md|\[\d+px\])/.test(cls) &&
      (cls.includes("shadow-") || cls.includes("border") || cls.includes("backdrop-blur")) &&
      /(?:^|\s)p[xy]?-/.test(cls);

    if (isAbs && curr.children.length > 0 && isDraggableElement(curr, blockRoot)) {
      matchedCard = curr;
    } else if (isFree && isDraggableElement(curr, blockRoot)) {
      matchedCard = curr;
    } else if (hasCardShape && curr.children.length > 0 && isDraggableElement(curr, blockRoot)) {
      if (!matchedCard) {
        matchedCard = curr;
      }
    }

    curr = curr.parentElement;
  }

  return matchedCard;
}

// Guides live outside React state so dragging never re-renders the preview tree.
let currentGuides: GuideLine[] = [];
const guideListeners = new Set<() => void>();
export const guideStore = {
  get: (): GuideLine[] => currentGuides,
  set(next: GuideLine[]) {
    currentGuides = next;
    guideListeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    guideListeners.add(listener);
    return () => {
      guideListeners.delete(listener);
    };
  },
};

let elementDragActive = false;

// Same selection shape handleInteractivePreviewClick builds, for an element
// already found by drag hit-testing — keeps the highlight/style panel in
// sync with whatever a drag is about to move.
function buildElementSelection(
  element: HTMLElement,
  block: Block,
  site: PreviewEditableSite,
): PreviewElementEdit {
  const elementId = element.dataset.previewEditId ?? "";
  const isRoot = elementId.endsWith(":root");
  const label = isRoot
    ? (block.label ?? block.name ?? block.props.kind ?? "Section Container")
    : getElementLabel(element);

  const ownerDoc = element.ownerDocument || document;
  const ownerWin = ownerDoc.defaultView || window;
  const computed = ownerWin.getComputedStyle(element);
  const parsedWidth = parseFloat(computed.width);
  const parsedHeight = parseFloat(computed.height);
  const safeW = !isNaN(parsedWidth) && parsedWidth > 0 ? Math.round(parsedWidth) : Math.round(element.offsetWidth || element.getBoundingClientRect().width);
  const safeH = !isNaN(parsedHeight) && parsedHeight > 0 ? Math.round(parsedHeight) : Math.round(element.offsetHeight || element.getBoundingClientRect().height);

  return {
    id: elementId,
    blockId: block.id,
    blockKind: block.props.kind,
    label,
    style: site.previewEdits?.elements[elementId]?.style ?? {},
    computedWidth: `${safeW}px`,
    computedHeight: `${safeH}px`,
    computedStyle: extractElementComputedStyles(element),
  };
}

// Free-drag an element in move mode. Hold Ctrl/Cmd to disable snapping.
export function startElementFreeDrag(
  e: ReactMouseEvent,
  moveMode: boolean,
  _device: "desktop" | "responsive",
  scale: number,
  onChangeElementStyle: (elementId: string, patch: Partial<PreviewElementStyle>) => void,
  setGuides?: (guides: GuideLine[]) => void,
  setDraggingId?: (id: string | null) => void,
  blocks?: Block[],
  site?: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
  selectedElement?: PreviewElementEdit | null,
): void {
  if (!moveMode || e.button !== 0) return;

  const target = e.target as HTMLElement;
  if (target.closest("[data-block-drag-handle]")) return;

  const foundBlockRoot = target.closest<HTMLElement>("[data-block-id]");
  if (!foundBlockRoot) return;
  const blockRoot: HTMLElement = foundBlockRoot;

  // Check currently selected element:
  let selectedEl: HTMLElement | null = null;
  const targetId = selectedElement?.id;
  if (targetId) {
    const ownerDoc = blockRoot.ownerDocument || document;
    selectedEl =
      blockRoot.querySelector<HTMLElement>(`[data-preview-edit-id="${CSS.escape(targetId)}"]`) ||
      ownerDoc.querySelector<HTMLElement>(`[data-preview-edit-id="${CSS.escape(targetId)}"]`);
  }

  let candidate: HTMLElement | null = null;

  // 1. If user already selected <nav> (the navbar links container) and drags on/within it,
  // move the whole <nav> so all navbar links move at once!
  if (
    selectedEl &&
    selectedEl.tagName.toUpperCase() === "NAV" &&
    (selectedEl === target || selectedEl.contains(target) || Boolean(target.closest("nav")))
  ) {
    candidate = selectedEl;
  }
  // 2. If user already has an element selected (e.g. Card, button, chart bar, etc.)
  // and drags on/inside that selected element, DRAG THE SELECTED ELEMENT!
  // Don't rip its inner children out!
  else if (selectedEl && (selectedEl === target || selectedEl.contains(target))) {
    candidate = selectedEl;
  }
  // 3. If target is inside an enclosing Card or Floating Widget, move the whole Card
  // so touching a card's text/avatar/elements smoothly moves the entire card!
  else {
    const enclosingCard = findCardOrCompositeElement(target, blockRoot);
    if (enclosingCard && isDraggableElement(enclosingCard, blockRoot)) {
      candidate = enclosingCard;
    } else {
      // Find the most specific draggable element directly under cursor (button, link, chart bar):
      const clickedEditEl = target.closest<HTMLElement>("[data-preview-edit-id]");
      const nearestLinkOrBtn = target.closest<HTMLElement>("a, button");

      if (
        nearestLinkOrBtn &&
        nearestLinkOrBtn.hasAttribute("data-preview-edit-id") &&
        isDraggableElement(nearestLinkOrBtn, blockRoot)
      ) {
        candidate = nearestLinkOrBtn;
      } else if (
        clickedEditEl &&
        clickedEditEl !== blockRoot &&
        isDraggableElement(clickedEditEl, blockRoot)
      ) {
        candidate = clickedEditEl;
      } else if (clickedEditEl) {
        let p: HTMLElement | null = clickedEditEl;
        while (p && p !== blockRoot && !isDraggableElement(p, blockRoot)) {
          if (p.tagName.toUpperCase() === "NAV") break;
          p = p.parentElement?.closest<HTMLElement>("[data-preview-edit-id]") ?? null;
        }
        if (p && isDraggableElement(p, blockRoot)) {
          candidate = p;
        }
      }
    }
  }

  if (!candidate || !isDraggableElement(candidate, blockRoot)) return;

  const draggedElement: HTMLElement = candidate;
  const elementId = draggedElement.dataset.previewEditId!;

  e.preventDefault();
  e.stopPropagation();

  // Sync the selection/highlight to whatever is actually about to move.
  if (onSelectElement && blocks && site) {
    const block = blocks.find((b) => b.id === blockRoot.dataset.blockId);
    if (block) onSelectElement(buildElementSelection(draggedElement, block, site));
  }

  const ownerDoc = draggedElement.ownerDocument || document;
  const ownerWin = ownerDoc.defaultView || window;
  const iframeEl = ownerWin !== window ? (ownerWin.frameElement as HTMLElement | null) : null;

  const safeScale = scale && scale > 0 ? scale : 1;
  const measurementScale = iframeEl ? 1 : safeScale;

  const canvasRoot: HTMLElement =
    blockRoot.closest<HTMLElement>(".preview-edit-canvas") || blockRoot.parentElement || ownerDoc.body;

  // Freeze hover/selection growth so the element keeps its original size while dragging.
  draggedElement.style.setProperty("transition", "none", "important");
  draggedElement.style.setProperty("scale", "none", "important");
  draggedElement.style.setProperty("--tw-scale-x", "1", "important");
  draggedElement.style.setProperty("--tw-scale-y", "1", "important");
  const releaseFrozen = () => {
    draggedElement.style.removeProperty("transition");
    draggedElement.style.removeProperty("scale");
    draggedElement.style.removeProperty("--tw-scale-x");
    draggedElement.style.removeProperty("--tw-scale-y");
    draggedElement.style.removeProperty("pointer-events");
  };

  const startClientX = e.clientX;
  const startClientY = e.clientY;
  const elRectAtStart = draggedElement.getBoundingClientRect();
  const canvasRectAtStart = canvasRoot.getBoundingClientRect();

  const cs = ownerWin.getComputedStyle(draggedElement);
  const isAlreadyAbsolute = draggedElement.style.position === "absolute" || cs.position === "absolute";

  const pxOf = (v: string | null | undefined): number => {
    const t = (v ?? "").trim();
    return t.endsWith("px") ? Number.parseFloat(t) : NaN;
  };

  let startOffsetX = pxOf(draggedElement.style.left);
  let startOffsetY = pxOf(draggedElement.style.top);
  if (Number.isNaN(startOffsetX) || Number.isNaN(startOffsetY)) {
    if (isAlreadyAbsolute) {
      startOffsetX = draggedElement.offsetLeft;
      startOffsetY = draggedElement.offsetTop;
    } else {
      if (Number.isNaN(startOffsetX)) startOffsetX = cs.position !== "static" ? pxOf(cs.left) : NaN;
      if (Number.isNaN(startOffsetY)) startOffsetY = cs.position !== "static" ? pxOf(cs.top) : NaN;
      if (Number.isNaN(startOffsetX)) startOffsetX = 0;
      if (Number.isNaN(startOffsetY)) startOffsetY = 0;
    }
  }

  let hasMoved = false;
  let currentX = startOffsetX;
  let currentY = startOffsetY;
  let rafId: number | null = null;
  let pendingEvent: MouseEvent | null = null;
  let lastGuideKey = "";
  let targets: Rect[] = [];

  const onDragStart = (ev: Event) => ev.preventDefault();

  function setGuidesIfChanged(guides: GuideLine[]) {
    const key = guides
      .map((g) => `${g.type}:${g.position}:${g.start ?? ""}:${g.end ?? ""}:${g.emphasis ?? ""}`)
      .join("|");
    if (key === lastGuideKey) return;
    lastGuideKey = key;
    guideStore.set(guides);
    setGuides?.(guides);
  }

  function beginDrag() {
    hasMoved = true;
    elementDragActive = true;
    setDraggingId?.(elementId);
    ownerDoc.body.style.cursor = "grabbing";
    ownerDoc.body.style.userSelect = "none";

    // Kill CSS transitions FIRST — they made the element trail the cursor.
    draggedElement.style.setProperty("transition", "none", "important");
    draggedElement.style.setProperty("pointer-events", "none", "important");
    draggedElement.style.setProperty("will-change", "left, top");
    draggedElement.style.setProperty("cursor", "grabbing", "important");
    draggedElement.style.setProperty("position", isAlreadyAbsolute ? "absolute" : "relative", "important");
    draggedElement.style.setProperty("z-index", "10000", "important");
    draggedElement.style.setProperty("right", "auto", "important");
    draggedElement.style.setProperty("bottom", "auto", "important");

    // Unclip block root and canvas wrapper so cross-block dragging is never clipped:
    blockRoot.setAttribute("data-has-free-positioned", "true");
    blockRoot.style.setProperty("overflow", "visible", "important");
    blockRoot.style.setProperty("position", "relative", "important");
    blockRoot.style.setProperty("z-index", "9999", "important");
    if (blockRoot.parentElement && blockRoot.parentElement !== canvasRoot) {
      blockRoot.parentElement.setAttribute("data-has-free-positioned", "true");
      blockRoot.parentElement.style.setProperty("overflow", "visible", "important");
      blockRoot.parentElement.style.setProperty("position", "relative", "important");
      blockRoot.parentElement.style.setProperty("z-index", "9999", "important");
    }

    // Calibrate against the real rect so transformed / centered elements don't jump.
    draggedElement.style.setProperty("left", `${startOffsetX}px`, "important");
    draggedElement.style.setProperty("top", `${startOffsetY}px`, "important");
    const now = draggedElement.getBoundingClientRect();
    startOffsetX += (elRectAtStart.left - now.left) / measurementScale;
    startOffsetY += (elRectAtStart.top - now.top) / measurementScale;
    currentX = startOffsetX;
    currentY = startOffsetY;

    targets = collectSnapTargets(canvasRoot, draggedElement, canvasRectAtStart, measurementScale, blockRoot, elRectAtStart);
  }

  function applyMove(moveEvent: MouseEvent) {
    if (moveEvent.buttons === 0) {
      onMouseUp();
      return;
    }

    let dxRaw: number;
    let dyRaw: number;

    if (iframeEl) {
      if (moveEvent.view === ownerWin || (moveEvent.target && ownerDoc.contains(moveEvent.target as Node))) {
        dxRaw = moveEvent.clientX - startClientX;
        dyRaw = moveEvent.clientY - startClientY;
      } else {
        const iframeRect = iframeEl.getBoundingClientRect();
        dxRaw = (moveEvent.clientX - iframeRect.left) / safeScale - startClientX;
        dyRaw = (moveEvent.clientY - iframeRect.top) / safeScale - startClientY;
      }
    } else {
      dxRaw = (moveEvent.clientX - startClientX) / safeScale;
      dyRaw = (moveEvent.clientY - startClientY) / safeScale;
    }

    if (!hasMoved) {
      if (Math.hypot(dxRaw, dyRaw) * safeScale < DRAG_THRESHOLD) return;
      moveEvent.preventDefault();
      beginDrag();
    }

    // Place at the raw (unsnapped) position, then measure where the element REALLY is
    // (includes hover lift, scale, transforms), and snap using that real rect.
    const rawX = startOffsetX + dxRaw;
    const rawY = startOffsetY + dyRaw;
    draggedElement.style.setProperty("left", `${rawX}px`, "important");
    draggedElement.style.setProperty("top", `${rawY}px`, "important");

    const liveRect = rectFromDom(
      draggedElement.getBoundingClientRect(),
      canvasRectAtStart,
      measurementScale,
    );

    const snapOff = moveEvent.ctrlKey || moveEvent.metaKey;
    const { dx, dy, guides } = snapOff
      ? { dx: 0, dy: 0, guides: [] as GuideLine[] }
      : computeSnap(liveRect, targets, SNAP_SCREEN_PX / safeScale);

    currentX = rawX + dx;
    currentY = rawY + dy;

    draggedElement.style.setProperty("left", `${currentX}px`, "important");
    draggedElement.style.setProperty("top", `${currentY}px`, "important");

    setGuidesIfChanged(guides);
  }

  function onMouseMove(moveEvent: MouseEvent) {
    if (moveEvent.buttons === 0) {
      onMouseUp();
      return;
    }
    pendingEvent = moveEvent;
    if (rafId !== null) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      if (pendingEvent) applyMove(pendingEvent);
    });
  }

  const scopes: Array<Window | Document> = ownerDoc === document ? [window] : [ownerDoc, window];

  function cleanup() {
    for (const s of scopes) {
      s.removeEventListener("mousemove", onMouseMove as EventListener, true);
      s.removeEventListener("mouseup", onMouseUp as EventListener, true);
      s.removeEventListener("dragstart", onDragStart, true);
    }
    window.removeEventListener("blur", onMouseUp);
  }

  function onMouseUp() {
    cleanup();

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      if (pendingEvent && pendingEvent.buttons !== 0) applyMove(pendingEvent);
    }

    elementDragActive = false;
    guideStore.set([]);
    setGuides?.([]);
    setDraggingId?.(null);

    ownerDoc.body.style.removeProperty("cursor");
    ownerDoc.body.style.removeProperty("user-select");
    draggedElement.style.removeProperty("cursor");
    draggedElement.style.removeProperty("will-change");
    releaseFrozen();

    if (!hasMoved) return;

    const cancelTrailingClick = (clickEv: MouseEvent) => {
      clickEv.stopPropagation();
      clickEv.preventDefault();
      window.removeEventListener("click", cancelTrailingClick, true);
      ownerDoc.removeEventListener("click", cancelTrailingClick, true);
    };
    ownerDoc.addEventListener("click", cancelTrailingClick, true);
    window.addEventListener("click", cancelTrailingClick, true);
    setTimeout(() => {
      ownerDoc.removeEventListener("click", cancelTrailingClick, true);
      window.removeEventListener("click", cancelTrailingClick, true);
    }, 100);

    const roundedX = Math.round(currentX * 100) / 100;
    const roundedY = Math.round(currentY * 100) / 100;

    onChangeElementStyle(elementId, {
      freePositioned: true,
      x: roundedX,
      y: roundedY,
      desktop: { x: roundedX, y: roundedY },
      mobile: { x: roundedX, y: roundedY },
    });
  }

  for (const s of scopes) {
    s.addEventListener("dragstart", onDragStart, true);
    s.addEventListener("mousemove", onMouseMove as EventListener, true);
    s.addEventListener("mouseup", onMouseUp as EventListener, true);
  }
  window.addEventListener("blur", onMouseUp);
}

// After a block's real rendered height changes (measured via ResizeObserver),
// this saves that measured height back into state — but only if it's
// actually different, to avoid triggering pointless re-renders.
export function handleMeasuredBlockHeight(
  blockId: string,
  measuredHeight: number,
  blocks: Block[],
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void,
): void {
  const block = blocks.find((b) => b.id === blockId);
  if (block && block.height !== measuredHeight) {
    onUpdateBlock(blockId, { height: measuredHeight });
  }
}

export type ResizingBlockState = { id: string; startY: number; startHeight: number } | null;

// Starts a manual block-height resize when the user drags a block's bottom
// handle — measures actual rendered DOM height to prevent collapse, scales correctly,
// tracks the mouse smoothly with requestAnimationFrame, and updates the block's height.
export function handleStartBlockResize(
  blockId: string,
  currentHeight: number,
  e: { stopPropagation: () => void; preventDefault: () => void; clientY: number; target?: any },
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void,
  setResizingBlock: Dispatch<SetStateAction<ResizingBlockState>>,
  scale: number = 1,
): void {
  e.stopPropagation();
  e.preventDefault();

  const targetEl = (e as any).target as HTMLElement | null;
  const blockRoot =
    targetEl?.closest<HTMLElement>("[data-block-id]") ??
    document.querySelector<HTMLElement>(`[data-block-id="${blockId}"]`);

  const safeScale = scale && scale > 0 ? scale : 1;
  const startY = e.clientY;

  // Measure actual rendered height in DOM so it never jumps or collapses
  let actualRenderedHeight = 0;
  if (blockRoot) {
    const rect = blockRoot.getBoundingClientRect();
    actualRenderedHeight = Math.round(rect.height / safeScale);
  }
  const startHeight = actualRenderedHeight > 0 ? actualRenderedHeight : (currentHeight || 200);

  let currentCalculatedHeight = startHeight;
  let rafId: number | null = null;
  let lastClientY = startY;

  const prevBodyCursor = document.body.style.cursor;
  const prevUserSelect = document.body.style.userSelect;
  document.body.style.cursor = "ns-resize";
  document.body.style.userSelect = "none";

  const isNavbar =
    blockRoot?.dataset.blockKind === "navbar" ||
    Boolean(blockRoot?.querySelector("header, nav"));

  const applyHeightDOM = (newHeight: number) => {
    if (blockRoot) {
      blockRoot.style.setProperty("height", `${newHeight}px`, "important");
      blockRoot.style.setProperty("min-height", `${newHeight}px`, "important");
      if (!isNavbar) {
        const topContainers = blockRoot.querySelectorAll<HTMLElement>("section, nav, header, footer");
        topContainers.forEach((tc) => {
          if (!tc.hasAttribute("data-preview-chrome") && !tc.hasAttribute("data-block-drag-handle")) {
            tc.style.setProperty("height", "100%", "important");
            tc.style.setProperty("min-height", "100%", "important");
          }
        });
      }
      const heightBadge =
        blockRoot.querySelector<HTMLElement>("[data-block-resize-badge]") ??
        blockRoot.querySelector<HTMLElement>(".font-mono");
      if (heightBadge) {
        heightBadge.textContent = `Height: ${newHeight}px`;
      }
    }
  };

  const onMouseMove = (moveEvent: MouseEvent) => {
    lastClientY = moveEvent.clientY;
    const deltaY = (lastClientY - startY) / safeScale;
    currentCalculatedHeight = Math.max(60, Math.round(startHeight + deltaY));

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        applyHeightDOM(currentCalculatedHeight);
      });
    }
  };

  const onMouseUp = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    window.removeEventListener("mousemove", onMouseMove, true);
    window.removeEventListener("mouseup", onMouseUp, true);
    window.removeEventListener("pointermove", onMouseMove, true);
    window.removeEventListener("pointerup", onMouseUp, true);

    document.body.style.cursor = prevBodyCursor;
    document.body.style.userSelect = prevUserSelect;

    setResizingBlock(null);
    onUpdateBlock(blockId, { height: currentCalculatedHeight });
  };

  setResizingBlock({ id: blockId, startY, startHeight });
  window.addEventListener("mousemove", onMouseMove, true);
  window.addEventListener("mouseup", onMouseUp, true);
  window.addEventListener("pointermove", onMouseMove, true);
  window.addEventListener("pointerup", onMouseUp, true);
}

// Older/simpler version of the preview-click handler (no root-section
// confirmation step) — selects whichever element was clicked directly.
export function handlePreviewClick(
  e: { target: EventTarget; stopPropagation: () => void },
  editMode: boolean,
  blocks: Block[],
  site: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
): void {
  if (!editMode) return;

  const target = e.target instanceof HTMLElement ? e.target : null;
  const element = target?.closest<HTMLElement>("[data-preview-edit-id]");
  const blockElement = target?.closest<HTMLElement>("[data-block-id]");
  if (!element || !blockElement) return;

  const block = blocks.find((candidate) => candidate.id === blockElement.dataset.blockId);
  if (!block || !onSelectElement) return;

  e.stopPropagation();
  const rect = element.getBoundingClientRect();
  onSelectElement({
    id: element.dataset.previewEditId ?? "",
    blockId: block.id,
    blockKind: block.props.kind,
    label: getElementLabel(element),
    style: site.previewEdits?.elements[element.dataset.previewEditId ?? ""]?.style ?? {},
    computedWidth: `${Math.round(rect.width)}px`,
    computedHeight: `${Math.round(rect.height)}px`,
  });
}

// Flips edit mode on/off, clearing the current selection whenever it's
// switched off.
export function toggleEditMode(
  setEditMode: Dispatch<SetStateAction<boolean>>,
  sortedBlocks: Block[],
  site: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void,
): void {
  setEditMode((prev) => {
    const next = !prev;
    if (!next && onSelectElement) {
      onSelectElement(null);
    }
    return next;
  });
}

// Kicks off a responsive-frame resize drag — remembers the starting size and
// mouse position, sets the resize cursor, and starts listening for mouse
// movement/release on the whole window.
export function startFrameDrag(
  edge: "left" | "right" | "bottom" | "corner",
  e: { preventDefault: () => void; clientX: number; clientY: number },
  width: number,
  height: number,
  scale: number,
  dragStateRef: { current: FrameDragState | null },
  setIsDragging: (dragging: boolean) => void,
  handleDragMove: (e: MouseEvent) => void,
  handleDragEnd: () => void,
): void {
  e.preventDefault();
  dragStateRef.current = {
    edge,
    startX: e.clientX,
    startY: e.clientY,
    startWidth: width,
    startHeight: height,
    startScale: scale || 1,
  };
  setIsDragging(true);
  document.body.style.cursor = edge === "bottom" ? "ns-resize" : "ew-resize";
  document.body.style.userSelect = "none";
  window.addEventListener("mousemove", handleDragMove);
  window.addEventListener("mouseup", handleDragEnd);
}

// Cleans up after a frame resize drag finishes — resets the cursor,
// clears drag state, and removes the window-level listeners.
export function endFrameDrag(
  dragStateRef: { current: FrameDragState | null },
  setIsDragging: (dragging: boolean) => void,
  handleDragMove: (e: MouseEvent) => void,
  handleDragEnd: () => void,
): void {
  dragStateRef.current = null;
  setIsDragging(false);
  window.removeEventListener("mousemove", handleDragMove);
  window.removeEventListener("mouseup", handleDragEnd);
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
}

// ============================================================
// DraggableBlockWrapper
// ============================================================

// Moves one block to another block's position in the list, keeping every
// other block's relative order the same.
export function reorderDraggedBlock(
  draggedId: string,
  targetId: string,
  blocks: Block[],
): Block[] | null {
  if (!draggedId || draggedId === targetId) return null;
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const from = sorted.findIndex((b) => b.id === draggedId);
  const to = sorted.findIndex((b) => b.id === targetId);
  if (from < 0 || to < 0) return null;

  const next = [...sorted];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

// Called when a dragged block is dropped onto another block — reorders the
// list and turns off the "drag over" highlight.
export function handleBlockDrop(
  draggedId: string,
  targetBlockId: string,
  blocks: Block[],
  onReorderBlocks: (blocks: Block[]) => void,
  setIsDragOver: (over: boolean) => void,
): void {
  setIsDragOver(false);
  const next = reorderDraggedBlock(draggedId, targetBlockId, blocks);
  if (next) {
    onReorderBlocks(next);
  }
}

// Marks the start of a block drag by storing its id in the browser's native
// drag-and-drop data transfer.
export function handleBlockDragStart(
  e: { dataTransfer: DataTransfer },
  blockId: string,
  setIsDragging: (dragging: boolean) => void,
): void {
  e.dataTransfer.setData("text/block-id", blockId);
  e.dataTransfer.effectAllowed = "move";
  setIsDragging(true);
}

// ============================================================
// SelectionToolbar
// ============================================================

// Figures out where to position the floating text-formatting toolbar, based
// on the current text selection's on-screen bounding box.
export function calculateSelectionPosition(
  selection: Selection | null,
): { top: number; left: number } | null {
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;

  const anchorNode = selection.anchorNode;
  const container =
    anchorNode instanceof Element ? anchorNode : (anchorNode?.parentElement ?? null);
  const editableRoot = container?.closest('[data-editable="true"]');
  if (!editableRoot) return null;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return null;

  return {
    top: rect.top - 44,
    left: rect.left + rect.width / 2,
  };
}

// Applies bold/italic/underline to the current text selection.
export function applyFormat(command: "bold" | "italic" | "underline"): void {
  document.execCommand(command);
}

// Applies a text color to the current text selection.
export function applyColor(color: string): void {
  document.execCommand("foreColor", false, color);
}

// ============================================================
// TemplateSidebar
// ============================================================

// Decides where a brand-new block should be inserted: right after the hero
// block if there is one, otherwise right after the nav/header, otherwise near
// the top of the list.
export function findInsertIndex(blocks: Block[]): number {
  const kindOf = (b: Block) => String(b.props.kind ?? "");
  const isNav = (b: Block) => /^(nav|navbar|header)/i.test(kindOf(b));
  const isHero = (b: Block) => /^hero/i.test(kindOf(b));

  const heroIndex = blocks.findIndex(isHero);
  if (heroIndex >= 0) return heroIndex + 1;

  const navIndex = blocks.findIndex(isNav);
  if (navIndex >= 0) return navIndex + 1;

  return Math.min(2, blocks.length);
}

// Builds an empty "spacer" block with a random id, ready to be inserted.
export function createBlankBlock(_theme?: Theme): Block {
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: "spacer",
    order: 0,
    isCustom: true,
    sectionHref: "",
    props: {
      kind: "spacer",
      height: 240,
      isCustom: true,
    },
  } as Block;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isHexColor(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

export function to6DigitHex(value: string): string {
  const trimmed = value.trim();
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed;
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  return "#ffffff";
}

export function rgbStringToHex(colorStr: string): string | null {
  if (!colorStr) return null;
  const trimmed = colorStr.trim();
  if (trimmed.startsWith("#")) return to6DigitHex(trimmed);
  const match = trimmed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
  if (!match) return null;
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
  if (a === 0) return null;
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function extractElementComputedStyles(element: HTMLElement): Partial<PreviewElementStyle> {
  try {
    const computed = window.getComputedStyle(element);
    const result: Partial<PreviewElementStyle> = {};

    // 1. Text color
    const textColor = rgbStringToHex(computed.color);
    if (textColor) result.color = textColor;

    // 2. Background color
    const bgColor = rgbStringToHex(computed.backgroundColor);
    if (bgColor) result.backgroundColor = bgColor;

    // 3. Border / Stroke
    const borderColor = rgbStringToHex(computed.borderColor);
    if (borderColor) result.borderColor = borderColor;
    const bw = parseFloat(computed.borderWidth);
    if (!isNaN(bw) && bw > 0) {
      result.borderWidth = Math.round(bw);
      if (computed.borderStyle && computed.borderStyle !== "none") {
        result.borderStyle = computed.borderStyle as any;
      }
    }

    // 4. Text alignment: left / center / right / justify
    const align = (computed.textAlign || "").toLowerCase().trim();
    if (align === "center") {
      result.textAlign = "center";
    } else if (align === "right" || align === "end") {
      result.textAlign = "right";
    } else if (align === "justify") {
      result.textAlign = "justify";
    } else if (align === "left" || align === "start") {
      result.textAlign = "left";
    }

    // 5. Typography formatting
    const fw = (computed.fontWeight || "").toLowerCase();
    const fwNum = parseInt(fw, 10);
    if (fw === "bold" || fw === "bolder" || (!isNaN(fwNum) && fwNum >= 600)) {
      result.bold = true;
    } else if (fw === "normal" || (!isNaN(fwNum) && fwNum <= 400)) {
      result.bold = false;
    }

    if (computed.fontStyle === "italic") {
      result.italic = true;
    }

    const td = computed.textDecorationLine || computed.textDecoration || "";
    if (td.includes("underline")) {
      result.underline = true;
    }
    if (td.includes("line-through")) {
      result.strikethrough = true;
    }

    // 6. Font size & line height & letter spacing
    const fs = parseFloat(computed.fontSize);
    if (!isNaN(fs) && fs > 0) {
      result.fontSize = Math.round(fs);
    }

    const lh = parseFloat(computed.lineHeight);
    if (!isNaN(lh) && !isNaN(fs) && fs > 0) {
      const ratio = Math.round((lh / fs) * 10) / 10;
      if (ratio >= 0.8 && ratio <= 3) {
        result.lineHeight = ratio;
      }
    }

    const ls = parseFloat(computed.letterSpacing);
    if (!isNaN(ls)) {
      result.letterSpacing = Math.round(ls * 10) / 10;
    }

    // 7. Border radius (corners)
    const br = parseFloat(computed.borderRadius);
    if (!isNaN(br) && br >= 0) {
      result.borderRadius = Math.round(br);
    }

    // 8. Opacity
    const op = parseFloat(computed.opacity);
    if (!isNaN(op) && op < 1) {
      result.opacity = op;
    }

    // 9. Visibility
    if (computed.visibility === "hidden") {
      result.hidden = true;
      result.visibility = "hidden";
    }

    return result;
  } catch {
    return {};
  }
}

// Adds a fresh blank block into the list at a sensible default position.
export function handleAddBlock(
  sortedBlocks: Block[],
  theme: Theme,
  onReorderBlocks: (blocks: Block[]) => void,
): void {
  const insertIndex = findInsertIndex(sortedBlocks);
  const next = [...sortedBlocks];
  next.splice(insertIndex, 0, createBlankBlock(theme));
  onReorderBlocks(next);
}

// Moves a block dragged from the sidebar list to a new position among the
// other blocks.
export function moveSidebarBlock(
  draggedId: string | null,
  targetId: string,
  blocks: Block[],
  onReorderBlocks: (blocks: Block[]) => void,
): void {
  if (!draggedId || draggedId === targetId) return;
  const from = blocks.findIndex((block) => block.id === draggedId);
  const to = blocks.findIndex((block) => block.id === targetId);
  if (from < 0 || to < 0) return;
  const next = [...blocks];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  onReorderBlocks(next);
}

// Updates a block's manually-typed height value from the sidebar input.
export function handleBlockHeightChange(
  blockId: string,
  rawValue: string,
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void,
): void {
  if (rawValue.trim() === "") {
    onUpdateBlock(blockId, { height: undefined });
    return;
  }
  const num = Number(rawValue);
  onUpdateBlock(blockId, { height: isNaN(num) ? undefined : Math.max(0, Math.round(num)) });
}

// Replaces one item inside an array-valued field (e.g. a list of testimonials)
// and saves the whole updated array back through onChange.
export function handleArrayItemChange<T>(
  current: T[],
  index: number,
  newValue: T,
  valueObj: Record<string, unknown>,
  key: string,
  onChange: (nextValue: Record<string, unknown>) => void,
): void {
  const next = [...current];
  next[index] = newValue;
  onChange({ ...valueObj, [key]: next });
}

// ============================================================
// AddBlockMenu
// ============================================================

// Builds a brand-new block from a catalog entry (e.g. "Hero — Split Layout"),
// placing it right after the chosen block (or at the start if none chosen).
export function createInsertedBlock(
  afterOrder: number | null,
  blocks: Block[],
  entry: {
    componentType: string;
    defaultProps: Record<string, unknown>;
    kind: string;
    variant: string;
  },
  height?: string,
): Block {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const afterIndex = afterOrder === null ? -1 : sorted.findIndex((b) => b.order === afterOrder);
  const prev = afterIndex >= 0 ? sorted[afterIndex] : null;
  const next = sorted[afterIndex + 1] ?? null;
  const prevOrder = prev?.order ?? 0;
  const nextOrder = next?.order ?? prevOrder + 2;
  const newOrder = (prevOrder + nextOrder) / 2;

  return {
    id: `block_${crypto.randomUUID().slice(0, 8)}`,
    type: entry.componentType,
    order: newOrder,
    isCustom: true,
    props: {
      ...entry.defaultProps,
      kind: entry.kind,
      variant: entry.variant,
      isCustom: true,
      ...(height ? { sectionHeight: Number(height) } : {}),
    },
  } as Block;
}

// Filters the block catalog down to entries whose label matches the search text.
export function filterBlockCatalog<T extends { label: string }>(catalog: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  return catalog.filter((entry) => entry.label.toLowerCase().includes(q));
}

// Handles picking a block from the "add block" menu: builds it, inserts it,
// then resets the menu's open/search/height state back to defaults.
export function handlePickBlock<
  T extends {
    componentType: string;
    defaultProps: Record<string, unknown>;
    kind: string;
    variant: string;
  },
>(
  afterOrder: number | null,
  blocks: Block[],
  entry: T,
  height: string,
  onInsert: (block: Block) => void,
  setOpen: (open: boolean) => void,
  setQuery: (query: string) => void,
  setHeight: (height: string) => void,
): void {
  const newBlock = createInsertedBlock(afterOrder, blocks, entry, height);
  onInsert(newBlock);
  setOpen(false);
  setQuery("");
  setHeight("");
}

// ============================================================
// ElementStylePanel
// ============================================================

// Nudges a numeric value up or down by one step (e.g. font size +/- buttons),
// staying within the given min/max bounds.
export function stepStepperValue(
  currentValue: number,
  direction: number,
  min: number,
  max: number,
  onChange: (value: number) => void,
): void {
  const next = Math.round((currentValue + direction) * 100) / 100;
  if (next < min || next > max) return;
  onChange(next);
}

// ============================================================
// Editable
// ============================================================

// Saves an editable element's content once the user clicks away from it.
export function handleEditableBlur(
  e: FocusEvent<HTMLElement>,
  onChange: (v: string) => void,
): void {
  onChange(e.currentTarget.innerHTML ?? "");
}

// Grabs the current outer HTML of the whole preview — used when exporting or
// generating a static snapshot of the site.
export function getTemplateHtml(
  contentRef: RefObject<HTMLDivElement | null>
): string | null {
  const templateRoot = contentRef.current;

  if (!templateRoot) {
    return null;
  }

  return templateRoot.outerHTML;
}
