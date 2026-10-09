// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio6Contact: React.FC<ContactProps> = ({
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
    navigator.clipboard.writeText("contact@hassanrehan.ch");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0A] text-[#F5F5F0] border-b border-[#262626] font-mono">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-[#262626]">
          <div className="text-xs text-[#E63946] mb-1">// COMMISSION PROTOCOL</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            <Editable
              value={p.title || "INITIATE FORMAL INQUIRY"}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* 2-Column Swiss Form & Direct Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inscription */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 border border-[#262626] bg-[#0F0F0F] space-y-6">
              <div className="text-xs text-[#E63946] font-bold">
                DIRECT TRANSMISSION ENDPOINTS
              </div>

              <div className="space-y-2">
                <div className="text-[10px] text-[#888]">PRIMARY EMAIL</div>
                <div className="flex items-center justify-between p-3 border border-[#262626] bg-[#0A0A0A] text-xs">
                  <span className="text-white font-bold">contact@hassanrehan.ch</span>
                  <button
                    onClick={copyEmail}
                    className="text-[#E63946] hover:text-white transition-colors flex items-center gap-1 font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
              </div>

              {/* Direct WhatsApp */}
              <a
                href="https://wa.me/41791234567"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 bg-[#E63946] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all tracking-wider"
              >
                <FaWhatsapp className="text-sm" />
                <span>DIRECT WHATSAPP DISPATCH</span>
              </a>

              {/* Coordinates */}
              <div className="pt-4 border-t border-[#262626] space-y-2 text-xs">
                <div className="text-[#888]">PHYSICAL ATELIER</div>
                <div className="text-white">Bahnhofstrasse 42, 8001 Zürich, Switzerland</div>
                <div className="text-[#666]">UTC+1 // MON — FRI 09:00 — 18:00</div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-4 pt-2 text-xs text-[#888]">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  <FaGithub className="text-sm" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  <FaLinkedin className="text-sm" />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  <FaXTwitter className="text-sm" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Swiss Request Form */}
          <div className="lg:col-span-7 p-8 border border-[#262626] bg-[#0F0F0F]">
            {sent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border border-[#E63946] text-[#E63946] flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-white">DOSSIER REGISTERED</h3>
                <p className="text-xs text-[#AAA] font-sans">Formal evaluation will be transmitted to your email within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#888] uppercase">YOUR NAME / ENTITY</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Peter Meier"
                      className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-[#262626] text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-[#888] uppercase">DIRECT EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="meier@logistics.ch"
                      className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-[#262626] text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#E63946]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#888] uppercase">SYSTEM SCOPE</label>
                  <select className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-[#262626] text-xs text-white focus:outline-none focus:border-[#E63946]">
                    <option>Design System & Multi-Brand Architecture</option>
                    <option>Mission-Critical High-Load Software Console</option>
                    <option>Complete Brand Identity & Typography Specification</option>
                    <option>Executive Design Advisory</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#888] uppercase">PROJECT PARAMETERS & CONTEXT</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Outline product functional requirements, current bottlenecks, and target deadline..."
                    className="w-full px-3 py-2.5 bg-[#0A0A0A] border border-[#262626] text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all"
                >
                  TRANSMIT SPECIFICATION DOSSIER
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio6Contact;
