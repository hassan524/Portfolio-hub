import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  GripVertical,
  Plus,
  PencilLine,
  ImageUp,
  X,
  Loader2,
  LayoutGrid,
  Type,
  Image as ImageIcon,
  Files,
  Sparkles,
} from "lucide-react";

import type { Block, SiteData, Theme } from "@/types/builder.schema";

import { getBlockComponent } from "@/lib/blockRegistry";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";

import {
  handleAddBlock as handleAddBlockFn,
  moveSidebarBlock,
  handleBlockHeightChange,
  handleArrayItemChange,
} from "@/lib/functions/template";

import { uploadSiteLogo } from "@/lib/uploadLogo";
import { IMAGE_OVERRIDES_PROP, getImageOverrides } from "@/lib/imageOverrideUtils";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";
import { TextOverrideProvider } from "@/components/editor/ui/Editable";
import { useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { ConfirmationDialog } from "@/components/common/ConfirmationDialog";
import type { ConfirmationCopy, ConfirmationType } from "@/lib/functions/template";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeCircle } from "./ThemeColorPicker";

export type EditorControls = {
  moveMode: boolean;
  editMode: boolean;
  toggleMoveMode: () => void;
  toggleResponsiveEdit: () => void;
  toggleEditMode: () => void;
};

type ConfirmOptions = Partial<ConfirmationCopy> & { type?: ConfirmationType };

type Props = {
  site: SiteData;
  theme: Theme;
  activeSection: string;
  onSectionChange: (id: string) => void;
  onThemeChange: (patch: Partial<Theme>) => void;
  onSiteMetaChange: (
    patch: Partial<Pick<SiteData, "category" | "logo" | "name">>,
  ) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onReorderBlocks: (blocks: Block[]) => void;
  onSave?: (site: SiteData) => void;
  onMobileClose?: () => void;
  editorControls?: EditorControls | null;
  responsiveEditMode?: boolean;
};

export function TemplateSidebar({
  site,
  theme,
  activeSection,
  onSectionChange,
  onSiteMetaChange,
  onUpdateBlock,
  onReorderBlocks,
  onMobileClose,
}: Props) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [siteName, setSiteName] = useState(site.name || site.category || "Portfolio");
  useEffect(() => {
    setSiteName(site.name || site.category || "Portfolio");
  }, [site.name, site.category]);

  const commitNameChange = () => {
    setIsEditingName(false);
    const trimmed = siteName.trim() || site.category || "Portfolio";
    setSiteName(trimmed);
    onSiteMetaChange({ name: trimmed });
  };

  const sortedBlocks = useMemo(
    () => [...site.blocks].sort((a, b) => a.order - b.order),
    [site.blocks],
  );

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

  async function handleAddBlock() {
    const ok = await confirm({
      title: "Add a new block?",
      description: "A new block will be added to the end of your layout. You can rename, restyle, or reorder it anytime.",
      confirmLabel: "Add Block",
      cancelLabel: "Cancel",
    });
    if (!ok) return;

    handleAddBlockFn(sortedBlocks, theme, (nextBlocks) => {
      const patched = nextBlocks.map((nb) => {
        const existed = sortedBlocks.some((b) => b.id === nb.id);
        if (existed) return nb;
        const isSpacerDefault = (nb.label ?? "").toLowerCase() === "spacer";
        return isSpacerDefault ? { ...nb, label: "New Block" } : nb;
      });
      onReorderBlocks(patched);
    });
  }

  function rgbStringToHex(rgb: string): string | null {
    const match = rgb.match(/\d+(\.\d+)?/g);
    if (!match || match.length < 3) return null;
    const [r, g, b] = match.map(Number);
    if ([r, g, b].some((n) => Number.isNaN(n))) return null;
    return `#${[r, g, b]
      .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0"))
      .join("")}`;
  }

  return (
    <>
      <aside className="w-full shrink-0 border-r border-zinc-800 bg-zinc-950 text-sm flex flex-col h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Header: Project Identity */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 shrink-0 bg-zinc-950 shadow-xs">
          <div className="flex items-center gap-3">
            <LogoUploader
              logo={site.logo ?? null}
              onChange={(url) => onSiteMetaChange({ logo: url })}
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              {isEditingName ? (
                <input
                  type="text"
                  autoFocus
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  onBlur={commitNameChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitNameChange();
                    if (e.key === "Escape") {
                      setIsEditingName(false);
                      setSiteName(site.name || site.category || "Portfolio");
                    }
                  }}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-sm font-semibold text-white outline-none focus:border-zinc-500 transition-all"
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  title="Click to rename website"
                  className="group flex items-center justify-between gap-1.5 cursor-pointer rounded-lg px-2 py-1 -mx-2 hover:bg-zinc-900/80 transition-colors"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate font-display text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                      {site.name || site.category || "Portfolio"}
                    </span>
                    <span className="truncate text-[10px] text-zinc-400 capitalize">
                      {site.category || "Portfolio"} · Click to edit
                    </span>
                  </div>
                  <PencilLine className="h-3 w-3 shrink-0 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300 transition-opacity" />
                </div>
              )}
            </div>
            {onMobileClose && (
              <button
                onClick={onMobileClose}
                className="lg:hidden grid h-8 w-8 shrink-0 place-items-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <Tabs defaultValue="blocks" className="flex min-h-0 flex-1 flex-col gap-0">
          <div className="px-3 py-2.5 shrink-0 border-b border-zinc-800 bg-zinc-950">
            <TabsList className="w-full h-9 grid grid-cols-4 gap-1 rounded-xl bg-zinc-900 border border-zinc-800 p-1">
              <TabsTrigger
                value="blocks"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <LayoutGrid className="h-3 w-3" />
                Blocks
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <Type className="h-3 w-3" />
                Text
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <ImageIcon className="h-3 w-3" />
                Images
              </TabsTrigger>
              <TabsTrigger
                value="pages"
                className="relative cursor-pointer flex items-center justify-center gap-1.5 rounded-lg text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <Files className="h-3 w-3" />
                Pages
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 simple-scrollbar bg-zinc-950">
            <TabsContent value="blocks" className="mt-0 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <SectionLabel>Layout Blocks</SectionLabel>
                  <button
                    type="button"
                    onClick={handleAddBlock}
                    className="flex items-center gap-1 rounded-lg bg-zinc-900 border border-zinc-700 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3 w-3" />
                    Add
                  </button>
                </div>
                <BlocksList
                  blocks={sortedBlocks}
                  theme={theme}
                  activeSection={activeSection}
                  onSectionChange={onSectionChange}
                  onReorderBlocks={onReorderBlocks}
                  onUpdateBlock={onUpdateBlock}
                />
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-0">
              <div className="space-y-4">
                {/* <SectionLabel>Text Content</SectionLabel>  */}
                <TextPanel
                  blocks={sortedBlocks}
                  site={site}
                  onUpdateBlock={onUpdateBlock}
                  onSectionChange={onSectionChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="images" className="mt-0">
              <div className="space-y-4">
                <SectionLabel>Images</SectionLabel>
                <ImagesPanel
                  blocks={sortedBlocks}
                  theme={theme}
                  site={site}
                  onUpdateBlock={onUpdateBlock}
                  onSiteMetaChange={onSiteMetaChange}
                  onSectionChange={onSectionChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="pages" className="mt-0 h-full">
              <PagesComingSoon />
            </TabsContent>
          </div>
        </Tabs>
      </aside>

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
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Pages tab — coming soon empty state                              */
/* ---------------------------------------------------------------- */

function PagesComingSoon() {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/60 border border-border/50 shadow-sm">
        <Files className="h-5 w-5 text-ink-soft" />
        <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-foreground text-background shadow-md">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="text-sm font-semibold text-foreground">Multi-page Sites</div>
        <div className="text-xs leading-relaxed text-ink-soft max-w-[200px] mx-auto">
          Adding and managing extra pages for your site is coming soon.
        </div>
      </div>
      <span className="rounded-full bg-secondary/80 border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
        Coming soon
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Logo uploader                                                    */
/* ---------------------------------------------------------------- */

function LogoUploader({
  logo,
  onChange,
}: {
  logo: string | null;
  onChange: (url: string | null) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setIsUploading(true);
    try {
      const url = await uploadSiteLogo(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logo upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  

  return (
    <div className="group relative shrink-0">
      <label
        title="Upload Site Logo"
        className={`relative flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-xl border transition-all ${logo
          ? "border-transparent bg-background shadow-sm"
          : "border-dashed border-border bg-secondary/30 hover:border-foreground/30 hover:bg-secondary/60"
          }`}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-soft" />
        ) : logo ? (
          <img src={logo} alt="Site logo" className="h-full w-full object-contain p-1" />
        ) : (
          <ImageUp className="h-4 w-4 text-ink-soft" />
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </label>

      {logo && !isUploading && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-background border border-border shadow-sm group-hover:flex text-ink-soft hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-colors z-10"
          title="Remove logo"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground mb-1">
      {children}
    </div>
  );
}

function rgbStringToHex(rgb: string): string | null {
  const match = rgb.match(/\d+(\.\d+)?/g);
  if (!match || match.length < 3) return null;
  const [r, g, b] = match.map(Number);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `#${[r, g, b]
    .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0"))
    .join("")}`;
}

function findVisibleBackgroundColor(root: HTMLElement | null): string | null {
  if (!root) return null;
  const queue: HTMLElement[] = [root];

  while (queue.length) {
    const node = queue.shift()!;
    // skip editor chrome (resize handles, labels, blend button, etc.)
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

function findBlockElement(blockId: string): HTMLElement | null {
  const el = document.querySelector<HTMLElement>(`[data-block-id="${blockId}"]`);
  if (el) return el;
  const iframe = document.querySelector<HTMLIFrameElement>("iframe");
  return iframe?.contentDocument?.querySelector<HTMLElement>(`[data-block-id="${blockId}"]`) ?? null;
}

function useLiveBlockBg(blockId: string, active: boolean, fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!active) {
      setColor(fallback);
      return;
    }
    const el = findBlockElement(blockId);
    const hex = findVisibleBackgroundColor(el);
    setColor(hex ?? fallback);
  }, [active, blockId, fallback]);

  return color;
}

function useLiveBlockHeight(blockId: string, active: boolean): number | null {
  const [liveHeight, setLiveHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const measure = () => {
      const el = findBlockElement(blockId);
      if (el) {
        const rect = el.getBoundingClientRect();
        const h = Math.round(rect.height || el.offsetHeight);
        if (h > 0) setLiveHeight(h);
      }
    };
    measure();
    const timer = setTimeout(measure, 100);
    return () => clearTimeout(timer);
  }, [active, blockId]);

  return liveHeight;
}

function BlocksList({
  blocks,
  theme,
  activeSection,
  onSectionChange,
  onReorderBlocks,
  onUpdateBlock,
}: {
  blocks: Block[];
  theme: Theme;
  activeSection: string;
  onSectionChange: (id: string) => void;
  onReorderBlocks: (blocks: Block[]) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
}) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function moveBlock(targetId: string) {
    moveSidebarBlock(draggedId, targetId, blocks, onReorderBlocks);
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <BlockRow
          key={block.id}
          block={block}
          index={index}
          blocks={blocks}
          theme={theme}
          active={activeSection === block.props.kind}
          isDragging={draggedId === block.id}
          isExpanded={expandedId === block.id}
          onExpandToggle={() => setExpandedId(expandedId === block.id ? null : block.id)}
          onSectionChange={onSectionChange}
          onUpdateBlock={onUpdateBlock}
          onDragStart={() => setDraggedId(block.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => moveBlock(block.id)}
          onDragEnd={() => setDraggedId(null)}
        />
      ))}
    </div>
  );
}

function BlockRow({
  block,
  index,
  blocks,
  theme,
  active,
  isDragging,
  isExpanded,
  onExpandToggle,
  onSectionChange,
  onUpdateBlock,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: {
  block: Block;
  index: number;
  blocks: Block[];
  theme: Theme;
  active: boolean;
  isDragging: boolean;
  isExpanded: boolean;
  onExpandToggle: () => void;
  onSectionChange: (id: string) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onDragEnd: () => void;
}) {
  const storedHeight = block.height;
  const liveHeight = useLiveBlockHeight(block.id, isExpanded);
  const storedBgColor = (block as { bgColor?: string }).bgColor;
  const liveBg = useLiveBlockBg(block.id, isExpanded && !storedBgColor, theme.bg);
  const bgColor = storedBgColor ?? liveBg;

  const [heightInput, setHeightInput] = useState<string>(
    typeof storedHeight === "number" ? String(storedHeight) : (liveHeight ? String(liveHeight) : "")
  );

  useEffect(() => {
    if (typeof storedHeight === "number") {
      setHeightInput(String(storedHeight));
    } else if (liveHeight) {
      setHeightInput(String(liveHeight));
    } else {
      setHeightInput("");
    }
  }, [storedHeight, liveHeight]);

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHeightInput(val);
    handleBlockHeightChange(block.id, val, onUpdateBlock);
  };

  const displayName = block.label ?? block.name ?? block.props.kind;
  const isNewBlock = Boolean(
    block.isCustom ||
    (block as Record<string, unknown>).isNew ||
    (block.props as { isCustom?: boolean })?.isCustom ||
    block.props?.kind === "spacer",
  );

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  return (
    <div>
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        className={`group relative flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs transition-all cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40 border-dashed border-primary scale-[0.98]" : ""
          } ${active
            ? "border-primary bg-primary/10 text-white shadow-md ring-1 ring-primary/40"
            : "border-white/10 bg-zinc-900/40 hover:border-primary/40 hover:bg-zinc-900/70 text-zinc-300 shadow-xs"
          }`}
      >
        <div className="flex items-center justify-center shrink-0">
          <GripVertical className={`h-3.5 w-3.5 transition-opacity ${active ? "opacity-90 text-primary" : "opacity-0 group-hover:opacity-40 text-muted-foreground"}`} />
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <span
            className={`shrink-0 font-mono text-[10px] w-3 text-right ${active ? "text-primary font-bold" : "text-muted-foreground"}`}
          >
            {index + 1}.
          </span>
          <input
            type="text"
            value={displayName}
            draggable={false}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onSectionChange(block.props.kind);
            }}
            onChange={(e) => onUpdateBlock(block.id, { label: e.target.value })}
            className={`w-full bg-transparent font-medium capitalize outline-none cursor-text truncate text-[11px] focus:ring-1 rounded px-1 py-0.5 transition-all ${active ? "text-foreground font-semibold focus:ring-primary/40" : "text-foreground focus:ring-primary/40 hover:bg-secondary/80"
              }`}
            title="Rename section"
          />
        </div>

        {isNewBlock && (
          <button
            type="button"
            draggable={false}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              const patch = blendBlockWithNeighbors(block.id, blocks, theme);
              onUpdateBlock(block.id, patch);
            }}
            className={`relative z-10 p-1.5 rounded-lg transition-colors shrink-0 ${active
              ? "hover:bg-primary/20 text-primary"
              : "hover:bg-accent text-muted-foreground hover:text-foreground"
              }`}
            title="Blend style dynamically"
          >
            <PencilLine className="h-3 w-3" />
          </button>
        )}

        <button
          type="button"
          draggable={false}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onExpandToggle();
          }}
          className={`relative z-10 p-1.5 rounded-lg transition-colors shrink-0 ${active
            ? "hover:bg-primary/20 text-primary"
            : "hover:bg-accent text-muted-foreground hover:text-foreground"
            }`}
          title={isExpanded ? "Hide block settings" : "Show block settings"}
          aria-label={isExpanded ? "Hide block settings" : "Show block settings"}
          aria-expanded={isExpanded}
        >
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {isExpanded && (
        <div className="flex items-center justify-between gap-3 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase select-none">BG</span>
            <ThemeCircle
              label={`${displayName} Background`}
              shortLabel="BG"
              value={bgColor || theme.bg || "#000000"}
              isOpen={isColorPickerOpen}
              onOpenChange={setIsColorPickerOpen}
              onChange={(color) => onUpdateBlock(block.id, { bgColor: color })}
              showLabel={false}
            />
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-xs transition-colors focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/40">
            <span className="text-[10px] font-medium text-muted-foreground uppercase select-none">H</span>
            <input
              type="number"
              min={0}
              max={2500}
              value={heightInput}
              placeholder={liveHeight ? `${liveHeight}` : "auto"}
              onChange={handleHeightInputChange}
              className="w-14 bg-transparent text-[11px] font-mono outline-none text-foreground text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[10px] font-mono text-muted-foreground select-none">px</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TextPanel({
  blocks,
  site,
  onUpdateBlock,
  onSectionChange,
}: {
  blocks: Block[];
  site: SiteData;
  onUpdateBlock: Props["onUpdateBlock"];
  onSectionChange: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <RenderedTextBlock
          key={block.id}
          block={block}
          site={site}
          onUpdateBlock={onUpdateBlock}
          onSectionChange={onSectionChange}
        />
      ))}
    </div>
  );
}

function RenderedTextBlock({
  block,
  site,
  onUpdateBlock,
  onSectionChange,
}: {
  block: Block;
  site: SiteData;
  onUpdateBlock: Props["onUpdateBlock"];
  onSectionChange: (id: string) => void;
}) {
  const probeRef = useRef<HTMLDivElement>(null);
  const [textEntries, setTextEntries] = useState<{ index: string; text: string }[]>([]);
  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  const componentProps =
    block.props.kind === "navbar" || block.props.kind === "footer"
      ? { ...block.props, logo: site.logo }
      : block.props;
  const overrides = ((block.props as Record<string, unknown>)._textOverrides ?? {}) as Record<
    string,
    string
  >;

  useEffect(() => {
    const root = probeRef.current;
    if (!root) return;
    const entries = Array.from(root.querySelectorAll<HTMLElement>("[data-editable][data-text-index]"))
      .map((element) => ({
        index: element.dataset.textIndex ?? "",
        text: element.innerText.trim(),
      }));
    setTextEntries(entries);
  }, [block.props, Cmp, site.logo]);

  if (!Cmp) return null;

  function updateText(index: string, text: string) {
    onUpdateBlock(block.id, {
      _textOverrides: { ...overrides, [index]: text },
    });
  }

  return (
    <div className="space-y-3 border-b border-border/60 pb-4">
      <button
        type="button"
        onClick={() => onSectionChange(block.props.kind)}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-sm font-bold capitalize text-foreground transition-colors hover:text-ink-soft"
      >
        <span className="truncate">{block.label ?? block.name ?? block.props.kind}</span>
      </button>
      <div
        ref={probeRef}
        aria-hidden
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        <TextOverrideProvider overrides={overrides}>
          <Cmp id={block.id} props={componentProps} theme={site.theme} onChange={() => { }} />
        </TextOverrideProvider>
      </div>
      <div className="space-y-2">
        {textEntries.map((entry, position) => (
          <label key={`${block.id}-${entry.index}`} className="block space-y-1.5">
            <span className="pl-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft/80">
              Text {position + 1}
            </span>
            <textarea
              value={entry.text}
              rows={entry.text.length > 72 ? 3 : 1}
              onChange={(event) => updateText(entry.index, event.target.value)}
              className={compactInputClass}
            />
          </label>
        ))}
        {textEntries.length === 0 && (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-[10px] text-ink-soft">
            This block has no visible text.
          </p>
        )}
      </div>
    </div>
  );
}

function getEditableProps(props: Block["props"]): Record<string, unknown> {
  const defaults: Record<string, Record<string, unknown>> = {
    navbar: { logoText: "", links: [], ctaLabel: "" },
    hero: {
      eyebrow: "",
      name: "",
      tagline: "",
      bio: "",
      primaryCta: "",
      secondaryCta: "",
      location: "",
      availability: "",
    },
    projects: { eyebrow: "", heading: "", items: [] },
    about: { heading: "", paragraphs: [], skills: [], experience: [] },
    testimonials: { heading: "", items: [] },
    contact: { heading: "", message: "", socials: [] },
    footer: { heading: "", message: "", socials: [] },
    stats: { heading: "", items: [] },
    spacer: { backgroundColor: "" },
  };

  return { ...defaults[props.kind], ...props };
}

/* ---------------------------------------------------------------- */
/* Images tab                                                       */
/* ---------------------------------------------------------------- */

type ImagePath = (string | number)[];

function ImagesPanel({
  blocks,
  theme,
  site,
  onUpdateBlock,
  onSiteMetaChange,
  onSectionChange,
}: {
  blocks: Block[];
  theme: Theme;
  site: SiteData;
  onUpdateBlock: Props["onUpdateBlock"];
  onSiteMetaChange: Props["onSiteMetaChange"];
  onSectionChange: (id: string) => void;
}) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => (
        <BlockImagesEntry
          key={block.id}
          block={block}
          theme={theme}
          site={site}
          onUpdateBlock={onUpdateBlock}
          onSiteMetaChange={onSiteMetaChange}
          onSectionChange={onSectionChange}
        />
      ))}
    </div>
  );
}

function isImageUrl(val: string): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim();
  if (!s || s.length < 4) return false;
  if (s.startsWith("data:image/")) return true;
  if (s.startsWith("blob:")) return true;
  if (/^https?:\/\//i.test(s) || s.startsWith("/")) {
    if (/\.(png|jpe?g|webp|svg|gif|avif|ico|bmp)(\?.*)?$/i.test(s)) return true;
    if (
      s.includes("images.unsplash.com") ||
      s.includes("unsplash.com") ||
      s.includes("cloudinary.com") ||
      s.includes("supabase.co/storage") ||
      s.includes("/site-assets/") ||
      s.includes("/logos/")
    ) return true;
  }
  return false;
}

function extractImageUrlsFromProps(
  obj: unknown,
  path: ImagePath = [],
  found: { url: string; path: ImagePath }[] = [],
): { url: string; path: ImagePath }[] {
  if (typeof obj === "string") {
    if (isImageUrl(obj)) {
      found.push({ url: obj, path });
    }
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

function BlockImagesEntry({
  block,
  theme,
  site,
  onUpdateBlock,
  onSiteMetaChange,
  onSectionChange,
}: {
  block: Block;
  theme: Theme;
  site: SiteData;
  onUpdateBlock: Props["onUpdateBlock"];
  onSiteMetaChange: Props["onSiteMetaChange"];
  onSectionChange: (id: string) => void;
}) {
  const probeRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<
    { src: string; originalSrc: string; path: ImagePath | null; siteKey?: "logo" }[]
  >([]);

  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  const componentProps = useMemo(
    () =>
      block.props.kind === "navbar" || block.props.kind === "footer"
        ? { ...block.props, logo: site.logo }
        : block.props,
    [block.props, site.logo],
  );

  const discoverImages = () => {
    const foundMap = new Map<
      string,
      { src: string; originalSrc: string; path: ImagePath | null; siteKey?: "logo" }
    >();
    const pathBySrc = buildImagePathMap(componentProps);
    const overrides = getImageOverrides(componentProps as Record<string, unknown>);

    // Source A: Props extraction (recursively find all image URLs in componentProps)
    const propsImages = extractImageUrlsFromProps(componentProps);
    for (const item of propsImages) {
      const activeSrc = overrides[item.url] || item.url;
      foundMap.set(item.url, {
        src: activeSrc,
        originalSrc: item.url,
        siteKey: site.logo && item.url === site.logo ? ("logo" as const) : undefined,
        path: item.path,
      });
    }

    // Helper to scan a DOM root (probeRef or live block in preview)
    const scanDomRoot = (root: ParentNode | null) => {
      if (!root) return;

      // 1. <img> tags
      const imgEls = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
      imgEls.forEach((img) => {
        const currentSrc = img.getAttribute("src") || img.src || "";
        const originalSrc = img.dataset.originalSrc || currentSrc;
        if (!originalSrc) return;
        const activeSrc = overrides[originalSrc] || currentSrc || originalSrc;
        if (!foundMap.has(originalSrc)) {
          foundMap.set(originalSrc, {
            src: activeSrc,
            originalSrc,
            siteKey: site.logo && originalSrc === site.logo ? ("logo" as const) : undefined,
            path: pathBySrc.get(originalSrc) ?? pathBySrc.get(currentSrc) ?? null,
          });
        }
      });

      // 2. SVG <image> tags
      const svgImages = Array.from(root.querySelectorAll<SVGImageElement>("image"));
      svgImages.forEach((img) => {
        const href = img.getAttribute("href") || img.getAttribute("xlink:href") || "";
        if (!href) return;
        const activeSrc = overrides[href] || href;
        if (!foundMap.has(href)) {
          foundMap.set(href, {
            src: activeSrc,
            originalSrc: href,
            path: pathBySrc.get(href) ?? null,
          });
        }
      });

      // 3. Elements with background-image / url(...)
      const bgEls = Array.from(root.querySelectorAll<HTMLElement>("[style*='url('], [style*='background']"));
      bgEls.forEach((el) => {
        const bg = el.style.backgroundImage || el.style.background || "";
        const matches = bg.matchAll(/url\(\s*['"]?(.*?)['"]?\s*\)/gi);
        for (const match of matches) {
          const url = match[1];
          if (url && !url.startsWith("data:image/svg+xml")) {
            const activeSrc = overrides[url] || url;
            if (!foundMap.has(url)) {
              foundMap.set(url, {
                src: activeSrc,
                originalSrc: url,
                path: pathBySrc.get(url) ?? null,
              });
            }
          }
        }
      });
    };

    // Source B: Probe DOM
    scanDomRoot(probeRef.current);

    // Source C: Live Preview DOM
    try {
      const liveBlock = document.querySelector<HTMLElement>(`[data-block-id="${block.id}"]`);
      if (liveBlock) scanDomRoot(liveBlock);
    } catch {
      // ignore selector error if any
    }

    // Source D: If navbar/footer and site has logo, ensure logo is listed
    if (block.props.kind === "navbar" || block.props.kind === "footer") {
      if (site.logo && !foundMap.has(site.logo)) {
        foundMap.set(site.logo, {
          src: site.logo,
          originalSrc: site.logo,
          siteKey: "logo",
          path: null,
        });
      }
    }

    return Array.from(foundMap.values());
  };

  useEffect(() => {
    // Initial discovery
    const initial = discoverImages();
    if (initial.length > 0) {
      setImages((prev) => {
        const map = new Map(prev.map((img) => [img.originalSrc, img]));
        initial.forEach((img) => map.set(img.originalSrc, img));
        return Array.from(map.values());
      });
    }

    // Observe probe DOM mutations
    const probeEl = probeRef.current;
    let observer: MutationObserver | null = null;
    if (probeEl) {
      observer = new MutationObserver(() => {
        const found = discoverImages();
        setImages((prev) => {
          const map = new Map(prev.map((img) => [img.originalSrc, img]));
          let changed = false;
          found.forEach((img) => {
            if (!map.has(img.originalSrc) || map.get(img.originalSrc)?.src !== img.src) {
              map.set(img.originalSrc, img);
              changed = true;
            }
          });
          return changed ? Array.from(map.values()) : prev;
        });
      });
      observer.observe(probeEl, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "style"],
      });
    }

    // Also check on brief delays to catch carousel slides and async components
    const t1 = setTimeout(() => {
      const found = discoverImages();
      setImages((prev) => {
        const map = new Map(prev.map((img) => [img.originalSrc, img]));
        let changed = false;
        found.forEach((img) => {
          if (!map.has(img.originalSrc)) {
            map.set(img.originalSrc, img);
            changed = true;
          }
        });
        return changed ? Array.from(map.values()) : prev;
      });
    }, 200);

    const t2 = setTimeout(() => {
      const found = discoverImages();
      setImages((prev) => {
        const map = new Map(prev.map((img) => [img.originalSrc, img]));
        let changed = false;
        found.forEach((img) => {
          if (!map.has(img.originalSrc)) {
            map.set(img.originalSrc, img);
            changed = true;
          }
        });
        return changed ? Array.from(map.values()) : prev;
      });
    }, 800);

    return () => {
      observer?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [block.props, Cmp, componentProps, site.logo]);

  if (!Cmp) return null;

  const displayName = block.label ?? block.name ?? block.props.kind;

  return (
    <div>
      <div
        ref={probeRef}
        aria-hidden
        style={{
          position: "fixed",
          left: -9999,
          top: -9999,
          width: 1280,
          height: 800,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -99,
        }}
      >
        <RenderedImageOverrides
          overrides={getImageOverrides(componentProps as Record<string, unknown>)}
        >
          <Cmp id={block.id} props={componentProps} theme={theme} onChange={() => { }} />
        </RenderedImageOverrides>
      </div>

      {images.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border/50 bg-background/50 p-3 shadow-sm">
          <button
            type="button"
            onClick={() => onSectionChange(block.props.kind)}
            className="text-left text-[10px] font-bold uppercase tracking-[0.16em] text-foreground hover:text-ink-soft transition-colors cursor-pointer w-full flex items-center gap-2 capitalize"
          >
            <div className="h-2 w-2 rounded-full bg-foreground/20" />
            {displayName}
          </button>
          <div className="grid grid-cols-4 gap-2.5">
            {images.map((img, idx) => (
              <BlockImageThumb
                key={`${block.id}-${idx}`}
                url={img.src}
                editable={img.originalSrc.length > 0}
                onReplace={(newUrl) => {
                  const currentOverrides = getImageOverrides(
                    block.props as Record<string, unknown>,
                  );

                  if (img.siteKey === "logo") {
                    onSiteMetaChange({ logo: newUrl });
                    return;
                  }

                  if (!img.path) {
                    onUpdateBlock(block.id, {
                      [IMAGE_OVERRIDES_PROP]: {
                        ...currentOverrides,
                        [img.originalSrc]: newUrl,
                      },
                    });
                    return;
                  }

                  const nextProps = setNestedValue(block.props, img.path, newUrl) as Record<
                    string,
                    unknown
                  >;
                  onUpdateBlock(block.id, nextProps);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BlockImageThumb({
  url,
  editable,
  onReplace,
}: {
  url: string;
  editable: boolean;
  onReplace: (url: string) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFile(file: File) {
    setIsUploading(true);
    try {
      const nextUrl = await uploadSiteLogo(file);
      onReplace(nextUrl);
    } catch {
      // keep the existing image if the upload fails
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <label
      className={`group relative block aspect-square overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all ${editable ? "cursor-pointer hover:border-foreground/40 hover:shadow-md hover:scale-[1.02]" : "cursor-default"
        }`}
      title={editable ? "Replace image" : undefined}
    >
      <img src={url} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-white drop-shadow-md" />
        ) : editable ? (
          <PencilLine className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100 drop-shadow-md" />
        ) : null}
      </div>
      {editable && (
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      )}
    </label>
  );
}

function buildImagePathMap(
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
    Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
      buildImagePathMap(v, [...path, k], map);
    });
    return map;
  }
  return map;
}

function setNestedValue(obj: unknown, path: ImagePath, newValue: unknown): unknown {
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

function EditableValueList({
  value,
  onChange,
  prefix = "",
  blockKind,
}: {
  value: Record<string, unknown>;
  onChange: (nextValue: Record<string, unknown>) => void;
  prefix?: string;
  blockKind?: Block["props"]["kind"];
}) {
  return (
    <div className="space-y-3">
      {Object.entries(value).map(([key, current]) => {
        const label = prefix ? `${prefix}.${key}` : key;
        if (key === "kind" || key === "variant" || key === IMAGE_OVERRIDES_PROP) return null;

        if (typeof current === "string") {
          return (
            <Field key={label} label={label}>
              <textarea
                value={current}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                rows={current.length > 64 ? 3 : 1}
                className={compactInputClass}
              />
            </Field>
          );
        }

        if (Array.isArray(current)) {
          return (
            <div
              key={label}
              className="space-y-2 rounded-lg border border-border/60 bg-secondary/10 p-2.5"
            >
              <div className="text-[9px] font-bold uppercase tracking-widest text-ink-soft">
                {label}
              </div>
              {current.length === 0 && (
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      [key]: [createEditableArrayItem(key, blockKind)],
                    })
                  }
                  className="w-full rounded-lg border border-dashed border-border px-2.5 py-2 text-left text-[10px] font-medium text-ink-soft transition-colors hover:border-foreground/50 hover:text-foreground"
                >
                  + Add {key === "items" ? "item" : key.slice(0, -1)}
                </button>
              )}
              {current.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <input
                      key={`${label}.${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayItemChange(current, index, e.target.value, value, key, onChange)
                      }
                      className={compactInputClass}
                    />
                  );
                }

                if (isPlainObject(item)) {
                  return (
                    <div
                      key={`${label}.${index}`}
                      className="rounded-lg border border-border/60 bg-secondary/20 p-2.5"
                    >
                      <EditableValueList
                        value={item}
                        prefix={`${label}.${index + 1}`}
                        blockKind={blockKind}
                        onChange={(nextItem) => {
                          const next = [...current];
                          next[index] = nextItem;
                          onChange({ ...value, [key]: next });
                        }}
                      />
                    </div>
                  );
                }

                return null;
              })}
            </div>
          );
        }

        if (isPlainObject(current)) {
          return (
            <div key={label} className="rounded-lg border border-border/60 bg-secondary/10 p-2.5">
              <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-ink-soft">
                {label}
              </div>
              <EditableValueList
                value={current}
                prefix={label}
                blockKind={blockKind}
                onChange={(nextNested) => onChange({ ...value, [key]: nextNested })}
              />
            </div>
          );
        }

        if (typeof current === "number") {
          return (
            <Field key={label} label={label}>
              <input
                type="number"
                value={current}
                onChange={(e) => onChange({ ...value, [key]: Number(e.target.value) })}
                className={compactInputClass}
              />
            </Field>
          );
        }

        if (typeof current === "boolean") {
          return (
            <label
              key={label}
              className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/10 px-2.5 py-2"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft/80">
                {label}
              </span>
              <input
                type="checkbox"
                checked={current}
                onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
                className="h-3.5 w-3.5 accent-foreground"
              />
            </label>
          );
        }

        return null;
      })}
    </div>
  );
}

function createEditableArrayItem(key: string, blockKind?: Block["props"]["kind"]): unknown {
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
  if (key === "items" && blockKind === "stats") return { value: "", label: "", suffix: "" };
  return "";
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-ink-soft/80 pl-0.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function isPlainObject(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null && !Array.isArray(val);
}

const compactInputClass =
  "w-full rounded-lg border border-white/15 bg-zinc-950 text-white placeholder:text-zinc-500 px-2.5 py-1.5 text-xs outline-none transition-all hover:border-white/30 focus:border-primary focus:ring-1 focus:ring-primary/40 shadow-xs";