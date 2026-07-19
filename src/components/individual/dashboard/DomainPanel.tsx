import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Globe, ExternalLink, CheckCircle } from "lucide-react";
import { type Portfolio } from "./types";

interface DomainPanelProps {
  portfolio: Portfolio;
  onUpdate: (p: Portfolio) => void;
}

export function DomainPanel({ portfolio, onUpdate }: DomainPanelProps) {
  const [customDomain, setCustomDomain] = useState(portfolio.domain || "");
  const [connected, setConnected] = useState(!!portfolio.domain && portfolio.domain !== "Not connected");
  const [saving, setSaving] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomain.trim()) return;

    setSaving(true);
    setTimeout(() => {
      onUpdate({
        ...portfolio,
        domain: customDomain,
      });
      setConnected(true);
      setSaving(false);
    }, 1000);
  };

  const handleRemove = () => {
    if (confirm("Disconnect custom domain? Your site will fall back to your subdomain.")) {
      onUpdate({
        ...portfolio,
        domain: "Not connected",
      });
      setCustomDomain("");
      setConnected(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Subdomain settings */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <h3 className="text-lg font-bold font-display mb-1">Standard Subdomain</h3>
        <p className="text-xs text-ink-soft mb-5">Your website is always available on our free subdomain hosting.</p>

        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
            <Globe className="h-4 w-4 text-ink-soft shrink-0" />
            <span className="text-sm font-mono">{portfolio.url}</span>
          </div>
          <a
            href={`https://${portfolio.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-surface hover:bg-secondary transition-colors shrink-0"
          >
            <ExternalLink className="h-4 w-4 text-ink" />
          </a>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-green-600 font-bold">
          <CheckCircle className="h-4 w-4 text-green-600" />
          SSL active · Automated HTTPS propagation
        </div>
      </div>

      {/* Custom Domain setup */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <div className="flex items-center gap-2.5 mb-1">
          <h3 className="text-lg font-bold font-display">Custom Domain</h3>
          <span className="inline-flex items-center rounded-full bg-foreground text-background px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            Pro
          </span>
        </div>
        <p className="text-xs text-ink-soft mb-5">Configure your custom branded URL (e.g. hassanmughal.dev).</p>

        {connected ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-green-200/50 bg-green-500/5">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-bold">{portfolio.domain}</div>
                  <div className="text-[11px] text-green-600 font-semibold mt-0.5">Active · DNS verified & SSL configured</div>
                </div>
              </div>
              <button
                onClick={handleRemove}
                className="rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
              >
                Disconnect
              </button>
            </div>

            {/* DNS Instructions */}
            <div className="rounded-2xl border border-border/80 bg-surface/50 p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Verified DNS Settings</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border text-ink-soft">
                      <th className="pb-2 font-bold">Type</th>
                      <th className="pb-2 font-bold">Host</th>
                      <th className="pb-2 font-bold">Value</th>
                      <th className="pb-2 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    <tr>
                      <td className="py-2.5 font-bold">CNAME</td>
                      <td className="py-2.5">www</td>
                      <td className="py-2.5">cname.portfoliohub.app</td>
                      <td className="py-2.5 text-green-600 font-bold">✓ Verified</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold">A</td>
                      <td className="py-2.5">@</td>
                      <td className="py-2.5">76.76.21.21</td>
                      <td className="py-2.5 text-green-600 font-bold">✓ Verified</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConnect} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                required
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                placeholder="e.g. hassanmughal.dev"
                className="flex-1 rounded-xl border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-foreground text-background px-6 py-3 text-xs font-bold shadow-soft hover:shadow-lift transition-all cursor-pointer flex items-center gap-1.5"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Connect
              </button>
            </div>

            <div className="rounded-2xl bg-secondary/40 p-5 text-xs text-ink-soft space-y-2">
              <p className="font-bold text-ink">Required DNS Configuration</p>
              <p>To point your domain here, log in to your DNS provider and add these records:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>A record at <code className="font-mono bg-surface px-1.5 py-0.5 rounded">@</code> pointing to <code className="font-mono bg-surface px-1.5 py-0.5 rounded">76.76.21.21</code></li>
                <li>CNAME record at <code className="font-mono bg-surface px-1.5 py-0.5 rounded">www</code> pointing to <code className="font-mono bg-surface px-1.5 py-0.5 rounded">cname.portfoliohub.app</code></li>
              </ul>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}
