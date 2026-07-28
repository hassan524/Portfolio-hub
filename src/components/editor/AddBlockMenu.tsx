import { useState } from "react";
import { Plus, X } from "lucide-react";
import type { Block } from "@/types/builder.schema";

// ⚠️ Adjust this import to match whatever your real blockRegistry.ts
// exports. It needs to give you a flat list of { kind, variant, label }
// options to populate the picker. If your registry only exports
// getBlockComponent(kind, variant), add a parallel BLOCK_CATALOG array
// there — that's the one missing piece I don't have visibility into.
import { BLOCK_CATALOG } from "@/lib/blockRegistry";

type AddBlockMenuProps = {
  /** Insert the new block right after this existing block's order. Pass null to insert at the very top. */
  afterOrder: number | null;
  blocks: Block[];
  onInsert: (block: Block) => void;
};

/**
 * Small "+" trigger that expands into a searchable list of block kinds.
 * Renders between every existing block in the sidebar list (and once
 * above the first block) so a section can be dropped in anywhere.
 */
export function AddBlockMenu({ afterOrder, blocks, onInsert }: AddBlockMenuProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [height, setHeight] = useState<string>("");

  const filtered = BLOCK_CATALOG.filter((entry) =>
    entry.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function handlePick(entry: (typeof BLOCK_CATALOG)[number]) {
    // Fractional ordering: insert between the two neighbouring order
    // values instead of renumbering the whole array. TemplateLivePreview
    // and the sidebar both already sort by `order`, so this just slots
    // in visually without touching any other block's position.
    const sorted = [...blocks].sort((a, b) => a.order - b.order);
    const afterIndex = afterOrder === null ? -1 : sorted.findIndex((b) => b.order === afterOrder);
    const prev = afterIndex >= 0 ? sorted[afterIndex] : null;
    const next = sorted[afterIndex + 1] ?? null;
    const prevOrder = prev?.order ?? 0;
    const nextOrder = next?.order ?? prevOrder + 2;
    const newOrder = (prevOrder + nextOrder) / 2;

    const newBlock: Block = {
      id: `block_${crypto.randomUUID().slice(0, 8)}`,
      type: entry.componentType,
      order: newOrder,
      props: {
        ...entry.defaultProps,
        kind: entry.kind,
        variant: entry.variant,
        ...(height ? { sectionHeight: Number(height) } : {}),
      },
    } as Block;

    onInsert(newBlock);
    setOpen(false);
    setQuery("");
    setHeight("");
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-[11px] font-medium text-ink-soft transition-colors hover:border-foreground hover:text-foreground"
      >
        <Plus className="h-3.5 w-3.5" />
        Add section here
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-foreground bg-background p-2.5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-ink-soft">
          Insert section
        </span>
        <button onClick={() => setOpen(false)} className="text-ink-soft hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sections…"
        className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-xs outline-none focus:border-foreground"
      />

      <div className="max-h-48 space-y-1 overflow-y-auto">
        {filtered.map((entry) => (
          <button
            key={`${entry.kind}:${entry.variant}`}
            onClick={() => handlePick(entry)}
            className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs hover:bg-secondary"
          >
            <span className="capitalize">{entry.label}</span>
            <span className="text-[10px] text-ink-soft">{entry.kind}</span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="px-2 py-3 text-center text-[11px] text-ink-soft">No matches</p>
        )}
      </div>

      <label className="block space-y-1 pt-1">
        <span className="text-[9px] font-semibold uppercase tracking-wide text-ink-soft">
          Section height (px, optional)
        </span>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Auto"
          className="w-full rounded-md border border-border bg-surface px-2 py-1.5 text-xs outline-none focus:border-foreground"
        />
      </label>
    </div>
  );
}