import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { Maximize2, Minimize2, Monitor, Save, Smartphone, X, PencilLine, Wand2 } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";
import { DraggableBlockWrapper } from "@/components/editor/DraggableBlockWrapper";
import type { PreviewEditableSite, PreviewElementEdit, PreviewElementStyle } from "@/types/previewEditTypes";
import type { SiteData, Block, BlockTypography } from "@/types/builder.schema";
import { Dispatch, RefObject, SetStateAction } from "react";
import {
  calculateFrameResize,
  calculateViewportScale,
  tagAndApplyPreviewStyles,
  handleMeasuredBlockHeight,
  handlePreviewClick as handlePreviewClickFn,
  toggleEditMode as toggleEditModeFn,
  startFrameDrag,
  endFrameDrag,
  handleStartBlockResize as handleStartBlockResizeFn,
  type FrameDragState,
} from "@/lib/functions/TemplateDialog";

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
  setIsMaximized,
  dialogRef,
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
  setIsMaximized: Dispatch<SetStateAction<boolean>>;
  dialogRef: RefObject<HTMLDivElement | null>;
  onToggleMaximize: (
    isMaximized: boolean,
    setIsMaximized: Dispatch<SetStateAction<boolean>>,
    dialogRef: RefObject<HTMLDivElement | null>
  ) => void;
  onClose: () => void;
  onSave?: (site: SiteData) => void;
}) {
  const { theme, blocks } = site;
  const bg = theme.bg;
  const ink = theme.ink;

  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const dragState = useRef<FrameDragState | null>(null);
  const isDesktop = device === "desktop";

  const [editMode, setEditMode] = useState(false);
  const [size, setSize] = useState({
    width: DEFAULT_RESPONSIVE_WIDTH,
    height: DEFAULT_RESPONSIVE_HEIGHT,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [resizingBlock, setResizingBlock] = useState<{ id: string; startY: number; startHeight: number } | null>(null);

  const resizingRef = useRef<typeof resizingBlock>(null);
  useEffect(() => {
    resizingRef.current = resizingBlock;
  }, [resizingBlock]);

  const handleStartBlockResize = useCallback(
    (blockId: string, currentHeight: number, e: React.MouseEvent) => {
      handleStartBlockResizeFn(blockId, currentHeight, e, onUpdateBlock, setResizingBlock);
    },
    [onUpdateBlock]
  );

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
    const next = calculateViewportScale(
      viewportRef.current.clientWidth,
      viewportRef.current.clientHeight,
      width,
      height,
      VIEWPORT_PADDING
    );
    setScale(next);
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
    const nextSize = calculateFrameResize(
      drag,
      e.clientX,
      e.clientY,
      MIN_WIDTH,
      MAX_WIDTH,
      MIN_HEIGHT,
      MAX_HEIGHT
    );
    setSize(nextSize);
  }, []);

  const handleDragEnd = useCallback(() => {
    endFrameDrag(dragState, setIsDragging, handleDragMove, handleDragEnd);
  }, [handleDragMove]);

  function startDrag(edge: "left" | "right" | "bottom" | "corner", e: React.MouseEvent) {
    startFrameDrag(edge, e, width, height, scale, dragState, setIsDragging, handleDragMove, handleDragEnd);
  }

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  const sorted = [...blocks].sort((a, b) => a.order - b.order);

  useLayoutEffect(() => {
    tagAndApplyPreviewStyles(contentRef.current, blocks, selectedElementId, site.previewEdits);
  }, [blocks, selectedElementId, site.previewEdits]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const blockId = el.dataset.blockId;
        if (!blockId) continue;
        if (resizingRef.current?.id === blockId) continue; // don't fight the drag
        const measured = Math.round(entry.contentRect.height);
        handleMeasuredBlockHeight(blockId, measured, blocks, onUpdateBlock);
      }
    });

    root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted.map((b) => b.id).join(","), blocks, onUpdateBlock]);

  function handlePreviewClick(e: React.MouseEvent) {
    handlePreviewClickFn(e, editMode, blocks, site, onSelectElement);
  }

  function handleToggleEditMode() {
    toggleEditModeFn(setEditMode, sorted, site, onSelectElement);
  }

  const content = (
    <div
      ref={contentRef}
      className="min-h-full w-full preview-edit-canvas"
      style={{
        background: bg,
        color: ink,
        pointerEvents: editMode ? "auto" : "none",
      }}
      onClick={handlePreviewClick}
    >
      {sorted.map((block) => {
        const variant = (block.props as { variant?: string }).variant;
        const Cmp = getBlockComponent(block.props.kind, variant);
        if (!Cmp) return null;

        const isActive = activeSection === block.props.kind;
        const isResizingThis = resizingBlock?.id === block.id;
        const currentHeight = block.height ?? 200;
        const displayName = block.label ?? block.name ?? block.props.kind;
        const isNewBlock = Boolean(
          block.isCustom ||
          (block as Record<string, unknown>).isNew ||
          (block.props as { isCustom?: boolean })?.isCustom ||
          block.props?.kind === "spacer"
        );

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
              className={`relative group/block ${isActive ? "outline outline-2 outline-offset-[-2px]" : ""
                }`}
              style={{
                ...(isActive ? { outlineColor: theme.accent } : undefined),
                height: block.height ? `${block.height}px` : undefined,
                overflow: "hidden",
              }}
            >
              {/* Active / Selected Block Floating Controls Bar */}
              {isActive && (
                <div
                  data-blend-ignore
                  className="absolute top-2 right-2 z-30 flex items-center gap-1.5 rounded-full bg-foreground text-background px-2.5 py-1 text-[11px] font-semibold shadow-lift pointer-events-auto select-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="truncate max-w-[140px] capitalize">{displayName}</span>
                  {isNewBlock && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const patch = blendBlockWithNeighbors(block.id, blocks, theme, site, contentRef.current);
                        onUpdateBlock(block.id, patch);
                      }}
                      className="flex items-center gap-1.5 rounded-full bg-background/20 hover:bg-background/30 px-2 py-0.5 text-[10px] font-medium transition-colors cursor-pointer"
                      title="Blend block style & colors dynamically with portfolio"
                    >
                      <PencilLine className="h-3 w-3 text-accent" />
                      Blend
                    </button>
                  )}
                  {block.height && <span className="text-[10px] font-mono opacity-80">{block.height}px</span>}
                </div>
              )}

              {isNewBlock ? (
                <div style={{ height: "100%" }} className="[&>*]:h-full">
                  <Cmp
                    id={block.id}
                    props={block.props}
                    theme={theme}
                    onChange={(patch: Record<string, unknown>) =>
                      editMode ? onUpdateBlock(block.id, patch) : undefined
                    }
                  />
                </div>
              ) : (
                <Cmp
                  id={block.id}
                  props={block.props}
                  theme={theme}
                  onChange={(patch: Record<string, unknown>) =>
                    editMode ? onUpdateBlock(block.id, patch) : undefined
                  }
                />
              )}

              {/* Bottom Drag Height Resize Handle */}
              <div
                data-blend-ignore
                onMouseDown={(e) => handleStartBlockResize(block.id, currentHeight, e)}
                className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-30 flex items-center justify-center pointer-events-auto select-none group/resize"
                title="Drag to resize block height smoothly"
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`h-1.5 w-20 rounded-full transition-all flex items-center justify-center ${isResizingThis
                  ? "bg-foreground shadow-md scale-110 opacity-100"
                  : "bg-foreground/30 group-hover/resize:bg-foreground/80 group-hover/resize:scale-105 opacity-0 group-hover/block:opacity-100"
                  }`}>
                  <div className="h-0.5 w-6 rounded-full bg-background/80" />
                </div>
                {isResizingThis && (
                  <div className="absolute bottom-5 bg-foreground text-background px-2.5 py-0.5 rounded text-[10px] font-mono shadow-md">
                    Height: {block.height}px
                  </div>
                )}
              </div>
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

          <button
            onClick={handleToggleEditMode}
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
            onClick={() => onToggleMaximize(isMaximized, setIsMaximized, dialogRef)}
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
