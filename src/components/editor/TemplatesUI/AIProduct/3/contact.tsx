// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { Send, CheckCircle2, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Contact({ props = {}, theme }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Enterprise AI");
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 relative overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        <div 
          className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden" 
          style={{ 
            backgroundColor: surface, 
            borderColor: `${accent}25` 
          }}
        >
          
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[110px] pointer-events-none opacity-25" style={{ background: accent }} />

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 border shadow-sm" 
                style={{ 
                  backgroundColor: `${bg}90`, 
                  borderColor: `${accent}30`, 
                  color: accent 
                }}
              >
                <Sparkles className="h-3 w-3" />
                GET STARTED TODAY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 leading-snug" style={{ color: ink }}>
                Schedule your private AI architecture demo
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: ink, opacity: 0.75 }}>
                Experience firsthand how WideApp GO automates cluster workloads, inference routing, and multi-agent synergy.
              </p>

              <div className="space-y-3.5 text-xs font-medium" style={{ color: ink, opacity: 0.85 }}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <Editable as="span">SOC2 Type II Certified Secure Environment</Editable>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                  </div>
                  <Editable as="span">Free custom model tuning consultation</Editable>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-6 backdrop-blur-xl shadow-lg" style={{ backgroundColor: `${bg}95`, borderColor: `${accent}25` }}>
              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <Editable className="text-base font-bold" style={{ color: ink }}>Demo Request Confirmed!</Editable>
                  <Editable as="p" className="text-xs" style={{ color: ink, opacity: 0.75 }}>Our lead AI architect will contact you within 2 business hours.</Editable>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                    style={{ borderColor: `${accent}30`, backgroundColor: surface, color: ink }}
                  >
                    Reset Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div>
                    <Editable as="label" className="block text-[11px] font-bold mb-1.5" style={{ color: ink, opacity: 0.8 }}>Select Solution Tier</Editable>
                    <div className="grid grid-cols-2 gap-2">
                      {["Enterprise AI", "Developer GO"].map((plan) => (
                        <button
                          type="button"
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className="py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer"
                          style={{
                            borderColor: selectedPlan === plan ? accent : `${accent}20`,
                            backgroundColor: selectedPlan === plan ? `${accent}25` : `${surface}80`,
                            color: selectedPlan === plan ? accent : ink,
                            boxShadow: selectedPlan === plan ? `0 0 15px ${accent}30` : "none",
                          }}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Editable as="label" className="block text-[11px] font-bold mb-1.5" style={{ color: ink, opacity: 0.8 }}>Work Email</Editable>
                    <input
                      type="email"
                      required
                      placeholder="architect@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none transition-colors focus:ring-2"
                      style={{ 
                        backgroundColor: surface, 
                        borderColor: `${accent}25`, 
                        color: ink 
                      }}
                    />
                  </div>

                  <div>
                    <Editable as="label" className="block text-[11px] font-bold mb-1.5" style={{ color: ink, opacity: 0.8 }}>Team Size</Editable>
                    <select
                      className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none cursor-pointer"
                      style={{ 
                        backgroundColor: surface, 
                        borderColor: `${accent}25`, 
                        color: ink 
                      }}
                    >
                      <option style={{ backgroundColor: bg, color: ink }}>1 - 20 Engineers</option>
                      <option style={{ backgroundColor: bg, color: ink }}>21 - 100 Engineers</option>
                      <option style={{ backgroundColor: bg, color: ink }}>100+ Enterprise</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs font-bold shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer mt-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
                      color: ink,
                      boxShadow: `0 4px 25px ${accent}50`
                    }}
                  >
                    <Editable as="span">Request Live Session</Editable>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}