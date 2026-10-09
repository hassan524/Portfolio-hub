// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaLocationDot, FaClock, FaBoxOpen, FaShieldHeart, FaChevronDown, FaCopy, FaCheck } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedItem, setSelectedItem] = useState("Hand-Torn Wedding Cards");
  const [selectedQty, setSelectedQty] = useState("50 pieces");
  const [copied, setCopied] = useState(false);

  const bg = theme.bg || "#FFF5F7";
  const ink = theme.ink || "#361D24";
  const accent = theme.accent || "#F472B6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const generatedDmMessage = `Hi! I found your boutique and love your work. I would like to inquire about "${selectedItem}" (${selectedQty}) for my upcoming wedding/celebration. Could you confirm your booking availability and pricing? Thank you! 💕`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedDmMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const faqs = [
    {
      q: p.faq1Q || "How far in advance should I order wedding cards or favors?",
      a: p.faq1A || "For cards, stationeries, and heirloom bears, we recommend reaching out 2 to 4 months in advance. For fresh edible treats like macaron favor boxes, we coordinate baking exactly 48 to 72 hours before your wedding day to guarantee crisp freshness.",
    },
    {
      q: p.faq2Q || "Can you color-match to our bridesmaid dresses or florist bouquet?",
      a: p.faq2A || "Yes! Simply send us photo swatches directly. We lay out physical silk ribbons, wax seal colors, and ink tones under natural studio lighting and send you photos and video clips to approve before production begins.",
    },
    {
      q: p.faq3Q || "Do you accommodate smaller or rush orders?",
      a: p.faq3A || "Yes! Because we are an independent boutique workshop, we have no rigid corporate minimums. Whether you need 1 bridal bear keepsake, 12 luxury vow cards, or 150 macaron favor boxes, send us a DM—we will gladly see if we have an open bench slot.",
    },
    {
      q: p.faq4Q || "What packaging does our order arrive in?",
      a: p.faq4A || "Every order arrives gift-ready: wrapped in acid-free tissue paper, sealed with botanical wax, and cushioned inside rigid white or blush keepsake gift boxes. Edible favors are packaged in food-safe sealed crystal boxes.",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 bg-white border border-pink-200 px-4 py-1.5 rounded-full shadow-xs"
          >
            <span>Direct Maker Consultation</span>
            <span>✿</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pink-950 tracking-tight leading-tight">
            <Editable
              value={p.contactTitle || "Let's Create Your Custom Keepsakes & Favors"}
              onChange={(v) => handleUpdate("contactTitle", v)}
            />
          </h2>

          <p className="text-sm sm:text-base text-pink-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.contactSub ||
                "No complicated forms or impersonal checkout bots. Send a direct message to our studio, share your ideas, and let's craft something delightful for your special day."
              }
              onChange={(v) => handleUpdate("contactSub", v)}
            />
          </p>
        </div>

        {/* Interactive Order Inquiry Generator Widget */}
        <div className="bg-white rounded-[36px] border border-pink-300 p-8 md:p-12 shadow-xl space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-pink-100 pb-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-pink-600">
                Interactive DM Generator
              </span>
              <h3 className="text-xl font-serif font-bold text-pink-950">
                1-Click Direct Inquiry Builder
              </h3>
            </div>
            <span className="text-2xl text-pink-400">💌</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Step 1: Select Item */}
            <div className="space-y-2">
              <label className="font-bold text-pink-950 uppercase tracking-wider block">
                1. Select Desired Piece / Service:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Hand-Torn Wedding Cards & Suites",
                  "Bride & Groom Mohair Keepsake Bears",
                  "Artisan Macaron Favor Boxes",
                  "Ceramic Ring Cradle & Vow Books",
                  "Custom Bespoke Gift Bundle",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedItem(item)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all ${
                      selectedItem === item
                        ? "bg-pink-100 border-pink-400 text-pink-950 font-bold"
                        : "bg-pink-50/50 border-pink-200 text-pink-800 hover:bg-pink-100/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Quantity / Scale */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="font-bold text-pink-950 uppercase tracking-wider block">
                  2. Approximate Quantity:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["1-5 keepsakes", "25 pieces", "50 pieces", "100+ pieces"].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setSelectedQty(qty)}
                      className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                        selectedQty === qty
                          ? "bg-pink-100 border-pink-400 text-pink-950 font-bold"
                          : "bg-pink-50/50 border-pink-200 text-pink-800 hover:bg-pink-100/50"
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Message Preview */}
              <div className="space-y-2 pt-2">
                <label className="font-bold text-pink-950 uppercase tracking-wider block">
                  3. Generated Message Ready to Send:
                </label>
                <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-950 leading-relaxed font-sans text-xs italic">
                  "{generatedDmMessage}"
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold text-xs border border-pink-300 transition-colors"
                  >
                    {copied ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
                    <span>{copied ? "Message Copied!" : "Copy Text"}</span>
                  </button>

                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-bold text-xs shadow-md transition-all hover:scale-105"
                    style={{ backgroundColor: accent }}
                  >
                    <FaWhatsapp />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Contact Channels Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 text-xl border border-pink-200">
              <FaEnvelope />
            </div>
            <h4 className="text-base font-bold text-pink-950">Online Studio Desk</h4>
            <p className="text-xs text-pink-900/75 leading-relaxed">
              Fastest response. Share your florist photos, venue mood boards, and dress swatches right in our chat.
            </p>
            <p className="text-xs font-mono font-bold text-pink-700">hello@petitecraftstudio.com</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 text-xl border border-emerald-200">
              <FaWhatsapp />
            </div>
            <h4 className="text-base font-bold text-pink-950">WhatsApp Concierge</h4>
            <p className="text-xs text-pink-900/75 leading-relaxed">
              Send voice notes, ask questions about ribbon hues, or receive video previews of your completed order.
            </p>
            <p className="text-xs font-mono font-bold text-pink-700">+1 (843) 555-0192</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 text-xl border border-pink-200">
              <FaLocationDot />
            </div>
            <h4 className="text-base font-bold text-pink-950">The Home Studio</h4>
            <p className="text-xs text-pink-900/75 leading-relaxed">
              Independent workshop based in Charleston, SC. In-person paper & fabric swatch consultations available by appointment.
            </p>
            <p className="text-xs font-bold text-pink-950">Charleston, South Carolina</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 text-xl border border-pink-200">
              <FaBoxOpen />
            </div>
            <h4 className="text-base font-bold text-pink-950">Archival Unboxing</h4>
            <p className="text-xs text-pink-900/75 leading-relaxed">
              Every parcel arrives safely cushioned in rigid white boxes with lavender botanical sachets and silk bows.
            </p>
            <p className="text-xs font-bold text-pink-950">100% Acid-Free Guaranteed</p>
          </div>
        </div>

        {/* Artisanal FAQ Dropdowns */}
        <div className="bg-white rounded-3xl border border-pink-200 p-8 md:p-12 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">Frequently Asked Questions</span>
            <h3 className="text-2xl font-serif font-bold text-pink-950">Everything You Need To Know Before Ordering</h3>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-pink-200 rounded-2xl overflow-hidden bg-white shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left gap-4 hover:bg-pink-50/50 transition-colors"
                >
                  <span className="text-sm font-bold text-pink-950">{faq.q}</span>
                  <FaChevronDown
                    className={`text-pink-400 text-xs shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180 text-pink-600" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 pt-1 text-xs text-pink-900/80 leading-relaxed border-t border-pink-100"
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

export default WeddingWebsite1Contact;
