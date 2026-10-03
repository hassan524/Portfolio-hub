// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio3Footer({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="purple-footer"><span>Hasan Senjig / UIUX Designer</span><button onClick={() => scrollTo('purple-top')}>Top <ArrowUpRight size={14} /></button></footer>
  );
}
