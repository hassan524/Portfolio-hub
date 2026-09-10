import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";
import { Maximize2, Minimize2, Monitor, Move, Save, Smartphone, X, PencilLine } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";
import { DraggableBlockWrapper } from "./DraggableBlockWrapper";
import type {
  PreviewEditableSite,
  PreviewElementEdit,
  PreviewElementStyle,
} from "@/types/previewEditTypes";
import type { SiteData, Block, Theme } from "@/types/builder.schema";
import {
  calculateViewportScale,
  tagAndApplyPreviewStyles,
  handleMeasuredBlockHeight,
  startFrameDrag,
  endFrameDrag,
  handleStartBlockResize as handleStartBlockResizeFn,
  handleInteractiveToggleEditMode,
  handleToggleMoveMode,
  handleInteractivePreviewClick,
  handleFrameResizeMove,
  handleContentFreeDragStart,
  updatePreviewHoverHighlight,
  clearPreviewHoverHighlight,
  bindResponsivePreviewInteractions,
  type FrameDragState,
  type GuideLine,
  type ConfirmationCopy,
  type ConfirmationType,
} from "@/lib/functions/template";
import PreviewIframe from "./PreviewIframe";
import { GuideOverlay } from "./GuideOverlay";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";

type Device = "desktop" | "responsive";

const DEFAULT_RESPONSIVE_WIDTH = 390;
const DEFAULT_RESPONSIVE_HEIGHT = 844;
const DEFAULT_DESKTOP_WIDTH = 1440;
const VIEWPORT_PADDING = 40;

type ConfirmOptions = Partial<ConfirmationCopy> & { type?: ConfirmationType };

const MINI_FALLBACK_THEME: Theme = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft",
  spacing: "cozy",
};

// ============================================================================
// ABOUT TAB — per-section "screenshots" (real rendered sections, scaled down)
// ============================================================================

const SECTION_SCREENSHOT_WIDTH = 1200;

// Renders ONE block at full width then scales it down to fit the card,
// like a real screenshot of that section — not a live editable canvas.
function SectionScreenshot({
  block,
  site,
  theme,
}: {
  block: Block;
  site: PreviewEditableSite;
  theme: Theme;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const innerEl = innerRef.current;
    if (!wrapperEl || !innerEl) return;

    const update = () => {
      setScale(wrapperEl.clientWidth / SECTION_SCREENSHOT_WIDTH);
      setContentHeight(innerEl.scrollHeight);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(wrapperEl);
    ro.observe(innerEl);

    return () => ro.disconnect();
  }, []);

  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  if (!Cmp) return null;

  const displayName = block.label ?? block.name ?? block.props.kind;

  return (
    <div className="rounded-xl border border-border bg-background shadow-md overflow-hidden">
      {/* Caption bar — just a label, not editor chrome */}
      <div className="h-8 border-b border-border bg-surface flex items-center px-3 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground capitalize">
          {displayName}
        </span>
      </div>

      {/* Scaled-down screenshot of just this section */}
      <div
        ref={wrapperRef}
        className="relative w-full overflow-hidden pointer-events-none select-none"
        style={{ height: contentHeight * scale }}
      >
        <div
          ref={innerRef}
          style={{
            width: SECTION_SCREENSHOT_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            background: theme.bg,
            color: theme.ink,
          }}
        >
          <Cmp id={block.id} props={block.props} theme={theme} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
}

// Stacks a screenshot per section, skipping navbar + footer.
function SectionScreenshotList({ site }: { site: PreviewEditableSite }) {
  const theme = site.theme ?? MINI_FALLBACK_THEME;
  const sorted = [...(site.blocks ?? [])]
    .sort((a, b) => a.order - b.order)
    .filter((b) => b.props.kind !== "navbar" && b.props.kind !== "footer");

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((b) => (
        <SectionScreenshot key={b.id} block={b} site={site} theme={theme} />
      ))}
    </div>
  );
}

// One line in the "What's Included" breakdown.
function FeatureLine({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-foreground">{title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

export function TemplateLivePreview({
  site,
  device,
  activeSection,
  selectedElementId,
  onSelectElement,
  onChangeElementStyle,
  onDeviceChange,
  onUpdateBlock,
  onReorderBlocks,
  isMaximized,
  setIsMaximized,
  dialogRef,
  onToggleMaximize,
  onClose,
  onSave,
  changeCount,
  contentRef,
  activeTab,
  setActiveTab,
}: {
  site: PreviewEditableSite;
  device: Device;
  activeSection: string;

  selectedElementId?: string | null;
  onSelectElement?: (edit: PreviewElementEdit | null) => void;
  onChangeElementStyle?: (elementId: string, patch: Partial<PreviewElementStyle>) => void;

  onDeviceChange: (device: Device) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;

  onUpdateTypography?: (blockId: string, patch: Record<string, unknown>) => void;

  onReorderBlocks: (blocks: Block[]) => void;

  isMaximized: boolean;
  setIsMaximized: Dispatch<SetStateAction<boolean>>;

  dialogRef: RefObject<HTMLDivElement | null>;

  onToggleMaximize: (
    isMaximized: boolean,
    setIsMaximized: Dispatch<SetStateAction<boolean>>,
    dialogRef: RefObject<HTMLDivElement | null>,
  ) => void;

  onClose: () => void;
  onSave?: (site: SiteData) => void;
  changeCount?: number;
  contentRef: RefObject<HTMLDivElement | null>;
  activeTab: "editor" | "about";
  setActiveTab: (tab: "editor" | "about") => void;
}) {
  const { theme, blocks } = site;
  const bg = theme.bg;
  const ink = theme.ink;
  const REQUIRED_CHANGES = 10;
  const changesMade = changeCount ?? 0;
  const canSave = changesMade >= REQUIRED_CHANGES;

  // Refs for the preview viewport and its content.
  const frameRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const responsiveFrameRef = useRef<HTMLIFrameElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Drag state is used to resize the responsive frame.
  const dragState = useRef<FrameDragState | null>(null);
  const dragRafRef = useRef<number | null>(null);
  const dragPointerRef = useRef<{ x: number; y: number } | null>(null);
  const isDesktop = device === "desktop";

  // add this near your other useState calls in TemplateLivePreview
  const [pendingRootSelection, setPendingRootSelection] = useState<PreviewElementEdit | null>(null);

  /* ---------------------------------------------------------------------- */
  /*                    LOCAL CONFIRM MODAL (context-free)                   */
  /* ---------------------------------------------------------------------- */

  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { open: boolean }) | null>(
    null,
  );

  const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

  // Same async signature the old context `confirm` had: call it, await a boolean.
  const confirm = useCallback((options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      confirmResolveRef.current = resolve;
      setConfirmState({ ...options, open: true });
    });
  }, []);

  const resolveConfirm = useCallback((value: boolean) => {
    setConfirmState((prev) => (prev ? { ...prev, open: false } : prev));
    confirmResolveRef.current?.(value);
    confirmResolveRef.current = null;
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [size, setSize] = useState({
    width: DEFAULT_RESPONSIVE_WIDTH,
    height: DEFAULT_RESPONSIVE_HEIGHT,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [resizingBlock, setResizingBlock] = useState<{
    id: string;
    startY: number;
    startHeight: number;
  } | null>(null);

  const [dragGuides, setDragGuides] = useState<GuideLine[]>([]);
  const [draggingElementId, setDraggingElementId] = useState<string | null>(null);
  const hoveredElementRef = useRef<HTMLElement | null>(null);

  const resizingRef = useRef<typeof resizingBlock>(null);
  useEffect(() => {
    resizingRef.current = resizingBlock;
  }, [resizingBlock]);

  const handleStartBlockResize = useCallback(
    (blockId: string, currentHeight: number, e: React.MouseEvent) => {
      handleStartBlockResizeFn(blockId, currentHeight, e, onUpdateBlock, setResizingBlock);
    },
    [onUpdateBlock],
  );

  useEffect(() => {
    if (!isDesktop) {
      setSize({ width: DEFAULT_RESPONSIVE_WIDTH, height: DEFAULT_RESPONSIVE_HEIGHT });
      responsiveFrameRef.current?.contentWindow?.scrollTo({ top: 0, left: 0 });
    } else {
      desktopScrollRef.current?.scrollTo({ top: 0, left: 0 });
    }
  }, [isDesktop]);

  const { width, height } = size;

  const recalcScale = useCallback(() => {
    if (isDesktop) {
      const viewportWidth = desktopScrollRef.current?.clientWidth ?? DEFAULT_DESKTOP_WIDTH;
      const availableWidth = viewportWidth - VIEWPORT_PADDING * 2;
      const next = Math.min(1, availableWidth / DEFAULT_DESKTOP_WIDTH);
      setScale(Number.isFinite(next) && next > 0 ? next : 1);
      return;
    }

    if (!viewportRef.current) {
      setScale(1);
      return;
    }
    const next = calculateViewportScale(
      viewportRef.current.clientWidth,
      viewportRef.current.clientHeight,
      width,
      height,
      VIEWPORT_PADDING,
    );
    setScale(next);
  }, [isDesktop, width, height]);

  useEffect(() => {
    recalcScale();
  }, [recalcScale, isMaximized]);

  useEffect(() => {
    const observedElement = isDesktop ? desktopScrollRef.current : viewportRef.current;
    if (!observedElement) return;
    const observer = new ResizeObserver(() => recalcScale());
    observer.observe(observedElement);
    return () => observer.disconnect();
  }, [isDesktop, recalcScale]);

  const handleDragMove = useCallback((e: MouseEvent) => {
    handleFrameResizeMove(e, dragState, dragPointerRef, dragRafRef, setSize);
  }, []);

  function handleContentMouseDown(e: React.MouseEvent) {
    if (!isDesktop) return;
    handleContentFreeDragStart(
      e,
      editMode,
      moveMode,
      device,
      scale,
      onChangeElementStyle,
      setDragGuides,
      setDraggingElementId,
    );
  }

  const handleDragEnd = useCallback(() => {
    endFrameDrag(dragState, setIsDragging, handleDragMove, handleDragEnd);
  }, [handleDragMove]);

  function startDrag(edge: "left" | "right" | "bottom" | "corner", e: React.MouseEvent) {
    startFrameDrag(
      edge,
      e,
      width,
      height,
      scale,
      dragState,
      setIsDragging,
      handleDragMove,
      handleDragEnd,
    );
  }

  useEffect(() => {
    const currentRaf = dragRafRef.current;

    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);

      if (currentRaf !== null) cancelAnimationFrame(currentRaf);
    };
  }, [handleDragMove, handleDragEnd]);

  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const sortedBlockIds = sorted.map((block) => block.id).join(",");

  useLayoutEffect(() => {
    if (contentRef.current) {
      tagAndApplyPreviewStyles(
        contentRef.current,
        blocks,
        selectedElementId,
        site.previewEdits,
        device,
      );
    }

    const iframeDoc = responsiveFrameRef.current?.contentDocument;
    if (iframeDoc?.body) {
      iframeDoc.body.style.setProperty("--preview-editor-accent", theme.accent);
      iframeDoc.documentElement.style.setProperty("--preview-editor-accent", theme.accent);
      tagAndApplyPreviewStyles(iframeDoc.body, blocks, selectedElementId, site.previewEdits, device);
    }
  }, [blocks, contentRef, selectedElementId, site.previewEdits, device, theme.accent]);

  // Desktop-only capture-phase listeners. Responsive-mode interactions are
  // bound separately, directly on the iframe body, via
  // handleResponsiveDocumentReady -> bindResponsivePreviewInteractions below —
  // that's the correct hook point (PreviewIframe treats its return value as
  // the cleanup function) and avoids double-binding on contentRef.current,
  // which in responsive mode is itself a node living inside the iframe.
  useEffect(() => {
    if (!isDesktop) return;
    const desktopEl = contentRef.current;
    if (!desktopEl) return;

    function handleCaptureClick(e: MouseEvent) {
      if (!editMode) return;
      handleInteractivePreviewClick(e, editMode, blocks, site, onSelectElement);
    }

    let moveRaf: number | null = null;
    function handleMouseMove(e: MouseEvent) {
      if (!editMode) return;
      if (moveRaf !== null) return;
      const { target, altKey } = e;
      moveRaf = requestAnimationFrame(() => {
        moveRaf = null;
        updatePreviewHoverHighlight(target, altKey, hoveredElementRef);
      });
    }
    function handleMouseLeave() {
      if (moveRaf !== null) { cancelAnimationFrame(moveRaf); moveRaf = null; }
      clearPreviewHoverHighlight(hoveredElementRef);
    }

    desktopEl.addEventListener("click", handleCaptureClick, true);
    desktopEl.addEventListener("mousemove", handleMouseMove, true);
    desktopEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (moveRaf !== null) cancelAnimationFrame(moveRaf);
      desktopEl.removeEventListener("click", handleCaptureClick, true);
      desktopEl.removeEventListener("mousemove", handleMouseMove, true);
      desktopEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDesktop, editMode, blocks, site, onSelectElement]);

  function handlePreviewClick(e: React.MouseEvent) {
    if (!editMode) return;
    handleInteractivePreviewClick(
      e,
      editMode,
      blocks,
      site,
      onSelectElement,
    );
  }

  const mouseMoveRafRef = useRef<number | null>(null);
  function handlePreviewMouseMove(e: React.MouseEvent) {
    if (!editMode) return;
    const target = e.target;
    const altKey = e.altKey;
    if (mouseMoveRafRef.current !== null) return;
    mouseMoveRafRef.current = requestAnimationFrame(() => {
      mouseMoveRafRef.current = null;
      updatePreviewHoverHighlight(target, altKey, hoveredElementRef);
    });
  }

  function handlePreviewMouseLeave() {
    if (mouseMoveRafRef.current !== null) {
      cancelAnimationFrame(mouseMoveRafRef.current);
      mouseMoveRafRef.current = null;
    }
    clearPreviewHoverHighlight(hoveredElementRef);
  }

  // Fires once the iframe's document/body is mounted (and again whenever this
  // callback's identity changes below, i.e. whenever editMode/blocks/site/etc.
  // change) — PreviewIframe calls this and stores its return value, calling it
  // as a cleanup before the next call or on unmount. This is what actually
  // wires up click + hover inside the responsive iframe.
  const handleResponsiveDocumentReady = useCallback(
    (body: HTMLElement) => {
      const doc = body.ownerDocument;

      // 1. Manually inject the hover styles into the iframe's head
      let styleEl = doc.getElementById("iframe-editor-styles");
      if (!styleEl) {
        styleEl = doc.createElement("style");
        styleEl.id = "iframe-editor-styles";
        doc.head.appendChild(styleEl);
      }

      styleEl.textContent = `
        .preview-edit-canvas.edit-active {
          cursor: default;
        }
        .preview-edit-canvas.edit-active .preview-edit-hovered:not(.preview-edit-selected) {
          outline: 2px dashed ${theme.accent}cc !important;
          outline-offset: 3px !important;
          cursor: pointer !important;
          transform: scale(1.01);
          transition: outline 0.12s ease, transform 0.12s ease;
        }
        .preview-edit-canvas.move-active .preview-edit-hovered:not(.preview-edit-selected) {
          outline: 2px dashed ${theme.accent}dd !important;
          outline-offset: 4px !important;
          cursor: move !important;
          transform: scale(1.01);
          transition: outline 0.12s ease, transform 0.12s ease;
        }
        .preview-edit-canvas.edit-active .preview-edit-selected,
        .preview-edit-selected {
          outline: 2px solid ${theme.accent} !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px ${theme.accent}33, 0 8px 24px rgba(0,0,0,0.18) !important;
          transform: scale(1.02) !important;
          z-index: 35 !important;
          position: relative !important;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.15s ease, box-shadow 0.18s ease !important;
        }
        .preview-hover-lift:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 24px -6px rgba(0,0,0,0.2) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
      `;

      // 2. Apply theme variables and bind interactions
      body.style.setProperty("--preview-editor-accent", theme.accent);
      doc.documentElement.style.setProperty("--preview-editor-accent", theme.accent);
      tagAndApplyPreviewStyles(body, blocks, selectedElementId, site.previewEdits, device);

      return bindResponsivePreviewInteractions(body, {
        editMode,
        blocks,
        site,
        device,
        onSelectElement,
        hoverRef: hoveredElementRef,
        onMouseDown: (e) => {
          handleContentFreeDragStart(
            e as unknown as React.MouseEvent,
            editMode,
            moveMode,
            device,
            scale,
            onChangeElementStyle,
            setDragGuides,
            setDraggingElementId,
          );
        },
      });
    },
    [
      blocks,
      selectedElementId,
      site,
      device,
      theme.accent,
      editMode,
      moveMode,
      scale,
      onSelectElement,
      onChangeElementStyle,
    ],
  );

  function handleToggleEditMode() {
    if (editMode) handlePreviewMouseLeave();
    handleInteractiveToggleEditMode(
      editMode,
      setEditMode,
      setMoveMode,
      sorted,
      site,
      contentRef,
      activeSection,
      onSelectElement,
    );
  }

  function handleToggleMoveModeClick() {
    handleToggleMoveMode(moveMode, setMoveMode, setEditMode, confirm);
  }

  async function handleSaveClick() {
    const ok = await confirm({
      title: "Save changes?",
      description: "Are you sure you want to save this portfolio?",
      confirmLabel: "Save",
      cancelLabel: "Cancel",
    });
    if (ok) onSave?.(site);
  }

  const previewContent = (
    <>

      <div
        ref={contentRef}
        className={`min-h-full w-full preview-edit-canvas ${editMode ? "edit-active" : ""} ${moveMode ? "move-active" : ""}`}
        style={{ background: bg, color: ink }}
        onClick={handlePreviewClick}
        onMouseDown={handleContentMouseDown}
        onMouseMove={handlePreviewMouseMove}
        onMouseLeave={handlePreviewMouseLeave}
      >
        {sorted.map((block) => {
          const variant = (block.props as { variant?: string }).variant;
          const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
          if (!Cmp) return null;

          const isActive = !editMode && activeSection === block.props.kind && block.props.kind !== "navbar";
          const isResizingThis = resizingBlock?.id === block.id;
          const currentHeight = block.height ?? 200;
          const displayName = block.label ?? block.name ?? block.props.kind;
          const componentProps =
            block.props.kind === "navbar" || block.props.kind === "footer"
              ? { ...block.props, logo: site.logo }
              : block.props;
          const isNewBlock = Boolean(
            block.isCustom ||
            (block as Record<string, unknown>).isNew ||
            (block.props as { isCustom?: boolean })?.isCustom ||
            block.props?.kind === "spacer",
          );

          return (
            <DraggableBlockWrapper
              key={block.id}
              block={block}
              blocks={blocks}
              onReorderBlocks={onReorderBlocks}
              ink={ink}
              moveMode={moveMode}
            >
              <div
                data-block-id={block.id}
                data-block-kind={block.props.kind}
                className={`relative group/block ${isActive ? "outline outline-2 outline-offset-[-2px]" : ""
                  }`}
                style={{
                  ...(isActive ? { outlineColor: theme.accent } : undefined),
                  minHeight: isDesktop && block.height ? `${block.height}px` : undefined,
                  position: "relative",
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
                          const patch = blendBlockWithNeighbors(
                            block.id,
                            blocks,
                            theme,
                            site,
                            contentRef.current,
                          );
                          onUpdateBlock(block.id, patch);
                        }}
                        className="flex items-center gap-1.5 rounded-full bg-background/20 hover:bg-background/30 px-2 py-0.5 text-[10px] font-medium transition-colors cursor-pointer"
                        title="Blend block style & colors dynamically with portfolio"
                      >
                        <PencilLine className="h-3 w-3 text-accent" />
                        Blend
                      </button>
                    )}
                    {isDesktop && block.height && (
                      <span className="text-[10px] font-mono opacity-80">{block.height}px</span>
                    )}
                  </div>
                )}

                {isNewBlock ? (
                  <div style={{ height: "100%" }} className="[&>*]:h-full">
                    <Cmp
                      id={block.id}
                      props={componentProps}
                      theme={theme}
                      onChange={(patch: Record<string, unknown>) =>
                        editMode ? onUpdateBlock(block.id, patch) : undefined
                      }
                    />
                  </div>
                ) : (
                  <Cmp
                    id={block.id}
                    props={componentProps}
                    theme={theme}
                    onChange={(patch: Record<string, unknown>) =>
                      editMode ? onUpdateBlock(block.id, patch) : undefined
                    }
                  />
                )}

                {draggingElementId?.startsWith(`${block.id}:`) && (
                  <GuideOverlay guides={dragGuides} />
                )}

                {/* Bottom Drag Height Resize Handle — desktop-only */}
                {isDesktop && (
                  <div
                    data-blend-ignore
                    onMouseDown={(e) => handleStartBlockResize(block.id, currentHeight, e)}
                    className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-30 flex items-center justify-center pointer-events-auto select-none group/resize"
                    title="Drag to resize block height smoothly"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={`h-1.5 w-20 rounded-full transition-all flex items-center justify-center ${isResizingThis
                        ? "bg-foreground shadow-md scale-110 opacity-100"
                        : "bg-foreground/30 group-hover/resize:bg-foreground/80 group-hover/resize:scale-105 opacity-0 group-hover/block:opacity-100"
                        }`}
                    >
                      <div className="h-0.5 w-6 rounded-full bg-background/80" />
                    </div>
                    {isResizingThis && (
                      <div className="absolute bottom-5 bg-foreground text-background px-2.5 py-0.5 rounded text-[10px] font-mono shadow-md">
                        Height: {block.height}px
                      </div>
                    )}
                  </div>
                )}
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
              Built with <span style={{ color: theme.accent }}>Portflu</span>
            </span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-surface-elevated border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <div className="flex items-center rounded-lg border border-border bg-surface p-0.5 select-none">
          <button
            onClick={() => setActiveTab("editor")}
            className={`px-3 py-1 text-xs cursor-pointer rounded-md transition-all ${
              activeTab === "editor"
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
            }`}
          >
            Editor
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-3 py-1 text-xs cursor-pointer rounded-md transition-all ${
              activeTab === "about"
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
            }`}
          >
            About
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {activeTab === "editor" && (
            <>
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
                title={
                  editMode
                    ? "Exit edit mode — hover to preview selection; hold Alt for a container"
                    : "Enter edit mode"
                }
                aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
              >
                <PencilLine className="h-4 w-4" />
              </button>

              <button
                onClick={handleToggleMoveModeClick}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full border transition-all ${moveMode
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title={moveMode ? "Turn off move mode" : "Turn on move mode"}
                aria-label={moveMode ? "Turn off move mode" : "Turn on move mode"}
              >
                <Move className="h-4 w-4" />
              </button>

              <div className="h-5 w-px bg-border" />

              {onSave && (
                <button
                  onClick={canSave ? handleSaveClick : undefined}
                  disabled={!canSave}
                  className={`flex h-8 items-center gap-2 rounded-md px-3 text-xs font-semibold transition-all ${canSave
                      ? "cursor-pointer bg-foreground text-background hover:opacity-90"
                      : "cursor-not-allowed bg-foreground/15 text-ink-soft/70"
                    }`}
                  title={
                    canSave
                      ? "Save changes"
                      : `Make ${REQUIRED_CHANGES - changesMade} more change${REQUIRED_CHANGES - changesMade === 1 ? "" : "s"
                      } to enable saving`
                  }
                >
                  <Save className="h-4 w-4" />
                  {canSave ? "Save" : `Save`}
                </button>
              )}

              <div className="h-5 w-px bg-border" />
            </>
          )}

          <button
            onClick={() => onToggleMaximize(isMaximized, setIsMaximized, dialogRef)}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
            title={isMaximized ? "Exit Full Screen" : "Maximize"}
          >
            {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
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

      {activeTab === "about" ? (
        <div className="flex-1 overflow-y-auto bg-surface-elevated p-8 flex flex-col md:flex-row gap-8 items-start justify-center">
          {/* Section screenshots — real rendered sections, scaled down. No navbar/footer. */}
          <div className="w-full md:w-1/2 max-w-lg shrink-0 max-h-[75vh] overflow-y-auto simple-scrollbar pr-1">
            <SectionScreenshotList site={site} />
          </div>

          {/* Description & metadata column */}
          <div className="flex-1 max-w-md flex flex-col gap-5 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded">
                {site.category || "Template"}
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                {site.name}
              </h2>
              {site.tagline && (
                <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
                  {site.tagline}
                </p>
              )}
            </div>

            {/* What's Included — bold white heading on a dark bar, plain-English breakdown */}
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="bg-foreground px-4 py-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-background">
                  What's Included
                </h3>
              </div>
              <div className="bg-surface p-4 flex flex-col gap-3">
                {/* TODO(Hassan): swap this dummy copy for real per-template descriptions */}
                <FeatureLine
                  title="Hero Section"
                  description="A large intro image with a headline and a button that takes visitors straight to the contact form."
                />
                <FeatureLine
                  title="4 Services"
                  description="Four service cards, each with an icon, title, and one-line description of what you offer."
                />
                <FeatureLine
                  title="Projects Showcase"
                  description="A gallery of your work with images, titles, and short descriptions for each project."
                />
                <FeatureLine
                  title="Testimonials"
                  description="Quotes from past clients to build trust with new visitors."
                />
                <FeatureLine
                  title="Contact Form"
                  description="A working form so visitors can reach out to you directly, no email app needed."
                />
              </div>
            </div>

            <div className="rounded-xl border border-blue-100/50 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20 p-4">
              <h4 className="text-xs font-semibold text-blue-850 dark:text-blue-300">
                Privacy & Terms of Service
              </h4>
              <p className="mt-1.5 text-xs text-blue-600 dark:text-blue-400/90 leading-relaxed">
                You don't need to worry about privacy policies and terms, we'll handle all of it itself.
              </p>
            </div>

            {/* Sitemap — same box pattern as privacy/ToS, own color, sits at the end */}
            <div className="rounded-xl border border-emerald-100/50 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-950/20 p-4">
              <h4 className="text-xs font-semibold text-emerald-850 dark:text-emerald-300">
                Sitemap.xml
              </h4>
              <p className="mt-1.5 text-xs text-emerald-600 dark:text-emerald-400/90 leading-relaxed">
                A sitemap.xml is generated automatically for every published site, so search engines can find and index all of your pages.
              </p>
            </div>
          </div>
        </div>
      ) : isDesktop ? (
        <div
          ref={desktopScrollRef}
          className="simple-scrollbar flex-1 min-h-0 overflow-auto p-4 md:p-6"
          style={{ overscrollBehavior: "contain" }}
        >
          <div
            ref={frameRef}
            className="mx-auto min-h-full border border-border bg-background shadow-lift"
            style={{
              width: DEFAULT_DESKTOP_WIDTH,
              zoom: scale,
            }}
          >
            {previewContent}
          </div>
        </div>
      ) : (
        <div
          ref={viewportRef}
          className="flex-1 min-h-0 overflow-hidden flex items-center justify-center select-none"
          onWheel={(e) => {
            if (e.target === viewportRef.current) {
              const win = responsiveFrameRef.current?.contentWindow;
              if (win) {
                win.scrollBy({
                  top: e.deltaY,
                  left: 0,
                  behavior: "auto",
                });
              }
            }
          }}
          style={{ overscrollBehavior: "contain" }}
        >
          <div
            className="relative shrink-0"
            style={{ width: width * scale, height: height * scale }}
          >
            <PreviewIframe
              width={width}
              height={height}
              scale={scale}
              isDragging={isDragging}
              editMode={editMode}
              iframeRef={responsiveFrameRef}
              onDocumentReady={handleResponsiveDocumentReady}
            >
              {previewContent}
            </PreviewIframe>

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

      <ConfirmationDialog
        open={!!confirmState?.open}
        type={confirmState?.type}
        title={confirmState?.title}
        description={confirmState?.description}
        confirmLabel={confirmState?.confirmLabel}
        cancelLabel={confirmState?.cancelLabel}
        onOpenChange={(open) => {
          if (!open) resolveConfirm(false);
        }}
        onConfirm={() => resolveConfirm(true)}
        onCancel={() => resolveConfirm(false)}
      />

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .preview-edit-canvas.edit-active {
          cursor: default;
        }
        .preview-edit-canvas.edit-active .preview-edit-hovered:not(.preview-edit-selected) {
          outline: 2px dashed ${theme.accent}cc !important;
          outline-offset: 3px !important;
          cursor: pointer !important;
          transform: scale(1.01);
          transition: outline 0.12s ease, transform 0.12s ease;
        }
        .preview-edit-canvas.move-active .preview-edit-hovered:not(.preview-edit-selected) {
          outline: 2px dashed ${theme.accent}dd !important;
          outline-offset: 4px !important;
          cursor: move !important;
          transform: scale(1.01);
          transition: outline 0.12s ease, transform 0.12s ease;
        }
        .preview-edit-canvas.edit-active .preview-edit-selected,
        .preview-edit-selected {
          outline: 2px solid ${theme.accent} !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px ${theme.accent}33, 0 8px 24px rgba(0,0,0,0.18) !important;
          transform: scale(1.02) !important;
          z-index: 35 !important;
          position: relative !important;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.15s ease, box-shadow 0.18s ease !important;
        }
        .preview-hover-lift:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 12px 24px -6px rgba(0,0,0,0.2) !important;
          transition: transform 0.2s ease, box-shadow 0.2s ease !important;
        }
      `}</style>
    </main>
  );
}