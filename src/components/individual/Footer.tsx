import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight, ShieldCheck } from "lucide-react";
import { FaXTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

export function Footer() {
  const linkGroups = [
    {
      title: "Product",
      links: [
        { label: "Templates", to: "/templates" },
        { label: "Features", to: "/features" },
        { label: "Pricing", to: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", to: "/help" },
        { label: "Contact Us", to: "/contact" },
        { label: "Refund Policy", to: "/refunds" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
        { label: "Cookie Policy", to: "/cookies" },
      ],
    },
  ];

  const socials = [
    { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="relative border-t border-border/60 bg-surface text-ink overflow-hidden" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Decorative subtle ambient glow */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 cursor-pointer group">
              <img
                src="/logo.png"
                alt="Portflu"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="max-w-sm text-sm text-ink-soft leading-relaxed">
              Build and publish high-converting, professional portfolios in minutes with customizable templates and instant hosting.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-white/[0.02] text-ink-soft transition-all duration-200 hover:text-white hover:border-emerald-500/40 hover:bg-emerald-950/40 hover:scale-105 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Group Columns */}
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft/80">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-white hover:translate-x-0.5 transition-all duration-200 cursor-pointer group"
                    >
                      <span>{l.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-8 text-xs text-ink-soft">
          <p>© {new Date().getFullYear()} Portflu. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors cursor-pointer">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}