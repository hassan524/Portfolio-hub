import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  BarChart3,
  Globe,
  Sliders,
  Video,
  Code,
  ArrowLeft,
  Layers,
  LogOut,
} from "lucide-react";
import type { Portfolio } from "./types";

interface MobileSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedPortfolio: Portfolio | undefined;
  setSelectedPortfolioId: (id: string | null) => void;
  activeTab?: string;
  setActiveTab: (tab: string) => void;
  onSignOut: () => Promise<void>;
}

export function MobileSidebar({
  sidebarOpen,
  setSidebarOpen,
  selectedPortfolio,
  setSelectedPortfolioId,
  activeTab,
  setActiveTab,
  onSignOut,
}: MobileSidebarProps) {
  return (
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
            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-[280px] flex flex-col border-r border-border bg-surface z-50"
          >
            <div className="px-5 h-[60px] flex items-center justify-between border-b border-border shrink-0">
              <span className="text-[15px] font-bold">Menu</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-secondary/60 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
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
                      className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13.5px] font-semibold transition-all cursor-pointer ${
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
                      className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to Portfolios
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium bg-foreground text-background cursor-pointer"
                  >
                    <Layers className="h-4 w-4" />
                    My Portfolios
                  </button>
                </>
              )}
            </nav>
            <div className="px-4 py-4 border-t border-border">
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:text-ink hover:bg-secondary/60 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
