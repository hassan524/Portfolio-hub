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
  isHexColor,
  to6DigitHex,
  handleAddBlock as handleAddBlockFn,
  moveSidebarBlock,
  handleBlockHeightChange,
  handleArrayItemChange,
} from "@/lib/functions/template";

import { uploadSiteLogo } from "@/lib/uploadLogo";
import { IMAGE_OVERRIDES_PROP, getImageOverrides } from "@/lib/imageOverrideUtils";
import { RenderedImageOverrides } from "@/lib/renderedImageOverrides";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  site: SiteData;
  theme: Theme;
  activeSection: string;
  onSectionChange: (id: string) => void;
  onThemeChange: (patch: Partial<Theme>) => void;
  // widened to include logo
  onSiteMetaChange: (
    patch: Partial<Pick<SiteData, "name" | "category" | "tagline" | "logo">>,
  ) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onReorderBlocks: (blocks: Block[]) => void;
  onSave?: (site: SiteData) => void;
};

export function TemplateSidebar({
  site,
  theme,
  activeSection,
  onSectionChange,
  onThemeChange,
  onSiteMetaChange,
  onUpdateBlock,
  onReorderBlocks,
}: Props) {
  const sortedBlocks = useMemo(
    () => [...site.blocks].sort((a, b) => a.order - b.order),
    [site.blocks],
  );

  function handleAddBlock() {
    handleAddBlockFn(sortedBlocks, theme, onReorderBlocks);
  }

  return (
    <aside className="w-[310px] shrink-0 border border-border bg-surface text-sm flex flex-col h-full rounded-2xl shadow-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header: logo, category, name */}
      <div className="p-3 pb-2 space-y-2 shrink-0">
        <LogoUploader
          logo={site.logo ?? null}
          onChange={(url) => onSiteMetaChange({ logo: url })}
        />

        <div className="space-y-1">
          <input
            value={site.category}
            onChange={(e) => onSiteMetaChange({ category: e.target.value })}
            className="w-full bg-transparent text-[9px] uppercase tracking-[0.2em] text-ink-soft outline-none focus:ring-1 focus:ring-ring rounded-md cursor-text"
          />
          <input
            value={site.name}
            onChange={(e) => onSiteMetaChange({ name: e.target.value })}
            className="w-full bg-transparent font-display text-lg outline-none focus:ring-1 focus:ring-ring rounded-md cursor-text"
          />
        </div>
      </div>

      {/* Theme — light label above the swatch row */}
      <div className="px-3 pt-1.5 pb-2.5 shrink-0 flex flex-col gap-1.5">
        <span className="text-[9px] font-normal uppercase tracking-[0.16em] text-ink-soft">
          Theme
        </span>
        <ThemeCircleRow theme={theme} onThemeChange={onThemeChange} />
      </div>

      <Tabs defaultValue="blocks" className="flex min-h-0 flex-1 flex-col gap-0">
        <div className="px-2.5 pb-2 shrink-0">
          <TabsList className="w-full h-9 grid grid-cols-4 gap-1 rounded-xl bg-background/60 border border-border/60 p-1">
            <TabsTrigger
              value="blocks"
              className="cursor-pointer flex items-center justify-center gap-1 rounded-lg text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm transition-all"
            >
              <LayoutGrid className="h-3 w-3" />
              Blocks
            </TabsTrigger>
            <TabsTrigger
              value="text"
              className="cursor-pointer flex items-center justify-center gap-1 rounded-lg text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm transition-all"
            >
              <Type className="h-3 w-3" />
              Text
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="cursor-pointer flex items-center justify-center gap-1 rounded-lg text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm transition-all"
            >
              <ImageIcon className="h-3 w-3" />
              Images
            </TabsTrigger>
            <TabsTrigger
              value="pages"
              className="relative cursor-pointer flex items-center justify-center gap-1 rounded-lg text-[10px] font-medium text-muted-foreground data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-sm transition-all"
            >
              <Files className="h-3 w-3" />
              Pages
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 simple-scrollbar">
          <TabsContent value="blocks" className="mt-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <SectionLabel>Blocks</SectionLabel>
                <button
                  type="button"
                  onClick={handleAddBlock}
                  className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] font-semibold text-ink-soft transition-colors hover:text-foreground hover:border-foreground/40 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  Add block
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
            <div className="space-y-3">
              <SectionLabel>Text Content</SectionLabel>
              <TextPanel
                blocks={sortedBlocks}
                onUpdateBlock={onUpdateBlock}
                onSectionChange={onSectionChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="images" className="mt-0">
            <div className="space-y-3">
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
  );
}

/* ---------------------------------------------------------------- */
/* Pages tab — coming soon empty state                              */
/* ---------------------------------------------------------------- */

function PagesComingSoon() {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 text-center px-4">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/60">
        <Files className="h-4.5 w-4.5 text-ink-soft" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-background">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </div>
      <div className="space-y-1">
        <div className="text-xs font-semibold text-foreground">Multi-page sites</div>
        <div className="text-[11px] leading-relaxed text-ink-soft">
          Adding and managing extra pages for your site is coming soon.
        </div>
      </div>
      <span className="rounded-full border border-border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
        Coming soon
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Theme circle row — glossy swatches with a colored glow, click     */
/* opens a tiny popover picker so the user can change each color.    */
/* ---------------------------------------------------------------- */

function ThemeCircleRow({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: (patch: Partial<Theme>) => void;
}) {
  const fields: { key: keyof Theme; label: string; fallback: string }[] = [
    { key: "bg", label: "Background", fallback: "#ffffff" },
    { key: "ink", label: "Text", fallback: "#000000" },
    { key: "accent", label: "Accent", fallback: "#000000" },
    ...(theme.accent2 !== undefined
      ? [{ key: "accent2" as keyof Theme, label: "Accent 2", fallback: "#000000" }]
      : []),
    ...(theme.surface !== undefined
      ? [{ key: "surface" as keyof Theme, label: "Surface", fallback: "#ffffff" }]
      : []),
  ];

  return (
    <div className="flex items-center gap-2.5">
      {fields.map(({ key, label, fallback }) => {
        const raw = theme[key];
        const value = typeof raw === "string" && isHexColor(raw) ? raw : fallback;
        return (
          <ThemeCircle
            key={key}
            label={label}
            value={value}
            onChange={(next) => onThemeChange({ [key]: next } as Partial<Theme>)}
          />
        );
      })}
    </div>
  );
}

function ThemeCircle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const safeHex = isHexColor(value) ? to6DigitHex(value) : "#ffffff";
  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  const start = rgbToHsv(hexToRgb(safeHex).r, hexToRgb(safeHex).g, hexToRgb(safeHex).b);
  const [hue, setHue] = useState(start.h);
  const [sat, setSat] = useState(start.s);
  const [val, setVal] = useState(start.v);
  const [hexInput, setHexInput] = useState(safeHex);

  useEffect(() => {
    if (!isHexColor(value)) return;
    const hex6 = to6DigitHex(value);
    if (hex6.toLowerCase() === hexInput.toLowerCase()) return;
    const { r, g, b } = hexToRgb(hex6);
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    setHexInput(hex6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const applyHsv = (nh: number, ns: number, nv: number) => {
    const { r, g, b } = hsvToRgb(nh, ns, nv);
    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    onChange(hex);
  };

  const applyHex = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const hsv = rgbToHsv(r, g, b);
    setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
    setHexInput(hex);
    onChange(hex);
  };

  const dragSv = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = svRef.current;
    if (!el) return;
    const move = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const ns = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const nv = 1 - Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
      setSat(ns);
      setVal(nv);
      applyHsv(hue, ns, nv);
    };
    move(e.clientX, e.clientY);
    const onMove = (ev: PointerEvent) => move(ev.clientX, ev.clientY);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const dragHue = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = hueRef.current;
    if (!el) return;
    const move = (clientX: number) => {
      const rect = el.getBoundingClientRect();
      const nh = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 360;
      setHue(nh);
      applyHsv(nh, sat, val);
    };
    move(e.clientX);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group relative h-6 w-6 shrink-0 rounded-full cursor-pointer transition-all duration-200 ease-out hover:scale-[1.15] active:scale-95"
          style={{
            backgroundColor: value,
            boxShadow: `0 1px 2px rgba(0,0,0,0.15), 0 0 0 3px ${value}24, 0 0 10px 1px ${value}45`,
          }}
          title={label}
        >
          {/* glossy highlight for a less-flat, SaaS-swatch feel */}
          <span className="pointer-events-none absolute inset-[1px] rounded-full bg-gradient-to-br from-white/45 via-white/5 to-black/10" />
          {/* extra glow bloom on hover */}
          <span
            className="pointer-events-none absolute -inset-1.5 rounded-full opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-70"
            style={{ backgroundColor: value }}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-56 space-y-2 border-border bg-surface p-2.5 z-[60]">
        <div className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
          {label}
        </div>

        <div
          ref={svRef}
          onPointerDown={dragSv}
          className="relative h-28 w-full cursor-crosshair select-none rounded-md"
          style={{
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            backgroundImage:
              "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
          }}
        >
          <div
            className="pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
            style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
          />
        </div>

        <div
          ref={hueRef}
          onPointerDown={dragHue}
          className="relative h-2.5 w-full cursor-pointer select-none rounded-full"
          style={{
            background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
          }}
        >
          <div
            className="pointer-events-none absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)]"
            style={{ left: `${(hue / 360) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-1.5">
          <div
            className="h-6 w-6 shrink-0 rounded border border-border"
            style={{ backgroundColor: hexInput }}
          />
          <Input
            value={hexInput}
            onChange={(e) => {
              const next = e.target.value;
              setHexInput(next);
              if (isHexColor(next)) applyHex(to6DigitHex(next));
            }}
            className="h-6 px-1.5 border-border bg-background font-mono text-[10px] uppercase text-foreground focus-visible:ring-ring focus-visible:ring-1"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* --- color math --- */
function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
        .split("")
        .map((c) => c + c)
        .join("")
      : clean;
  const int = parseInt(full || "000000", 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}

function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else[r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

/* ---------------------------------------------------------------- */
/* Logo uploader — visually distinct from the live preview          */
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
    <div className="flex items-center gap-3">
      <label
        className={`relative shrink-0 h-12 w-12 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden cursor-pointer transition-colors ${logo
            ? "border-transparent bg-background"
            : "border-border hover:border-foreground/40 bg-background"
          }`}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-soft" />
        ) : logo ? (
          <img src={logo} alt="Site logo" className="h-full w-full object-cover" />
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
            e.target.value = ""; // allow re-selecting same file
          }}
        />
      </label>

      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold text-foreground">
          {logo ? "Site logo" : "Add a logo"}
        </div>
      </div>

      {logo && !isUploading && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="shrink-0 h-6 w-6 rounded-md flex items-center justify-center text-ink-soft hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
          title="Remove logo"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
      {children}
    </div>
  );
}

function CenteredDivider() {
  return (
    <div className="px-6 py-0.5 shrink-0">
      <div className="border-t border-border/60 w-full" />
    </div>
  );
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

  function moveBlock(targetId: string) {
    moveSidebarBlock(draggedId, targetId, blocks, onReorderBlocks);
  }

  return (
    <div className="space-y-1.5">
      {blocks.map((block, index) => {
        const active = activeSection === block.props.kind;
        const isDragging = draggedId === block.id;
        const height = block.height;
        const displayName = block.label ?? block.name ?? block.props.kind;
        const isNewBlock = Boolean(
          block.isCustom ||
          (block as Record<string, unknown>).isNew ||
          (block.props as { isCustom?: boolean })?.isCustom ||
          block.props?.kind === "spacer",
        );

        return (
          <div
            key={block.id}
            draggable
            onDragStart={() => setDraggedId(block.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => moveBlock(block.id)}
            onDragEnd={() => setDraggedId(null)}
            className={`relative flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs transition-colors cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40 border-dashed border-foreground" : ""
              } ${active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background hover:bg-secondary/50"
              }`}
          >
            <div className="relative z-10 flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing">
              <GripVertical className="h-3.5 w-3.5 opacity-60 pointer-events-none" />
            </div>

            <div className="flex-1 min-w-0 flex items-center gap-1">
              <span
                className={`shrink-0 font-medium text-[11px] ${active ? "opacity-70" : "opacity-50"}`}
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
                className={`w-full bg-transparent font-medium capitalize outline-none cursor-text truncate text-xs focus:ring-1 focus:ring-ring rounded px-1 ${active ? "text-background" : "text-foreground"
                  }`}
                title="Click to rename block"
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
                className={`relative z-10 p-1 rounded transition-colors shrink-0 ${active
                    ? "hover:bg-background/20 text-background"
                    : "hover:bg-secondary text-ink-soft hover:text-foreground"
                  }`}
                title="Blend block style and background dynamically with portfolio"
              >
                <PencilLine className="h-3.5 w-3.5" />
              </button>
            )}

            <div className="flex items-center shrink-0 z-10">
              <input
                type="number"
                value={typeof height === "number" ? height : ""}
                placeholder="auto"
                draggable={false}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleBlockHeightChange(block.id, e.target.value, onUpdateBlock)}
                className={`w-11 bg-transparent text-right font-mono text-[10px] outline-none cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${active
                    ? "text-background/80 placeholder:text-background/40"
                    : "text-ink-soft/70 placeholder:text-ink-soft/40"
                  }`}
                title="Block height in pixels"
              />
              <span
                className={`text-[9px] ml-0.5 ${active ? "text-background/60" : "text-ink-soft/50"}`}
              >
                px
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TextPanel({
  blocks,
  onUpdateBlock,
  onSectionChange,
}: {
  blocks: Block[];
  onUpdateBlock: Props["onUpdateBlock"];
  onSectionChange: (id: string) => void;
}) {
  return (
    <div className="space-y-3">
      {blocks.map((block) => (
        <div key={block.id} className="p-1 space-y-2">
          <button
            type="button"
            onClick={() => onSectionChange(block.props.kind)}
            className="text-left text-[10px] font-bold uppercase tracking-[0.16em] text-foreground hover:underline cursor-pointer"
          >
            {block.props.kind}
          </button>
          <EditableValueList
            value={block.props}
            onChange={(nextProps) => onUpdateBlock(block.id, nextProps)}
          />
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Images tab — render each block exactly like the live preview     */
/* does (getBlockComponent), then look at the real DOM it produces. */
/* Any block whose rendered output contains <img> tags gets a small */
/* heading + a grid of thumbnails; hovering a thumbnail reveals a    */
/* pencil to swap that image out.                                   */
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

  // Scan the ACTUAL rendered output for real <img> tags — same component
  // the live preview uses, no guessing based on prop names.
  useEffect(() => {
    const el = probeRef.current;
    if (!el) {
      setImages([]);
      return;
    }

    const imgEls = Array.from(el.querySelectorAll("img"));
    if (imgEls.length === 0) {
      setImages([]);
      return;
    }

    const pathBySrc = buildImagePathMap(componentProps);

    const found = imgEls
      .map((img) => {
        const src = img.getAttribute("src") ?? "";
        const originalSrc = img.dataset.originalSrc || src;
        return {
          src,
          originalSrc,
          siteKey: site.logo && originalSrc === site.logo ? ("logo" as const) : undefined,
          path: pathBySrc.get(originalSrc) ?? pathBySrc.get(src) ?? null,
        };
      })
      .filter((entry) => entry.src.length > 0);

    setImages(found);
  }, [block.props, Cmp, componentProps, site.logo]);

  if (!Cmp) return null;

  const displayName = block.label ?? block.name ?? block.props.kind;

  return (
    <div>
      {/* Hidden probe render — same Cmp/props/theme as the live preview,
          just off-screen and non-interactive. Only used to detect <img>s. */}
      <div
        ref={probeRef}
        aria-hidden
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <RenderedImageOverrides
          overrides={getImageOverrides(componentProps as Record<string, unknown>)}
        >
          <Cmp id={block.id} props={componentProps} theme={theme} onChange={() => { }} />
        </RenderedImageOverrides>
      </div>

      {images.length > 0 && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onSectionChange(block.props.kind)}
            className="text-left text-[10px] font-bold uppercase tracking-[0.16em] text-foreground hover:underline cursor-pointer capitalize"
          >
            {displayName}
          </button>
          <div className="grid grid-cols-4 gap-2">
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
      className={`group relative block aspect-square overflow-hidden rounded-md border border-border bg-background ${editable ? "cursor-pointer" : "cursor-default"
        }`}
      title={editable ? "Click to replace image" : undefined}
    >
      <img src={url} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
        {isUploading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
        ) : editable ? (
          <PencilLine className="h-3.5 w-3.5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
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

// Walks block.props and records the path to every string leaf, keyed by its
// value. Used to map a rendered <img src> back to the prop that produced it.
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

// Immutable set-at-path, handling both object and array segments.
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
}: {
  value: Record<string, unknown>;
  onChange: (nextValue: Record<string, unknown>) => void;
  prefix?: string;
}) {
  return (
    <div className="space-y-2">
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
                className={`${compactInputClass} cursor-text rounded-md`}
              />
            </Field>
          );
        }

        if (Array.isArray(current)) {
          return (
            <div key={label} className="space-y-1.5">
              <div className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
                {label}
              </div>
              {current.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <input
                      key={`${label}.${index}`}
                      value={item}
                      onChange={(e) =>
                        handleArrayItemChange(current, index, e.target.value, value, key, onChange)
                      }
                      className={`${compactInputClass} cursor-text rounded-md`}
                    />
                  );
                }

                if (isPlainObject(item)) {
                  return (
                    <div key={`${label}.${index}`} className="p-1">
                      <EditableValueList
                        value={item}
                        prefix={`${label}.${index + 1}`}
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
            <EditableValueList
              key={label}
              value={current}
              prefix={label}
              onChange={(nextNested) => onChange({ ...value, [key]: nextNested })}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
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
  "w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs outline-none transition focus:border-foreground focus:ring-1 focus:ring-ring";