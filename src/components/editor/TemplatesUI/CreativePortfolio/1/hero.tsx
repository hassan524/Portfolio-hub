// @ts-nocheck
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function CreativePortfolio1Hero({ props = {}, theme, onChange }: any) {
  return (
    <section className="hero-section">
      <div className="hero-topline"><span>Selected work — 2021 / 2025</span><span>Scroll to explore <ArrowDownRight size={16} /></span></div>
      <div className="hero-heading-wrap">
        <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          Ideas made<br /><span>visible.</span>
        </motion.h1>
        <motion.div className="hero-sticker" initial={{ scale: 0, rotate: -14 }} animate={{ scale: 1, rotate: 8 }} transition={{ delay: 0.55, type: 'spring', stiffness: 180 }}>
          <span>Good design<br />stays with you.</span><ArrowUpRight size={28} />
        </motion.div>
      </div>
      <div className="hero-bottom">
        <p className="hero-intro">I build distinct identities and digital worlds for people making something worth noticing.</p>
        <div className="hero-index"><span>01</span><span>04</span><div className="index-line" /></div>
      </div>
      <div className="hero-shape" aria-hidden="true"><div className="shape-orbit" /><div className="shape-disc" /><div className="shape-star">✦</div></div>
    </section>
  );
}
