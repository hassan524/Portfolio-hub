// @ts-nocheck
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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
    eyebrow: "Production Workflows", title: "Built for how elite engineering teams operate", codeFile: "workflow.ts", codeLang: "TypeScript",
    items: [
      {
        title: "Autonomous Lead Enrichment", tag: "Sales Intelligence", desc: "Instantly ingest inbound leads, cross-reference 50+ telemetry sources, and score intent probability with sub-second accuracy.",
        code: "// Real-time webhook trigger\napp.post('/api/enrich', async (req, res) => {\n  const lead = await AI.extractIntent(req.body);\n  await CRM.sync(lead.id, { score: lead.confidence });\n  return res.status(200).json({ status: 'enriched' });\n});",
        stats: ["99.4% Enrichment Rate", "14ms Latency", "Zero Manual Scrubbing"]
      },
      {
        title: "Semantic Code Refactoring", tag: "Engineering Ops", desc: "Parse entire monorepos into vector memory. Execute repository-wide refactors and automated security patches safely.",
        code: "// Multi-file AST transformation\nconst diff = await NeuralAgent.refactor({\n  scope: 'src/auth/**',\n  objective: 'Migrate to OAuth2 PKCE flow',\n  dryRun: false\n});\nconsole.log(diff.summary);",
        stats: ["50k+ Lines / Min", "Zero Breaking Changes", "Auto-Lint Verified"]
      },
      {
        title: "Dynamic Support Triage", tag: "Support Swarms", desc: "Analyze ticket sentiment, verify entitlement, draft context-aware resolutions, and auto-dispatch to the right engineer.",
        code: "// Intelligent ticket routing\nconst ticket = await SupportEngine.ingest(payload);\nif (ticket.sentiment < 0.2) {\n  await PagerDuty.triggerHighPriority(ticket);\n} else {\n  await ticket.replyWithDraft();\n}",
        stats: ["88% Auto-Resolved", "< 4s First Response", "100% Sentiment Tracked"]
      },
    ],
  },
  saas: {
    eyebrow: "Use cases", title: "One platform, every team", codeFile: "automation.yml", codeLang: "YAML",
    items: [
      {
        title: "Product Roadmapping", tag: "Product", desc: "Turn customer feedback into prioritized roadmap items and keep stakeholders updated automatically.",
        code: "on: feedback.created\nsteps:\n  - tag: sentiment\n  - link: roadmap.themes\n  - notify:\n      channel: '#product'\n      when: score > 8",
        stats: ["2x Faster Planning", "Auto-linked Feedback", "Stakeholder Digests"]
      },
      {
        title: "Engineering Sprints", tag: "Engineering", desc: "Sync pull requests, tickets, and deployments so standups become a two-minute glance.",
        code: "on: pull_request.merged\nsteps:\n  - move: ticket -> 'Done'\n  - post: release-notes\n  - ping:\n      owner: ticket.assignee",
        stats: ["Zero Status Meetings", "Auto-closed Tickets", "Release Notes Drafted"]
      },
      {
        title: "Client Delivery", tag: "Agencies", desc: "Share branded client portals with live progress, approvals, and invoices in one link.",
        code: "on: milestone.complete\nsteps:\n  - render: client.portal\n  - request: approval\n  - invoice:\n      amount: milestone.value",
        stats: ["Branded Portals", "1-click Approvals", "Faster Payments"]
      },
    ],
  },
  agency: {
    eyebrow: "Selected work", title: "Projects we're proud of", codeFile: "case-study.md", codeLang: "Brief",
    items: [
      {
        title: "Aurora Skincare Rebrand", tag: "Brand Identity", desc: "A full identity refresh and Shopify rebuild for a DTC skincare label heading into retail.",
        code: "## Challenge\nA dated look and a 1.1% conversion rate.\n\n## Outcome\n- New identity & packaging\n- Shopify Plus rebuild\n- Retail launch in 14 stores",
        stats: ["+168% Conversion", "14 Retail Doors", "Award Shortlisted"]
      },
      {
        title: "Kestrel Fintech Launch", tag: "Web & Product", desc: "Positioning, product site, and onboarding flow for a seed-stage fintech's public launch.",
        code: "## Challenge\nExplain a complex product in 10 seconds.\n\n## Outcome\n- Messaging framework\n- Interactive product site\n- 40k waitlist at launch",
        stats: ["40k Waitlist", "6-week Delivery", "Series A Closed"]
      },
      {
        title: "Maison Verde Campaign", tag: "Growth", desc: "Seasonal campaign across social, email, and paid with a unified creative system.",
        code: "## Challenge\nFragmented creative across channels.\n\n## Outcome\n- Modular asset system\n- 120 ad variants\n- 4.2x blended ROAS",
        stats: ["4.2x ROAS", "120 Variants", "3-week Turnaround"]
      },
    ],
  },
  developer: {
    eyebrow: "Featured work", title: "Projects I've shipped", codeFile: "project.ts", codeLang: "TypeScript",
    items: [
      {
        title: "Collaborative Spreadsheet SaaS", tag: "Full-stack", desc: "Realtime multi-user spreadsheet with cell merging, row-level security, and export.",
        code: "// Realtime cell sync\nsupabase\n  .channel('sheet:' + id)\n  .on('postgres_changes', { event: '*' }, applyPatch)\n  .subscribe();",
        stats: ["Realtime Collaboration", "Row-level Security", "Open Source"]
      },
      {
        title: "Portfolio Deploy Platform", tag: "SaaS", desc: "Users build portfolios and deploy them straight to their own Vercel or Netlify account.",
        code: "// Deploy to the user's own account\nconst token = await getOAuthToken(user, 'vercel');\nawait vercel.deploy({ token, files: build.output });",
        stats: ["OAuth Deploy Flow", "Live Editing", "Template Library"]
      },
      {
        title: "Video Subtitle Editor", tag: "Media Tools", desc: "Timeline editor that transcribes video and overlays styled captions for Arabic and Urdu content.",
        code: "// Match transcript to timeline\nconst cues = segments.map(toCue);\ntimeline.setTracks({ captions: cues });\nawait exportVideo({ cues, style });",
        stats: ["Auto Transcription", "Timeline Editing", "Styled Export"]
      },
    ],
  },
};

export function AIProduct1Projects({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), muted = mix(ink, 72);
  const soft = (p: number) => mix(accent, p);
  const onAccent = readableOn(accent);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };

  // tabs + swipeable slides share one embla instance
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 28 });
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const on = () => setActiveTab(emblaApi.selectedScrollSnap());
    on();
    emblaApi.on("select", on);
    return () => { emblaApi.off("select", on); };
  }, [emblaApi]);

  const btn = "h-10 w-10 rounded-full grid place-items-center border cursor-pointer transition-transform hover:scale-105 active:scale-95";

  return (
    <section className="relative px-6 md:px-16 py-28 md:py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.14 }} />
      <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.1 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-5 backdrop-blur-md" style={{ background: soft(12), color: accent, border: `1px solid ${soft(30)}` }}>
            <Sparkles className="h-3.5 w-3.5" />
            <Editable className="inline">{c.eyebrow}</Editable>
          </div>
          <Editable as="h2" className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]" style={{ color: ink }}>{c.title}</Editable>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {c.items.map((wf: any, idx: number) => {
            const active = activeTab === idx;
            return (
              <button key={idx} onClick={() => emblaApi?.scrollTo(idx)}
                className="px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2.5"
                style={{ backgroundColor: active ? accent : surface, color: active ? onAccent : muted, border: `1px solid ${active ? accent : line}`, boxShadow: active ? `0 10px 28px ${soft(35)}` : "none" }}>
                <span className="h-2 w-2 rounded-full" style={{ background: active ? onAccent : accent }} />
                <Editable className="inline">{wf.title}</Editable>
              </button>
            );
          })}
        </div>

        <div ref={emblaRef} className="overflow-hidden rounded-3xl">
          <div className="flex">
            {c.items.map((wf: any, i: number) => (
              <div key={i} className="flex-[0_0_100%] min-w-0">
                <div className="grid lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-3xl backdrop-blur-2xl border relative overflow-hidden" style={{ backgroundColor: surface, borderColor: line }}>
                  <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none" style={{ background: accent }} />

                  <div className="lg:col-span-5 space-y-6 relative">
                    <Editable as="span" className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full inline-block" style={{ background: soft(12), color: accent }}>{wf.tag}</Editable>
                    <Editable as="h3" className="text-3xl font-black tracking-tight leading-tight" style={{ color: ink }}>{wf.title}</Editable>
                    <Editable as="p" className="text-base leading-relaxed" style={{ color: muted }}>{wf.desc}</Editable>
                    <div className="space-y-3 pt-5 border-t" style={{ borderColor: line }}>
                      {wf.stats.map((stat: string, s: number) => (
                        <div key={s} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                          <div className="h-5 w-5 rounded-full grid place-items-center" style={{ background: soft(18), color: accent }}>
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </div>
                          <Editable className="inline">{stat}</Editable>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 relative">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ backgroundColor: `color-mix(in srgb, ${bg} 85%, #000)`, borderColor: line }}>
                      <div className="px-5 py-3.5 flex items-center justify-between border-b" style={{ backgroundColor: surface, borderColor: line }}>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-red-500/80" />
                          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                          <div className="h-3 w-3 rounded-full bg-green-500/80" />
                          <Editable as="span" className="text-xs font-mono ml-3" style={{ color: muted }}>{c.codeFile}</Editable>
                        </div>
                        <Editable as="span" className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: soft(15), color: accent }}>{c.codeLang}</Editable>
                      </div>
                      <pre className="p-6 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed m-0" style={{ color: ink, opacity: 0.85 }}>
                        <Editable className="inline whitespace-pre">{wf.code}</Editable>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {c.items.map((_: any, i: number) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)} className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{ width: activeTab === i ? 20 : 6, background: activeTab === i ? accent : mix(ink, 24) }} />
            ))}
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => emblaApi?.scrollPrev()} className={btn} style={{ background: surface, borderColor: line, color: ink }}><ChevronLeft className="h-4 w-4" /></button>
            <button aria-label="Next" onClick={() => emblaApi?.scrollNext()} className={btn} style={{ background: surface, borderColor: line, color: ink }}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}