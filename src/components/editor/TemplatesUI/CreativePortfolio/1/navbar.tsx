// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function CreativePortfolio1Navbar({ props = {}, theme, onChange }: any) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="site-header">
        <button className="wordmark" onClick={() => scrollTo('top')} aria-label="Back to top">
          <span className="wordmark-mark">A</span>
          <span>Abiola<br /><em>Creative practice</em></span>
        </button>
        <div className="header-center">Independent designer / Art director / Lagos — Worldwide</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </header>

      {menuOpen && (
        <motion.div className="mobile-menu" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {['Work', 'Approach', 'Contact'].map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
          ))}
        </motion.div>
      )}
    </>
  );
}
