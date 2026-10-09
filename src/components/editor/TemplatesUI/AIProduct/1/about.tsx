// @ts-nocheck
import { useId } from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, Network, ShieldCheck, Terminal, Activity, Workflow, BarChart3, Boxes, Palette, PenTool, Globe, Rocket, Code2, Gauge, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const ICONS: Record<string, any> = { Cpu, Zap, Network, ShieldCheck, Terminal, Workflow, BarChart3, Boxes, Palette, PenTool, Globe, Rocket, Code2, Gauge, Sparkles };

/* props.category = ai | saas | agency | developer ; props.content overrides any key */
const PRESETS: Record<string, any> = {
  ai: {
    eyebrow: "Core Architecture", title: "Engineered for sub-millisecond intelligence",
    sub: "Skip the latency bottleneck. Our decentralized inference network processes complex RAG pipelines and multimodal embeddings at the metal layer.",
    featIcon: "Terminal", featTag: "Live Stream", featTitle: "Deterministic Context Engine",
    featBody: "Every query dynamically constructs an optimized execution graph, routing tokens between fine-tuned open weights and frontier models instantly.",
    termHead: "NODE_CLUSTER_US_WEST", termMeta: "latency: 14.2ms",
    termCmd: "$ neural-router --sync --model=v4-turbo --vector-dim=1536",
    termOut: "✔ Synchronized 2.4M embeddings in 412ms. Zero packet loss.",
    sparkLabel: "Requests / sec", sparkValue: "184k", spark: [12, 18, 15, 24, 22, 34, 30, 44, 41, 58, 55, 72],
    cards: [
      { icon: "ShieldCheck", title: "Enterprise Isolation", body: "Your data never trains public foundation models. Zero-retention architecture with hardware-enforced AES-256 encryption." },
      { icon: "Network", title: "Real-time RAG Sync", body: "Connect PostgreSQL, Snowflake, or Notion. Changes index instantly into vector memory with zero manual cron jobs." },
      { icon: "Cpu", title: "Autonomous Agent Swarms", body: "Deploy collaborative AI worker pools that execute workflows across external APIs, verify outputs with lint checks, and ship production artifacts." },
    ],
  },
  saas: {
    eyebrow: "Why teams switch", title: "Everything your team needs, nothing it doesn't",
    sub: "Opinionated defaults, flexible building blocks, and an API for everything else. Set up in minutes, scale to thousands of seats.",
    featIcon: "Workflow", featTag: "Automations", featTitle: "Workflows that run themselves",
    featBody: "Trigger actions from any event: a PR merged, a deal closed, a form submitted. Build visually or in code.",
    termHead: "AUTOMATION_RUN_2841", termMeta: "duration: 1.2s",
    termCmd: "$ flow run onboarding --user=new-signup",
    termOut: "✔ Workspace created, 3 teammates invited, welcome doc sent.",
    sparkLabel: "Weekly active teams", sparkValue: "12.4k", spark: [8, 10, 11, 14, 13, 18, 21, 24, 23, 30, 34, 41],
    cards: [
      { icon: "ShieldCheck", title: "SOC 2 & SSO", body: "Granular roles, audit logs, SAML SSO, and data residency controls out of the box." },
      { icon: "BarChart3", title: "Live Analytics", body: "Track cycle time, throughput, and workload without exporting a single spreadsheet." },
      { icon: "Boxes", title: "200+ Integrations", body: "Slack, GitHub, Linear, Notion, Stripe and more, plus an open REST and webhook API." },
    ],
  },
  agency: {
    eyebrow: "How we work", title: "Strategy, craft, and delivery under one roof",
    sub: "No handoffs between agencies. One team takes you from positioning to launch, with weekly demos and zero surprises.",
    featIcon: "Palette", featTag: "Signature Process", featTitle: "Discover. Design. Deliver.",
    featBody: "Four-week sprints with a clear brief, rapid concepts, and measurable outcomes. You see real progress every Friday.",
    termHead: "SPRINT_03_STATUS", termMeta: "on track",
    termCmd: "$ studio status --project=rebrand",
    termOut: "✔ Concepts approved. Design system 80% complete. Launch: Nov 14.",
    sparkLabel: "Client revenue growth", sparkValue: "+212%", spark: [10, 12, 16, 15, 22, 28, 27, 38, 44, 52, 61, 74],
    cards: [
      { icon: "PenTool", title: "Brand Identity", body: "Positioning, naming, logo systems and guidelines built to last past the launch party." },
      { icon: "Globe", title: "Web & Product", body: "Fast, accessible, beautifully animated sites and apps your team can edit without developers." },
      { icon: "Rocket", title: "Growth Campaigns", body: "Launch assets, paid creative, and content engines with reporting you can read." },
    ],
  },
  developer: {
    eyebrow: "About me", title: "Engineering that balances speed and quality",
    sub: "I jump into existing codebases to debug and improve them, or build new products from scratch, solo or inside a team.",
    featIcon: "Code2", featTag: "Currently", featTitle: "Building products end to end",
    featBody: "From schema design and APIs to responsive interfaces and deployment, I own the full stack and communicate clearly along the way.",
    termHead: "DEPLOY_PROD", termMeta: "build: 38s",
    termCmd: "$ pnpm build && vercel --prod",
    termOut: "✔ Deployed. All checks passed. 0 type errors.",
    sparkLabel: "Commits this year", sparkValue: "2,140", spark: [14, 20, 18, 26, 30, 28, 40, 44, 41, 52, 60, 68],
    cards: [
      { icon: "Gauge", title: "Performance", body: "Core Web Vitals, bundle budgets, caching strategies, and database tuning that keep apps fast." },
      { icon: "ShieldCheck", title: "Reliability", body: "Typed APIs, tests where they matter, and monitoring so problems surface before users notice." },
      { icon: "Sparkles", title: "AI Integrations", body: "LLM features, retrieval pipelines, and automation wired cleanly into real products." },
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
        <radialGradient id={`${id}g`} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="white" /><stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}m`}><rect width="100%" height="100%" fill={`url(#${id}g)`} /></mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}p)`} mask={`url(#${id}m)`} />
    </svg>
  );
}

function Spark({ data, color, height = 90 }: { data: number[]; color: string; height?: number }) {
  const id = useId();
  const w = 240, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, height - 6 - ((v - min) / (max - min || 1)) * (height - 14)]);
  const line = pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1], cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" /><stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${height} L0,${height} Z`} fill={`url(#${id})`} />
      <motion.path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut" }} />
    </svg>
  );
}

function NodeGraph({ color }: { color: string }) {
  const nodes = [[20, 60], [80, 20], [140, 70], [200, 25], [250, 65], [110, 105]];
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [2, 5]];
  return (
    <svg viewBox="0 0 270 125" className="w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <motion.line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={color} strokeOpacity="0.45" strokeWidth="1.2"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <motion.circle cx={x} cy={y} r="9" fill={color} opacity="0.15" animate={{ r: [9, 14, 9] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.35 }} />
          <circle cx={x} cy={y} r="4" fill={color} />
        </g>
      ))}
    </svg>
  );
}

export function AIProduct1About({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), muted = mix(ink, 72), faint = mix(ink, 45);
  const soft = (p: number) => mix(accent, p);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };
  const FeatIcon = ICONS[c.featIcon] || Sparkles;

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55, delay },
  });
  const card = "rounded-3xl relative overflow-hidden backdrop-blur-2xl border transition-all duration-500 hover:-translate-y-1";
  const cardStyle = { backgroundColor: surface, borderColor: line };
  const iconBox = { background: soft(14), border: `1px solid ${soft(30)}` };

  return (
    <section className="relative px-6 md:px-16 py-28 md:py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <GridBackdrop color={accent} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.15 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div {...fade()} className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 backdrop-blur-md" style={{ background: soft(12), color: accent, border: `1px solid ${soft(30)}` }}>
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <Editable className="inline">{c.eyebrow}</Editable>
          </div>
          <Editable as="h2" className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl leading-[1.06]" style={{ color: ink }}>{c.title}</Editable>
          <Editable as="p" className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: muted }}>{c.sub}</Editable>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <motion.div {...fade()} className={`md:col-span-2 p-8 md:p-10 group ${card}`} style={cardStyle}>
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none" style={{ background: accent }} />
            <div className="flex items-center justify-between mb-8">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={iconBox}>
                <FeatIcon className="h-6 w-6" style={{ color: accent }} />
              </div>
              <Editable as="span" className="text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider" style={{ background: soft(12), color: accent }}>{c.featTag}</Editable>
            </div>
            <Editable as="h3" className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: ink }}>{c.featTitle}</Editable>
            <Editable as="p" className="text-sm md:text-base leading-relaxed max-w-xl mb-8" style={{ color: muted }}>{c.featBody}</Editable>
            <div className="p-4 rounded-2xl font-mono text-xs space-y-2 border" style={{ backgroundColor: mix(bg, 70), borderColor: line }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: line }}>
                <span className="flex items-center gap-2" style={{ color: accent }}>
                  <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                  <Editable className="inline">{c.termHead}</Editable>
                </span>
                <Editable as="span" style={{ color: muted }}>{c.termMeta}</Editable>
              </div>
              <Editable as="p" style={{ color: muted }}>{c.termCmd}</Editable>
              <Editable as="p" style={{ color: accent }}>{c.termOut}</Editable>
            </div>
          </motion.div>

          <motion.div {...fade(0.1)} className={`p-8 md:p-10 flex flex-col justify-between gap-6 ${card}`} style={cardStyle}>
            <div>
              <Editable as="span" className="text-xs font-mono uppercase tracking-widest" style={{ color: faint }}>{c.sparkLabel}</Editable>
              <Editable as="div" className="text-5xl font-black tracking-tight mt-2" style={{ color: ink }}>{c.sparkValue}</Editable>
            </div>
            <Spark data={c.spark} color={accent} />
          </motion.div>

          {c.cards.map((item: any, i: number) => {
            const Icon = ICONS[item.icon] || Sparkles;
            const wide = i === 2;
            return (
              <motion.div key={i} {...fade(0.1 + i * 0.1)}
                className={`p-8 md:p-10 group ${card} ${wide ? "md:col-span-3 md:flex md:items-center md:gap-10" : ""}`} style={cardStyle}>
                <div className={wide ? "md:flex-1" : ""}>
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6" style={iconBox}>
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <Editable as="h3" className="text-xl font-bold tracking-tight mb-3" style={{ color: ink }}>{item.title}</Editable>
                  <Editable as="p" className="text-sm leading-relaxed" style={{ color: muted }}>{item.body}</Editable>
                </div>
                {wide && <div className="hidden md:block md:flex-1"><NodeGraph color={accent} /></div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}