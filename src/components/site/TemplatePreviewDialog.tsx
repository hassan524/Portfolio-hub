import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Check,
  Lock,
  Eye,
  Palette,
  Layout,
  Smartphone,
  Monitor,
  ChevronDown,
  Star,
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";
import type { Template } from "@/lib/templates";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type Props = {
  template: Template | null;
  open: boolean;
  onClose: () => void;
};

export function TemplatePreviewDialog({ template, open, onClose }: Props) {
  const [activeSection, setActiveSection] = useState("hero");

  if (!template) return null;

  const [bg, ink, accent] = template.palette;

  const sections = [
    { id: "hero", label: "Hero", icon: Monitor },
    { id: "about", label: "About", icon: Eye },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[96vw] h-[92vh] max-w-[1600px] rounded-3xl border border-border bg-background shadow-lift overflow-hidden flex"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-surface-elevated border border-border hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* LEFT SIDEBAR */}
            <div className="w-[320px] shrink-0 border-r border-border bg-surface flex flex-col overflow-y-auto">
              {/* Template header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-ink-soft">
                    {template.category} Template
                  </span>
                  {template.isPro && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-foreground text-background px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase">
                      <Lock className="h-2.5 w-2.5" /> Pro
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-display text-3xl">{template.name}</h2>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  {template.tagline}
                </p>

                <div className="mt-5 flex gap-2">
                  <Link
                    to="/templates/$slug"
                    params={{ slug: template.slug }}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium shadow-soft hover:shadow-lift transition-all"
                  >
                    Use template <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    to="/templates/$slug"
                    params={{ slug: template.slug }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary transition-colors shrink-0"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Sections nav */}
              <div className="p-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-2">
                  Sections
                </div>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                      activeSection === s.id
                        ? "bg-foreground text-background"
                        : "text-ink hover:bg-secondary"
                    }`}
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Palette */}
              <div className="p-4 border-t border-border">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">
                  Color Palette
                </div>
                <div className="flex gap-2 px-2">
                  {template.palette.map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5">
                      <div
                        className="h-8 w-8 rounded-lg border border-border shadow-sm"
                        style={{ background: c }}
                      />
                      <span className="text-[9px] text-ink-soft font-mono">
                        {c}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 border-t border-border">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">
                  Details
                </div>
                <dl className="space-y-3 px-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Layout</dt>
                    <dd className="capitalize">{template.layout}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Responsive</dt>
                    <dd className="inline-flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Yes
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Plan</dt>
                    <dd>{template.isPro ? "Pro" : "Free"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Sections</dt>
                    <dd>5 included</dd>
                  </div>
                </dl>
              </div>

              {/* Features */}
              <div className="p-4 border-t border-border flex-1">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">
                  Includes
                </div>
                <ul className="space-y-2 px-2 text-sm">
                  {[
                    "Responsive design",
                    "Dark mode ready",
                    "SEO optimized",
                    "Fast page loads",
                    "Custom fonts",
                    "Smooth animations",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-ink-soft"
                    >
                      <Check
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: accent }}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — LIVE PREVIEW */}
            <div className="flex-1 overflow-y-auto bg-surface-elevated">
              <div
                className="min-h-full"
                style={{ background: bg, color: ink }}
              >
                {/* Browser chrome */}
                <div
                  className="sticky top-0 z-10 flex items-center gap-1.5 border-b px-4 py-3"
                  style={{
                    borderColor: `${ink}15`,
                    background: bg,
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "#ff6058" }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "#ffbd2e" }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "#27ca40" }}
                  />
                  <div
                    className="ml-4 flex-1 text-center text-[11px] rounded-md py-1 px-3"
                    style={{
                      background: `${ink}08`,
                      color: `${ink}80`,
                    }}
                  >
                    yourname.portfoliohub.app
                  </div>
                </div>

                {/* ---- HERO SECTION ---- */}
                <section className="px-8 md:px-16 pt-16 pb-20">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className="text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `${ink}60` }}
                      >
                        Portfolio · 2026
                      </div>
                      <h1
                        className="mt-6 font-display text-5xl md:text-7xl leading-[0.92]"
                        style={{ color: ink }}
                      >
                        Alex Morgan
                      </h1>
                      <p
                        className="mt-2 font-display text-3xl md:text-4xl italic"
                        style={{ color: accent }}
                      >
                        {template.category === "Developer"
                          ? "Full-stack engineer building for the web."
                          : template.category === "Designer"
                            ? "Product designer crafting digital experiences."
                            : template.category === "Writer"
                              ? "Writing words that move people."
                              : template.category === "Photographer"
                                ? "Capturing moments that last forever."
                                : template.category === "Startup"
                                  ? "Building the future, one product at a time."
                                  : "Creating with intention and purpose."}
                      </p>
                      <p
                        className="mt-6 text-sm leading-relaxed max-w-lg"
                        style={{ color: `${ink}80` }}
                      >
                        Independent creative based in San Francisco. Currently
                        focused on helping ambitious teams ship beautiful,
                        thoughtful products that people love to use.
                      </p>

                      <div className="mt-8 flex items-center gap-3">
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
                          style={{
                            background: ink,
                            color: bg,
                          }}
                        >
                          View work{" "}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                        <div
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
                          style={{ borderColor: `${ink}25` }}
                        >
                          Get in touch
                        </div>
                      </div>

                      <div
                        className="mt-8 flex items-center gap-4 text-xs"
                        style={{ color: `${ink}50` }}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" /> San Francisco, CA
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Briefcase className="h-3 w-3" /> Available for
                          freelance
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* ---- PROJECTS SECTION ---- */}
                <section
                  className="px-8 md:px-16 py-16"
                  style={{ borderTop: `1px solid ${ink}10` }}
                >
                  <div
                    className="text-[10px] tracking-[0.25em] uppercase"
                    style={{ color: `${ink}50` }}
                  >
                    Selected Projects
                  </div>
                  <h2
                    className="mt-3 font-display text-3xl md:text-4xl"
                    style={{ color: ink }}
                  >
                    Recent work
                  </h2>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {[
                      {
                        title: "Field Notes App",
                        desc: "Mobile-first note taking for creatives",
                        color: accent,
                      },
                      {
                        title: "Nomad Banking",
                        desc: "Fintech rebrand & product design",
                        color: `${ink}18`,
                      },
                      {
                        title: "Tessera Editor",
                        desc: "Collaborative design tool",
                        color: `${ink}12`,
                      },
                      {
                        title: "Wavelength",
                        desc: "Music streaming dashboard",
                        color: accent + "cc",
                      },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="group/card rounded-xl overflow-hidden"
                        style={{ background: p.color }}
                      >
                        <div className="aspect-[16/10] p-5 flex flex-col justify-between">
                          <span
                            className="text-[9px] tracking-wider uppercase"
                            style={{
                              color: i === 0 || i === 3 ? `${bg}cc` : `${ink}50`,
                            }}
                          >
                            0{i + 1}
                          </span>
                          <div>
                            <div
                              className="text-sm font-medium"
                              style={{
                                color: i === 0 || i === 3 ? bg : ink,
                              }}
                            >
                              {p.title}
                            </div>
                            <div
                              className="text-[11px] mt-0.5"
                              style={{
                                color:
                                  i === 0 || i === 3 ? `${bg}aa` : `${ink}60`,
                              }}
                            >
                              {p.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* ---- ABOUT SECTION ---- */}
                <section
                  className="px-8 md:px-16 py-16"
                  style={{ borderTop: `1px solid ${ink}10` }}
                >
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <div
                        className="text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `${ink}50` }}
                      >
                        About
                      </div>
                      <h2
                        className="mt-3 font-display text-3xl"
                        style={{ color: ink }}
                      >
                        A little background
                      </h2>
                      <p
                        className="mt-4 text-sm leading-relaxed"
                        style={{ color: `${ink}70` }}
                      >
                        With over 8 years of experience in digital product
                        design, I've worked with startups and established
                        companies to create meaningful experiences. I believe in
                        simplicity, attention to detail, and the power of good
                        design to solve real problems.
                      </p>
                      <p
                        className="mt-3 text-sm leading-relaxed"
                        style={{ color: `${ink}70` }}
                      >
                        When I'm not designing, you'll find me hiking in the
                        Marin Headlands, experimenting with film photography,
                        or reading about behavioral psychology.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div
                        className="text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `${ink}50` }}
                      >
                        Skills & Tools
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Figma",
                          "React",
                          "TypeScript",
                          "Framer Motion",
                          "Tailwind",
                          "Node.js",
                          "Postgres",
                          "Vercel",
                        ].map((s) => (
                          <span
                            key={s}
                            className="rounded-full px-3 py-1.5 text-[11px]"
                            style={{
                              background: `${ink}08`,
                              color: `${ink}80`,
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div
                        className="mt-6 text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `${ink}50` }}
                      >
                        Experience
                      </div>
                      {[
                        {
                          co: "Stripe",
                          role: "Senior Designer",
                          yr: "2022–Present",
                        },
                        {
                          co: "Linear",
                          role: "Product Designer",
                          yr: "2020–2022",
                        },
                        {
                          co: "Freelance",
                          role: "Independent",
                          yr: "2018–2020",
                        },
                      ].map((e) => (
                        <div
                          key={e.co}
                          className="flex items-center justify-between py-2 border-b text-sm"
                          style={{ borderColor: `${ink}10` }}
                        >
                          <div>
                            <div style={{ color: ink }}>{e.co}</div>
                            <div
                              className="text-xs"
                              style={{ color: `${ink}50` }}
                            >
                              {e.role}
                            </div>
                          </div>
                          <span
                            className="text-xs"
                            style={{ color: `${ink}40` }}
                          >
                            {e.yr}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* ---- CONTACT SECTION ---- */}
                <section
                  className="px-8 md:px-16 py-16"
                  style={{
                    borderTop: `1px solid ${ink}10`,
                    background: `${ink}04`,
                  }}
                >
                  <div className="max-w-lg">
                    <div
                      className="text-[10px] tracking-[0.25em] uppercase"
                      style={{ color: `${ink}50` }}
                    >
                      Get in touch
                    </div>
                    <h2
                      className="mt-3 font-display text-3xl"
                      style={{ color: ink }}
                    >
                      Let's work together
                    </h2>
                    <p
                      className="mt-3 text-sm"
                      style={{ color: `${ink}60` }}
                    >
                      I'm always open to discussing new projects, creative
                      ideas, or opportunities to be part of your visions.
                    </p>

                    <div className="mt-8 flex gap-3">
                      {[
                        { icon: Mail, label: "Email" },
                        { icon: GithubIcon, label: "GitHub" },
                        { icon: LinkedinIcon, label: "LinkedIn" },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border"
                          style={{ borderColor: `${ink}15`, color: `${ink}70` }}
                        >
                          <s.icon className="h-3.5 w-3.5" />
                          {s.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Footer */}
                <div
                  className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between"
                  style={{
                    borderTop: `1px solid ${ink}10`,
                    color: `${ink}40`,
                  }}
                >
                  <span>© 2026 Alex Morgan</span>
                  <span>
                    Built with{" "}
                    <span style={{ color: accent }}>PortfolioHub</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
