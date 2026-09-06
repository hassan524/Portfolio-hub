import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { FaXTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export function Footer() {
  const linkGroups = [
    {
      title: "Product",
      links: [
        { label: "Templates", to: "/templates" },
        { label: "Features", to: "/features" },
        { label: "Pricing", to: "/pricing" },
        { label: "Changelog", to: "/changelog" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Careers", to: "/careers" },
        { label: "Blog", to: "/blog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", to: "/help" },
        { label: "Documentation", to: "/docs" },
        { label: "Community", to: "/community" },
        { label: "Status", to: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "Refunds", to: "/refunds" },
        { label: "Cookies", to: "/cookies" },
      ],
    },
  ];

  const socials = [
    { icon: FaXTwitter, href: "https://twitter.com" },
    { icon: FaGithub, href: "https://github.com" },
    { icon: FaLinkedin, href: "https://linkedin.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="relative border-t border-border bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="poppins text-lg font-semibold text-white">Portflu</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm text-ink-soft leading-relaxed">
              The fastest way to publish a portfolio you're proud of. Free,
              forever — with premium templates included.
            </p>

            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-ink-soft transition-colors duration-300 hover:text-white hover:border-white/25 hover:bg-white/5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                {group.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-soft hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} Portflu. Crafted for creators everywhere.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-ink-soft hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-ink-soft hover:text-white transition-colors">
              Terms
            </Link>
            <span className="text-xs text-ink-soft">
              Made with care, everywhere.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}