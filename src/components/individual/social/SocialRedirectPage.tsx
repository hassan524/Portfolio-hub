import { Link } from "@tanstack/react-router";
import { PageShell } from "@/components/common/PageShell";

export function SocialRedirectPage({ splat }: { splat: string }) {
  const name = splat ? splat.charAt(0).toUpperCase() + splat.slice(1) : "Social";
  return (
    <PageShell
      eyebrow="External"
      title={`We're on ${name}.`}
      subtitle="This link normally redirects you to our profile on the network. On this preview, use the button below."
    >
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://${splat}.com/portfoliohub`}
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
