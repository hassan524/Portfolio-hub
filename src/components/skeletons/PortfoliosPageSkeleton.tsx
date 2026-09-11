import { PageShell } from "@/components/individual/PageShell";
import { Skeleton } from "@/components/ui/skeleton";
import { PortfolioCardSkeleton } from "./PortfolioCardSkeleton";

export function PortfoliosPageSkeleton() {
  return (
    <PageShell
      eyebrow="Portfolios"
      title="Your Portfolios"
      subtitle="Manage your portfolio websites, domain settings, and project builds."
    >
      <div className="space-y-6">
        {/* Responsive SaaS Control Toolbar Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
            {/* Search Input Placeholder */}
            <Skeleton className="h-9 w-full sm:w-64 rounded-xl bg-card border border-border/70" />

            {/* Counter Pills Placeholder */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <Skeleton className="h-8 w-24 rounded-lg bg-surface/80 border border-border/60" />
              <Skeleton className="h-8 w-20 rounded-lg bg-surface/80 border border-border/60" />
              <Skeleton className="h-8 w-20 rounded-lg bg-surface/80 border border-border/60" />
            </div>
          </div>

          {/* Action Button Placeholder */}
          <Skeleton className="h-9 w-40 rounded-xl bg-primary/20 border border-primary/30 self-end md:self-auto" />
        </div>

        {/* Portfolio Listing Grid Skeleton (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
          <PortfolioCardSkeleton />
        </div>
      </div>
    </PageShell>
  );
}
