import { useState } from "react";
import { Toggle } from "./DashboardShared";
import { Globe, ShieldCheck, Server, AlertTriangle, Check, Copy, Info } from "lucide-react";

export function SettingsTab({ domain }: { domain: string }) {
  const [currentDomain, setCurrentDomain] = useState(domain);
  const [indexable, setIndexable] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [password, setPassword] = useState(false);
  const [savedDomain, setSavedDomain] = useState(false);
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  const handleSaveDomain = () => {
    setSavedDomain(true);
    setTimeout(() => setSavedDomain(false), 2000);
  };

  const copyDnsRecord = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedRecord(val);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  return (
    <div className="w-full space-y-8 py-3">
      {/* Domain & Hosting Section Panel */}
      <section className="rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-6 space-y-6 shadow-soft">
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <Globe className="size-4 sm:size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Custom Domain
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Connect your personalized web domain to your live portfolio
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Domain Input Field Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/70 bg-background/60">
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                Domain Name
              </h3>
              <p className="text-xs text-muted-foreground">
                Enter your domain address (e.g. <code className="font-mono text-primary font-semibold">alexdeveloper.com</code>).
              </p>
            </div>

            <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <input
                type="text"
                value={currentDomain}
                onChange={(e) => setCurrentDomain(e.target.value)}
                placeholder="my-domain.com"
                className="w-full sm:w-64 rounded-xl border border-border/80 bg-background px-3.5 py-2.5 font-mono text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 shadow-sm transition-all"
              />
              <button
                onClick={handleSaveDomain}
                className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                {savedDomain ? (
                  <>
                    <Check className="size-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Domain</span>
                )}
              </button>
            </div>
          </div>

          {/* DNS Instructions Card */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Info className="size-4 text-primary shrink-0" />
              <span>Required DNS Configuration</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Add these DNS records at your domain provider (GoDaddy, Namecheap, Cloudflare):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card/60 p-3 text-xs gap-2">
                <div className="min-w-0">
                  <span className="font-semibold text-muted-foreground block text-[10px] uppercase">A Record (Root)</span>
                  <code className="font-mono font-bold text-foreground break-all text-[11px] sm:text-xs">76.76.21.21</code>
                </div>
                <button
                  onClick={() => copyDnsRecord("76.76.21.21")}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors shrink-0 cursor-pointer"
                >
                  {copiedRecord === "76.76.21.21" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border/70 bg-card/60 p-3 text-xs gap-2">
                <div className="min-w-0">
                  <span className="font-semibold text-muted-foreground block text-[10px] uppercase">CNAME Record (www)</span>
                  <code className="font-mono font-bold text-foreground break-all text-[11px] sm:text-xs">cname.portfoliohub.dev</code>
                </div>
                <button
                  onClick={() => copyDnsRecord("cname.portfoliohub.dev")}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded transition-colors shrink-0 cursor-pointer"
                >
                  {copiedRecord === "cname.portfoliohub.dev" ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visibility & Privacy Section Panel */}
      <section className="rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-6 space-y-6 shadow-soft">
        <div className="flex items-center gap-3 border-b border-border/60 pb-4">
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
            <ShieldCheck className="size-4 sm:size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Privacy & Search Visibility
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Control search engine indexing and visitor access rules
            </p>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Search Indexing</h3>
              <p className="text-xs text-muted-foreground">
                Allow Google and Bing search engines to show your portfolio.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={indexable} onChange={setIndexable} />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Password Protection</h3>
              <p className="text-xs text-muted-foreground">
                Require visitors to enter a passphrase to view your site.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={password} onChange={setPassword} />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Cookieless Analytics</h3>
              <p className="text-xs text-muted-foreground">
                Track visitor count while preserving user privacy.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={analytics} onChange={setAnalytics} />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone Section Panel */}
      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5 sm:p-6 space-y-5 shadow-soft">
        <div className="flex items-center gap-3 border-b border-destructive/20 pb-4">
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive border border-destructive/30 shrink-0">
            <AlertTriangle className="size-4 sm:size-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">
              Danger Zone
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Irreversible management actions for your portfolio
            </p>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-border/60 bg-background/80">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Transfer Project</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Move ownership of this portfolio to another workspace.
              </p>
            </div>
            <button className="shrink-0 rounded-xl border border-border/80 bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer self-start sm:self-auto">
              Transfer
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-destructive">Delete Portfolio</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently remove this project and all data.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this portfolio? This action cannot be undone.")) {
                  alert("Portfolio deleted.");
                }
              }}
              className="shrink-0 rounded-xl bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground hover:opacity-90 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
            >
              Delete Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
