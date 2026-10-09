// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Mail, Check, Copy, Send, Sparkles, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio4Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedScope, setSelectedScope] = useState("0-to-1 Web App");
  const [selectedBudget, setSelectedBudget] = useState("$20k - $40k");

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@hassanrehan.design");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const scopes = ["Design System", "0-to-1 Web App", "Mobile iOS App", "Design Advisory"];
  const budgets = ["$10k - $20k", "$20k - $40k", "$40k+"];

  return (
    <section id="contact" className="py-24 sm:py-36 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Let's Build Something Memorable</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            <Editable
              value={p.title || "Ready to craft your next breakthrough product?"}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Currently reserving design sprints for Q4 2026. Send an inquiry or reach out directly.
          </p>
        </div>

        {/* 2-Column Contact & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Direct Email
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm">
                  <span className="font-semibold text-slate-900">hello@hassanrehan.design</span>
                  <button
                    onClick={copyEmail}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp Concierge */}
              <a
                href="https://wa.me/15559876543"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
              >
                <FaWhatsapp className="text-base" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              {/* Location & Timezone */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                  <span>San Francisco & Tokyo</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Response in &lt; 24h</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <FaGithub className="text-sm" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <FaLinkedin className="text-sm" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  <FaXTwitter className="text-sm" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form with Interactive Chips */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm">
            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you! Your project details have landed in my inbox. I’ll review your scope and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Project Scope Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">What are you looking to design?</label>
                  <div className="flex flex-wrap gap-2">
                    {scopes.map((s, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedScope(s)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedScope === s
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">Target Budget Envelope:</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedBudget(b)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedBudget === b
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Morgan"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Project Context & Goals</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your product, key challenges, target users, and desired launch date..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 flex items-center justify-center gap-2"
                >
                  <span>Submit Design Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio4Contact;
