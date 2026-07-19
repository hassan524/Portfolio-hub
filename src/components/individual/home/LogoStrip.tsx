export function LogoStrip() {
  const items = ["Stripe", "Vercel", "Linear", "Figma", "Notion", "Framer", "Loom"];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Portfolios published by folks working at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((n) => (
            <span key={n} className="font-display text-xl md:text-2xl text-ink/70 italic">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
