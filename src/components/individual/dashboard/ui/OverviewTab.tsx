import { MetricBand } from "./DashboardShared";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { PortfolioOverview } from "@/types/portfolio";

interface OverviewTabProps {
  portfolio?: PortfolioOverview | null;
  loading?: boolean;
  onShare?: () => void;
}

function formatRelativeTime(iso?: string | null) {
  if (!iso) return null;
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <span className="text-white/40">{label}</span>
      <span className="font-medium text-white/80">{value}</span>
    </div>
  );
}

function DeploymentSkeletonRow() {
  return (
    <div className="relative flex gap-4">
      <Skeleton className="mt-2 size-2.5 shrink-0 rounded-full bg-white/[0.06]" />
      <div className="flex-1 rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5 space-y-2">
        <Skeleton className="h-3.5 w-3/4 bg-white/[0.06]" />
        <Skeleton className="h-3 w-1/3 bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function OverviewTab({ portfolio, loading, onShare }: OverviewTabProps) {
  const navigate = useNavigate();

  const liveUrl = portfolio?.liveUrl || "https://portfoliohub.dev/demo";

  const platformLabel =
    portfolio?.platform === "vercel"
      ? "Vercel Edge"
      : portfolio?.platform === "netlify"
        ? "Netlify CDN"
        : "Not deployed yet";

  const responseLabel =
    portfolio?.avgResponseMs != null ? `${portfolio.avgResponseMs}ms avg response` : "No data yet";

  const sslActive = !!(portfolio?.isDeployed && portfolio?.liveUrl?.startsWith("https://"));

  const deployments = portfolio?.deployments ?? [];

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <section className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
          Performance
        </h3>
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 space-y-2">
                <Skeleton className="h-3 w-16 bg-white/[0.06]" />
                <Skeleton className="h-6 w-20 bg-white/[0.06]" />
              </div>
            ))}
          </div>
        ) : (
          <MetricBand
            totalViews={Number(portfolio?.totalViews) || 0}
            isDeployed={portfolio?.isDeployed ?? false}
            liveUrl={portfolio?.liveUrl ?? null}
            updatedAt={portfolio?.updatedAt ?? new Date().toISOString()}
          />
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Left Column */}
        <section className="lg:col-span-7 space-y-6 lg:space-y-8">
          {/* Hosting & Infrastructure */}
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-semibold text-white">Hosting & Infrastructure</h3>
                <p className="text-xs text-white/30 mt-1">Where and how your site runs</p>
              </div>
              {portfolio?.isDeployed && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#86efac]">
                  <span className="size-1.5 rounded-full bg-[#86efac]" />
                  Healthy
                </span>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                    <Skeleton className="h-3 w-20 bg-white/[0.06]" />
                    <Skeleton className="h-4 w-28 bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                  <p className="text-xs font-medium text-white/50">Cloud Provider</p>
                  <p className="text-sm font-medium text-white/85">{platformLabel}</p>
                </div>

                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                  <p className="text-xs font-medium text-white/50">Response Time</p>
                  <p className="text-sm font-medium text-white/85">{responseLabel}</p>
                </div>

                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                  <p className="text-xs font-medium text-white/50">Tech Stack</p>
                  <p className="text-sm font-medium text-white/85">React + Vite</p>
                </div>

                <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-1.5">
                  <p className="text-xs font-medium text-white/50">Encryption</p>
                  <p className="text-sm font-medium text-white/85">
                    {sslActive ? "HTTPS / TLS" : "Not active"}
                  </p>
                </div>
              </div>
            )}

            <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-white/50 shrink-0">Live URL</span>
              {loading ? (
                <Skeleton className="h-3.5 w-40 bg-white/[0.06]" />
              ) : (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-white/60 hover:text-white/90 truncate"
                >
                  {liveUrl.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          {/* Deploy History */}
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white">Release History</h3>
              {!loading && (
                <span className="text-xs text-white/25 font-mono">
                  {deployments.length} deploys
                </span>
              )}
            </div>

            {loading ? (
              <div className="space-y-4">
                <DeploymentSkeletonRow />
                <DeploymentSkeletonRow />
                <DeploymentSkeletonRow />
              </div>
            ) : deployments.length === 0 ? (
              <p className="text-xs text-white/25">No deployments yet.</p>
            ) : (
              <ol className="space-y-4">
                {deployments.map((event, i) => (
                  <li key={event.id} className="relative flex gap-4">
                    {i !== deployments.length - 1 && (
                      <span className="absolute left-[5px] top-4 h-[calc(100%+16px)] w-px bg-white/[0.06]" />
                    )}
                    <span
                      className={`relative mt-2 size-2.5 shrink-0 rounded-full ${event.status === "success"
                        ? "bg-[#86efac]"
                        : event.status === "failed"
                          ? "bg-red-400"
                          : "bg-amber-300"
                        }`}
                    />
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm gap-2 min-w-0">
                      <div className="min-w-0 pr-2">
                        <p className="text-sm text-white/70 leading-snug truncate">
                          {event.message || "Site deployment update"}
                        </p>
                        {event.url && (
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-white/25 mt-1 hover:text-white/50 truncate block"
                          >
                            {event.url.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                      <span className="font-mono text-xs text-white/25 shrink-0">
                        {formatRelativeTime(event.createdAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section >

        {/* Right Column */}
        < section className="lg:col-span-5 space-y-6 lg:space-y-8" >
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <div className="pb-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-semibold text-white">Project Details</h3>
              <p className="text-xs text-white/30 mt-1">Configuration</p>
            </div>

            {loading ? (
              <div className="space-y-3 py-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-3 w-16 bg-white/[0.06]" />
                    <Skeleton className="h-3 w-24 bg-white/[0.06]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-white/[0.05]">
                <DetailRow label="Category" value={portfolio?.category || "—"} />
                <DetailRow label="Created" value={formatDate(portfolio?.createdAt)} />
                <DetailRow label="Updated" value={formatDate(portfolio?.updatedAt)} />
                <DetailRow label="Hosting" value={platformLabel} />
                <DetailRow label="Domain" value={portfolio?.domain || "—"} />
              </div>
            )}
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/templates")}
                className="flex w-full items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white/80 transition-colors cursor-pointer"
              >
                Edit Theme & Layout
                <ArrowUpRight className="size-3.5 text-white/20" />
              </button>
              <a

                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white/80 transition-colors cursor-pointer"
              >
                View Live Site
                <ExternalLink className="size-3.5 text-white/20" />
              </a>

              <button
                type="button"
                onClick={() =>
                  alert(`Exporting source code bundle for "${portfolio?.title || "Portfolio"}"...`)
                }
                className="flex w-full items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm text-white/60 hover:bg-white/[0.05] hover:text-white/80 transition-colors cursor-pointer"
              >
                Export Code (ZIP)
                <ArrowUpRight className="size-3.5 text-white/20" />
              </button>
            </div>
          </div >
        </section >
      </div >
    </div >
  );
}