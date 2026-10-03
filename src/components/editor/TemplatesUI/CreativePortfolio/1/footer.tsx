// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio1Footer({ props = {}, theme, onChange }: any) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-row"><span>© 2025 Abiola Studio</span><span>Made with care in Lagos</span><button onClick={() => scrollTo('top')}>Back to top <ArrowUpRight size={15} /></button></div>
  );
}
