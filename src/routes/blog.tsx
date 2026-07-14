import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — PortfolioHub" },
      { name: "description", content: "Essays on portfolios, design, and getting hired." },
    ],
  }),
  component: Blog,
});

const POSTS = [
  { slug: "portfolio-in-an-hour", title: "How to build a portfolio in under an hour", excerpt: "You don't need a Bento grid, a scroll animation, or a manifesto. You need three projects and a way to email you.", date: "July 10, 2026", read: "6 min" },
  { slug: "case-study-shape", title: "The shape of a good case study", excerpt: "Context, constraints, decision, outcome. In that order. Everything else is decoration.", date: "June 22, 2026", read: "8 min" },
  { slug: "quit-redesigning", title: "Quit redesigning your portfolio", excerpt: "Every hour spent on your portfolio is an hour not spent on the work that fills it.", date: "June 3, 2026", read: "4 min" },
];

function Blog() {
  return (
    <PageShell eyebrow="Writing" title="Blog" subtitle="Occasional essays on portfolios, hiring, and the craft of shipping.">
      <div className="divide-y divide-border border-y border-border">
        {POSTS.map((p) => (
          <Link key={p.slug} to="/guides" className="block py-8 group">
            <div className="text-xs text-ink-soft">{p.date} · {p.read} read</div>
            <h2 className="mt-2 font-display text-3xl group-hover:italic transition-all">{p.title}</h2>
            <p className="mt-3 text-ink-soft max-w-2xl">{p.excerpt}</p>
            <span className="mt-4 inline-block text-sm underline">Read →</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
