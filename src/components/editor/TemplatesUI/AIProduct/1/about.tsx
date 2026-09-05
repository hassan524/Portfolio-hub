// @ts-nocheck
import { motion } from "framer-motion";
import { Cpu, Zap, Network, ShieldCheck, Terminal, Activity } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;
const noop = () => {};

export function AIProduct1About({ theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section className="relative px-6 md:px-16 py-32 overflow-hidden" style={{ background: bg }}>
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`, 
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15" style={{ background: accent }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-md" style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}30` }}>
            <Activity className="h-3.5 w-3.5 animate-pulse" />
            <Editable className="inline">Core Architecture</Editable>
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl leading-[1.08]"
            style={{ color: ink }}
          >Engineered for sub-millisecond intelligence</Editable>
          <Editable
            as="p"
            className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
            style={{ color: `${ink}65` }}
          >Skip the latency bottleneck. Our decentralized inference network processes complex RAG pipelines and multimodal embeddings at the metal layer.</Editable>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large Span - Live Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-2xl group transition-all duration-500 hover:border-opacity-60"
            style={{ background: `${ink}03`, border: `1px solid ${ink}10` }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" style={{ background: accent }} />
            
            <div className="flex items-center justify-between mb-8">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                <Terminal className="h-6 w-6" style={{ color: accent }} />
              </div>
              <Editable
                as="span"
                className="text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider"
                style={{ background: `${ink}06`, color: `${ink}60` }}
              >Live Stream</Editable>
            </div>

            <Editable as="h3" className="text-2xl font-bold tracking-tight mb-3" style={{ color: ink }}>Deterministic Context Engine</Editable>
            <Editable as="p" className="text-sm leading-relaxed max-w-xl mb-8" style={{ color: `${ink}60` }}>Every query dynamically constructs an optimized execution graph, routing tokens between fine-tuned open weights and frontier models instantly.</Editable>

            <div className="p-4 rounded-2xl font-mono text-xs space-y-2 backdrop-blur-md" style={{ background: `${ink}05`, border: `1px solid ${ink}08` }}>
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: `${ink}08` }}>
                <span className="flex items-center gap-2" style={{ color: accent }}>
                  <span className="h-2 w-2 rounded-full animate-ping" style={{ background: accent }} />
                  <Editable className="inline">NODE_CLUSTER_US_WEST</Editable>
                </span>
                <Editable as="span" style={{ color: `${ink}40` }}>latency: 14.2ms</Editable>
              </div>
              <Editable as="p" style={{ color: `${ink}70` }}>$ neural-router --sync --model=v4-turbo --vector-dim=1536</Editable>
              <Editable as="p" style={{ color: accent }}>✔ Synchronized 2.4M embeddings in 412ms. Zero packet loss.</Editable>
            </div>
          </motion.div>

          {/* Card 2: Security & Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-2xl group transition-all duration-500"
            style={{ background: `${ink}03`, border: `1px solid ${ink}10` }}
          >
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner mb-6" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
              <ShieldCheck className="h-6 w-6" style={{ color: accent }} />
            </div>
            <Editable as="h3" className="text-xl font-bold tracking-tight mb-3" style={{ color: ink }}>Enterprise Isolation</Editable>
            <Editable as="p" className="text-sm leading-relaxed" style={{ color: `${ink}60` }}>Your data never trains public foundation models. Zero-retention architecture with hardware-enforced AES-256 encryption.</Editable>
          </motion.div>

          {/* Card 3: Vector Sync */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-2xl group transition-all duration-500"
            style={{ background: `${ink}03`, border: `1px solid ${ink}10` }}
          >
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner mb-6" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
              <Network className="h-6 w-6" style={{ color: accent }} />
            </div>
            <Editable as="h3" className="text-xl font-bold tracking-tight mb-3" style={{ color: ink }}>Real-time RAG Sync</Editable>
            <Editable as="p" className="text-sm leading-relaxed" style={{ color: `${ink}60` }}>Connect PostgreSQL, Snowflake, or Notion. Changes index instantly into vector memory with zero manual cron jobs.</Editable>
          </motion.div>

          {/* Card 4: Wide Span - High Throughput */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 p-8 md:p-10 rounded-3xl relative overflow-hidden backdrop-blur-2xl group transition-all duration-500 flex flex-col justify-between"
            style={{ background: `${ink}03`, border: `1px solid ${ink}10` }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}>
                <Cpu className="h-6 w-6" style={{ color: accent }} />
              </div>
              <div>
                <Editable as="h3" className="text-xl font-bold tracking-tight" style={{ color: ink }}>Autonomous Agent Swarms</Editable>
                <Editable as="span" className="text-xs font-mono" style={{ color: `${ink}50` }}>Multi-step reasoning execution</Editable>
              </div>
            </div>
            <Editable as="p" className="text-sm leading-relaxed max-w-xl" style={{ color: `${ink}60` }}>Deploy collaborative AI worker pools that execute complex workflows across external APIs, verify outputs through linting checks, and deliver production artifacts autonomously.</Editable>
          </motion.div>
        </div>
      </div>
    </section>
  );
}