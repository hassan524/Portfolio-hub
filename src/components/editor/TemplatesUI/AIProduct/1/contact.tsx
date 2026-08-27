import { motion } from "framer-motion";
import { Mail, Shield, Zap, Sparkles, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { ContactProps } from "@/types/builder.schema";

type Props = BlockComponentProps<ContactProps>;
const noop = () => {};

export function AIProduct1Contact({ theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section className="relative px-6 md:px-16 py-32 overflow-hidden" style={{ background: `${ink}02`, borderTop: `1px solid ${ink}08` }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none opacity-10" style={{ background: accent }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest backdrop-blur-md" style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}30` }}>
              <Terminal className="h-3.5 w-3.5" />
              <Editable value="Secure Onboarding" onChange={noop} className="inline" />
            </div>

            <Editable
              as="h2"
              value="Request priority cluster access"
              onChange={noop}
              className="text-4xl md:text-5xl font-black tracking-tight leading-[1.12]"
              style={{ color: ink }}
            />

            <Editable
              as="p"
              value="Deploy your dedicated inference nodes with enterprise SLA guarantees. Our solutions engineers will configure your custom vector pipeline within 2 hours."
              onChange={noop}
              className="text-base leading-relaxed"
              style={{ color: `${ink}65` }}
            />

            <div className="space-y-4 pt-4">
              {[
                "Dedicated GPU cluster partition",
                "Custom fine-tuned weights hosting",
                "24/7 direct Slack channel with core AI engineers",
              ].map((perk, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <div className="h-5 w-5 rounded-full grid place-items-center shadow-inner" style={{ background: `${accent}25`, color: accent }}>
                    ✓
                  </div>
                  {perk}
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {[
                { icon: FaGithub, label: "GitHub" },
                { icon: FaLinkedin, label: "LinkedIn" },
                { icon: FaTwitter, label: "Twitter" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3, borderColor: accent, color: accent }}
                    className="h-11 w-11 rounded-2xl grid place-items-center transition-all border"
                    style={{ background: bg, borderColor: `${ink}15`, color: `${ink}70` }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right Form Card (High-end Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl relative space-y-6"
            style={{ background: bg, border: `1px solid ${ink}12`, boxShadow: `0 40px 80px ${ink}10` }}
          >
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: `${ink}10` }}>
              <span className="text-sm font-bold tracking-tight" style={{ color: ink }}>Enterprise Access Form</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full uppercase" style={{ background: `${accent}15`, color: accent }}>Secure 256-bit</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Editable value="Full Name" onChange={noop} className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: `${ink}60` }} />
                <div className="w-full px-4 py-3 rounded-2xl text-sm" style={{ background: `${ink}04`, border: `1px solid ${ink}12`, color: `${ink}40` }}>
                  <Editable value="Jane Doe" onChange={noop} className="inline" />
                </div>
              </div>
              <div>
                <Editable value="Work Email" onChange={noop} className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: `${ink}60` }} />
                <div className="w-full px-4 py-3 rounded-2xl text-sm" style={{ background: `${ink}04`, border: `1px solid ${ink}12`, color: `${ink}40` }}>
                  <Editable value="jane@company.com" onChange={noop} className="inline" />
                </div>
              </div>
            </div>

            <div>
              <Editable value="Company & Scale" onChange={noop} className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: `${ink}60` }} />
              <div className="w-full px-4 py-3 rounded-2xl text-sm" style={{ background: `${ink}04`, border: `1px solid ${ink}12`, color: `${ink}40` }}>
                <Editable value="Acme Corp (50M+ monthly tokens)" onChange={noop} className="inline" />
              </div>
            </div>

            <div>
              <Editable value="Technical Requirements" onChange={noop} className="block text-xs font-mono uppercase tracking-wider mb-2" style={{ color: `${ink}60` }} />
              <div className="w-full px-4 py-3 rounded-2xl text-sm min-h-[90px]" style={{ background: `${ink}04`, border: `1px solid ${ink}12`, color: `${ink}40` }}>
                <Editable value="We need custom fine-tuning on Llama-3 with sub-20ms RAG latency..." onChange={noop} className="inline" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
              style={{ background: accent, color: bg }}
            >
              <Sparkles className="h-4 w-4" />
              <Editable value="Deploy Dedicated Cluster" onChange={noop} className="inline" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}