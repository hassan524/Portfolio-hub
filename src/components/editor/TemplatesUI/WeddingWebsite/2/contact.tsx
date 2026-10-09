// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaLocationDot, FaClock, FaChevronDown, FaCheck, FaPhone } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const bg = theme.bg || "#F5EEFD";
  const ink = theme.ink || "#2E1065";
  const accent = theme.accent || "#7C3AED";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const coutureFaqs = [
    {
      q: p.cfq1Q || "How do we collaborate on custom card design or macaron flavors?",
      a: p.cfq1A || "Reach out directly via WhatsApp or email with your wedding date, guest count, and floral palette. We prepare a digital visual mockup and mail physical paper and wax seal swatches directly to your address for final approval.",
    },
    {
      q: p.cfq2Q || "Can you ship freshly baked French macarons for destination weddings?",
      a: p.cfq2A || "Yes! We ship across Europe, North America, and Australasia via express temperature-controlled priority courier. Macarons are baked 48 hours prior to your wedding day and arrive pristine and ready for your reception tables.",
    },
    {
      q: p.cfq3Q || "What is your minimum order policy?",
      a: p.cfq3A || "We cater to intimate elopements and grand celebrations alike. Suites start from sets of 25 invitations, and culinary favor boxes start from 30 guest boxes. Single keepsake pieces (such as vow scrolls and ring cradles) have zero minimum.",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(124, 58, 237, 0.2)",
        color: ink,
      }}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-purple-700 font-bold block">
            Bespoke Concierge Desk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-purple-950">
            <Editable
              value={p.contactH2 || "Commission Your Wedding Details Directly"}
              onChange={(v) => handleUpdate("contactH2", v)}
            />
          </h2>
          <p className="text-sm sm:text-base text-purple-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.contactSub ||
                "We collaborate directly with couples and planners. Choose your preferred communication channel below to check date availability and receive custom paper swatches."
              }
              onChange={(v) => handleUpdate("contactSub", v)}
            />
          </p>
        </div>

        {/* Completely Different Architecture: Side-by-side Atelier Desk & Booking Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Direct Studio Channels Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-purple-200 shadow-md space-y-6 text-left">
            <div className="space-y-1 pb-4 border-b border-purple-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold">
                Direct Communication
              </span>
              <h3 className="text-xl font-serif font-bold text-purple-950">
                Atelier Contact Lines
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between hover:bg-emerald-100/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h5 className="font-bold text-emerald-950 text-sm">WhatsApp Concierge</h5>
                    <span className="text-emerald-800/80 font-mono">+33 4 90 77 12 34</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-white px-3 py-1.5 rounded-full border border-emerald-200">
                  Chat Now
                </span>
              </a>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center text-base">
                  <FaEnvelope />
                </div>
                <div>
                  <h5 className="font-bold text-purple-950">Atelier Email Desk</h5>
                  <span className="text-purple-800/80 font-mono">commissions@maisonviolette.fr</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center text-base">
                  <FaLocationDot />
                </div>
                <div>
                  <h5 className="font-bold text-purple-950">Studio Workshop</h5>
                  <span className="text-purple-800/80">Aix-en-Provence, France (Visits by appointment)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-200 text-purple-800 flex items-center justify-center text-base">
                  <FaClock />
                </div>
                <div>
                  <h5 className="font-bold text-purple-950">Working Hours</h5>
                  <span className="text-purple-800/80">Monday to Friday: 10:00 — 18:00 CET</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Month-by-Month Availability Ledger */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-purple-200 shadow-md space-y-6 text-left">
            <div className="space-y-1 pb-4 border-b border-purple-100">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold">
                Capacity Tracking
              </span>
              <h3 className="text-xl font-serif font-bold text-purple-950">
                2026 / 2027 Studio Calendar
              </h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-purple-500 text-[10px] block">AUTUMN 2026</span>
                  <strong className="text-purple-950 text-sm font-serif">September & October</strong>
                </div>
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  2 Slots Left
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-purple-500 text-[10px] block">WINTER 2026</span>
                  <strong className="text-purple-950 text-sm font-serif">November & December</strong>
                </div>
                <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200">
                  4 Slots Open
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 flex items-center justify-between">
                <div>
                  <span className="text-purple-500 text-[10px] block">SPRING 2027</span>
                  <strong className="text-purple-950 text-sm font-serif">March — May 2027</strong>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Open For Booking
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#EDE4FC] border border-purple-200 space-y-1 text-xs">
              <p className="font-bold text-purple-950 flex items-center gap-1.5">
                <FaCheck className="text-purple-700" /> White-Glove Tracked Courier Included
              </p>
              <p className="text-purple-900/80 font-sans">
                Every parcel is packaged with acid-free archival preservation and dispatched via DHL Express with full insurance.
              </p>
            </div>
          </div>

        </div>

        {/* 3-Item Concise FAQ Accordion */}
        <div className="bg-white rounded-3xl border border-purple-200 p-8 max-w-4xl mx-auto space-y-4 text-left">
          <h4 className="text-lg font-serif font-bold text-purple-950 mb-2">
            Frequently Asked Questions
          </h4>

          <div className="space-y-3">
            {coutureFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-purple-100 rounded-2xl overflow-hidden bg-purple-50/30"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-3.5 flex items-center justify-between text-left gap-4 hover:bg-purple-100/40 transition-colors"
                >
                  <span className="text-sm font-serif font-bold text-purple-950">{faq.q}</span>
                  <FaChevronDown
                    className={`text-purple-500 text-xs shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-purple-700" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-4 pt-1 text-xs text-purple-900/80 leading-relaxed font-sans border-t border-purple-100"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite2Contact;
