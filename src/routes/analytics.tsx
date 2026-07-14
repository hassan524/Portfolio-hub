import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — PortfolioHub" },
      { name: "description", content: "Privacy-friendly analytics for your portfolio." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Insights" title="Where your visitors come from." subtitle="Real analytics without cookies, fingerprinting, or third-party pixels.">
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { l: "Views (30d)", v: "1,284", d: "+12%" },
          { l: "Unique visitors", v: "812", d: "+8%" },
          { l: "Avg. time", v: "1m 42s", d: "+4%" },
          { l: "Contact clicks", v: "34", d: "+18%" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-border p-5">
            <div className="text-xs text-ink-soft">{s.l}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl">{s.v}</span>
              <span className="text-xs text-[oklch(0.5_0.15_150)] inline-flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> {s.d}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border p-6">
        <h2 className="font-display text-xl">Top pages</h2>
        <div className="mt-4 space-y-2 text-sm">
          {[
            { p: "/", v: 620 },
            { p: "/projects/field-notes", v: 284 },
            { p: "/about", v: 194 },
            { p: "/projects/nomad-bank", v: 186 },
          ].map((r) => (
            <div key={r.p} className="flex items-center gap-3">
              <span className="w-56 shrink-0 font-mono text-xs text-ink-soft">{r.p}</span>
              <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-brand" style={{ width: `${(r.v / 620) * 100}%` }} />
              </div>
              <span className="text-xs text-ink-soft w-12 text-right">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  ),
});
