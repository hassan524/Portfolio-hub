import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Menu } from "lucide-react";
import type { Portfolio } from "./types";

interface MobileHeaderProps {
  selectedPortfolio: Portfolio | undefined;
  setSelectedPortfolioId: (id: string | null) => void;
  setSidebarOpen: (open: boolean) => void;
}

export function MobileHeader({
  selectedPortfolio,
  setSelectedPortfolioId,
  setSidebarOpen,
}: MobileHeaderProps) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-[64px] border-b border-border bg-surface-elevated/90 backdrop-blur-xl flex items-center justify-between px-4">
      {selectedPortfolio ? (
        <button
          onClick={() => setSelectedPortfolioId(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-ink-soft cursor-pointer"
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
        className="p-2 rounded-lg hover:bg-secondary/60 transition-colors cursor-pointer"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
}
