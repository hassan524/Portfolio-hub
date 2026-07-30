import type { Dispatch, SetStateAction, RefObject, FocusEvent } from "react";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import type { PreviewEditableSite, PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";

// ============================================================
// TemplatePreviewDialog
// ============================================================

export function toggleMaximize(
  isMaximized: boolean,
  setIsMaximized: Dispatch<SetStateAction<boolean>>,
  dialogRef: RefObject<HTMLElement | null>
): void {
  if (!isMaximized) {
    if (dialogRef.current && !document.fullscreenElement) {
      dialogRef.current.requestFullscreen?.().catch(() => {});
    }
    setIsMaximized(true);
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setIsMaximized(false);
  }
}

export function updateBlockProps(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  blockId: string,
  patch: Record<string, unknown>
): void {
  setSite((prev) => {
    if (!prev) return prev;
    const { height, label, name, elementStyle, ...restProps } = patch;

    const updatedBlocks = prev.blocks.map((b) => {
      if (b.id !== blockId) return b;
      return {
        ...b,
        ...(height !== undefined ? { height: height as number } : {}),
        ...(label !== undefined ? { label: label as string } : {}),
        ...(name !== undefined ? { name: name as string } : {}),
        props: { ...b.props, ...restProps },
      };
    });

    let nextPreviewEdits = prev.previewEdits;

    if (elementStyle) {
      const targetElementId = `${blockId}:root`;
      const prevElements = prev.previewEdits?.elements ?? {};
      const targetBlock = updatedBlocks.find((b) => b.id === blockId);
      const blockKind = targetBlock?.props.kind ?? "spacer";
      const blockLabel = targetBlock?.label ?? targetBlock?.name ?? blockKind;

      const updatedElementEdit: PreviewElementEdit = {
        id: targetElementId,
        blockId,
        blockKind,
        label: blockLabel,
        style: {
          ...(prevElements[targetElementId]?.style ?? {}),
          ...(elementStyle as Partial<PreviewElementStyle>),
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

export function updateTheme(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  patch: Partial<Theme>,
  fallbackTheme: Theme
): void {
  setSite((prev) =>
    prev ? { ...prev, theme: { ...(prev.theme ?? fallbackTheme), ...patch } } : prev
  );
}

export function updateSiteMeta(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>
): void {
  setSite((prev) => (prev ? { ...prev, ...patch } : prev));
}

export function reorderBlocks(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  nextBlocks: Block[]
): void {
  setSite((prev) =>
    prev
      ? {
          ...prev,
          blocks: nextBlocks.map((block, order) => ({ ...block, order })),
        }
      : prev
  );
}

export function changeElementStyle(
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>,
  elementId: string,
  patch: Partial<PreviewElementStyle>
): void {
  setSite((prev): SiteData | null => {
    if (!prev) return prev;

    const prevElements = prev.previewEdits?.elements ?? {};
    const prevStyle = prevElements[elementId]?.style ?? {};
    const nextStyle: PreviewElementStyle = { ...prevStyle, ...patch };

    const nextElements = {
      ...prevElements,
      [elementId]: { style: nextStyle },
    };

    const nextPreviewEdits = {
      ...(prev.previewEdits ?? {}),
      elements: nextElements,
    };

    return {
      ...prev,
      previewEdits: nextPreviewEdits,
    } as SiteData;
  });

  setSelectedElement((prev) =>
    prev && prev.id === elementId
      ? { ...prev, style: { ...prev.style, ...patch } }
      : prev
  );
}

export function removeSelectedElement(
  selectedElement: PreviewElementEdit | null,
  changeElementStyleFn: (elementId: string, patch: Partial<PreviewElementStyle>) => void
): void {
  if (!selectedElement) return;
  changeElementStyleFn(selectedElement.id, { removed: true });
}

export function resetSelectedElement(
  selectedElement: PreviewElementEdit | null,
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>
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

export function syncTemplateState(
  template: SiteData | null,
  setSite: Dispatch<SetStateAction<SiteData | null>>,
  setActiveSection: Dispatch<SetStateAction<string>>,
  setDevice: Dispatch<SetStateAction<"responsive" | "desktop">>,
  setIsMaximized: Dispatch<SetStateAction<boolean>>,
  setSelectedElement: Dispatch<SetStateAction<PreviewElementEdit | null>>
): void {
  if (template) {
    setSite(structuredClone(template));
    setActiveSection(template.blocks?.[0]?.props.kind ?? "hero");
    setDevice("desktop");
    setIsMaximized(false);
    setSelectedElement(null);
  } else {
    setSite(null);
  }
}

export function handleFullscreenChange(
  setIsMaximized: Dispatch<SetStateAction<boolean>>
): void {
  if (!document.fullscreenElement) {
    setIsMaximized(false);
  }
}

// ============================================================
// TemplateLivePreview
// ============================================================

export type FrameDragState = {
  edge: "left" | "right" | "bottom" | "corner";
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startScale: number;
};

export function calculateFrameResize(
  drag: FrameDragState,
  clientX: number,
  clientY: number,
  minWidth = 280,
  maxWidth = 1400,
  minHeight = 400,
  maxHeight = 1400
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

export function calculateViewportScale(
  viewportWidth: number,
  viewportHeight: number,
  frameWidth: number,
  frameHeight: number,
  padding = 40
): number {
  const availW = viewportWidth - padding * 2;
  const availH = viewportHeight - padding * 2;
  const next = Math.min(1, availW / frameWidth, availH / frameHeight);
  return Number.isFinite(next) && next > 0 ? next : 1;
}

export function stampEditableElement(element: HTMLElement, blockId: string, path: string): void {
  element.dataset.previewEditId = `${blockId}:${path}`;
}

export function getElementPath(root: HTMLElement, element: HTMLElement): string {
  const parts: number[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== root) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) return "";
    parts.unshift(Array.from(parent.children).indexOf(current));
    current = parent;
  }

  return parts.length ? parts.join(".") : "";
}

export function getElementLabel(element: HTMLElement): string {
  const text = element.innerText?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 48);
  if (element instanceof HTMLImageElement) return element.alt || "Image";
  return element.tagName.toLowerCase();
}

export function applyPreviewStyle(element: HTMLElement, style?: PreviewElementStyle): void {
  if (style?.bold !== undefined) {
    element.style.fontWeight = style.bold ? "700" : "400";
  }
  if (style?.italic !== undefined) {
    element.style.fontStyle = style.italic ? "italic" : "normal";
  }
  if (style?.underline !== undefined) {
    element.style.textDecoration = style.underline ? "underline" : "none";
  }
  if (style?.color) {
    element.style.color = style.color;
  }
  if (style?.backgroundColor !== undefined) {
    element.style.backgroundColor = style.backgroundColor || "";
  }
  if (style?.backgroundImage !== undefined) {
    element.style.backgroundImage = style.backgroundImage || "";
  }
  if (style?.borderRadius !== undefined && style.borderRadius !== null) {
    element.style.borderRadius = `${style.borderRadius}px`;
  }
  if (style?.padding !== undefined && style.padding !== null) {
    element.style.padding = `${style.padding}px`;
  }
  if (style?.width) {
    element.style.width = style.width;
  }
  if (style?.height) {
    element.style.height = style.height;
  }
  if (style?.removed) {
    element.style.display = "none";
  }
}

export function tagAndApplyPreviewStyles(
  root: HTMLElement | null,
  blocks: Block[],
  selectedElementId: string | null | undefined,
  previewEdits?: SiteData["previewEdits"]
): void {
  if (!root) return;

  root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((blockRoot) => {
    const blockId = blockRoot.dataset.blockId;
    const block = blocks.find((candidate) => candidate.id === blockId);
    if (!blockId || !block) return;

    stampEditableElement(blockRoot, blockId, "root");
    blockRoot.querySelectorAll<HTMLElement>("*").forEach((element) => {
      const path = getElementPath(blockRoot, element);
      if (path) stampEditableElement(element, blockId, path);
    });
  });

  root.querySelectorAll<HTMLElement>("[data-preview-edit-id]").forEach((element) => {
    element.classList.toggle(
      "preview-edit-selected",
      element.dataset.previewEditId === selectedElementId
    );
    applyPreviewStyle(
      element,
      previewEdits?.elements[element.dataset.previewEditId ?? ""]?.style
    );
  });
}

export function handleMeasuredBlockHeight(
  blockId: string,
  measuredHeight: number,
  blocks: Block[],
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void
): void {
  const block = blocks.find((b) => b.id === blockId);
  if (block && block.height !== measuredHeight) {
    onUpdateBlock(blockId, { height: measuredHeight });
  }
}

export type ResizingBlockState = { id: string; startY: number; startHeight: number } | null;

export function handleStartBlockResize(
  blockId: string,
  currentHeight: number,
  e: { stopPropagation: () => void; preventDefault: () => void; clientY: number },
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void,
  setResizingBlock: Dispatch<SetStateAction<ResizingBlockState>>
): void {
  e.stopPropagation();
  e.preventDefault();
  const startY = e.clientY;
  const startHeight = currentHeight || 200;

  const onMouseMove = (moveEvent: MouseEvent) => {
    const deltaY = moveEvent.clientY - startY;
    const newHeight = Math.max(60, Math.round(startHeight + deltaY));
    onUpdateBlock(blockId, { height: newHeight });
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    setResizingBlock(null);
  };

  setResizingBlock({ id: blockId, startY, startHeight });
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

export function handlePreviewClick(
  e: { target: EventTarget; stopPropagation: () => void },
  editMode: boolean,
  blocks: Block[],
  site: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void
): void {
  if (!editMode) return;

  const target = e.target instanceof HTMLElement ? e.target : null;
  const element = target?.closest<HTMLElement>("[data-preview-edit-id]");
  const blockElement = target?.closest<HTMLElement>("[data-block-id]");
  if (!element || !blockElement) return;

  const block = blocks.find((candidate) => candidate.id === blockElement.dataset.blockId);
  if (!block || !onSelectElement) return;

  e.stopPropagation();
  onSelectElement({
    id: element.dataset.previewEditId ?? "",
    blockId: block.id,
    blockKind: block.props.kind,
    label: getElementLabel(element),
    style: site.previewEdits?.elements[element.dataset.previewEditId ?? ""]?.style ?? {},
  });
}

export function toggleEditMode(
  setEditMode: Dispatch<SetStateAction<boolean>>,
  sortedBlocks: Block[],
  site: PreviewEditableSite,
  onSelectElement?: (edit: PreviewElementEdit | null) => void
): void {
  setEditMode((prev) => {
    const next = !prev;
    if (next && onSelectElement && sortedBlocks.length > 0) {
      const firstBlock = sortedBlocks[0];
      const elementId = `${firstBlock.id}:root`;
      onSelectElement({
        id: elementId,
        blockId: firstBlock.id,
        blockKind: firstBlock.props.kind,
        label: firstBlock.props.kind,
        style: site.previewEdits?.elements[elementId]?.style ?? {},
      });
    } else if (!next && onSelectElement) {
      onSelectElement(null);
    }
    return next;
  });
}

export function startFrameDrag(
  edge: "left" | "right" | "bottom" | "corner",
  e: { preventDefault: () => void; clientX: number; clientY: number },
  width: number,
  height: number,
  scale: number,
  dragStateRef: { current: FrameDragState | null },
  setIsDragging: (dragging: boolean) => void,
  handleDragMove: (e: MouseEvent) => void,
  handleDragEnd: () => void
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

export function endFrameDrag(
  dragStateRef: { current: FrameDragState | null },
  setIsDragging: (dragging: boolean) => void,
  handleDragMove: (e: MouseEvent) => void,
  handleDragEnd: () => void
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

export function reorderDraggedBlock(
  draggedId: string,
  targetId: string,
  blocks: Block[]
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

export function handleBlockDrop(
  draggedId: string,
  targetBlockId: string,
  blocks: Block[],
  onReorderBlocks: (blocks: Block[]) => void,
  setIsDragOver: (over: boolean) => void
): void {
  setIsDragOver(false);
  const next = reorderDraggedBlock(draggedId, targetBlockId, blocks);
  if (next) {
    onReorderBlocks(next);
  }
}

export function handleBlockDragStart(
  e: { dataTransfer: DataTransfer },
  blockId: string,
  setIsDragging: (dragging: boolean) => void
): void {
  e.dataTransfer.setData("text/block-id", blockId);
  e.dataTransfer.effectAllowed = "move";
  setIsDragging(true);
}

// ============================================================
// SelectionToolbar
// ============================================================

export function calculateSelectionPosition(
  selection: Selection | null
): { top: number; left: number } | null {
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;

  const anchorNode = selection.anchorNode;
  const container = anchorNode instanceof Element ? anchorNode : anchorNode?.parentElement ?? null;
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

export function applyFormat(command: "bold" | "italic" | "underline"): void {
  document.execCommand(command);
}

export function applyColor(color: string): void {
  document.execCommand("foreColor", false, color);
}

// ============================================================
// TemplateSidebar
// ============================================================

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

export function createBlankBlock(theme: Theme): Block {
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: "spacer",
    order: 0,
    isCustom: true,
    props: {
      kind: "spacer",
      height: 240,
      backgroundColor: theme.bg,
      isCustom: true,
    },
  } as Block;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isHexColor(value: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(value);
}

export function handleAddBlock(
  sortedBlocks: Block[],
  theme: Theme,
  onReorderBlocks: (blocks: Block[]) => void
): void {
  const insertIndex = findInsertIndex(sortedBlocks);
  const next = [...sortedBlocks];
  next.splice(insertIndex, 0, createBlankBlock(theme));
  onReorderBlocks(next);
}

export function moveSidebarBlock(
  draggedId: string | null,
  targetId: string,
  blocks: Block[],
  onReorderBlocks: (blocks: Block[]) => void
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

export function handleBlockHeightChange(
  blockId: string,
  rawValue: string,
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void
): void {
  onUpdateBlock(blockId, { height: rawValue === "" ? undefined : Number(rawValue) });
}

export function handleArrayItemChange<T>(
  current: T[],
  index: number,
  newValue: T,
  valueObj: Record<string, unknown>,
  key: string,
  onChange: (nextValue: Record<string, unknown>) => void
): void {
  const next = [...current];
  next[index] = newValue;
  onChange({ ...valueObj, [key]: next });
}

// ============================================================
// AddBlockMenu
// ============================================================

export function createInsertedBlock(
  afterOrder: number | null,
  blocks: Block[],
  entry: { componentType: string; defaultProps: Record<string, unknown>; kind: string; variant: string },
  height?: string
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

export function filterBlockCatalog<T extends { label: string }>(
  catalog: T[],
  query: string
): T[] {
  const q = query.trim().toLowerCase();
  return catalog.filter((entry) => entry.label.toLowerCase().includes(q));
}

export function handlePickBlock<T extends { componentType: string; defaultProps: Record<string, unknown>; kind: string; variant: string }>(
  afterOrder: number | null,
  blocks: Block[],
  entry: T,
  height: string,
  onInsert: (block: Block) => void,
  setOpen: (open: boolean) => void,
  setQuery: (query: string) => void,
  setHeight: (height: string) => void
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

export function stepStepperValue(
  currentValue: number,
  direction: 1 | -1,
  min: number,
  max: number,
  onChange: (value: number) => void
): void {
  const next = currentValue + direction;
  if (next < min || next > max) return;
  onChange(next);
}

// ============================================================
// Editable
// ============================================================

export function handleEditableBlur(
  e: FocusEvent<HTMLElement>,
  onChange: (v: string) => void
): void {
  onChange(e.currentTarget.innerHTML ?? "");
}
