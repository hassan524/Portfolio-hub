// @ts-nocheck
import { motion } from 'framer-motion';

export function CreativePortfolio4Navbar({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div className="nox-video-field" animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}><div className="nox-light nox-light-one" /><div className="nox-light nox-light-two" /><div className="nox-grain" /></motion.div>
      <header className="nox-header"><button onClick={() => scrollTo('nox-top')}>NOX</button><span>Moving Image / Identity / Sound</span><nav><button onClick={() => scrollTo('nox-reel')}>Reel</button><button onClick={() => scrollTo('nox-scenes')}>Scenes</button><button onClick={() => scrollTo('nox-contact')}>Contact</button></nav></header>
    </>
  );
}
