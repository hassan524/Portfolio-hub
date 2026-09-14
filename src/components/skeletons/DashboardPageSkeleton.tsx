import { Skeleton } from "@/components/ui/skeleton";
import { DashboardOverviewSkeleton } from "./DashboardOverviewSkeleton";

function DarkSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={`rounded-md border-white/10 bg-white/10 ${className ?? ""}`}
    />
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-40 border-b border-white/[0.07] bg-black/95 backdrop-blur-md">
        <header>
          <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2.5 sm:px-8">
            <DarkSkeleton className="h-7 w-[88px] rounded-md" />
            <DarkSkeleton className="size-8 rounded-md" />
          </div>

          <div className="flex items-start justify-between gap-3 px-4 py-3.5 sm:items-center sm:px-8 sm:py-4">
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
              <DarkSkeleton className="size-10 shrink-0 rounded-lg sm:size-11" />
              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="flex items-center gap-2">
                  <DarkSkeleton className="h-5 w-40 max-w-[55vw] bg-white/15" />
                  <DarkSkeleton className="h-3 w-10 shrink-0" />
                </div>
                <DarkSkeleton className="h-3 w-full max-w-md" />
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <DarkSkeleton className="size-9 rounded-md" />
              <DarkSkeleton className="size-9 rounded-md bg-white/15" />
            </div>
          </div>
        </header>

        <nav className="flex gap-5 px-4 pt-3 sm:gap-6 sm:px-8 sm:pt-4">
          <DarkSkeleton className="mb-3 h-4 w-[72px] bg-white/15" />
          <DarkSkeleton className="mb-3 h-4 w-[72px]" />
          <DarkSkeleton className="mb-3 h-4 w-[64px]" />
        </nav>
      </div>

      <main>
        <div className="px-5 py-8 sm:px-8 sm:py-10">
          <DashboardOverviewSkeleton />
        </div>
      </main>
    </div>
  );
}
