import { PageShell } from "@/components/individual/PageShell";

export function StatusPage() {
  return (
    <PageShell
      eyebrow="System"
      title="All systems normal."
      subtitle="Live status of every part of Portflu. Updated in real time."
    >
      <div className="rounded-xl border border-border overflow-hidden divide-y divide-border">
        {[
          { s: "Editor & dashboard", u: "99.99%" },
          { s: "Publishing pipeline", u: "99.98%" },
          { s: "Custom domains (SSL)", u: "99.97%" },
          { s: "Analytics", u: "99.99%" },
          { s: "Marketing site", u: "100%" },
        ].map((r) => (
          <div
            key={r.s}
            className="flex items-center justify-between px-5 py-4 md:px-6"
          >
            <div className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_150)]" />
              {r.s}
            </div>
            <span className="text-xs text-ink-soft">{r.u} · 90d</span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-ink-soft">No incidents in the last 30 days.</p>
    </PageShell>
  );
}
