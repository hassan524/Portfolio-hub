import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  BarChart3,
  Globe,
  Sliders,
  Video,
  Code,
  Layers,
  LogOut,
} from "lucide-react";
import type { Portfolio } from "./types";

interface DashboardSidebarProps {
  selectedPortfolio: Portfolio | undefined;
  setSelectedPortfolioId: (id: string | null) => void;
  activeTab?: string;
  setActiveTab: (tab: string) => void;
  portfoliosCount: number;
  displayName: string;
  email: string | undefined;
  onSignOut: () => Promise<void>;
}

export function DashboardSidebar({
  selectedPortfolio,
  setSelectedPortfolioId,
  activeTab,
  setActiveTab,
  portfoliosCount,
  displayName,
  email,
  onSignOut,
}: DashboardSidebarProps) {
  return (
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
                {portfoliosCount}
              </span>
            </button>

            {/* Simulated Limits */}
            <div className="mt-8 p-4 rounded-2xl border border-border/60 bg-secondary/20">
              <div className="flex items-center justify-between text-[11px] font-semibold text-ink-soft">
                <span>Usage Quota</span>
                <span>{portfoliosCount} / 10 sites</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-foreground rounded-full"
                  style={{ width: `${(portfoliosCount / 10) * 100}%` }}
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
            <div className="text-[10px] text-ink-soft truncate font-medium">{email}</div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-ink-soft hover:text-red-500 hover:bg-red-50/5 transition-colors cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
