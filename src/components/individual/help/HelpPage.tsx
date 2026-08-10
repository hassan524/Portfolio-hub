import { Link } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";

export function HelpPage() {
  return (
    <PageShell eyebrow="Support" title="Help center" subtitle="Answers to the questions we get most. Can't find yours? Email hello@portflu.app.">
      <div className="space-y-3">
        {[
          "How do I connect a custom domain?",
          "Can I change templates after publishing?",
          "How do I export my portfolio?",
          "Why isn't my domain resolving?",
          "How do I add a password to my draft?",
          "Can I invite collaborators?",
          "How do I cancel my Pro subscription?",
          "Where does Portflu host my site?",
        ].map((q) => (
          <details key={q} className="rounded-xl border border-border p-4 group [&_summary::-webkit-details-marker]:hidden">
            <summary className="cursor-pointer flex items-center justify-between font-medium">
              {q}
              <span className="group-open:rotate-45 transition-transform text-xl">+</span>
            </summary>
            <p className="mt-3 text-sm text-ink-soft leading-relaxed">
              This article walks through everything you need. If you get stuck,{" "}
              <Link to="/contact" className="underline">reach out</Link> and we'll help.
            </p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
