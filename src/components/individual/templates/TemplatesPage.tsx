import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/common/Layout";
import { TemplateCard } from "@/components/common/TemplateCard";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import { templates, allCategories } from "@/data/templates";
import type { SiteData } from "@/types/builder.schema";

const CATEGORIES = ["All", ...allCategories] as const;

// 5 rows worth at the widest (3-col) breakpoint. Bump each "Show more" click by the same amount.
const PAGE_SIZE = 15;

export function TemplatesPage() {
  const [cat, setCat] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [dialogTemplate, setDialogTemplate] = useState<SiteData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = cat === "All" ? templates : templates.filter((t) => t.category === cat);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Reset pagination whenever the category filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cat]);

  const openPreview = (template: SiteData) => {
    setDialogTemplate(template);
    setDialogOpen(true);
  };

  const closePreview = () => {
    setDialogOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  return (
    <SiteLayout>
      <section className="border-b border-border bg-hero-glow">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Templates</span>
            <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
              Choose a template
            </h1>
            <p className="mt-6 text-lg text-ink-soft max-w-xl">
              Every template is designed by hand, tuned for a specific kind of work, and
              production-ready on day one.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "border border-border bg-surface-elevated hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <TemplateCard
              key={t.id}
              t={t}
              // index % PAGE_SIZE keeps the stagger delay short and resets each
              // batch, instead of climbing forever as more rows get appended.
              index={i % PAGE_SIZE}
              onPreview={openPreview}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-ink-soft py-20">No templates in this category yet.</div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="rounded-full cursor-pointer border border-border bg-surface-elevated px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors"
            >
              Show more templates
            </button>
          </div>
        )}

        <div className="mt-24 rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Don't see the one?</h2>
          <p className="mt-3 text-ink-soft max-w-lg mx-auto">
            We ship new templates every month. Request one and we'll notify you when it lands.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium"
          >
            Request a template
          </Link>
        </div>
      </section>

      <TemplatePreviewDialog
        template={dialogTemplate}
        open={dialogOpen}
        onClose={closePreview}
      />
    </SiteLayout>
  );
}