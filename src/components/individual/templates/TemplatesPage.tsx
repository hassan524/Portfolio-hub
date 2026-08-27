import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";
import { PortfolioCard } from "@/components/common/PortfolioCard";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import { TemplateFullPreview } from "@/components/editor/TemplateFullPreview";
import { templates, allCategories } from "@/data/templates";
import type { SiteData } from "@/types/builder.schema";

const CATEGORY_ORDER = [
  "Developer Portfolio",
  "Designer Portfolio",
  "Creative Portfolio",
  "Personal Brand",
  "SaaS Product",
  "AI Product",
  "Startup",
  "Mobile App",
  "Digital Agency",
  "Marketing Agency",
  "Business / Company",
  "Clothing Brand",
  "Streetwear Brand",
  "Beauty & Cosmetics",
  "Skincare Brand",
  "Perfume Brand",
  "Jewelry Brand",
  "Food Brand",
  "Restaurant",
  "Cafe / Coffee Shop",
  "Bakery",
  "Photography Portfolio",
  "Content Creator",
  "Music Artist / Band",
  "Architecture Studio",
  "Interior Design Studio",
  "Real Estate Brand",
  "Fitness Brand / Gym",
  "Travel Brand / Agency",
  "Wedding Website",
  "Event / Conference",
  "Online Community"
] as const;

const CATEGORIES = ["All", ...CATEGORY_ORDER];

// 5 rows worth at the widest (3-col) breakpoint. Bump each "Show more" click by the same amount.
const PAGE_SIZE = 15;

export function TemplatesPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [dialogTemplate, setDialogTemplate] = useState<SiteData | null>(null);

  // Two-step flow: full-site scroll preview first, then the live editor dialog.
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const filtered = cat === "All" ? templates : templates.filter((t) => t.category === cat);
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const getCategoryCount = (c: string) => {
    if (c === "All") return templates.length;
    return templates.filter((t) => t.category === c).length;
  };

  const getPageTitle = () => {
    if (cat === "All") return "Choose a template";
    const suffix = cat.toLowerCase().includes("portfolio") ? "" : " Portfolio";
    return `Choose a ${cat}${suffix}`;
  };

  // Reset pagination whenever the category filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cat]);

  const openFullPreview = (template: SiteData) => {
    setDialogTemplate(template);
    setFullPreviewOpen(true);
  };

  const closeFullPreview = () => {
    setFullPreviewOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  const continueToEditor = (template: SiteData) => {
    setDialogTemplate(template);
    setFullPreviewOpen(false);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  return (
    <PageShell
      eyebrow="Templates"
      title={getPageTitle()}
      subtitle="Hand-designed layouts tuned for specific kinds of work. Production-ready on day one — pick one and start editing."
      containerClassName="mx-auto max-w-7xl px-6 py-10 md:py-14"
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const count = getCategoryCount(c);
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                cat === c
                  ? "bg-foreground text-background"
                  : "border border-border bg-surface-elevated hover:bg-secondary"
              }`}
            >
              {c} ({count})
            </button>
          );
        })}
      </div>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <PortfolioCard
              key={t.id}
              id={t.id}
              t={t}
              isCreated={false}
              onPreview={openFullPreview}
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

        <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-5 md:px-6">
          <div>
            <h2 className="text-[15px] font-semibold">Don't see the one?</h2>
            <p className="mt-1 text-sm text-ink-soft">
              We ship new templates monthly. Request one and we'll notify you.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Request a template
          </Link>
        </div>
      </section>

      <TemplateFullPreview
        site={dialogTemplate}
        open={fullPreviewOpen}
        onClose={closeFullPreview}
        onContinue={continueToEditor}
      />

      <TemplatePreviewDialog
        template={dialogTemplate}
        open={editorOpen}
        onClose={closeEditor}
      />
    </PageShell>
  );
}