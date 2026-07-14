import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — PortfolioHub" },
      { name: "description", content: "Join a small, profitable team building tools for creators." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Careers" title="Join us." subtitle="We're a team of six, profitable, and hire slowly. Roles open when they're real.">
      <div className="space-y-3">
        {[
          { t: "Senior product designer", loc: "Remote (EU / EST overlap)" },
          { t: "Full-stack engineer (TypeScript)", loc: "Remote" },
          { t: "Customer success", loc: "Lisbon or remote" },
        ].map((r) => (
          <div key={r.t} className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-border p-6 hover:bg-surface transition-colors">
            <div>
              <h3 className="font-medium">{r.t}</h3>
              <p className="text-sm text-ink-soft">{r.loc}</p>
            </div>
            <button className="text-sm rounded-full border border-border px-4 py-2 hover:bg-secondary">Apply →</button>
          </div>
        ))}
      </div>
      <p className="mt-10 text-sm text-ink-soft">Don't see your role? Email careers@portfoliohub.app anyway.</p>
    </PageShell>
  ),
});
