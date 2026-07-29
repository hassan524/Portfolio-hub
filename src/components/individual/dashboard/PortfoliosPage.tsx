import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useDashboardData } from "@/hooks/useDashboardData";
import { PortfoliosOverview } from "./PortfoliosOverview";
import { CreatePortfolioModal } from "./CreatePortfolioModal";
import { type Portfolio } from "./types";

export function PortfoliosPage() {
  const { session, user } = useAppContext();
  const navigate = useNavigate();
  
  const { portfolios, createPortfolio } = useDashboardData(null, "analytics");
  const [createModalOpen, setCreateModalOpen] = useState(false);

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
    navigate(`/dashboard?portfolioId=${encodeURIComponent(newPortfolio.id)}&tab=edit`);
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Member";

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      <main className="flex-1 min-h-screen overflow-y-auto bg-surface/35 pt-0">
        <div className="flex items-center justify-between h-[72px] border-b border-border bg-surface-elevated/70 backdrop-blur-md sticky top-0 z-30 px-6 sm:px-8">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-foreground text-background shadow-lift transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-base font-bold tracking-tight font-display">PortfolioHub</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-ink text-sm font-bold border border-border">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold truncate max-w-[120px]">{displayName}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <AnimatePresence mode="wait">
            <PortfoliosOverview
              portfolios={portfolios}
              onSelect={(id) => {
                navigate(`/dashboard?portfolioId=${encodeURIComponent(id)}&tab=analytics`);
              }}
              onCreateClick={() => navigate("/templates")}
            />
          </AnimatePresence>
        </div>
      </main>
      <CreatePortfolioModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreatePortfolioSubmit}
      />
    </div>
  );
}
