import { useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Download, ExternalLink, Edit3 } from "lucide-react";

import { PageShell } from "@/components/individual/PageShell";
import { StatusChip } from "@/components/ui/app-chrome";
import { usePortfolioDetail } from "@/hooks/usePortfolios";

import { OverviewTab } from "./ui/OverviewTab";
import { SettingsTab } from "./ui/SettingsTab";
import { TrafficTab } from "./ui/TrafficTab";

const tabs = ["Overview", "Analytics", "Settings"] as const;

type Tab = (typeof tabs)[number];

export function DashboardPage() {
  const params = useParams<{ pid?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("Overview");
  const [range, setRange] = useState("30D");

  const requestedId = params.pid || searchParams.get("portfolioId") || undefined;

  const { portfolio, loading, error } = usePortfolioDetail(requestedId);

  // Loading state
  if (loading) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm text-muted-foreground">
            Loading your portfolio…
          </p>
        </div>
      </PageShell>
    );
  }

  // Error state
  if (error) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <p className="text-sm text-destructive">
            Couldn't load this portfolio. Try refreshing.
          </p>
        </div>
      </PageShell>
    );
  }

  if (!portfolio) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-medium text-foreground">
            No portfolio found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Get started by creating your first portfolio project.
          </p>

          <button
            onClick={() => navigate("/templates")}
            className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90 cursor-pointer"
          >
            Browse templates
          </button>
        </div>
      </PageShell>
    );
  }

  const liveSiteUrl = portfolio.liveUrl || null;

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* =====================================================
            PROJECT HEADER
        ====================================================== */}
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
          {/* Portfolio information */}
          <div className="max-w-2xl space-y-2">
            {/* Status + Domain */}
            <div className="flex items-center gap-3">
              <StatusChip state={portfolio.status} />

              {portfolio.domain && liveSiteUrl && (
                <a
                  href={liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {portfolio.domain}

                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>

            {/* Portfolio title */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {portfolio.title}
            </h1>

            {/* Portfolio description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {portfolio.description ||
                "Personal developer portfolio and project showcase environment."}
            </p>
          </div>

          {/* =====================================================
              ACTION BUTTONS
          ====================================================== */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View live site */}
            {portfolio.domain && liveSiteUrl && (
              <a
                href={liveSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent cursor-pointer"
              >
                <ExternalLink className="size-3.5" />

                View live site
              </a>
            )}

            {/* Open editor */}
            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent cursor-pointer"
            >
              <Edit3 className="size-3.5" />

              Open editor
            </button>

            {/* Export code */}
            <button
              type="button"
              onClick={() =>
                alert(
                  `Exporting source code for ${portfolio.title}... ZIP bundle created.`
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90 cursor-pointer"
            >
              <Download className="size-3.5" />

              Export Code
            </button>
          </div>
        </header>

        {/* =====================================================
            TABS
        ====================================================== */}
        <div className="border-b border-border">
          <nav className="flex gap-6 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`-mb-px cursor-pointer border-b-2 py-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "border-primary font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>

        {/* =====================================================
            TAB CONTENT
        ====================================================== */}
        <div>
          {/* Overview */}
          {tab === "Overview" && (
            <OverviewTab
              portfolio={portfolio}
              range={range}
              setRange={setRange}
            />
          )}

          {/* Analytics */}
          {tab === "Analytics" && (
            <TrafficTab
              portfolioId={portfolio.id}
            />
          )}

          {/* Settings */}
          {tab === "Settings" && (
            <SettingsTab
              domain={portfolio.domain}
            />
          )}
        </div>
      </main>
    </PageShell>
  );
}