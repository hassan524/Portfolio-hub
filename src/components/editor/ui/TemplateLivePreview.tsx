import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  Dispatch,
  RefObject,
  SetStateAction,
} from "react";
import {
  Maximize2,
  Minimize2,
  Monitor,
  Move,
  Save,
  Smartphone,
  Tablet,
  MonitorSmartphone,
  Plus,
  Minus,
  X,
  PencilLine,
  RefreshCw,
  Loader2,
  Menu,
} from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";
import { DraggableBlockWrapper } from "./DraggableBlockWrapper";
import { TextOverrideProvider } from "./Editable";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import { ThemeCircleRow } from "./ThemeColorPicker";
import type { EditorControls } from "./TemplateSidebar";
import type {
  PreviewEditableSite,
  PreviewElementEdit,
  PreviewElementStyle,
} from "@/types/previewEditTypes";
import type { SiteData, Block, Theme } from "@/types/builder.schema";
import type { ResponsiveBreakpoint } from "@/types/previewEditTypes";
import {
  calculateViewportScale,
  tagAndApplyPreviewStyles,
  breakpointFromWidth,
  startFrameDrag,
  endFrameDrag,
  handleStartBlockResize as handleStartBlockResizeFn,
  handleInteractiveToggleEditMode,
  selectFirstEditableElement,
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
import {
  BREAKPOINT_PRESETS,
  DEFAULT_DESKTOP_WIDTH,
  DEFAULT_RESPONSIVE_HEIGHT,
  DEFAULT_RESPONSIVE_WIDTH,
  MAX_FRAME_WIDTH,
  MIN_FRAME_WIDTH,
  VIEWPORT_PADDING,
  buildResponsiveEditorStyles,
  handlePreviewNavigationClick,
} from "@/lib/functions/livePreview";
import PreviewIframe from "./PreviewIframe";
import { GuideOverlay } from "./GuideOverlay";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import { PreviewLoadingState, PreviewBlock } from "../live-preview/PreviewBlock";

type Device = "desktop" | "responsive";

// Responsive Editing is on. These are just convenient starting points —
type ConfirmOptions = Partial<ConfirmationCopy> & { type?: ConfirmationType };

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
  responsiveEditMode,
  onResponsiveEditModeChange,
  onBreakpointChange,
  onThemeChange,
  onOpenMobileMenu,
  onControlsReady,
  sectionLinks = [],
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
  onThemeChange?: (patch: Partial<Theme>) => void;

  // Responsive per-breakpoint editing
  responsiveEditMode: boolean;
  onResponsiveEditModeChange: (on: boolean) => void;
  onBreakpointChange?: (breakpoint: ResponsiveBreakpoint) => void;

  // Mobile menu & external controls
  onOpenMobileMenu?: () => void;
  onControlsReady?: (controls: EditorControls) => void;
  sectionLinks?: string[];
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

  /* ---------------------------------------------------------------------- */
  /*                    LOCAL CONFIRM MODAL (context-free)                   */
  /* ---------------------------------------------------------------------- */

  const [confirmState, setConfirmState] = useState<(ConfirmOptions & { open: boolean }) | null>(
    null,
  );

  const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      confirmResolveRef.current = resolve;
      setConfirmState({ ...options, open: true });
    });
  }, []);

  const resolveConfirm = useCallback((value: boolean) => {
    setConfirmState(null);
    if (confirmResolveRef.current) {
      const fn = confirmResolveRef.current;
      confirmResolveRef.current = null;
      fn(value);
    }
  }, []);

  // Safeguard: resolve any pending confirmation on unmount to prevent lingering locks
  useEffect(() => {
    return () => {
      if (confirmResolveRef.current) {
        confirmResolveRef.current(false);
        confirmResolveRef.current = null;
      }
    };
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [moveMode, setMoveMode] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [size, setSize] = useState({
    width: DEFAULT_RESPONSIVE_WIDTH,
    height: DEFAULT_RESPONSIVE_HEIGHT,
  });
  const { width, height } = size;
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
      handleStartBlockResizeFn(blockId, currentHeight, e, onUpdateBlock, setResizingBlock, scale);
    },
    [onUpdateBlock, scale],
  );

  useEffect(() => {
    if (!isDesktop) {
      setSize({ width: DEFAULT_RESPONSIVE_WIDTH, height: DEFAULT_RESPONSIVE_HEIGHT });
      responsiveFrameRef.current?.contentWindow?.scrollTo({ top: 0, left: 0 });
    } else {
      desktopScrollRef.current?.scrollTo({ top: 0, left: 0 });
    }
  }, [isDesktop]);

  /* ---------------------------------------------------------------------- */
  /*                    RESPONSIVE PER-BREAKPOINT EDITING                    */
  /* ---------------------------------------------------------------------- */

  // Which breakpoint bucket is currently "active" for editing/display.
  // Off -> always "desktop" (today's behavior, unchanged).
  // On -> derived from the ACTUAL current frame width, so dragging the
  // resize handles (or nudging with +/-) naturally crosses into
  // Tablet/Mobile the same way a real responsive site would.
  const effectiveBreakpoint: ResponsiveBreakpoint = useMemo(() => {
    if (isDesktop) return "desktop";
    return breakpointFromWidth(width);
  }, [isDesktop, width]);

  // Turning Responsive Editing on forces the resizable frame (since the
  // fixed-zoom Desktop frame can't represent arbitrary breakpoint widths),
  // starting at the Desktop preset so nothing visually jumps unexpectedly.
  useEffect(() => {
    if (responsiveEditMode && isDesktop) {
      onDeviceChange("responsive");
      setSize({ width: BREAKPOINT_PRESETS.desktop.width, height: BREAKPOINT_PRESETS.desktop.height });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsiveEditMode]);

  // Tell the parent (dialog) which breakpoint is active whenever it
  // changes, so it can pass the right value into changeElementStyle.
  useEffect(() => {
    onBreakpointChange?.(effectiveBreakpoint);
  }, [effectiveBreakpoint, onBreakpointChange]);

  async function handleToggleResponsiveEdit() {
    if (responsiveEditMode) {
      onResponsiveEditModeChange(false);
      return;
    }
    const ok = await confirm({
      type: "allow",
      title: "Turn on Responsive Editing?",
      description:
        "You'll be able to style this page differently for Desktop, Tablet, and Mobile. Resize the frame or pick a screen size below — edits only apply to that screen.",
      confirmLabel: "Turn On",
    });
    if (ok) {
      onResponsiveEditModeChange(true);
      setEditMode(true);
      const container = contentRef.current || responsiveFrameRef.current?.contentDocument?.body;
      selectFirstEditableElement(sorted, site, container, activeSection, onSelectElement);
    }
  }

  function handlePickBreakpoint(bp: ResponsiveBreakpoint) {
    const preset = BREAKPOINT_PRESETS[bp];
    setSize({ width: preset.width, height: preset.height });
  }

  function bumpWidth(delta: number) {
    setSize((s) => ({
      ...s,
      width: Math.min(MAX_FRAME_WIDTH, Math.max(MIN_FRAME_WIDTH, s.width + delta)),
    }));
  }

  /* ---------------------------------------------------------------------- */

  const recalcScale = useCallback(() => {
    const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 1024;
    const padding = isMobileScreen ? 8 : VIEWPORT_PADDING;

    if (isDesktop) {
      const viewportWidth = desktopScrollRef.current?.clientWidth ?? DEFAULT_DESKTOP_WIDTH;
      const availableWidth = viewportWidth - padding * 2;
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
      padding,
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
      blocks,
      site,
      onSelectElement,
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

  useLayoutEffect(() => {
    if (contentRef.current) {
      tagAndApplyPreviewStyles(
        contentRef.current,
        blocks,
        selectedElementId,
        site.previewEdits,
        device,
        effectiveBreakpoint,
      );
    }

    const iframeDoc = responsiveFrameRef.current?.contentDocument;
    if (iframeDoc?.body) {
      iframeDoc.body.style.setProperty("--preview-editor-accent", theme.accent);
      iframeDoc.documentElement.style.setProperty("--preview-editor-accent", theme.accent);
      tagAndApplyPreviewStyles(
        iframeDoc.body,
        blocks,
        selectedElementId,
        site.previewEdits,
        device,
        effectiveBreakpoint,
      );
    }
  }, [
    blocks,
    contentRef,
    selectedElementId,
    site.previewEdits,
    device,
    theme.accent,
    previewKey,
    effectiveBreakpoint,
  ]);

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

  // Intercept global window.scrollTo calls made by preview components (e.g. footer scroll-to-top buttons)
  // so they scroll the preview container instead of the outer host application window.
  useEffect(() => {
    const originalScrollTo = window.scrollTo;

    const mockScrollTo = function (...args: any[]) {
      if (isDesktop && desktopScrollRef.current) {
        desktopScrollRef.current.scrollTo(...(args as [any]));
      } else if (!isDesktop && responsiveFrameRef.current?.contentWindow) {
        responsiveFrameRef.current.contentWindow.scrollTo(...(args as [any]));
      } else {
        originalScrollTo.apply(window, args as any);
      }
    };

    window.scrollTo = mockScrollTo as typeof window.scrollTo;

    return () => {
      window.scrollTo = originalScrollTo;
    };
  }, [isDesktop]);

  function handlePreviewClick(e: React.MouseEvent) {
    handlePreviewNavigationClick({
      event: e,
      isDesktop,
      contentRef,
      desktopScrollRef,
      responsiveFrameRef,
    });

    if (!editMode) return;
    handleInteractivePreviewClick(e, editMode, blocks, site, onSelectElement);
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

  const handleResponsiveDocumentReady = useCallback(
    (body: HTMLElement) => {
      const doc = body.ownerDocument;

      let styleEl = doc.getElementById("iframe-editor-styles");
      if (!styleEl) {
        styleEl = doc.createElement("style");
        styleEl.id = "iframe-editor-styles";
        doc.head.appendChild(styleEl);
      }

      styleEl.textContent = buildResponsiveEditorStyles(theme.accent);

      body.style.backgroundColor = bg;
      doc.documentElement.style.backgroundColor = bg;
      body.style.setProperty("--preview-editor-accent", theme.accent);
      doc.documentElement.style.setProperty("--preview-editor-accent", theme.accent);
      tagAndApplyPreviewStyles(body, blocks, selectedElementId, site.previewEdits, device, effectiveBreakpoint);
      requestAnimationFrame(() => {
        if (body.isConnected) {
          tagAndApplyPreviewStyles(body, blocks, selectedElementId, site.previewEdits, device, effectiveBreakpoint);
        }
      });

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
            blocks,
            site,
            onSelectElement,
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
      effectiveBreakpoint,
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

  async function handleToggleMoveModeClick() {
    const wasMove = moveMode;
    await handleToggleMoveMode(moveMode, setMoveMode, setEditMode, confirm);
    if (!wasMove) {
      setEditMode(true);
      const container = contentRef.current || responsiveFrameRef.current?.contentDocument?.body;
      selectFirstEditableElement(sorted, site, container, activeSection, onSelectElement);
    }
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

  useEffect(() => {
    onControlsReady?.({
      moveMode,
      editMode,
      toggleMoveMode: handleToggleMoveModeClick,
      toggleResponsiveEdit: handleToggleResponsiveEdit,
      toggleEditMode: handleToggleEditMode,
    });
  }, [
    moveMode,
    editMode,
    responsiveEditMode,
    onControlsReady,
  ]);

  function handleRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setPreviewKey((k) => k + 1);
      setIsRefreshing(false);
    }, 1500);
  }

  const handleBlendBlock = (blockId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const patch = blendBlockWithNeighbors(
      blockId,
      blocks,
      theme,
      site,
      contentRef.current,
    );
    onUpdateBlock(blockId, patch);
  };

  const previewContent = (
    <div
      ref={contentRef}
      className={`relative min-h-full w-full max-w-full overflow-x-hidden preview-edit-canvas ${editMode ? "edit-active" : ""
        } ${moveMode ? "move-active" : ""}`}
      style={{ background: bg, color: ink }}
      onClick={handlePreviewClick}
      onMouseDown={handleContentMouseDown}
      onMouseMove={handlePreviewMouseMove}
      onMouseLeave={handlePreviewMouseLeave}
    >
      <div key={previewKey} className="min-h-full w-full">
        {isRefreshing ? (
          <PreviewLoadingState bg={bg} ink={ink} />
        ) : (
          <>
            {sorted.map((block) => (
              <PreviewBlock
                key={block.id}
                block={block}
                blocks={blocks}
                site={site}
                theme={theme}
                ink={ink}
                editMode={editMode}
                moveMode={moveMode}
                isDesktop={isDesktop}
                isActive={!editMode && activeSection === block.props.kind && block.props.kind !== "navbar"}
                isResizingThis={resizingBlock?.id === block.id}
                draggingElementId={draggingElementId}
                dragGuides={dragGuides}
                onReorderBlocks={onReorderBlocks}
                onUpdateBlock={onUpdateBlock}
                onStartBlockResize={handleStartBlockResize}
                onBlendBlock={handleBlendBlock}
              />
            ))}

            {!sorted.some((b) => b.props.kind === "footer") && (
              <div
                data-preview-chrome
                className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between"
                style={{ borderTop: `1px solid ${ink}10`, color: `${ink}40` }}
              >
                <span>© 2026 {site.category || "Portfolio"}</span>
                <span>
                  Built with <span style={{ color: theme.accent }}>Portflu</span>
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <GuideOverlay guides={dragGuides} />
    </div>
  );

  return (
    <main className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden shadow-sm">
      {/* Desktop Top Header: spacious padding, preserved controls */}
      <div className="hidden lg:flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6 gap-6 overflow-x-auto no-scrollbar">
        {/* Left side: Theme color circles without text */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeCircleRow
            theme={theme}
            site={site}
            onThemeChange={onThemeChange}
            showLabels={false}
          />
        </div>

        {/* Right side: Device, edit, and window controls */}
        <div className="flex shrink-0 items-center gap-2 pr-1">
          {responsiveEditMode && (
            <span className="select-none rounded-full bg-accent/15 text-accent px-2.5 py-0.5 text-[10px] font-semibold capitalize">
              Editing: {effectiveBreakpoint}
            </span>
          )}

          {!isDesktop && (
            <div className="flex items-center gap-1">
              <span className="select-none text-[10px] tabular-nums text-ink-soft/70">
                {Math.round(width)}×{Math.round(height)}
                {scale < 0.999 && ` · ${Math.round(scale * 100)}%`}
              </span>
              {responsiveEditMode && (
                <div className="flex items-center gap-0.5 ml-0.5">
                  <button
                    onClick={() => bumpWidth(-20)}
                    className="grid h-5 w-5 cursor-pointer place-items-center rounded text-ink-soft hover:bg-secondary hover:text-ink"
                    title="Decrease width"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => bumpWidth(20)}
                    className="grid h-5 w-5 cursor-pointer place-items-center rounded text-ink-soft hover:bg-secondary hover:text-ink"
                    title="Increase width"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {responsiveEditMode ? (
            <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5">
              <button
                onClick={() => handlePickBreakpoint("desktop")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-all ${effectiveBreakpoint === "desktop"
                  ? "bg-foreground text-background"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Edit Desktop styles"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePickBreakpoint("tablet")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-all ${effectiveBreakpoint === "tablet"
                  ? "bg-foreground text-background"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Edit Tablet styles"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => handlePickBreakpoint("mobile")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-md transition-all ${effectiveBreakpoint === "mobile"
                  ? "bg-foreground text-background"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Edit Mobile styles"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          ) : (
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
          )}

          <button
            onClick={handleToggleResponsiveEdit}
            className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full border transition-all ${responsiveEditMode
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-background text-ink-soft hover:bg-secondary hover:text-ink"
              }`}
            title={responsiveEditMode ? "Turn off Responsive Editing" : "Edit styles per screen size"}
            aria-label={responsiveEditMode ? "Turn off Responsive Editing" : "Edit styles per screen size"}
          >
            <MonitorSmartphone className="h-4 w-4" />
          </button>

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

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh preview to replay animations"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>

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

      {/* Mobile Top Header: Hamburger left, mode toggles + device center, Close right */}
      {/* Mobile Top Header — cleaner spacing, segmented pill groups, better touch targets */}
      <div className="flex lg:hidden h-14 shrink-0 items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-3 gap-2">
        {/* Left: Hamburger */}
        <button
          onClick={onOpenMobileMenu}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:bg-secondary hover:text-ink active:scale-95"
          title="Menu"
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Center: Mode toggles + Device controls, grouped as pills with a divider */}
        <div className="flex flex-1 items-center justify-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* Mode toggles: Edit, Move, Responsive */}
          <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 shrink-0">
            <button
              onClick={handleToggleEditMode}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${editMode
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
                }`}
              title={editMode ? "Exit Edit" : "Edit"}
              aria-label={editMode ? "Exit Edit" : "Edit"}
            >
              <PencilLine className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleToggleMoveModeClick}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${moveMode
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
                }`}
              title={moveMode ? "Stop Moving" : "Move"}
              aria-label={moveMode ? "Stop Moving" : "Move"}
            >
              <Move className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleToggleResponsiveEdit}
              className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${responsiveEditMode
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:bg-secondary hover:text-ink"
                }`}
              title={responsiveEditMode ? "Responsive Off" : "Responsive"}
              aria-label={responsiveEditMode ? "Responsive Off" : "Responsive"}
            >
              <MonitorSmartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="h-5 w-px bg-border shrink-0" />

          {/* Device / breakpoint controls */}
          {responsiveEditMode ? (
            <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 shrink-0">
              <button
                onClick={() => handlePickBreakpoint("desktop")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${effectiveBreakpoint === "desktop"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Desktop"
                aria-label="Desktop"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handlePickBreakpoint("tablet")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${effectiveBreakpoint === "tablet"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Tablet"
                aria-label="Tablet"
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => handlePickBreakpoint("mobile")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${effectiveBreakpoint === "mobile"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Mobile"
                aria-label="Mobile"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5 shrink-0">
              <button
                onClick={() => onDeviceChange("desktop")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${isDesktop
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Desktop"
                aria-label="Desktop"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onDeviceChange("responsive")}
                className={`grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-all active:scale-95 ${!isDesktop
                  ? "bg-foreground text-background shadow-sm"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
                  }`}
                title="Responsive"
                aria-label="Responsive"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Close */}
        <button
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-surface text-ink-soft transition-colors hover:bg-secondary hover:text-ink active:scale-95"
          title="Close"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {isDesktop ? (
        <div
          ref={desktopScrollRef}
          data-lenis-prevent="true"
          className="simple-scrollbar flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-2 sm:p-4 md:p-6"
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
          data-lenis-prevent="true"
          className="flex-1 min-h-0 overflow-hidden flex items-center justify-center select-none p-1 sm:p-3"
          onWheel={(e) => {
            const win = responsiveFrameRef.current?.contentWindow;
            if (win) {
              win.scrollBy({
                top: e.deltaY,
                left: 0,
                behavior: "auto",
              });
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
              isDragging={isDragging || !!confirmState?.open}
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

      {/* Floating Save button in absolute screen free space on mobile */}
      {onSave && (
        <button
          onClick={canSave ? handleSaveClick : undefined}
          disabled={!canSave}
          className={`lg:hidden fixed bottom-6 right-6 z-30 flex h-11 items-center gap-2 rounded-full px-4 text-xs font-semibold shadow-2xl transition-all cursor-pointer ${canSave
            ? "bg-foreground text-background hover:scale-105 active:scale-95 ring-2 ring-primary/40"
            : "cursor-not-allowed bg-foreground/20 text-ink-soft/70 backdrop-blur-md"
            }`}
          title={
            canSave
              ? "Save changes"
              : `Make ${REQUIRED_CHANGES - changesMade} more change${REQUIRED_CHANGES - changesMade === 1 ? "" : "s"
              } to enable saving`
          }
        >
          <Save className="h-4 w-4" />
          <span>Save{changesMade < REQUIRED_CHANGES ? ` (${changesMade}/${REQUIRED_CHANGES})` : ""}</span>
        </button>
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
        }
        .preview-edit-canvas.move-active .preview-edit-hovered:not(.preview-edit-selected) {
          outline: 2px dashed ${theme.accent}dd !important;
          outline-offset: 4px !important;
          cursor: move !important;
        }
        .preview-edit-canvas.edit-active .preview-edit-selected,
        .preview-edit-selected {
          outline: 2px solid ${theme.accent} !important;
          outline-offset: 3px !important;
          box-shadow: 0 0 0 4px ${theme.accent}33 !important;
          z-index: 35 !important;
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
