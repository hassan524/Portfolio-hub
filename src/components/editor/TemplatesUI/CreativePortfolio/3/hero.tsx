// @ts-nocheck
import { motion } from 'framer-motion';

export function CreativePortfolio3Hero({ props = {}, theme, onChange }: any) {
  const lavender = '#c98cff';

  return (
    <section className="purple-hero"><div className="purple-hero-copy"><p>Designing interfaces with atmosphere.</p><motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }}>Hasan<br /><span style={{ color: lavender }}>Senjig.</span></motion.h1><span className="purple-role">UIUX Designer<br />Motion / Systems / Code</span></div><div className="purple-planet"><motion.div className="purple-ring purple-ring-one" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} /><motion.div className="purple-ring purple-ring-two" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} /><motion.div className="purple-moon" animate={{ y: [0, -14, 0] }} transition={{ duration: 4, repeat: Infinity }} /><div className="purple-cloud purple-cloud-one" /><div className="purple-cloud purple-cloud-two" /><span>01 / portfolio</span></div></section>
  );
}
