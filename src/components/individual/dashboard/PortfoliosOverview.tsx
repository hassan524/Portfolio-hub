import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Grid, List, Globe, ChevronRight } from "lucide-react";
import type { Portfolio } from "./types";
import { TEMPLATES } from "@/lib/templates";
import { TemplatePreview, TemplateCard } from "@/components/common/TemplateCard";

interface PortfoliosOverviewProps {
  portfolios: Portfolio[];
  onSelect: (id: string) => void;
  onCreateClick: () => void;
}

export function PortfoliosOverview({
  portfolios,
  onSelect,
  onCreateClick,
}: PortfoliosOverviewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredPortfolios = portfolios.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/70">
        <div>
          <h1 className="font-display text-4xl tracking-tight">My portfolios</h1>
          <p className="mt-1 text-ink-soft text-sm">
            Manage, configure, and monitor the performance of your live portfolios.
          </p>
        </div>
        <button
          onClick={onCreateClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-xs font-bold shadow-soft hover:shadow-lift hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          Create Portfolio
        </button>
      </div>

      {/* Search & Layout Control Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-ink-soft/60" />
          <input
            type="text"
            placeholder="Search portfolios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-border bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all placeholder:text-ink-soft/50"
          />
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-border p-1 bg-surface-elevated">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "list" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid vs List View Rendering */}
      {filteredPortfolios.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-surface-elevated/40">
          <Search className="h-8 w-8 mx-auto stroke-1 text-ink-soft/70 mb-3" />
          <h3 className="font-semibold text-sm">No portfolios found</h3>
          <p className="text-xs text-ink-soft/80 mt-1">Try refining your search query or create a new portfolio.</p>
        </div>
      ) : viewMode === "grid" ? (
        /* ── GRID VIEW ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio, index) => {
            const baseTemplate = TEMPLATES.find(t => t.slug.toLowerCase() === portfolio.template.toLowerCase()) || TEMPLATES[0];
            const fauxTemplate = { 
              ...baseTemplate, 
              name: portfolio.name, 
              tagline: portfolio.url,
              isPro: false // Hide Pro badge for existing portfolios
            };

            return (
              <TemplateCard
                key={portfolio.id}
                t={fauxTemplate}
                index={index}
                onPreview={() => onSelect(portfolio.id)}
              />
            );
          })}
        </div>
      ) : (
        /* ── LIST VIEW ── */
        <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden divide-y divide-border">
          {filteredPortfolios.map((portfolio) => {
            const isDraft = portfolio.status === "Draft";
            return (
              <div
                key={portfolio.id}
                onClick={() => {
                  onSelect(portfolio.id);
                }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-secondary/25 transition-colors cursor-pointer gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/60">
                    <Globe className="h-5 w-5 text-ink-soft" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-base truncate">{portfolio.name}</h3>
                    <p className="text-xs text-ink-soft font-mono truncate">{portfolio.url}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs text-ink-soft shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/80 px-2 py-0.5 rounded-md border border-border">
                    {portfolio.template} Layout
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isDraft ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                  }`}>
                    {portfolio.status}
                  </span>
                  <div className="flex gap-4">
                    <span><strong>Views:</strong> {portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "891" : "1,247"}</span>
                    <span><strong>Clicks:</strong> {portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "189" : "342"}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-ink-soft" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
