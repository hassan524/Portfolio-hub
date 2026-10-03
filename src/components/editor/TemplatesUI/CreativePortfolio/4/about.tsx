// @ts-nocheck
import { motion } from 'framer-motion';

export function CreativePortfolio4About({ props = {}, theme, onChange }: any) {
  const orange = '#ff5c35';

  return (
    <section id="nox-reel" className="nox-reel"><div className="nox-reel-frame"><span style={{ color: orange }}>NOX / REEL 2025</span><motion.div className="nox-reel-scan" animate={{ y: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity }} /><strong>Every frame<br />earns its place.</strong><small>Sound on / lights low / 01:42</small></div><div className="nox-reel-copy"><span>01 / The studio</span><h2>The screen is only the beginning. Stay awhile.</h2><p>We use moving image, sound, typography, and light to build identities that do not sit still.</p></div></section>
  );
}
