import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/social/$")({
  head: () => ({
    meta: [
      { title: "Follow PortfolioHub" },
      { name: "description", content: "Follow PortfolioHub on social networks." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Social,
});

function Social() {
  const { _splat } = Route.useParams();
  const name = _splat ? _splat.charAt(0).toUpperCase() + _splat.slice(1) : "Social";
  return (
    <PageShell
      eyebrow="External"
      title={`We're on ${name}.`}
      subtitle="This link normally redirects you to our profile on the network. On this preview, use the button below."
    >
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://${_splat}.com/portfoliohub`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium"
        >
          Open {name} →
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
        >
          Back home
        </Link>
      </div>
    </PageShell>
  );
}
