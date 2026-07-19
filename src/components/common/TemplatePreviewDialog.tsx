import { useState, useEffect } from "react";
import type { ElementType, CSSProperties, FocusEvent } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  Check,
  Eye,
  Layout,
  Monitor,
  Briefcase,
  Mail,
  MapPin,
  ExternalLink,
  Save,
} from "lucide-react";
import type {
  SiteData,
  HeroProps,
  ProjectsProps,
  AboutProps,
  ContactProps,
} from "@/types/builder.schema";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_ICONS: Record<string, any> = { email: Mail, github: GithubIcon, linkedin: LinkedinIcon };

function Editable({
  value,
  onChange,
  as: Tag = "div",
  className,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: FocusEvent<HTMLElement>) => onChange(e.currentTarget.textContent ?? "")}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
    >
      {value}
    </Tag>
  );
}

type Props = {
  template: SiteData | null;
  open: boolean;
  onClose: () => void;
  onSave?: (site: SiteData) => void;
};

const FALLBACK_THEME = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft" as const,
  spacing: "cozy" as const,
};

export function TemplatePreviewDialog({ template, open, onClose, onSave }: Props) {
  const [activeSection, setActiveSection] = useState("hero");
  const [site, setSite] = useState<SiteData | null>(null);

  // Load a fresh editable copy whenever a new template is opened
  useEffect(() => {
    setSite(template ? structuredClone(template) : null);
  }, [template]);

  if (!open || !template || !site) return null;

  const theme = site.theme ?? FALLBACK_THEME;
  const bg = theme.bg;
  const ink = theme.ink;
  const accent = theme.accent;

  const blocks = site.blocks ?? [];
  const heroBlock = blocks.find((b) => b.props.kind === "hero");
  const projectsBlock = blocks.find((b) => b.props.kind === "projects");
  const aboutBlock = blocks.find((b) => b.props.kind === "about");
  const contactBlock = blocks.find((b) => b.props.kind === "contact");

  const hero = heroBlock?.props as HeroProps | undefined;
  const projects = projectsBlock?.props as ProjectsProps | undefined;
  const about = aboutBlock?.props as AboutProps | undefined;
  const contact = contactBlock?.props as ContactProps | undefined;

  const sections = [
    { id: "hero", label: "Hero", icon: Monitor },
    { id: "about", label: "About", icon: Eye },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  function updateBlockProps(blockId: string, patch: Record<string, any>) {
    setSite((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, props: { ...b.props, ...patch } } : b
        ),
      };
    });
  }

  function updateTheme(patch: Partial<typeof theme>) {
    setSite((prev) =>
      prev ? { ...prev, theme: { ...(prev.theme ?? FALLBACK_THEME), ...patch } } : prev
    );
  }

  function updateProjectItem(index: number, patch: Partial<{ title: string; desc: string }>) {
    if (!projectsBlock || !projects) return;
    const items = projects.items.map((it, i) => (i === index ? { ...it, ...patch } : it));
    updateBlockProps(projectsBlock.id, { items });
  }

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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[96vw] h-[92vh] max-w-[1600px] rounded-3xl border border-border bg-background shadow-lift overflow-hidden flex"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-surface-elevated border border-border hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            {/* LEFT SIDEBAR */}
            <div className="w-[320px] shrink-0 border-r border-border bg-surface flex flex-col overflow-y-auto">
              <div className="p-6 border-b border-border">
                <span className="text-[10px] tracking-[0.2em] uppercase text-ink-soft">
                  {site.category} Template
                </span>
                <h2 className="mt-2 font-display text-3xl">{site.name}</h2>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{site.tagline}</p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => onSave?.(site)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium shadow-soft hover:shadow-lift transition-all"
                  >
                    Save & use <Save className="h-3.5 w-3.5" />
                  </button>
                  <Link
                    to="/dashboard"
                    search={{ create: "true", template: site.id }}
                    target="_blank"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary transition-colors shrink-0"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <p className="mt-3 text-[11px] text-ink-soft">
                  Edit any text directly on the right — click it and start typing.
                </p>
              </div>

              <div className="p-4">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-2">Sections</div>
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                      activeSection === s.id ? "bg-foreground text-background" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">
                  Color Palette
                </div>
                <div className="flex gap-3 px-2">
                  {([
                    { label: "bg", value: bg, set: (v: string) => updateTheme({ bg: v }) },
                    { label: "ink", value: ink, set: (v: string) => updateTheme({ ink: v }) },
                    { label: "accent", value: accent, set: (v: string) => updateTheme({ accent: v }) },
                  ] as const).map((c) => (
                    <label key={c.label} className="flex flex-col items-center gap-1.5 cursor-pointer">
                      <div className="relative h-8 w-8 rounded-lg border border-border shadow-sm overflow-hidden">
                        <div className="absolute inset-0" style={{ background: c.value }} />
                        <input
                          type="color"
                          value={c.value}
                          onChange={(e) => c.set(e.target.value)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <span className="text-[9px] text-ink-soft font-mono">{c.value}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">Details</div>
                <dl className="space-y-3 px-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Corners</dt>
                    <dd className="capitalize">{theme.corners}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Responsive</dt>
                    <dd className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Yes</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">Sections</dt>
                    <dd>{blocks.length} included</dd>
                  </div>
                </dl>
              </div>

              <div className="p-4 border-t border-border flex-1">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">Includes</div>
                <ul className="space-y-2 px-2 text-sm">
                  {["Responsive design", "Dark mode ready", "SEO optimized", "Fast page loads", "Custom fonts", "Smooth animations"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-ink-soft">
                      <Check className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT — LIVE, EDITABLE PREVIEW */}
            <div className="flex-1 overflow-y-auto bg-surface-elevated">
              <div className="min-h-full" style={{ background: bg, color: ink }}>
                <div
                  className="sticky top-0 z-10 flex items-center gap-1.5 border-b px-4 py-3"
                  style={{ borderColor: `${ink}15`, background: bg }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
                  <div
                    className="ml-4 flex-1 text-center text-[11px] rounded-md py-1 px-3"
                    style={{ background: `${ink}08`, color: `${ink}80` }}
                  >
                    yourname.portfoliohub.app
                  </div>
                </div>

                {hero && heroBlock && (
                  <section className="px-8 md:px-16 pt-16 pb-20">
                    <div className="max-w-3xl">
                      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>
                          {hero.eyebrow}
                        </div>
                        <Editable
                          as="h1"
                          value={hero.name}
                          onChange={(v) => updateBlockProps(heroBlock.id, { name: v })}
                          className="mt-6 font-display text-5xl md:text-7xl leading-[0.92]"
                          style={{ color: ink }}
                        />
                        <Editable
                          as="p"
                          value={hero.tagline}
                          onChange={(v) => updateBlockProps(heroBlock.id, { tagline: v })}
                          className="mt-2 font-display text-3xl md:text-4xl italic"
                          style={{ color: accent }}
                        />
                        <Editable
                          as="p"
                          value={hero.bio}
                          onChange={(v) => updateBlockProps(heroBlock.id, { bio: v })}
                          className="mt-6 text-sm leading-relaxed max-w-lg"
                          style={{ color: `${ink}80` }}
                        />

                        <div className="mt-8 flex items-center gap-3">
                          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium" style={{ background: ink, color: bg }}>
                            <Editable
                              value={hero.primaryCta}
                              onChange={(v) => updateBlockProps(heroBlock.id, { primaryCta: v })}
                              className="inline"
                            />
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border" style={{ borderColor: `${ink}25` }}>
                            <Editable
                              value={hero.secondaryCta}
                              onChange={(v) => updateBlockProps(heroBlock.id, { secondaryCta: v })}
                              className="inline"
                            />
                          </div>
                        </div>

                        <div className="mt-8 flex items-center gap-4 text-xs" style={{ color: `${ink}50` }}>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            <Editable value={hero.location} onChange={(v) => updateBlockProps(heroBlock.id, { location: v })} className="inline" />
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3 w-3" />
                            <Editable value={hero.availability} onChange={(v) => updateBlockProps(heroBlock.id, { availability: v })} className="inline" />
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </section>
                )}

                {projects && (
                  <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
                    <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}50` }}>
                      {projects.eyebrow}
                    </div>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl" style={{ color: ink }}>
                      {projects.heading}
                    </h2>

                    <div className="mt-10 grid grid-cols-2 gap-4">
                      {projects.items.map((p, i) => {
                        const cardBg = p.featured ? accent : `${ink}${i % 2 === 0 ? "18" : "12"}`;
                        const textColor = p.featured ? bg : ink;
                        return (
                          <div key={i} className="rounded-xl overflow-hidden" style={{ background: cardBg }}>
                            <div className="aspect-[16/10] p-5 flex flex-col justify-between">
                              <span className="text-[9px] tracking-wider uppercase" style={{ color: p.featured ? `${bg}cc` : `${ink}50` }}>
                                0{i + 1}
                              </span>
                              <div>
                                <Editable
                                  value={p.title}
                                  onChange={(v) => updateProjectItem(i, { title: v })}
                                  className="text-sm font-medium"
                                  style={{ color: textColor }}
                                />
                                <Editable
                                  value={p.desc}
                                  onChange={(v) => updateProjectItem(i, { desc: v })}
                                  className="text-[11px] mt-0.5"
                                  style={{ color: p.featured ? `${bg}aa` : `${ink}60` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {about && aboutBlock && (
                  <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}50` }}>About</div>
                        <Editable
                          as="h2"
                          value={about.heading}
                          onChange={(v) => updateBlockProps(aboutBlock.id, { heading: v })}
                          className="mt-3 font-display text-3xl"
                          style={{ color: ink }}
                        />
                        {about.paragraphs.map((p, i) => (
                          <Editable
                            key={i}
                            as="p"
                            value={p}
                            onChange={(v) => {
                              const paragraphs = about.paragraphs.map((par, idx) => (idx === i ? v : par));
                              updateBlockProps(aboutBlock.id, { paragraphs });
                            }}
                            className="mt-4 text-sm leading-relaxed"
                            style={{ color: `${ink}70` }}
                          />
                        ))}
                      </div>
                      <div className="space-y-4">
                        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}50` }}>Skills & Tools</div>
                        <div className="flex flex-wrap gap-2">
                          {about.skills.map((s, i) => (
                            <Editable
                              key={i}
                              value={s}
                              onChange={(v) => {
                                const skills = about.skills.map((sk, idx) => (idx === i ? v : sk));
                                updateBlockProps(aboutBlock.id, { skills });
                              }}
                              className="rounded-full px-3 py-1.5 text-[11px] inline-block"
                              style={{ background: `${ink}08`, color: `${ink}80` }}
                            />
                          ))}
                        </div>

                        <div className="mt-6 text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}50` }}>Experience</div>
                        {about.experience.map((e, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b text-sm" style={{ borderColor: `${ink}10` }}>
                            <div>
                              <div style={{ color: ink }}>{e.co}</div>
                              <div className="text-xs" style={{ color: `${ink}50` }}>{e.role}</div>
                            </div>
                            <span className="text-xs" style={{ color: `${ink}40` }}>{e.yr}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {contact && contactBlock && (
                  <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10`, background: `${ink}04` }}>
                    <div className="max-w-lg">
                      <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}50` }}>Get in touch</div>
                      <Editable
                        as="h2"
                        value={contact.heading}
                        onChange={(v) => updateBlockProps(contactBlock.id, { heading: v })}
                        className="mt-3 font-display text-3xl"
                        style={{ color: ink }}
                      />
                      <Editable
                        as="p"
                        value={contact.message}
                        onChange={(v) => updateBlockProps(contactBlock.id, { message: v })}
                        className="mt-3 text-sm"
                        style={{ color: `${ink}60` }}
                      />

                      <div className="mt-8 flex gap-3">
                        {contact.socials.map((s) => {
                          const Icon = SOCIAL_ICONS[s.platform] ?? Mail;
                          return (
                            <div key={s.label} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border" style={{ borderColor: `${ink}15`, color: `${ink}70` }}>
                              <Icon className="h-3.5 w-3.5" />
                              {s.label}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}

                <div className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}40` }}>
                  <span>© 2026 {hero?.name ?? site.name}</span>
                  <span>Built with <span style={{ color: accent }}>PortfolioHub</span></span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}