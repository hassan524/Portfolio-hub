import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse animate-skeleton-shimmer rounded-xl bg-muted/50 border border-border/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

