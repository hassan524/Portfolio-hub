import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { Send, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct3Contact({ theme }: BlockComponentProps<any>) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Enterprise AI");
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 text-white relative overflow-hidden" style={{ background: darkInk }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.01] backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20" style={{ background: accent }} />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest block mb-3" style={{ color: accent }}>
                GET STARTED TODAY
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                Schedule your private AI architecture demo
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                Experience firsthand how WideApp GO automates cluster workloads, inference routing, and multi-agent synergy.
              </p>

              <div className="space-y-3 text-xs text-white/80 font-medium">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4" style={{ color: accent }} />
                  <span>SOC2 Type II Certified Secure Environment</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Free custom model tuning consultation</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div className="text-base font-bold">Demo Request Confirmed!</div>
                  <p className="text-xs text-white/60">Our lead AI architect will contact you within 2 business hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-bold border border-white/20 hover:bg-white/10"
                  >
                    Reset Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-white/70 mb-1">Select Solution Tier</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["Enterprise AI", "Developer GO"].map((plan) => (
                        <button
                          type="button"
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                            selectedPlan === plan
                              ? "border-rose-500 bg-rose-500/20 text-white shadow-md"
                              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/70 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="architect@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-white/30 focus:outline-none focus:border-rose-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/70 mb-1">Team Size</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-[#20040B] border border-white/15 text-xs text-white focus:outline-none focus:border-rose-500">
                      <option className="bg-[#1A0D14]">1 - 20 Engineers</option>
                      <option className="bg-[#1A0D14]">21 - 100 Engineers</option>
                      <option className="bg-[#1A0D14]">100+ Enterprise</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                    style={{ background: accent }}
                  >
                    <span>Request Live Session</span>
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