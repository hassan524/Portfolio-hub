import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { to: "/templates", label: "Templates" },
      { to: "/features", label: "Features" },
      { to: "/pricing", label: "Pricing" },
      { to: "/showcase", label: "Showcase" },
      { to: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Build",
    links: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/editor", label: "Editor" },
      { to: "/deploy", label: "Deploy" },
      { to: "/analytics", label: "Analytics" },
      { to: "/domains", label: "Custom domains" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/guides", label: "Guides" },
      { to: "/help", label: "Help center" },
      { to: "/blog", label: "Blog" },
      { to: "/contact", label: "Contact" },
      { to: "/status", label: "Status" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/careers", label: "Careers" },
      { to: "/privacy", label: "Privacy" },
      { to: "/terms", label: "Terms" },
      { to: "/cookies", label: "Cookies" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold">PortfolioHub</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink-soft leading-relaxed">
              The fastest way to publish a portfolio you're proud of. Free, forever — with
              premium templates included.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { label: "Tw", href: "/social/twitter" },
                { label: "Gh", href: "/social/github" },
                { label: "In", href: "/social/linkedin" },
                { label: "Ig", href: "/social/instagram" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-[11px] font-medium text-ink-soft hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink hover:text-ink-soft transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} PortfolioHub. Crafted for creators everywhere.
          </p>
          <div className="flex gap-5 text-xs text-ink-soft">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/status">All systems normal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
