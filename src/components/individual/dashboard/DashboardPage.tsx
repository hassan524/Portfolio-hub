import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  BarChart3,
  ExternalLink,
  Copy,
  Sparkles,
  Check,
  Menu,
  X,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { type Portfolio } from "./ui/types";
import { useDashboardData } from "@/hooks/useDashboardData";
import { AnalyticsPanel } from "./ui/AnalyticsPanel";
import { DomainPanel } from "./ui/DomainPanel";
import { CreatePortfolioModal } from "./ui/CreatePortfolioModal";

const TABS = [
  { id: "analytics", label: "Overview", icon: BarChart3 },
  { id: "domain", label: "Domain", icon: Globe },
] as const;

export function DashboardPage() {
  const { session, signOut, authUser: user } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedPortfolioId = searchParams.get("portfolioId");
  const activeTab = searchParams.get("tab") || (selectedPortfolioId ? "analytics" : undefined);
  const createParam = searchParams.get("create");
  const templateParam = searchParams.get("template") || undefined;

  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    portfolios,
    updatePortfolio,
    deletePortfolio,
    createPortfolio,
    isLoadingTab,
  } = useDashboardData(selectedPortfolioId, activeTab || "analytics");

  const setActiveTab = (tab: string) => {
    setSidebarOpen(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", tab);
      return next;
    });
  };

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
            <Link to="/auth/login" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium shadow-soft">Sign in</Link>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:bg-secondary transition-colors">Go home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleCreatePortfolioSubmit = async (name: string, subdomain: string, template: string) => {
    const formattedSub = (subdomain || name)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newPortfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      name,
      url: `${formattedSub}.portflu.app`,
      subdomain: formattedSub,
      status: "Draft",
      template,
      lastUpdated: "Just now",
      headline: "Freelancer / Developer",
      bio: "Crafting beautiful responsive websites and application designs.",
      projects: [],
      showProjects: false,
      showContact: true,
    };

    await createPortfolio(newPortfolio);
    setCreateModalOpen(false);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("portfolioId", newPortfolio.id);
      next.set("tab", "analytics");
      return next;
    });
  };

  const handleUpdatePortfolio = async (updatedPortfolio: Portfolio) => {
    await updatePortfolio(updatedPortfolio);
  };

  const handleCopyUrl = () => {
    if (selectedPortfolio) {
      navigator.clipboard.writeText(`https://${selectedPortfolio.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedPortfolio = portfolios.find((p) => p.id === selectedPortfolioId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!selectedPortfolioId && (
        <Navigate to={`/portfolios?userId=${encodeURIComponent(user?.id ?? "")}`} replace />
      )}

      <div className="flex min-h-screen">
        {/* ── MOBILE BACKDROP ── */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* ── SIDEBAR ── */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-screen w-[224px] bg-surface-elevated/95 backdrop-blur-xl border-r border-border/60 z-50 flex flex-col transition-transform duration-300 ease-out lg:translate-x-0 shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Close btn mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-3 lg:hidden grid h-8 w-8 place-items-center rounded-xl hover:bg-secondary/60 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4 text-ink-soft" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Portflu"
              className="h-8 w-auto object-contain"
            />
          </Link>
          {/* Portfolio info pill */}
          {selectedPortfolio && (
            <div className="mx-3 mb-4 rounded-xl bg-background/40 border border-border/50 p-3.5">
              <h2 className="text-[12px] font-bold truncate leading-tight">{selectedPortfolio.name}</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-mono text-ink-soft truncate">{selectedPortfolio.url}</span>
                <span
                  className={`shrink-0 inline-flex text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${selectedPortfolio.status === "Draft"
                      ? "bg-amber-500/15 text-amber-400"
                      : "bg-emerald-500/15 text-emerald-400"
                    }`}
                >
                  {selectedPortfolio.status}
                </span>
              </div>
            </div>
          )}

          <div className="h-px bg-border/40 mx-4" />

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer ${isActive
                      ? "bg-foreground text-background shadow-soft"
                      : "text-ink-soft hover:text-ink hover:bg-secondary/40"
                    }`}
                >
                  <tab.icon className="h-4 w-4 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="h-px bg-border/40 mx-4" />

          {/* Bottom */}
          <div className="px-3 py-4 space-y-1">
            <button
              onClick={() => {
                setSidebarOpen(false);
                navigate(`/portfolios?userId=${encodeURIComponent(user?.id ?? "")}`);
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-ink-soft hover:text-ink hover:bg-secondary/40 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 shrink-0" />
              All Portfolios
            </button>
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-ink-soft hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <div className="flex-1 flex flex-col min-h-screen min-w-0">
          {/* Mobile top bar */}
          <div className="lg:hidden sticky top-0 z-30 h-14 bg-surface-elevated/90 backdrop-blur-xl border-b border-border/60 flex items-center px-4 gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 hover:bg-secondary/40 transition-colors cursor-pointer shrink-0"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold truncate flex-1">{selectedPortfolio?.name}</span>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://${selectedPortfolio?.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 hover:bg-secondary/40 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <button
                onClick={handleCopyUrl}
                className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background shadow-soft cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
              {/* Desktop header */}
              <div className="hidden lg:flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-display font-bold tracking-tight">
                    {activeTab === "analytics" ? "Overview" : "Domain Settings"}
                  </h1>
                  <p className="text-xs text-ink-soft mt-1">
                    {activeTab === "analytics"
                      ? "Monitor your portfolio traffic and engagement"
                      : "Manage your portfolio's domain configuration"}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`https://${selectedPortfolio?.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-2.5 text-[11px] font-bold hover:bg-secondary/40 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Site
                  </a>
                  <button
                    onClick={handleCopyUrl}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-foreground text-background px-4 py-2.5 text-[11px] font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy URL"}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedPortfolio && (
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "analytics" && (
                      <AnalyticsPanel portfolio={selectedPortfolio} />
                    )}
                    {activeTab === "domain" && (
                      <DomainPanel portfolio={selectedPortfolio} onUpdate={handleUpdatePortfolio} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      <CreatePortfolioModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePortfolioSubmit}
        defaultTemplate={templateParam}
      />
    </div>
  );
}
