import { Skeleton } from "@/components/ui/skeleton";

function DarkSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={`rounded-md border-white/10 bg-white/10 ${className ?? ""}`}
    />
  );
}

export function DashboardOverviewSkeleton() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <DarkSkeleton className="h-3 w-24 bg-white/15" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <DarkSkeleton className="h-3 w-20" />
              <div className="mt-3 flex items-end justify-between gap-2">
                <DarkSkeleton className="h-7 w-20 bg-white/15 sm:w-24" />
                <DarkSkeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        <section className="space-y-6 lg:col-span-7 lg:space-y-8">
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
              <div className="space-y-2">
                <DarkSkeleton className="h-4 w-36 bg-white/15" />
                <DarkSkeleton className="h-3 w-48" />
              </div>
              <DarkSkeleton className="h-3 w-14 shrink-0" />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <DarkSkeleton className="h-3 w-24" />
                  <DarkSkeleton className="mt-2 h-4 w-32 bg-white/15" />
                  <DarkSkeleton className="mt-2 h-3 w-28" />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] p-4">
              <DarkSkeleton className="h-3 w-24" />
              <DarkSkeleton className="h-3 w-32" />
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <DarkSkeleton className="h-4 w-32 bg-white/15" />
              <DarkSkeleton className="h-3 w-16" />
            </div>

            <div className="mt-5 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5"
                >
                  <DarkSkeleton className="h-4 w-full max-w-md bg-white/15" />
                  <DarkSkeleton className="mt-2 h-3 w-28" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6 lg:col-span-5 lg:space-y-8">
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <div className="space-y-2 border-b border-white/[0.06] pb-4">
              <DarkSkeleton className="h-4 w-32 bg-white/15" />
              <DarkSkeleton className="h-3 w-40" />
            </div>

            <div className="mt-4 divide-y divide-white/[0.05]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <DarkSkeleton className="h-3 w-24" />
                  <DarkSkeleton className="h-3 w-28 bg-white/15" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6">
            <DarkSkeleton className="h-4 w-28 bg-white/15" />
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map((i) => (
                <DarkSkeleton key={i} className="h-11 w-full rounded-md" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
