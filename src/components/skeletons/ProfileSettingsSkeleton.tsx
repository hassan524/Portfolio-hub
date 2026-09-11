import { PageShell } from "@/components/individual/PageShell";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSettingsSkeleton() {
  return (
    <PageShell
      eyebrow="Account"
      title="Profile Settings"
      subtitle="Manage your personal account preferences, authentication methods, and notification channels."
    >
      <div className="space-y-6 max-w-4xl animate-in fade-in-50">
        {/* Profile Details Card Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-6 shadow-soft">
          <div className="flex items-center gap-4 border-b border-border/60 pb-6">
            <Skeleton className="size-16 rounded-full bg-muted/80 shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 rounded-lg bg-muted/90" />
              <Skeleton className="h-3.5 w-64 rounded bg-muted/50" />
              <Skeleton className="h-8 w-32 rounded-xl bg-primary/20 border border-primary/30 mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded bg-muted/70" />
              <Skeleton className="h-10 w-full rounded-xl bg-background/80 border border-border/60" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-24 rounded bg-muted/70" />
              <Skeleton className="h-10 w-full rounded-xl bg-background/80 border border-border/60" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3.5 w-28 rounded bg-muted/70" />
            <Skeleton className="h-20 w-full rounded-xl bg-background/80 border border-border/60" />
          </div>

          <div className="flex justify-end pt-2">
            <Skeleton className="h-9 w-32 rounded-xl bg-primary/30" />
          </div>
        </div>

        {/* Security & Authentication Skeleton */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-soft">
          <div className="border-b border-border/60 pb-3 space-y-1">
            <Skeleton className="h-5 w-44 rounded-lg bg-muted/90" />
            <Skeleton className="h-3.5 w-72 rounded bg-muted/50" />
          </div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/60 bg-background/80">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 rounded bg-muted/80" />
                  <Skeleton className="h-3 w-56 rounded bg-muted/50" />
                </div>
                <Skeleton className="h-8 w-24 rounded-xl bg-surface border border-border/80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
