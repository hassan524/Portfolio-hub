// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export function CreativePortfolio2Hero({ props = {}, theme, onChange }: any) {
  const accent = '#f03d87';
  const muted = '#7a5362';
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="pink-hero"><div><p className="pink-overline" style={{ color: accent }}>Liza / London-based Senior Digital Product Designer</p><motion.h1 initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .8 }}>Powered by problems, purpose and people.</motion.h1><p className="pink-lede" style={{ color: muted }}>I make digital products and services better for everyone — clearer, kinder, and more useful.</p><button className="pink-arrow" style={{ backgroundColor: accent }} onClick={() => scrollTo('pink-clients')}><ArrowDownRight size={22} /></button></div><motion.div className="pink-hero-art" initial={{ opacity: 0, rotate: 5 }} animate={{ opacity: 1, rotate: -3 }}><div className="pink-art-sun" /><div className="pink-art-window" /><div className="pink-art-label">people<br /><i>first.</i></div><span>01 / product thinking</span></motion.div></section>
  );
}
