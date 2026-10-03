// @ts-nocheck
import { motion } from 'framer-motion';

export function CreativePortfolio4Hero({ props = {}, theme, onChange }: any) {
  const orange = '#ff5c35';

  return (
    <section className="nox-hero"><div className="nox-hero-title"><span style={{ color: orange }}>00:30 / PLAY</span><motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>Make the<br /><i>night</i><br />memorable.</motion.h1><p>A black-box creative studio for films, identities, and visual worlds that stay with you after the screen goes dark.</p></div><motion.div className="nox-play" whileHover={{ scale: 1.08 }} whileTap={{ scale: .96 }}><span style={{ backgroundColor: orange }} /><b>Play<br />reel</b></motion.div></section>
  );
}
