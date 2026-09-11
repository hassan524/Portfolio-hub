import { PageShell } from "@/components/individual/PageShell";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardOverviewSkeleton } from "./DashboardOverviewSkeleton";

export function DashboardPageSkeleton() {
  return (
    <PageShell
      eyebrow="Dashboard"
      title="Loading Portfolio..."
      subtitle="Fetching portfolio telemetry, custom domain routes, and deployment status."
    >
      <div className="space-y-6">
        {/* Simplified Dashboard Header Bar Skeleton */}
        <div className="flex flex-col min-[480px]:flex-row min-[480px]:items-center justify-between gap-3 pb-3 border-b border-border/50">
          {/* Status & Live URL Skeleton */}
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-6 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
            <Skeleton className="h-7 w-40 sm:w-56 rounded-lg bg-surface/60 border border-border/60" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-2 shrink-0 self-end min-[480px]:self-auto">
            <Skeleton className="h-8 w-20 rounded-xl bg-card border border-border/70" />
            <Skeleton className="h-8 w-24 rounded-xl bg-foreground/20" />
          </div>
        </div>

        {/* Tab Navigation Pill Bar Skeleton */}
        <div className="overflow-x-auto simple-scrollbar pb-1">
          <div className="inline-flex p-1.5 gap-2 rounded-2xl bg-card border border-border/80 shadow-soft min-w-full sm:min-w-0">
            <Skeleton className="h-8.5 w-28 rounded-xl bg-foreground/20" />
            <Skeleton className="h-8.5 w-28 rounded-xl bg-muted/40" />
            <Skeleton className="h-8.5 w-28 rounded-xl bg-muted/40" />
          </div>
        </div>

        {/* Main Dashboard Content Active Tab Skeleton */}
        <DashboardOverviewSkeleton />
      </div>
    </PageShell>
  );
}
