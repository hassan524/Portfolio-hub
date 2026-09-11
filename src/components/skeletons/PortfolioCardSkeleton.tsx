import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioCardSkeleton() {
  return (
    <div className="group panel overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft space-y-0 transition-all">
      {/* Thumbnail Aspect Video Preview Canvas Skeleton */}
      <div className="relative aspect-video overflow-hidden bg-background/60 border-b border-border/60 p-4 flex flex-col justify-between">
        {/* Simulated Website Header in Preview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-full bg-muted/80" />
            <Skeleton className="h-3 w-20 rounded-md bg-muted/70" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-3 w-12 rounded bg-muted/50" />
            <Skeleton className="h-3 w-12 rounded bg-muted/50" />
          </div>
        </div>

        {/* Simulated Hero Text content in Preview */}
        <div className="space-y-2 py-2">
          <Skeleton className="h-4 w-3/4 rounded-md bg-muted/80" />
          <Skeleton className="h-3 w-1/2 rounded-md bg-muted/60" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="h-5 w-16 rounded-md bg-muted/70" />
            <Skeleton className="h-5 w-14 rounded-md bg-muted/40" />
          </div>
        </div>

        {/* Bottom preview overlay gradient effect */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent pointer-events-none" />
      </div>

      {/* Card Content Footer Skeleton */}
      <div className="p-5 space-y-3.5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4.5 w-2/3 rounded-lg bg-muted/90" />
            <Skeleton className="h-4 w-12 rounded-full bg-emerald-500/20 border-emerald-500/30" />
          </div>
          <Skeleton className="h-3.5 w-full rounded-md bg-muted/60" />
          <Skeleton className="h-3.5 w-4/5 rounded-md bg-muted/50" />
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Skeleton className="size-2 rounded-full bg-muted/80" />
            <Skeleton className="h-3 w-24 rounded bg-muted/60" />
          </div>
          <Skeleton className="h-3 w-16 rounded bg-muted/60" />
        </div>
      </div>
    </div>
  );
}
