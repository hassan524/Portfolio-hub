import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Grid, List as ListIcon, LucideIcon } from "lucide-react";

/**
 * DataListView<T>
 * ────────────────────────────────────────────────────────────
 * A universal grid/list screen for any collection of records
 * (portfolios, projects, clients, invoices...). It owns search,
 * grid/list toggle, empty state, and the header/toolbar chrome —
 * you only supply how a single item renders in each mode.
 *
 * Usage: see PortfoliosOverview.example.tsx at the bottom of this file.
 */

interface DataListViewProps<T> {
  items: T[];
  getId: (item: T) => string;
  getSearchText: (item: T) => string; // fields concatenated for search matching

  renderGridItem: (item: T, index: number) => ReactNode;
  renderListItem: (item: T, index: number) => ReactNode;

  title: string;
  subtitle?: string;

  onItemClick?: (item: T) => void;

  searchPlaceholder?: string;
  defaultView?: "grid" | "list";
  hideViewToggle?: boolean;

  createLabel?: string;
  onCreateClick?: () => void;

  emptyIcon?: LucideIcon;
  emptyTitle?: string;
  emptyDescription?: string;

  toolbarExtra?: ReactNode; // e.g. filter dropdowns, sort selects
}

export function DataListView<T>({
  items,
  getId,
  getSearchText,
  renderGridItem,
  renderListItem,
  title,
  subtitle,
  onItemClick,
  searchPlaceholder = "Search...",
  defaultView = "grid",
  hideViewToggle = false,
  createLabel = "Create",
  onCreateClick,
  emptyIcon: EmptyIcon = Search,
  emptyTitle = "Nothing here yet",
  emptyDescription = "Try refining your search or create a new item.",
  toolbarExtra,
}: DataListViewProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultView);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter((item) => getSearchText(item).toLowerCase().includes(q));
  }, [items, searchQuery, getSearchText]);

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/70">
        <div>
          <h1 className="font-display text-4xl tracking-tight">{title}</h1>
          {subtitle && <p className="mt-1 text-ink-soft text-sm">{subtitle}</p>}
        </div>
        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-xs font-bold shadow-soft hover:shadow-lift hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            {createLabel}
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm min-w-[180px]">
          <Search className="absolute left-3 top-3 h-4 w-4 text-ink-soft/60" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-border bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all placeholder:text-ink-soft/50"
          />
        </div>

        <div className="flex items-center gap-3">
          {toolbarExtra}

          {!hideViewToggle && (
            <div className="flex items-center gap-2 rounded-xl border border-border p-1 bg-surface-elevated">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "grid" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === "list" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
                }`}
                aria-label="List view"
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-surface-elevated/40">
          <EmptyIcon className="h-8 w-8 mx-auto stroke-1 text-ink-soft/70 mb-3" />
          <h3 className="font-semibold text-sm">{emptyTitle}</h3>
          <p className="text-xs text-ink-soft/80 mt-1">{emptyDescription}</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={getId(item)} onClick={() => onItemClick?.(item)}>
              {renderGridItem(item, index)}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden divide-y divide-border">
          {filteredItems.map((item, index) => (
            <div
              key={getId(item)}
              onClick={() => onItemClick?.(item)}
              className="cursor-pointer hover:bg-secondary/25 transition-colors"
            >
              {renderListItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}