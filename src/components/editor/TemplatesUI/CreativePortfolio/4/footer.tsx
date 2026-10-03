// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio4Footer({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="nox-footer"><span>NOX / Moving Image Studio</span><button onClick={() => scrollTo('nox-top')}>Back to top <ArrowUpRight size={14} /></button></footer>
  );
}
