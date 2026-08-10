import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-semibold">Portflu</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink-soft leading-relaxed">
              The fastest way to publish a portfolio you're proud of. Free, forever — with
              premium templates included.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/templates" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link to="/privacy" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Refunds
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-sm text-ink hover:text-ink-soft transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-xs text-ink-soft">
            © {new Date().getFullYear()} Portflu. Crafted for creators everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
