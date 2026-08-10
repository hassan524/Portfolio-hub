import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function LiveEditorPreview() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-background">
      {/* Same glow treatment as the hero — this section was reading flat/light before */}
      <div className="absolute inset-0 bg-hero-glow opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">The editor</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            Type on the left.<br />
            <span className="italic text-gradient-brand">See it live on the right.</span>
          </h2>
          <p className="mt-6 text-ink-soft leading-relaxed max-w-lg">
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
              <div key={l} className="flex items-center gap-3 text-sm text-foreground/90">
                <Check className="h-4 w-4 text-primary" />
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Code panel stays an explicit light card — it's a screenshot of the product UI,
            same trick as the hero's dashboard mock */}
        <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-lift">
          <div className="rounded-lg bg-white text-neutral-900 p-5 font-mono text-[13px] leading-relaxed">
            <div className="text-neutral-400 text-xs">{`// hero.md`}</div>
            <div className="mt-3">
              <span className="text-neutral-400"># </span>Ari Kohen
            </div>
            <div>
              <span className="text-neutral-400">## </span>
              <span className="text-lime-600">Independent product designer</span>
            </div>
            <div className="mt-3 text-neutral-400">
              Currently helping small teams ship
              <br />
              <span className="underline decoration-dotted">thoughtful software</span> — mostly from Lisbon.
            </div>
            <div className="mt-4">
              <span className="text-neutral-400">--- projects</span>
            </div>
            <div className="mt-1">
              [<span className="text-sky-600">Field Notes</span>](/p/field-notes)
            </div>
            <div>
              [<span className="text-sky-600">Nomad Bank</span>](/p/nomad-bank)
            </div>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="mt-1 inline-block w-2 h-4 bg-neutral-900"
            />
          </div>
        </div>
      </div>
    </section>
  );
}