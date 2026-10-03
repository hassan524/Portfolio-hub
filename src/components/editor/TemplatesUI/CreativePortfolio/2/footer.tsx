// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio2Footer({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pink-footer"><span>Liza / Product Designer</span><button onClick={() => scrollTo('pink-top')}>Back to top <ArrowUpRight size={14} /></button></footer>
  );
}
