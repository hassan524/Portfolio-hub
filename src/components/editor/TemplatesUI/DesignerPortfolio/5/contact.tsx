// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Coffee, Mail, Check, Copy, Send, Heart, MapPin } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaXTwitter } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio5Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

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

  return (
    <section id="contact" className="py-24 bg-[#1C1210] text-[#FFF1E6] border-b border-[#FF7A45]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FF7A45] font-semibold">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FFF1E6] tracking-tight">
            <Editable
              value={p.title || "Got an exciting product idea? Let’s brew something up."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
          <p className="text-sm sm:text-base text-[#FEE4D7]/70">
            Whether you need a full product 0-to-1 design, a scalable design system, or a quick advisory session.
          </p>
        </div>

        {/* 2-Column Friendly Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25 space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#FFA07A] font-semibold">
                <Coffee className="w-4 h-4 text-[#FF7A45]" />
                <span>DIRECT DESK</span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-[#FEE4D7]/60">EMAIL ME DIRECTLY</div>
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#1C1210] border border-[#FF7A45]/25 text-sm">
                  <span className="font-semibold text-white">hello@hassanrehan.design</span>
                  <button
                    onClick={copyEmail}
                    className="text-xs text-[#FF7A45] hover:text-[#FFA07A] font-semibold flex items-center gap-1 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/15554321987"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#FF7A45] text-[#1C1210] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#FFA07A] transition-all shadow-md"
              >
                <FaWhatsapp className="text-base" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <div className="pt-4 border-t border-[#FF7A45]/15 flex items-center justify-between text-xs text-[#FFA07A]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF7A45]" />
                  <span>San Francisco & Tokyo</span>
                </div>
                <div className="flex items-center gap-3">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <FaLinkedin className="text-sm" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    <FaXTwitter className="text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Friendly Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FF7A45]/20 text-[#FF7A45] flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#FFF1E6]">Message Sent!</h3>
                <p className="text-sm text-[#FEE4D7]/70">Thanks for reaching out! I'll reply back with coffee in hand within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#FFA07A] font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Maya Patel"
                      className="w-full px-4 py-3 rounded-2xl bg-[#1C1210] border border-[#FF7A45]/25 text-sm text-[#FFF1E6] placeholder-white/30 focus:outline-none focus:border-[#FF7A45]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#FFA07A] font-semibold">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="maya@startup.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[#1C1210] border border-[#FF7A45]/25 text-sm text-[#FFF1E6] placeholder-white/30 focus:outline-none focus:border-[#FF7A45]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#FFA07A] font-semibold">What are you working on?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me a bit about your product, your goals, and timeline..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#1C1210] border border-[#FF7A45]/25 text-sm text-[#FFF1E6] placeholder-white/30 focus:outline-none focus:border-[#FF7A45]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#FF7A45] text-[#1C1210] font-bold text-xs hover:bg-[#FFA07A] transition-all flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio5Contact;
