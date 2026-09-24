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
  Link as LinkIcon,
} from "lucide-react";

import type { Block, SiteData, Theme } from "@/types/builder.schema";
import { uploadBlockImage } from "@/lib/uploadBlockImage";
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
        return {
          ...nb,
          label: isSpacerDefault ? "New Block" : (nb.label ?? "New Block"),
          sectionHref: "",
          bgColor: nb.bgColor ?? theme.bg,
        };
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
          <div className="shrink-0 border-b border-zinc-800">
            <TabsList className="w-full h-9 rounded-none! grid grid-cols-4 gap-0 bg-background p-0">
              <TabsTrigger
                value="blocks"
                className="cursor-pointer flex h-full items-center justify-center gap-1.5 rounded-none! text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <LayoutGrid className="h-3 w-3" />
                Blocks
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="cursor-pointer flex h-full items-center justify-center gap-1.5 rounded-none! text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <Type className="h-3 w-3" />
                Text
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="cursor-pointer flex h-full items-center justify-center gap-1.5 rounded-none! text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <ImageIcon className="h-3 w-3" />
                Images
              </TabsTrigger>
              <TabsTrigger
                value="pages"
                className="relative cursor-pointer flex h-full items-center justify-center gap-1.5 rounded-none! text-[10px] font-medium text-zinc-400 hover:text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:shadow-xs transition-all"
              >
                <Files className="h-3 w-3" />
                Pages
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 simple-scrollbar bg-zinc-950">
            <TabsContent value="blocks" className="mt-0 h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-end">
                  {/* <SectionLabel>Blocks</SectionLabel>  */}
                  <button
                    type="button"
                    onClick={handleAddBlock}
                    className="flex items-center gap-1 rounded-lg bg-background border border-zinc-700 px-2.5 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-zinc-800 hover:border-zinc-600 cursor-pointer shadow-xs"
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
                {/* <SectionLabel>Images</SectionLabel>  */}
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
    <div className="text-[13px] font-bold tracking-[0.16em] text-foreground mb-1">
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
  const storedBgColor = (block as { bgColor?: string }).bgColor || (block.props as { backgroundColor?: string })?.backgroundColor;
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
  const sectionHref = getBlockSectionHref(block);
  const [linkInput, setLinkInput] = useState<string>(sectionHref);

  useEffect(() => {
    setLinkInput(sectionHref);
  }, [sectionHref]);

  const handleLinkCommit = () => {
    const trimmed = linkInput.trim();
    if (!trimmed || trimmed === "#") {
      setLinkInput("");
      onUpdateBlock(block.id, { sectionHref: "" });
    } else {
      const withoutHash = trimmed.replace(/^#+/, "");
      const slugified = `#${withoutHash.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-|-$/g, "")}`;
      const finalLink = slugified === "#" ? "" : slugified;
      setLinkInput(finalLink);
      onUpdateBlock(block.id, { sectionHref: finalLink });
    }
  };

  const isNewBlock = Boolean(
    block.isCustom ||
    (block as Record<string, unknown>).isNew ||
    (block.props as { isCustom?: boolean })?.isCustom ||
    block.props?.kind === "spacer",
  );

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-zinc-900/40 mb-4">
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        className={`group relative flex items-center gap-2 px-2.5 py-1.5 text-xs transition-all cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40 border-dashed scale-[0.98]" : ""
          } ${active ? "bg-zinc-800 text-white" : "text-zinc-300"}`}
      >
        <div className="flex items-center justify-center shrink-0">
          <GripVertical
            className={`h-3.5 w-3.5 transition-opacity ${active ? "opacity-90 text-white" : "opacity-0 text-muted-foreground"
              }`}
          />
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <span
            className={`shrink-0 font-mono text-[10px] w-3 text-right ${active ? "text-white font-bold" : "text-muted-foreground"
              }`}
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
            className={`w-full bg-transparent font-medium capitalize outline-none cursor-text truncate text-[11px] rounded px-1 py-0.5 transition-all ${active ? "text-foreground font-semibold" : "text-foreground"
              }`}
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
            className={`relative z-10 p-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${active ? "text-white" : "text-muted-foreground"
              }`}
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
          aria-expanded={isExpanded}
          className={`relative z-10 p-1.5 rounded-md transition-colors shrink-0 cursor-pointer ${active ? "text-white" : "text-muted-foreground"
            }`}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-150 ${isExpanded ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 bg-zinc-950/40 px-2.5 py-3 space-y-3">
            <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/80 px-2 py-1.5 font-mono text-[10px] text-zinc-400 focus-within:text-zinc-200 transition-colors">
              <LinkIcon className="h-3 w-3 shrink-0 opacity-70" />
              <input
                type="text"
                value={linkInput}
                placeholder="+ add link"
                draggable={false}
                onChange={(e) => setLinkInput(e.target.value)}
                onBlur={handleLinkCommit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full bg-transparent text-[10px] font-mono outline-none text-inherit placeholder:text-zinc-600 focus:placeholder-transparent cursor-text select-text"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <ThemeCircle
                label={`${displayName} Background`}
                shortLabel="BG"
                value={bgColor || theme.bg || "#000000"}
                isOpen={isColorPickerOpen}
                onOpenChange={setIsColorPickerOpen}
                onChange={(color) => {
                  onUpdateBlock(block.id, {
                    bgColor: color,
                    backgroundColor: color,
                    backgroundImage: "none",
                    isBlended: false,
                  });
                }}
                showLabel={false}
              />

              <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-xs">
                <span className="text-[10px] font-medium text-muted-foreground uppercase select-none">
                  H
                </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function getBlockSectionHref(block: Block): string {
  if (block.sectionHref !== undefined) {
    if (!block.sectionHref.trim()) return "";
    return block.sectionHref.startsWith("#") ? block.sectionHref : `#${block.sectionHref}`;
  }
  const raw = block.props.kind === "hero"
    ? "home"
    : (block.label || block.name || block.props.kind);
  const slug = raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `#${slug || block.props.kind}`;
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
  const [expandedIndices, setExpandedIndices] = useState<Record<string, boolean>>({});

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

  const toggleExpand = (index: string) => {
    setExpandedIndices((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-3 border-b border-border/60 pb-4">
      <button
        type="button"
        onClick={() => onSectionChange(block.props.kind)}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-xs font-medium capitalize text-ink-soft transition-colors hover:text-foreground"
      >
        <span className="truncate">{block.label ?? block.name ?? block.props.kind}</span>
      </button>
      <div
        ref={probeRef}
        aria-hidden
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
      >
        <RenderedImageOverrides
          overrides={getImageOverrides(componentProps as Record<string, unknown>)}
        >
          <TextOverrideProvider overrides={overrides}>
            <Cmp id={block.id} props={componentProps} theme={site.theme} onChange={() => { }} />
          </TextOverrideProvider>
        </RenderedImageOverrides>
      </div>
      <div className="space-y-2">
        {textEntries.map((entry) => {
          const isExpanded = !!expandedIndices[entry.index];
          const isLong = entry.text.length > 40 || entry.text.includes("\n");

          // Dynamically calculate rows based on character wrapping and explicit newlines
          const calculatedRows = Math.max(
            2,
            entry.text.split("\n").length,
            Math.ceil(entry.text.length / 38)
          );

          return (
            <div key={`${block.id}-${entry.index}`} className="relative">
              {isExpanded ? (
                <textarea
                  value={entry.text}
                  onChange={(event) => updateText(entry.index, event.target.value)}
                  className={`${compactInputClass} text-xs pr-7 resize-none overflow-hidden`}
                  rows={calculatedRows}
                />
              ) : (
                <input
                  type="text"
                  value={entry.text}
                  onChange={(event) => updateText(entry.index, event.target.value)}
                  className={`${compactInputClass} text-xs ${isLong ? "pr-7" : ""} truncate`}
                />
              )}
              {isLong && (
                <button
                  type="button"
                  onClick={() => toggleExpand(entry.index)}
                  className="absolute right-2 top-2 text-ink-soft/60 hover:text-foreground transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
        {textEntries.length === 0 && (
          <p className="rounded-lg border border-dashed border-border px-3 py-2 text-[10px] text-ink-soft">
            This block has no visible text.
          </p>
        )}
      </div>
    </div>
  );
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

function isImageUrlSmart(val: string, path: ImagePath): boolean {
  if (typeof val !== "string") return false;
  const s = val.trim();
  if (!s || s.length < 5 || s.length > 2048) return false;
  if (!s.startsWith("data:image/") && (s.includes(" ") || s.includes("\n"))) return false;

  if (s.startsWith("data:image/") || s.startsWith("blob:") || s.startsWith("/")) return true;

  if (/^https?:\/\//i.test(s)) {
    if (/\.(html|htm|php|asp|jsp|js|css)(\?.*)?$/i.test(s)) return false;

    // Check file extension
    if (/\.(png|jpe?g|webp|svg|gif|avif|ico|bmp)(\?.*)?$/i.test(s)) return true;

    // Check known CDNs
    const lower = s.toLowerCase();
    if (
      lower.includes("images.unsplash.com") ||
      lower.includes("unsplash.com") ||
      lower.includes("cloudinary.com") ||
      lower.includes("supabase.co") ||
      lower.includes("imgur.com") ||
      lower.includes("picsum.photos") ||
      lower.includes("firebasestorage.googleapis.com") ||
      lower.includes("ibb.co")
    ) {
      return true;
    }

    // Check if the property path suggests an image, slide, carousel, or portfolio card
    const pathStr = path.map(String).join("/").toLowerCase();
    if (
      pathStr.includes("image") ||
      pathStr.includes("img") ||
      pathStr.includes("photo") ||
      pathStr.includes("avatar") ||
      pathStr.includes("logo") ||
      pathStr.includes("banner") ||
      pathStr.includes("icon") ||
      pathStr.includes("slide") ||
      pathStr.includes("carousel") ||
      pathStr.includes("gallery") ||
      pathStr.includes("portfolio") ||
      pathStr.includes("item") ||
      pathStr.includes("card")
    ) {
      return true;
    }
  }

  return false;
}

function extractImageUrlsFromProps(
  obj: unknown,
  path: ImagePath = [],
  found: { url: string; path: ImagePath }[] = [],
): { url: string; path: ImagePath }[] {
  if (typeof obj === "string") {
    if (isImageUrlSmart(obj, path)) {
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

  const variant = (block.props as { variant?: string }).variant;
  const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
  const componentProps = useMemo(
    () =>
      block.props.kind === "navbar" || block.props.kind === "footer"
        ? { ...block.props, logo: site.logo }
        : block.props,
    [block.props, site.logo],
  );

  const discoverImages = useCallback(() => {
    const foundMap = new Map<
      string,
      {
        src: string;
        originalSrc: string;
        path: ImagePath | null;
        siteKey?: "logo";
      }
    >();
    const pathBySrc = buildImagePathMap(componentProps);
    const overrides = getImageOverrides(componentProps as Record<string, unknown>);

    const propsImages = extractImageUrlsFromProps(componentProps);
    for (const item of propsImages) {
      const activeSrc = overrides[item.url] || item.url;
      const isLogoPath =
        (block.props.kind === "navbar" || block.props.kind === "footer") &&
        (item.path?.includes("logo") || item.url === site.logo);

      foundMap.set(item.url, {
        src: activeSrc,
        originalSrc: item.url,
        siteKey: isLogoPath ? "logo" : undefined,
        path: item.path,
      });
    }

    const scanDomRoot = (root: ParentNode | null) => {
      if (!root) return;
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
            path: pathBySrc.get(originalSrc) ?? pathBySrc.get(currentSrc) ?? null,
          });
        }
      });
    };

    scanDomRoot(probeRef.current);

    if ((block.props.kind === "navbar" || block.props.kind === "footer") && site.logo) {
      if (!foundMap.has(site.logo)) {
        foundMap.set(site.logo, {
          src: site.logo,
          originalSrc: site.logo,
          siteKey: "logo",
          path: null,
        });
      }
    }

    return Array.from(foundMap.values());
  }, [block.props.kind, componentProps, site.logo]);

  const [images, setImages] = useState<
    {
      src: string;
      originalSrc: string;
      path: ImagePath | null;
      siteKey?: "logo";
    }[]
  >([]);

  useEffect(() => {
    const update = () => {
      const discovered = discoverImages();
      setImages(discovered ?? []);
    };

    update();

    const root = probeRef.current;
    if (!root) return;

    const observer = new MutationObserver(() => {
      update();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src"],
    });

    return () => observer.disconnect();
  }, [discoverImages]);

  if (!Cmp) return null;

  const displayName = block.label ?? block.name ?? block.props.kind;

  // NEW: still mount the hidden probe so discoverImages can run, but render
  // nothing visible until we know this block actually has images.
  if (images.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-3 pb-4 border-b border-border/60">
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

      <button
        type="button"
        onClick={() => onSectionChange(block.props.kind)}
        className="flex w-full cursor-pointer items-center gap-2 text-left text-xs font-medium capitalize text-ink-soft transition-colors hover:text-foreground"
      >
        <span className="truncate">{displayName}</span>
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

              const nextOverrides = {
                ...currentOverrides,
                [img.originalSrc]: newUrl,
              };

              if (!img.path) {
                onUpdateBlock(block.id, {
                  [IMAGE_OVERRIDES_PROP]: nextOverrides,
                });
                return;
              }

              const nextProps = setNestedValue(
                block.props,
                img.path,
                newUrl
              ) as Record<string, unknown>;
              nextProps[IMAGE_OVERRIDES_PROP] = nextOverrides;
              onUpdateBlock(block.id, nextProps);
            }}
          />
        ))}
      </div>
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
      const nextUrl = await uploadBlockImage(file);
      onReplace(nextUrl);
    } catch (error) {
      console.error("Upload failed:", error);
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
      <img
        src={url}
        alt=""
        className={`h-full w-full object-cover transition-all duration-300 ${isUploading ? "blur-sm scale-105 filter" : ""
          }`}
      />
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