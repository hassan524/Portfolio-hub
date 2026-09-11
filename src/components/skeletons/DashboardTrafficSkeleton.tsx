import { Skeleton } from "@/components/ui/skeleton";

export function DashboardTrafficSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      {/* Header & Range Toggle Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-64 rounded-lg bg-muted/90" />
          <Skeleton className="h-3.5 w-80 rounded bg-muted/50" />
        </div>
        <Skeleton className="h-9 w-64 rounded-xl bg-card border border-border/80" />
      </div>

      {/* Main Chart Section Skeleton */}
      <section className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="space-y-1">
            <Skeleton className="h-5 w-36 rounded-lg bg-muted/90" />
            <Skeleton className="h-3.5 w-48 rounded bg-muted/50" />
          </div>
          <Skeleton className="h-5 w-28 rounded-full bg-muted/40" />
        </div>

        {/* Simulated Chart Visual Skeleton */}
        <div className="h-64 sm:h-72 w-full rounded-xl bg-background/60 border border-border/40 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-muted-foreground/40">
            <Skeleton className="h-3 w-10 rounded bg-muted/40" />
            <Skeleton className="h-px w-full mx-3 bg-border/40" />
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground/40">
            <Skeleton className="h-3 w-10 rounded bg-muted/40" />
            <Skeleton className="h-px w-full mx-3 bg-border/40" />
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground/40">
            <Skeleton className="h-3 w-10 rounded bg-muted/40" />
            <Skeleton className="h-px w-full mx-3 bg-border/40" />
          </div>
          {/* Simulated Waveform Bars */}
          <div className="flex items-end justify-between gap-2 h-32 pt-4 px-4">
            {[40, 65, 30, 85, 50, 95, 70, 45, 80, 60, 90, 75].map((h, idx) => (
              <div key={idx} className="w-full flex flex-col items-center gap-2">
                <Skeleton
                  className="w-full rounded-t-md bg-indigo-500/30"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid: Top Referrers & Visited Routes Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-6 rounded-2xl border border-border/80 bg-surface/90 p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3 space-y-1">
            <Skeleton className="h-4.5 w-40 rounded bg-muted/90" />
            <Skeleton className="h-3 w-32 rounded bg-muted/50" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-1">
                <Skeleton className="h-4 w-32 rounded bg-muted/80" />
                <Skeleton className="h-3.5 w-16 rounded bg-muted/60" />
                <Skeleton className="h-3 w-20 rounded-full bg-muted/40" />
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-6 rounded-2xl border border-border/80 bg-surface/90 p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3 space-y-1">
            <Skeleton className="h-4.5 w-40 rounded bg-muted/90" />
            <Skeleton className="h-3 w-32 rounded bg-muted/50" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-1">
                <Skeleton className="h-4 w-36 rounded bg-muted/80" />
                <Skeleton className="h-3.5 w-20 rounded bg-muted/60" />
              </div>
            ))}
          </div>
        </section>

        {/* Geographic Distribution Skeleton */}
        <section className="col-span-12 rounded-2xl border border-border/80 bg-surface/90 p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3 space-y-1">
            <Skeleton className="h-4.5 w-44 rounded bg-muted/90" />
            <Skeleton className="h-3 w-36 rounded bg-muted/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-1">
                <Skeleton className="h-4 w-32 rounded bg-muted/80" />
                <Skeleton className="h-3 w-28 rounded-full bg-muted/40" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
