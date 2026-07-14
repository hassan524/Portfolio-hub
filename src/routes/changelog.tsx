import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/changelog")({
  head: () => ({
    meta: [
      { title: "Changelog — PortfolioHub" },
      { name: "description", content: "What we've shipped, week by week." },
    ],
  }),
  component: Changelog,
});

const ENTRIES = [
  { v: "1.14", date: "July 12, 2026", tag: "New", items: ["Added Meridian and Signal templates", "Editor now supports Cmd+K palette", "Analytics: 30-day comparison charts"] },
  { v: "1.13", date: "June 28, 2026", tag: "Improved", items: ["Faster template previews (down to 80ms)", "Better keyboard nav in editor", "Fixed a bug where drafts could unpublish themselves"] },
  { v: "1.12", date: "June 14, 2026", tag: "New", items: ["Password-protected portfolios", "Version history with restore"] },
  { v: "1.11", date: "May 31, 2026", tag: "Fixed", items: ["Custom domain SSL renewal reliability", "Editor auto-save reliability on flaky connections"] },
];

function Changelog() {
  return (
    <PageShell eyebrow="Changelog" title="What we shipped." subtitle="A running log of every meaningful change, plus the small ones.">
      <ol className="space-y-10 border-l border-border">
        {ENTRIES.map((e) => (
          <li key={e.v} className="pl-8 relative">
            <span className="absolute -left-2 top-1 h-3 w-3 rounded-full bg-gradient-brand" />
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-2xl">v{e.v}</h3>
              <span className="text-xs text-ink-soft">{e.date}</span>
              <span className="text-[10px] uppercase tracking-widest rounded-full border border-border px-2 py-0.5">{e.tag}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {e.items.map((i) => <li key={i}>— {i}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
