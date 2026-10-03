// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';

export function CreativePortfolio2Contact({ props = {}, theme, onChange }: any) {
  const rose = '#f9dce8';
  const accent = '#f03d87';

  return (
    <section id="pink-contact" className="pink-contact" style={{ backgroundColor: rose }}><div><p className="pink-overline" style={{ color: accent }}>06 / Want to know more?</p><h2>Let’s make something useful.</h2></div><a href="mailto:hello@liza.design" style={{ color: accent }}>hello@liza.design <ArrowUpRight size={18} /></a></section>
  );
}
