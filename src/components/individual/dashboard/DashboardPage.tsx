import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Edit3,
  RefreshCw,
  LayoutDashboard,
  BarChart3,
  Settings2,
  Sparkles,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { usePortfolioDetail, usePortfolioOverview, usePortfolioTraffic } from "@/hooks/usePortfolios";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";

import { OverviewTab } from "./ui/OverviewTab";
import { SettingsTab } from "./ui/SettingsTab";
import { TrafficTab } from "./ui/TrafficTab";
import { ShareModal } from "./ui/ShareModal";

const tabs = [
  { id: "Overview", label: "Overview", icon: LayoutDashboard },
  { id: "Analytics", label: "Analytics", icon: BarChart3 },
  { id: "Settings", label: "Settings", icon: Settings2 },
] as const;

type Tab = (typeof tabs)[number]["id"];

export function DashboardPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();
  const { profile, authUser } = useAppContext();

  const [tab, setTab] = useState<Tab>("Overview");
  const [shareOpen, setShareOpen] = useState(false);

  const requestedId =
    searchParams.get("pid") ||
    searchParams.get("portfolioId") ||
    params.portfolioId ||
    undefined;

  const { portfolio, loading, error } = usePortfolioDetail(requestedId);

  const { overview, loading: overviewLoading } = usePortfolioOverview(portfolio?.id);
  const {
    totalViews,
    topSources,
    topPages,
    topCountries,
    loading: trafficLoading,
  } = usePortfolioTraffic(portfolio?.id);

  useEffect(() => {
    if (!overviewLoading && overview) {
      console.log("[DashboardPage] overview:", overview);
    }
  }, [overview, overviewLoading]);

  useEffect(() => {
    if (!trafficLoading) {
      console.log("[DashboardPage] traffic:", { totalViews, topSources, topPages, topCountries });
    }
  }, [totalViews, topSources, topPages, topCountries, trafficLoading]);

  // real error, not just "still loading" — this still gets its own screen
  if (error) {
    return (
      <DashboardFrame activeTab={tab} onTabChange={setTab}>
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <h1 className="text-xl font-semibold text-white">
            Couldn't load dashboard
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Something went wrong. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Reload
          </button>
        </div>
      </DashboardFrame>
    );
  }

  // genuinely no portfolio (fetch finished, nothing came back) — still its own screen
  if (!loading && !portfolio) {
    return (
      <DashboardFrame activeTab={tab} onTabChange={setTab}>
        <div className="mx-auto max-w-lg px-6 py-32 text-center">
          <Sparkles className="mx-auto size-6 text-white/30 mb-4" />
          <h1 className="text-xl font-semibold text-white">
            No portfolio found
          </h1>
          <p className="mt-3 text-sm text-white/40">
            You haven't created a portfolio yet. Pick a template to get started.
          </p>
          <button
            onClick={() => navigate("/templates")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-white/90 cursor-pointer"
          >
            Browse Templates
          </button>
        </div>
      </DashboardFrame>
    );
  }

  const liveSiteUrl = portfolio?.liveUrl || (portfolio?.domain ? `https://${portfolio.domain}` : "https://portfoliohub.dev/demo");

  return (
    <DashboardFrame
      activeTab={tab}
      onTabChange={setTab}
      title={portfolio?.title}
      description={portfolio?.description}
      logo={portfolio?.siteData?.logo}
      isLive={portfolio?.isDeployed}
      headerLoading={loading}
      onShare={() => setShareOpen(true)}
      onEdit={() => navigate("/templates")}
      userName={profile?.full_name || authUser?.email || "User"}
      userAvatar={profile?.avatarUrl}
    >
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        title={portfolio?.title || "Portfolio"}
        url={liveSiteUrl}
      />

      <div role="tabpanel">
        {tab === "Overview" && (
          <OverviewTab
            portfolio={overview}
            loading={overviewLoading || loading}
            onShare={() => setShareOpen(true)}
          />
        )}

        {tab === "Analytics" && (
          <TrafficTab
            portfolioId={portfolio?.id ?? ""}
            totalViews={totalViews}
            topSources={topSources}
            topPages={topPages}
            topCountries={topCountries}
            loading={trafficLoading || loading}
          />
        )}

        {tab === "Settings" && (
          <SettingsTab domain={portfolio?.domain || "my-portfolio.com"} />
        )}
      </div>
    </DashboardFrame>
  );
}

function DashboardFrame({
  activeTab,
  onTabChange,
  children,
  title,
  description,
  logo,
  isLive,
  headerLoading,
  onShare,
  onEdit,
  userName = "User",
  userAvatar,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  children: ReactNode;
  title?: string;
  description?: string | null;
  logo?: string | null;
  isLive?: boolean;
  headerLoading?: boolean;
  onShare?: () => void;
  onEdit?: () => void;
  userName?: string;
  userAvatar?: string | null;
}) {
  const [headerOpen, setHeaderOpen] = useState(false);
  const displayTitle = title || "Portfolio dashboard";

  const initials = displayTitle
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "PH";
  const userInitials = userName
    .split(/[ @._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-40 border-b border-white/[0.07] bg-black/95 backdrop-blur-md">
        <header>
          {/* Top Bar: Logo & Avatar */}
          <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2.5 sm:px-8">
            <Link to="/" className="shrink-0">
              <img
                src="/logo.png"
                alt="Portflu"
                className="h-7 w-auto object-contain"
              />
            </Link>

            {userAvatar ? (
              <img
                src={userAvatar}
                alt=""
                className="size-8 rounded-md object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="flex size-8 items-center justify-center rounded-md bg-white/10 text-[11px] font-semibold text-white/70 ring-1 ring-white/10">
                {userInitials}
              </div>
            )}
          </div>

          {/* Collapsible Row: Name, Live Badge, Description, Share & Edit buttons */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
              headerOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex items-start justify-between gap-3 px-4 py-3 sm:items-center sm:px-8 sm:py-3.5">
                <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
                  {headerLoading ? (
                    <Skeleton className="size-10 shrink-0 rounded-lg bg-white/[0.06] sm:size-11" />
                  ) : logo ? (
                    <img
                      src={logo}
                      alt=""
                      className="size-10 shrink-0 rounded-lg border border-white/10 object-cover sm:size-11"
                    />
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[11px] font-bold text-white ring-1 ring-white/10 sm:size-11">
                      {initials}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    {headerLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40 bg-white/[0.06]" />
                        <Skeleton className="h-3 w-56 bg-white/[0.06]" />
                      </div>
                    ) : (
                      <>
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <h1 className="truncate text-base font-semibold text-white sm:text-lg">
                            {displayTitle}
                          </h1>
                          {typeof isLive === "boolean" && (
                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-white/45">
                              <span
                                className={`size-1.5 rounded-full ${
                                  isLive ? "bg-[#86efac]" : "bg-white/30"
                                }`}
                              />
                              {isLive ? "Live" : "Draft"}
                            </span>
                          )}
                        </div>
                        {description && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/40 sm:line-clamp-1">
                            {description}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {(onShare || onEdit) && !headerLoading && (
                  <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    {onShare && (
                      <button
                        type="button"
                        onClick={onShare}
                        aria-label="Share portfolio"
                        className="inline-flex size-9 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white cursor-pointer sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3"
                      >
                        <Share2 className="size-4 sm:size-3.5" />
                        <span className="hidden sm:inline text-xs font-semibold">Share</span>
                      </button>
                    )}

                    {onEdit && (
                      <button
                        type="button"
                        onClick={onEdit}
                        aria-label="Edit portfolio"
                        className="inline-flex size-9 items-center justify-center rounded-md bg-white text-black transition-colors hover:bg-white/90 cursor-pointer sm:h-9 sm:w-auto sm:gap-1.5 sm:px-3"
                      >
                        <Edit3 className="size-4 sm:size-3.5" />
                        <span className="hidden sm:inline text-xs font-semibold">Edit</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Toggle button with icon at the bottom of the header */}
          <div className="flex items-center justify-end px-4 sm:px-8 sm:justify-center py-1">
            <button
              type="button"
              onClick={() => setHeaderOpen(!headerOpen)}
              aria-expanded={headerOpen}
              aria-label={headerOpen ? "Collapse header" : "Open header"}
              title={headerOpen ? "Collapse header" : "Open header"}
              className="flex items-center justify-center p-1 text-white/40 transition-colors hover:text-white cursor-pointer"
            >
              {headerOpen ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>
          </div>
        </header>

        {/* Tab row: well spaced and not attached directly to the top edge */}
        <div className="px-4 pt-3.5 pb-2.5 sm:px-8 sm:pt-4 sm:pb-3">
          <nav
            role="tablist"
            aria-label="Dashboard views"
            className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onTabChange(t.id)}
                  className={`relative shrink-0 pb-2 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? "text-white font-semibold"
                      : "text-white/35 hover:text-white/70"
                  }`}
                >
                  {t.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main>
        <div className="px-5 py-8 sm:px-8 sm:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}