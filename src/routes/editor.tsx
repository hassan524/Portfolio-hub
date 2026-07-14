import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Save, Eye, Rocket, Undo2, Plus, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Editor — PortfolioHub" },
      { name: "description", content: "Add your info, projects, and experience. See it live." },
    ],
  }),
  component: Editor,
});

const SECTIONS = ["Hero", "About", "Projects", "Experience", "Contact"] as const;

function Editor() {
  const [active, setActive] = useState<(typeof SECTIONS)[number]>("Hero");
  const [name, setName] = useState("Ari Kohen");
  const [role, setRole] = useState("Independent product designer");
  const [bio, setBio] = useState(
    "Currently helping small teams ship thoughtful software — mostly from Lisbon."
  );
  const [projects, setProjects] = useState([
    { title: "Field Notes app", tag: "iOS · 2024" },
    { title: "Nomad Bank rebrand", tag: "Identity · 2023" },
    { title: "Tessera editor", tag: "Web · 2023" },
  ]);

  return (
    <SiteLayout>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-sm text-ink-soft hover:text-ink">
              ← Dashboard
            </Link>
            <span className="text-ink-soft">/</span>
            <span className="text-sm font-medium">ari.portfolio</span>
            <span className="text-xs text-ink-soft ml-2 hidden md:inline">Auto-saved just now</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-secondary">
              <Undo2 className="h-4 w-4" /> Undo
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-secondary">
              <Eye className="h-4 w-4" /> Preview
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm hover:bg-secondary">
              <Save className="h-4 w-4" /> Save draft
            </button>
            <Link
              to="/deploy"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium"
            >
              <Rocket className="h-4 w-4" /> Publish
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 grid lg:grid-cols-12 gap-6">
        {/* Sections nav */}
        <aside className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-widest text-ink-soft">Sections</div>
          <nav className="mt-3 flex lg:flex-col gap-1 overflow-x-auto">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActive(s)}
                className={`text-left rounded-md px-3 py-2 text-sm whitespace-nowrap ${
                  active === s ? "bg-foreground text-background" : "hover:bg-secondary"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </aside>

        {/* Form */}
        <div className="lg:col-span-5 space-y-5">
          <Field label="Full name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Role / tagline">
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Short bio">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-ink-soft uppercase tracking-widest">Projects</div>
              <button
                onClick={() => setProjects([...projects, { title: "New project", tag: "2024" }])}
                className="inline-flex items-center gap-1 text-xs text-ink hover:underline"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>
            <div className="space-y-2">
              {projects.map((p, i) => (
                <div key={i} className="rounded-lg border border-border bg-background p-3 flex items-center gap-3">
                  <span className="h-9 w-9 rounded-md bg-gradient-brand shrink-0" />
                  <div className="flex-1 min-w-0">
                    <input
                      value={p.title}
                      onChange={(e) => {
                        const c = [...projects];
                        c[i] = { ...c[i], title: e.target.value };
                        setProjects(c);
                      }}
                      className="w-full bg-transparent text-sm font-medium outline-none"
                    />
                    <input
                      value={p.tag}
                      onChange={(e) => {
                        const c = [...projects];
                        c[i] = { ...c[i], tag: e.target.value };
                        setProjects(c);
                      }}
                      className="w-full bg-transparent text-xs text-ink-soft outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setProjects(projects.filter((_, j) => j !== i))}
                    className="p-1.5 hover:bg-secondary rounded-md"
                    aria-label="Delete project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-widest text-ink-soft mb-3">Live preview</div>
          <div className="rounded-2xl border border-border bg-surface-elevated shadow-lift overflow-hidden aspect-[3/4]">
            <div className="p-8">
              <div className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">Portfolio · 2026</div>
              <h2 className="mt-4 font-display text-4xl leading-[0.95]">{name || "Your name"}</h2>
              <p className="mt-1 font-display italic text-xl text-ink-soft">
                {role || "Your role goes here"}
              </p>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">{bio}</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {projects.slice(0, 3).map((p, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] rounded-lg p-2 flex flex-col justify-between text-white text-[10px]"
                    style={{ background: ["oklch(0.72 0.18 40)", "oklch(0.85 0.14 85)", "oklch(0.55 0.12 260)"][i % 3] }}
                  >
                    <span>0{i + 1}</span>
                    <span className="font-medium leading-tight">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-ink-soft uppercase tracking-widest mb-2">{label}</div>
      {children}
    </label>
  );
}
