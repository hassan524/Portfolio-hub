import { PageShell } from "@/components/individual/PageShell";
import { Skeleton } from "@/components/ui/skeleton";
import { TemplateCardSkeleton } from "./TemplateCardSkeleton";

export function TemplatesPageSkeleton() {
  return (
    <PageShell
      eyebrow="Templates"
      title="Choose a template"
      subtitle="Hand-designed layouts tuned for specific kinds of work. Production-ready on day one — pick one and start editing."
      containerClassName="mx-auto max-w-7xl px-6 py-10 md:py-14"
    >
      <div className="space-y-6">
        {/* Search & Category Filter Toolbar Skeleton */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full sm:max-w-xs rounded-full bg-card border border-border/80" />
          <Skeleton className="h-10 w-full sm:w-[220px] rounded-xl bg-card border border-border/80" />
        </div>

        {/* Templates Grid Skeleton (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <TemplateCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
