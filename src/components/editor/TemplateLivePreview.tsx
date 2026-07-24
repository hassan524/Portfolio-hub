import { useEffect, useRef, useState, useCallback } from "react";
import { Maximize2, Minimize2, Monitor, Smartphone, X } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData } from "@/types/builder.schema";

type Device = "desktop" | "responsive";

const MIN_WIDTH = 280;
const MAX_WIDTH = 1400;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 1400;
const VIEWPORT_PADDING = 40; // breathing room kept on every side when auto-scaling

// Responsive mode always starts at mobile size — drag any handle to grow
// it out toward tablet/desktop widths. No more separate tablet preset to
// get out of sync.
const DEFAULT_RESPONSIVE_WIDTH = 390;
const DEFAULT_RESPONSIVE_HEIGHT = 844;

export function TemplateLivePreview({
  site,
  device,
  activeSection,
  onDeviceChange,
  onUpdateBlock,
  isMaximized,
  onToggleMaximize,
  onClose,
}: {
  site: SiteData;
  device: Device;
  activeSection: string;
  onDeviceChange: (device: Device) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  onClose: () => void;
}) {
  const { theme, blocks } = site;
  const bg = theme.bg;
  const ink = theme.ink;
  const frameRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<{
    edge: "left" | "right" | "bottom" | "corner";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startScale: number;
  } | null>(null);

  const isDesktop = device === "desktop";

  const [size, setSize] = useState({
    width: DEFAULT_RESPONSIVE_WIDTH,
    height: DEFAULT_RESPONSIVE_HEIGHT,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);

  // Reset to the default mobile-sized frame every time you switch back
  // into responsive mode, and reset scroll position.
  useEffect(() => {
    if (!isDesktop) {
      setSize({ width: DEFAULT_RESPONSIVE_WIDTH, height: DEFAULT_RESPONSIVE_HEIGHT });
    }
    frameRef.current?.scrollTo({ top: 0, left: 0 });
  }, [isDesktop]);

  const { width, height } = size;

  // Auto-scale ("zoom out") so the frame always fits inside the visible
  // canvas with padding, no matter how big you drag it — this is what
  // stops the dialog itself from ever needing a scrollbar.
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

  const content = (
    <div className="min-h-full w-full" style={{ background: bg, color: ink }}>
      {sorted.map((block) => {
        const variant = (block.props as { variant?: string }).variant;
        const Cmp = getBlockComponent(block.props.kind, variant);
        if (!Cmp) return null;
        return (
          <div
            key={block.id}
            className={
              activeSection === block.props.kind ? "outline outline-2 outline-offset-[-2px]" : ""
            }
            style={activeSection === block.props.kind ? { outlineColor: theme.accent } : undefined}
          >
            <Cmp
              id={block.id}
              props={block.props}
              theme={theme}
              onChange={(patch: Record<string, unknown>) => onUpdateBlock(block.id, patch)}
            />
          </div>
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
      <div className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-3">
        <span className="text-xs font-medium text-ink-soft truncate">Website editor</span>

        <div className="flex items-center gap-2">
          {!isDesktop && (
            <span className="text-[10px] tabular-nums text-ink-soft/70 select-none">
              {Math.round(width)}×{Math.round(height)}
              {scale < 0.999 && ` · ${Math.round(scale * 100)}%`}
            </span>
          )}

          <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5">
            <button
              onClick={() => onDeviceChange("desktop")}
              className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                isDesktop
                  ? "bg-foreground text-background"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
              }`}
              title="Desktop"
              aria-label="Desktop"
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onDeviceChange("responsive")}
              className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                !isDesktop
                  ? "bg-foreground text-background"
                  : "text-ink-soft hover:bg-secondary hover:text-ink"
              }`}
              title="Responsive — drag edges to resize"
              aria-label="Responsive"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="h-5 w-px bg-border" />

          <button
            onClick={onToggleMaximize}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-soft hover:bg-secondary hover:text-ink transition-colors"
            aria-label={isMaximized ? "Exit full screen" : "Maximize preview editor"}
            title={isMaximized ? "Exit full screen" : "Maximize"}
          >
            {isMaximized ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-soft hover:bg-secondary hover:text-ink transition-colors"
            aria-label="Close preview editor"
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
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
          <div className="relative shrink-0" style={{ width: width * scale, height: height * scale }}>
            <div
              ref={frameRef}
              className={`no-scrollbar absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden border border-border bg-background shadow-lift ${
                isDragging ? "" : "transition-transform duration-200"
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
                <path d="M9 1L1 9M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}