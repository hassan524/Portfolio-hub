import { PageShell } from "@/components/individual/PageShell";

export function StatusPage() {
  return (
    <PageShell eyebrow="System" title="All systems normal." subtitle="Live status of every part of Portflu.">
      <div className="rounded-2xl border border-border overflow-hidden">
        {[
          { s: "Editor & dashboard", u: "99.99%" },
          { s: "Publishing pipeline", u: "99.98%" },
          { s: "Custom domains (SSL)", u: "99.97%" },
          { s: "Analytics", u: "99.99%" },
          { s: "Marketing site", u: "100%" },
        ].map((r) => (
          <div key={r.s} className="flex items-center justify-between px-6 py-5 border-b border-border last:border-b-0">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
              <span>{r.s}</span>
            </div>
            <span className="text-sm text-ink-soft">{r.u} · 90d</span>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="font-display text-2xl">Recent incidents</h2>
        <p className="mt-3 text-sm text-ink-soft">No incidents in the last 30 days.</p>
      </div>
    </PageShell>
  );
}
