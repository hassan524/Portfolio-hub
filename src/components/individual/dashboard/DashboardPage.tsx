import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { PageShell } from "@/components/individual/PageShell";
import { StatusChip } from "@/components/ui/app-chrome";
import { portfolios } from "@/lib/portfolio-data";

import { DeploymentsTab } from "./ui/DeploymentsTab";
import { OverviewTab } from "./ui/OverviewTab";
import { SettingsTab } from "./ui/SettingsTab";
import { TrafficTab } from "./ui/TrafficTab";

const tabs = ["Overview", "Traffic", "Deployments", "Settings"] as const;
type Tab = (typeof tabs)[number];

export function DashboardPage() {
  const params = useParams<{ portfolioId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>("Overview");
  const [range, setRange] = useState("30D");

  const requestedId = params.portfolioId || searchParams.get("portfolioId");
  const portfolio = requestedId
    ? portfolios.find((p) => p.id === requestedId) ?? portfolios[0]
    : portfolios[0];

  if (!portfolio) {
    return (
      <PageShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-medium text-foreground">No portfolios found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by creating your first portfolio project.
          </p>
          <button
            onClick={() => navigate("/templates")}
            className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-all cursor-pointer"
          >
            Browse templates
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Section nav */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="flex gap-7 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative shrink-0 py-3.5 text-sm font-medium transition-colors cursor-pointer ${
                  tab === t
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {tab === t && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Project header */}
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <StatusChip state={portfolio.status} />
              <a
                href={`https://${portfolio.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-subtle underline decoration-primary/40 underline-offset-4 hover:text-primary transition-colors cursor-pointer"
              >
                https://{portfolio.domain}
              </a>
            </div>
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground">
              Project <span className="font-serif italic text-primary">intelligence</span> readout
            </h1>
            <p className="mt-2 max-w-[56ch] text-sm text-muted-foreground">
              Real-time performance, deploy state and status for your production environment.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={`https://${portfolio.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-surface px-4 py-2 text-sm text-foreground ring-1 ring-inset ring-border-strong transition-all hover:bg-accent hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center"
            >
              View live site
            </a>
            <button className="rounded-full bg-surface px-4 py-2 text-sm text-foreground ring-1 ring-inset ring-border-strong transition-all hover:bg-accent hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              Open editor
            </button>
            <button className="flex items-center gap-2 rounded-full bg-secondary py-2 pl-3 pr-4 text-sm font-semibold text-secondary-foreground transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.3 5.3M4 15a8 8 0 0013.7 3.7"
                />
              </svg>
              Redeploy
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "Overview" && <OverviewTab range={range} setRange={setRange} />}
            {tab === "Traffic" && <TrafficTab range={range} setRange={setRange} />}
            {tab === "Deployments" && <DeploymentsTab />}
            {tab === "Settings" && <SettingsTab domain={portfolio.domain} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </PageShell>
  );
}