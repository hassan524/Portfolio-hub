import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { TrafficChart } from "./charts/TrafficChart";
import { type Portfolio, ANALYTICS_DATA, REFERRERS } from "./types";

export function AnalyticsPanel({ portfolio }: { portfolio: Portfolio }) {
  const isDemo = portfolio.id !== "portfolio-3";
  const viewsVal = isDemo ? (portfolio.id === "portfolio-2" ? "891" : "1,247") : "0";
  const clicksVal = isDemo ? (portfolio.id === "portfolio-2" ? "189" : "342") : "0";
  const ctrVal = isDemo ? (portfolio.id === "portfolio-2" ? "21.2%" : "27.4%") : "0%";
  const timeVal = isDemo ? "2m 34s" : "—";

  const metrics = [
    { label: "Views", value: viewsVal, change: isDemo ? "+12.3%" : "—" },
    { label: "Clicks", value: clicksVal, change: isDemo ? "+8.1%" : "—" },
    { label: "CTR", value: ctrVal, change: isDemo ? "+4.2%" : "—" },
    { label: "Avg. Time", value: timeVal, change: isDemo ? "+5.7%" : "—" },
  ];

  const customAnalyticsData = isDemo
    ? ANALYTICS_DATA
    : ANALYTICS_DATA.map((d) => ({ ...d, views: 0, clicks: 0 }));

  return (
    <div className="space-y-6">
      {/* ── METRIC STRIP ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 sm:flex sm:flex-row items-stretch divide-y sm:divide-y-0 sm:divide-x divide-border/60 rounded-2xl border border-border bg-surface-elevated overflow-hidden"
      >
        {metrics.map((m, i) => (
          <div key={i} className="flex-1 px-5 sm:px-6 py-4 sm:py-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft block">
              {m.label}
            </span>
            <div className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight leading-none">
              {m.value}
            </div>
            <span
              className={`text-[11px] font-semibold mt-1.5 inline-block ${
                isDemo ? "text-emerald-400" : "text-ink-soft/40"
              }`}
            >
              {m.change}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── TRAFFIC CHART ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-border bg-surface-elevated overflow-hidden"
      >
        <div className="px-6 pt-6 pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display">Traffic</h3>
            <p className="text-[11px] text-ink-soft mt-0.5">Daily views & clicks this week</p>
          </div>
          {isDemo && (
            <div className="flex items-center gap-4 text-[11px] font-semibold text-ink-soft">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "oklch(0.72 0.18 40)" }}
                />
                Views
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: "oklch(0.55 0.18 260)" }}
                />
                Clicks
              </span>
            </div>
          )}
        </div>
        <div className="h-[260px] sm:h-[300px] px-2 pb-4">
          <TrafficChart isDemo={isDemo} data={customAnalyticsData} />
        </div>
      </motion.div>

      {/* ── BOTTOM BENTO ── */}
      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6"
        >
          {/* Sources */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-surface-elevated p-6">
            <h3 className="text-sm font-bold font-display mb-5">Sources</h3>
            <div className="space-y-4">
              {REFERRERS.map((ref) => (
                <div key={ref.source}>
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-semibold truncate">{ref.source}</span>
                    <span className="text-ink-soft font-mono shrink-0 ml-2">
                      {ref.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${ref.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full bg-foreground/60"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="md:col-span-3 rounded-2xl border border-border bg-surface-elevated p-6">
            <h3 className="text-sm font-bold font-display mb-5">Top Pages</h3>
            <div className="divide-y divide-border/40">
              {[
                { name: "Supabase Dashboard Redesign", views: 180 },
                { name: "Framer Motion Templates", views: 124 },
                { name: "Main Landing Bio", views: 38 },
              ].map((page, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                >
                  <span className="text-[12px] font-semibold truncate mr-4">
                    {page.name}
                  </span>
                  <span className="text-[11px] font-mono text-ink-soft bg-secondary/30 px-2.5 py-1 rounded-lg shrink-0">
                    {page.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty state for non-demo */}
      {!isDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-dashed border-border bg-surface-elevated/40 p-12 text-center"
        >
          <BarChart3 className="h-10 w-10 mx-auto mb-3 stroke-1 text-ink-soft/50" />
          <p className="text-sm font-semibold">No analytics data yet</p>
          <p className="text-xs text-ink-soft mt-1">
            Publish your site and share the link to start collecting traffic.
          </p>
        </motion.div>
      )}
    </div>
  );
}
