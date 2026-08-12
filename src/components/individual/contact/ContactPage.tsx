import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaLinkedin, FaSquareXTwitter, FaWhatsapp } from "react-icons/fa6";
import { PageShell } from "@/components/individual/PageShell";

const SOCIAL = [
  { label: "X (Twitter)", href: "https://twitter.com/portflu", icon: FaSquareXTwitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/portflu", icon: FaLinkedin },
  { label: "WhatsApp", href: "https://wa.me/351912345678", icon: FaWhatsapp },
];

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <PageShell
      eyebrow="Contact"
      title="Let's talk."
      subtitle="Questions, feedback, or a bug on your live site — we're here. We reply within a business day, usually much faster."
    >
      <div className="grid gap-14 lg:grid-cols-5 lg:gap-16">
        {/* Left — intro & socials */}
        <div className="relative lg:col-span-2">
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

          <p className="relative max-w-sm text-base leading-relaxed text-ink-soft sm:text-lg">
            Whether you're choosing a plan, connecting a domain, or just want to say hi —
            drop us a message. For urgent issues on a live portfolio, include your domain
            name so we can help faster.
          </p>

          <div className="relative mt-8 space-y-3">
            <a
              href="mailto:hello@portflu.app"
              className="flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-4 w-4 text-primary" />
              hello@portflu.app
            </a>
            <div className="flex items-start gap-2.5 text-sm text-ink-soft">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Rua da Boavista 84
                <br />
                1200-069 Lisboa, Portugal
              </span>
            </div>
          </div>

          <div className="relative mt-10 border-t border-border pt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Find us on
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                  {s.label.split(" ")[0]}
                </a>
              ))}
            </div>

            <p className="mt-6 text-xs text-ink-soft">
              Support:{" "}
              <a href="mailto:support@portflu.app" className="text-primary hover:underline">
                support@portflu.app
              </a>
              {" · "}
              Press:{" "}
              <a href="mailto:press@portflu.app" className="text-primary hover:underline">
                press@portflu.app
              </a>
            </p>
          </div>
        </div>

        {/* Right — form */}
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-3 lg:border-l lg:border-border lg:pl-16"
        >
          <div className="grid gap-7 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="text-xs font-medium text-ink-soft">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary"
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="email" className="text-xs font-medium text-ink-soft">
                Email
              </label>
              <input
                id="email"
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="text-xs font-medium text-ink-soft">
                Subject
              </label>
              <input
                id="subject"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
                className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-xs font-medium text-ink-soft">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us what's on your mind…"
                className="mt-2 w-full resize-none border-b border-border bg-transparent py-2 text-sm outline-none transition-colors placeholder:text-ink-soft/50 focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90"
          >
            {sent ? (
              "Sent — we'll reply soon"
            ) : (
              <>
                Send message
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </PageShell>
  );
}