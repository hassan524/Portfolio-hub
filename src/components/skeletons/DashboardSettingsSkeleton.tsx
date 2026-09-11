import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSettingsSkeleton() {
  return (
    <div className="w-full space-y-8 py-2 animate-in fade-in-50">
      {/* Domain Section Skeleton */}
      <section className="space-y-5 border-b border-border/40 pb-8">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-4 rounded-full bg-primary/30 shrink-0" />
          <div className="space-y-1">
            <Skeleton className="h-4.5 w-36 rounded bg-muted/90" />
            <Skeleton className="h-3 w-56 rounded bg-muted/50" />
          </div>
        </div>

        <div className="space-y-4 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-28 rounded bg-muted/80" />
              <Skeleton className="h-3 w-48 rounded bg-muted/50" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Skeleton className="h-8 w-full sm:w-56 rounded-xl bg-transparent border border-border/60" />
              <Skeleton className="h-8 w-16 rounded-xl bg-foreground/20 shrink-0" />
            </div>
          </div>

          <div className="pt-3 space-y-2.5">
            <Skeleton className="h-3.5 w-40 rounded bg-muted/60" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg border border-border/40">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-16 rounded bg-muted/50" />
                  <Skeleton className="h-4 w-24 rounded bg-muted/80" />
                </div>
                <Skeleton className="size-3.5 rounded bg-muted/50" />
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg border border-border/40">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-20 rounded bg-muted/50" />
                  <Skeleton className="h-4 w-32 rounded bg-muted/80" />
                </div>
                <Skeleton className="size-3.5 rounded bg-muted/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section Skeleton */}
      <section className="space-y-5 border-b border-border/40 pb-8">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-4 rounded-full bg-primary/30 shrink-0" />
          <div className="space-y-1">
            <Skeleton className="h-4.5 w-36 rounded bg-muted/90" />
            <Skeleton className="h-3 w-60 rounded bg-muted/50" />
          </div>
        </div>

        <div className="space-y-4 divide-y divide-border/30">
          {[1, 2, 3].map((i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded bg-muted/80" />
                <Skeleton className="h-3 w-64 rounded bg-muted/50" />
              </div>
              <Skeleton className="h-5 w-9 rounded-full bg-muted/60 shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
