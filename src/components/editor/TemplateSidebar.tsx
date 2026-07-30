import { useMemo, useState, type ReactNode } from "react";
import { GripVertical, Layers, Palette, Plus, PencilLine, Type } from "lucide-react";
import type { Block, SiteData, Theme } from "@/types/builder.schema";
import { blendBlockWithNeighbors } from "@/lib/functions/blockBlend";
import {
  findInsertIndex,
  createBlankBlock,
  isPlainObject,
  isHexColor,
  handleAddBlock as handleAddBlockFn,
  moveSidebarBlock,
  handleBlockHeightChange,
  handleArrayItemChange,
} from "@/lib/functions/TemplateDialog";

type Props = {
  site: SiteData;
  theme: Theme;
  activeSection: string;
  onSectionChange: (id: string) => void;
  onThemeChange: (patch: Partial<Theme>) => void;
  onSiteMetaChange: (patch: Partial<Pick<SiteData, "name" | "category" | "tagline">>) => void;
  onUpdateBlock: (blockId: string, patch: Record<string, unknown>) => void;
  onReorderBlocks: (blocks: Block[]) => void;
  onSave?: (site: SiteData) => void;
};

type TabType = "blocks" | "colors" | "text";

const COLOR_FIELDS: { key: keyof Theme; label: string }[] = [
  { key: "bg", label: "Background" },
  { key: "ink", label: "Text" },
  { key: "accent", label: "Accent" },
  { key: "accent2", label: "Accent 2" },
  { key: "surface", label: "Surface" },
];

const STYLE_FIELDS: { key: keyof Theme; label: string; options: string[] }[] = [
  { key: "spacing", label: "Spacing", options: ["compact", "cozy", "airy"] },
];

export function TemplateSidebar({
  site,
  theme,
  activeSection,
  onSectionChange,
  onThemeChange,
  onSiteMetaChange,
  onUpdateBlock,
  onReorderBlocks,
  onSave,
}: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("blocks");

  const sortedBlocks = useMemo(
    () => [...site.blocks].sort((a, b) => a.order - b.order),
    [site.blocks],
  );

  function handleAddBlock() {
    handleAddBlockFn(sortedBlocks, theme, onReorderBlocks);
  }

  return (
    <aside className="w-[320px] shrink-0 border-r border-border bg-surface text-sm flex flex-col h-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header: category, name, tagline */}
      <div className="p-4 space-y-1 shrink-0">
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
        <textarea
          value={site.tagline}
          onChange={(e) => onSiteMetaChange({ tagline: e.target.value })}
          rows={2}
          className="w-full resize-none bg-transparent text-xs leading-snug text-ink-soft outline-none focus:ring-1 focus:ring-ring rounded-md cursor-text"
        />
      </div>

      <CenteredDivider />

      {/* Switchable Navigation Tabs */}
      <div className="px-4 py-2 shrink-0">
        <div className="flex items-center rounded-lg border border-border bg-background p-1 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("blocks")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "blocks"
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:text-foreground"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Blocks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("colors")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "colors"
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:text-foreground"
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            Colors
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "text"
                ? "bg-foreground text-background shadow-sm"
                : "text-ink-soft hover:text-foreground"
            }`}
          >
            <Type className="h-3.5 w-3.5" />
            Text
          </button>
        </div>
      </div>

      <CenteredDivider />

      {/* Tab Content Panel */}
      <div className="p-4 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {activeTab === "blocks" && (
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
        )}

        {activeTab === "colors" && (
          <div className="space-y-3">
            <SectionLabel>Colors</SectionLabel>
            <PalettePanel theme={theme} onThemeChange={onThemeChange} />
          </div>
        )}

        {activeTab === "text" && (
          <div className="space-y-3">
            <SectionLabel>Text Content</SectionLabel>
            <TextPanel blocks={sortedBlocks} onUpdateBlock={onUpdateBlock} onSectionChange={onSectionChange} />
          </div>
        )}
      </div>
    </aside>
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
          block.props?.kind === "spacer"
        );

        return (
          <div
            key={block.id}
            draggable
            onDragStart={() => setDraggedId(block.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => moveBlock(block.id)}
            onDragEnd={() => setDraggedId(null)}
            className={`relative flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-xs transition-colors cursor-grab active:cursor-grabbing ${
              isDragging ? "opacity-40 border-dashed border-foreground" : ""
            } ${
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background hover:bg-secondary/50"
            }`}
          >
            <div className="relative z-10 flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing">
              <GripVertical className="h-3.5 w-3.5 opacity-60 pointer-events-none" />
            </div>

            {/* Editable Block Label / Name */}
            <div className="flex-1 min-w-0 flex items-center gap-1">
              <span className={`shrink-0 font-medium text-[11px] ${active ? "opacity-70" : "opacity-50"}`}>
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
                className={`w-full bg-transparent font-medium capitalize outline-none cursor-text truncate text-xs focus:ring-1 focus:ring-ring rounded px-1 ${
                  active ? "text-background" : "text-foreground"
                }`}
                title="Click to rename block"
              />
            </div>

            {/* Smart Blend Button - Only for newly added blocks */}
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
                className={`relative z-10 p-1 rounded transition-colors shrink-0 ${
                  active
                    ? "hover:bg-background/20 text-background"
                    : "hover:bg-secondary text-ink-soft hover:text-foreground"
                }`}
                title="Blend block style and background dynamically with portfolio"
              >
                <PencilLine className="h-3.5 w-3.5" />
              </button>
            )}

            {/* Height Control */}
            <div className="flex items-center shrink-0 z-10">
              <input
                type="number"
                value={typeof height === "number" ? height : ""}
                placeholder="auto"
                draggable={false}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleBlockHeightChange(block.id, e.target.value, onUpdateBlock)}
                className={`w-11 bg-transparent text-right font-mono text-[10px] outline-none cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  active ? "text-background/80 placeholder:text-background/40" : "text-ink-soft/70 placeholder:text-ink-soft/40"
                }`}
                title="Block height in pixels"
              />
              <span className={`text-[9px] ml-0.5 ${active ? "text-background/60" : "text-ink-soft/50"}`}>
                px
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PalettePanel({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: Props["onThemeChange"];
}) {
  return (
    <div className="space-y-4">
      {/* Vertical Palette with Editable Hex Inputs */}
      <div className="space-y-2">
        {COLOR_FIELDS.map((field) => {
          const rawValue = String(theme[field.key] ?? "");
          const hexValue = isHexColor(rawValue) ? rawValue : "#ffffff";

          return (
            <div
              key={field.key}
              className="flex items-center justify-between rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/30"
            >
              <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
                <div
                  className="h-5 w-5 rounded-full border border-border/80 shadow-sm shrink-0"
                  style={{ backgroundColor: hexValue }}
                />
                <span className="text-xs font-medium text-foreground cursor-pointer truncate">
                  {field.label}
                </span>
                <input
                  type="color"
                  value={hexValue}
                  onChange={(e) => onThemeChange({ [field.key]: e.target.value } as Partial<Theme>)}
                  className="h-0 w-0 opacity-0 absolute pointer-events-none"
                />
              </label>

              {/* Editable Hex Code Input */}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={rawValue}
                  onChange={(e) => onThemeChange({ [field.key]: e.target.value } as Partial<Theme>)}
                  className="w-20 rounded-md border border-border bg-surface px-1.5 py-0.5 text-right font-mono text-[11px] uppercase text-foreground outline-none focus:border-foreground focus:ring-1 focus:ring-ring cursor-text"
                  placeholder="#000000"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-1">
        {STYLE_FIELDS.map((field) => (
          <label key={field.key} className="block space-y-1 cursor-pointer">
            <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft cursor-pointer">
              {field.label}
            </span>
            <select
              value={String(theme[field.key] ?? "")}
              onChange={(e) => onThemeChange({ [field.key]: e.target.value } as Partial<Theme>)}
              className={`${compactInputClass} cursor-pointer rounded-md`}
            >
              {field.options.map((option) => (
                <option key={option} value={option} className="cursor-pointer">
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block space-y-1">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">Heading font</span>
          <input
            value={String(theme.fontHeading ?? "")}
            onChange={(e) => onThemeChange({ fontHeading: e.target.value })}
            className={`${compactInputClass} cursor-text rounded-md`}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">Body font</span>
          <input
            value={String(theme.fontBody ?? "")}
            onChange={(e) => onThemeChange({ fontBody: e.target.value })}
            className={`${compactInputClass} cursor-text rounded-md`}
          />
        </label>
      </div>
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
        if (key === "kind" || key === "variant") return null;

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
              <div className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">{label}</div>
              {current.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <input
                      key={`${label}.${index}`}
                      value={item}
                      onChange={(e) => handleArrayItemChange(current, index, e.target.value, value, key, onChange)}
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
      <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

const compactInputClass =
  "w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs outline-none transition focus:border-foreground focus:ring-1 focus:ring-ring";