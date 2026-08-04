import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  BarChart3,
  Video,
  Code,
  ExternalLink,
  Copy,
  ArrowLeft,
  Sparkles,
  Sliders,
  Loader2,
  LogOut
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useConfirm } from "@/context/ConfirmationContext";
import { type Portfolio } from "./types";
import { useDashboardData } from "@/hooks/useDashboardData";

// Sub-panels
import { AnalyticsPanel } from "./AnalyticsPanel";
import { DomainPanel } from "./DomainPanel";
import { EditPanel } from "./EditPanel";
import { SharePanel } from "./SharePanel";
import { ExportPanel } from "./ExportPanel";

// Modular UI Components
import { DashboardSidebar } from "./DashboardSidebar";
import { MobileHeader } from "./MobileHeader";
import { MobileSidebar } from "./MobileSidebar";
import { CreatePortfolioModal } from "./CreatePortfolioModal";
import { PortfoliosOverview } from "./PortfoliosOverview";

function TabLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-3xl border border-border bg-surface-elevated/45 p-6 h-32 flex flex-col justify-between">
            <div className="h-3 w-16 bg-border/50 rounded" />
            <div className="h-8 w-24 bg-border/50 rounded" />
            <div className="h-3 w-32 bg-border/50 rounded" />
          </div>
        ))}
      </div>
      {/* Chart Skeleton */}
      <div className="rounded-3xl border border-border bg-surface-elevated/45 p-6 h-[380px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-border/50 rounded" />
          <div className="h-3 w-32 bg-border/50 rounded" />
        </div>
        <div className="flex-1 my-6 bg-border/20 rounded-2xl flex items-end justify-between p-6 gap-4">
          {[40, 60, 45, 80, 50, 70, 65].map((h, i) => (
            <div key={i} className="flex-1 bg-border/30 rounded-t-lg" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="h-3 w-40 bg-border/50 mx-auto rounded" />
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { session, signOut, user } = useAppContext();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPortfolioId = searchParams.get("portfolioId");
  const activeTab = searchParams.get("tab") || (selectedPortfolioId ? "analytics" : undefined);
  const createParam = searchParams.get("create");
  const templateParam = searchParams.get("template") || undefined;

  const {
    portfolios,
    isLoadingPortfolios,
    portfolioDetails,
    isLoadingDetails,
    tabData,
    isLoadingTab,
    isFetchingTab,
    updatePortfolio,
    deletePortfolio,
    createPortfolio
  } = useDashboardData(selectedPortfolioId, activeTab || "analytics");

  const setSelectedPortfolioId = (id: string | null) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (id) {
        next.set("portfolioId", id);
        if (!next.get("tab")) next.set("tab", "analytics");
      } else {
        next.delete("portfolioId");
        next.delete("tab");
      }
      return next;
    });
  };

  const setActiveTab = (tab: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tab);
      return next;
    });
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Creation modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    if (createParam === "true") {
      setCreateModalOpen(true);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("create");
        next.delete("template");
        return next;
      });
    }
  }, [createParam, setSearchParams]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand mx-auto shadow-lift animate-pulse">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-6 font-display text-3xl">Sign in to continue</h1>
          <p className="mt-3 text-ink-soft">You need to be logged in to access your portfolios.</p>
          <div className="mt-8 flex gap-3 justify-center">
            <Link to="/auth/login" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium shadow-soft">
              Sign in
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors">
              Go home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleCreatePortfolioSubmit = async (name: string, subdomain: string, template: string) => {
    const formattedSub = (subdomain || name)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newPortfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      name: name,
      url: `${formattedSub}.portfoliohub.app`,
      subdomain: formattedSub,
      status: "Draft",
      template: template,
      lastUpdated: "Just now",
      headline: "Freelancer / Developer",
      bio: "Crafting beautiful responsive websites and application designs.",
      projects: [],
      showProjects: false,
      showContact: true
    };

    await createPortfolio(newPortfolio);
    setCreateModalOpen(false);
    
    // Automatically select the newly created portfolio and open editor
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("portfolioId", newPortfolio.id);
      next.set("tab", "edit");
      return next;
    });
  };

  const handleUpdatePortfolio = async (updatedPortfolio: Portfolio) => {
    await updatePortfolio(updatedPortfolio);
  };

  const handleDeletePortfolio = async (id: string) => {
    const ok = await confirm({
      type: "delete",
      title: "Delete this portfolio?",
      description: "Are you sure you want to delete this portfolio? This cannot be undone.",
      confirmLabel: "Delete",
    });
    if (ok) {
      await deletePortfolio(id);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("portfolioId");
        return next;
      });
    }
  };

  const selectedPortfolio = portfolios.find((p) => p.id === selectedPortfolioId);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* ──── PREMIUM SIDEBAR ──── */}
      {selectedPortfolioId && (
        <DashboardSidebar
          selectedPortfolio={selectedPortfolio}
          setSelectedPortfolioId={setSelectedPortfolioId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          portfoliosCount={portfolios.length}
          displayName={displayName}
          email={user?.email}
          onSignOut={handleSignOut}
        />
      )}

      {/* ──── MOBILE HEADER ──── */}
      {selectedPortfolioId && (
        <MobileHeader
          selectedPortfolio={selectedPortfolio}
          setSelectedPortfolioId={setSelectedPortfolioId}
          setSidebarOpen={setSidebarOpen}
        />
      )}

      {/* ──── MOBILE SIDEBAR OVERLAY ──── */}
      {selectedPortfolioId && (
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedPortfolio={selectedPortfolio}
          setSelectedPortfolioId={setSelectedPortfolioId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSignOut={handleSignOut}
        />
      )}

      {/* ──── MAIN CONTENT ──── */}
      <main className={`flex-1 min-h-screen overflow-y-auto bg-surface/35 ${selectedPortfolioId ? "lg:pt-0 pt-[64px]" : "pt-0"}`}>
        {/* If no portfolio is selected, redirect to /portfolios */}
        {!selectedPortfolioId && (
          <Navigate to={`/portfolios?userId=${encodeURIComponent(user?.id ?? "")}`} replace />
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AnimatePresence mode="wait">

              /* ── SELECTED PORTFOLIO SETTINGS VIEW ── */
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back Link for Mobile */}
                <div className="mb-4 lg:hidden">
                  <button
                    onClick={() => setSelectedPortfolioId(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft hover:text-ink cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" /> Portfolios List
                  </button>
                </div>

                {/* Portfolio Settings Header */}
                <div className="border-b border-border pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="font-display text-4xl font-bold">{selectedPortfolio?.name}</h1>
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        selectedPortfolio?.status === "Draft" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                      }`}>
                        {selectedPortfolio?.status}
                      </span>
                    </div>
                    <p className="mt-1 text-ink-soft text-sm flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 shrink-0" />
                      Live URL:{" "}
                      <a
                        href={`https://${selectedPortfolio?.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono underline text-ink hover:text-gradient-brand transition-colors"
                      >
                        {selectedPortfolio?.url}
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://${selectedPortfolio?.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold hover:bg-secondary transition-all shadow-soft"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Live Site
                    </a>
                    <button
                      onClick={() => {
                        if (selectedPortfolio) {
                          navigator.clipboard.writeText(`https://${selectedPortfolio.url}`);
                          alert("Portfolio URL copied to clipboard!");
                        }
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-4 py-2.5 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy URL
                    </button>
                  </div>
                </div>

                {/* Sub Tab Navigation for Mobile & Tablet */}
                <div className="flex lg:hidden border-b border-border overflow-x-auto gap-2 pb-2 mb-6 scrollbar-none">
                  {[
                    { id: "analytics", label: "Analytics", icon: BarChart3 },
                    { id: "domain", label: "Domain", icon: Globe },
                    { id: "edit", label: "Content Editor", icon: Sliders },
                    { id: "share", label: "Share Pitch", icon: Video },
                    { id: "export", label: "Export Code", icon: Code },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full shrink-0 ${
                        activeTab === tab.id
                          ? "bg-foreground text-background"
                          : "text-ink-soft hover:bg-secondary/60"
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Sub Tab Component Rendering */}
                <AnimatePresence mode="wait">
                  {selectedPortfolio && (
                    <motion.div
                      key={activeTab + (isLoadingTab ? "-loading" : "-ready")}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isLoadingTab ? (
                        <TabLoadingSkeleton />
                      ) : (
                        <>
                          {activeTab === "analytics" && (
                            <AnalyticsPanel portfolio={selectedPortfolio} />
                          )}
                          {activeTab === "domain" && (
                            <DomainPanel portfolio={selectedPortfolio} onUpdate={handleUpdatePortfolio} />
                          )}
                          {activeTab === "edit" && (
                            <EditPanel
                              portfolio={selectedPortfolio}
                              onUpdate={handleUpdatePortfolio}
                              onDelete={handleDeletePortfolio}
                            />
                          )}
                          {activeTab === "share" && (
                            <SharePanel portfolio={selectedPortfolio} />
                          )}
                          {activeTab === "export" && (
                            <ExportPanel portfolio={selectedPortfolio} />
                          )}
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ── CREATE PORTFOLIO MODAL ── */}
      <CreatePortfolioModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePortfolioSubmit}
        defaultTemplate={templateParam}
      />
    </div>
  );
}
