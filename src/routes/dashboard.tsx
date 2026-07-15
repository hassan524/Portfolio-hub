import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Globe,
  BarChart3,
  Video,
  Code,
  Settings,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  Plus,
  ArrowLeft,
  Play,
  Save,
  Loader2,
  Trash2,
  Tv,
  CheckCircle2,
  Sparkles,
  Menu,
  X,
  Eye,
  MousePointerClick,
  Clock,
  Users,
  TrendingUp,
  FileCode,
  Square,
  AlertCircle,
  ChevronRight,
  Pencil,
  Laptop,
  Smartphone,
  Search,
  Grid,
  List,
  Activity,
  Download,
  Info,
  Shield,
  Sliders,
  CheckCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";
import { useAppContext } from "@/context/AppContext";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Portfolios — PortfolioHub" },
      { name: "description", content: "Manage and configure your professional portfolios." },
    ],
  }),
  component: Dashboard,
});

/* ──────────── MOCK DATA ──────────── */
const DEFAULT_PORTFOLIOS = [
  {
    id: "portfolio-1",
    name: "Design Portfolio 2026",
    url: "hassanmughal.dev",
    subdomain: "hassan",
    status: "Published" as const,
    template: "Atlas",
    lastUpdated: "2 hours ago",
    headline: "Senior Product Designer",
    bio: "Designing clean interfaces for high-growth startups. Formerly at Google & Stripe.",
    projects: [
      { id: "p1", name: "Supabase Dashboard Redesign", desc: "Improved developer conversion by 24% through unified navigation." },
      { id: "p2", name: "Framer Motion Templates", desc: "A library of 40+ physics-based animations for React developer UI." }
    ],
    showProjects: true,
    showContact: true
  },
  {
    id: "portfolio-2",
    name: "Frontend Engineer CV",
    url: "hassan.dev",
    subdomain: "hassan-dev",
    status: "Published" as const,
    template: "Terminal",
    lastUpdated: "Yesterday",
    headline: "Creative Technologist",
    bio: "Specializing in WebGL, React, and interactive layouts. I make websites feel alive.",
    projects: [
      { id: "p1", name: "Antigravity IDE", desc: "A browser-based IDE using WebWorkers and custom compilers." }
    ],
    showProjects: true,
    showContact: true
  },
  {
    id: "portfolio-3",
    name: "Side Projects & Labs",
    url: "labs.hassan.dev",
    subdomain: "hassan-labs",
    status: "Draft" as const,
    template: "North",
    lastUpdated: "5 days ago",
    headline: "Experiments & Hacks",
    bio: "A sandbox for rough ideas, prototype builds, and random web experiments.",
    projects: [],
    showProjects: false,
    showContact: true
  }
];

const ANALYTICS_DATA = [
  { name: "Mon", views: 140, clicks: 35 },
  { name: "Tue", views: 220, clicks: 58 },
  { name: "Wed", views: 190, clicks: 42 },
  { name: "Thu", views: 290, clicks: 80 },
  { name: "Fri", views: 250, clicks: 71 },
  { name: "Sat", views: 180, clicks: 45 },
  { name: "Sun", views: 210, clicks: 52 },
];

const REFERRERS = [
  { source: "Twitter / X", visits: 312, pct: 38 },
  { source: "LinkedIn", visits: 256, pct: 31 },
  { source: "Google Search", visits: 142, pct: 17 },
  { source: "Direct", visits: 89, pct: 11 },
];

/* ──────────── MAIN DASHBOARD ──────────── */
function Dashboard() {
  const { session, signOut, user } = useAppContext();
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState(() => {
    const saved = localStorage.getItem("portfolios_list");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_PORTFOLIOS;
  });

  useEffect(() => {
    localStorage.setItem("portfolios_list", JSON.stringify(portfolios));
  }, [portfolios]);

  const [selectedPortfolioId, setSelectedPortfolioId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Creation modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [newPortfolioSubdomain, setNewPortfolioSubdomain] = useState("");
  const [newPortfolioTemplate, setNewPortfolioTemplate] = useState("Atlas");

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
    navigate({ to: "/" });
  };

  const handleCreatePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortfolioName.trim()) return;

    const formattedSub = (newPortfolioSubdomain || newPortfolioName)
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const newPortfolio = {
      id: `portfolio-${Date.now()}`,
      name: newPortfolioName,
      url: `${formattedSub}.portfoliohub.app`,
      subdomain: formattedSub,
      status: "Draft" as const,
      template: newPortfolioTemplate,
      lastUpdated: "Just now",
      headline: "Freelancer / Developer",
      bio: "Crafting beautiful responsive websites and application designs.",
      projects: [],
      showProjects: false,
      showContact: true
    };

    setPortfolios((prev: any) => [newPortfolio, ...prev]);
    setCreateModalOpen(false);
    setNewPortfolioName("");
    setNewPortfolioSubdomain("");
    
    // Automatically select the newly created portfolio and open editor
    setSelectedPortfolioId(newPortfolio.id);
    setActiveTab("edit");
  };

  const handleUpdatePortfolio = (updatedPortfolio: any) => {
    setPortfolios((prev: any) =>
      prev.map((p: any) => (p.id === updatedPortfolio.id ? updatedPortfolio : p))
    );
  };

  const handleDeletePortfolio = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) {
      setPortfolios((prev: any) => prev.filter((p: any) => p.id !== id));
      setSelectedPortfolioId(null);
    }
  };

  const selectedPortfolio = portfolios.find((p: any) => p.id === selectedPortfolioId);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  const filteredPortfolios = portfolios.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* ──── PREMIUM SIDEBAR ──── */}
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col border-r border-border bg-surface-elevated/70 backdrop-blur-md h-screen sticky top-0 z-20">
        
        {/* Top Branding / Project Context Selector */}
        <div className="px-6 h-[72px] flex items-center border-b border-border/80 shrink-0">
          {selectedPortfolio ? (
            <button
              onClick={() => setSelectedPortfolioId(null)}
              className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-ink-soft hover:text-ink transition-colors cursor-pointer group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>All Portfolios</span>
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-3 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background shadow-lift transition-all duration-300 group-hover:scale-105">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-base font-bold tracking-tight font-display">PortfolioHub</span>
            </Link>
          )}
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {selectedPortfolio ? (
            <>
              <div className="px-3 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft/50">Active Project</span>
                <h4 className="text-sm font-semibold truncate text-ink mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                  {selectedPortfolio.name}
                </h4>
              </div>

              {[
                { id: "analytics", label: "Analytics Stats", icon: BarChart3 },
                { id: "domain", label: "Custom Domain", icon: Globe },
                { id: "edit", label: "Content Editor", icon: Sliders },
                { id: "share", label: "Share Pitch Video", icon: Video },
                { id: "export", label: "Export Code", icon: Code },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-semibold transition-all duration-250 cursor-pointer relative group ${
                      isActive
                        ? "bg-foreground text-background shadow-soft"
                        : "text-ink-soft hover:text-ink hover:bg-secondary/65"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute left-0 w-1.5 h-6 rounded-r bg-gradient-brand hidden"
                      />
                    )}
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <div className="px-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft/50">Management</span>
              </div>
              <button
                className="w-full flex items-center justify-between rounded-xl px-4 py-3 text-[13.5px] font-bold bg-foreground text-background shadow-soft cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Layers className="h-4 w-4" />
                  <span>My Sites</span>
                </div>
                <span className="text-[10px] bg-secondary text-ink px-2 py-0.5 rounded-full font-bold">
                  {portfolios.length}
                </span>
              </button>

              {/* Simulated Limits */}
              <div className="mt-8 p-4 rounded-2xl border border-border/60 bg-secondary/20">
                <div className="flex items-center justify-between text-[11px] font-semibold text-ink-soft">
                  <span>Usage Quota</span>
                  <span>{portfolios.length} / 10 sites</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
                  <div
                    className="h-full bg-foreground rounded-full"
                    style={{ width: `${(portfolios.length / 10) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-ink-soft/70 mt-2 font-medium">Free plan subscription</div>
              </div>
            </>
          )}
        </nav>

        {/* User profile / Sign out */}
        <div className="p-4 border-t border-border shrink-0 space-y-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-ink text-sm font-bold border border-border">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold truncate">{displayName}</div>
              <div className="text-[10px] text-ink-soft truncate font-medium">{user?.email}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-ink-soft hover:text-red-500 hover:bg-red-500/5 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ──── MOBILE HEADER ──── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-[64px] border-b border-border bg-surface-elevated/90 backdrop-blur-xl flex items-center justify-between px-4">
        {selectedPortfolio ? (
          <button
            onClick={() => setSelectedPortfolioId(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-ink-soft"
          >
            <ArrowLeft className="h-4 w-4" />
            All Sites
          </button>
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-foreground text-background">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-bold">PortfolioHub</span>
          </Link>
        )}
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-secondary/60 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* ──── MOBILE SIDEBAR OVERLAY ──── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[280px] flex flex-col border-r border-border bg-surface"
            >
              <div className="px-5 h-[60px] flex items-center justify-between border-b border-border shrink-0">
                <span className="text-[15px] font-bold">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/60">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 px-3 py-4 space-y-1.5">
                {selectedPortfolio ? (
                  <>
                    <div className="px-3 mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft/60">Active Site</p>
                      <p className="text-sm font-semibold truncate text-ink">{selectedPortfolio.name}</p>
                    </div>
                    {[
                      { id: "analytics", label: "Analytics Stats", icon: BarChart3 },
                      { id: "domain", label: "Custom Domain", icon: Globe },
                      { id: "edit", label: "Content Editor", icon: Sliders },
                      { id: "share", label: "Share Video", icon: Video },
                      { id: "export", label: "Export Code", icon: Code },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold transition-all ${
                          activeTab === item.id
                            ? "bg-foreground text-background"
                            : "text-ink-soft hover:text-ink hover:bg-secondary/60"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-border my-4 pt-4 px-3">
                      <button
                        onClick={() => {
                          setSelectedPortfolioId(null);
                          setSidebarOpen(false);
                        }}
                        className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
                      >
                        <ArrowLeft className="h-4 w-4" /> Back to Portfolios
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium bg-foreground text-background"
                    >
                      <Layers className="h-4 w-4" />
                      My Portfolios
                    </button>
                  </>
                )}
              </nav>
              <div className="px-4 py-4 border-t border-border">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-secondary/60 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ──── MAIN CONTENT ──── */}
      <main className="flex-1 min-h-screen lg:pt-0 pt-[64px] overflow-y-auto bg-surface/35">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AnimatePresence mode="wait">
            {!selectedPortfolioId ? (
              /* ── PORTFOLIOS OVERVIEW GRID (PREMIUM SaaS STYLE) ── */
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-border/70">
                  <div>
                    <h1 className="font-display text-4xl tracking-tight">Portfolios Hub</h1>
                    <p className="mt-1 text-ink-soft text-sm">
                      Manage, configure, and monitor the performance of your live portfolios.
                    </p>
                  </div>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background px-5 py-3 text-xs font-bold shadow-soft hover:shadow-lift hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    Create Portfolio
                  </button>
                </div>

                {/* Search & Layout Control Toolbar */}
                <div className="flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-ink-soft/60" />
                    <input
                      type="text"
                      placeholder="Search portfolios..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-border bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all placeholder:text-ink-soft/50"
                    />
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-border p-1 bg-surface-elevated">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "grid" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        viewMode === "list" ? "bg-secondary text-ink" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Grid vs List View Rendering */}
                {filteredPortfolios.length === 0 ? (
                  <div className="text-center py-20 border border-dashed border-border rounded-3xl bg-surface-elevated/40">
                    <Search className="h-8 w-8 mx-auto stroke-1 text-ink-soft/70 mb-3" />
                    <h3 className="font-semibold text-sm">No portfolios found</h3>
                    <p className="text-xs text-ink-soft/80 mt-1">Try refining your search query or create a new portfolio.</p>
                  </div>
                ) : viewMode === "grid" ? (
                  /* ── GRID VIEW ── */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPortfolios.map((portfolio: any) => {
                      const isDraft = portfolio.status === "Draft";
                      return (
                        <div
                          key={portfolio.id}
                          onClick={() => {
                            setSelectedPortfolioId(portfolio.id);
                            setActiveTab("analytics");
                          }}
                          className="group rounded-3xl border border-border bg-surface-elevated hover:bg-secondary/10 hover:shadow-soft hover:border-foreground/30 transition-all duration-350 cursor-pointer flex flex-col justify-between overflow-hidden"
                        >
                          {/* Top stylized pattern/color block */}
                          <div className="h-20 bg-secondary/50 p-4 flex items-center justify-between border-b border-border/50 group-hover:bg-secondary/80 transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-surface px-2.5 py-1 rounded-full border border-border/80">
                              {portfolio.template} layout
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              isDraft
                                ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                : "bg-green-50 text-green-700 border border-green-200/50"
                            }`}>
                              {portfolio.status}
                            </span>
                          </div>

                          {/* Body */}
                          <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-display text-2xl font-bold group-hover:text-gradient-brand transition-colors">
                                {portfolio.name}
                              </h3>
                              <p className="text-xs text-ink-soft font-mono mt-1 mb-5 flex items-center gap-1.5 truncate">
                                <Globe className="h-3 w-3 shrink-0" />
                                {portfolio.url}
                              </p>
                            </div>

                            {/* Small metric strip */}
                            <div className="border-t border-border/60 pt-4 flex items-center justify-between">
                              <div className="flex gap-4 text-left">
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-ink-soft tracking-wider">Views</div>
                                  <div className="text-sm font-semibold">{portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "891" : "1,247"}</div>
                                </div>
                                <div>
                                  <div className="text-[9px] uppercase font-bold text-ink-soft tracking-wider">Clicks</div>
                                  <div className="text-sm font-semibold">{portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "189" : "342"}</div>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-ink-soft group-hover:text-ink transition-colors flex items-center gap-1">
                                Configure
                                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* ── LIST VIEW ── */
                  <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden divide-y divide-border">
                    {filteredPortfolios.map((portfolio: any) => {
                      const isDraft = portfolio.status === "Draft";
                      return (
                        <div
                          key={portfolio.id}
                          onClick={() => {
                            setSelectedPortfolioId(portfolio.id);
                            setActiveTab("analytics");
                          }}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 hover:bg-secondary/25 transition-colors cursor-pointer gap-4"
                        >
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/60">
                              <Globe className="h-5 w-5 text-ink-soft" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-semibold text-base truncate">{portfolio.name}</h3>
                              <p className="text-xs text-ink-soft font-mono truncate">{portfolio.url}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-6 text-xs text-ink-soft shrink-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/80 px-2 py-0.5 rounded-md border border-border">
                              {portfolio.template} Layout
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              isDraft ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                            }`}>
                              {portfolio.status}
                            </span>
                            <div className="flex gap-4">
                              <span><strong>Views:</strong> {portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "891" : "1,247"}</span>
                              <span><strong>Clicks:</strong> {portfolio.id === "portfolio-3" ? "0" : portfolio.id === "portfolio-2" ? "189" : "342"}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-ink-soft" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            ) : (
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
                      <h1 className="font-display text-4xl font-bold">{selectedPortfolio.name}</h1>
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        selectedPortfolio.status === "Draft" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                      }`}>
                        {selectedPortfolio.status}
                      </span>
                    </div>
                    <p className="mt-1 text-ink-soft text-sm flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 shrink-0" />
                      Live URL:{" "}
                      <a
                        href={`https://${selectedPortfolio.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono underline text-ink hover:text-gradient-brand transition-colors"
                      >
                        {selectedPortfolio.url}
                      </a>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://${selectedPortfolio.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold hover:bg-secondary transition-all shadow-soft"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Live Site
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://${selectedPortfolio.url}`);
                        alert("Portfolio URL copied to clipboard!");
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
                  {activeTab === "analytics" && (
                    <AnalyticsPanel portfolio={selectedPortfolio} />
                  )}
                  {activeTab === "domain" && (
                    <DomainPanel portfolio={selectedPortfolio} onUpdate={handleUpdatePortfolio} />
                  )}
                  {activeTab === "edit" && (
                    <EditPanel portfolio={selectedPortfolio} onUpdate={handleUpdatePortfolio} onDelete={handleDeletePortfolio} />
                  )}
                  {activeTab === "share" && (
                    <SharePanel portfolio={selectedPortfolio} />
                  )}
                  {activeTab === "export" && (
                    <ExportPanel portfolio={selectedPortfolio} />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* ── CREATE PORTFOLIO MODAL ── */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setCreateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md rounded-3xl border border-border bg-surface-elevated p-6 shadow-lift z-10"
            >
              <button
                onClick={() => setCreateModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-secondary/60"
              >
                <X className="h-4 w-4" />
              </button>
              <h3 className="font-display text-2xl mb-1">Create Portfolio</h3>
              <p className="text-xs text-ink-soft mb-5">Set up your new professional website template.</p>

              <form onSubmit={handleCreatePortfolio} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-ink">Portfolio Name</label>
                  <input
                    type="text"
                    required
                    value={newPortfolioName}
                    onChange={(e) => setNewPortfolioName(e.target.value)}
                    placeholder="e.g. Design Portfolio 2026"
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink">Subdomain slug</label>
                  <div className="mt-1 flex rounded-xl border border-border bg-surface overflow-hidden">
                    <input
                      type="text"
                      value={newPortfolioSubdomain}
                      onChange={(e) => setNewPortfolioSubdomain(e.target.value)}
                      placeholder="hassan-dev"
                      className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
                    />
                    <span className="bg-secondary px-3 py-2.5 text-xs text-ink-soft border-l border-border flex items-center font-mono">
                      .portfoliohub.app
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink">Layout Template Style</label>
                  <select
                    value={newPortfolioTemplate}
                    onChange={(e) => setNewPortfolioTemplate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    <option value="Atlas">Atlas (Serif & Editorial)</option>
                    <option value="Terminal">Terminal (Mono Developer Layout)</option>
                    <option value="North">North (Clean & Minimalist)</option>
                    <option value="Orbit">Orbit (Sleek Product Layout)</option>
                  </select>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="flex-1 rounded-full border border-border py-2.5 text-xs font-semibold hover:bg-secondary cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-foreground text-background py-2.5 text-xs font-semibold hover:shadow-soft cursor-pointer"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────── TAB 1: ANALYTICS PANEL (HIGH-FIDELITY REDESIGN) ──────────── */
function AnalyticsPanel({ portfolio }: { portfolio: any }) {
  const isDemo = portfolio.id !== "portfolio-3";
  const viewsVal = isDemo ? (portfolio.id === "portfolio-2" ? "891" : "1,247") : "0";
  const clicksVal = isDemo ? (portfolio.id === "portfolio-2" ? "189" : "342") : "0";
  const ctrVal = isDemo ? (portfolio.id === "portfolio-2" ? "21.2%" : "27.4%") : "0.0%";
  const timeVal = isDemo ? "2m 34s" : "—";

  const customAnalyticsData = isDemo ? ANALYTICS_DATA : ANALYTICS_DATA.map(d => ({ ...d, views: 0, clicks: 0 }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Overview stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Views", value: viewsVal, change: isDemo ? "+12.3%" : "0%", desc: "Page loads over time", color: "oklch(0.72 0.18 40)" },
          { label: "Click-throughs", value: clicksVal, change: isDemo ? "+8.1%" : "0%", desc: "Outbound clicks", color: "oklch(0.55 0.18 260)" },
          { label: "Click Rate (CTR)", value: ctrVal, change: isDemo ? "+4.2%" : "0%", desc: "Outbound / total ratio", color: "oklch(0.62 0.15 150)" },
          { label: "Avg. Duration", value: timeVal, change: isDemo ? "+5.7%" : "0%", desc: "Time active on screen", color: "oklch(0.82 0.16 75)" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft hover:-translate-y-0.5 transition-transform duration-300">
            <div className="flex items-center justify-between text-ink-soft">
              <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
              <Activity className="h-4 w-4" style={{ color: stat.color }} />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold tracking-tight">{stat.value}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px]">
              <span className="text-ink-soft/80 font-medium">{stat.desc}</span>
              <span className={`font-bold ${isDemo ? "text-green-600" : "text-ink-soft"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts Bar Chart with Gradients */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold font-display">Traffic Distribution</h3>
            <p className="text-xs text-ink-soft">Daily page views and clicks overview</p>
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-ink-soft border border-border px-3 py-1.5 rounded-xl bg-secondary/20">
              Views vs Clicks
            </span>
          </div>
        </div>

        <div className="h-[300px]">
          {isDemo ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customAnalyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 40)" stopOpacity={1} />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 40)" stopOpacity={0.75} />
                  </linearGradient>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.18 260)" stopOpacity={1} />
                    <stop offset="100%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.75} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.9 0.008 85 / 0.4)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
                <Tooltip
                  cursor={{ fill: "oklch(0.9 0.008 85 / 0.15)" }}
                  contentStyle={{
                    background: "var(--color-surface-elevated)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "16px",
                    fontSize: "12px",
                    boxShadow: "var(--shadow-lift)",
                  }}
                />
                <Bar dataKey="views" name="Page Views" fill="url(#colorViews)" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="clicks" name="Link Clicks" fill="url(#colorClicks)" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink-soft border border-dashed border-border rounded-2xl bg-surface/35">
              <BarChart3 className="h-10 w-10 mb-2 stroke-1 text-ink-soft/75" />
              <p className="text-sm font-semibold text-ink">No analytics data recorded yet</p>
              <p className="text-xs text-ink-soft mt-0.5">Publish your site and share the link to collect traffic.</p>
            </div>
          )}
        </div>

        {isDemo && (
          <div className="mt-6 flex items-center justify-center gap-6 text-xs font-semibold text-ink-soft border-t border-border/50 pt-5">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md" style={{ backgroundColor: "oklch(0.72 0.18 40)" }} /> Page Views
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-md" style={{ backgroundColor: "oklch(0.55 0.18 260)" }} /> Link Clicks
            </span>
          </div>
        )}
      </div>

      {/* Referrers & Pages Grid */}
      {isDemo && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h3 className="text-base font-bold mb-4 font-display">Traffic Sources</h3>
            <div className="space-y-4">
              {REFERRERS.map((ref) => (
                <div key={ref.source} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{ref.source}</span>
                    <span className="text-ink-soft">{ref.visits} visits ({ref.pct}%)</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-foreground rounded-full"
                      style={{ width: `${ref.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h3 className="text-base font-bold mb-4 font-display">Top Visited Links</h3>
            <div className="divide-y divide-border/60">
              <div className="flex items-center justify-between py-3 text-xs">
                <span className="font-semibold">Supabase Dashboard Redesign</span>
                <span className="text-ink-soft font-mono font-medium bg-secondary/50 px-2 py-0.5 rounded">180 views</span>
              </div>
              <div className="flex items-center justify-between py-3 text-xs">
                <span className="font-semibold">Framer Motion Templates</span>
                <span className="text-ink-soft font-mono font-medium bg-secondary/50 px-2 py-0.5 rounded">124 views</span>
              </div>
              <div className="flex items-center justify-between py-3 text-xs">
                <span className="font-semibold">Main Landing Bio</span>
                <span className="text-ink-soft font-mono font-medium bg-secondary/50 px-2 py-0.5 rounded">38 views</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ──────────── TAB 2: DOMAIN PANEL ──────────── */
function DomainPanel({ portfolio, onUpdate }: { portfolio: any; onUpdate: (p: any) => void }) {
  const [customDomain, setCustomDomain] = useState(portfolio.domain || "");
  const [connected, setConnected] = useState(!!portfolio.domain && portfolio.domain !== "Not connected");
  const [saving, setSaving] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomain.trim()) return;

    setSaving(true);
    setTimeout(() => {
      onUpdate({
        ...portfolio,
        domain: customDomain,
      });
      setConnected(true);
      setSaving(false);
    }, 1000);
  };

  const handleRemove = () => {
    if (confirm("Disconnect custom domain? Your site will fall back to your subdomain.")) {
      onUpdate({
        ...portfolio,
        domain: "Not connected",
      });
      setCustomDomain("");
      setConnected(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Subdomain settings */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <h3 className="text-lg font-bold font-display mb-1">Standard Subdomain</h3>
        <p className="text-xs text-ink-soft mb-5">Your website is always available on our free subdomain hosting.</p>

        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
            <Globe className="h-4 w-4 text-ink-soft shrink-0" />
            <span className="text-sm font-mono">{portfolio.url}</span>
          </div>
          <a
            href={`https://${portfolio.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface hover:bg-secondary transition-colors shrink-0"
          >
            <ExternalLink className="h-4 w-4 text-ink" />
          </a>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold">
          <CheckCircle className="h-4 w-4 text-green-600" />
          SSL active · Automated HTTPS propagation
        </div>
      </div>

      {/* Custom Domain setup */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <div className="flex items-center gap-2.5 mb-1">
          <h3 className="text-lg font-bold font-display">Custom Domain</h3>
          <span className="inline-flex items-center rounded-full bg-foreground text-background px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            Pro
          </span>
        </div>
        <p className="text-xs text-ink-soft mb-5">Configure your custom branded URL (e.g. hassanmughal.dev).</p>

        {connected ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-green-200/50 bg-green-500/5">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-bold">{portfolio.domain}</div>
                  <div className="text-[11px] text-green-600 font-semibold mt-0.5">Active · DNS verified & SSL configured</div>
                </div>
              </div>
              <button
                onClick={handleRemove}
                className="rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
              >
                Disconnect
              </button>
            </div>

            {/* DNS Instructions */}
            <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Verified DNS Settings</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border text-ink-soft">
                      <th className="pb-2 font-bold">Type</th>
                      <th className="pb-2 font-bold">Host</th>
                      <th className="pb-2 font-bold">Value</th>
                      <th className="pb-2 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr>
                      <td className="py-2.5 font-bold">CNAME</td>
                      <td className="py-2.5">www</td>
                      <td className="py-2.5">cname.portfoliohub.app</td>
                      <td className="py-2.5 text-green-600 font-bold">✓ Verified</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold">A</td>
                      <td className="py-2.5">@</td>
                      <td className="py-2.5">76.76.21.21</td>
                      <td className="py-2.5 text-green-600 font-bold">✓ Verified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                required
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. hassanmughal.dev"
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-foreground text-background px-6 py-3 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer flex items-center gap-1.5"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Connect
              </button>
            </div>

            <div className="rounded-2xl bg-secondary/40 p-5 text-xs text-ink-soft space-y-2">
              <p className="font-bold text-ink">Required DNS Configuration</p>
              <p>To point your domain here, log in to your DNS provider and add these records:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>A record at <code className="font-mono bg-surface px-1.5 py-0.5 rounded">@</code> pointing to <code className="font-mono bg-surface px-1.5 py-0.5 rounded">76.76.21.21</code></li>
                <li>CNAME record at <code className="font-mono bg-surface px-1.5 py-0.5 rounded">www</code> pointing to <code className="font-mono bg-surface px-1.5 py-0.5 rounded">cname.portfoliohub.app</code></li>
              </ul>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ──────────── TAB 3: EDIT PANEL (REAL-TIME LIVE PHONE PREVIEW) ──────────── */
interface EditPanelProps {
  portfolio: any;
  onUpdate: (p: any) => void;
  onDelete: (id: string) => void;
}

function EditPanel({ portfolio, onUpdate, onDelete }: EditPanelProps) {
  const [name, setName] = useState(portfolio.name);
  const [headline, setHeadline] = useState(portfolio.headline || "");
  const [bio, setBio] = useState(portfolio.bio || "");
  const [showProjects, setShowProjects] = useState(portfolio.showProjects || false);
  const [showContact, setShowContact] = useState(portfolio.showContact || false);
  const [status, setStatus] = useState(portfolio.status);
  const [projects, setProjects] = useState<any[]>(portfolio.projects || []);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddProject = () => {
    setProjects((prev) => [
      ...prev,
      { id: `proj-${Date.now()}`, name: "Project Title", desc: "Brief explanation of impact." }
    ]);
  };

  const handleRemoveProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleProjectChange = (id: string, field: "name" | "desc", value: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      onUpdate({
        ...portfolio,
        name,
        headline,
        bio,
        showProjects,
        showContact,
        status,
        projects
      });
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 850);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Inputs Form */}
      <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
        {/* Core details */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
          <h3 className="text-lg font-bold font-display mb-2">General Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink">Portfolio Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-ink">Publishing Status</label>
              <select
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none"
              >
                <option value="Published">Published (Live link active)</option>
                <option value="Draft">Draft (Offline)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Headline / Role</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Lead Designer at Netflix"
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Bio Summary</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a brief overview of who you are..."
              className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-xs focus:ring-2 focus:ring-ring/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Layout Sections */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
          <h3 className="text-lg font-bold font-display mb-1">Layout Sections</h3>
          <p className="text-xs text-ink-soft mb-4">Toggle visible sections on your public page.</p>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface/50 hover:bg-secondary/45 transition-all cursor-pointer">
              <div>
                <div className="text-xs font-bold">Enable Projects Section</div>
                <div className="text-[10px] text-ink-soft">Display a collection of your work case-studies</div>
              </div>
              <input
                type="checkbox"
                checked={showProjects}
                onChange={(e) => setShowProjects(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface/50 hover:bg-secondary/45 transition-all cursor-pointer">
              <div>
                <div className="text-xs font-bold">Enable Contact Form</div>
                <div className="text-[10px] text-ink-soft">Allows recruiters to email you directly</div>
              </div>
              <input
                type="checkbox"
                checked={showContact}
                onChange={(e) => setShowContact(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Projects List */}
        {showProjects && (
          <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-lg font-bold font-display">Projects & Work</h3>
                <p className="text-xs text-ink-soft">Add high-impact case studies or side projects</p>
              </div>
              <button
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 rounded-full border border-border hover:bg-secondary px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Case Study
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-border rounded-2xl text-ink-soft/80 text-xs">
                No projects added yet. Click "Add Case Study" to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div key={proj.id} className="relative p-4 rounded-xl border border-border bg-surface/40 space-y-3">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(proj.id)}
                      className="absolute top-4 right-4 p-1.5 text-ink-soft hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="text-[10px] font-bold text-ink-soft uppercase tracking-wider">Project #{idx + 1}</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="text-[10px] font-bold text-ink-soft">Name</label>
                        <input
                          type="text"
                          required
                          value={proj.name}
                          onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-bold text-ink-soft">Description</label>
                        <input
                          type="text"
                          required
                          value={proj.desc}
                          onChange={(e) => handleProjectChange(proj.id, "desc", e.target.value)}
                          className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <button
            type="button"
            onClick={() => onDelete(portfolio.id)}
            className="rounded-full border border-red-200 text-red-600 hover:bg-red-50/50 px-5 py-3 text-xs font-bold transition-colors cursor-pointer"
          >
            Delete portfolio
          </button>
          
          <div className="flex items-center gap-3">
            {success && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-green-600 font-bold flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                All changes saved!
              </motion.span>
            )}
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-foreground text-background px-6 py-3.5 text-xs font-bold hover:shadow-soft transition-all cursor-pointer flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Real-time Interactive Live Mobile/Phone Preview */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center sticky top-24 hidden lg:block">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-soft mb-3">Live Mobile Mockup</span>
        <div className="w-[300px] h-[580px] rounded-[48px] border-[12px] border-zinc-950 bg-zinc-900 shadow-lift relative overflow-hidden flex flex-col">
          
          {/* Phone speaker/camera bar */}
          <div className="absolute top-0 inset-x-0 h-6 bg-zinc-950 flex items-center justify-center z-30">
            <span className="w-16 h-4.5 rounded-full bg-black flex items-center justify-between px-3">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
              <span className="w-6 h-1 bg-zinc-800 rounded" />
            </span>
          </div>

          {/* Inner Web Page Screen */}
          <div className="flex-1 bg-surface-elevated pt-8 px-5 pb-6 overflow-y-auto font-sans flex flex-col justify-between text-zinc-900">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <span className="text-[8px] font-bold uppercase tracking-wider text-ink-soft">{portfolio.template} template</span>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              </div>

              {/* Title Section */}
              <div className="mt-6 text-center">
                <h4 className="font-display text-2xl font-bold tracking-tight text-ink truncate">{name || "Your name"}</h4>
                <p className="text-[10px] text-ink-soft font-semibold truncate mt-0.5">{headline || "Your headline tagline"}</p>
                <p className="text-[9px] text-ink-soft/90 leading-relaxed mt-2 text-justify bg-secondary/30 p-2.5 rounded-xl border border-border/50">
                  {bio || "Enter biographical information about your skills and goals."}
                </p>
              </div>

              {/* Dynamic Projects Preview */}
              {showProjects && (
                <div className="mt-6 space-y-3">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider text-ink border-b border-border pb-1">Featured Work</h5>
                  {projects.length === 0 ? (
                    <div className="text-[8px] text-center text-ink-soft italic py-2">No projects added.</div>
                  ) : (
                    projects.map((p) => (
                      <div key={p.id} className="p-2.5 rounded-lg border border-border bg-surface text-left">
                        <div className="text-[9px] font-bold truncate text-ink">{p.name || "Untitled"}</div>
                        <p className="text-[8px] text-ink-soft truncate mt-0.5">{p.desc || "No description"}</p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Contact Form Preview */}
            {showContact && (
              <div className="mt-8 pt-4 border-t border-border/80">
                <div className="text-center">
                  <span className="inline-block bg-foreground text-background rounded-full px-4 py-1.5 text-[9px] font-bold">
                    Email Me
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-[7px] text-ink-soft/60 mt-10 pt-3 border-t border-border/40">
              Made with PortfolioHub
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────── TAB 4: SHARE PANEL ──────────── */
function SharePanel({ portfolio }: { portfolio: any }) {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState("");
  const [aiVideo, setAiVideo] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recording]);

  const handleStartRecording = () => {
    setRecordedVideo(null);
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setRecordedVideo("mock-user-recording");
  };

  const handleGenerateAIVideo = () => {
    setAiVideo(null);
    setAiGenerating(true);
    setAiProgress(0);
    
    const statuses = [
      { p: 15, m: "Initializing virtual page viewport..." },
      { p: 40, m: "Analyzing layouts, contrast, and projects content..." },
      { p: 70, m: "Synthesizing dynamic AI audio voiceover pitch..." },
      { p: 90, m: "Assembling final video frames & timeline transitions..." },
      { p: 100, m: "Video successfully rendered!" }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < statuses.length) {
        setAiProgress(statuses[currentStep].p);
        setAiStatus(statuses[currentStep].m);
        currentStep++;
      } else {
        clearInterval(interval);
        setAiGenerating(false);
        setAiVideo("mock-ai-video");
      }
    }, 900);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Record Walkthrough */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-600">
              <Tv className="h-5 w-5" />
              <h3 className="text-base font-bold font-display">Record Screen Walkthrough</h3>
            </div>
            <p className="text-xs text-ink-soft mb-4">
              Pitch your skills! Record your screen and camera to explain your portfolio directly to recruiters.
            </p>

            {/* Video container screen */}
            <div className="aspect-video w-full bg-zinc-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-border shadow-inner">
              {recording ? (
                <div className="text-center space-y-3 z-10">
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-white text-xs font-mono font-bold uppercase tracking-wider">
                      Recording ({formatTime(recordingTime)})
                    </span>
                  </div>
                  {/* Decorative soundwaves mock */}
                  <div className="flex items-center justify-center gap-0.5 h-6">
                    {[1, 2, 3, 4, 3, 2, 4, 5, 2, 3, 4, 2].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ["4px", `${h * 4}px`, "4px"] }}
                        transition={{ repeat: Infinity, duration: 0.6 + i * 0.05 }}
                        className="w-0.5 bg-red-500 rounded"
                      />
                    ))}
                  </div>
                  <div className="text-zinc-500 text-[10px]">capturing tab: {portfolio.url}</div>
                </div>
              ) : recordedVideo ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-indigo-950/80 flex items-center justify-center">
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lift hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-5 w-5 fill-black ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur font-semibold">
                    Recording Ready · 0:42
                  </span>
                </div>
              ) : (
                <div className="text-center text-zinc-600 text-xs px-4">
                  <Video className="h-8 w-8 mx-auto mb-2 stroke-1 text-zinc-700" />
                  <span>No recording captured</span>
                </div>
              )}

              {/* simulated lens overlay */}
              <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-zinc-800 border border-zinc-700" />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            {recording ? (
              <button
                onClick={handleStopRecording}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 text-white py-2.5 text-xs font-semibold shadow-soft hover:bg-red-700 transition-colors cursor-pointer"
              >
                <Square className="h-3.5 w-3.5 fill-white" />
                Stop Recording
              </button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-2.5 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer"
              >
                <Video className="h-3.5 w-3.5" />
                {recordedVideo ? "Record New Walkthrough" : "Record Walkthrough"}
              </button>
            )}
          </div>
        </div>

        {/* Generate AI Pitch Video */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between min-h-[340px]">
          <div>
            <div className="flex items-center gap-2 mb-2 text-amber-500">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-base font-bold font-display">AI Automated Video Pitch</h3>
            </div>
            <p className="text-xs text-ink-soft mb-4">
              Let AI generate a simulated animated video walkthrough showing off your portfolio layout & details.
            </p>

            {/* Video container screen */}
            <div className="aspect-video w-full bg-zinc-950 rounded-2xl relative overflow-hidden flex items-center justify-center border border-border shadow-inner">
              {aiGenerating ? (
                <div className="w-full px-6 space-y-3 z-10">
                  <div className="flex items-center justify-between text-[11px] text-white font-semibold">
                    <span className="truncate pr-4">{aiStatus}</span>
                    <span className="font-mono">{aiProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${aiProgress}%` }}
                      transition={{ duration: 0.3 }}
                      className="h-full bg-amber-500 rounded-full"
                    />
                  </div>
                </div>
              ) : aiVideo ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-amber-950/80 flex items-center justify-center">
                    <button className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center shadow-lift hover:scale-105 transition-all cursor-pointer">
                      <Play className="h-5 w-5 fill-black ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white text-[10px] bg-black/60 px-2 py-0.5 rounded-md backdrop-blur font-semibold">
                    AI Auto Preview · 0:30
                  </span>
                </div>
              ) : (
                <div className="text-center text-zinc-650 text-xs px-4">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 stroke-1 text-zinc-700" />
                  <span>AI Pitch Video is not generated</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGenerateAIVideo}
              disabled={aiGenerating}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border hover:bg-secondary py-2.5 text-xs font-bold transition-colors cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              {aiVideo ? "Regenerate AI Video" : "Generate AI Video Pitch"}
            </button>
          </div>
        </div>
      </div>

      {/* Share / Copy section */}
      {(recordedVideo || aiVideo) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border bg-surface-elevated p-5 shadow-soft space-y-4"
        >
          <h4 className="text-sm font-bold">Share Walkthrough Link</h4>
          <p className="text-xs text-ink-soft">
            Include this pitch video directly on your portfolio header or send it as a shareable link.
          </p>

          <div className="flex gap-2.5">
            <div className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-mono text-ink truncate flex items-center">
              https://video.portfoliohub.app/v/{portfolio.id}
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://video.portfoliohub.app/v/${portfolio.id}`);
                alert("Walkthrough link copied!");
              }}
              className="rounded-xl bg-foreground text-background px-5 py-3 text-xs font-bold hover:shadow-soft cursor-pointer shrink-0"
            >
              Copy Link
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ──────────── TAB 5: EXPORT PANEL ──────────── */
function ExportPanel({ portfolio }: { portfolio: any }) {
  const [downloading, setDownloading] = useState(false);
  const [format, setFormat] = useState("static");

  const handleDownloadHTML = () => {
    setDownloading(true);
    
    setTimeout(() => {
      // Dynamic HTML contents based on user portfolio configuration
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${portfolio.name} — ${portfolio.headline}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #fafafa;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 20px;
    }
    header {
      margin-bottom: 50px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 30px;
    }
    h1 {
      font-size: 2.8rem;
      margin: 0 0 10px 0;
      color: #111;
      letter-spacing: -0.02em;
    }
    .headline {
      font-size: 1.3rem;
      color: #666;
      margin-bottom: 25px;
      font-weight: 500;
    }
    .bio {
      font-size: 1.15rem;
      color: #333;
      max-width: 600px;
    }
    section {
      margin-bottom: 50px;
    }
    h2 {
      font-size: 1.8rem;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 8px;
      margin-bottom: 24px;
      letter-spacing: -0.01em;
    }
    .project-card {
      background: white;
      border: 1px solid #eaeaea;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    }
    .project-name {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 8px 0;
      color: #111;
    }
    .project-desc {
      color: #555;
      margin: 0;
      font-size: 0.95rem;
    }
    .contact-btn {
      display: inline-block;
      background: #111;
      color: white;
      padding: 12px 28px;
      border-radius: 99px;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      transition: all 0.2s;
    }
    .contact-btn:hover {
      background: #333;
      transform: translateY(-1px);
    }
    footer {
      text-align: center;
      color: #888;
      font-size: 0.85rem;
      margin-top: 80px;
      border-top: 1px solid #eaeaea;
      padding-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${portfolio.name}</h1>
      <div class="headline">${portfolio.headline}</div>
      <p class="bio">${portfolio.bio}</p>
    </header>
    
    ${portfolio.showProjects ? `
    <section>
      <h2>Projects & Case Studies</h2>
      ${portfolio.projects.length === 0 ? `
        <p style="color:#777; font-style:italic;">No work added yet.</p>
      ` : portfolio.projects.map((p: any) => `
      <div class="project-card">
        <div class="project-name">${p.name}</div>
        <p class="project-desc">${p.desc}</p>
      </div>
      `).join('')}
    </section>
    ` : ''}
    
    ${portfolio.showContact ? `
    <section>
      <h2>Get In Touch</h2>
      <p style="color:#555; margin-bottom:20px;">I'm currently open to new roles and consulting opportunities.</p>
      <a href="mailto:hello@example.com" class="contact-btn">Send Message</a>
    </section>
    ` : ''}
    
    <footer>
      <p>Published via PortfolioHub · Exported HTML bundle</p>
    </footer>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${portfolio.subdomain || "portfolio"}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selector / Details */}
        <div className="lg:col-span-2 rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold font-display mb-1">Export Source Code</h3>
            <p className="text-xs text-ink-soft mb-6">
              Export your fully compiled custom portfolio layout to host elsewhere or modify by hand.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: "static", label: "Static HTML/CSS", desc: "No build steps required. Simple single file.", icon: FileCode },
                { id: "vite", label: "Vite React Starter", desc: "Standard React scaffold for modern developers.", icon: Code },
                { id: "next", label: "Next.js Template", desc: "Optimized SSR routing for maximum SEO & performance.", icon: Sparkles },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setFormat(item.id)}
                  className={`rounded-2xl border p-4.5 cursor-pointer transition-all ${
                    format === item.id
                      ? "border-foreground bg-secondary/35 shadow-soft"
                      : "border-border hover:border-foreground/20 bg-surface/50"
                  }`}
                >
                  <item.icon className="h-5 w-5 mb-2 text-ink-soft" />
                  <div className="text-xs font-bold mb-1">{item.label}</div>
                  <p className="text-[10px] text-ink-soft/90 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Code Directory File tree preview */}
            <div className="mt-6 rounded-2xl bg-zinc-950 border border-zinc-900 p-4 font-mono text-[11px] text-zinc-400 shadow-inner">
              <div className="text-zinc-600 mb-2"># Generated Directory Tree</div>
              <div>📁 {portfolio.subdomain || "portfolio"}-dist/</div>
              <div>├── 📄 index.html <span className="text-zinc-600">({format === "static" ? "static markup" : "React entrypoint"})</span></div>
              {format !== "static" && (
                <>
                  <div>├── 📄 package.json <span className="text-zinc-600">(scripts & dependencies)</span></div>
                  <div>├── 📁 src/</div>
                  <div>│   ├── 📄 main.tsx</div>
                  <div>│   └── 📄 App.tsx</div>
                </>
              )}
              <div>└── 📄 styles.css <span className="text-zinc-600">(compiled responsive tokens)</span></div>
            </div>
          </div>

          <div className="pt-6 border-t border-border mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs text-ink-soft font-semibold">
              <AlertCircle className="h-4 w-4" />
              <span>Includes compiled bio summaries and project assets</span>
            </div>
            <button
              onClick={handleDownloadHTML}
              disabled={downloading}
              className="rounded-xl bg-foreground text-background px-6 py-3.5 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer flex items-center gap-1.5"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Bundling assets...
                </>
              ) : (
                <>
                  <Download className="h-3.5 w-3.5" />
                  Download Codebase
                </>
              )}
            </button>
          </div>
        </div>

        {/* Static HTML Quick View */}
        <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-display mb-3">HTML File Preview</h3>
            <div className="rounded-2xl bg-zinc-950 border border-zinc-900 p-4.5 font-mono text-[10px] text-zinc-400 overflow-x-auto h-[240px] leading-relaxed shadow-inner">
              <span className="text-zinc-500">&lt;!DOCTYPE html&gt;</span><br />
              <span className="text-zinc-500">&lt;html lang="en"&gt;</span><br />
              <span className="text-zinc-500">&lt;head&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;title&gt;</span>{portfolio.name}<span className="text-zinc-500">&lt;/title&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;meta name="description" content="</span>{portfolio.headline}<span className="text-zinc-500">"&gt;</span><br />
              <span className="text-zinc-500">&lt;/head&gt;</span><br />
              <span className="text-zinc-500">&lt;body&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;header&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;h1&gt;</span>{portfolio.name}<span className="text-zinc-500">&lt;/h1&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;p&gt;</span>{portfolio.bio}<span className="text-zinc-500">&lt;/p&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/header&gt;</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;section&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">&lt;h2&gt;</span>Projects<span className="text-zinc-500">&lt;/h2&gt;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">/* Dynamic projects render */</span><br />
              &nbsp;&nbsp;<span className="text-zinc-500">&lt;/section&gt;</span><br />
              <span className="text-zinc-500">&lt;/body&gt;</span><br />
              <span className="text-zinc-500">&lt;/html&gt;</span>
            </div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-[10px] text-ink-soft/90 font-medium leading-relaxed">
              Fully optimized for hosting on Vercel, Netlify, or Github Pages
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
