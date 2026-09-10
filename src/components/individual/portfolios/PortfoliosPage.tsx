import { Link } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";
import {PortfolioCard} from "@/components/common/PortfolioCard";
import { useAppContext } from "@/context/AppContext";
import { usePortfolios } from "@/hooks/usePortfolios";

const fmt = new Intl.NumberFormat("en-US");

export function PortfoliosPage() {
  const { authUser } = useAppContext();
  const { data: portfolios, isLoading, isError } = usePortfolios(authUser?.id);

  if (isLoading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center text-sm text-muted-foreground">
          Loading your portfolios…
        </div>
      </PageShell>
    );
  }

  if (isError) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center text-sm text-destructive">
          Couldn't load your portfolios. Try refreshing.
        </div>
      </PageShell>
    );
  }

  const list = portfolios ?? [];
  const live = list.filter((p) => p.status === "published").length;
  const hasPortfolios = list.length > 0;

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Workspace</p>
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground">
              Your portfolios, instrumented
            </h1>
            <p className="mt-2 max-w-[56ch] text-sm text-muted-foreground">
              {list.length} projects · {live} live
            </p>
          </div>
          {hasPortfolios && (
            <div className="flex gap-2">
              <Link
                to="/templates"
                className="rounded-full bg-surface px-4 py-2 text-sm text-foreground ring-1 ring-inset ring-border-strong transition-colors hover:bg-accent"
              >
                Browse more templates
              </Link>
              <Link
                to="/templates"
                className="flex items-center gap-2 rounded-full bg-secondary py-2 pl-3 pr-4 text-sm font-semibold text-secondary-foreground transition-[filter] hover:brightness-110"
              >
                <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New portfolio
              </Link>
            </div>
          )}
        </header>

        {hasPortfolios ? (
          <>
            <div className="mb-5 flex items-end justify-between">
              <h2 className="eyebrow">All projects</h2>
            </div>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {list.map((p) =>
                p.siteData ? (
                  <PortfolioCard
                    key={p.id}
                    id={p.id}
                    t={p.siteData}
                    description={p.description}
                    isCreated
                    lastEdited={new Date(p.updatedAt).toLocaleDateString()}
                    fmt={fmt}
                  />
                ) : null
              )}
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-dashed border-border-strong px-6 py-24 text-center">
            <svg
              className="size-32 text-subtle"
              fill="none"
              viewBox="0 0 200 160"
              stroke="currentColor"
            >
              <rect x="20" y="30" width="160" height="110" rx="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 60h160" />
              <circle cx="40" cy="45" r="3" fill="currentColor" stroke="none" />
              <circle cx="52" cy="45" r="3" fill="currentColor" stroke="none" />
              <circle cx="64" cy="45" r="3" fill="currentColor" stroke="none" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M55 100l20-20 15 15 30-30 20 20"
              />
            </svg>
            <div>
              <p className="text-base font-medium text-foreground">No portfolios yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first portfolio to see it show up here.
              </p>
            </div>
            <Link
              to="/templates"
              className="rounded-full bg-surface px-4 py-2 text-sm text-foreground ring-1 ring-inset ring-border-strong transition-colors hover:bg-accent"
            >
              Browse templates
            </Link>
          </div>
        )}
      </div>
    </PageShell>
  );
}