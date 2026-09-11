import { Skeleton } from "@/components/ui/skeleton";

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Metric Band Cards Skeleton */}
      <section className="space-y-3">
        <Skeleton className="h-4 w-48 rounded bg-muted/60" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/80 bg-card p-4 space-y-3 shadow-soft"
            >
              <Skeleton className="h-3 w-24 rounded bg-muted/60" />
              <div className="flex items-baseline justify-between pt-1">
                <Skeleton className="h-7 w-20 sm:w-28 rounded-lg bg-muted/80" />
                <Skeleton className="h-4 w-10 rounded-full bg-muted/50" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid: Pipeline, Overview & Deploy History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Deployment Pipeline & History */}
        <section className="lg:col-span-7 space-y-6">
          {/* Deployment Pipeline Skeleton Card */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-4">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-40 rounded-lg bg-muted/90" />
                <Skeleton className="h-3.5 w-60 rounded bg-muted/50" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full bg-emerald-500/20 border-emerald-500/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/60 bg-background/80 p-4 space-y-2">
                <Skeleton className="h-4 w-28 rounded bg-muted/80" />
                <Skeleton className="h-4.5 w-36 rounded-md bg-muted/70" />
                <Skeleton className="h-3 w-32 rounded bg-muted/50" />
              </div>

              <div className="rounded-xl border border-border/60 bg-background/80 p-4 space-y-2">
                <Skeleton className="h-4 w-28 rounded bg-muted/80" />
                <Skeleton className="h-4.5 w-36 rounded-md bg-muted/70" />
                <Skeleton className="h-3 w-32 rounded bg-muted/50" />
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/80 p-4 flex flex-wrap items-center justify-between gap-2">
              <Skeleton className="h-4 w-28 rounded bg-muted/80" />
              <Skeleton className="h-6 w-32 rounded-lg bg-muted/60" />
            </div>
          </div>

          {/* Recent Deploys History Skeleton */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <Skeleton className="h-5 w-32 rounded-lg bg-muted/90" />
              <Skeleton className="h-4 w-16 rounded bg-muted/50" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3.5 gap-2"
                >
                  <div className="space-y-1.5 flex-1 pr-4">
                    <Skeleton className="h-4 w-full sm:w-3/4 rounded-md bg-muted/80" />
                    <Skeleton className="h-3 w-1/3 rounded bg-muted/50" />
                  </div>
                  <Skeleton className="h-3.5 w-16 rounded bg-muted/50 self-end sm:self-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column: Project Overview Specs & Shortcuts Skeleton */}
        <section className="lg:col-span-5 space-y-6">
          {/* Project Details Specs Skeleton */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-5 shadow-soft">
            <div className="border-b border-border/60 pb-4 space-y-1.5">
              <Skeleton className="h-5 w-36 rounded-lg bg-muted/90" />
              <Skeleton className="h-3.5 w-48 rounded bg-muted/50" />
            </div>

            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5">
                  <Skeleton className="h-3.5 w-28 rounded bg-muted/70" />
                  <Skeleton className="h-4 w-32 rounded-md bg-muted/80" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts Skeleton */}
          <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-soft">
            <Skeleton className="h-4.5 w-28 rounded bg-muted/90" />
            <div className="space-y-2.5">
              <Skeleton className="h-11 w-full rounded-xl bg-background/80 border border-border/60" />
              <Skeleton className="h-11 w-full rounded-xl bg-background/80 border border-border/60" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
