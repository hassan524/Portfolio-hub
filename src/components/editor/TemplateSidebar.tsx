import { Link } from "@tanstack/react-router";
import { Check, Eye, Layout, Monitor, Briefcase, Mail, ExternalLink, Save } from "lucide-react";
import type { SiteData, Theme } from "@/types/builder.schema";

const SECTIONS = [
    { id: "hero", label: "Hero", icon: Monitor },
    { id: "about", label: "About", icon: Eye },
    { id: "projects", label: "Projects", icon: Layout },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
];

const INCLUDES = [
    "Responsive design",
    "Dark mode ready",
    "SEO optimized",
    "Fast page loads",
    "Custom fonts",
    "Smooth animations",
];

export function TemplateSidebar({
    site,
    theme,
    activeSection,
    onSectionChange,
    onThemeChange,
    onSave,
}: {
    site: SiteData;
    theme: Theme;
    activeSection: string;
    onSectionChange: (id: string) => void;
    onThemeChange: (patch: Partial<Theme>) => void;
    onSave?: (site: SiteData) => void;
}) {
    const { bg, ink, accent } = theme;

    return (
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
                {SECTIONS.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => onSectionChange(s.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${activeSection === s.id ? "bg-foreground text-background" : "text-ink hover:bg-secondary"
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
                        { label: "bg", value: bg, set: (v: string) => onThemeChange({ bg: v }) },
                        { label: "ink", value: ink, set: (v: string) => onThemeChange({ ink: v }) },
                        { label: "accent", value: accent, set: (v: string) => onThemeChange({ accent: v }) },
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
                        <dd>{site.blocks?.length ?? 0} included</dd>
                    </div>
                </dl>
            </div>

            <div className="p-4 border-t border-border flex-1">
                <div className="text-[10px] tracking-[0.2em] uppercase text-ink-soft px-2 mb-3">Includes</div>
                <ul className="space-y-2 px-2 text-sm">
                    {INCLUDES.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-ink-soft">
                            <Check className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}