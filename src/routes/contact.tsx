import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PortfolioHub" },
      { name: "description", content: "Reach the PortfolioHub team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell
      eyebrow="Contact"
      title="Say hi."
      subtitle="We reply within a business day, usually much faster. For urgent issues on a live site, mention the domain."
    >
      <div className="grid md:grid-cols-2 gap-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-5"
        >
          <div>
            <label className="text-xs uppercase tracking-widest text-ink-soft">Name</label>
            <input required className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-ink-soft">Email</label>
            <input required type="email" className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-ink-soft">Message</label>
            <textarea required rows={5} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium">
            {sent ? "Sent — talk soon" : "Send message"}
          </button>
        </form>
        <div className="space-y-6 text-sm">
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-soft">General</div>
            <div className="mt-1">hello@portfoliohub.app</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-soft">Support</div>
            <div className="mt-1">support@portfoliohub.app</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-soft">Press</div>
            <div className="mt-1">press@portfoliohub.app</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-soft">Office</div>
            <div className="mt-1">Rua da Boavista 84<br />1200-069 Lisboa, Portugal</div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
