import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Download,
  ExternalLink,
  Edit3,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  LayoutDashboard,
  BarChart3,
  Settings2,
  Globe,
  Sparkles,
  Share2,
} from "lucide-react";

import { PageShell } from "@/components/individual/PageShell";
import { StatusChip } from "@/components/ui/app-chrome";
import { usePortfolioDetail } from "@/hooks/usePortfolios";
import { DashboardPageSkeleton } from "@/components/skeletons";

import { OverviewTab } from "./ui/OverviewTab";
import { SettingsTab } from "./ui/SettingsTab";
import { TrafficTab } from "./ui/TrafficTab";
import { ShareModal } from "./ui/DashboardShared";

const tabs = [
  { id: "Overview", label: "Overview", icon: LayoutDashboard },
  { id: "Analytics", label: "Analytics", icon: BarChart3 },
  { id: "Settings", label: "Settings", icon: Settings2 },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("Overview");
  const [range, setRange] = useState("30D");
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const requestedId =
    searchParams.get("pid") ||
    searchParams.get("portfolioId") ||
    undefined;

  const { portfolio, loading, error } = usePortfolioDetail(requestedId);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Loading state
  if (loading) {
    return <DashboardPageSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 mb-4">
            <RefreshCw className="size-6" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Couldn't load portfolio dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Something went wrong while fetching your project details. Please verify your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-sm cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Reload Dashboard
          </button>
        </div>
      </PageShell>
    );
  }

  // Empty state
  if (!portfolio) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-4">
            <Sparkles className="size-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            No portfolio project found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            You haven't initialized this portfolio yet. Pick a template to create your stunning developer website.
          </p>
          <button
            onClick={() => navigate("/templates")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 shadow-lift cursor-pointer"
          >
            <Edit3 className="size-4" />
            Browse Templates & Create
          </button>
        </div>
      </PageShell>
    );
  }

  const liveSiteUrl = portfolio.liveUrl || (portfolio.domain ? `https://${portfolio.domain}` : "https://portfoliohub.dev/demo");

  return (
    <PageShell
      eyebrow="Dashboard"
      title={portfolio.title}
      subtitle={portfolio.description || "Manage deployments, view traffic analytics, and domain settings."}
    >
      <div className="space-y-6">
        {/* Share Modal */}
        <ShareModal
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          title={portfolio.title}
          url={liveSiteUrl}
        />

        {/* Ultra-Simple Tab & Action Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
          {/* Responsive Pill Tabs Navigation */}
          <div className="overflow-x-auto simple-scrollbar pb-0.5 sm:pb-0">
            <nav role="tablist" aria-label="Dashboard views" className="inline-flex p-1 gap-1.5 rounded-xl bg-card/60 border border-border/80 min-w-full sm:min-w-0">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-foreground text-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Icon className={`size-3.5 ${active ? "text-background" : "text-muted-foreground"}`} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Minimal Action Buttons (Share & Edit Site) */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-accent cursor-pointer"
            >
              <Share2 className="size-3.5 text-primary" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/templates")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-foreground px-4 py-1.5 text-xs font-semibold text-background shadow-sm transition-all hover:opacity-90 cursor-pointer active:scale-95"
            >
              <Edit3 className="size-3.5" />
              <span>Edit Site</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div role="tabpanel" className="mt-4">
          {tab === "Overview" && (
            <OverviewTab
              portfolio={portfolio}
              range={range}
              setRange={setRange}
              onShare={() => setShareOpen(true)}
            />
          )}

          {tab === "Analytics" && (
            <TrafficTab portfolioId={portfolio.id} />
          )}

          {tab === "Settings" && (
            <SettingsTab domain={portfolio.domain || "my-portfolio.com"} />
          )}
        </div>
      </div>
    </PageShell>
  );
}