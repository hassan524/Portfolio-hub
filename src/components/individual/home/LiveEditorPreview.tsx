import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function LiveEditorPreview() {
  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase opacity-60">The editor</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            Type on the left.<br />
            <span className="italic text-gradient-brand">See it live on the right.</span>
          </h2>
          <p className="mt-6 opacity-70 leading-relaxed max-w-lg">
            A calm, opinionated editor. Structured fields for the boring stuff,
            markdown for the writing, drag-and-drop for the pictures. Auto-saved,
            versioned, undo-able.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Rich text with keyboard shortcuts",
              "Instant preview on every keystroke",
              "Version history — restore anything",
              "Image compression + smart cropping",
            ].map((l) => (
              <div key={l} className="flex items-center gap-3 text-sm opacity-90">
                <Check className="h-4 w-4" style={{ color: "oklch(0.82 0.16 75)" }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[oklch(0.22_0.02_260)] p-4 shadow-lift">
          <div className="rounded-lg bg-background text-foreground p-5 font-mono text-[13px] leading-relaxed">
            <div className="text-ink-soft text-xs">{`// hero.md`}</div>
            <div className="mt-3">
              <span className="text-ink-soft"># </span>Ari Kohen
            </div>
            <div>
              <span className="text-ink-soft">## </span>
              <span style={{ color: "oklch(0.6 0.18 40)" }}>Independent product designer</span>
            </div>
            <div className="mt-3 text-ink-soft">
              Currently helping small teams ship
              <br />
              <span className="underline decoration-dotted">thoughtful software</span> — mostly from Lisbon.
            </div>
            <div className="mt-4">
              <span className="text-ink-soft">--- projects</span>
            </div>
            <div className="mt-1">
              [<span style={{ color: "oklch(0.55 0.18 260)" }}>Field Notes</span>](/p/field-notes)
            </div>
            <div>
              [<span style={{ color: "oklch(0.55 0.18 260)" }}>Nomad Bank</span>](/p/nomad-bank)
            </div>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="mt-1 inline-block w-2 h-4 bg-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
