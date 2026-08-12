import { PageShell, Prose } from "@/components/individual/PageShell";

export function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie policy"
      subtitle="One cookie. That's it. No trackers, no ad networks."
    >
      <Prose>
        <h2>Session cookie</h2>
        <p>A first-party session token so you stay signed in. No third-party analytics or ad cookies on portflu.app.</p>
        <h2>Published portfolios</h2>
        <p>Portfolios have zero cookies by default. Third-party embeds (YouTube, Vimeo) may set their own — that's on them.</p>
      </Prose>
    </PageShell>
  );
}
