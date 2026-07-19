import { motion } from "framer-motion";
import { Activity, BarChart3 } from "lucide-react";
import { TrafficChart } from "./charts/TrafficChart";
import { type Portfolio, ANALYTICS_DATA, REFERRERS } from "./types";

export function AnalyticsPanel({ portfolio }: { portfolio: Portfolio }) {
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
          <TrafficChart isDemo={isDemo} data={customAnalyticsData} />
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
