import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { Maximize2, Minimize2, Monitor, Save, Smartphone, X, PencilLine } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { DraggableBlockWrapper } from "@/components/editor/DraggableBlockWrapper";
import type { PreviewEditableSite, PreviewElementEdit, PreviewElementStyle } from "./previewEditTypes";
import type { SiteData, Block, BlockTypography } from "@/types/builder.schema";

type Device = "desktop" | "responsive";

const MIN_WIDTH = 280;
const MAX_WIDTH = 1400;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1400;
const VIEWPORT_PADDING = 40;

const DEFAULT_RESPONSIVE_WIDTH = 390;
const DEFAULT_RESPONSIVE_HEIGHT = 844;

export function TemplateLivePreview({
  site,
  device,
  activeSection,
  selectedElementId,
  onSelectElement,
  onChangeElementStyle,
  onDeviceChange,
  onUpdateBlock,
  onUpdateTypography,
  onReorderBlocks,
  isMaximized,
  onToggleMaximize,
  onClose,
  onSave,
}: {
  site: PreviewEditableSite;
  device: Device;
  activeSection: string;

  selectedElementId?: string | null;
  onSelectElement?: (edit: PreviewElementEdit | null) => void;
  onChangeElementStyle?: (
    elementId: string,
    patch: Partial<PreviewElementStyle>
  ) => void;

  onDeviceChange: (device: Device) => void;
  onUpdateBlock: (
    blockId: string,
    patch: Record<string, unknown>
  ) => void;

  onUpdateTypography?: (
    blockId: string,
    patch: Partial<BlockTypography>
  ) => void;

  onReorderBlocks: (blocks: Block[]) => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onClose: () => void;
  onSave?: (site: SiteData) => void;
}) {
  const { theme, blocks } = site;
  const bg = theme.bg;
  const ink = theme.ink;
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Frame-resize drag ONLY (dragging the edges of the responsive phone
  // mockup to change its width/height). This has nothing to do with
  // moving elements — it just resizes the preview viewport itself.
  const dragState = useRef<{
    edge: "left" | "right" | "bottom" | "corner";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startScale: number;
  } | null>(null);

  const isDesktop = device === "desktop";

  // ── EDIT MODE ────────────────────────────────────────────────────
  const [editMode, setEditMode] = useState(false);

  const [size, setSize] = useState({
    width: DEFAULT_RESPONSIVE_WIDTH,
    height: DEFAULT_RESPONSIVE_HEIGHT,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isDesktop) {
      setSize({ width: DEFAULT_RESPONSIVE_WIDTH, height: DEFAULT_RESPONSIVE_HEIGHT });
    }
    frameRef.current?.scrollTo({ top: 0, left: 0 });
  }, [isDesktop]);

  const { width, height } = size;

  const recalcScale = useCallback(() => {
    if (isDesktop || !viewportRef.current) {
      setScale(1);
      return;
    }
    const availW = viewportRef.current.clientWidth - VIEWPORT_PADDING * 2;
    const availH = viewportRef.current.clientHeight - VIEWPORT_PADDING * 2;
    const next = Math.min(1, availW / width, availH / height);
    setScale(Number.isFinite(next) && next > 0 ? next : 1);
  }, [isDesktop, width, height]);

  useEffect(() => {
    recalcScale();
  }, [recalcScale, isMaximized]);

  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver(() => recalcScale());
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [recalcScale]);

  const handleDragMove = useCallback((e: MouseEvent) => {
    const drag = dragState.current;
    if (!drag) return;
    const dx = (e.clientX - drag.startX) / drag.startScale;
    const dy = (e.clientY - drag.startY) / drag.startScale;

    let nextWidth = drag.startWidth;
    let nextHeight = drag.startHeight;

    if (drag.edge === "left") nextWidth = drag.startWidth - dx * 2;
    else if (drag.edge === "right") nextWidth = drag.startWidth + dx * 2;
    else if (drag.edge === "bottom") nextHeight = drag.startHeight + dy;
    else if (drag.edge === "corner") {
      nextWidth = drag.startWidth + dx * 2;
      nextHeight = drag.startHeight + dy;
    }

    nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, nextWidth));
    nextHeight = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, nextHeight));
    setSize({ width: nextWidth, height: nextHeight });
  }, []);

  const handleDragEnd = useCallback(() => {
    dragState.current = null;
    setIsDragging(false);
    window.removeEventListener("mousemove", handleDragMove);
    window.removeEventListener("mouseup", handleDragEnd);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [handleDragMove]);

  function startDrag(edge: "left" | "right" | "bottom" | "corner", e: React.MouseEvent) {
    e.preventDefault();
    dragState.current = {
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

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  useLayoutEffect(() => {
    const root = contentRef.current;
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
        element.dataset.previewEditId === selectedElementId,
      );
      applyPreviewStyle(
        element,
        site.previewEdits?.elements[element.dataset.previewEditId ?? ""]?.style,
      );
    });
  }, [blocks, selectedElementId, site.previewEdits]);

  // Only runs when editMode is true. Otherwise clicking anything on the
  // canvas does nothing — no selection, no panel.
  function handlePreviewClick(e: React.MouseEvent) {
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
  function toggleEditMode() {
    setEditMode((prev) => {
      const next = !prev;
      if (next && onSelectElement && sorted.length > 0) {
        const firstBlock = sorted[0];
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

  const content = (
    <div
      ref={contentRef}
      className="min-h-full w-full preview-edit-canvas"
      style={{
        background: bg,
        color: ink,
        pointerEvents: editMode ? "auto" : "none", // ← blocks all clicks/typing when off
      }}
      onClick={handlePreviewClick}
    >
      {sorted.map((block) => {
        const variant = (block.props as { variant?: string }).variant;
        const Cmp = getBlockComponent(block.props.kind, variant);
        if (!Cmp) return null;
        return (
          <DraggableBlockWrapper
            key={block.id}
            block={block}
            blocks={blocks}
            onReorderBlocks={onReorderBlocks}
            ink={ink}
          >
            <div
              data-block-id={block.id}
              className={
                activeSection === block.props.kind ? "outline outline-2 outline-offset-[-2px]" : ""
              }
              style={
                activeSection === block.props.kind ? { outlineColor: theme.accent } : undefined
              }
            >
              <Cmp
                id={block.id}
                props={block.props}
                theme={theme}
                onChange={(patch: Record<string, unknown>) =>
                  editMode ? onUpdateBlock(block.id, patch) : undefined
                }
              />
            </div>
          </DraggableBlockWrapper>
        );
      })}

      {!sorted.some((b) => b.props.kind === "footer") && (
        <div
          className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between"
          style={{ borderTop: `1px solid ${ink}10`, color: `${ink}40` }}
        >
          <span>© 2026 {site.name}</span>
          <span>
            Built with <span style={{ color: theme.accent }}>PortfolioHub</span>
          </span>
        </div>
      )}
    </div>
  );

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-surface-elevated">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="truncate text-xs font-medium text-ink-soft">
            Website Editor
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {!isDesktop && (
            <span className="select-none text-[10px] tabular-nums text-ink-soft/70">
              {Math.round(width)}×{Math.round(height)}
              {scale < 0.999 && ` · ${Math.round(scale * 100)}%`}
            </span>
          )}

          <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5">
            <button
              onClick={() => onDeviceChange("desktop")}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-all ${isDesktop
                ? "bg-foreground text-background"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
                }`}
              title="Desktop Preview"
            >
              <Monitor className="h-4 w-4" />
            </button>

            <button
              onClick={() => onDeviceChange("responsive")}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-all ${!isDesktop
                ? "bg-foreground text-background"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
                }`}
              title="Responsive Preview"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          <div className="ml-1" />

          {/* Edit mode toggle */}
          <button
            onClick={toggleEditMode}
            className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full border transition-all ${editMode
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-ink-soft hover:bg-secondary hover:text-ink"
              }`}
            title={editMode ? "Exit edit mode" : "Enter edit mode"}
            aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
          >
            <PencilLine className="h-4 w-4" />
          </button>

          <div className="h-5 w-px bg-border" />

          {onSave && (
            <button
              onClick={() => onSave(site)}
              className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition-opacity hover:opacity-90"
              title="Save"
            >
              <Save className="h-4 w-4" />
              Save
            </button>
          )}

          <button
            onClick={onToggleMaximize}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
            title={isMaximized ? "Exit Full Screen" : "Maximize"}
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={onClose}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isDesktop ? (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <div
            ref={frameRef}
            className="mx-auto min-h-full w-full border border-border bg-background shadow-lift"
          >
            {content}
          </div>
        </div>
      ) : (
        <div ref={viewportRef} className="flex-1 overflow-hidden flex items-center justify-center">
          <div
            className="relative shrink-0"
            style={{ width: width * scale, height: height * scale }}
          >
            <div
              ref={frameRef}
              className={`no-scrollbar absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden border border-border bg-background shadow-lift ${isDragging ? "" : "transition-transform duration-200"
                }`}
              style={{ width, height, transform: `scale(${scale})` }}
            >
              {content}
            </div>

            <div
              onMouseDown={(e) => startDrag("left", e)}
              className="absolute top-0 -left-3 h-full w-3 cursor-ew-resize flex items-center justify-center group"
            >
              <div className="h-12 w-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors" />
            </div>
            <div
              onMouseDown={(e) => startDrag("right", e)}
              className="absolute top-0 -right-3 h-full w-3 cursor-ew-resize flex items-center justify-center group"
            >
              <div className="h-12 w-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors" />
            </div>
            <div
              onMouseDown={(e) => startDrag("bottom", e)}
              className="absolute -bottom-3 left-0 w-full h-3 cursor-ns-resize flex items-center justify-center group"
            >
              <div className="w-12 h-1.5 rounded-full bg-border group-hover:bg-foreground transition-colors" />
            </div>
            <div
              onMouseDown={(e) => startDrag("corner", e)}
              className="absolute -bottom-3 -right-3 h-6 w-6 cursor-nwse-resize rounded-full bg-foreground text-background grid place-items-center shadow-sm hover:scale-110 transition-transform"
              title="Drag to resize"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M9 1L1 9M9 5L5 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .preview-edit-canvas [data-preview-edit-id] { cursor: pointer; }
        .preview-edit-selected {
          outline: 2px solid ${theme.accent};
          outline-offset: 2px;
        }
      `}</style>
    </main>
  );
}

function stampEditableElement(element: HTMLElement, blockId: string, path: string) {
  element.dataset.previewEditId = `${blockId}:${path}`;
}

function getElementPath(root: HTMLElement, element: HTMLElement) {
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

function getElementLabel(element: HTMLElement) {
  const text = element.innerText?.replace(/\s+/g, " ").trim();
  if (text) return text.slice(0, 48);
  if (element instanceof HTMLImageElement) return element.alt || "Image";
  return element.tagName.toLowerCase();
}

function applyPreviewStyle(element: HTMLElement, style?: PreviewElementStyle) {
  element.style.fontWeight = style?.bold === undefined ? "" : style.bold ? "700" : "400";
  element.style.fontStyle = style?.italic === undefined ? "" : style.italic ? "italic" : "normal";
  element.style.textDecoration =
    style?.underline === undefined ? "" : style.underline ? "underline" : "none";
  element.style.color = style?.color || "";
  element.style.backgroundColor = style?.backgroundColor || "";
  element.style.borderRadius =
    style?.borderRadius === undefined || style.borderRadius === null
      ? ""
      : `${style.borderRadius}px`;
  element.style.padding =
    style?.padding === undefined || style.padding === null ? "" : `${style.padding}px`;
  element.style.width = style?.width || "";
  element.style.height = style?.height || "";
  element.style.display = style?.removed ? "none" : "";
}