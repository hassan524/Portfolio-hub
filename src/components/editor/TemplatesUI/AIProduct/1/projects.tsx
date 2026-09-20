// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ArrowUpRight, Zap, Code, Shield } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct1Projects({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const [activeTab, setActiveTab] = useState(0);

  const workflows = [
    {
      title: "Autonomous Lead Enrichment",
      tag: "Sales Intelligence",
      desc: "Instantly ingest inbound leads, cross-reference 50+ telemetry sources, and score intent probability with sub-second accuracy.",
      code: `// Real-time webhook trigger\napp.post('/api/enrich', async (req, res) => {\n  const lead = await AI.extractIntent(req.body);\n  await CRM.sync(lead.id, { score: lead.confidence });\n  return res.status(200).json({ status: 'enriched' });\n});`,
      stats: ["99.4% Enrichment Rate", "14ms Latency", "Zero Manual Scrubbing"],
    },
    {
      title: "Semantic Code Refactoring",
      tag: "Engineering Ops",
      desc: "Parse entire monorepos into vector memory. Execute repository-wide refactors and automated security vulnerability patches safely.",
      code: `// Multi-file AST Transformation\nconst diff = await NeuralAgent.refactor({\n  scope: 'src/auth/**',\n  objective: 'Migrate to OAuth2 PKCE flow',\n  dryRun: false\n});\nconsole.log(diff.summary);`,
      stats: ["50k+ Lines / Min", "Zero Breaking Changes", "Auto-Lint Verified"],
    },
    {
      title: "Dynamic Customer Support Triage",
      tag: "Support Swarms",
      desc: "Analyze incoming ticket sentiment, verify account entitlement status, draft context-aware resolutions, and auto-dispatch to optimal engineers.",
      code: `// Intelligent Ticket Routing\nconst ticket = await SupportEngine.ingest(payload);\nif (ticket.sentiment < 0.2) {\n  await PagerDuty.triggerHighPriority(ticket);\n} else {\n  await ticket.replyWithDraft();\n}`,
      stats: ["88% Auto-Resolved", "< 4s First Response", "100% Sentiment Tracked"],
    },
  ];

  return (
    <section className="relative px-6 md:px-16 py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}>
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
            <Sparkles className="h-3.5 w-3.5" />
            <Editable className="inline">Production Workflows</Editable>
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.12]"
            style={{ color: ink }}
          >Built for how elite engineering teams operate</Editable>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {workflows.map((wf, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className="px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 relative cursor-pointer flex items-center gap-2.5 shadow-sm"
              style={{
                backgroundColor: activeTab === idx ? accent : surface,
                color: activeTab === idx ? ink : `${ink}B3`,
                border: `1px solid ${activeTab === idx ? accent : surface}`,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: activeTab === idx ? ink : accent }} />
              <Editable className="inline">{wf.title}</Editable>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center p-8 md:p-12 rounded-3xl backdrop-blur-2xl relative overflow-hidden" style={{ backgroundColor: surface, border: `1px solid ${surface}` }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none" style={{ background: accent }} />

          <div className="lg:col-span-5 space-y-6">
            <Editable
              as="span"
              className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full inline-block"
              style={{ background: `${accent}15`, color: accent }}
            >{workflows[activeTab].tag}</Editable>
            <Editable as="h3" className="text-3xl font-black tracking-tight leading-tight" style={{ color: ink }}>
              {workflows[activeTab].title}
            </Editable>
            <Editable as="p" className="text-base leading-relaxed" style={{ color: ink, opacity: 0.75 }}>
              {workflows[activeTab].desc}
            </Editable>

            <div className="space-y-3 pt-4 border-t" style={{ borderColor: surface }}>
              {workflows[activeTab].stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <div className="h-5 w-5 rounded-full grid place-items-center" style={{ background: `${accent}20`, color: accent }}>
                    ✓
                  </div>
                  <Editable className="inline">{stat}</Editable>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-md" style={{ backgroundColor: bg, borderColor: surface }}>
              <div className="px-5 py-3.5 flex items-center justify-between border-b" style={{ backgroundColor: surface, borderColor: surface }}>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  <Editable as="span" className="text-xs font-mono ml-3" style={{ color: ink, opacity: 0.75 }}>workflow.ts</Editable>
                </div>
                <Editable as="span" className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${accent}20`, color: accent }}>TypeScript</Editable>
              </div>
              <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto leading-relaxed" style={{ color: ink, opacity: 0.75 }}>
                <pre><Editable className="inline">{workflows[activeTab].code}</Editable></pre>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}