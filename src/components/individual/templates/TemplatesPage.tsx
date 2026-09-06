import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";
import { PortfolioCard } from "@/components/common/PortfolioCard";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  "Online Community",
] as const;

// 5 rows worth at the widest (3-col) breakpoint. Bump each "Show more" click by the same amount.
const PAGE_SIZE = 15;

export function TemplatesPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [dialogTemplate, setDialogTemplate] = useState<SiteData | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const getCategoryCount = (c: string) => {
    if (c === "All") return templates.length;
    return templates.filter((t) => t.category === c).length;
  };

  const filtered = useMemo(() => {
    let list = cat === "All" ? templates : templates.filter((t) => t.category === cat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      // NOTE: adjust these field names to whatever SiteData actually exposes
      // (e.g. t.title / t.name, t.description / t.tagline).
      list = list.filter((t: any) =>
        [t.name, t.title, t.description, t.tagline, t.category].filter(Boolean).some((v: string) => v.toLowerCase().includes(q))
      );
    }
    return list;
  }, [cat, query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const getPageTitle = () => {
    if (cat === "All") return "Choose a template";
    const suffix = cat.toLowerCase().includes("portfolio") ? "" : " Portfolio";
    const article = /^[aeiou]/i.test(cat) ? "an" : "a";
    return `Choose ${article} ${cat}${suffix}`;
  };

  // Reset pagination whenever the category or search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [cat, query]);

  const openEditor = (template: SiteData) => {
    setDialogTemplate(template);
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
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates"
          className="w-full rounded-full sm:max-w-xs"
        />

        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="h-8 w-[220px] max-w-full cursor-pointer rounded-sm bg-surface text-white">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="templates-category-select-content w-[var(--radix-select-trigger-width)] min-w-0 rounded-sm bg-surface text-white">
              <SelectItem value="All" className="cursor-pointer py-1.5">
              All categories ({getCategoryCount("All")})
            </SelectItem>
            {CATEGORY_ORDER.map((c) => (
              <SelectItem key={c} value={c} className="cursor-pointer py-1.5">
                {c} ({getCategoryCount(c)})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <PortfolioCard key={t.id} id={t.id} t={t} isCreated={false} onPreview={openEditor} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-ink-soft py-20">
            {query.trim() ? `No templates match “${query}”.` : "No templates in this category yet."}
          </div>
        )}

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              variant="outline"
              className="cursor-pointer rounded-full border-border bg-surface-elevated px-6 py-3 text-sm font-medium hover:bg-secondary"
            >
              Show more templates
            </Button>
          </div>
        )}

        <div className="mt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-5 md:px-6">
          <div>
            <h2 className="text-[15px] font-semibold">Don't see the one?</h2>
            <p className="mt-1 text-sm text-ink-soft">We ship new templates monthly. Request one and we'll notify you.</p>
          </div>
          <Button asChild className="cursor-pointer rounded-full bg-foreground px-5 text-background hover:opacity-90">
            <Link to="/contact">Request a template</Link>
          </Button>
        </div>
      </section>

      <TemplatePreviewDialog template={dialogTemplate} open={editorOpen} onClose={closeEditor} />
    </PageShell>
  );
}