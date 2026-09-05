import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function LiveEditorPreview() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16 items-center">
          <div>
            <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs tracking-[0.15em] uppercase text-ink-soft bg-gradient-to-b from-white/5 to-transparent">
              The editor
            </span>

            <h2 className="mt-5 poppins font-normal text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
              Type on the left.{" "}
              <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
                See it live on the right.
              </span>
            </h2>

            <p className="mt-6 text-ink-soft leading-relaxed max-w-md text-[15px]">
              A calm, opinionated editor. Structured fields for the boring stuff,
              markdown for the writing, drag-and-drop for the pictures. Auto-saved,
              versioned, undo-able.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "Rich text with keyboard shortcuts",
                "Instant preview on every keystroke",
                "Version history — restore anything",
                "Image compression + smart cropping",
              ].map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-3 text-sm text-foreground/90"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-lime-400/25 bg-lime-400/10">
                    <Check className="h-3.5 w-3.5 text-lime-400" strokeWidth={3} />
                  </span>
                  {l}
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-lime-400/20 via-green-800/10 to-transparent blur-[60px]" />
            <div className="pointer-events-none absolute -top-6 -right-6 -z-10 h-40 w-40 rounded-full bg-lime-400/25 blur-3xl" />

            <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-lime-400/40 via-border to-border shadow-lift">
              <div className="rounded-2xl overflow-hidden bg-surface-elevated p-6">
                <div className="grid grid-cols-2 gap-5">
                  {/* Left: editor field skeleton */}
                  <div className="space-y-3">
                    <div className="h-2 w-16 rounded-full bg-white/15" />
                    <div className="rounded-lg border border-border bg-black/40 p-3 space-y-2">
                      <div className="h-2 w-3/4 rounded-full bg-white/25" />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-5/6 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1 pt-1">
                        <div className="h-2 w-1/3 rounded-full bg-white/10" />
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="h-3 w-[2px] bg-lime-400"
                        />
                      </div>
                    </div>
                    <div className="h-2 w-20 rounded-full bg-white/15" />
                    <div className="rounded-lg border border-border bg-black/40 p-3 space-y-2">
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                      <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    </div>
                  </div>

                  {/* Right: live preview skeleton */}
                  <motion.div
                    initial={{ opacity: 0.4 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-lg border border-border bg-black/60 p-4 space-y-3"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-lime-400 to-green-800" />
                    <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
                    <div className="h-2 w-1/2 rounded-full bg-lime-400/40" />
                    <div className="space-y-1.5 pt-2">
                      <div className="h-1.5 w-full rounded-full bg-white/10" />
                      <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
                    </div>
                    <div className="flex gap-1.5 pt-2">
                      <div className="h-5 w-14 rounded-md bg-white/10" />
                      <div className="h-5 w-14 rounded-md bg-white/10" />
                    </div>
                  </motion.div>
                </div>

                {/* fake toolbar row */}
                <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                  <div className="h-6 w-6 rounded-md bg-white/10" />
                  <div className="h-6 w-6 rounded-md bg-white/10" />
                  <div className="h-6 w-6 rounded-md bg-white/10" />
                  <div className="ml-auto h-6 w-20 rounded-md bg-lime-400/20 border border-lime-400/30" />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 rounded-xl border border-border bg-surface-elevated/95 backdrop-blur-xl px-4 py-2.5 shadow-lift"
            >
              <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-medium text-ink-soft">Autosaved just now</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}