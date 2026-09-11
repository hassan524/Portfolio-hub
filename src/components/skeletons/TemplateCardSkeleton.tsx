import { Skeleton } from "@/components/ui/skeleton";

export function TemplateCardSkeleton() {
  return (
    <div className="group panel overflow-hidden rounded-2xl border border-border/80 bg-card shadow-soft space-y-0">
      {/* Thumbnail Aspect Video Skeleton */}
      <div className="relative aspect-video overflow-hidden bg-background/60 border-b border-border/60 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24 rounded-full bg-muted/80" />
          <Skeleton className="h-4 w-4 rounded-full bg-muted/60" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-lg bg-muted/80" />
          <Skeleton className="h-3.5 w-1/2 rounded-md bg-muted/60" />
        </div>
      </div>

      {/* Footer Info Skeleton */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4.5 w-2/3 rounded-lg bg-muted/90" />
          <Skeleton className="h-4 w-12 rounded-full bg-primary/20" />
        </div>
        <Skeleton className="h-3.5 w-full rounded-md bg-muted/60" />
        <Skeleton className="h-3.5 w-4/5 rounded-md bg-muted/50" />
      </div>
    </div>
  );
}
