// @ts-nocheck
import { useId } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
function readableOn(color: string) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((color || "").trim());
  if (!m) return "#ffffff";
  let h = m[1];
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const l = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b) > 0.45 ? "#0B0F19" : "#ffffff";
}

/* props.category = ai | saas | agency | developer ; props.content overrides any key */
const PRESETS: Record<string, any> = {
  ai: {
    eyebrow: "Secure Onboarding", title: "Request priority cluster access",
    sub: "Deploy your dedicated inference nodes with enterprise SLA guarantees. Our solutions engineers will configure your custom vector pipeline within 2 hours.",
    perks: ["Dedicated GPU cluster partition", "Custom fine-tuned weights hosting", "24/7 direct Slack channel with core AI engineers"],
    formTitle: "Enterprise Access Form", badge: "Secure 256-bit", cta: "Deploy Dedicated Cluster",
    fields: [
      { label: "Full Name", value: "Jane Doe" }, { label: "Work Email", value: "jane@company.com" },
      { label: "Company & Scale", value: "Acme Corp (50M+ monthly tokens)" },
      { label: "Technical Requirements", value: "We need custom fine-tuning on Llama-3 with sub-20ms RAG latency...", tall: true },
    ],
  },
  saas: {
    eyebrow: "Get started", title: "Bring your team on board",
    sub: "Start a 14-day trial, no card needed. We'll help migrate your data and set up your first automations.",
    perks: ["Free migration from your current tools", "Dedicated onboarding specialist", "Priority support on every plan"],
    formTitle: "Start your trial", badge: "No card required", cta: "Start Free Trial",
    fields: [
      { label: "Full Name", value: "Jane Doe" }, { label: "Work Email", value: "jane@company.com" },
      { label: "Company & Team Size", value: "Acme Corp (25 people)" },
      { label: "What are you hoping to solve?", value: "We want to consolidate our project tools and automate handoffs...", tall: true },
    ],
  },
  agency: {
    eyebrow: "Let's talk", title: "Tell us about your project",
    sub: "Share a few details and we'll reply within one business day with next steps, a rough timeline, and a fixed-scope quote.",
    perks: ["Reply within one business day", "Fixed-scope quotes, no surprises", "Senior team on every project"],
    formTitle: "Project inquiry", badge: "Booking Q4", cta: "Send Inquiry",
    fields: [
      { label: "Full Name", value: "Jane Doe" }, { label: "Email", value: "jane@brand.com" },
      { label: "Company & Budget", value: "Acme Co ($25k–$50k)" },
      { label: "Project Details", value: "We're launching a new product line and need a full brand and website...", tall: true },
    ],
  },
  developer: {
    eyebrow: "Work with me", title: "Let's build something great",
    sub: "Available for freelance projects and contract work. Tell me what you're building and I'll reply within a day.",
    perks: ["Reply within 24 hours", "Clear scope and estimates", "Ongoing support after launch"],
    formTitle: "Project inquiry", badge: "Available", cta: "Send Message",
    fields: [
      { label: "Your Name", value: "Jane Doe" }, { label: "Email", value: "jane@company.com" },
      { label: "Company / Project", value: "Acme Inc, new SaaS dashboard" },
      { label: "Details", value: "We need a Next.js dashboard with Supabase auth and realtime data...", tall: true },
    ],
  },
};

function GridBackdrop({ color }: { color: string }) {
  const id = useId();
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id={`${id}p`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke={color} strokeWidth="1" opacity="0.14" />
          <circle r="1.6" fill={color} opacity="0.5" />
        </pattern>
        <radialGradient id={`${id}g`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="white" /><stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}m`}><rect width="100%" height="100%" fill={`url(#${id}g)`} /></mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}p)`} mask={`url(#${id}m)`} />
    </svg>
  );
}

export function AIProduct1Contact({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), lineStrong = mix(ink, 24), muted = mix(ink, 72);
  const soft = (p: number) => mix(accent, p);
  const onAccent = readableOn(accent);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };
  const fieldBox = { backgroundColor: mix(bg, 80), border: `1px solid ${line}`, color: ink };
  const socials = [{ icon: FaGithub, label: "GitHub" }, { icon: FaLinkedin, label: "LinkedIn" }, { icon: FaTwitter, label: "Twitter" }];

  return (
    <section className="relative px-6 md:px-16 py-28 md:py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      <GridBackdrop color={accent} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none" style={{ background: accent, opacity: 0.12 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest backdrop-blur-md" style={{ background: soft(12), color: accent, border: `1px solid ${soft(30)}` }}>
              <Terminal className="h-3.5 w-3.5" />
              <Editable className="inline">{c.eyebrow}</Editable>
            </div>
            <Editable as="h2" className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]" style={{ color: ink }}>{c.title}</Editable>
            <Editable as="p" className="text-base leading-relaxed" style={{ color: muted }}>{c.sub}</Editable>

            <div className="space-y-4 pt-2">
              {c.perks.map((perk: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <div className="h-5 w-5 rounded-full grid place-items-center shrink-0" style={{ background: soft(20), color: accent }}>
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </div>
                  <Editable className="inline">{perk}</Editable>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a key={i} href="#" aria-label={s.label} whileHover={{ y: -3, borderColor: accent, color: accent }}
                    className="h-11 w-11 rounded-2xl grid place-items-center transition-all border"
                    style={{ backgroundColor: surface, borderColor: line, color: ink }}>
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl relative space-y-6 border"
            style={{ backgroundColor: surface, borderColor: lineStrong }}>
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: line }}>
              <Editable as="span" className="text-sm font-bold tracking-tight" style={{ color: ink }}>{c.formTitle}</Editable>
              <Editable as="span" className="text-xs font-mono px-2.5 py-1 rounded-full uppercase" style={{ background: soft(14), color: accent }}>{c.badge}</Editable>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {c.fields.slice(0, 2).map((f: any, i: number) => (
                <div key={i}>
                  <Editable className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: muted }}>{f.label}</Editable>
                  <div className="w-full px-4 py-3 rounded-2xl text-sm" style={fieldBox}><Editable className="inline">{f.value}</Editable></div>
                </div>
              ))}
            </div>
            {c.fields.slice(2).map((f: any, i: number) => (
              <div key={i}>
                <Editable className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: muted }}>{f.label}</Editable>
                <div className={`w-full px-4 py-3 rounded-2xl text-sm ${f.tall ? "min-h-[96px]" : ""}`} style={fieldBox}><Editable className="inline">{f.value}</Editable></div>
              </div>
            ))}

            <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}
              className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide cursor-pointer transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: accent, color: onAccent, boxShadow: `0 14px 36px ${soft(38)}` }}>
              <Sparkles className="h-4 w-4" />
              <Editable className="inline">{c.cta}</Editable>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}