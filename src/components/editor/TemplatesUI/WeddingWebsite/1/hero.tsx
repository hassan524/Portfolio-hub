// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaStar, FaArrowRight, FaCamera, FaGift, FaCakeCandles, FaWhatsapp } from "react-icons/fa6";
import { Sparkles } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeCategory, setActiveCategory] = useState<"stationery" | "favors" | "treats">("stationery");

  const bg = theme.bg || "#FFF5F7";
  const ink = theme.ink || "#361D24";
  const accent = theme.accent || "#F472B6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const sampleCategories = {
    stationery: {
      tag: "Wedding Stationery & Cards",
      title: "Hand-Torn Cotton Paper & Wax Seal Suites",
      desc: "Custom calligraphy invitation suites, deckle-edge vows, menu cards, and pressed flower seals tailored to your celebration color palette.",
      img: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      turnaround: "5 to 7 Days",
      price: "From $2.80 / card",
    },
    favors: {
      tag: "Artisan Keepsakes & Favors",
      title: "Hand-Stitched Heirloom Bears & Ring Dishes",
      desc: "Mohair keepsake bears with embroidered paw initials, raw linen vow pillows, and 24k gold leaf ceramic ring dishes.",
      img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      turnaround: "10 to 14 Days",
      price: "From $18.00 / piece",
    },
    treats: {
      tag: "Sweet Treats & Artisan Confections",
      title: "Handmade Macaron Favor Boxes & Cookies",
      desc: "Delicate lavender-honey and raspberry-rose confections packaged in custom blush ribbon gift boxes for wedding guest table gifts.",
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      turnaround: "3 to 5 Days Fresh",
      price: "From $3.50 / guest box",
    },
  };

  const currentSample = sampleCategories[activeCategory];

  return (
    <section
      className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden py-16 md:py-24"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      {/* Decorative Organic Bubbly Blurs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FBCFE8 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFE4E9 0%, transparent 70%)" }}
      />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Lively Story & Direct Ordering Info */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-serif font-bold tracking-tight leading-[1.08] text-pink-950"
            >
              <Editable
                value={p.heroHead || "Made by hand, packed with love, and ordered"}
                onChange={(v) => handleUpdate("heroHead", v)}
              />{" "}
              <span
                className="relative italic inline-block"
                style={{
                  background: "linear-gradient(120deg, #E11D48, #F472B6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Editable
                  value={p.heroAccent || "crafted for your celebration."}
                  onChange={(v) => handleUpdate("heroAccent", v)}
                />
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-pink-300/90"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M1 9C50 2 150 2 199 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle / Story Intro */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-pink-950/80 max-w-2xl leading-relaxed font-normal"
            >
              <Editable
                value={
                  p.heroDesc ||
                  "Looking for personalized wedding invitation cards, keepsake bridal teddy bears, artisanal macaron guest favors, or custom hand-tied vow ribbons? Everything is small-batch crafted in our independent studio. No minimum order stress—just send us a direct message."
                }
                onChange={(v) => handleUpdate("heroDesc", v)}
              />
            </motion.p>

            {/* Interactive Sample Category Switcher Tabs */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-pink-700 block">
                Quick Category Switcher:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {[
                  { id: "stationery", label: "Wedding Cards & Stationery", icon: "💌" },
                  { id: "favors", label: "Heirloom Bears & Keepsakes", icon: "🧸" },
                  { id: "treats", label: "Sweet Treats & Confections", icon: "🍬" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? "bg-pink-600 text-white shadow-md scale-105"
                        : "bg-white text-pink-900 border border-pink-200 hover:bg-pink-50"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#projects"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold text-white shadow-lg transition-all"
                style={{
                  backgroundColor: accent,
                  boxShadow: "0 10px 25px -4px rgba(244, 114, 182, 0.5)",
                }}
              >
                <span>
                  <Editable
                    value={p.heroCta1 || "Browse Work Samples & Menu"}
                    onChange={(v) => handleUpdate("heroCta1", v)}
                  />
                </span>
                <FaArrowRight className="text-xs" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="#contact"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-sm font-semibold border border-pink-300 bg-white/95 hover:bg-pink-50 transition-all text-pink-900 shadow-xs"
              >
                <FaWhatsapp className="text-emerald-600 text-base" />
                <span>
                  <Editable
                    value={p.heroCta2 || "Direct Inquiry"}
                    onChange={(v) => handleUpdate("heroCta2", v)}
                  />
                </span>
              </motion.a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 border-t border-pink-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-pink-900/80 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <span>
                  <strong className="font-bold text-pink-950">4.98 Rating</strong> (480+ Orders)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-pink-500 font-bold">✂</span>
                <span>100% Handcrafted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-pink-500 font-bold">✈</span>
                <span>Tracked Courier Shipping</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Work Sample & Mascot Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Bouncy Floating Sticker 1: Top Right */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-3 z-30 bg-white rounded-2xl p-3 shadow-lg border border-pink-200 flex items-center gap-2 max-w-[190px]"
            >
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xs font-bold shrink-0">
                ✿
              </div>
              <div className="text-[11px] text-pink-950 font-medium">
                <strong className="block text-pink-900 font-bold">Direct DM Orders</strong>
                <span>Personal maker chats</span>
              </div>
            </motion.div>

            {/* Bouncy Floating Sticker 2: Bottom Left */}
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-4 z-30 bg-white rounded-2xl p-3 shadow-lg border border-pink-200 flex items-center gap-2.5 max-w-[200px]"
            >
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-sm shrink-0">
                ♡
              </div>
              <div className="text-[11px] text-pink-950 font-medium">
                <strong className="block text-pink-900 font-bold">Bespoke Palettes</strong>
                <span>Color-matched to you</span>
              </div>
            </motion.div>

            {/* Main Interactive Showcase Card with Real Photography + Mascot SVG */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[430px] rounded-[36px] bg-white border-4 border-white shadow-2xl p-6 space-y-5 relative overflow-hidden"
              style={{
                boxShadow: "0 25px 50px -12px rgba(244, 114, 182, 0.35)",
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800 px-3 py-1 rounded-full border border-pink-200">
                  {currentSample.tag}
                </span>
                <span className="text-xs font-bold text-pink-600 font-mono">
                  {currentSample.price}
                </span>
              </div>

              {/* Sample Photo Frame with Hover Zoom */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 border border-pink-100 group">
                <img
                  src={currentSample.img}
                  alt={currentSample.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Mascot Badge on Photo Corner */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  className="absolute bottom-3 right-3 bg-white/95 rounded-2xl p-2 shadow-md border border-pink-200 flex items-center gap-2 backdrop-blur-xs cursor-pointer"
                >
                  <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6">
                    <circle cx="9" cy="9" r="4.5" fill="#D98A72" />
                    <circle cx="27" cy="9" r="4.5" fill="#D98A72" />
                    <ellipse cx="18" cy="18" rx="10.5" ry="9.5" fill="#E8A590" />
                    <ellipse cx="18" cy="20.5" rx="4.5" ry="3.5" fill="#FFF0F3" />
                    <circle cx="14" cy="16" r="1.3" fill="#361D24" />
                    <circle cx="22" cy="16" r="1.3" fill="#361D24" />
                    <ellipse cx="18" cy="19.5" rx="1.6" ry="1.2" fill="#361D24" />
                    <circle cx="11.5" cy="19" r="1.8" fill="#F472B6" opacity="0.6" />
                    <circle cx="24.5" cy="19" r="1.8" fill="#F472B6" opacity="0.6" />
                    <path d="M15 27.5c-2-1.5-2.5-3.5 0-3.5 1.5 0 2.5 1.5 3 2 0.5-0.5 1.5-2 3-2 2.5 0 2 2 0 3.5-1.5 1-2.5 0.5-3-0.5-0.5 1-1.5 1.5-3 0.5z" fill="#E11D48" />
                  </svg>
                  <span className="text-[10px] font-bold text-pink-900 pr-1">Mascot Tested</span>
                </motion.div>
              </div>

              {/* Sample Details */}
              <div className="space-y-1.5 text-left">
                <h4 className="text-base font-bold text-pink-950 font-serif">
                  {currentSample.title}
                </h4>
                <p className="text-xs text-pink-900/75 leading-relaxed">
                  {currentSample.desc}
                </p>
              </div>

              {/* Sample Metadata Strip */}
              <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-xs">
                <span className="text-pink-600 font-medium">
                  ⏱ Lead Time: <strong>{currentSample.turnaround}</strong>
                </span>
                <a
                  href="#contact"
                  className="font-bold text-pink-700 hover:text-pink-900 underline flex items-center gap-1"
                >
                  Inquire This <FaArrowRight className="text-[10px]" />
                </a>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WeddingWebsite1Hero;
