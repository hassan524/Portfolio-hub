import { useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";
import { PortfolioCard } from "@/components/common/PortfolioCard";
import { PortfoliosPageSkeleton } from "@/components/skeletons";
import { useAppContext } from "@/context/AppContext";
import { usePortfolios } from "@/hooks/usePortfolios";
import { FolderGit2, ArrowRight, LayoutGrid, Search, Layers } from "lucide-react";

const fmt = new Intl.NumberFormat("en-US");

export function PortfoliosPage() {
  const { authUser } = useAppContext();
  const { data: portfolios, isLoading, isError } = usePortfolios(authUser?.id);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return <PortfoliosPageSkeleton />;
  }

  if (isError) {
    return (
      <PageShell
        eyebrow="Portfolios"
        title="Your Portfolios"
        subtitle="Manage your portfolio websites, domain settings, and project builds."
      >
        <div className="py-16 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 mb-4">
            <FolderGit2 className="size-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Couldn't load portfolios</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">Something went wrong while fetching your project workspace.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-sm cursor-pointer"
          >
            Retry Loading
          </button>
        </div>
      </PageShell>
    );
  }

  const list = portfolios ?? [];
  const liveCount = list.filter((p) => p.isDeployed).length;
  const draftCount = list.length - liveCount;

  const filteredList = searchQuery.trim()
    ? list.filter((p) => {
        const nameMatch = p.siteData?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const descMatch = p.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatch || descMatch;
      })
    : list;

  const hasPortfolios = list.length > 0;

  return (
    <PageShell
      eyebrow="Portfolios"
      title="Your Portfolios"
      subtitle="Manage your portfolio websites, domain settings, and project builds."
    >
      <div className="space-y-6">
        {/* Sleek SaaS Control Toolbar & Top Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {hasPortfolios && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-2xl">
              {/* Search Filter Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter portfolios..."
                  className="w-full rounded-xl border border-border/70 bg-surface/80 pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              {/* Counter Pills */}
              <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground shrink-0 overflow-x-auto">
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-2.5 py-1.5">
                  <Layers className="size-3 text-muted-foreground" />
                  <span>Total: <strong className="text-foreground font-semibold">{list.length}</strong></span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-2.5 py-1.5">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                  </span>
                  <span>Live: <strong className="text-foreground font-semibold">{liveCount}</strong></span>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-surface/60 px-2.5 py-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/40" />
                  <span>Drafts: <strong className="text-foreground font-semibold">{draftCount}</strong></span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lift transition-all hover:opacity-95 cursor-pointer active:scale-95"
            >
              <LayoutGrid className="size-4" />
              <span>Browse Portfolios</span>
            </Link>
          </div>
        </div>

        {/* Portfolio Listing Grid */}
        {hasPortfolios ? (
          <section className="space-y-4">
            {filteredList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredList.map((p) =>
                  p.siteData ? (
                    <PortfolioCard
                      key={p.id}
                      id={p.id}
                      t={p.siteData}
                      description={p.description || "Developer portfolio project."}
                      isCreated
                      lastEdited={new Date(p.updatedAt).toLocaleDateString()}
                      fmt={fmt}
                    />
                  ) : null
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No portfolios found matching "{searchQuery}".
              </div>
            )}
          </section>
        ) : (
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-border/80 bg-card/40 p-12 text-center shadow-soft">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground border border-border mb-4">
              <FolderGit2 className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No Portfolios Found</h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              You haven't created any portfolios yet. Browse our templates to get started.
            </p>
            <Link
              to="/templates"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lift transition-all hover:opacity-95 cursor-pointer"
            >
              <LayoutGrid className="size-4" />
              <span>Browse Portfolios</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}