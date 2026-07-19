export function FAQ() {
  const faqs = [
    { q: "Is PortfolioHub really free?", a: "Yes. The free plan is not a trial — you can publish a full portfolio on a portfoliohub.app subdomain forever without paying." },
    { q: "Do I need to know how to code?", a: "Not at all. The editor is form-based for the structured stuff, markdown for writing. No HTML or CSS required." },
    { q: "Can I use my own domain?", a: "Custom domains are a Pro feature. Point your DNS to PortfolioHub and SSL is handled automatically." },
    { q: "Can I export my site?", a: "Pro users can export a static HTML/CSS bundle at any time — your content stays yours." },
    { q: "Can I switch templates later?", a: "Yes. Your content lives independently from the template, so you can swap the design anytime." },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <div className="text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">FAQ</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Questions, <span className="italic text-gradient-brand">answered.</span>
        </h2>
      </div>
      <dl className="mt-14 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium">
              {f.q}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-border transition-transform group-open:rotate-45 shrink-0">
                <span className="text-lg leading-none">+</span>
              </span>
            </summary>
            <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
          </details>
        ))}
      </dl>
    </section>
  );
}
