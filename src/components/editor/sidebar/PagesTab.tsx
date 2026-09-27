import { Files, Sparkles } from "lucide-react";

export function PagesTab() {
  return (
    <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/60 border border-border/50 shadow-sm">
        <Files className="h-5 w-5 text-ink-soft" />
        <span className="absolute -right-1.5 -top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-foreground text-background shadow-md">
          <Sparkles className="h-2.5 w-2.5" />
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="text-sm font-semibold text-foreground">Multi-page Sites</div>
        <div className="text-xs leading-relaxed text-ink-soft max-w-[200px] mx-auto">
          Adding and managing extra pages for your site is coming soon.
        </div>
      </div>
      <span className="rounded-full bg-secondary/80 border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink-soft">
        Coming soon
      </span>
    </div>
  );
}
